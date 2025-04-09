"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ImageSlideshow } from "./image-slideshow"

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1616137466211-f939a420be84?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/80"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 lg:w-full lg:max-w-2xl">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Simplify your rental</span>{" "}
                <span className="block text-[#00ae89] xl:inline">experience with AI</span>
              </h1>

              <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                HouseSync leverages advanced AI and personalized services to connect verified tenants with landlords,
                ensuring a secure and efficient rental experience. Say goodbye to scams and tedious applications, and
                hello to your ideal home or tenant.
              </p>

              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div>
                  <Button
                    asChild
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-[#00ae89] hover:bg-[#009b7a] md:py-4 md:text-lg md:px-10 group"
                  >
                    <Link href="/get-started">
                      <span className="flex items-center">
                        Get started
                        <span className="ml-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          →
                        </span>
                      </span>
                    </Link>
                  </Button>
                </div>

                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-[#00ae89] bg-[#e6f7f3] hover:bg-[#d1f0e9] md:py-4 md:text-lg md:px-10"
                  >
                    Learn more
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 h-56 sm:h-72 md:h-96 lg:h-full">
        <ImageSlideshow />
      </div>
    </div>
  )
}

