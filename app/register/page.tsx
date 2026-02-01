"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function Page() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNo: "",
    role: "citizen" as "admin" | "citizen",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", { ...formData, password: "***" });

    // Validation
    if (!formData.fullName || !formData.email || !formData.mobileNo || !formData.password || !formData.role) {
      toast.error("Please fill all fields including role");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    console.log("Starting registration process...");

    try {
      // Generate userId (max 20 characters)
      // Take first 16 chars of email prefix + last 4 digits of timestamp
      const emailPrefix = formData.email.split("@")[0];
      const timestamp = Date.now().toString().slice(-4);
      // Ensure total length is max 20 characters
      const maxPrefixLength = 20 - timestamp.length; // 20 - 4 = 16
      const truncatedPrefix = emailPrefix.slice(0, maxPrefixLength);
      const userId = truncatedPrefix + timestamp;

      // Create user data (password will be hashed on server)
      const userData = {
        username: formData.fullName,
        usertype: formData.role, // admin or citizen from form selection
        userId: userId, // Generate unique userId (max 20 chars)
        email: formData.email,
        mobileNo: formData.mobileNo,
        password: formData.password, // Send plain password, server will hash it
        dateOfRegistration: new Date().toISOString(),
        address: "",
        accountStatus: true, // Auto-activate for now
      };

      // Register user
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      console.log("Registration response:", { status: response.status, result });

      // Check both response status and result.success
      if (response.ok && result.success) {
        toast.success("Registration successful! Logging you in...");
        
        // Small delay to ensure user is saved in database
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Automatically sign in the user after registration
        try {
          const signInResult = await signIn("credentials", {
            emailOrMobile: formData.email,
            password: formData.password,
            redirect: false,
          });

          console.log("Sign in result:", signInResult);

          if (signInResult?.error) {
            toast.error(`Registration successful but login failed: ${signInResult.error}. Please login manually.`);
            setLoading(false);
            router.push("/login");
          } else {
            // Success - redirect to home
            toast.success("Welcome! Redirecting to home...");
            // Force a full page reload to ensure session is set
            window.location.replace("/");
          }
        } catch (signInError) {
          console.error("Sign in error:", signInError);
          toast.error("Registration successful but auto-login failed. Please login manually.");
          setLoading(false);
          router.push("/login");
        }
      } else {
        toast.error(result.message || "Registration failed");
        setLoading(false);
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative overflow-hidden">
      {/* Background soft blobs */}
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

      {/* Main Card */}
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
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
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
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
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
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </motion.div>

          {/* Role Selection */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.52, duration: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-700">
              Register as
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            >
              <option value="citizen">Citizen</option>
              <option value="admin">Admin</option>
            </select>
            <p className="mt-1 text-xs text-gray-500">
              Citizen: apply for certificates. Admin: manage applications.
            </p>
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
              name="password"
              value={formData.password}
              onChange={handleChange}
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
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
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
            <input type="checkbox" className="mt-1 rounded" required />
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
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white py-2 rounded-lg font-semibold transition"
          >
            {loading ? "Registering..." : "Register"}
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
        </form>
      </motion.div>
    </div>
  );
}