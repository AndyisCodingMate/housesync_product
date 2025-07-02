import { UserCheck, Zap, Shield, TrendingUp } from "lucide-react";

const features = [
  {
    name: "AI-Powered Matching",
    description:
      "Our advanced AI algorithms ensure perfect tenant-landlord matches based on preferences and requirements.",
    icon: Zap,
  },
  {
    name: "Verified Users",
    description:
      "We verify both tenants and landlords to create a safe and trustworthy rental environment.",
    icon: UserCheck,
  },
  {
    name: "Secure Process",
    description:
      "Our platform ensures secure communication and transaction processes for all parties involved.",
    icon: Shield,
  },
  {
    name: "Efficient Renting",
    description:
      "Streamline the entire rental process, from property listing to lease signing, saving time and effort.",
    icon: TrendingUp,
  },
];

export default function FeaturesSection() {
  return (
    <div className="py-12 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-[#00ae89] font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Revolutionizing the rental experience
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            HouseSync offers a comprehensive set of tools to make renting safer,
            faster, and more efficient for both tenants and landlords.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#00ae89] text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
