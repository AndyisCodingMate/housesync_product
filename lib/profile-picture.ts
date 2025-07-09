import { createClient } from "@/utils/supabase/client"

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */
export interface ProfilePictureUpload {
  file: File
  cropData: {
    x: number
    y: number
    width: number
    height: number
    zoom: number
    rotation: number
  }
}

export interface UserProfilePicture {
  id: string
  user_id: string
  file_path: string
  file_name: string
  file_size: number
  crop_x: number
  crop_y: number
  crop_width: number
  crop_height: number
  zoom_level: number
  rotation: number
  is_active: boolean
  created_at: string
  updated_at: string
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
function generateFilePath(userId: string, fileName: string) {
  const ts = Date.now()
  const safe = fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_")
  return `profile-pictures/${userId}/${ts}_${safe}`
}

/* ------------------------------------------------------------------ */
/* Core API - Optimized for Speed                                     */
/* ------------------------------------------------------------------ */
export async function uploadProfilePicture(userId: string, upload: ProfilePictureUpload): Promise<UserProfilePicture> {
  const supabase = createClient()

  /* -------- Quick validation ------------------------------------ */
  const allowedTypes = ["image/png", "image/jpg", "image/jpeg"]
  if (!allowedTypes.includes(upload.file.type)) {
    throw new Error("Profile pictures must be PNG, JPG, or JPEG")
  }

  const maxBytes = 5 * 1024 * 1024 // 5MB
  if (upload.file.size > maxBytes) {
    throw new Error("File too large (max 5MB)")
  }

  /* -------- Upload to storage with optimized settings ----------- */
  const filePath = generateFilePath(userId, upload.file.name)

  const { error: storageError } = await supabase.storage.from("user-documents").upload(filePath, upload.file, {
    upsert: false,
    cacheControl: "3600", // 1 hour cache
  })

  if (storageError) {
    throw new Error(`Storage upload failed: ${storageError.message}`)
  }

  /* -------- Insert new record in database ------------------- */
  const { data: dbRow, error: dbError } = await supabase
    .from("user_profile_pictures")
    .insert({
      user_id: userId,
      file_path: filePath,
      file_name: upload.file.name,
      file_size: upload.file.size,
      crop_x: Math.round(upload.cropData.x),
      crop_y: Math.round(upload.cropData.y),
      crop_width: Math.round(upload.cropData.width),
      crop_height: Math.round(upload.cropData.height),
      zoom_level: upload.cropData.zoom,
      rotation: upload.cropData.rotation,
      is_active: true,
    })
    .select()
    .single()

  if (dbError) {
    // Rollback storage upload if database insert fails
    await supabase.storage.from("user-documents").remove([filePath])
    throw new Error(`Database insert failed: ${dbError.message}`)
  }

  /* -------- Async cleanup - don't wait for it --------------- */
  // Run cleanup in background without blocking the response
  cleanupOldProfilePictures(userId, dbRow.id).catch((error) => {
    console.error("Background cleanup failed:", error)
  })

  return dbRow as UserProfilePicture
}

/* -------- Background cleanup function ----------------------- */
async function cleanupOldProfilePictures(userId: string, newPictureId: string): Promise<void> {
  const supabase = createClient()

  try {
    // Get existing active profile pictures (excluding the new one)
    const { data: oldPictures, error: fetchError } = await supabase
      .from("user_profile_pictures")
      .select("id, file_path")
      .eq("user_id", userId)
      .eq("is_active", true)
      .neq("id", newPictureId)

    if (fetchError || !oldPictures || oldPictures.length === 0) {
      return
    }

    // Deactivate old pictures
    await supabase
      .from("user_profile_pictures")
      .update({ is_active: false })
      .eq("user_id", userId)
      .eq("is_active", true)
      .neq("id", newPictureId)

    // Delete old files from storage
    const filePaths = oldPictures.map((pic) => pic.file_path)
    if (filePaths.length > 0) {
      await supabase.storage.from("user-documents").remove(filePaths)
    }

    // Delete old records from database
    const idsToDelete = oldPictures.map((pic) => pic.id)
    await supabase.from("user_profile_pictures").delete().in("id", idsToDelete)
  } catch (error) {
    console.error("Cleanup error:", error)
  }
}

/* ------------------- fetch active profile picture ----------------- */
export async function getUserProfilePicture(userId: string): Promise<UserProfilePicture | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("user_profile_pictures")
    .select("*")
    .eq("user_id", userId)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== "PGRST116") {
    // PGRST116 = no rows found
    return null
  }

  return (data as UserProfilePicture) || null
}

/* ------------------- URL helper ----------------------------------- */
export async function getProfilePictureUrl(filePath: string): Promise<string> {
  const supabase = createClient()
  const { data } = supabase.storage.from("user-documents").getPublicUrl(filePath)
  return data.publicUrl
}

/* ------------------- delete helper -------------------------------- */
export async function deleteProfilePicture(profilePictureId: string, filePath: string): Promise<void> {
  const supabase = createClient()

  // Delete from database first
  const { error: dbError } = await supabase.from("user_profile_pictures").delete().eq("id", profilePictureId)

  if (dbError) {
    throw new Error(`Database delete failed: ${dbError.message}`)
  }

  // Delete from storage in background
  supabase.storage
    .from("user-documents")
    .remove([filePath])
    .catch((error) => {
      console.error("Storage delete failed:", error)
    })
}

/* ------------------- cleanup inactive pictures ------------------- */
export async function cleanupInactiveProfilePictures(userId: string): Promise<void> {
  const supabase = createClient()

  // Get all inactive profile pictures for this user
  const { data: inactivePictures, error: fetchError } = await supabase
    .from("user_profile_pictures")
    .select("id, file_path")
    .eq("user_id", userId)
    .eq("is_active", false)

  if (fetchError || !inactivePictures || inactivePictures.length === 0) {
    return
  }

  // Delete from database first
  const ids = inactivePictures.map((pic) => pic.id)
  await supabase.from("user_profile_pictures").delete().in("id", ids)

  // Delete from storage in background
  const filePaths = inactivePictures.map((pic) => pic.file_path)
  supabase.storage
    .from("user-documents")
    .remove(filePaths)
    .catch((error) => {
      console.error("Storage cleanup failed:", error)
    })
}

// Alias for backwards-compatibility
export { getUserProfilePicture as getActiveProfilePicture }
