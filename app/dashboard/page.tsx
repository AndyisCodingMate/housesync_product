"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const redirectToDashboard = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()

        if (error || !user) {
          router.push("/login")
          return
        }

        // Fetch the latest role from your custom users table
        const { data: userRow, error: userError } = await supabase
          .from("users")
          .select("verified_role")
          .eq("user_id", user.id)
          .single()

        if (userError || !userRow) {
          console.error("Error fetching user role:", userError)
          router.push("/login")
          return
        }

        const userRole = userRow.verified_role

        // Redirect based on role
        switch (userRole) {
          case "international":
          case "tenant":
            router.push("/tenant-dashboard")
            break
          case "landlord":
          case "property_manager":
            router.push("/landlord-dashboard")
            break
          case "admin":
            router.push("/admin-dashboard")
            break
          default:
            router.push("/tenant-dashboard")
        }
      } catch (error) {
        console.error("Error redirecting to dashboard:", error)
        router.push("/login")
      }
    }

    redirectToDashboard()
  }, [router, supabase])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#00ae89]" />
        <p className="text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  )
}
