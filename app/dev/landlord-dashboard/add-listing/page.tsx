"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUp } from "lucide-react";

type Listing = {
  title: string;
  description: string;
  price: number;
  status: "available" | "unavailable";
  verification: "Verified" | "Pending" | "Rejected";
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  state: string;
  zipCode: string;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  thumbnail: string;
  supportingDocuments: File[];
};

const initialListing: Listing = {
  title: "",
  description: "",
  price: 0,
  status: "available",
  verification: "Pending",
  streetAddress1: "",
  streetAddress2: "",
  city: "",
  state: "",
  zipCode: "",
  bedrooms: 1,
  bathrooms: 1,
  images: [],
  thumbnail: "",
  supportingDocuments: [],
};

export default function AddListingPage() {
  const router = useRouter();
  const [listing, setListing] = useState<Listing>(initialListing);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setListing({ ...listing, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setListing({ ...listing, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file),
      );
      setListing({ ...listing, images: [...listing.images, ...newImages] });
    }
  };

  const handleSetThumbnail = (image: string) => {
    setListing({ ...listing, thumbnail: image });
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newDocuments = Array.from(e.target.files);
      setListing({
        ...listing,
        supportingDocuments: [...listing.supportingDocuments, ...newDocuments],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would save the new listing here
    console.log("Saving new listing:", listing);
    router.push("/dev/landlord-dashboard");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add New Listing</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={listing.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={listing.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={listing.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                onValueChange={(value) => handleSelectChange("status", value)}
                defaultValue={listing.status}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="streetAddress1">Street Address 1</Label>
              <Input
                id="streetAddress1"
                name="streetAddress1"
                value={listing.streetAddress1}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="streetAddress2">Street Address 2</Label>
              <Input
                id="streetAddress2"
                name="streetAddress2"
                value={listing.streetAddress2}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={listing.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                value={listing.state}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={listing.zipCode}
                onChange={handleInputChange}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                id="bedrooms"
                name="bedrooms"
                type="number"
                value={listing.bedrooms}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input
                id="bathrooms"
                name="bathrooms"
                type="number"
                value={listing.bathrooms}
                onChange={handleInputChange}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="images">Upload Images</Label>
              <Input
                id="images"
                type="file"
                multiple
                onChange={handleImageUpload}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {listing.images.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Listing image ${index + 1}`}
                    width={200}
                    height={150}
                    className="rounded-lg"
                  />
                  <Button
                    type="button"
                    onClick={() => handleSetThumbnail(image)}
                    className="absolute top-2 right-2 bg-white text-black"
                  >
                    {listing.thumbnail === image
                      ? "Thumbnail"
                      : "Set as Thumbnail"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supporting Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="documents">Upload Supporting Documents</Label>
              <Input
                id="documents"
                type="file"
                multiple
                onChange={handleDocumentUpload}
                className="mt-1"
              />
            </div>
            <div className="space-y-2">
              {listing.supportingDocuments.map((doc, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <FileUp className="w-4 h-4" />
                  <span>{doc.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dev/landlord-dashboard")}
          >
            Cancel
          </Button>
          <Button type="submit">Add Listing</Button>
        </div>
      </form>
    </div>
  );
}
