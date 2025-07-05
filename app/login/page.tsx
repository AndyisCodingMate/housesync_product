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
import { createClient } from "@/utils/supabase/client";
import { countryCodes } from "@/lib/country-codes";

export default function LoginPage() {
  const [loginType, setLoginType] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [countryCode, setCountryCode] = useState("+1-us"); // Default to US
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to check user's signup method
  const checkUserSignupMethod = async (email?: string, phone?: string) => {
    const supabase = createClient();

    try {
      if (email) {
        // Check if user exists with email
        const { data: emailUser, error: emailError } = await supabase
          .from("auth.users")
          .select("email, phone, raw_user_meta_data")
          .eq("email", email)
          .single();

        if (emailUser && !emailError) {
          return {
            exists: true,
            signupMethod: emailUser.raw_user_meta_data?.signup_type || "email",
            hasEmail: !!emailUser.email,
            hasPhone: !!emailUser.phone,
          };
        }
      }

      if (phone) {
        // Check if user exists with phone
        const { data: phoneUser, error: phoneError } = await supabase
          .from("auth.users")
          .select("email, phone, raw_user_meta_data")
          .eq("phone", phone)
          .single();

        if (phoneUser && !phoneError) {
          return {
            exists: true,
            signupMethod: phoneUser.raw_user_meta_data?.signup_type || "phone",
            hasEmail: !!phoneUser.email,
            hasPhone: !!phoneUser.phone,
          };
        }
      }

      return {
        exists: false,
        signupMethod: null,
        hasEmail: false,
        hasPhone: false,
      };
    } catch (error) {
      console.error("Error checking user signup method:", error);
      return {
        exists: false,
        signupMethod: null,
        hasEmail: false,
        hasPhone: false,
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const supabase = createClient();

    try {
      let emailToCheck = "";
      let phoneToCheck = "";

      if (loginType === "email") {
        emailToCheck = formData.email;
      } else {
        // Phone login - extract actual country code from the combined value
        const actualCountryCode = countryCode.split("-")[0];
        phoneToCheck = `${actualCountryCode}${formData.phone}`;
      }

      // Check user's original signup method
      const userInfo = await checkUserSignupMethod(emailToCheck, phoneToCheck);

      if (userInfo.exists) {
        // User exists, check if they're using the correct login method
        if (loginType !== userInfo.signupMethod) {
          const correctMethod =
            userInfo.signupMethod === "email"
              ? "email address"
              : "phone number";
          setErrorMessage(
            `Please log in with your ${correctMethod} as that's how you originally signed up.`
          );
          setIsLoading(false);
          return;
        }
      }

      if (loginType === "email") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          console.error("Email login error:", error);
          if (error.message.includes("Invalid login credentials")) {
            setErrorMessage(
              "Invalid email or password. Please check your credentials and try again."
            );
          } else {
            setErrorMessage(error.message || "An error occurred during login");
          }
        } else {
          console.log("User logged in:", data);
          window.location.href = "/dashboard";
        }
      } else {
        // Phone login - extract actual country code from the combined value
        const actualCountryCode = countryCode.split("-")[0];
        const fullPhoneNumber = `${actualCountryCode}${formData.phone}`;

        const { data, error } = await supabase.auth.signInWithPassword({
          phone: fullPhoneNumber,
          password: formData.password,
        });

        if (error) {
          console.error("Phone login error:", error);
          if (error.message.includes("Invalid login credentials")) {
            setErrorMessage(
              "Invalid phone number or password. Please check your credentials and try again."
            );
          } else {
            setErrorMessage(error.message || "An error occurred during login");
          }
        } else {
          console.log("User logged in:", data);
          window.location.href = "/dashboard";
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }

    setIsLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-center">
                  Sign in to your{" "}
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
                  <Tabs
                    value={loginType}
                    onValueChange={(value) =>
                      setLoginType(value as "email" | "phone")
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
                          required={loginType === "email"}
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
                            required={loginType === "phone"}
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
                        placeholder="Enter your password"
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

                  <Button
                    type="submit"
                    className="w-full bg-[#00ae89] hover:bg-[#009b7a] rounded-full py-6"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-center text-sm">
                  <Link
                    href="/forgot-password"
                    className="text-[#00ae89] hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <div className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="text-[#00ae89] hover:underline"
                  >
                    Sign up
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </FadeInAnimation>
      </div>
    </div>
  );
}
