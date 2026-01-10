"use client";

import React, { useEffect, useState } from "react";
import Loading from "./loading";

type Application = {
  _id: string;
  service: string;
  name: string;
  mobileNo: string;
  address: string;
  documentType: string;
  createdAt: string;
};

export default function DashboardComp() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/application", { method: "GET" });
      const result = await res.json();

      if (result?.success && Array.isArray(result?.data)) {
        setApps(result.data);
      } else {
        setApps([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setApps([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-auto px-3 sm:px-6 lg:px-10 py-6 bg-gray-100/10">
      {/* Wider container */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-950/20 rounded-xl p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-center">
              Dashboard
            </h1>
            <div className="bg-blue-950 h-1 w-20 sm:w-24 rounded-full mx-auto mt-2"></div>
          </div>

          <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8">
            {apps.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm sm:text-base">
                  No applications submitted yet.
                </p>
              </div>
            ) : (
              <>
                {/* ✅ Desktop/Laptop View (Segmented Box Rows - FIXED) */}
                <div className="hidden lg:block">
                  <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
                    <table className="w-full text-sm border-separate border-spacing-y-3">
                      {/* Header */}
                      <thead className="bg-gray-50">
                        <tr className="text-left">
                          <th className="p-4 font-semibold text-gray-700">
                            Status
                          </th>
                          <th className="p-4 font-semibold text-gray-700">
                            Service
                          </th>
                          <th className="p-4 font-semibold text-gray-700">
                            Name
                          </th>
                          <th className="p-4 font-semibold text-gray-700">
                            Mobile
                          </th>
                          <th className="p-4 font-semibold text-gray-700">
                            Document
                          </th>
                          <th className="p-4 font-semibold text-gray-700">
                            Address
                          </th>
                          <th className="p-4 font-semibold text-gray-700">
                            Submitted
                          </th>
                        </tr>
                      </thead>

                      {/* Body */}
                      <tbody className="bg-white">
                        {apps.slice(0, 10).map((app) => (
                          <tr
                            key={app._id}
                            className="
                              bg-white
                              shadow-sm hover:shadow-md transition
                              ring-1 ring-gray-200
                            "
                          >
                            {/* Rounded left */}
                            <td className="p-4 font-semibold text-blue-700 rounded-l-xl">
                              <span className="inline-flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                Submitted
                              </span>
                            </td>

                            <td className="p-4">
                              <span className="font-medium text-gray-900">
                                {app.service}
                              </span>
                            </td>

                            <td className="p-4 text-gray-900">{app.name}</td>

                            <td className="p-4">{app.mobileNo}</td>

                            <td className="p-4">
                              <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                {app.documentType}
                              </span>
                            </td>

                            <td className="p-4 max-w-[260px] truncate">
                              {app.address}
                            </td>

                            {/* Rounded right */}
                            <td className="p-4 text-xs text-gray-500 whitespace-nowrap rounded-r-xl">
                              {new Date(app.createdAt).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* ✅ Mobile/Tablet Card View (UNCHANGED) */}
                <div className="lg:hidden space-y-6">
                  {apps.map((app) => (
                    <div
                      key={app._id}
                      className="
                        border border-gray-200 rounded-xl
                        p-4 sm:p-6 shadow-sm
                      "
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <p className="text-blue-700 font-semibold text-sm sm:text-base">
                          Application submitted successfully
                        </p>

                        <p className="text-xs text-gray-500">
                          {new Date(app.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="bg-gray-50 border rounded-lg p-3">
                          <p className="text-xs text-gray-500">Service</p>
                          <p className="font-medium break-words">
                            {app.service}
                          </p>
                        </div>

                        <div className="bg-gray-50 border rounded-lg p-3">
                          <p className="text-xs text-gray-500">Applicant Name</p>
                          <p className="font-medium break-words">{app.name}</p>
                        </div>

                        <div className="bg-gray-50 border rounded-lg p-3">
                          <p className="text-xs text-gray-500">Mobile Number</p>
                          <p className="font-medium break-words">
                            {app.mobileNo}
                          </p>
                        </div>

                        <div className="bg-gray-50 border rounded-lg p-3">
                          <p className="text-xs text-gray-500">Document Type</p>
                          <p className="font-medium break-words">
                            {app.documentType}
                          </p>
                        </div>

                        <div className="bg-gray-50 border rounded-lg p-3 sm:col-span-2">
                          <p className="text-xs text-gray-500">Address</p>
                          <p className="font-medium break-words">
                            {app.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Refresh button */}
                <div className="pt-6 flex justify-center">
                  <button
                    onClick={() => {
                      setLoading(true);
                      fetchApplications();
                    }}
                    className="
                      w-full sm:w-auto
                      bg-blue-700 hover:bg-blue-800
                      text-white px-6 py-2 rounded-lg transition
                    "
                  >
                    Refresh Data
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
