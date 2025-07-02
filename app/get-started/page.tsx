"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FadeInAnimation } from "../components/fade-in-animation";
import { motion, AnimatePresence } from "framer-motion";

type UserType = "tenant" | "landlord" | null;
type TenantType = "local" | "international" | null;

export default function GetStartedPage() {
  const [userType, setUserType] = useState<UserType>(null);
  const [tenantType, setTenantType] = useState<TenantType>(null);
  const [showHeading, setShowHeading] = useState(false);

  useEffect(() => {
    // Trigger the animation after component mounts
    setShowHeading(true);
  }, []);

  const handleChoice = (choice: UserType) => {
    setUserType(choice);
    setTenantType(null);
  };

  const handleTenantChoice = (choice: TenantType) => {
    setTenantType(choice);
  };

  const handleBack = () => {
    if (tenantType !== null) {
      setTenantType(null);
    } else {
      setUserType(null);
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden py-16"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/75 backdrop-blur-[2px]"></div>

      {/* Main content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInAnimation>
          <h1 className="text-4xl font-bold text-center mb-4">
            Get Started with <span className="text-[#00ae89]">House</span>
            <span className="text-black">Sync</span>
          </h1>

          <motion.p
            className="text-2xl text-center text-gray-600 mb-8 overflow-hidden"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: showHeading ? 0 : -50, opacity: showHeading ? 1 : 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          >
            I am a...
          </motion.p>

          <AnimatePresence mode="wait">
            {userType === null ? (
              <motion.div
                key="initial-choice"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
                  <Card
                    className="w-full sm:w-80 h-64 cursor-pointer hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-white shadow-md rounded-2xl overflow-hidden"
                    onClick={() => handleChoice("tenant")}
                  >
                    <CardContent className="flex flex-col items-center justify-center h-full p-6">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Tanant%20Icon-fyrRhfxv55j5P7illeBdS2KQJxK0Mq.png"
                        alt="Tenant Icon"
                        width={80}
                        height={80}
                        className="mb-4"
                      />
                      <h2
                        className="text-2xl font-semibold tracking-wide text-black"
                        style={{
                          fontFamily: "Segoe UI, system-ui, sans-serif",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Tenant
                      </h2>
                    </CardContent>
                  </Card>
                  <Card
                    className="w-full sm:w-80 h-64 cursor-pointer hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-white shadow-md rounded-2xl overflow-hidden"
                    onClick={() => handleChoice("landlord")}
                  >
                    <CardContent className="flex flex-col items-center justify-center h-full p-6">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LandlordIcon-74B9Ppro1PSwy6Gqzdx60WYLVyi1qe.png"
                        alt="Landlord Icon"
                        width={80}
                        height={80}
                        className="mb-4"
                      />
                      <h2
                        className="text-2xl font-semibold tracking-wide text-black"
                        style={{
                          fontFamily: "Segoe UI, system-ui, sans-serif",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Landlord
                      </h2>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ) : userType === "tenant" && tenantType === null ? (
              <motion.div
                key="tenant-choice"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
                  <Card
                    className="w-full sm:w-80 h-64 cursor-pointer hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-white shadow-md rounded-2xl overflow-hidden"
                    onClick={() => handleTenantChoice("local")}
                  >
                    <CardContent className="flex flex-col items-center justify-center h-full p-6">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/USAicon-Jdsa7lQ1TwdcO6XU6U6kyZMMh0ZyXM.png"
                        alt="USA Flag Icon"
                        width={80}
                        height={80}
                        className="mb-4"
                      />
                      <h2
                        className="text-2xl font-semibold tracking-wide text-black"
                        style={{
                          fontFamily: "Segoe UI, system-ui, sans-serif",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Local Tenant
                      </h2>
                    </CardContent>
                  </Card>
                  <Card
                    className="w-full sm:w-80 h-64 cursor-pointer hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-white shadow-md rounded-2xl overflow-hidden"
                    onClick={() => handleTenantChoice("international")}
                  >
                    <CardContent className="flex flex-col items-center justify-center h-full p-6">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InterIcon-ycWpwpJA45itPPM4CLaEKfutC6pL5g.png"
                        alt="International Student Icon"
                        width={80}
                        height={80}
                        className="mb-4"
                      />
                      <h2
                        className="text-2xl font-semibold tracking-wide text-black"
                        style={{
                          fontFamily: "Segoe UI, system-ui, sans-serif",
                          letterSpacing: "0.5px",
                        }}
                      >
                        International Tenant
                      </h2>
                    </CardContent>
                  </Card>
                </div>
                <div className="mt-6 text-center">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="bg-white shadow-sm rounded-xl"
                  >
                    Go Back
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="instructions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl overflow-hidden">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">
                      {userType === "landlord"
                        ? "Landlord"
                        : tenantType === "local"
                          ? "Local Tenant"
                          : "International Tenant"}{" "}
                      Instructions
                    </h2>
                    {userType === "landlord" ? (
                      <ol className="list-decimal list-inside space-y-2">
                        <li>Sign up for a HouseSync landlord account</li>
                        <li>Verify your identity and property ownership</li>
                        <li>
                          List your properties with detailed descriptions and
                          high-quality photos
                        </li>
                        <li>Set your rental criteria and preferences</li>
                        <li>
                          Use our AI-powered tenant matching system to find
                          ideal renters
                        </li>
                        <li>
                          Review applications and conduct background checks
                        </li>
                        <li>
                          Communicate with potential tenants through our secure
                          platform
                        </li>
                        <li>Create and send lease agreements electronically</li>
                        <li>
                          Set up rent collection through our secure payment
                          system
                        </li>
                        <li>
                          Manage your properties efficiently with our tools and
                          insights
                        </li>
                      </ol>
                    ) : tenantType === "local" ? (
                      <ol className="list-decimal list-inside space-y-2">
                        <li>Create an account on HouseSync</li>
                        <li>
                          Complete your profile with personal information and
                          preferences
                        </li>
                        <li>
                          Browse available properties that match your criteria
                        </li>
                        <li>Schedule viewings through the platform</li>
                        <li>Submit rental applications securely</li>
                        <li>
                          Use our AI-powered matching system to find your ideal
                          home
                        </li>
                        <li>
                          Communicate with landlords through our secure
                          messaging system
                        </li>
                        <li>Sign your lease agreement electronically</li>
                        <li>Set up rent payments through our platform</li>
                        <li>Enjoy your new home!</li>
                      </ol>
                    ) : (
                      <ol className="list-decimal list-inside space-y-2">
                        <li>Create an account on HouseSync</li>
                        <li>
                          Complete your profile with personal information and
                          preferences
                        </li>
                        <li>
                          Upload necessary documentation for international
                          verification
                        </li>
                        <li>
                          Browse available properties that match your criteria
                        </li>
                        <li>Schedule virtual viewings through the platform</li>
                        <li>Submit rental applications securely</li>
                        <li>
                          Use our AI-powered matching system to find your ideal
                          home
                        </li>
                        <li>
                          Communicate with landlords through our secure
                          messaging system
                        </li>
                        <li>Sign your lease agreement electronically</li>
                        <li>Set up rent payments through our platform</li>
                        <li>
                          Access our international student resources and
                          community
                        </li>
                        <li>Enjoy your new home!</li>
                      </ol>
                    )}
                    <div className="mt-6 flex justify-between">
                      <Button
                        onClick={handleBack}
                        variant="outline"
                        className="bg-white shadow-sm rounded-xl"
                      >
                        Go Back
                      </Button>
                      <Button
                        asChild
                        className="bg-[#00ae89] hover:bg-[#009b7a] text-white rounded-full group"
                      >
                        <Link href="/sign-up">
                          <span className="flex items-center">
                            Let's Go
                            <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100 ml-1">
                              →
                            </span>
                          </span>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </FadeInAnimation>
      </div>
    </div>
  );
}
