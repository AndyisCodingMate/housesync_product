"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { MyListings } from "./components/my-listings"

// Mock data
const mockContracts = [
  {
    id: 1,
    property: "Cozy Studio Apartment",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    rent: 1200,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    property: "Spacious 2BR with View",
    startDate: "2023-03-15",
    endDate: "2024-03-14",
    rent: 2000,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  },
]

const mockSavedListings = [
  {
    id: 1,
    title: "Modern Loft near Tech Hub",
    location: "Silicon Valley",
    price: 2500,
    status: "available",
    image:
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    title: "Charming Cottage",
    location: "Suburbs",
    price: 1500,
    status: "taken",
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    title: "Student-Friendly Studio",
    location: "University Area",
    price: 800,
    status: "maintenance",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  },
]

const mockChats = [
  {
    id: 1,
    name: "John Doe (Landlord)",
    lastMessage: "When can I schedule a maintenance visit?",
    timestamp: "2023-05-10T14:30:00",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Jane Doe (Tenant)",
    lastMessage: "I'm interested in viewing the Modern Loft.",
    timestamp: "2023-05-09T09:15:00",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
]

export default function LandlordDashboardPage() {
  const [activeChat, setActiveChat] = useState<number | null>(null)
  const [message, setMessage] = useState("")

  const memoizedChatMessages = useMemo(() => {
    return {
      1: [
        {
          sender: "John",
          content: "Hello! I'm interested in showing you the property.",
          timestamp: "2023-05-10T14:00:00",
        },
        { sender: "You", content: "Great! I'd love to see it.", timestamp: "2023-05-10T14:05:00" },
        {
          sender: "John",
          content:
            "Excellent! Before we proceed, I need to verify some financial documents. Could you please upload them?",
          timestamp: "2023-05-10T14:10:00",
          type: "request",
          status: "pending",
        },
      ],
      2: [
        {
          sender: "Jane",
          content: "Hi! I've sent you the lease agreement for review.",
          timestamp: "2023-05-09T09:15:00",
        },
        { sender: "You", content: "Thank you, I'll take a look at it.", timestamp: "2023-05-09T09:20:00" },
      ],
    }
  }, [])

  const [chatMessages, setChatMessages] = useState(memoizedChatMessages)
  const [isEditing, setIsEditing] = useState(false)
  const [mockTenantInfo, setMockTenantInfo] = useState({
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    occupation: "Software Engineer",
    isVerified: true,
    profilePicture: "/profile.jpg",
  })

  const handleSave = () => {
    // In a real application, you would send the updated data to the server here
    console.log("Saving updated info:", mockTenantInfo)
    setIsEditing(false)
  }

  const handleSendMessage = () => {
    if (activeChat && message.trim()) {
      setChatMessages((prev) => ({
        ...prev,
        [activeChat]: [
          ...(prev[activeChat] || []),
          { sender: "You", content: message, timestamp: new Date().toISOString() },
        ],
      }))
      setMessage("")

      // Simulate John's responses for the specified chat sequence
      if (activeChat === 1) {
        const currentMessages = chatMessages[1]
        const lastMessage = currentMessages[currentMessages.length - 1]

        if (lastMessage.type === "request" && lastMessage.status === "pending") {
          setTimeout(() => {
            setChatMessages((prev) => ({
              ...prev,
              1: [
                ...prev[1],
                {
                  sender: "System",
                  content: "Financial documents verified successfully.",
                  timestamp: new Date().toISOString(),
                  type: "verification",
                },
                {
                  sender: "John",
                  content:
                    "Great! Your documents have been verified. Now, let's proceed with the rental contract. Please review and sign it.",
                  timestamp: new Date().toISOString(),
                  type: "request",
                  status: "pending",
                  action: "sign_contract",
                },
              ],
            }))
          }, 1000)
        } else if (
          lastMessage.type === "request" &&
          lastMessage.status === "completed" &&
          lastMessage.action === "sign_contract"
        ) {
          setTimeout(() => {
            setChatMessages((prev) => ({
              ...prev,
              1: [
                ...prev[1],
                {
                  sender: "John",
                  content:
                    "Excellent! The contract has been signed. You're all set to move in. Here's your check-in information:",
                  timestamp: new Date().toISOString(),
                },
                {
                  sender: "System",
                  content: "Check-in Date: 2023-06-01, Time: 2:00 PM",
                  timestamp: new Date().toISOString(),
                  type: "check_in",
                },
              ],
            }))
          }, 1000)
        }
      }
    }
  }

  const handleDocumentUpload = () => {
    if (activeChat === 1) {
      setChatMessages((prev) => ({
        ...prev,
        1: prev[1].map((msg) =>
          msg.type === "request" && msg.status === "pending" ? { ...msg, status: "completed" } : msg,
        ),
      }))
    }
  }

  const handleContractSign = () => {
    if (activeChat === 1) {
      setChatMessages((prev) => ({
        ...prev,
        1: prev[1].map((msg) =>
          msg.type === "request" && msg.status === "pending" && msg.action === "sign_contract"
            ? { ...msg, status: "completed" }
            : msg,
        ),
      }))
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-green-600">Landlord Dashboard</h1>
      <Tabs defaultValue="contracts">
        <TabsList className="mb-4">
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="my-listings">My Listings</TabsTrigger>
          <TabsTrigger value="saved-listings">Saved Listings</TabsTrigger>
          <TabsTrigger value="chats">Chats</TabsTrigger>
          <TabsTrigger value="my-info">My Info</TabsTrigger>
        </TabsList>
        <TabsContent value="contracts">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockContracts.map((contract) => (
              <Link href={`/dev/tenant-dashboard/contract/${contract.id}`} key={contract.id}>
                <Card className="flex flex-col cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Image
                      src={contract.image || "/placeholder.svg"}
                      alt={contract.property}
                      width={300}
                      height={200}
                      className="object-cover rounded-t-lg"
                    />
                    <CardTitle>{contract.property}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p>Start Date: {contract.startDate}</p>
                    <p>End Date: {contract.endDate}</p>
                    <p>Monthly Rent: ${contract.rent}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="my-listings">
          <MyListings />
        </TabsContent>
        <TabsContent value="saved-listings">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockSavedListings.map((listing) => (
              <Link href={`/dev/tenant-dashboard/saved-listings/${listing.id}`} key={listing.id}>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
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
                  <CardContent>
                    <p>{listing.location}</p>
                    <p className="font-semibold">${listing.price}/month</p>
                    <Badge
                      variant={
                        listing.status === "available"
                          ? "default"
                          : listing.status === "taken"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {listing.status}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Button variant="outline" className="mx-2">
              Previous
            </Button>
            <Button variant="outline" className="mx-2">
              Next
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="chats">
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mockChats.map((chat) => (
                    <li
                      key={chat.id}
                      className={`p-2 rounded cursor-pointer ${
                        activeChat === chat.id ? "bg-gray-100" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setActiveChat(chat.id)}
                    >
                      <div className="flex items-center space-x-2">
                        <Image
                          src={chat.avatar || "/placeholder.svg"}
                          alt={chat.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <p className="font-semibold">{chat.name}</p>
                          <p className="text-sm text-gray-500">{chat.lastMessage}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>
                  {activeChat ? mockChats.find((chat) => chat.id === activeChat)?.name : "Select a conversation"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activeChat && (
                  <>
                    <div className="h-64 overflow-y-auto mb-4 space-y-2">
                      {chatMessages[activeChat]?.map((msg, index) => (
                        <div
                          key={index}
                          className={`p-2 rounded ${msg.sender === "You" ? "bg-blue-100 text-right" : "bg-gray-100"}`}
                        >
                          {msg.type === "request" && msg.status === "pending" ? (
                            <div>
                              <p>{msg.content}</p>
                              {msg.action === "sign_contract" ? (
                                <Button onClick={handleContractSign} className="mt-2">
                                  Sign Contract
                                </Button>
                              ) : (
                                <Button onClick={handleDocumentUpload} className="mt-2">
                                  Upload Documents
                                </Button>
                              )}
                            </div>
                          ) : msg.type === "verification" ? (
                            <div className="bg-green-100 p-2 rounded">
                              <p>{msg.content}</p>
                            </div>
                          ) : msg.type === "check_in" ? (
                            <div className="bg-yellow-100 p-2 rounded">
                              <p>{msg.content}</p>
                              <Button className="mt-2">Check In</Button>
                            </div>
                          ) : (
                            <p>{msg.content}</p>
                          )}
                          <span className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                      />
                      <Button onClick={handleSendMessage}>Send</Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="my-info">
          <Card>
            <CardHeader>
              <CardTitle>My Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={mockTenantInfo.profilePicture || "/placeholder.svg"}
                      alt="Profile Picture"
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                    <div>
                      <Input
                        value={mockTenantInfo.name}
                        onChange={(e) => setMockTenantInfo({ ...mockTenantInfo, name: e.target.value })}
                        disabled={!isEditing}
                      />
                      <Input
                        value={mockTenantInfo.occupation}
                        onChange={(e) => setMockTenantInfo({ ...mockTenantInfo, occupation: e.target.value })}
                        disabled={!isEditing}
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      value={mockTenantInfo.email}
                      onChange={(e) => setMockTenantInfo({ ...mockTenantInfo, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input
                      value={mockTenantInfo.phone}
                      onChange={(e) => setMockTenantInfo({ ...mockTenantInfo, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label>Date of Birth</Label>
                    <Input
                      type="date"
                      value={mockTenantInfo.dateOfBirth}
                      onChange={(e) => setMockTenantInfo({ ...mockTenantInfo, dateOfBirth: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <p>
                      <strong>Verification Status:</strong>{" "}
                      {mockTenantInfo.isVerified ? (
                        <span className="text-green-500 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" /> Verified
                        </span>
                      ) : (
                        <span className="text-red-500 flex items-center">
                          <XCircle className="w-4 h-4 mr-1" /> Not Verified
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Uploaded Documents</h4>
                    <Image
                      src="/document-preview.png"
                      alt="Uploaded Document"
                      width={200}
                      height={150}
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Selfie</h4>
                    <Image src="/selfie-preview.png" alt="Selfie" width={200} height={150} className="rounded-lg" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Cancel" : "Edit"}</Button>
              {isEditing && <Button onClick={handleSave}>Save</Button>}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

