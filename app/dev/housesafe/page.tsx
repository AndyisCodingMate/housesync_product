"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertTriangle, MapPin, Key, Scan, UserCheck, ClipboardCheck } from "lucide-react"
import Image from "next/image"

export default function HouseSafePage() {
  const [activeTab, setActiveTab] = useState("welcome")
  const [isAtLocation, setIsAtLocation] = useState(false)
  const [verificationProgress, setVerificationProgress] = useState(75)

  // Track which steps are available to the user
  const [availableSteps, setAvailableSteps] = useState(["welcome"])

  // Function to proceed to the next step
  const proceedToVerification = () => {
    setActiveTab("verification")
    setAvailableSteps((prev) => [...prev, "verification"])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#e6f7f3]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6 flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-8 w-8 text-[#00ae89]" />
            <h1 className="text-2xl font-bold">HouseSafe</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            // Only allow changing to tabs that are available
            if (availableSteps.includes(value)) {
              setActiveTab(value)
            }
          }}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl rounded-3xl overflow-hidden">
              <TabsTrigger
                value="welcome"
                className="data-[state=active]:bg-[#00ae89] data-[state=active]:text-white rounded-3xl"
              >
                Welcome
              </TabsTrigger>
              <TabsTrigger
                value="verification"
                className="data-[state=active]:bg-[#00ae89] data-[state=active]:text-white rounded-3xl"
                disabled={!availableSteps.includes("verification")}
              >
                Verification
              </TabsTrigger>
              <TabsTrigger
                value="checklist"
                className="data-[state=active]:bg-[#00ae89] data-[state=active]:text-white rounded-3xl"
                disabled={!availableSteps.includes("checklist")}
              >
                Checklist
              </TabsTrigger>
              <TabsTrigger
                value="complete"
                className="data-[state=active]:bg-[#00ae89] data-[state=active]:text-white rounded-3xl"
                disabled={!availableSteps.includes("complete")}
              >
                Complete
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Welcome Tab */}
          <TabsContent value="welcome" className="mt-0">
            <div className="max-w-4xl mx-auto">
              <Card className="border-none shadow-lg overflow-hidden rounded-3xl">
                <div className="bg-[#00ae89] text-white py-6 px-8">
                  <h2 className="text-3xl font-bold mb-2">Welcome to HouseSafe Check-in</h2>
                  <p className="opacity-90">
                    Complete the verification process to ensure a safe and secure rental experience
                  </p>
                </div>

                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="rounded-3xl overflow-hidden mb-6 border shadow-sm">
                        <Image
                          src="/placeholder.svg?height=500&width=900"
                          alt="House with keys"
                          width={900}
                          height={500}
                          className="w-full object-cover"
                        />
                      </div>

                      <div className="flex items-start space-x-3 p-4 bg-[#f8f9fa] rounded-3xl border">
                        <MapPin className="h-5 w-5 text-[#00ae89] mt-0.5" />
                        <div>
                          <h3 className="font-medium">Property Location</h3>
                          <p className="text-gray-600">123 Main Street, Apt 4B</p>
                          <p className="text-gray-600">San Francisco, CA 94103</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">Before You Begin</h3>

                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="bg-[#00ae89]/10 p-2 rounded-full">
                            <Key className="h-5 w-5 text-[#00ae89]" />
                          </div>
                          <div>
                            <h4 className="font-medium">Have Your Access Code Ready</h4>
                            <p className="text-gray-600 text-sm">You'll need the 6-digit code sent to your email</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="bg-[#00ae89]/10 p-2 rounded-full">
                            <Scan className="h-5 w-5 text-[#00ae89]" />
                          </div>
                          <div>
                            <h4 className="font-medium">Prepare to Take Photos</h4>
                            <p className="text-gray-600 text-sm">You'll need to document the property condition</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="bg-[#00ae89]/10 p-2 rounded-full">
                            <UserCheck className="h-5 w-5 text-[#00ae89]" />
                          </div>
                          <div>
                            <h4 className="font-medium">Verify Your Identity</h4>
                            <p className="text-gray-600 text-sm">Have your ID ready for verification</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="bg-[#00ae89]/10 p-2 rounded-full">
                            <ClipboardCheck className="h-5 w-5 text-[#00ae89]" />
                          </div>
                          <div>
                            <h4 className="font-medium">Complete the Checklist</h4>
                            <p className="text-gray-600 text-sm">Verify all property features and conditions</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <div className="flex items-center space-x-3 mb-6 p-4 bg-[#f8f9fa] rounded-3xl border">
                          <Checkbox
                            id="location"
                            checked={isAtLocation}
                            onCheckedChange={(checked) => setIsAtLocation(checked === true)}
                            className="h-5 w-5 border-2 rounded-xl data-[state=checked]:bg-[#00ae89] data-[state=checked]:border-[#00ae89]"
                          />
                          <label htmlFor="location" className="font-medium">
                            I confirm I am at the property location
                          </label>
                        </div>

                        <Button
                          className="w-full bg-[#00ae89] hover:bg-[#009b7a] text-white py-6 rounded-3xl"
                          disabled={!isAtLocation}
                          onClick={proceedToVerification}
                        >
                          Start HouseSafe Check
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Verification Tab */}
          <TabsContent value="verification" className="mt-0">
            <div className="max-w-4xl mx-auto">
              <Card className="border-none shadow-lg rounded-3xl">
                <div className="bg-[#00ae89] text-white py-6 px-8">
                  <h2 className="text-3xl font-bold mb-2">Identity Verification</h2>
                  <p className="opacity-90">Verify your identity to proceed with the property check-in</p>
                </div>

                <CardContent className="p-8">
                  <div className="mb-8">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Verification Progress</span>
                      <span>{verificationProgress}%</span>
                    </div>
                    <Progress value={verificationProgress} className="h-3 rounded-full" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-white rounded-3xl border shadow-sm">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          <span className="font-medium">Identity Verification</span>
                        </div>
                        <Badge className="bg-green-500 rounded-full px-4 py-1">Completed</Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white rounded-3xl border shadow-sm">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          <span className="font-medium">Email Verification</span>
                        </div>
                        <Badge className="bg-green-500 rounded-full px-4 py-1">Completed</Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white rounded-3xl border shadow-sm">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          <span className="font-medium">Phone Verification</span>
                        </div>
                        <Badge className="bg-green-500 rounded-full px-4 py-1">Completed</Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white rounded-3xl border shadow-sm">
                        <div className="flex items-center">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3" />
                          <span className="font-medium">Property Access Code</span>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-yellow-500/10 text-yellow-600 border-yellow-200 rounded-full px-4 py-1"
                        >
                          Required
                        </Badge>
                      </div>
                    </div>

                    <div className="bg-[#f8f9fa] p-6 rounded-3xl border">
                      <h3 className="text-xl font-semibold mb-4">Enter Access Code</h3>
                      <p className="text-gray-600 mb-6">
                        Please enter the 6-digit access code that was sent to your email to verify your presence at the
                        property.
                      </p>

                      <div className="grid grid-cols-6 gap-2 mb-6">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="h-12 bg-white rounded-2xl border flex items-center justify-center text-xl font-bold"
                          >
                            {i === 0
                              ? "1"
                              : i === 1
                                ? "2"
                                : i === 2
                                  ? "3"
                                  : i === 3
                                    ? "4"
                                    : i === 4
                                      ? "5"
                                      : i === 5
                                        ? "6"
                                        : ""}
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setActiveTab("welcome")} className="rounded-3xl px-6">
                          Back
                        </Button>

                        <Button
                          className="bg-[#00ae89] hover:bg-[#009b7a] text-white rounded-3xl px-6"
                          onClick={() => {
                            setActiveTab("checklist")
                            setAvailableSteps((prev) => [...prev, "checklist"])
                          }}
                        >
                          Verify Code
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Checklist Tab - Hidden for now */}
          <TabsContent value="checklist" className="mt-0">
            <div className="max-w-4xl mx-auto">
              <Card className="border-none shadow-lg rounded-3xl">
                <div className="bg-[#00ae89] text-white py-6 px-8">
                  <h2 className="text-3xl font-bold mb-2">Property Checklist</h2>
                  <p className="opacity-90">Verify the condition of the property before completing your check-in</p>
                </div>

                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 p-4 bg-white rounded-3xl border shadow-sm">
                      <Checkbox
                        id="entrance"
                        className="h-5 w-5 border-2 rounded-xl data-[state=checked]:bg-[#00ae89] data-[state=checked]:border-[#00ae89]"
                      />
                      <label htmlFor="entrance" className="font-medium">
                        Entrance and hallway in good condition
                      </label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-white rounded-3xl border shadow-sm">
                      <Checkbox
                        id="kitchen"
                        className="h-5 w-5 border-2 rounded-xl data-[state=checked]:bg-[#00ae89] data-[state=checked]:border-[#00ae89]"
                      />
                      <label htmlFor="kitchen" className="font-medium">
                        Kitchen appliances working properly
                      </label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-white rounded-3xl border shadow-sm">
                      <Checkbox
                        id="bathroom"
                        className="h-5 w-5 border-2 rounded-xl data-[state=checked]:bg-[#00ae89] data-[state=checked]:border-[#00ae89]"
                      />
                      <label htmlFor="bathroom" className="font-medium">
                        Bathroom fixtures functioning
                      </label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-white rounded-3xl border shadow-sm">
                      <Checkbox
                        id="bedroom"
                        className="h-5 w-5 border-2 rounded-xl data-[state=checked]:bg-[#00ae89] data-[state=checked]:border-[#00ae89]"
                      />
                      <label htmlFor="bedroom" className="font-medium">
                        Bedroom in clean condition
                      </label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-white rounded-3xl border shadow-sm">
                      <Checkbox
                        id="windows"
                        className="h-5 w-5 border-2 rounded-xl data-[state=checked]:bg-[#00ae89] data-[state=checked]:border-[#00ae89]"
                      />
                      <label htmlFor="windows" className="font-medium">
                        Windows and doors secure and functioning
                      </label>
                    </div>

                    <div className="flex justify-between mt-8">
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("verification")}
                        className="rounded-3xl px-6"
                      >
                        Back
                      </Button>

                      <Button
                        className="bg-[#00ae89] hover:bg-[#009b7a] text-white rounded-3xl px-6"
                        onClick={() => {
                          setActiveTab("complete")
                          setAvailableSteps((prev) => [...prev, "complete"])
                        }}
                      >
                        Complete Checklist
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Complete Tab - Hidden for now */}
          <TabsContent value="complete" className="mt-0">
            <div className="max-w-4xl mx-auto">
              <Card className="border-none shadow-lg rounded-3xl">
                <div className="bg-[#00ae89] text-white py-6 px-8">
                  <h2 className="text-3xl font-bold mb-2">Check-in Complete!</h2>
                  <p className="opacity-90">You have successfully completed the HouseSafe check-in process</p>
                </div>

                <CardContent className="p-8 text-center">
                  <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-[#00ae89]/10 rounded-full mb-4">
                      <CheckCircle className="h-12 w-12 text-[#00ae89]" />
                    </div>
                    <h3 className="text-2xl font-bold">Congratulations!</h3>
                    <p className="text-gray-600 mt-2">Your property check-in has been verified and recorded</p>
                  </div>

                  <div className="bg-[#f8f9fa] p-6 rounded-3xl border mb-8 text-left">
                    <h4 className="font-semibold mb-2">Check-in Details:</h4>
                    <p className="text-gray-600">Property: 123 Main Street, Apt 4B</p>
                    <p className="text-gray-600">Check-in Date: {new Date().toLocaleDateString()}</p>
                    <p className="text-gray-600">Check-in Time: {new Date().toLocaleTimeString()}</p>
                    <p className="text-gray-600">Verification ID: HS-{Math.floor(100000 + Math.random() * 900000)}</p>
                  </div>

                  <Button className="bg-[#00ae89] hover:bg-[#009b7a] text-white px-8 rounded-3xl py-3">
                    Return to Dashboard
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

