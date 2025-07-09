import { createClient } from "@/utils/supabase/client"

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */
export type DocumentCategory = "identity" | "income_proof" | "miscellaneous" | "profile_picture"

export type FileType = "pdf" | "png" | "jpg" | "jpeg" | "doc" | "docx" | "txt"

export type VerificationStatus = "pending" | "verified" | "rejected"
export type VerifiedBy = "admin" | "server" | null

export interface DocumentUpload {
  file: File
  category: DocumentCategory
}

export interface UserDocument {
  id: string
  user_id: string
  file_name: string
  file_path: string
  file_size: number
  file_type: FileType
  document_category: DocumentCategory
  upload_date: string
  verification_status: VerificationStatus
  verified_by: VerifiedBy
  verified_at: string | null
  created_at: string
  updated_at: string
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const mimeToType: Record<string, FileType> = {
  "application/pdf": "pdf",
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "text/plain": "txt",
}

const imageTypes = new Set<FileType>(["png", "jpg", "jpeg"])

const MB = 1024 * 1024

function generateFilePath(userId: string, category: DocumentCategory, fileName: string) {
  const ts = Date.now()
  const safe = fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_")
  return `${userId}/${category}/${ts}_${safe}`
}

function getFileType(file: File): FileType | null {
  return mimeToType[file.type] ?? null
}

/* ------------------------------------------------------------------ */
/* Core API                                                            */
/* ------------------------------------------------------------------ */
export async function uploadDocument(userId: string, upload: DocumentUpload): Promise<UserDocument> {
  const supabase = createClient()

  /* -------- validation ------------------------------------------- */
  const fileType = getFileType(upload.file)
  if (!fileType) {
    throw new Error("Unsupported file type")
  }

  if (upload.category === "profile_picture" && !imageTypes.has(fileType)) {
    throw new Error("Profile pictures must be PNG, JPG, or JPEG")
  }

  const maxBytes = upload.category === "profile_picture" ? 5 * MB : 100 * MB
  if (upload.file.size > maxBytes) {
    throw new Error(`File too large (max ${maxBytes / MB} MB)`)
  }

  /* -------- delete existing profile photo (DB + Storage) ---------- */
  if (upload.category === "profile_picture") {
    const existing = await getUserProfilePicture(userId)
    if (existing) {
      await deleteDocument(existing.id, existing.file_path).catch(() => {
        /* ignore */
      })
    }
  }

  /* -------- upload ------------------------------------------------ */
  const filePath = generateFilePath(userId, upload.category, upload.file.name)

  const { error: stErr } = await supabase.storage
    .from("user-documents")
    .upload(filePath, upload.file, { upsert: false })
  if (stErr) throw new Error(`Storage upload failed: ${stErr.message}`)

  /* -------- record in DB ----------------------------------------- */
  const { data: dbRow, error: dbErr } = await supabase
    .from("user_documents")
    .insert({
      user_id: userId,
      file_name: upload.file.name,
      file_path: filePath,
      file_size: upload.file.size,
      file_type: fileType,
      document_category: upload.category,
      verification_status: upload.category === "profile_picture" ? "verified" : "pending",
      verified_by: upload.category === "profile_picture" ? "server" : null,
    })
    .select()
    .single()

  if (dbErr) {
    // roll back storage object
    await supabase.storage.from("user-documents").remove([filePath])
    throw new Error(`DB insert failed: ${dbErr.message}`)
  }

  return dbRow as UserDocument
}

/* ------------------- fetch multiple docs (non-photo) -------------- */
export async function getUserDocuments(userId: string): Promise<UserDocument[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("user_documents")
    .select("*")
    .eq("user_id", userId)
    .neq("document_category", "profile_picture")
    .order("created_at", { ascending: false })

  if (error) throw new Error(`Fetch documents failed: ${error.message}`)
  return data as UserDocument[]
}

/* ------------------- fetch latest profile picture ----------------- */
export async function getUserProfilePicture(userId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("user_documents")
    .select("*")
    .eq("user_id", userId)
    .eq("document_category", "profile_picture")
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  if (
    error &&
    // PGRST116 = no rows found
    error.code !== "PGRST116"
  ) {
    throw new Error(`Fetch profile picture failed: ${error.message}`)
  }

  return (data as UserDocument) || null
}

/* ------------------- URL helper ----------------------------------- */
export async function getDocumentUrl(filePath: string) {
  const supabase = createClient()
  const { data } = supabase.storage.from("user-documents").getPublicUrl(filePath)
  return data.publicUrl
}

/* ------------------- delete helper -------------------------------- */
export async function deleteDocument(documentId: string, filePath: string) {
  const supabase = createClient()

  if (documentId) {
    await supabase.from("user_documents").delete().eq("id", documentId)
  }

  await supabase.storage.from("user-documents").remove([filePath])
}
