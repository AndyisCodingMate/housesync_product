"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for listings
const mockListings = [
  { id: 1, title: "Cozy Apartment in Downtown", address: "123 Main St", price: 1500 },
  { id: 2, title: "Spacious House with Garden", address: "456 Oak Ave", price: 2500 },
  { id: 3, title: "Modern Loft near Tech Hub", address: "789 Pine St", price: 1800 },
]

export default function DashboardPage() {
  const [listings, setListings] = useState(mockListings)
  const [newListing, setNewListing] = useState({ title: "", address: "", price: "" })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewListing((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddListing = (e: React.FormEvent) => {
    e.preventDefault()
    const id = listings.length + 1
    setListings((prev) => [...prev, { ...newListing, id, price: Number(newListing.price) }])
    setNewListing({ title: "", address: "", price: "" })
  }

  return (
    <Tabs defaultValue="my-listings">
      <TabsList className="mb-4">
        <TabsTrigger value="my-listings">My Listings</TabsTrigger>
        <TabsTrigger value="add-listing">Add New Listing</TabsTrigger>
        <TabsTrigger value="other-listings">Other Listings</TabsTrigger>
      </TabsList>
      <TabsContent value="my-listings">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <Card key={listing.id}>
              <CardHeader>
                <CardTitle>{listing.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{listing.address}</p>
                <p className="font-semibold">${listing.price}/month</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="add-listing">
        <Card>
          <CardHeader>
            <CardTitle>Add New Listing</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddListing} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={newListing.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={newListing.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price ($/month)
                </label>
                <Input
                  type="number"
                  id="price"
                  name="price"
                  value={newListing.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button type="submit">Add Listing</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="other-listings">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockListings.map((listing) => (
            <Card key={listing.id}>
              <CardHeader>
                <CardTitle>{listing.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{listing.address}</p>
                <p className="font-semibold">${listing.price}/month</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}

