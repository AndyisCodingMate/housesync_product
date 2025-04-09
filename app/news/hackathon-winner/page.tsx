import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HackathonArticlePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Green Header */}
      <div className="bg-[#00ae89] text-white py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center max-w-4xl mx-auto">
          Find Affordable Housing Off-Campus
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">SpartUp X CED Hackathon 2024 Winner!</h2>

        <p className="text-lg text-center mb-12 leading-relaxed">
          HouseSync gained recognition by winning first place at the 2024 SpartUp x CED Hackathon, a competitive event
          showcasing innovative ideas. The project stood out for its unique approach to solving housing challenges for
          international students through features like dual verification and secure transactions. This win highlights
          HouseSync's potential to make a significant impact in the rental market and validates the hard work and
          creativity behind the platform's development.
        </p>

        <div className="flex justify-center mb-12">
          <Button className="bg-[#00ae89] hover:bg-[#009b7a] text-white px-8 py-4 text-lg w-full md:w-auto">
            Hear about the team's experience here.
          </Button>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-[#1d4ed8] mb-4">Join HouseSync on Media!</h3>
          <Link
            href="https://linkedin.com"
            className="text-[#1d4ed8] hover:underline text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Link>
        </div>

        <p className="text-lg text-center leading-relaxed mb-12">
          HouseSync is a secure rental platform for international students in the U.S., offering dual verification to
          authenticate landlords and tenants, and move-in verification to prevent scams. It also regulates transactions
          to ensure fairness in disputes or cancellations, providing a reliable solution for housing challenges.
        </p>
      </div>

      {/* Green Footer */}
      <div className="bg-[#00ae89] h-24" />
    </div>
  )
}

