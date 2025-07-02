import {
  FadeInAnimation,
  SlowFadeInAnimation,
} from "../components/fade-in-animation";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Home, Quote } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const customerTypes = [
  {
    icon: GraduationCap,
    title: "Students",
    description:
      "We serve all students, with a special focus on international students from around the world seeking safe and comfortable housing while studying abroad.",
  },
  {
    icon: Home,
    title: "Property Owners",
    description:
      "Landlords and property managers looking to connect with reliable student tenants, including those from diverse international backgrounds.",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "International Student from China",
    quote:
      "HouseSync made finding a home in a new country so much easier. I felt safe and supported throughout the entire process.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "John Smith",
    role: "Property Owner in New York",
    quote:
      "As a landlord, HouseSync has been a game-changer. The verification process gives me peace of mind, and I've met wonderful tenants from all over the world.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Maria Rodriguez",
    role: "Exchange Student from Spain",
    quote:
      "Thanks to HouseSync, I found not just an apartment, but a real home and community during my studies abroad.",
    image: "/placeholder.svg?height=100&width=100",
  },
];

export default function OurCustomersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#e6f7f3] py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInAnimation>
          <h1 className="text-4xl font-bold text-center mb-4">
            Our <span className="text-[#00ae89]">Customers</span>
          </h1>
          <SlowFadeInAnimation>
            <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              At{" "}
              <Link href="/" className="font-bold hover:underline">
                <span className="text-[#00ae89]">House</span>
                <span className="text-black">Sync</span>
              </Link>
              , we're proud to serve a diverse community of students, including
              international students from across the globe, and property owners.
              Our platform brings these groups together, creating mutually
              beneficial relationships and fostering cultural exchange.
            </p>
          </SlowFadeInAnimation>

          <div className="grid gap-8 md:grid-cols-2 mb-16">
            {customerTypes.map((type, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#00ae89] p-3 rounded-full mr-4">
                      <type.icon className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-semibold">{type.title}</h2>
                  </div>
                  <p className="text-gray-600">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-center mb-8">
            What Our Customers Say
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <Quote className="h-8 w-8 text-[#00ae89] opacity-20 absolute top-0 left-0 -mt-2 -ml-3" />
                    <p className="text-gray-600 italic relative z-10 pl-4">
                      "{testimonial.quote}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <SlowFadeInAnimation>
            <div className="mt-16 bg-white rounded-lg shadow-lg p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
              <p className="text-lg text-gray-600 mb-6">
                Whether you're a student looking for your ideal living space, an
                international student seeking a home away from home, or a
                property owner wanting to connect with reliable tenants from
                diverse backgrounds, HouseSync is here to support you every step
                of the way.
              </p>
              <Link
                href="/get-started"
                className="bg-[#00ae89] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#009b7a] transition-colors"
              >
                Get Started Today
              </Link>
            </div>
          </SlowFadeInAnimation>
        </FadeInAnimation>
      </div>
    </div>
  );
}
