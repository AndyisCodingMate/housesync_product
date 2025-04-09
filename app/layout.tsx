import "./globals.css"
import { Inter } from "next/font/google"
import Footer from "./components/footer"
import Navigation from "./components/navigation"
import { FadeInAnimation } from "./components/fade-in-animation"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "HouseSync - Simplify Rental Matching",
  description:
    "HouseSync provides AI-powered tenant-landlord matching and verification services for a safe and efficient rental experience.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <FadeInAnimation>
          <main className="relative z-0">{children}</main>
        </FadeInAnimation>
        <Footer />
      </body>
    </html>
  )
}



import './globals.css'