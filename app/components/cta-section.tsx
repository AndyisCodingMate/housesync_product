import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <div className="bg-[#00ae89]">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">
            Ready to simplify your rental experience?
          </span>
          <span className="block">Start using HouseSync today.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-[#e6f7f3]">
          Join thousands of landlords and tenants who have already transformed
          their rental process with our AI-powered platform.
        </p>
        <Button
          asChild
          className="mt-8 rounded-full py-2.5 px-6 transition-transform duration-300 hover:scale-105 group"
          size="lg"
        >
          <Link href="/get-started">
            <span className="flex items-center justify-center">
              Get Started Now
              <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100 ml-1">
                →
              </span>
            </span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
