"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <div>
      {/* ================= LOGO BAR ================= */}
      <div
        id="logobox"
        className="
          flex flex-col md:flex-row
          md:justify-between
          md:items-center
          gap-4
          px-4 py-3
        "
      >
        {/* Logo */}
        <div className="flex items-center justify-between">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/84/Government_of_India_logo.svg"
            className="h-[60px] md:h-[80px]"
            alt="gov logo"
          />

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-blue-950 font-bold text-2xl"
          >
            {open ? "✖" : "☰"}
          </button>
        </div>

        {/* Right content */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
          <div className="flex items-center gap-6">
            {/* Call */}
            <div className="font-bold flex items-center gap-2">
              <img src="/call.png" className="h-4 w-4" alt="call icon" />
              <span className="text-gray-400 text-sm">Call Us</span>
            </div>

            {/* Language */}
            <div className="font-bold flex items-center gap-2">
              <img src="/internet.png" className="h-4 w-4" alt="language icon" />
              <span className="text-gray-400 text-sm">English</span>
            </div>
          </div>

          {/* ================= LOGIN / LOGOUT BUTTONS ================= */}
          <div id="buttons" className="flex gap-2">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="text-white bg-blue-600 rounded-3xl px-4 py-2 text-sm"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-white bg-blue-600 rounded-3xl px-4 py-2 text-sm"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-white bg-red-600 rounded-3xl px-4 py-2 text-sm"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= MAIN NAVBAR ================= */}
      <div className="bg-blue-950 text-white">
        <div className="flex justify-between items-center h-12 px-4 md:px-10">
          <h2 className="font-bold md:hidden">Menu</h2>

          {/* ================= DESKTOP LINKS ================= */}
          <ul className="hidden md:flex font-bold gap-6">
            {/* ✅ Home - Always visible (public) */}
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link href="/">Home</Link>
            </motion.li>

            {/* ✅ Protected links - Only visible when logged in */}
            {isLoggedIn && (
              <>
                <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link href="/user">User</Link>
                </motion.li>

                <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link href="/apply">Application</Link>
                </motion.li>

                <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link href="/dashboard">Dashboard</Link>
                </motion.li>

                <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link href="/certificate">Certificates</Link>
                </motion.li>
              </>
            )}

            {/* ✅ About Us - Always visible (public) - Last position */}
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link href="/AboutUs">About Us</Link>
            </motion.li>
          </ul>
        </div>

        {/* ================= MOBILE DROPDOWN ================= */}
        {open && (
          <div className="md:hidden bg-blue-950 px-4 pb-4">
            <ul className="flex flex-col font-bold gap-4">
              {/* ✅ Home - Always visible (public) */}
              <Link onClick={() => setOpen(false)} href="/">
                Home
              </Link>

              {/* ✅ Protected links - Only visible when logged in */}
              {isLoggedIn && (
                <>
                  <Link onClick={() => setOpen(false)} href="/user">
                    User
                  </Link>
                  <Link onClick={() => setOpen(false)} href="/apply">
                    Application
                  </Link>
                  <Link onClick={() => setOpen(false)} href="/dashboard">
                    Dashboard
                  </Link>
                  <Link onClick={() => setOpen(false)} href="/certificate">
                    Certificates
                  </Link>
                </>
              )}

              {/* ✅ About Us - Always visible (public) - Last position */}
              <Link onClick={() => setOpen(false)} href="/AboutUs">
                About Us
              </Link>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}