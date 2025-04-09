"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, PlusCircle } from "lucide-react"

type Listing = {
  id: number
  title: string
  location: string
  price: number
  status: "available" | "unavailable"
  image: string
  verification: "Verified" | "Pending" | "Rejected"
  address: string
  bedrooms: number
  bathrooms: number
}

const initialListings: Listing[] = [
  {
    id: 1,
    title: "Modern Loft near Tech Hub",
    location: "Silicon Valley",
    price: 2500,
    status: "available",
    image:
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    verification: "Verified",
    address: "123 Tech Street, Silicon Valley, CA 94000",
    bedrooms: 2,
    bathrooms: 2,
  },
  {
    id: 2,
    title: "Charming Cottage",
    location: "Suburbs",
    price: 1500,
    status: "unavailable",
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    verification: "Pending",
    address: "456 Maple Lane, Suburbia, NY 11000",
    bedrooms: 3,
    bathrooms: 2,
  },
  {
    id: 3,
    title: "Student-Friendly Studio",
    location: "University Area",
    price: 800,
    status: "available",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    verification: "Rejected",
    address: "789 Campus Drive, College Town, MA 02100",
    bedrooms: 1,
    bathrooms: 1,
  },
]

export function MyListings() {
  const [listings] = useState<Listing[]>(initialListings)
  const router = useRouter()

  const handleEdit = (id: number) => {
    router.push(`/dev/landlord-dashboard/edit-listing/${id}`)
  }

  const handleAddListing = () => {
    router.push("/dev/landlord-dashboard/add-listing")
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">My Listings</h2>
        <Button onClick={handleAddListing} className="flex items-center space-x-2">
          <PlusCircle className="w-4 h-4" />
          <span>Add Listing</span>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <Card key={listing.id} className="flex flex-col">
            <CardHeader>
              <Image
                src={listing.image || "/placeholder.svg"}
                alt={listing.title}
                width={300}
                height={200}
                className="object-cover rounded-t-lg"
              />
              <CardTitle>{listing.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>{listing.location}</p>
              <p className="font-semibold">${listing.price}/month</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge
                  variant={listing.status === "available" ? "default" : "secondary"}
                  className={listing.status === "available" ? "bg-green-500" : "bg-gray-500"}
                >
                  {listing.status}
                </Badge>
                <Badge
                  variant={
                    listing.verification === "Verified"
                      ? "default"
                      : listing.verification === "Pending"
                        ? "secondary"
                        : "destructive"
                  }
                  className={
                    listing.verification === "Verified"
                      ? "bg-blue-500"
                      : listing.verification === "Pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }
                >
                  {listing.verification === "Verified" && <CheckCircle className="w-4 h-4 mr-1" />}
                  {listing.verification === "Pending" && <Clock className="w-4 h-4 mr-1" />}
                  {listing.verification}
                </Badge>
              </div>
              <p className="mt-2">
                {listing.bedrooms} bed • {listing.bathrooms} bath
              </p>
              <p className="text-sm text-gray-500 mt-1">{listing.address}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleEdit(listing.id)} className="w-full">
                Edit
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}

