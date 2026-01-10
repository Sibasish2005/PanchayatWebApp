'use client'
import React from "react";
import Navbar from "../components/navbar";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <div>
      <Navbar />

      <div className="px-20 py-10">

        {/* Page Header */}
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-3xl font-bold">About Us</h1>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ transformOrigin: "center" }}
            className="bg-blue-950 h-1 w-20 rounded-full mt-2"
          ></motion.div>
        </div>

        {/* Content Box */}
        <div className="bg-white border border-gray-300 rounded-lg p-8 space-y-6">

          {/* Intro */}
          <p className="text-gray-700 leading-relaxed">
            This portal is developed to provide citizens with easy, transparent,
            and digital access to Panchayat and local government services.
            The aim is to reduce paperwork, save time, and improve service
            delivery through a centralized online platform.
          </p>

          {/* Objectives */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Objectives</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Digitize government service applications</li>
              <li>Provide real-time application status tracking</li>
              <li>Ensure transparency and accountability</li>
              <li>Reduce manual paperwork and delays</li>
            </ul>
          </div>

          {/* Who can use */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Who Can Use This Portal</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Citizens applying for government certificates</li>
              <span>For now Only Citizen can use but in future: </span>
              <li>Panchayat officials processing applications</li>
              <li>Administrators managing services</li>
            </ul>
          </div>

          {/* Authority Note */}
          <div className="border-t pt-4 text-sm text-gray-600">
            This portal is maintained by the local Panchayat authority to
            ensure reliable and secure digital governance.
          </div>

        </div>

      </div>
    </div>
  );
}
