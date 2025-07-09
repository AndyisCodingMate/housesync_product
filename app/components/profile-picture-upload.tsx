"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Upload, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ImageCropModal, type CropData } from "./image-crop-modal"
import { uploadProfilePicture } from "@/lib/profile-picture"

interface ProfilePictureUploadProps {
  userId: string
  currentProfileUrl?: string
  isEditing?: boolean
  onUploadSuccess?: () => void
}

export function ProfilePictureUpload({
  userId,
  currentProfileUrl,
  isEditing = false,
  onUploadSuccess,
}: ProfilePictureUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [cropModalOpen, setCropModalOpen] = useState(false)
  const [uploadMenuOpen, setUploadMenuOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadMessage, setUploadMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const showMessage = (message: string, isError = false) => {
    if (isError) {
      setUploadMessage({ type: "error", text: message })
    } else {
      setUploadMessage({ type: "success", text: message })
    }
    setTimeout(() => setUploadMessage(null), isError ? 5000 : 3000)
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Quick validation
    if (!file.type.startsWith("image/")) {
      showMessage("Please select an image file", true)
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      showMessage("Image must be smaller than 5MB", true)
      return
    }

    // Store the original file
    setSelectedFile(file)

    // Create preview URL
    const previewUrl = URL.createObjectURL(file)
    setSelectedImage(previewUrl)
    setUploadMenuOpen(false)
    setCropModalOpen(true)

    // Reset file inputs
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    if (cameraInputRef.current) {
      cameraInputRef.current.value = ""
    }
  }

  const handleCropComplete = async (croppedBlob: Blob, cropData: CropData) => {
    if (!selectedFile) {
      showMessage("No file selected", true)
      return
    }

    setIsUploading(true)
    setCropModalOpen(false)

    try {
      // Create optimized file from cropped blob
      const croppedFile = new File([croppedBlob], selectedFile.name, {
        type: "image/jpeg",
        lastModified: Date.now(),
      })

      // Upload with optimized parameters
      const result = await uploadProfilePicture(userId, {
        file: croppedFile,
        cropData: {
          x: cropData.x,
          y: cropData.y,
          width: cropData.width,
          height: cropData.height,
          zoom: 1,
          rotation: cropData.rotation,
        },
      })

      // Show success immediately (cleanup happens in background)
      showMessage("Profile picture updated successfully!")
      onUploadSuccess?.()
    } catch (error) {
      console.error("Upload error:", error)
      showMessage(error instanceof Error ? error.message : "Failed to upload profile picture", true)
    } finally {
      setIsUploading(false)
      setSelectedFile(null)

      // Clean up the object URL
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage)
      }
      setSelectedImage("")
    }
  }

  const handleCropCancel = () => {
    setCropModalOpen(false)
    setSelectedFile(null)

    // Clean up the object URL
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage)
    }
    setSelectedImage("")
  }

  const handleCameraClick = () => {
    if (isEditing) {
      setUploadMenuOpen(true)
    }
  }

  const handleGalleryUpload = () => {
    fileInputRef.current?.click()
  }

  const handleCameraCapture = () => {
    cameraInputRef.current?.click()
  }

  const getInitials = (name?: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="w-24 h-24">
          <AvatarImage src={currentProfileUrl || "/placeholder.svg"} alt="Profile picture" />
          <AvatarFallback className="text-lg font-semibold bg-gray-200 text-gray-700">
            {getInitials("User")}
          </AvatarFallback>
        </Avatar>

        {isEditing && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-white border-2 border-gray-200 hover:bg-gray-50"
            onClick={handleCameraClick}
            disabled={isUploading}
          >
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
          </Button>
        )}
      </div>

      {/* Upload Options Modal */}
      <Dialog open={uploadMenuOpen} onOpenChange={setUploadMenuOpen}>
        <DialogContent className="max-w-sm bg-white">
          <DialogHeader>
            <DialogTitle>Update Profile Picture</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleGalleryUpload}
              disabled={isUploading}
              className="w-full justify-start bg-white hover:bg-gray-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose from Gallery
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleCameraCapture}
              disabled={isUploading}
              className="w-full justify-start bg-white hover:bg-gray-50"
            >
              <Camera className="w-4 h-4 mr-2" />
              Take a Selfie
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Fixed position message that doesn't affect layout */}
      {uploadMessage && (
        <div className="fixed top-4 right-4 z-50 max-w-sm">
          <div
            className={`px-4 py-2 rounded-lg shadow-lg border ${
              uploadMessage.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {uploadMessage.text}
          </div>
        </div>
      )}

      {/* Hidden file inputs */}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />

      <ImageCropModal
        isOpen={cropModalOpen}
        onClose={handleCropCancel}
        imageSrc={selectedImage}
        onCropComplete={handleCropComplete}
      />
    </div>
  )
}
