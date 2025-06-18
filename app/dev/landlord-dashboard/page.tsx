"use client"

import { useState, useMemo, useEffect } from "react"
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
import { MapPin } from "lucide-react"


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
  //For the loader
  const [isVerifying, setIsVerifying] = useState(false);

  //For the document verification notification
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  useEffect(() => {
    if (notification) {
      const timeout = setTimeout(() => {
        setNotification(null);
      }, 2000); // Auto-dismiss after 2 seconds
      return () => clearTimeout(timeout);
    }
  }, [notification]);

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
    profilePicture: "/placeholder.svg?height=100&width=100",
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

  const handleDocumentUpload = async () => {
    if (activeChat !== 1) return;
 
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,application/pdf';
  
    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = async () => {
        setIsVerifying(true);
        try {
          const base64String = reader.result.split(',')[1];
          const reqId = Date.now().toString();
  
          const response = await fetch('/api/verify-doc', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              doc_type: 'image',
              doc_base64: base64String,
              req_id: reqId,
            }),
          });
  
          if (!response.ok) {
            console.error('HTTP Error:', response.status);
            setNotification({ message: 'Could not verify document. Try again. ', type: 'error' });
            return;
          }
  
          const data = await response.json();
          console.log(data); 
          alert(`Raw response: ${JSON.stringify(data)}`);
  
          if (data.success && !data.isTampered) {

            setChatMessages((prev) => ({
              ...prev,
              1: prev[1].map((msg) =>
                msg.type === 'request' && msg.status === 'pending'
                  ? { ...msg, status: 'completed', apiResult: data }
                  : msg,
              ),
            }));
  
            setNotification({ message: 'Document successfully verified.', type: 'success' });
          } else {
            const reason = data.error_message ;
            const severity = data.severity;
            const type = data.doc_type;

            if(data.isTampered){
              setNotification({ message: 'Verification failed: Document is tampered.', type: 'error' });
            } else {
              setNotification({ message: 'Verification failed: Document is tampered.', type: 'error' });
              alert(`Severity: ${severity}`)
              alert(`Document Type: ${type}`)
            }
          }
        } catch (error) {
          console.error('Upload or verification error:', error);
          setNotification({ message: 'Error occured during verification. Try again. ', type: 'error' });
        } finally {
          setIsVerifying(false);
        }
      };
  
      reader.onerror = () => {
        console.error('File reading failed');
        setNotification({ message: 'Could not read the file. Try again. ', type: 'error' });
      };
    };
  
    input.click();
  };
  
  

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
      {/* Document Verification Loader */}
      {isVerifying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-[#00ae89] text-white p-6 rounded-2xl shadow-lg flex flex-col items-center space-y-4 w-72">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-white border-t-transparent" />
            <p className="text-lg font-semibold text-center">Verifying document...</p>
          </div>
        </div>
      )}
  
      {/* Verification Notification Pop-up */}
      {notification && notification.type === "error" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-neutral-200 text-red-600 p-6 rounded-2xl shadow-lg flex flex-col items-center space-y-4 w-80">
              <div className="text-3xl">❌</div>
              <p className="text-lg font-semibold text-center">{notification.message}</p>
            </div>
          </div>
        )}

        
      <h1 className="text-3xl font-bold mb-8 text-center text-black">Landlord Dashboard</h1>
      <Tabs defaultValue="contracts">
        <div className="flex justify-center mb-4">
          <TabsList className="bg-gray-100 p-1.5 rounded-3xl overflow-hidden">
            <TabsTrigger
              value="contracts"
              className="data-[state=active]:bg-[#00ae89] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-3xl px-6 py-3"
            >
              Contracts
            </TabsTrigger>
            <TabsTrigger
              value="my-listings"
              className="data-[state=active]:bg-[#00ae89] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-3xl px-6 py-3"
            >
              My Listings
            </TabsTrigger>
            <TabsTrigger
              value="saved-listings"
              className="data-[state=active]:bg-[#00ae89] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-3xl px-6 py-3"
            >
              Saved Listings
            </TabsTrigger>
            <TabsTrigger
              value="chats"
              className="data-[state=active]:bg-[#00ae89] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-3xl px-6 py-3"
            >
              Chats
            </TabsTrigger>
            <TabsTrigger
              value="my-info"
              className="data-[state=active]:bg-[#00ae89] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-3xl px-6 py-3"
            >
              My Info
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="contracts">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockContracts.map((contract) => (
              <Link href={`/dev/landlord-dashboard/contract/${contract.id}`} key={contract.id}>
                <div className="relative rounded-3xl overflow-hidden cursor-pointer h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 bg-white border-none">
                  <div className="relative h-[300px] w-full">
                    <Image
                      src={contract.image || "/placeholder.svg"}
                      alt={contract.property}
                      fill
                      className="object-cover"
                    />
                    {/* Price tag */}
                    <div className="absolute top-3 right-3 bg-[#00ae89] text-white px-4 py-1.5 rounded-full text-sm font-medium">
                      ${contract.rent}/mo
                    </div>

                    {/* Overlay positioned on the left */}
                    <div className="absolute bottom-3 left-3 w-[60%] bg-white/90 backdrop-blur-[2px] p-5 rounded-3xl">
                      <h3 className="text-lg font-bold text-black leading-tight mb-1">{contract.property}</h3>

                      <div className="flex items-center text-[#00ae89] mb-2">
                        <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Contract Details</span>
                      </div>

                      <div className="flex flex-col gap-1 text-sm">
                        <p>Start: {contract.startDate}</p>
                        <p>End: {contract.endDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="my-listings">
          <MyListings />
        </TabsContent>
        <TabsContent value="saved-listings">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockSavedListings.map((listing) => (
              <Link href={`/dev/landlord-dashboard/saved-listings/${listing.id}`} key={listing.id}>
                <div className="relative rounded-3xl overflow-hidden cursor-pointer h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 bg-white border-none">
                  <div className="relative h-[300px] w-full">
                    <Image
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      fill
                      className="object-cover"
                    />
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

                      <Badge
                        variant={
                          listing.status === "available"
                            ? "default"
                            : listing.status === "taken"
                              ? "secondary"
                              : "destructive"
                        }
                        className="mt-1 rounded-full px-4 py-1"
                      >
                        {listing.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Button variant="outline" className="mx-2 rounded-3xl px-6">
              Previous
            </Button>
            <Button variant="outline" className="mx-2 rounded-3xl px-6">
              Next
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="chats">
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="md:col-span-1 rounded-3xl">
              <CardHeader>
                <CardTitle>Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mockChats.map((chat) => (
                    <li
                      key={chat.id}
                      className={`p-3 rounded-3xl cursor-pointer ${
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
            <Card className="md:col-span-2 rounded-3xl">
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
                          className={`p-3 rounded-3xl ${msg.sender === "You" ? "bg-blue-100 text-right" : "bg-gray-100"}`}
                        >
                          {msg.type === "request" && msg.status === "pending" ? (
                            <div>
                              <p>{msg.content}</p>
                              {msg.action === "sign_contract" ? (
                                <Button onClick={handleContractSign} className="mt-2 rounded-3xl px-6">
                                  Sign Contract
                                </Button>
                              ) : (
                                <Button onClick={handleDocumentUpload} className="mt-2 rounded-3xl px-6">
                                  Upload Documents
                                </Button>
                              )}
                            </div>
                          ) : msg.type === "verification" ? (
                            <div className="bg-green-100 p-3 rounded-3xl">
                              <p>{msg.content}</p>
                            </div>
                          ) : msg.type === "check_in" ? (
                            <div className="bg-yellow-100 p-3 rounded-3xl">
                              <p>{msg.content}</p>
                              <Button className="mt-2 rounded-3xl px-6">Check In</Button>
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
                        className="rounded-3xl"
                      />
                      <Button onClick={handleSendMessage} className="rounded-3xl px-6">
                        Send
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="my-info">
          <Card className="rounded-3xl">
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
                        className="rounded-3xl"
                      />
                      <Input
                        value={mockTenantInfo.occupation}
                        onChange={(e) => setMockTenantInfo({ ...mockTenantInfo, occupation: e.target.value })}
                        disabled={!isEditing}
                        className="mt-2 rounded-3xl"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      value={mockTenantInfo.email}
                      onChange={(e) => setMockTenantInfo({ ...mockTenantInfo, email: e.target.value })}
                      disabled={!isEditing}
                      className="rounded-3xl"
                    />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input
                      value={mockTenantInfo.phone}
                      onChange={(e) => setMockTenantInfo({ ...mockTenantInfo, phone: e.target.value })}
                      disabled={!isEditing}
                      className="rounded-3xl"
                    />
                  </div>
                  <div>
                    <Label>Date of Birth</Label>
                    <Input
                      type="date"
                      value={mockTenantInfo.dateOfBirth}
                      onChange={(e) => setMockTenantInfo({ ...mockTenantInfo, dateOfBirth: e.target.value })}
                      disabled={!isEditing}
                      className="rounded-3xl"
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
                      src="/placeholder.svg?height=150&width=200"
                      alt="Uploaded Document"
                      width={200}
                      height={150}
                      className="rounded-3xl"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Selfie</h4>
                    <Image
                      src="/placeholder.svg?height=150&width=200"
                      alt="Selfie"
                      width={200}
                      height={150}
                      className="rounded-3xl"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button onClick={() => setIsEditing(!isEditing)} className="rounded-3xl px-6">
                {isEditing ? "Cancel" : "Edit"}
              </Button>
              {isEditing && (
                <Button onClick={handleSave} className="rounded-3xl px-6">
                  Save
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

