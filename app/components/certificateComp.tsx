"use client";

import React from "react";

type Certificate = {
  serviceName: string;
  fileName: string; // file inside /public/certificates
  status: "Approved" | "Pending";
};

export default function CertificateComp() {
  // ✅ Later: fetch from DB (based on approved applications)
  const certificates: Certificate[] = [
    {
      serviceName: "Permanent Residence Of Tripura Certificate",
      fileName: "residence-certificate.pdf",
      status: "Approved",
    },
    {
      serviceName: "Caste Certificate",
      fileName: "caste-certificate.pdf",
      status: "Pending",
    },
    {
      serviceName: "Income Certificate",
      fileName: "income-certificate.pdf",
      status: "Approved",
    },
  ];

  return (
    <div className="min-h-auto px-3 sm:px-6 lg:px-10 py-6 bg-gray-100/10">
      {/* Wider container like dashboard */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-950/20 rounded-xl p-4 sm:p-6 md:p-8">
          {/* Header (same as dashboard) */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-center">
              Certificates
            </h1>
            <div className="bg-blue-950 h-1 w-20 sm:w-24 rounded-full mx-auto mt-2"></div>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8">
            {certificates.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm sm:text-base">
                  No certificates available yet.
                </p>
              </div>
            ) : (
              <>
                {/* ✅ Desktop/Laptop View (Landscape Table like Dashboard) */}
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
                            Certificate File
                          </th>
                          <th className="p-4 font-semibold text-gray-700">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      {/* Body */}
                      <tbody className="bg-white">
                        {certificates.map((cert, idx) => (
                          <tr
                            key={idx}
                            className="
                              bg-white
                              shadow-sm hover:shadow-md transition
                              ring-1 ring-gray-200
                            "
                          >
                            {/* Status */}
                            <td className="p-4 font-semibold rounded-l-xl">
                              {cert.status === "Approved" ? (
                                <span className="inline-flex items-center gap-2 text-green-700">
                                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                  Approved
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-2 text-yellow-700">
                                  <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                                  Pending
                                </span>
                              )}
                            </td>

                            {/* Service */}
                            <td className="p-4">
                              <span className="font-medium text-gray-900">
                                {cert.serviceName}
                              </span>
                            </td>

                            {/* File */}
                            <td className="p-4">
                              <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                {cert.fileName}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="p-4 rounded-r-xl">
                              {cert.status === "Approved" ? (
                                <div className="flex gap-3">
                                  <a
                                    href={`/certificates/${cert.fileName}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="
                                      text-center
                                      border border-blue-700 text-blue-700
                                      hover:bg-blue-50
                                      px-4 py-2 rounded-lg text-xs font-medium
                                      transition
                                    "
                                  >
                                    View PDF
                                  </a>

                                  <a
                                    href={`/certificates/${cert.fileName}`}
                                    download
                                    className="
                                      text-center
                                      bg-blue-700 hover:bg-blue-800
                                      text-white px-4 py-2 rounded-lg
                                      text-xs font-medium transition
                                    "
                                  >
                                    Download
                                  </a>
                                </div>
                              ) : (
                                <button
                                  disabled
                                  className="
                                    bg-gray-200 text-gray-500
                                    px-4 py-2 rounded-lg text-xs
                                    cursor-not-allowed
                                  "
                                >
                                  Not Available
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* ✅ Mobile/Tablet View (Card Style like your photo) */}
                <div className="lg:hidden space-y-6">
                  {certificates.map((cert, idx) => (
                    <div
                      key={idx}
                      className="
                        border border-gray-200 rounded-xl
                        p-4 sm:p-6 shadow-sm
                      "
                    >
                      {/* Status + Title */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <p className="text-blue-700 font-semibold text-sm sm:text-base">
                          Certificate Status:{" "}
                          <span
                            className={
                              cert.status === "Approved"
                                ? "text-green-700"
                                : "text-yellow-700"
                            }
                          >
                            {cert.status}
                          </span>
                        </p>
                      </div>

                      {/* Details */}
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="bg-gray-50 border rounded-lg p-3">
                          <p className="text-xs text-gray-500">Service</p>
                          <p className="font-medium break-words">
                            {cert.serviceName}
                          </p>
                        </div>

                        <div className="bg-gray-50 border rounded-lg p-3">
                          <p className="text-xs text-gray-500">File</p>
                          <p className="font-medium break-words">
                            {cert.fileName}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-5 flex flex-col sm:flex-row gap-2">
                        {cert.status === "Approved" ? (
                          <>
                            <a
                              href={`/certificates/${cert.fileName}`}
                              target="_blank"
                              rel="noreferrer"
                              className="
                                w-full sm:w-auto text-center
                                border border-blue-700 text-blue-700
                                hover:bg-blue-50
                                px-5 py-2 rounded-lg text-xs sm:text-sm font-medium
                                transition
                              "
                            >
                              View PDF
                            </a>

                            <a
                              href={`/certificates/${cert.fileName}`}
                              download
                              className="
                                w-full sm:w-auto text-center
                                bg-blue-700 hover:bg-blue-800
                                text-white px-5 py-2 rounded-lg
                                text-xs sm:text-sm font-medium
                                transition
                              "
                            >
                              Download
                            </a>
                          </>
                        ) : (
                          <button
                            disabled
                            className="
                              w-full sm:w-auto
                              bg-gray-200 text-gray-500
                              px-5 py-2 rounded-lg text-xs sm:text-sm
                              cursor-not-allowed
                            "
                          >
                            Not Available
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Note */}
                <p className="text-[11px] sm:text-xs text-gray-500 text-center px-2 mt-6">
                  Certificates will be available only after approval.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
