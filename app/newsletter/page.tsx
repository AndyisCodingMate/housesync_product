"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { FadeInAnimation, SlowFadeInAnimation } from "../components/fade-in-animation"
import Link from "next/link"

export default function NewsletterPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Success!",
      description: "You've been subscribed to our newsletter.",
    })

    setEmail("")
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="relative py-24 px-6 sm:py-32"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <FadeInAnimation>
          <div className="relative max-w-md mx-auto bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-8">
            <div className="text-center">
              <SlowFadeInAnimation>
                <h1 className="text-3xl font-bold text-gray-900">Subscribe to Our Newsletter</h1>
                <p className="mt-2 text-sm text-gray-600">
                  Stay updated with the latest news, features, and updates from HouseSync
                </p>
              </SlowFadeInAnimation>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <SlowFadeInAnimation>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                </SlowFadeInAnimation>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00ae89] focus:border-[#00ae89]"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-[#00ae89] hover:bg-[#009b7a]" disabled={isLoading}>
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </FadeInAnimation>
      </div>

      {/* Company News Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FadeInAnimation>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Green Header */}
            <div className="bg-[#00ae89] py-12 px-6">
              <h2 className="text-4xl font-bold text-white text-center">Find Affordable Housing Off-Campus</h2>
            </div>

            {/* Main Content */}
            <div className="p-8">
              <h3 className="text-3xl font-bold text-center mb-8">SpartUp X CED Hackathon 2024 Winner!</h3>

              <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
                HouseSync gained recognition by winning first place at the 2024 SpartUp x CED Hackathon, a competitive
                event showcasing innovative ideas. The project stood out for its unique approach to solving housing
                challenges for international students through features like dual verification and secure transactions.
                This win highlights HouseSync's potential to make a significant impact in the rental market and
                validates the hard work and creativity behind the platform's development.
              </p>

              <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                <Button className="bg-[#00ae89] hover:bg-[#009b7a] text-white px-8 py-6 text-lg">
                  Hear about the team's experience here.
                </Button>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/First%20place%20CED-U2rOX3vgw83C3jkXgQy0nolu65vmIw.jpeg"
                  alt="HouseSync team receiving first place award at SJSU CED Hackathon"
                  className="w-80 h-48 object-cover rounded-lg"
                />
              </div>

              <div className="border-t border-gray-200 pt-8 mb-8">
                <h3 className="text-2xl font-bold text-[#1d4ed8] text-center mb-2">Join HouseSync on Media!</h3>
                <div className="text-center">
                  <Link
                    href="https://linkedin.com"
                    className="text-[#1d4ed8] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </Link>
                </div>
              </div>

              <div className="bg-gray-50 p-8 text-center">
                <p className="text-lg">
                  HouseSync is a secure rental platform for international students in the U.S., offering dual
                  verification to authenticate landlords and tenants, and move-in verification to prevent scams. It also
                  regulates transactions to ensure fairness in disputes or cancellations, providing a reliable solution
                  for housing challenges.
                </p>
              </div>
            </div>
          </div>
        </FadeInAnimation>
      </div>
    </div>
  )
}

