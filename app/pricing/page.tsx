import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FadeInAnimation } from "../components/fade-in-animation"

const plans = [
  {
    name: "Basic",
    price: "20.99",
    current: true,
    features: [
      "Commission Rate: 10%",
      "List up to 2 properties",
      "Access to tenant verification service",
      "Basic customer support",
      "Performance Insights for listed properties",
    ],
  },
  {
    name: "Intermediate",
    price: "25.99",
    features: [
      "Everything in Basic",
      "Commission Rate: 8%",
      "List up to 3 properties",
      "Priority tenant matching",
      "Enhanced customer support",
      "Performance Insights for listed properties",
    ],
  },
  {
    name: "Advanced",
    price: "29.99",
    features: [
      "Everything in Intermediate",
      "Commission Rate: 6%",
      "List up to 5 properties",
      "Priority Customer support",
      "Exclusive access to Gem Clients",
      "Property health check",
      "Enhanced lease management services",
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#e6f7f3]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FadeInAnimation>
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight">
              Simple, transparent <span className="text-[#00ae89]">pricing</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600">Choose the perfect plan for your property management needs</p>
          </div>
          <div className="grid gap-6 lg:gap-8 md:grid-cols-3 max-w-7xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className="relative flex flex-col p-6 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-[#00ae89]">{plan.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-8">
                    <span className="text-5xl font-bold">
                      ${plan.price.split(".")[0]}
                      <sup className="text-2xl font-bold">{plan.price.split(".")[1]}</sup>
                      <span className="text-xl font-normal text-gray-500 ml-2">USD/month</span>
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-[#00ae89] shrink-0 mt-0.5" />
                        <span className="ml-3 text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full rounded-full text-lg py-6 ${
                      plan.current ? "bg-gray-400 hover:bg-gray-500" : "bg-[#00ae89] hover:bg-[#009b7a]"
                    }`}
                  >
                    {plan.current ? "Your current plan" : "Upgrade plan"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </FadeInAnimation>
      </div>
    </div>
  )
}

