"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, MapPin, Bed, Bath, Home, Save, Edit, X } from "lucide-react";
import Image from "next/image";

interface UserData {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_local: string;
  country_code: string;
  verified_role: string;
  user_status: string;
  created_at: string;
}

export default function LandlordDashboardPage() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editedData, setEditedData] = useState<Partial<UserData>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        router.push("/login");
        return;
      }

      // Fetch the latest role from your custom users table
      const { data: userRow, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (userError || !userRow) {
        console.error("Error fetching user role:", userError);
        router.push("/login");
        return;
      }

      // Check if user has landlord or property_manager role
      if (!["landlord", "property_manager"].includes(userRow.verified_role)) {
        router.push("/dashboard");
        return;
      }

      setUser(user);
      setUserData(userRow);
      setEditedData(userRow);
      setLoading(false);
    };

    checkUser();
  }, [router, supabase]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...userData });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({ ...userData });
  };

  const handleSave = async () => {
    if (!userData || !editedData) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("users")
        .update({
          first_name: editedData.first_name,
          last_name: editedData.last_name,
          phone_local: editedData.phone_local,
          country_code: editedData.country_code,
        })
        .eq("user_id", userData.user_id);

      if (error) {
        console.error("Error updating user data:", error);
        alert("Failed to save changes. Please try again.");
      } else {
        setUserData({ ...userData, ...editedData });
        setIsEditing(false);
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error saving user data:", error);
      alert("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof UserData, value: string) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "verified":
        return "Verified";
      case "not_verified":
        return "Not Verified";
      case "pending":
        return "Pending";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-500 rounded-full px-4 py-1.5";
      case "not_verified":
        return "bg-red-500 rounded-full px-4 py-1.5";
      case "pending":
        return "bg-yellow-500 rounded-full px-4 py-1.5";
      default:
        return "bg-gray-500 rounded-full px-4 py-1.5";
    }
  };

  const formatPhoneDisplay = () => {
    if (!userData?.country_code && !userData?.phone_local) {
      return "Not provided";
    }
    const countryCode = userData?.country_code || "";
    const phone = userData?.phone_local || "";
    if (countryCode && phone) {
      return `${countryCode} ${phone}`;
    } else if (countryCode) {
      return `${countryCode}`;
    } else if (phone) {
      return phone;
    }
    return "Not provided";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#00ae89]" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Mock saved listings for landlord/property manager
  const savedListings = [
    {
      id: 1,
      title: "Cozy Family Home",
      location: "Suburban Area",
      price: 2200,
      status: "Available",
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      bedrooms: 3,
      bathrooms: 2,
      type: "House",
      amenities: ["Garden", "Garage", "Fireplace"],
    },
    {
      id: 2,
      title: "Student Apartment Complex",
      location: "University District",
      price: 1800,
      status: "Rented",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      bedrooms: 2,
      bathrooms: 1,
      type: "Apartment",
      amenities: ["Study Room", "Laundry", "WiFi"],
    },
    {
      id: 3,
      title: "Modern Townhouse",
      location: "City Center",
      price: 2800,
      status: "Available",
      image:
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      bedrooms: 3,
      bathrooms: 2,
      type: "Townhouse",
      amenities: ["Balcony", "Parking", "Modern Kitchen"],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-black">
        {userData?.verified_role === "property_manager"
          ? "Property Manager"
          : "Landlord"}{" "}
        Dashboard
      </h1>

      <Tabs defaultValue="my-listings">
        <div className="flex justify-center mb-4">
          <TabsList className="bg-gray-100 p-1.5 rounded-3xl overflow-hidden">
            <TabsTrigger
              value="my-listings"
              className="data-[state=active]:bg-[#00ae89] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-3xl px-6 py-3"
            >
              My Saved Listings
            </TabsTrigger>
            <TabsTrigger
              value="my-info"
              className="data-[state=active]:bg-[#00ae89] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-3xl px-6 py-3"
            >
              My Info
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="my-listings">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {savedListings.map((listing) => (
              <div
                key={listing.id}
                className="relative rounded-3xl overflow-hidden cursor-pointer h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 bg-white border-none"
              >
                <div className="relative h-[300px] w-full">
                  <Image
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-[#00ae89] text-white px-4 py-1.5 rounded-full text-sm font-medium">
                    ${listing.price}/mo
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge
                      className={
                        listing.status === "Available"
                          ? "bg-green-500 rounded-full px-4 py-1.5"
                          : listing.status === "Rented"
                            ? "bg-blue-500 rounded-full px-4 py-1.5"
                            : "bg-yellow-500 rounded-full px-4 py-1.5"
                      }
                    >
                      {listing.status}
                    </Badge>
                  </div>

                  <div className="absolute bottom-3 left-3 w-[60%] bg-white/90 backdrop-blur-[2px] p-5 rounded-3xl">
                    <h3 className="text-lg font-bold text-black leading-tight mb-1">
                      {listing.title}
                    </h3>

                    <div className="flex items-center text-[#00ae89] mb-2">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="text-sm text-gray-700">
                        {listing.location}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-2">
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1 flex-shrink-0 text-[#00ae89]" />
                        <span className="text-sm text-black">
                          {listing.bedrooms} bed
                        </span>
                      </div>

                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1 flex-shrink-0 text-[#00ae89]" />
                        <span className="text-sm text-black">
                          {listing.bathrooms} bath
                        </span>
                      </div>

                      <div className="flex items-center">
                        <Home className="h-4 w-4 mr-1 flex-shrink-0 text-[#00ae89]" />
                        <span className="text-sm text-black">
                          {listing.type}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {listing.amenities.slice(0, 2).map((amenity, index) => (
                        <span
                          key={index}
                          className="bg-[#e6f7f3] text-[#00ae89] px-2.5 py-1 rounded-full text-xs"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-info">
          <Card className="rounded-3xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>My Profile</CardTitle>
              {!isEditing ? (
                <Button
                  onClick={handleEdit}
                  variant="outline"
                  className="rounded-3xl bg-transparent"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="rounded-3xl bg-transparent"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-[#00ae89] hover:bg-[#009b7a] rounded-3xl"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {userData && (
                <>
                  <div className="flex items-center space-x-4 mb-6">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt="Profile"
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="text-xl font-semibold">
                        {userData.first_name} {userData.last_name}
                      </h3>
                      <p className="text-gray-500 capitalize">
                        {userData.verified_role}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="first_name">First Name</Label>
                        {isEditing ? (
                          <Input
                            id="first_name"
                            value={editedData.first_name || ""}
                            onChange={(e) =>
                              handleInputChange("first_name", e.target.value)
                            }
                            className="mt-1"
                          />
                        ) : (
                          <div className="mt-1 p-2 bg-gray-50 rounded-md">
                            {userData.first_name || "Not provided"}
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="last_name">Last Name</Label>
                        {isEditing ? (
                          <Input
                            id="last_name"
                            value={editedData.last_name || ""}
                            onChange={(e) =>
                              handleInputChange("last_name", e.target.value)
                            }
                            className="mt-1"
                          />
                        ) : (
                          <div className="mt-1 p-2 bg-gray-50 rounded-md">
                            {userData.last_name || "Not provided"}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="user_type">Type of User</Label>
                      <div className="mt-1 p-2 bg-gray-50 rounded-md capitalize">
                        {userData.verified_role}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-700">
                        Contact Information
                      </h4>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <div className="mt-1 p-2 bg-gray-50 rounded-md">
                          {userData.email}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        {isEditing ? (
                          <div className="flex gap-2 mt-1">
                            <div className="w-32">
                              <Label
                                htmlFor="country_code"
                                className="text-sm text-gray-600"
                              >
                                Country Code
                              </Label>
                              <Input
                                id="country_code"
                                value={editedData.country_code || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    "country_code",
                                    e.target.value
                                  )
                                }
                                placeholder="1"
                                className="mt-1"
                              />
                            </div>
                            <div className="flex-1">
                              <Label
                                htmlFor="phone_number"
                                className="text-sm text-gray-600"
                              >
                                Phone Number
                              </Label>
                              <Input
                                id="phone_number"
                                value={editedData.phone_local || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    "phone_local",
                                    e.target.value
                                  )
                                }
                                placeholder="1234567890"
                                className="mt-1"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="mt-1 p-2 bg-gray-50 rounded-md">
                            {formatPhoneDisplay()}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">
                        Account Information
                      </h4>
                      <div className="space-y-2">
                        <p>
                          <span className="font-medium">First Joined on:</span>{" "}
                          {new Date(userData.created_at).toLocaleDateString()}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">User Status:</span>
                          <Badge
                            className={getStatusColor(userData.user_status)}
                          >
                            {getStatusText(userData.user_status)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
