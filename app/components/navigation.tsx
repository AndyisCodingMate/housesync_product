"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import type { User } from "@supabase/supabase-js"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Users,
  BookOpen,
  DollarSign,
  Shield,
  Heart,
  Mail,
  PhoneCall,
  LayoutDashboard,
  UserCircle,
  ShoppingBag,
  CheckSquare,
  Home,
  Menu,
  X,
  ChevronDown,
  Loader2,
} from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        setUser(user)

        // Fetch the latest role from your custom users table
        const { data: userRow, error: userError } = await supabase
          .from("users")
          .select("verified_role")
          .eq("user_id", user.id)
          .single()

        if (!userError && userRow) {
          setUserRole(userRow.verified_role)
        }
      } else {
        setUser(null)
        setUserRole(null)
      }
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user)

        // Fetch the latest role from your custom users table
        const { data: userRow, error: userError } = await supabase
          .from("users")
          .select("verified_role")
          .eq("user_id", session.user.id)
          .single()

        if (!userError && userRow) {
          setUserRole(userRow.verified_role)
        }
      } else {
        setUser(null)
        setUserRole(null)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    if (isSigningOut) return // Prevent multiple clicks

    setIsSigningOut(true)

    try {
      // Clear local state immediately for instant UI feedback
      setUser(null)
      setUserRole(null)

      // Sign out from Supabase (don't wait for it)
      supabase.auth.signOut().catch((error) => {
        console.error("Sign out error:", error)
      })

      // Immediate redirect without waiting
      window.location.href = "/"
    } catch (error) {
      console.error("Error during sign out:", error)
      setIsSigningOut(false)
    }
  }

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown)
  }

  const closeDropdowns = () => {
    setOpenDropdown(null)
  }

  const getDashboardLink = () => {
    if (userRole === "admin") {
      return "/admin-dashboard?tab=my-info"
    } else if (["landlord", "property_manager"].includes(userRole || "")) {
      return "/landlord-dashboard?tab=my-info"
    } else if (["tenant", "international"].includes(userRole || "")) {
      return "/tenant-dashboard?tab=my-info"
    }
    return "/dashboard"
  }

  const isAdmin = userRole === "admin"

  return (
    <nav className="bg-white shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/T_Logo1%20copy-CSl6tOI8CF5fPRHGx6CNkyn4dSfZDE.png"
                alt="HouseSync Logo"
                width={180}
                height={60}
                className="h-16 w-auto cursor-pointer mt-1"
              />
            </Link>
            <div className="hidden xl:ml-6 xl:flex xl:space-x-8">
              {/* Services Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("services")}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  <Users className="w-4 h-4 mr-2 text-[#00ae89]" />
                  Our Services
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                {openDropdown === "services" && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border z-50">
                    <div className="py-2">
                      <Link
                        href="/get-started"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeDropdowns}
                      >
                        <BookOpen className="w-5 h-5 text-[#00ae89] mr-3" />
                        Get Started Guide
                      </Link>
                      <Link
                        href="/our-customers"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeDropdowns}
                      >
                        <Users className="w-5 h-5 text-[#00ae89] mr-3" />
                        Our Customers
                      </Link>
                      <Link
                        href="/pricing"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeDropdowns}
                      >
                        <DollarSign className="w-5 h-5 text-[#00ae89] mr-3" />
                        Pricing
                      </Link>
                      <Link
                        href="/privacy-policy"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeDropdowns}
                      >
                        <Shield className="w-5 h-5 text-[#00ae89] mr-3" />
                        Privacy Policy
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Marketplace Link */}
              <Link
                href="/marketplace"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <ShoppingBag className="w-4 h-4 mr-2 text-[#00ae89]" />
                Marketplace
              </Link>

              {/* About Us Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("about")}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  <Heart className="w-4 h-4 mr-2 text-[#00ae89]" />
                  About Us
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                {openDropdown === "about" && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border z-50">
                    <div className="py-2">
                      <Link
                        href="/our-purpose"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeDropdowns}
                      >
                        <Heart className="w-5 h-5 text-[#00ae89] mr-3" />
                        Our Purpose
                      </Link>
                      <Link
                        href="/contact"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeDropdowns}
                      >
                        <PhoneCall className="w-5 h-5 text-[#00ae89] mr-3" />
                        Contact Us
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Newsletter Link */}
              <Link
                href="/newsletter"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <Mail className="w-4 h-4 mr-2 text-[#00ae89]" />
                Newsletter
              </Link>

              {/* Dev Dropdown - Only show for admin users */}
              {isAdmin && (
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown("dev")}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2 text-[#00ae89]" />
                    Dev
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                  {openDropdown === "dev" && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border z-50">
                      <div className="py-2">
                        <Link
                          href="/dev/landlord-dashboard"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={closeDropdowns}
                        >
                          <Home className="w-5 h-5 text-[#00ae89] mr-3" />
                          Landlord Dashboard
                        </Link>
                        <Link
                          href="/dev/tenant-dashboard"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={closeDropdowns}
                        >
                          <UserCircle className="w-5 h-5 text-[#00ae89] mr-3" />
                          Tenant Dashboard
                        </Link>
                        <Link
                          href="/dev/housesafe"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={closeDropdowns}
                        >
                          <CheckSquare className="w-5 h-5 text-[#00ae89] mr-3" />
                          HouseSafe
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="hidden xl:flex items-center space-x-4">
            {user ? (
              <>
                <Button variant="ghost" className="text-base font-medium text-black hover:text-gray-900" asChild>
                  <Link href={getDashboardLink()}>My Account</Link>
                </Button>
                <Button
                  className="text-base font-medium text-white bg-[#00ae89] hover:bg-[#009b7a] rounded-full disabled:opacity-50"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                >
                  {isSigningOut ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing out...
                    </>
                  ) : (
                    "Sign out"
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" className="text-base font-medium text-black hover:text-gray-900" asChild>
                  <Link href="/sign-up">Sign up</Link>
                </Button>
                <Button
                  className="text-base font-medium text-white bg-[#00ae89] hover:bg-[#009b7a] rounded-full"
                  asChild
                >
                  <Link href="/login">Log in</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#00ae89]"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="xl:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {/* Mobile Services Section */}
            <div className="border-b border-gray-200 py-2">
              <div className="font-medium px-3 py-2">Our Services</div>
              <Link
                href="/get-started"
                className="block px-3 py-2 pl-8 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started Guide
              </Link>
              <Link
                href="/our-customers"
                className="block px-3 py-2 pl-8 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Customers
              </Link>
              <Link
                href="/pricing"
                className="block px-3 py-2 pl-8 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/privacy-policy"
                className="block px-3 py-2 pl-8 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Privacy Policy
              </Link>
            </div>

            <Link
              href="/marketplace"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Marketplace
            </Link>

            {/* Mobile About Us Section */}
            <div className="border-b border-gray-200 py-2">
              <div className="font-medium px-3 py-2">About Us</div>
              <Link
                href="/our-purpose"
                className="block px-3 py-2 pl-8 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Purpose
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 pl-8 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>

            <Link
              href="/newsletter"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Newsletter
            </Link>

            {/* Mobile Dev Section - Only show for admin users */}
            {isAdmin && (
              <div className="py-2">
                <div className="font-medium px-3 py-2">Dev</div>
                <Link
                  href="/dev/landlord-dashboard"
                  className="block px-3 py-2 pl-8 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Landlord Dashboard
                </Link>
                <Link
                  href="/dev/tenant-dashboard"
                  className="block px-3 py-2 pl-8 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tenant Dashboard
                </Link>
                <Link
                  href="/dev/housesafe"
                  className="block px-3 py-2 pl-8 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  HouseSafe
                </Link>
              </div>
            )}

            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="space-y-2 px-3">
                {user ? (
                  <>
                    <Link
                      href={getDashboardLink()}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Account
                    </Link>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        handleSignOut()
                      }}
                      disabled={isSigningOut}
                      className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium text-white bg-[#00ae89] hover:bg-[#009b7a] disabled:opacity-50"
                    >
                      {isSigningOut ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Signing out...
                        </>
                      ) : (
                        "Sign out"
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/sign-up"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                    <Link
                      href="/login"
                      className="block px-3 py-2 rounded-md text-base font-medium text-white bg-[#00ae89] hover:bg-[#009b7a]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Log in
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close dropdowns when clicking outside */}
      {openDropdown && <div className="fixed inset-0 z-40" onClick={closeDropdowns} />}
    </nav>
  )
}
