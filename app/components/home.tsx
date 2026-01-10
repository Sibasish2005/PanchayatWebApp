'use client'
import React from "react";
import { motion } from "framer-motion";
import {
  FaFileAlt,
  FaRegClock,
  FaDownload,
  FaPhoneAlt,
} from "react-icons/fa";

export default function Base() {
  const quickLinks = [
    {
      title: "Apply for Certificate",
      desc: "Birth, Residence, Income, Caste etc.",
      icon: <FaFileAlt />,
      href: "/apply",
    },
    {
      title: "Track Application",
      desc: "Check status using Application ID",
      icon: <FaRegClock />,
      href: "/dashboard",
    },
    {
      title: "Download Certificate",
      desc: "Download approved certificates (PDF)",
      icon: <FaDownload />,
      href: "/certificate",
    },
    {
      title: "Helpline",
      desc: "Get support from Panchayat office",
      icon: <FaPhoneAlt />,
      href: "/support",
    },
  ];

  const latestUpdates = [
    {
      title: "Online Applications Open",
      info: "Residents can now apply for Residence and Income Certificates online.",
      tag: "Service Update",
      time: "Today",
    },
    {
      title: "Digital Certificates Available",
      info: "Approved certificates can be downloaded as signed PDF from Download section.",
      tag: "Certificate",
      time: "2 days ago",
    },
    {
      title: "Office Notice",
      info: "Panchayat office will remain closed on Sunday due to maintenance.",
      tag: "Notice",
      time: "3 days ago",
    },
  ];

  return (
    <div className="w-full">
      <div
        className="
          flex flex-col lg:flex-row
          min-h-screen
          px-4 sm:px-6 md:px-10 lg:px-20
          py-6
          gap-6
        "
      >
        {/* Left section */}
        <div
          className="
            bg-slate-600/10 rounded-xl
            w-full lg:w-[35%]
            p-4 sm:p-6 lg:p-8
          "
        >
          <div className="bg-black/10 h-full rounded-xl flex flex-col items-center overflow-hidden">
            <div className="py-4 flex flex-col items-center">
              <h1 className="text-center text-lg sm:text-2xl font-bold">
                QuickLinks
              </h1>

              <motion.div
                key="quicklinks-underline"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ transformOrigin: "center" }}
                className="bg-blue-950 h-1 w-14 sm:w-20 rounded-full"
              />
            </div>

            <div className="w-full">
              <ul className="bg-white w-full overflow-hidden">
                {quickLinks.map((item, idx) => (
                  <li
                    key={idx}
                    className="border-b border-gray-200 last:border-none"
                  >
                    <a
                      href={item.href}
                      className="
                        flex items-start gap-3
                        px-4 py-4
                        hover:bg-blue-50
                        transition
                      "
                    >
                      {/* icon */}
                      <div className="text-blue-700 text-xl mt-1">
                        {item.icon}
                      </div>

                      {/* content */}
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800 text-sm sm:text-base">
                          {item.title}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500 leading-snug">
                          {item.desc}
                        </span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>

              {/* extra info card */}
              <div className="m-4 bg-white rounded-xl p-4 shadow-sm">
                <p className="text-sm font-semibold text-gray-800">
                  ⏱ Average Processing Time
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Most certificates are issued within <b>2-5 working days</b>{" "}
                  after verification.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="rounded-xl w-full lg:w-[65%]">
          {/* img section */}
          <div className="px-0 sm:px-0 md:px-0 lg:px-0">
            <div className="p-4 sm:p-6 lg:p-8">
              <img
                src="/banner.png"
                alt="banner"
                className="
                  w-full
                  rounded-xl
                  object-cover
                  h-[160px] sm:h-[240px] md:h-[300px] lg:h-[320px]
                "
              />
            </div>
          </div>

          {/* latest section */}
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="pt-2 pb-4 flex flex-col items-center">
              <h1 className="text-center text-lg sm:text-2xl font-bold">
                Latest Updates
              </h1>
              <div className="bg-blue-950 h-1 w-14 sm:w-20 rounded-full"></div>
            </div>

            {/* Latest updates list */}
            <div className="grid gap-4 pb-10">
              {latestUpdates.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="
                    bg-white rounded-xl p-4 sm:p-5
                    shadow-sm border border-gray-100
                    hover:shadow-md transition
                  "
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base leading-snug">
                      {item.title}
                    </h3>
                    <span className="text-[10px] sm:text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-800 font-medium whitespace-nowrap">
                      {item.tag}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                    {item.info}
                  </p>

                  <p className="text-[10px] sm:text-xs text-gray-400 mt-3">
                    {item.time}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* footer note */}
            <div className="text-center text-[11px] sm:text-xs text-gray-500 pb-6">
              ⚠️ Please ensure uploaded documents are clear and valid for faster
              approval.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
