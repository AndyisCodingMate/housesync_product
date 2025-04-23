"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
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
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm relative z-10">
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
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {/* Services Navigation Menu */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <Users className="w-4 h-4 mr-2 text-[#00ae89]" />
                      Our Services
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="p-4 w-[300px]">
                        <ul className="space-y-2">
                          <ListItem href="/get-started" title="Get Started Guide">
                            <BookOpen className="w-5 h-5 text-[#00ae89]" />
                          </ListItem>
                          <ListItem href="/our-customers" title="Our Customers">
                            <Users className="w-5 h-5 text-[#00ae89]" />
                          </ListItem>
                          <ListItem href="/pricing" title="Pricing">
                            <DollarSign className="w-5 h-5 text-[#00ae89]" />
                          </ListItem>
                          <ListItem href="/privacy-policy" title="Privacy Policy">
                            <Shield className="w-5 h-5 text-[#00ae89]" />
                          </ListItem>
                        </ul>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Marketplace Link */}
              <Link
                href="/marketplace"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <ShoppingBag className="w-4 h-4 mr-2 text-[#00ae89]" />
                Marketplace
              </Link>

              {/* About Us Navigation Menu */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <Heart className="w-4 h-4 mr-2 text-[#00ae89]" />
                      About Us
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="p-4 w-[300px]">
                        <ul className="space-y-2">
                          <ListItem href="/our-purpose" title="Our Purpose">
                            <Heart className="w-5 h-5 text-[#00ae89]" />
                          </ListItem>
                          <ListItem href="/contact" title="Contact Us">
                            <PhoneCall className="w-5 h-5 text-[#00ae89]" />
                          </ListItem>
                        </ul>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Newsletter Link */}
              <Link
                href="/newsletter"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <Mail className="w-4 h-4 mr-2 text-[#00ae89]" />
                Newsletter
              </Link>

              {/* Dev Navigation Menu */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <LayoutDashboard className="w-4 h-4 mr-2 text-[#00ae89]" />
                      Dev
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="p-4 w-[300px]">
                        <ul className="space-y-2">
                          <ListItem href="/dev/landlord-dashboard" title="Landlord Dashboard">
                            <Home className="w-5 h-5 text-[#00ae89]" />
                          </ListItem>
                          <ListItem href="/dev/tenant-dashboard" title="Tenant Dashboard">
                            <UserCircle className="w-5 h-5 text-[#00ae89]" />
                          </ListItem>
                          <ListItem href="/dev/housesafe" title="HouseSafe">
                            <CheckSquare className="w-5 h-5 text-[#00ae89]" />
                          </ListItem>
                        </ul>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-base font-medium text-black hover:text-gray-900" asChild>
              <Link href="/sign-up">Sign up</Link>
            </Button>
            <Button className="text-base font-medium text-white bg-[#00ae89] hover:bg-[#009b7a] rounded-full" asChild>
              <Link href="/login">Log in</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
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

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Our Services Section */}
            <div className="border-b border-gray-200 py-2">
              <div className="font-medium px-3 py-2">Our Services</div>
              <Link
                href="/get-started"
                className="block px-3 py-2 pl-8 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                Get Started Guide
              </Link>
              <Link
                href="/our-customers"
                className="block px-3 py-2 pl-8 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                Our Customers
              </Link>
              <Link
                href="/pricing"
                className="block px-3 py-2 pl-8 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                Pricing
              </Link>
              <Link
                href="/privacy-policy"
                className="block px-3 py-2 pl-8 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                Privacy Policy
              </Link>
            </div>

            <Link
              href="/marketplace"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Marketplace
            </Link>

            {/* About Us Section */}
            <div className="border-b border-gray-200 py-2">
              <div className="font-medium px-3 py-2">About Us</div>
              <Link
                href="/our-purpose"
                className="block px-3 py-2 pl-8 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                Our Purpose
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 pl-8 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                Contact Us
              </Link>
            </div>

            <Link
              href="/newsletter"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Newsletter
            </Link>

            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                <Link
                  href="/sign-up"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Sign up
                </Link>
                <Link
                  href="/login"
                  className="ml-4 block px-3 py-2 rounded-md text-base font-medium text-white bg-[#00ae89] hover:bg-[#009b7a]"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="flex items-center text-sm font-medium leading-none">
              {children}
              <span className="ml-2">{title}</span>
            </div>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"
