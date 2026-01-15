"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative overflow-hidden">
      {/* ✅ Background soft blobs */}
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

      {/* ✅ Main Card */}
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
            Panchayat Portal Registration
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm text-blue-100"
          >
            Create your citizen account to apply online
          </motion.p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {/* Full Name */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.42, duration: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </motion.div>

          {/* Mobile */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.48, duration: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="text"
              placeholder="Enter your mobile number"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </motion.div>

          {/* Confirm Password */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.62, duration: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </motion.div>

          {/* Terms */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.68, duration: 0.5 }}
            className="flex items-start gap-2 text-sm"
          >
            <input type="checkbox" className="mt-1 rounded" />
            <p className="text-gray-600">
              I agree to the{" "}
              <span className="text-blue-700 font-semibold cursor-pointer hover:underline">
                Terms & Conditions
              </span>
            </p>
          </motion.div>

          {/* Register Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg font-semibold transition"
          >
            Register
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px bg-gray-300 flex-1"></div>
            <span className="text-xs text-gray-500">OR</span>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>

          {/* Login */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="text-center text-sm text-gray-600"
          >
            Already have an account?{" "}
            <a href="/login" className="text-blue-700 font-semibold hover:underline">
              Login here
            </a>
          </motion.p>
        </div>

      </motion.div>
    </div>
  );
}
