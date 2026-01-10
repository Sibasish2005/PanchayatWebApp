"use client";
import Navbar from "../components/navbar";
import UserProfile from "../components/userProfile";
import { useState, useEffect } from "react";
import { User } from "@/models/user.models";
import Footer from "../components/footer";

export default function Page() {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/user");
        const result = await res.json();
        setUserData(result.data);
      } catch (error) {
        console.log("something went wrong in user page");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (loading) {
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
    return <div>user does not exist</div>;
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
          dateOfRegistration={userData.dateOfRegistration}
          address={userData.address}
          accountStatus={userData.accountStatus ? "Active" : "Inactive"}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
