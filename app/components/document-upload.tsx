"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react"
import { uploadDocument, type DocumentCategory } from "@/lib/document-upload"

interface DocumentUploadProps {
  userId: string
  onUploadSuccess?: () => void
}

export function DocumentUpload({ userId, onUploadSuccess }: DocumentUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [category, setCategory] = useState<DocumentCategory>("miscellaneous")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setUploadStatus({ type: null, message: "" })
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus({ type: "error", message: "Please select a file to upload" })
      return
    }

    setIsUploading(true)
    setUploadStatus({ type: null, message: "" })

    try {
      await uploadDocument(userId, {
        file: selectedFile,
        category,
      })

      setUploadStatus({
        type: "success",
        message: "Document uploaded successfully! It will be reviewed for verification.",
      })

      // Reset form
      setSelectedFile(null)
      setCategory("miscellaneous")

      // Reset file input
      const fileInput = document.getElementById("document-file") as HTMLInputElement
      if (fileInput) fileInput.value = ""

      // Notify parent component
      onUploadSuccess?.()
    } catch (error) {
      setUploadStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Upload failed",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Upload Document
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="document-category">Document Category</Label>
          <Select value={category} onValueChange={(value) => setCategory(value as DocumentCategory)}>
            <SelectTrigger>
              <SelectValue placeholder="Select document category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="identity">Identity Document</SelectItem>
              <SelectItem value="income_proof">Income Proof</SelectItem>
              <SelectItem value="miscellaneous">Miscellaneous</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="document-file">Select File</Label>
          <Input
            id="document-file"
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.txt"
            onChange={handleFileSelect}
            className="mt-1"
          />
          <p className="text-sm text-muted-foreground mt-1">
            Supported formats: PDF, PNG, JPG, JPEG, DOC, DOCX, TXT (Max 100MB)
          </p>
        </div>

        {selectedFile && (
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <FileText className="w-4 h-4" />
            <div className="flex-1">
              <p className="text-sm font-medium">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
            </div>
          </div>
        )}

        {uploadStatus.type && (
          <Alert variant={uploadStatus.type === "error" ? "destructive" : "default"}>
            {uploadStatus.type === "error" ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
            <AlertDescription>{uploadStatus.message}</AlertDescription>
          </Alert>
        )}

        <Button onClick={handleUpload} disabled={!selectedFile || isUploading} className="w-full">
          {isUploading ? "Uploading..." : "Upload Document"}
        </Button>
      </CardContent>
    </Card>
  )
}
