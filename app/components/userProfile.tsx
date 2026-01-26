"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

type UserDataProps = {
  username: string;
  usertype: string;
  userId: string;
  email: string;
  mobileNo: string;
  dateOfRegistration: string;
  address: string;
  accountStatus: boolean | string;
  onAddressUpdate?: (newAddress: string) => void;
};

export default function UserProfile({
  username,
  usertype,
  userId,
  email,
  mobileNo,
  dateOfRegistration,
  address,
  accountStatus,
  onAddressUpdate,
}: UserDataProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAddress, setEditedAddress] = useState(address || "");
  const [isSaving, setIsSaving] = useState(false);
  const isActive = accountStatus === true || accountStatus === "Active";

  const handleEdit = () => {
    setIsEditing(true);
    setEditedAddress(address || "");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedAddress(address || "");
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: editedAddress }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Address updated successfully!");
        setIsEditing(false);
        // Call the callback to update parent component
        if (onAddressUpdate) {
          onAddressUpdate(editedAddress);
        }
      } else {
        toast.error(result.message || "Failed to update address");
      }
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    // This wrapper makes the component BIGGER on laptop & good spacing on mobile
    <div className="w-full px-2 sm:px-4 lg:px-6">
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          {/*  Landscape layout for laptop */}
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr]">
            {/*  Left Profile Section */}
            <div className="border-b lg:border-b-0 lg:border-r border-gray-200 p-5 sm:p-6 bg-gray-50">
              <div className="flex lg:flex-col items-center lg:items-start gap-4">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJkAAACUCAMAAAC3HHtWAAAAM1BMVEX///+xsbGtra3w8PCoqKj6+vr09PS3t7fAwMC7u7vDw8PQ0NDNzc3s7Ozk5OTU1NTb29u9l4yvAAAEnklEQVR4nO1c23LrIAw02PgWjP3/X3vipJ2kbZB2MSScGe9bpxPNGsRKCEHTnDhx4sSJEwfQh231fh7HcfZ+3UL/aUJN45ZwmUzXddaab1h7/dtMl7C4j9Ha5sk8UfqJ6z+meXs/OdeuQxcj9USvG9b2rey20ei0vsiZcXsXrdZHpzA2sb59A6/Fw8P1PHB+KcyrnRN43bnNJcet92m0vsj5Yjq3JY7XY9zKrIVl7A7x2tGNBdxtO0zrjtzD1k/HJvIBO2X1tmXIRexKbcg4o+txD3tGt+YidkgrXsH6LLxcNhd7ojZlCPNuzE/sSm08TM0NBXjtGA5S66dCxIw5qB6lRmzHcICXGwsSM+aAr80lnP8BO6cSyyywf5EquaHsiO2wIYVYX57YlVrCAi2jsH+YJayC7MEyQo0OoQtNbC8adMDu+PfPyJyIDErWDPMalnYJ615RoH5LhqmVsW67OTzMu3ChRs5S0sGty/n3AuN2f9T6pMT/1Z4jEN7AhIJA8Bpef7FjkhRYb5lAHs9lZtwILGqMYsR9hBg1WDlwHxFN9vj3TRgx3MvsRTS04WOPeRq+MDWRhP0VW564lqkaGeAED9K0Cz4Hqi14ESh+cQfMC0gTiCCnE8MzWSAhXfDP1I152JjRVajHBUidAMJWJC79AB5NVGuE/iNVEzxEqXGAWJmIcBPMtNUJW7rG4azMtNXpiM1v3jEznewczO4XSeCJfErRDUIzDFAJpvJHWTeY4k9WpTWK3xJqBkUnIg9SFI36RmNUR+MqlpJ3cDtzdTpbqswlai01+hkzxzsz6UiKiAA3yKkjszk0ShSgy5/SOS9bsBdTbrrGLkV1+jOloEIX2e0cpcYX4KQyPGsrflzpUuriArMEa6+PK/uUWqoVmCWV2bv1T5WKVJ9vQ7mZXYftBze3JZ475md270wKS9vu5dCJr9UWZGZuXV1mMPGur4PM3lNpj0FaAR8lJqpGynHmbRqHvcPxhnkcUidVUlo6OnV28lv41Zbn2rD5ydJOK0UnTrj3drw+Fp1cTzT23c1JEZ3Jguy0ah1l7coom5gF4dptDdT36YjOMDFzxLNtjxbKHbxRFLNtdIdCneXCu2uxUA7Jhh25k1ww8ZDrVMiewtLtKQ5qEpMrOIhTJHQbQVUEeWMN+IRN6T5tAbuy7+pVKnFtx6HrkVKl0mN6YucYMJ+KBTUKJPV+NPq2WK2Galqb3gClCJJaQVYU7UCHorL/1Gv4sm506R2ni7y49E+WdcOmt4w52TDgv+KXFWMGnIjJq7MUM+gUUTx5LcYMyhGklLsQM7CZRNLEUmMG6rcgaYWYgV0RUhwowwzuJBG6b8oww1sK455WhhmRJUSXZwlmVMNvVNOKMKP2O7FGiwLMuG7C6CmDbdMRYcbuxGLK0aUj8q10XlVtp2/F3dH1dpRX3IVf8c2Fim97VHxDpt5bRTXfxKr39lrFN/4qviXZ1HuztKn4Nm7FN5grvvXd1HtTvqn4dYGm3hcZmopfsWjqffljR62vpeyo9YWZGyp9lWdHtS8Z3dlV+frTN7k6X8x6oMJXxk6cOHHixP+Mf2vFP6eHFlhDAAAAAElFTkSuQmCC"
                  alt="User"
                  className="h-14 w-14 sm:h-16 sm:w-16 rounded-full border shrink-0"
                />

                <div className="flex-1">
                  <p className="text-lg font-bold text-gray-900">{username}</p>
                  <p className="text-sm text-gray-600">{usertype}</p>

                  {/*  Status badge */}
                  <div className="mt-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>

              {/*  Edit Button */}
              {!isEditing ? (
                <button 
                  onClick={handleEdit}
                  className="mt-5 w-full bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm transition"
                >
                  Edit Address
                </button>
              ) : (
                <div className="mt-5 flex gap-2">
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg text-sm transition"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                  <button 
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm transition"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/*  Right Details Section */}
            <div className="p-5 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-5">
                User Details
              </h2>

              {/*  Better spacing + responsive grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
                <Detail label="User ID" value={userId} />
                <Detail label="Email" value={email} />
                <Detail label="Mobile Number" value={mobileNo} />
                <Detail label="Date of Registration" value={dateOfRegistration || "Not available"} />

                {/*  Address full width */}
                <div className="md:col-span-2">
                  {isEditing ? (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Address</p>
                      <textarea
                        value={editedAddress}
                        onChange={(e) => setEditedAddress(e.target.value)}
                        placeholder="Enter your address"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                      />
                    </div>
                  ) : (
                    <Detail label="Address" value={address || "Not provided"} />
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* end main grid */}
        </div>
      </div>
    </div>
  );
}

/* ✅ Small reusable box */
function Detail({ label, value }: { label: string; value: string }) {
  const displayValue = value || "Not provided";
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="font-semibold text-gray-900 break-words mt-1">{displayValue}</p>
    </div>
  );
}
