"use client"

import FeaturesSection from "./components/features-section"
import TestimonialsSection from "./components/testimonials-section"
import CtaSection from "./components/cta-section"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div
        className="relative py-24 sm:py-32"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Enhanced layered overlays for a darker, more subdued aesthetic */}
        {/* Primary darkening layer with slightly reduced opacity */}
        <div className="absolute inset-0 bg-black/55"></div>
        {/* Enhanced color correction to neutralize yellow tones */}
        <div className="absolute inset-0 bg-blue-950/20"></div>
        {/* Subtle gradient overlay to improve text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent"></div>
        {/* Very subtle blur for depth */}
        <div className="absolute inset-0 backdrop-blur-[0.5px]"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col items-center space-y-6">
            {/* Main Headline - now white */}
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-[2.8rem] sm:text-[3.5rem] md:text-[4.2rem] lg:text-[5rem] leading-tight font-extrabold text-white text-shadow-lg"
            >
              Rent with Assurance
            </motion.h1>

            {/* Subheading with bullet points and simultaneous animation - now in teal */}
            <div className="flex flex-wrap items-center justify-center text-[1rem] sm:text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem] leading-tight font-bold text-[#00ae89] text-shadow-lg">
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Verified Landlords
              </motion.span>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="mx-2 text-white"
              >
                •
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Pre-Screened Tenants
              </motion.span>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="mx-2 text-white"
              >
                •
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Powered by AI
              </motion.span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              href="/get-started"
              className="inline-block px-8 py-2.5 text-base font-medium rounded-full text-white bg-[#00ae89] hover:bg-[#009b7a] md:text-lg md:px-10 mx-auto sm:mx-0 transition-all duration-300 hover:scale-105 group"
            >
              <span className="flex items-center justify-center">
                Get Started
                <span className="ml-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">→</span>
              </span>
            </Link>

            <Link
              href="/marketplace"
              className="inline-block px-8 py-2.5 text-base font-medium rounded-full text-white border border-white bg-black/15 hover:bg-white/15 md:text-lg md:px-10 transition-colors mx-auto sm:mx-0 backdrop-blur-[2px]"
            >
              Marketplace
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Other Sections */}
      <div className="mt-12">
        <FeaturesSection />
        <TestimonialsSection />
        <CtaSection />
      </div>
    </div>
  )
}

