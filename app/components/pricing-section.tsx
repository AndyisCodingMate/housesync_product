import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Landlord Membership",
    price: "200",
    period: "year",
    features: [
      "Unlimited property listings",
      "AI-powered tenant matching",
      "ID verification system",
      "Document verification",
      "Smart check-in system",
      "24/7 support",
      "Analytics dashboard",
    ],
  },
];

export default function PricingSection() {
  return (
    <div className="bg-gray-100 py-12 sm:py-16 lg:py-20" id="pricing">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Landlord Membership
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Everything you need to manage your properties efficiently
          </p>
        </div>
        <div className="mt-16 flex justify-center">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="flex flex-col overflow-hidden rounded-lg bg-white shadow-lg max-w-md w-full"
            >
              <div className="px-6 py-8 sm:p-10 sm:pb-6">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="ml-1 text-xl font-semibold text-gray-500">
                    /{plan.period}
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between px-6 pt-6 pb-8 sm:p-10 sm:pt-6">
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check
                          className="h-6 w-6 text-green-500"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="ml-3 text-base text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button className="w-full bg-[#00ae89] hover:bg-[#009b7a] text-white">
                    Get started
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
