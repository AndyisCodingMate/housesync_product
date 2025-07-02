import { FadeInAnimation } from "../components/fade-in-animation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#e6f7f3] py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInAnimation>
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-12">
              Contact <span className="text-[#00ae89]">Us</span>
            </h1>

            <div className="grid gap-8">
              {/* Email Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex-shrink-0">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/emailIcon-RnBWKWMbO7jCaNuuhEuYPuFlx6mUXe.png"
                        alt="Email Icon"
                        width={48}
                        height={48}
                        className="w-12 h-12 p-2"
                      />
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-xl font-semibold mb-2">Email Us</h2>
                      <Link
                        href="mailto:andypoon@housesync.us"
                        className="text-[#00ae89] hover:underline"
                      >
                        andypoon@housesync.us
                      </Link>
                    </div>
                    <Button asChild className="bg-[#00ae89] hover:bg-[#009b7a]">
                      <Link href="mailto:andypoon@housesync.us">
                        Send Email
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Phone Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex-shrink-0">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PhoneIcon.jpg-WQFgjxhNRnLhC7DNzadIDb78La9EB9.jpeg"
                        alt="Phone Icon"
                        width={48}
                        height={48}
                        className="w-12 h-12 p-2"
                      />
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-xl font-semibold mb-2">Call Us</h2>
                      <Link
                        href="tel:+16282079782"
                        className="text-[#00ae89] hover:underline"
                      >
                        +1 (628) 207-9782
                      </Link>
                    </div>
                    <Button asChild className="bg-[#00ae89] hover:bg-[#009b7a]">
                      <Link href="tel:+16282079782">Call Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center text-gray-600">
              <p>
                We're here to help! Contact us through any of the channels
                above.
              </p>
              <p className="mt-2">
                Our team will get back to you as soon as possible.
              </p>
            </div>
          </div>
        </FadeInAnimation>
      </div>
    </div>
  );
}
