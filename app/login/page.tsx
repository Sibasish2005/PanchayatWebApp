"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Page() {
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailOrMobile || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        emailOrMobile,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Login successful!");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative overflow-hidden">
      {/* Background animated blobs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute -top-24 -left-24 w-72 h-72 bg-blue-300 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-300 rounded-full blur-3xl"
      />

      {/* Main Card Animation */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200 relative z-10"
      >
        {/* Header */}
        <div className="bg-blue-900 text-white text-center py-4 rounded-t-xl">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl font-bold"
          >
            Panchayat Portal Login
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm text-blue-100"
          >
            Government of India – Citizen Services
          </motion.p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Email / Mobile */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-700">
              Email / Mobile Number
            </label>
            <input
              type="text"
              placeholder="Enter email or mobile number"
              value={emailOrMobile}
              onChange={(e) => setEmailOrMobile(e.target.value)}
              className="
                mt-1 w-full px-4 py-2
                border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-600
              "
            />
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                mt-1 w-full px-4 py-2
                border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-600
              "
            />
          </motion.div>

          {/* Remember + Forgot */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="flex items-center justify-between text-sm"
          >
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              Remember me
            </label>

            <a href="#" className="text-blue-700 hover:underline">
              Forgot password?
            </a>
          </motion.div>

          {/* Login button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="
              w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400
              text-white py-2 rounded-lg
              font-semibold transition
            "
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px bg-gray-300 flex-1"></div>
            <span className="text-xs text-gray-500">OR</span>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>

          {/* Register */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="text-center text-sm text-gray-600"
          >
            New user?{" "}
            <a
              href="/register"
              className="text-blue-700 font-semibold hover:underline"
            >
              Register here
            </a>
          </motion.p>
        </form>
      </motion.div>
    </div>
  );
}