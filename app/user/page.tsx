"use client";
import Navbar from "../components/navbar";
import UserProfile from "../components/userProfile";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User } from "@/models/user.models";
import Footer from "../components/footer";

export default function Page() {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/user");
      const result = await res.json();
      
      if (result.success && result.data) {
        setUserData(result.data);
      } else {
        console.error("Failed to fetch user data:", result.message);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    // Only fetch user data if authenticated
    if (status === "authenticated") {
      fetchUser();
    }
  }, [status, router]);

  const handleAddressUpdate = (newAddress: string) => {
    // Update local state immediately for better UX
    if (userData) {
      setUserData({ ...userData, address: newAddress });
    }
    // Optionally refetch to ensure sync with server
    fetchUser();
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          <p className="text-sm font-medium text-gray-600">
            Loading, please wait...
          </p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="sticky top-0 z-50 bg-white">
          <Navbar />
        </div>
        <main className="flex-1 bg-slate-800/20 flex justify-center items-center py-10 px-2 sm:px-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
            <p className="text-gray-600">User data not found</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    // ✅ ONE LAYOUT (Navbar -> Main -> Footer)
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-white">
        <Navbar />
      </div>

      {/* ✅ Main content area (push footer down) */}
      <main className="flex-1 bg-slate-800/20 flex justify-center items-center py-10 px-2 sm:px-4">
        <UserProfile
          username={userData.username}
          usertype={userData.usertype}
          userId={userData.userId}
          email={userData.email}
          mobileNo={userData.mobileNo}
          dateOfRegistration={userData.dateOfRegistration ? new Date(userData.dateOfRegistration).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }) : "Not available"}
          address={userData.address || "Not provided"}
          accountStatus={userData.accountStatus ? "Active" : "Inactive"}
          onAddressUpdate={handleAddressUpdate}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
