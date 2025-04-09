"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { MapPin, Bed, Bath, Home } from "lucide-react"

export default function TenantDashboardPage() {
  const [activeTab, setActiveTab] = useState("properties")

  // Mock data for tenant dashboard
  const savedProperties = [
    {
      id: 1,
      title: "Modern Loft near Tech Hub",
      location: "Silicon Valley",
      price: 2500,
      status: "Available",
      image:
        "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      bedrooms: 2,
      bathrooms: 2,
      type: "Loft",
      amenities: ["Gym", "Pool"],
    },
    {
      id: 2,
      title: "Charming Cottage",
      location: "Suburbs",
      price: 1500,
      status: "Pending",
      image:
        "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      bedrooms: 3,
      bathrooms: 2,
      type: "House",
      amenities: ["Garden", "Fireplace"],
    },
  ]

  const applications = [
    {
      id: 1,
      property: "Modern Loft near Tech Hub",
      date: "2023-05-15",
      status: "Under Review",
    },
    {
      id: 2,
      property: "Charming Cottage",
      date: "2023-05-10",
      status: "Approved",
    },
  ]

  const messages = [
    {
      id: 1,
      from: "John Smith (Landlord)",
      preview: "Your application has been approved!",
      date: "2023-05-16",
      unread: true,
    },
    {
      id: 2,
      from: "Support Team",
      preview: "Thank you for verifying your account.",
      date: "2023-05-14",
      unread: false,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-black">Tenant Dashboard</h1>

      <Tabs defaultValue="properties" onValueChange={setActiveTab}>
        <div className="flex justify-center mb-4">
          <TabsList className="bg-gray-100 p-1.5 rounded-3xl overflow-hidden">
            <TabsTrigger
              value="properties"
              className="data-[state=active]:bg-[#00ae89] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-3xl px-6 py-3"
            >
              Saved Properties
            </TabsTrigger>
            <TabsTrigger
              value="applications"
              className="data-[state=active]:bg-[#00ae89] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-3xl px-6 py-3"
            >
              My Applications
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="data-[state=active]:bg-[#00ae89] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-3xl px-6 py-3"
            >
              Messages
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-[#00ae89] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-3xl px-6 py-3"
            >
              My Profile
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="properties">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {savedProperties.map((property) => (
              <div
                key={property.id}
                className="relative rounded-3xl overflow-hidden cursor-pointer h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 bg-white border-none"
              >
                <div className="relative h-[300px] w-full">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  {/* Price tag */}
                  <div className="absolute top-3 right-3 bg-[#00ae89] text-white px-4 py-1.5 rounded-full text-sm font-medium">
                    ${property.price}/mo
                  </div>

                  {/* Overlay positioned on the left */}
                  <div className="absolute bottom-3 left-3 w-[60%] bg-white/90 backdrop-blur-[2px] p-5 rounded-3xl">
                    <h3 className="text-lg font-bold text-black leading-tight mb-1">{property.title}</h3>

                    <div className="flex items-center text-[#00ae89] mb-2">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{property.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-2">
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1 flex-shrink-0 text-[#00ae89]" />
                        <span className="text-sm text-black">{property.bedrooms} bed</span>
                      </div>

                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1 flex-shrink-0 text-[#00ae89]" />
                        <span className="text-sm text-black">{property.bathrooms} bath</span>
                      </div>

                      <div className="flex items-center">
                        <Home className="h-4 w-4 mr-1 flex-shrink-0 text-[#00ae89]" />
                        <span className="text-sm text-black">{property.type}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {property.amenities.map((amenity, index) => (
                        <span key={index} className="bg-[#e6f7f3] text-[#00ae89] px-2.5 py-1 rounded-full text-xs">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="applications">
          <div className="space-y-4">
            {applications.map((application) => (
              <Card key={application.id} className="rounded-3xl">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">{application.property}</h3>
                      <p className="text-sm text-gray-500">Applied on: {application.date}</p>
                    </div>
                    <Badge
                      className={
                        application.status === "Approved"
                          ? "bg-green-500 rounded-full px-4 py-1.5"
                          : application.status === "Rejected"
                            ? "bg-red-500 rounded-full px-4 py-1.5"
                            : "bg-yellow-500 rounded-full px-4 py-1.5"
                      }
                    >
                      {application.status}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="mr-2 rounded-3xl px-6">
                      View Application
                    </Button>
                    {application.status === "Approved" && (
                      <Button className="bg-[#00ae89] hover:bg-[#009b7a] rounded-3xl px-6">Sign Lease</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="messages">
          <div className="space-y-4">
            {messages.map((message) => (
              <Card key={message.id} className={`${message.unread ? "border-l-4 border-l-[#00ae89]" : ""} rounded-3xl`}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">{message.from}</h3>
                    <p className="text-sm text-gray-500">{message.date}</p>
                  </div>
                  <p className="mt-2">{message.preview}</p>
                  <div className="mt-4">
                    <Button variant="outline" className="rounded-3xl px-6">
                      Read Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="profile">
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Profile"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <div>
                  <h3 className="text-xl font-semibold">Jane Doe</h3>
                  <p className="text-gray-500">Student</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700">Contact Information</h4>
                  <p>Email: jane.doe@example.com</p>
                  <p>Phone: (555) 123-4567</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700">Verification Status</h4>
                  <Badge className="bg-green-500 rounded-full px-4 py-1.5">Verified</Badge>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700">Preferences</h4>
                  <p>Max Budget: $2,500/month</p>
                  <p>Preferred Locations: Downtown, University Area</p>
                  <p>Roommates: Open to 1-2 roommates</p>
                </div>

                <Button className="bg-[#00ae89] hover:bg-[#009b7a] rounded-3xl px-6 py-3">Edit Profile</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

