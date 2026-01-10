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
        <form onSubmit={createApplication} className="bg-white rounded-lg p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
          {/* Service Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Service
            </label>
            <select onChange={(e)=>(setService(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2">
              <option value="">-- Select Service --</option>
              <option>Income Certificate</option>
              <option>Caste Certificate</option>
              <option>Permanent Residence Of Tripura Certificate</option>
              <option>Birth Certificate</option>
            </select>
          </div>

          {/* Applicant Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Applicant Name
            </label>
            <input
              onChange={(e)=>(setName(e.target.value))}
              type="text"
              placeholder="Enter full name"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Mobile Number
            </label>
            <input
              onChange={(e)=>(setMobileNo(e.target.value))}
              type="text"
              placeholder="Enter mobile number"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              onChange={(e)=>(setAddress(e.target.value))}
              type="text"
              placeholder="Enter address"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Document Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Document Type
            </label>
            <select onChange={(e)=>(setDocumentType(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2">
              <option value="">-- Select Document --</option>
              <option>Aadhaar Card</option>
              <option>Voter ID</option>
              <option>Ration Card</option>
            </select>
          </div>

          {/* Upload Section */}
          {/* <div>
            <label className="block text-sm font-medium mb-1">
              Upload Document (Image / PDF)
            </label>
            <input
              type="file"
              accept="image/*,.pdf"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              Accepted formats: JPG, PNG, PDF (Max 2MB)
            </p>
          </div> */}

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="
                w-full sm:w-auto
                bg-blue-700 hover:bg-blue-800
                text-white px-6 py-2
                rounded transition
              "
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
      <div id="get" className="">
        
      </div>
    </div>
  );
}
