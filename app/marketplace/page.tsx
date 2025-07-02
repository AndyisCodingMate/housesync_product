"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, DollarSign, Home, Tag, MapPin, Bed, Bath } from "lucide-react";
import { motion } from "framer-motion";

// Mock data for listings
const mockListings = [
  {
    id: 1,
    title: "Cozy Studio Apartment",
    location: "Downtown",
    price: 1200,
    type: "Studio",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    amenities: ["Street Parking", "Cats Ok"],
    bedrooms: 1,
    bathrooms: 1,
  },
  {
    id: 2,
    title: "Spacious 2BR with View",
    location: "Uptown",
    price: 2000,
    type: "Apartment",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    amenities: ["No Smoking", "Dogs Ok"],
    bedrooms: 2,
    bathrooms: 2,
  },
  {
    id: 3,
    title: "Modern Loft near Tech Hub",
    location: "Silicon Valley",
    price: 2500,
    type: "Loft",
    image:
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    amenities: ["Gym", "Pool"],
    bedrooms: 1,
    bathrooms: 1.5,
  },
  {
    id: 4,
    title: "Charming Cottage",
    location: "Suburbs",
    price: 1500,
    type: "House",
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    amenities: ["Garden", "Fireplace"],
    bedrooms: 2,
    bathrooms: 1,
  },
  {
    id: 5,
    title: "Luxury Penthouse",
    location: "City Center",
    price: 5000,
    type: "Penthouse",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    amenities: ["Concierge", "Rooftop Terrace"],
    bedrooms: 3,
    bathrooms: 3,
  },
  {
    id: 6,
    title: "Student-Friendly Studio",
    location: "University Area",
    price: 800,
    type: "Studio",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    amenities: ["Study Room", "Bike Storage"],
    bedrooms: 1,
    bathrooms: 1,
  },
];

const amenityOptions = [
  "Street Parking",
  "Cats Ok",
  "Dogs Ok",
  "No Smoking",
  "Gym",
  "Pool",
  "Garden",
  "Fireplace",
  "Concierge",
  "Rooftop Terrace",
  "Study Room",
  "Bike Storage",
];

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [budgetRange, setBudgetRange] = useState([0, 5000]);
  const [propertyType, setPropertyType] = useState<string>("any");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const handleBudgetChange = (newValues: number[]) => {
    setBudgetRange(newValues);
  };

  const filteredListings = useMemo(() => {
    return mockListings.filter((listing) => {
      const matchesSearch =
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice =
        listing.price >= budgetRange[0] && listing.price <= budgetRange[1];
      const matchesType =
        propertyType === "any" || listing.type === propertyType;
      const matchesAmenities =
        selectedAmenities.length === 0 ||
        selectedAmenities.every((amenity) =>
          listing.amenities.includes(amenity),
        );
      return matchesSearch && matchesPrice && matchesType && matchesAmenities;
    });
  }, [searchTerm, budgetRange, propertyType, selectedAmenities]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2 text-black text-center">
            Marketplace
          </h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Find your perfect home with our curated selection of verified
            properties
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 bg-white shadow-lg rounded-2xl overflow-hidden p-6"
        >
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="search"
                placeholder="Search by title, location or zip code"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6 rounded-xl border-gray-300 focus:border-[#00ae89] focus:ring-[#00ae89] text-lg"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label
                  htmlFor="budget-range"
                  className="text-sm font-medium flex items-center gap-1"
                >
                  <DollarSign className="h-4 w-4 text-[#00ae89]" />
                  Budget Range
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      $
                    </span>
                    <Input
                      type="number"
                      placeholder="Min price"
                      value={budgetRange[0]}
                      onChange={(e) =>
                        handleBudgetChange([
                          Math.min(Number(e.target.value), budgetRange[1]),
                          budgetRange[1],
                        ])
                      }
                      className="pl-8 rounded-xl border-gray-300"
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      $
                    </span>
                    <Input
                      type="number"
                      placeholder="Max price"
                      value={budgetRange[1]}
                      onChange={(e) =>
                        handleBudgetChange([
                          budgetRange[0],
                          Math.max(Number(e.target.value), budgetRange[0]),
                        ])
                      }
                      className="pl-8 rounded-xl border-gray-300"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="property-type"
                  className="text-sm font-medium flex items-center gap-1"
                >
                  <Home className="h-4 w-4 text-[#00ae89]" />
                  Property Type
                </Label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger
                    id="property-type"
                    className="rounded-xl border-gray-300"
                  >
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="Studio">Studio</SelectItem>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="Loft">Loft</SelectItem>
                    <SelectItem value="House">House</SelectItem>
                    <SelectItem value="Penthouse">Penthouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-1">
                  <Tag className="h-4 w-4 text-[#00ae89]" />
                  Amenities
                </Label>
                <div className="grid grid-cols-2 gap-2 bg-gray-50 p-3 rounded-xl max-h-[150px] overflow-y-auto">
                  {amenityOptions.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={selectedAmenities.includes(amenity)}
                        onCheckedChange={(checked) => {
                          setSelectedAmenities(
                            checked
                              ? [...selectedAmenities, amenity]
                              : selectedAmenities.filter((a) => a !== amenity),
                          );
                        }}
                        className="text-[#00ae89] border-gray-300 rounded"
                      />
                      <label
                        htmlFor={amenity}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">
            {filteredListings.length}{" "}
            {filteredListings.length === 1 ? "property" : "properties"} found
          </p>
          <Select defaultValue="featured">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredListings.map((listing) => (
            <motion.div key={listing.id} variants={item}>
              <Link
                href={`/marketplace/${listing.id}`}
                className="block h-full"
              >
                <div className="relative rounded-2xl overflow-hidden cursor-pointer h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 bg-white border-none">
                  <div className="relative h-[300px] w-full">
                    <Image
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      fill
                      className="object-cover"
                    />
                    {/* Price tag */}
                    <div className="absolute top-3 right-3 bg-[#00ae89] text-white px-3 py-1 rounded-full text-sm font-medium">
                      ${listing.price}/mo
                    </div>

                    {/* Overlay positioned on the left */}
                    <div className="absolute bottom-3 left-3 w-[60%] bg-white/90 backdrop-blur-[2px] p-2.5 rounded-xl">
                      <h3 className="text-lg font-bold text-black leading-tight mb-0.5">
                        {listing.title}
                      </h3>

                      <div className="flex items-center text-[#00ae89] mb-1">
                        <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                        <span className="text-sm text-gray-700">
                          {listing.location}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-1">
                        <div className="flex items-center">
                          <Bed className="h-3.5 w-3.5 mr-0.5 flex-shrink-0 text-[#00ae89]" />
                          <span className="text-sm text-black">
                            {listing.bedrooms} bed
                          </span>
                        </div>

                        <div className="flex items-center">
                          <Bath className="h-3.5 w-3.5 mr-0.5 flex-shrink-0 text-[#00ae89]" />
                          <span className="text-sm text-black">
                            {listing.bathrooms} bath
                          </span>
                        </div>

                        <div className="flex items-center">
                          <Home className="h-3.5 w-3.5 mr-0.5 flex-shrink-0 text-[#00ae89]" />
                          <span className="text-sm text-black">
                            {listing.type}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {listing.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="bg-[#e6f7f3] text-[#00ae89] px-1.5 py-0.5 rounded-full text-xs"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No properties found</h3>
            <p className="text-gray-600">Try adjusting your search filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
