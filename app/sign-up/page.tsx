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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FadeInAnimation } from "../components/fade-in-animation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createClient } from "@/utils/supabase/client";
import { countryCodes } from "@/lib/country-codes";

export default function SignUpPage() {
  const [signupType, setSignupType] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "tenant", // Default selection
  });
  const [countryCode, setCountryCode] = useState("+1-us"); // Default to US
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  // Function to check if email or phone already exists
  const checkExistingUser = async (email?: string, phone?: string) => {
    const supabase = createClient();

    try {
      if (email) {
        // Check if email exists in auth.users
        const { data: emailData, error: emailError } = await supabase
          .from("auth.users")
          .select("email")
          .eq("email", email)
          .single();

        if (emailData && !emailError) {
          return { exists: true, type: "email" };
        }
      }

      if (phone) {
        // Check if phone exists in auth.users
        const { data: phoneData, error: phoneError } = await supabase
          .from("auth.users")
          .select("phone")
          .eq("phone", phone)
          .single();

        if (phoneData && !phoneError) {
          return { exists: true, type: "phone" };
        }
      }

      return { exists: false, type: null };
    } catch (error) {
      console.error("Error checking existing user:", error);
      return { exists: false, type: null };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    const supabase = createClient();
    const verifiedRole = roleMap[formData.userType] || "tenant";

    try {
      let emailToCheck = "";
      let phoneToCheck = "";

      if (signupType === "email") {
        emailToCheck = formData.email;
      } else {
        // Phone signup - extract actual country code from the combined value
        const actualCountryCode = countryCode.split("-")[0];
        phoneToCheck = `${actualCountryCode}${formData.phone}`;
      }

      // Check if user already exists
      const existingUser = await checkExistingUser(emailToCheck, phoneToCheck);

      if (existingUser.exists) {
        if (existingUser.type === "email") {
          setErrorMessage(
            "An account with this email address already exists. Please use a different email or try logging in."
          );
        } else if (existingUser.type === "phone") {
          setErrorMessage(
            "An account with this phone number already exists. Please use a different phone number or try logging in."
          );
        }
        setIsLoading(false);
        return;
      }

      const signUpData: any = {
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            full_name: `${formData.firstName} ${formData.lastName}`,
            verified_role: verifiedRole,
            signup_type: signupType,
          },
        },
      };

      if (signupType === "email") {
        signUpData.email = formData.email;
      } else {
        // Phone signup - extract actual country code from the combined value
        const actualCountryCode = countryCode.split("-")[0];
        const countryKey = countryCode.split("-")[1];
        const fullPhoneNumber = `${actualCountryCode}${formData.phone}`;

        // Find the selected country info for additional metadata
        const selectedCountry = countryCodes.find((c) => c.key === countryKey);

        signUpData.phone = fullPhoneNumber;
        signUpData.options.data = {
          ...signUpData.options.data,
          // Store phone number components for easy access
          phone_number: fullPhoneNumber, // Full phone with country code
          country_code: actualCountryCode, // Just the code like "+1"
          phone_local: formData.phone, // Phone without country code
          country_name: selectedCountry?.name || "",
          country_flag: selectedCountry?.flag || "",
          country_key: countryKey,
        };
      }

      const { data, error } = await supabase.auth.signUp(signUpData);

      if (error) {
        console.error(`${signupType} signup error:`, error);

        // Handle specific Supabase errors for existing users
        if (error.message.includes("User already registered")) {
          if (signupType === "email") {
            setErrorMessage(
              "An account with this email address already exists. Please use a different email or try logging in."
            );
          } else {
            setErrorMessage(
              "An account with this phone number already exists. Please use a different phone number or try logging in."
            );
          }
        } else {
          setErrorMessage(error.message || "An error occurred during signup");
        }
      } else {
        console.log("User created:", data);
        // For phone signup, user might need to verify OTP
        if (
          signupType === "phone" &&
          data.user &&
          !data.user.phone_confirmed_at
        ) {
          setErrorMessage(
            "Please check your phone for a verification code and verify your number."
          );
        } else {
          window.location.href = "/dashboard";
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }

    setIsLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const getSelectedCountryDisplay = () => {
    const selected = countryCodes.find(
      (c) => `${c.code}-${c.key}` === countryCode
    );
    if (selected) {
      return (
        <div className="flex items-center space-x-2">
          <span className="text-lg">{selected.flag}</span>
          <span className="font-mono text-sm">{selected.code}</span>
        </div>
      );
    }
    return "Select country";
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
                {errorMessage && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {errorMessage}
                  </div>
                )}

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
                            className={`font-medium ${formData.userType === "local-tenant" ? "text-[#00ae89]" : ""}`}
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
                            className={`font-medium ${formData.userType === "landlord" ? "text-[#00ae89]" : ""}`}
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
                        placeholder="First name"
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
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <Tabs
                    value={signupType}
                    onValueChange={(value) =>
                      setSignupType(value as "email" | "phone")
                    }
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="email">Email</TabsTrigger>
                      <TabsTrigger value="phone">Phone</TabsTrigger>
                    </TabsList>

                    <TabsContent value="email" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          required={signupType === "email"}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="phone" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="flex space-x-2">
                          <Select
                            value={countryCode}
                            onValueChange={setCountryCode}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue>
                                {getSelectedCountryDisplay()}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent className="max-h-60">
                              {countryCodes.map((country) => (
                                <SelectItem
                                  key={country.key}
                                  value={`${country.code}-${country.key}`}
                                  className="flex items-center"
                                >
                                  <div className="flex items-center space-x-2">
                                    <span className="text-lg">
                                      {country.flag}
                                    </span>
                                    <span className="font-mono text-sm">
                                      {country.code}
                                    </span>
                                    <span className="text-sm text-gray-600">
                                      {country.name}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            required={signupType === "phone"}
                            className="flex-1"
                          />
                        </div>
                        <p className="text-xs text-gray-500">
                          Enter your phone number without the country code
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
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
                        placeholder="Confirm your password"
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
