"use client";
import { useState } from "react";

export default function Application() {
  const [service, setService] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [mobileNo, setMobileNo] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [documentType, setDocumentType] = useState<string>("");
  // const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const createApplication = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !service.trim() ||
      !name.trim() ||
      !mobileNo.trim() ||
      !address.trim() ||
      !documentType.trim() 
      // ||
      // !documentFile
    ) {
      alert("Please fill all fields and upload a document");
      return;
    }

    setLoading(true);
    try {
       const response = await fetch("/api/application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ service, name,mobileNo,address,documentType }),
      });
     ;
      
     
     const result = await response.json();

  if (result.success) {
    
  } else {
    alert(result.message);
  }
      
      console.log("Submitting...");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  if(loading){
    return(
       <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>

        {/* Text */}
        <p className="text-sm font-medium text-gray-600">
          Loading, please wait...
        </p>
      </div>
    </div>
    )
  }

  return (
    <div
      className="
        min-h-screen
        px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16
        py-4 sm:py-6 md:py-8
        bg-gradient-to-br from-gray-50 to-gray-100
      "
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-950/10 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg">
          {/* Header - Compact for landscape */}
          <div className="mb-4 sm:mb-6 md:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">
              Application Form
            </h1>
            <div className="bg-blue-950 h-1 w-20 sm:w-24 rounded-full mx-auto mt-2"></div>
            <p className="text-xs sm:text-sm text-gray-600 text-center mt-3">
              Fill in the details below to submit your application
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={createApplication}
            className="
              bg-white rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10
              space-y-4 md:space-y-6
              shadow-xl border border-gray-200
            "
          >
            {/* Form grid - Landscape layout with 3 columns on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Service Selection */}
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Select Service <span className="text-red-600">*</span>
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="
                    w-full border-2 border-gray-300 rounded-lg px-4 py-2.5
                    bg-white text-gray-800 text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
                    hover:border-gray-400
                    transition-all duration-200
                    shadow-sm
                  "
                >
                  <option value="">-- Select Service --</option>
                  <option>Income Certificate</option>
                  <option>Caste Certificate</option>
                  <option>Permanent Residence Of Tripura Certificate</option>
                  <option>Birth Certificate</option>
                </select>
                <p className="text-xs text-gray-500 mt-1.5 ml-1">
                  Choose the service you want to apply for.
                </p>
              </div>

              {/* Applicant Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Applicant Name <span className="text-red-600">*</span>
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter full name"
                  className="
                    w-full border-2 border-gray-300 rounded-lg px-4 py-2.5
                    text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
                    hover:border-gray-400
                    transition-all duration-200
                    shadow-sm
                  "
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Mobile Number <span className="text-red-600">*</span>
                </label>
                <input
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  type="text"
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                  className="
                    w-full border-2 border-gray-300 rounded-lg px-4 py-2.5
                    text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
                    hover:border-gray-400
                    transition-all duration-200
                    shadow-sm
                  "
                />
              </div>

              {/* Document Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Document Type <span className="text-red-600">*</span>
                </label>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="
                    w-full border-2 border-gray-300 rounded-lg px-4 py-2.5
                    bg-white text-gray-800 text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
                    hover:border-gray-400
                    transition-all duration-200
                    shadow-sm
                  "
                >
                  <option value="">-- Select Document --</option>
                  <option>Aadhaar Card</option>
                  <option>Voter ID</option>
                  <option>Ration Card</option>
                </select>
              </div>

              {/* Address */}
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Address <span className="text-red-600">*</span>
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your complete address"
                  rows={2}
                  className="
                    w-full border-2 border-gray-300 rounded-lg px-4 py-2.5
                    text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
                    hover:border-gray-400
                    transition-all duration-200
                    resize-none
                    shadow-sm
                  "
                />
              </div>
            </div>

            {/* Submit Button - Landscape layout */}
            <div className="pt-2 md:pt-4 flex justify-center lg:justify-end">
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full lg:w-auto
                  bg-gradient-to-r from-blue-700 to-blue-800
                  hover:from-blue-800 hover:to-blue-900
                  disabled:from-blue-400 disabled:to-blue-500 disabled:cursor-not-allowed
                  text-white px-8 md:px-10 py-2.5 md:py-3
                  rounded-lg font-semibold text-sm md:text-base
                  shadow-md hover:shadow-lg
                  transform hover:scale-105 disabled:hover:scale-100
                  transition-all duration-200
                  min-w-[180px]
                "
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
