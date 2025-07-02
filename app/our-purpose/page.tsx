import {
  FadeInAnimation,
  SlowFadeInAnimation,
} from "../components/fade-in-animation";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Users,
  Lightbulb,
  Globe,
  Heart,
  Zap,
  Home,
  TrendingUp,
  Linkedin,
  Mail,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Values section content
const values = [
  {
    icon: Shield,
    title: "Trust & Security",
    description:
      "We prioritize the safety and security of our users, ensuring a trustworthy rental experience for all.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We foster a sense of belonging and connection among international students and property owners.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We continuously innovate to provide cutting-edge solutions for housing challenges.",
  },
  {
    icon: Globe,
    title: "Global Perspective",
    description:
      "We embrace diversity and cater to the unique needs of international students from all backgrounds.",
  },
  {
    icon: Heart,
    title: "Empathy",
    description:
      "We approach every interaction with understanding and compassion for our users' experiences.",
  },
  {
    icon: Zap,
    title: "Efficiency",
    description:
      "We strive to make the rental process as smooth and efficient as possible for all parties involved.",
  },
];

// Mission points content
const missionPoints = [
  {
    icon: Home,
    title: "Safe Housing",
    description:
      "Provide secure and comfortable housing options for international students.",
  },
  {
    icon: Globe,
    title: "Cultural Bridge",
    description:
      "Foster understanding between international students and local communities.",
  },
  {
    icon: Shield,
    title: "Fraud Prevention",
    description:
      "Implement robust verification processes to eliminate rental scams.",
  },
  {
    icon: Zap,
    title: "Streamlined Process",
    description:
      "Simplify the rental process for both students and property owners.",
  },
  {
    icon: Users,
    title: "Community Building",
    description:
      "Create a supportive network for international students adapting to new environments.",
  },
  {
    icon: TrendingUp,
    title: "Market Efficiency",
    description:
      "Improve the overall efficiency and transparency of the student housing market.",
  },
];

// Team members content
const teamMembers = [
  {
    name: "Swastik N. Amatya",
    role: "Co-Founder and Lead Designer",
    bio: "Swastik leads the design efforts at HouseSync, ensuring a seamless and intuitive user experience for students and property owners alike.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-10%20at%204.46.00%E2%80%AFPM-xmA3iaxElenZJDDzFkPYsoXrF0cBOD.png",
    linkedin: "https://linkedin.com",
    email: "swastik@housesync.com",
  },
  {
    name: "Andy Poon",
    role: "Founder and Lead Engineer",
    bio: "Andy is the visionary behind HouseSync, bringing his expertise in software engineering to create innovative solutions for student housing.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-10%20at%204.45.45%E2%80%AFPM-QQUh3ljjDzM4OiQ5HaQ9aj5n6E0X7m.png",
    linkedin: "https://linkedin.com",
    email: "andypch@gemtrifi.com",
  },
  {
    name: "Ariel Montesdeoca",
    role: "Marketing Specialist",
    bio: "Ariel drives HouseSync's marketing strategies, helping to connect students with their ideal housing solutions and property owners with reliable tenants.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-01%20at%205.29.43%E2%80%AFPM-3O7oDU3OGoA58LBtxpNgyZtq0sIatw.png",
    linkedin: "https://linkedin.com",
    email: "ariel@housesync.com",
  },
];

export default function OurPurposePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#e6f7f3] py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInAnimation>
          <h1 className="text-4xl font-bold text-center mb-4">
            Our <span className="text-[#00ae89]">Purpose</span>
          </h1>
          <SlowFadeInAnimation>
            <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              At{" "}
              <Link href="/" className="font-bold hover:underline">
                <span className="text-[#00ae89]">House</span>
                <span className="text-black">Sync</span>
              </Link>
              , our purpose is to revolutionize the way international students
              find and secure housing, creating a seamless, safe, and enriching
              experience for students and property owners alike.
            </p>
          </SlowFadeInAnimation>

          {/* Mission Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-4 text-center">
              Our Core Mission
            </h2>
            <p className="text-lg text-gray-600 text-center">
              To leverage technology and community to create a trusted platform
              that simplifies the housing journey for international students,
              fostering global connections and ensuring peace of mind for all
              parties involved.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-center mb-8">
            How We Achieve Our Mission
          </h3>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {missionPoints.map((point, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#00ae89] p-3 rounded-full mr-4">
                      <point.icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold">{point.title}</h4>
                  </div>
                  <p className="text-gray-600">{point.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Values Section */}
          <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {values.map((value, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#00ae89] p-3 rounded-full mr-4">
                      <value.icon className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-semibold">{value.title}</h2>
                  </div>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-[#00ae89] rounded-lg shadow-lg p-8 text-center text-white mb-16">
            <h2 className="text-3xl font-bold mb-4">Join Us in Our Mission</h2>
            <p className="text-lg">
              Whether you're an international student seeking a home away from
              home, or a property owner looking to make a positive impact, we
              invite you to be part of our mission. Together, we can create a
              more connected, secure, and welcoming world for students across
              the globe.
            </p>
          </div>

          {/* Team Section */}
          <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Meet the dedicated professionals behind HouseSync. Our team is
            committed to revolutionizing student housing and creating a seamless
            experience for both students and property owners.
          </p>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-6 relative w-[250px] h-[250px] mx-auto">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="rounded-lg object-cover object-center"
                    />
                  </div>
                  <h2 className="text-2xl font-semibold text-center mb-2">
                    {member.name}
                  </h2>
                  <p className="text-[#00ae89] text-center mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-center mb-6">{member.bio}</p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-[#00ae89]"
                    >
                      <Linkedin className="h-6 w-6" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-gray-600 hover:text-[#00ae89]"
                    >
                      <Mail className="h-6 w-6" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </FadeInAnimation>
      </div>
    </div>
  );
}
