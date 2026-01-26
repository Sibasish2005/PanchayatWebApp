'use client'
import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-1 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-6 sm:py-8 md:py-10">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col items-center mb-6 sm:mb-8 md:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center">
              About Us
            </h1>
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ transformOrigin: "center" }}
              className="bg-blue-950 h-1 w-16 sm:w-20 rounded-full mt-2"
            ></motion.div>
          </div>

          {/* Content Box */}
          <div className="bg-white border border-gray-300 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6 shadow-sm">
            {/* Intro */}
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              This portal is developed to provide citizens with easy, transparent,
              and digital access to Panchayat and local government services.
              The aim is to reduce paperwork, save time, and improve service
              delivery through a centralized online platform.
            </p>

            {/* Objectives */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">
                Objectives
              </h2>
              <ul className="list-disc pl-5 sm:pl-6 text-sm sm:text-base text-gray-700 space-y-1.5 sm:space-y-2">
                <li>Digitize government service applications</li>
                <li>Provide real-time application status tracking</li>
                <li>Ensure transparency and accountability</li>
                <li>Reduce manual paperwork and delays</li>
              </ul>
            </div>

            {/* Who can use */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">
                Who Can Use This Portal
              </h2>
              <ul className="list-disc pl-5 sm:pl-6 text-sm sm:text-base text-gray-700 space-y-1.5 sm:space-y-2">
                <li>Citizens applying for government certificates</li>
                <li className="list-none mt-2">
                  <span className="text-gray-600 italic">For now Only Citizen can use but in future: </span>
                </li>
                <li>Panchayat officials processing applications</li>
                <li>Administrators managing services</li>
              </ul>
            </div>

            {/* Authority Note */}
            <div className="border-t border-gray-200 pt-4 sm:pt-5 text-xs sm:text-sm text-gray-600">
              This portal is maintained by the local Panchayat authority to
              ensure reliable and secure digital governance.
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
