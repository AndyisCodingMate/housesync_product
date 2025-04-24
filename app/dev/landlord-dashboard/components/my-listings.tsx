"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, PlusCircle, MapPin, Bed, Bath, Home } from "lucide-react"

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

  const [listing, setListing] = useState<Listing[]>(initialListings);

  const handleRemove = async (id: number) => {
    if (window.confirm("Are you sure you want to remove this listing?")) {
      // Call your API to delete the listing
      //await fetch(`/api/listings/${id}`, { method: "DELETE" });
      // Remove from UI state (so the change is reflected immediately)
      setListing((prev) => prev.filter((l) => l.id !== id));
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">My Listings</h2>
        <Button onClick={handleAddListing} className="flex items-center space-x-2 rounded-3xl px-6">
          <PlusCircle className="w-4 h-4" />
          <span>Add Listing</span>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="relative rounded-3xl overflow-hidden cursor-pointer h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 bg-white border-none"
          >
            <div className="relative h-[300px] w-full">
              <Image src={listing.image || "/placeholder.svg"} alt={listing.title} fill className="object-cover" />
              {/* Price tag */}
              <div className="absolute top-3 right-3 bg-[#00ae89] text-white px-4 py-1.5 rounded-full text-sm font-medium">
                ${listing.price}/mo
              </div>

              {/* Overlay positioned on the left */}
              <div className="absolute bottom-3 left-3 w-[60%] bg-white/90 backdrop-blur-[2px] p-5 rounded-3xl">
                <h3 className="text-lg font-bold text-black leading-tight mb-1">{listing.title}</h3>

                <div className="flex items-center text-[#00ae89] mb-2">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{listing.location}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-2">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1 flex-shrink-0 text-[#00ae89]" />
                    <span className="text-sm text-black">{listing.bedrooms} bed</span>
                  </div>

                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1 flex-shrink-0 text-[#00ae89]" />
                    <span className="text-sm text-black">{listing.bathrooms} bath</span>
                  </div>

                  <div className="flex items-center">
                    <Home className="h-4 w-4 mr-1 flex-shrink-0 text-[#00ae89]" />
                    <span className="text-sm text-black">
                      {listing.status === "available"
                        ? "Available"
                        : listing.status === "unavailable"
                          ? "Unavailable"
                          : ""}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs ${
                      listing.verification === "Verified"
                        ? "bg-blue-100 text-blue-600"
                        : listing.verification === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                    }`}
                  >
                    {listing.verification === "Verified" && <CheckCircle className="w-3 h-3 mr-1 inline" />}
                    {listing.verification === "Pending" && <Clock className="w-3 h-3 mr-1 inline" />}
                    {listing.verification}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <Button onClick={() => handleEdit(listing.id)} className="w-full rounded-3xl px-6">
                Edit
              </Button>

              <Button
                variant="destructive"
                onClick={() => handleRemove(listing.id)}
                className="w-full rounded-3xl px-6 mt-2"
              >
              Remove
              </Button>

            </div>
          </div>
        ))}
      </div>
    </>
  )
}

