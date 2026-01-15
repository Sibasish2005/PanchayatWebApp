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
        px-4 sm:px-6 md:px-10 lg:px-40
        py-4 sm:py-6
      "
    >
      <div className="bg-slate-950/20 rounded-xl p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-center">
            Application Form 
          </h1>
          <div className="bg-blue-950 h-1 w-20 sm:w-24 rounded-full mx-auto mt-2"></div>
        </div>

        {/* Form */}
       <form
  onSubmit={createApplication}
  className="
    bg-white rounded-xl p-5 sm:p-7 md:p-10
    space-y-6
    shadow-sm border border-gray-100
  "
>
  {/* Form grid (same fields, better layout) */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    {/* Service Selection */}
    <div className="md:col-span-2">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Select Service <span className="text-red-600">*</span>
      </label>
      <select
        onChange={(e) => setService(e.target.value)}
        className="
          w-full border border-gray-300 rounded-lg px-4 py-2.5
          bg-white text-gray-800
          focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
          transition
        "
      >
        <option value="">-- Select Service --</option>
        <option>Income Certificate</option>
        <option>Caste Certificate</option>
        <option>Permanent Residence Of Tripura Certificate</option>
        <option>Birth Certificate</option>
      </select>
      <p className="text-xs text-gray-500 mt-1">
        Choose the service you want to apply for.
      </p>
    </div>

    {/* Applicant Name */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Applicant Name <span className="text-red-600">*</span>
      </label>
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Enter full name"
        className="
          w-full border border-gray-300 rounded-lg px-4 py-2.5
          focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
          transition
        "
      />
    </div>

    {/* Mobile */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Mobile Number <span className="text-red-600">*</span>
      </label>
      <input
        onChange={(e) => setMobileNo(e.target.value)}
        type="text"
        placeholder="Enter mobile number"
        className="
          w-full border border-gray-300 rounded-lg px-4 py-2.5
          focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
          transition
        "
      />
     
    </div>

    {/* Address */}
    <div className="md:col-span-2">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Address <span className="text-red-600">*</span>
      </label>
      <input
        onChange={(e) => setAddress(e.target.value)}
        type="text"
        placeholder="Enter address"
        className="
          w-full border border-gray-300 rounded-lg px-4 py-2.5
          focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
          transition
        "
      />
    </div>

    {/* Document Selection */}
    <div className="md:col-span-2">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Select Document Type <span className="text-red-600">*</span>
      </label>
      <select
        onChange={(e) => setDocumentType(e.target.value)}
        className="
          w-full border border-gray-300 rounded-lg px-4 py-2.5
          bg-white text-gray-800
          focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
          transition
        "
      >
        <option value="">-- Select Document --</option>
        <option>Aadhaar Card</option>
        <option>Voter ID</option>
        <option>Ration Card</option>
      </select>

      
    </div>
  </div>

  {/* Submit */}
  <div className="pt-2 flex justify-center w-full sm:justify-start">
    <button
      type="submit"
      disabled={loading}
      className="
        w-full sm:w-auto
        bg-blue-700 hover:bg-blue-800
        disabled:bg-blue-400 disabled:cursor-not-allowed
        text-white px-8 py-2.5
        rounded-lg font-semibold
        shadow-sm hover:shadow-md
        transition
      "
    >
      {loading ? "Submitting..." : "Submit Application"}
    </button>
  </div>

  
</form>

      </div>
      <div id="get" className="">
        
      </div>
    </div>
  );
}
