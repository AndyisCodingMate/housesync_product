"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, Download, Trash2, AlertCircle, CheckCircle, Clock, RefreshCw } from "lucide-react"
import { getUserDocuments, getDocumentUrl, deleteDocument, type UserDocument } from "@/lib/document-upload"

interface DocumentManagerProps {
  userId: string
  refreshTrigger?: number
}

export function DocumentManager({ userId, refreshTrigger }: DocumentManagerProps) {
  const [documents, setDocuments] = useState<UserDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadDocuments = async () => {
    try {
      setLoading(true)
      setError(null)
      const docs = await getUserDocuments(userId)
      setDocuments(docs)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load documents")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDocuments()
  }, [userId, refreshTrigger])

  const handleDownload = async (document: UserDocument) => {
    try {
      const url = await getDocumentUrl(document.file_path)
      const link = document.createElement("a")
      link.href = url
      link.download = document.file_name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error("Download failed:", err)
    }
  }

  const handleDelete = async (document: UserDocument) => {
    if (!confirm(`Are you sure you want to delete "${document.file_name}"?`)) {
      return
    }

    try {
      await deleteDocument(document.id, document.file_path)
      await loadDocuments() // Refresh the list
    } catch (err) {
      console.error("Delete failed:", err)
    }
  }

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "rejected":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />
    }
  }

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Verified
          </Badge>
        )
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="secondary">Pending</Badge>
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "identity":
        return "Identity Document"
      case "income_proof":
        return "Income Proof"
      default:
        return "Miscellaneous"
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 animate-spin" />
            Loading Documents...
          </CardTitle>
        </CardHeader>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            My Documents ({documents.length})
          </span>
          <Button variant="outline" size="sm" onClick={loadDocuments}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {documents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No documents uploaded yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  {getVerificationIcon(doc.verification_status)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{doc.file_name}</h4>
                      {getVerificationBadge(doc.verification_status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{getCategoryLabel(doc.document_category)}</span>
                      <span>{formatFileSize(doc.file_size)}</span>
                      <span>{doc.file_type.toUpperCase()}</span>
                      <span>{new Date(doc.upload_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleDownload(doc)}>
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(doc)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
