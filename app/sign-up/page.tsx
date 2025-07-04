"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FadeInAnimation } from "../components/fade-in-animation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createClient } from "@/utils/supabase/client";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "tenant", // Default selection
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, userType: value }));
  };

  const roleMap: Record<string, string> = {
    "international-tenant": "international",
    "local-tenant": "tenant",
    landlord: "landlord",
    "property-manager": "property_manager",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    const supabase = createClient();
    const verifiedRole = roleMap[formData.userType] || "tenant";

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          verified_role: verifiedRole,
        },
      },
    });

    if (error) {
      console.error("Signup error:", error);
      alert(`Signup error: ${error.message || JSON.stringify(error)}`);
    } else {
      console.log("User created:", data);
      // Redirect to dashboard
      window.location.href = "/dashboard";
    }

    setIsLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#e6f7f3] py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInAnimation>
          <div className="max-w-md mx-auto">
            <Card className="shadow-lg">
              <CardHeader className="space-y-0.5 pb-2">
                <div className="flex justify-center">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/T_Logo1%20copy-CSl6tOI8CF5fPRHGx6CNkyn4dSfZDE.png"
                    alt="HouseSync Logo"
                    width={300}
                    height={110}
                    className="h-28 w-auto"
                  />
                </div>
                <CardTitle className="text-2xl font-bold text-center">
                  Create an Account
                </CardTitle>
                <CardDescription className="text-center">
                  Enter your information to create your{" "}
                  <span className="text-[#00ae89] font-medium">House</span>
                  <span className="text-black font-medium">Sync</span> account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-base">I am a:</Label>
                    <RadioGroup
                      defaultValue={formData.userType}
                      onValueChange={handleUserTypeChange}
                      className="grid grid-cols-1 gap-4 pt-2"
                    >
                      <div
                        className={`flex items-center space-x-2 rounded-lg border p-3 cursor-pointer hover:bg-gray-50 ${
                          formData.userType === "international-tenant"
                            ? "border-[#00ae89] bg-[#00ae89]/5"
                            : ""
                        }`}
                      >
                        <RadioGroupItem
                          value="international-tenant"
                          id="international-tenant"
                          className="RadioGroupItem"
                        />
                        <Label
                          htmlFor="international-tenant"
                          className="flex-1 cursor-pointer"
                        >
                          <div
                            className={`font-medium ${
                              formData.userType === "international-tenant"
                                ? "text-[#00ae89]"
                                : ""
                            }`}
                          >
                            International Tenant
                          </div>
                          <div className="text-sm text-gray-500">
                            For students and renters from abroad
                          </div>
                        </Label>
                      </div>
                      <div
                        className={`flex items-center space-x-2 rounded-lg border p-3 cursor-pointer hover:bg-gray-50 ${
                          formData.userType === "local-tenant"
                            ? "border-[#00ae89] bg-[#00ae89]/5"
                            : ""
                        }`}
                      >
                        <RadioGroupItem
                          value="local-tenant"
                          id="local-tenant"
                          className="RadioGroupItem"
                        />
                        <Label
                          htmlFor="local-tenant"
                          className="flex-1 cursor-pointer"
                        >
                          <div
                            className={`font-medium ${
                              formData.userType === "local-tenant"
                                ? "text-[#00ae89]"
                                : ""
                            }`}
                          >
                            Local Tenant
                          </div>
                          <div className="text-sm text-gray-500">
                            For domestic students and renters
                          </div>
                        </Label>
                      </div>
                      <div
                        className={`flex items-center space-x-2 rounded-lg border p-3 cursor-pointer hover:bg-gray-50 ${
                          formData.userType === "landlord"
                            ? "border-[#00ae89] bg-[#00ae89]/5"
                            : ""
                        }`}
                      >
                        <RadioGroupItem
                          value="landlord"
                          id="landlord"
                          className="RadioGroupItem"
                        />
                        <Label
                          htmlFor="landlord"
                          className="flex-1 cursor-pointer"
                        >
                          <div
                            className={`font-medium ${
                              formData.userType === "landlord"
                                ? "text-[#00ae89]"
                                : ""
                            }`}
                          >
                            Landlord
                          </div>
                          <div className="text-sm text-gray-500">
                            For property owners and managers
                          </div>
                        </Label>
                      </div>
                      <div
                        className={`flex items-center space-x-2 rounded-lg border p-3 cursor-pointer hover:bg-gray-50 ${
                          formData.userType === "property-manager"
                            ? "border-[#00ae89] bg-[#00ae89]/5"
                            : ""
                        }`}
                      >
                        <RadioGroupItem
                          value="property-manager"
                          id="property-manager"
                          className="RadioGroupItem"
                        />
                        <Label
                          htmlFor="property-manager"
                          className="flex-1 cursor-pointer"
                        >
                          <div
                            className={`font-medium ${
                              formData.userType === "property-manager"
                                ? "text-[#00ae89]"
                                : ""
                            }`}
                          >
                            Property Manager
                          </div>
                          <div className="text-sm text-gray-500">
                            For managers overseeing properties
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#00ae89] hover:bg-[#009b7a] rounded-full py-6"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Sign Up"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-center text-sm">
                  By signing up, you agree to our{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-[#00ae89] hover:underline"
                  >
                    Terms of Service and Privacy Policy
                  </Link>
                </div>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-[#00ae89] hover:underline"
                  >
                    Log in
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </FadeInAnimation>
      </div>
      <style jsx global>{`
        .RadioGroupItem {
          appearance: none;
          background-color: transparent;
          width: 1.5em;
          height: 1.5em;
          border: 2px solid #d1d5db;
          border-radius: 50%;
          position: relative;
        }

        .RadioGroupItem[data-state="checked"] {
          border-color: #00ae89;
          background-color: transparent;
        }

        .RadioGroupItem[data-state="checked"]::after {
          content: "";
          display: block;
          width: 0.75em;
          height: 0.75em;
          border-radius: 50%;
          background-color: #00ae89;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .RadioGroupItem:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(0, 174, 137, 0.3);
        }
      `}</style>
    </div>
  );
}
