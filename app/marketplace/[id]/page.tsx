"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { DateRange } from "react-day-picker"

// Mock data for a single listing
const mockListing = {
  id: 1,
  title: "Cozy Studio Apartment",
  location: "Downtown",
  price: 1200,
  type: "Studio",
  description:
    "A beautiful studio apartment in the heart of downtown. Perfect for young professionals or students. Fully furnished with modern amenities.",
  amenities: ["Wi-Fi", "Air Conditioning", "Washer/Dryer", "Gym Access"],
  image:
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  availableDates: Array.from({ length: 365 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date
  }),
}

export default function ListingDetailPage() {
  const params = useParams()
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  // In a real application, you would fetch the listing data based on the ID
  // For this mock, we'll just use the hardcoded data
  const listing = mockListing

  const handleBooking = () => {
    if (dateRange?.from && dateRange?.to) {
      alert(`Booking requested from ${dateRange.from.toDateString()} to ${dateRange.to.toDateString()}`)
    } else {
      alert("Please select a date range before booking")
    }
  }

  const handleContact = () => {
    alert("Contacting landlord... This feature is not implemented in the mock version.")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="relative h-64 w-full">
            <Image
              src={listing.image || "/placeholder.svg"}
              alt={listing.title}
              width={800}
              height={400}
              className="object-cover w-full h-64 rounded-t-lg"
            />
            <div className="absolute top-4 right-4 bg-[#00ae89] text-white px-4 py-2 rounded-full font-medium text-sm">
              ${listing.price}/mo
            </div>
          </div>
          <CardTitle>{listing.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">{listing.location}</p>
              <p className="mb-4">{listing.description}</p>
              <h3 className="font-semibold mb-2">Amenities:</h3>
              <ul className="list-disc list-inside mb-4">
                {listing.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Select Date Range:</h3>
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                className="rounded-md border shadow"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleBooking} className="bg-[#00ae89] hover:bg-[#009b7a]">
            Book Now
          </Button>
          <Button variant="outline" onClick={handleContact}>
            Contact Landlord
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

