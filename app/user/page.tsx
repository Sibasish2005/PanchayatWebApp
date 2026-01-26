"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Navbar from "../components/navbar";
import UserProfile from "../components/userProfile";
import Footer from "../components/footer";

import { User } from "@/types/user";

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
        setUserData(result.data as User);
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
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      fetchUser();
    }
  }, [status, router]);

  const handleAddressUpdate = (newAddress: string) => {
    setUserData((prev) =>
      prev ? { ...prev, address: newAddress } : prev
    );
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
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-white">
        <Navbar />
      </div>

      {/* Main */}
      <main className="flex-1 bg-slate-800/20 flex justify-center items-center py-10 px-2 sm:px-4">
        <UserProfile
          username={userData.username}
          usertype={userData.usertype}
          userId={userData.userId}
          email={userData.email}
          mobileNo={userData.mobileNo}
          dateOfRegistration={
            userData.dateOfRegistration
              ? new Date(userData.dateOfRegistration).toLocaleDateString(
                  "en-US",
                  { year: "numeric", month: "long", day: "numeric" }
                )
              : "Not available"
          }
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
