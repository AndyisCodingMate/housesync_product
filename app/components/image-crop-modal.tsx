"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { RotateCw, RotateCcw, RefreshCw } from "lucide-react"

interface ImageCropModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  onCropComplete: (croppedBlob: Blob, cropData: CropData) => void
}

export interface CropData {
  x: number
  y: number
  width: number
  height: number
  zoom: number
  rotation: number
}

export function ImageCropModal({ isOpen, onClose, imageSrc, onCropComplete }: ImageCropModalProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [rotation, setRotation] = useState(0)
  const [cropPosition, setCropPosition] = useState({ x: 150, y: 100 })
  const [cropSize, setCropSize] = useState(200)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ centerX: 0, centerY: 0, initialSize: 0 })
  const [isProcessing, setIsProcessing] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageDimensions, setImageDimensions] = useState({ width: 500, height: 400 })

  const minCropSize = 50
  const maxCropSize = 500

  // Reset everything when modal opens
  useEffect(() => {
    if (isOpen && imageSrc) {
      setImageLoaded(false)
      setRotation(0)
      setCropPosition({ x: 150, y: 100 })
      setCropSize(200)
      setIsDragging(false)
      setIsResizing(false)
      setIsProcessing(false)

      // Preload the image
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        if (imageRef.current) {
          imageRef.current.src = img.src
        }
      }
      img.onerror = (error) => {
        console.error("Failed to load image:", error)
        setImageLoaded(false)
      }
      img.src = imageSrc
    }
  }, [isOpen, imageSrc])

  // Handle image load
  const handleImageLoad = useCallback(() => {
    const img = imageRef.current
    if (!img) return

    // Calculate display size while maintaining aspect ratio
    const maxWidth = 600
    const maxHeight = 500
    const aspectRatio = img.naturalWidth / img.naturalHeight

    let displayWidth = maxWidth
    let displayHeight = maxWidth / aspectRatio

    if (displayHeight > maxHeight) {
      displayHeight = maxHeight
      displayWidth = maxHeight * aspectRatio
    }

    setImageDimensions({ width: displayWidth, height: displayHeight })

    // Center the crop circle
    const initialSize = Math.min(200, displayWidth * 0.4, displayHeight * 0.4)
    setCropSize(initialSize)
    setCropPosition({
      x: (displayWidth - initialSize) / 2,
      y: (displayHeight - initialSize) / 2,
    })

    setImageLoaded(true)
  }, [])

  const getDistanceFromCenter = (x: number, y: number, centerX: number, centerY: number) => {
    return Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!imageLoaded) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = cropPosition.x + cropSize / 2
    const centerY = cropPosition.y + cropSize / 2
    const distance = getDistanceFromCenter(x, y, centerX, centerY)

    // Define the border thickness for resize detection
    const borderThickness = 20
    const innerRadius = cropSize / 2 - borderThickness
    const outerRadius = cropSize / 2 + borderThickness

    // Check if clicking on the border area for resizing
    if (distance >= innerRadius && distance <= outerRadius) {
      setIsResizing(true)
      setResizeStart({
        centerX: centerX,
        centerY: centerY,
        initialSize: cropSize,
      })
      e.preventDefault()
    } else if (distance < innerRadius) {
      // Click inside the circle for dragging
      setIsDragging(true)
      setDragStart({
        x: x - cropPosition.x,
        y: y - cropPosition.y,
      })
      e.preventDefault()
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageLoaded) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (isResizing) {
      // Calculate distance from center to current mouse position
      const currentDistance = getDistanceFromCenter(x, y, resizeStart.centerX, resizeStart.centerY)

      // New size is twice the distance from center (since radius = size/2)
      let newSize = currentDistance * 2

      // Apply constraints
      newSize = Math.max(minCropSize, Math.min(maxCropSize, newSize))

      // Ensure the new size fits within image boundaries
      const maxX = resizeStart.centerX + newSize / 2
      const maxY = resizeStart.centerY + newSize / 2
      const minX = resizeStart.centerX - newSize / 2
      const minY = resizeStart.centerY - newSize / 2

      if (maxX <= imageDimensions.width && maxY <= imageDimensions.height && minX >= 0 && minY >= 0) {
        setCropSize(newSize)
        // Adjust position to keep center fixed
        setCropPosition({
          x: resizeStart.centerX - newSize / 2,
          y: resizeStart.centerY - newSize / 2,
        })
      }
    } else if (isDragging) {
      // Calculate new position with proper boundaries
      const newX = x - dragStart.x
      const newY = y - dragStart.y

      // Ensure the crop circle stays within image bounds
      const boundedX = Math.max(0, Math.min(imageDimensions.width - cropSize, newX))
      const boundedY = Math.max(0, Math.min(imageDimensions.height - cropSize, newY))

      setCropPosition({ x: boundedX, y: boundedY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsResizing(false)
  }

  const handleSizeChange = (value: number[]) => {
    const newSize = value[0]
    setCropSize(newSize)

    // Adjust position if crop goes outside bounds
    setCropPosition((prev) => ({
      x: Math.max(0, Math.min(imageDimensions.width - newSize, prev.x)),
      y: Math.max(0, Math.min(imageDimensions.height - newSize, prev.y)),
    }))
  }

  const handleRotate = (degrees: number) => {
    setRotation((prev) => (prev + degrees) % 360)
  }

  const handleReset = () => {
    setRotation(0)
    const initialSize = Math.min(200, imageDimensions.width * 0.4, imageDimensions.height * 0.4)
    setCropSize(initialSize)
    setCropPosition({
      x: (imageDimensions.width - initialSize) / 2,
      y: (imageDimensions.height - initialSize) / 2,
    })
  }

  const handleSave = async () => {
    const image = imageRef.current
    const canvas = canvasRef.current
    if (!image || !canvas || !imageLoaded) return

    setIsProcessing(true)

    try {
      // Set canvas size
      canvas.width = cropSize
      canvas.height = cropSize

      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("Could not get canvas context")

      // Calculate scale factors
      const scaleX = image.naturalWidth / imageDimensions.width
      const scaleY = image.naturalHeight / imageDimensions.height

      // Calculate crop area in original image coordinates
      const cropX = cropPosition.x * scaleX
      const cropY = cropPosition.y * scaleY
      const cropWidth = cropSize * scaleX
      const cropHeight = cropSize * scaleY

      // Clear canvas and create circular clipping path
      ctx.clearRect(0, 0, cropSize, cropSize)
      ctx.save()
      ctx.beginPath()
      ctx.arc(cropSize / 2, cropSize / 2, cropSize / 2, 0, 2 * Math.PI)
      ctx.clip()

      // Apply transformations
      ctx.translate(cropSize / 2, cropSize / 2)
      ctx.rotate((rotation * Math.PI) / 180)
      ctx.translate(-cropSize / 2, -cropSize / 2)

      // Draw the cropped portion
      ctx.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, cropSize, cropSize)
      ctx.restore()

      // Convert to blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const cropData: CropData = {
              x: cropPosition.x,
              y: cropPosition.y,
              width: cropSize,
              height: cropSize,
              zoom: 1, // Fixed zoom since we removed the zoom feature
              rotation: rotation,
            }
            onCropComplete(blob, cropData)
          }
          setIsProcessing(false)
        },
        "image/jpeg",
        0.9,
      )
    } catch (error) {
      console.error("Error processing image:", error)
      setIsProcessing(false)
    }
  }

  // Determine cursor based on mouse position and state
  const getCursor = () => {
    if (isResizing) return "nw-resize"
    if (isDragging) return "grabbing"
    return "grab"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] bg-white border-2 border-gray-200 shadow-2xl overflow-hidden">
        <DialogHeader className="bg-white border-b border-gray-100 pb-4 flex-shrink-0">
          <DialogTitle className="text-gray-900 text-xl font-semibold">Crop Profile Picture</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full max-h-[80vh] bg-white">
          {/* Scrollable Image container */}
          <div className="flex-1 overflow-auto">
            <div
              ref={containerRef}
              className="relative flex justify-center items-center bg-gray-50 rounded-lg p-5 min-h-[550px] border border-gray-200 mx-4 my-4"
            >
              {/* Loading state */}
              {!imageLoaded && (
                <div className="flex items-center justify-center text-gray-600">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00ae89] mr-3"></div>
                  Loading image...
                </div>
              )}

              {/* Image and crop interface */}
              {imageSrc && (
                <div
                  className={`relative ${imageLoaded ? "block" : "hidden"}`}
                  style={{
                    width: imageDimensions.width,
                    height: imageDimensions.height,
                    cursor: getCursor(),
                  }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  {/* The actual image */}
                  <img
                    ref={imageRef}
                    alt="Crop preview"
                    className="w-full h-full object-contain block select-none"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transformOrigin: "center",
                    }}
                    onLoad={handleImageLoad}
                    onError={() => {
                      console.error("Failed to load image")
                      setImageLoaded(false)
                    }}
                    draggable={false}
                    crossOrigin="anonymous"
                  />

                  {/* Dark overlay with circular cutout */}
                  <div
                    className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none"
                    style={{
                      boxShadow: `0 0 0 9999px rgba(0, 0, 0, 0.5)`,
                      clipPath: `circle(${cropSize / 2}px at ${cropPosition.x + cropSize / 2}px ${cropPosition.y + cropSize / 2}px)`,
                    }}
                  />

                  {/* Crop circle border - thicker for easier clicking */}
                  <div
                    className="absolute border-8 border-[#00ae89] rounded-full pointer-events-none"
                    style={{
                      left: cropPosition.x - 4,
                      top: cropPosition.y - 4,
                      width: cropSize + 8,
                      height: cropSize + 8,
                    }}
                  />

                  {/* Center dot for better visibility */}
                  <div
                    className="absolute w-3 h-3 bg-[#00ae89] rounded-full pointer-events-none"
                    style={{
                      left: cropPosition.x + cropSize / 2 - 6,
                      top: cropPosition.y + cropSize / 2 - 6,
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Fixed Controls at bottom */}
          <div className="flex-shrink-0 bg-white border-t border-gray-100">
            {/* Controls - only show when image is loaded */}
            {imageLoaded && (
              <div className="space-y-4 bg-white p-4 rounded-lg border border-gray-100 mx-4 mb-4">
                {/* Size control */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Size: {Math.round(cropSize)}px</label>
                  <Slider
                    value={[cropSize]}
                    onValueChange={handleSizeChange}
                    min={minCropSize}
                    max={Math.min(maxCropSize, Math.min(imageDimensions.width, imageDimensions.height))}
                    step={5}
                    className="w-full"
                  />
                </div>

                {/* Rotation controls */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Rotation: {rotation}°</span>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => handleRotate(-90)}>
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => handleRotate(90)}>
                      <RotateCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Instructions */}
                <p className="text-sm text-gray-600 text-center bg-blue-50 p-3 rounded-md">
                  <strong>Drag inside</strong> the circle to move • <strong>Drag the border</strong> to resize (toward
                  center = smaller, away = larger)
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-2 p-4 bg-white border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="flex-1 bg-white hover:bg-gray-50"
                disabled={!imageLoaded}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button type="button" onClick={onClose} variant="outline" className="flex-1 bg-white hover:bg-gray-50">
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSave}
                disabled={isProcessing || !imageLoaded}
                className="flex-1 bg-[#00ae89] hover:bg-[#009b7a] text-white"
              >
                {isProcessing ? "Processing..." : "Save"}
              </Button>
            </div>
          </div>
        </div>

        {/* Hidden canvas for processing */}
        <canvas ref={canvasRef} className="hidden" />
      </DialogContent>
    </Dialog>
  )
}
