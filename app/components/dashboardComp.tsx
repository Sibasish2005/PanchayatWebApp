"use client";

/**
 * ===========================
 * ✅ DASHBOARD COMPONENT (ADMIN)
 * ===========================
 *
 * 🔥 DATA FLOW (Top to Bottom)
 * --------------------------------
 * 1) Page loads -> useEffect runs -> fetchApplications()
 * 2) fetchApplications() calls GET /api/application
 * 3) Response -> setApps() -> UI re-renders with latest apps
 *
 * ✅ Delete Flow:
 * 1) Click Delete -> deleteApplication(id)
 * 2) Calls DELETE /api/application/:id
 * 3) If success -> remove from apps array using filter()
 * 4) UI updates instantly without page refresh
 *
 * ✅ Edit Flow:
 * 1) Click Edit -> handleEdit(app)
 * 2) Sets editingId = app._id
 * 3) Copies app data into editingData state
 * 4) UI switches row into <input> edit mode
 *
 * ✅ Update Flow:
 * 1) Click Save -> updateApplication(id)
 * 2) Calls PUT /api/application/:id with editingData body
 * 3) Backend returns updated data
 * 4) apps state updates using map() (replace only updated application)
 * 5) Cancel edit mode -> reset editingId + editingData
 */

import React, { useEffect, useState } from "react";
import Loading from "./loading";
import { MdDelete, MdEdit } from "react-icons/md";
import toast from "react-hot-toast";

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

  // ✅ edit states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState({
    service: "",
    name: "",
    mobileNo: "",
    address: "",
    documentType: "",
  });

  // ✅ Fetch apps
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
      toast.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch on load
  useEffect(() => {
    fetchApplications();
  }, []);

  // ✅ START EDIT
  const handleEdit = (app: Application) => {
    setEditingId(app._id);

    setEditingData({
      service: app.service,
      name: app.name,
      mobileNo: app.mobileNo,
      address: app.address,
      documentType: app.documentType,
    });
  };

  // ✅ CANCEL EDIT
  const cancelEdit = () => {
    setEditingId(null);
    setEditingData({
      service: "",
      name: "",
      mobileNo: "",
      address: "",
      documentType: "",
    });

    toast("Edit cancelled", { icon: "⚠️" });
  };

  // ✅ UPDATE APPLICATION
  const updateApplication = async (id: string) => {
    const toastId = toast.loading("Updating application...");

    try {
      const response = await fetch(`/api/application/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingData),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Update failed", { id: toastId });
        return;
      }

      if (result.success) {
        setApps((prev) =>
          prev.map((app) => (app._id === id ? result.data : app))
        );

        toast.success("Updated successfully ✅", { id: toastId });
        cancelEdit();
      } else {
        toast.error(result.message || "Update failed", { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  // ✅ DELETE APPLICATION
  const deleteApplication = async (id: string) => {
    const ok = confirm("Are you sure you want to delete this application?");
    if (!ok) return;

    const toastId = toast.loading("Deleting application...");

    try {
      const response = await fetch(`/api/application/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Delete failed", { id: toastId });
        return;
      }

      if (result.success) {
        setApps((prev) => prev.filter((app) => app._id !== id));
        toast.success("Application deleted successfully 🗑️", { id: toastId });
      } else {
        toast.error(result.message || "Delete failed", { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-auto px-3 sm:px-6 lg:px-10 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-950/60 to-slate-900/40 backdrop-blur">
          {/* ✅ HEADER */}
          <div className="p-5 sm:p-7 md:p-8 border-b border-white/10 bg-gradient-to-r from-blue-950/60 via-slate-950/40 to-slate-950/60">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Dashboard
                </h1>
                <p className="text-sm text-white/70 mt-1">
                  Manage and monitor Panchayat applications
                </p>
              </div>

              {/* ✅ Refresh Button */}
              <button
                onClick={() => {
                  toast("Refreshing data...", { icon: "🔄" });
                  setLoading(true);
                  fetchApplications();
                }}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition active:scale-[0.99]"
              >
                Refresh Data
              </button>
            </div>
          </div>

          {/* ✅ MAIN CONTENT */}
          <div className="p-4 sm:p-6 md:p-8 bg-white">
            {apps.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-800 font-semibold mt-4">
                  No applications found
                </p>
              </div>
            ) : (
              <>
                {/* ===========================
                    ✅ DESKTOP TABLE VIEW (lg+)
                   =========================== */}
                <div className="hidden lg:block">
                  <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr className="text-left">
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
                          <th className="p-4 font-semibold text-gray-700 text-right">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {apps.map((app, idx) => (
                          <tr
                            key={app._id}
                            className={`border-t ${
                              idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                            } hover:bg-blue-50 transition`}
                          >
                            {editingId === app._id ? (
                              <>
                                <td className="p-4">
                                  <input
                                    className="w-full border p-2 rounded-md"
                                    value={editingData.service}
                                    onChange={(e) =>
                                      setEditingData((prev) => ({
                                        ...prev,
                                        service: e.target.value,
                                      }))
                                    }
                                  />
                                </td>

                                <td className="p-4">
                                  <input
                                    className="w-full border p-2 rounded-md"
                                    value={editingData.name}
                                    onChange={(e) =>
                                      setEditingData((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                      }))
                                    }
                                  />
                                </td>

                                <td className="p-4">
                                  <input
                                    className="w-full border p-2 rounded-md"
                                    value={editingData.mobileNo}
                                    onChange={(e) =>
                                      setEditingData((prev) => ({
                                        ...prev,
                                        mobileNo: e.target.value,
                                      }))
                                    }
                                  />
                                </td>

                                <td className="p-4">
                                  <input
                                    className="w-full border p-2 rounded-md"
                                    value={editingData.documentType}
                                    onChange={(e) =>
                                      setEditingData((prev) => ({
                                        ...prev,
                                        documentType: e.target.value,
                                      }))
                                    }
                                  />
                                </td>

                                <td className="p-4">
                                  <input
                                    className="w-full border p-2 rounded-md"
                                    value={editingData.address}
                                    onChange={(e) =>
                                      setEditingData((prev) => ({
                                        ...prev,
                                        address: e.target.value,
                                      }))
                                    }
                                  />
                                </td>

                                <td className="p-4 text-xs text-gray-500 whitespace-nowrap">
                                  {new Date(app.createdAt).toLocaleString()}
                                </td>

                                <td className="p-4">
                                  <div className="flex gap-2 justify-end">
                                    <button
                                      onClick={() => updateApplication(app._id)}
                                      className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 font-semibold"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={cancelEdit}
                                      className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="p-4 font-semibold text-gray-900">
                                  {app.service}
                                </td>
                                <td className="p-4 text-gray-900 font-medium">
                                  {app.name}
                                </td>
                                <td className="p-4 text-gray-700">
                                  {app.mobileNo}
                                </td>
                                <td className="p-4">{app.documentType}</td>
                                <td className="p-4 max-w-[320px] truncate text-gray-700">
                                  {app.address}
                                </td>
                                <td className="p-4 text-xs text-gray-500 whitespace-nowrap">
                                  {new Date(app.createdAt).toLocaleString()}
                                </td>
                                <td className="p-4">
                                  <div className="flex gap-2 justify-end">
                                    <button
                                      onClick={() => handleEdit(app)}
                                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 transition font-semibold"
                                    >
                                      <MdEdit className="text-lg" />
                                      Edit
                                    </button>

                                    <button
                                      onClick={() =>
                                        deleteApplication(app._id)
                                      }
                                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 transition font-semibold"
                                    >
                                      <MdDelete className="text-lg" />
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* ===========================
                    ✅ MOBILE/TABLET CARD VIEW (<lg)
                   =========================== */}
                <div className="lg:hidden space-y-5">
                  {apps.map((app) => (
                    <div
                      key={app._id}
                      className="border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition bg-white"
                    >
                      {/* Top info */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-gray-900 font-bold truncate">
                            {app.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(app.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* ✅ If editing this card */}
                      {editingId === app._id ? (
                        <div className="mt-4 space-y-3">
                          <input
                            className="w-full border p-2 rounded-md"
                            value={editingData.service}
                            onChange={(e) =>
                              setEditingData((prev) => ({
                                ...prev,
                                service: e.target.value,
                              }))
                            }
                            placeholder="Service"
                          />

                          <input
                            className="w-full border p-2 rounded-md"
                            value={editingData.name}
                            onChange={(e) =>
                              setEditingData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            placeholder="Name"
                          />

                          <input
                            className="w-full border p-2 rounded-md"
                            value={editingData.mobileNo}
                            onChange={(e) =>
                              setEditingData((prev) => ({
                                ...prev,
                                mobileNo: e.target.value,
                              }))
                            }
                            placeholder="Mobile No"
                          />

                          <input
                            className="w-full border p-2 rounded-md"
                            value={editingData.documentType}
                            onChange={(e) =>
                              setEditingData((prev) => ({
                                ...prev,
                                documentType: e.target.value,
                              }))
                            }
                            placeholder="Document Type"
                          />

                          <textarea
                            className="w-full border p-2 rounded-md"
                            value={editingData.address}
                            onChange={(e) =>
                              setEditingData((prev) => ({
                                ...prev,
                                address: e.target.value,
                              }))
                            }
                            rows={3}
                            placeholder="Address"
                          />

                          <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:justify-end">
                            <button
                              onClick={() => updateApplication(app._id)}
                              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 font-semibold"
                            >
                              Save
                            </button>

                            <button
                              onClick={cancelEdit}
                              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {/* Card details */}
                          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div className="rounded-xl border bg-gray-50 p-3">
                              <p className="text-xs text-gray-500">Service</p>
                              <p className="font-semibold text-gray-900 break-words">
                                {app.service}
                              </p>
                            </div>

                            <div className="rounded-xl border bg-gray-50 p-3">
                              <p className="text-xs text-gray-500">
                                Mobile Number
                              </p>
                              <p className="font-semibold text-gray-900 break-words">
                                {app.mobileNo}
                              </p>
                            </div>

                            <div className="rounded-xl border bg-gray-50 p-3">
                              <p className="text-xs text-gray-500">
                                Document Type
                              </p>
                              <p className="font-semibold text-gray-900 break-words">
                                {app.documentType}
                              </p>
                            </div>

                            <div className="rounded-xl border bg-gray-50 p-3 sm:col-span-2">
                              <p className="text-xs text-gray-500">Address</p>
                              <p className="font-semibold text-gray-900 break-words">
                                {app.address}
                              </p>
                            </div>
                          </div>

                          {/* Card actions */}
                          <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:justify-end">
                            <button
                              onClick={() => handleEdit(app)}
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 transition font-semibold"
                            >
                              <MdEdit className="text-lg" />
                              Edit
                            </button>

                            <button
                              onClick={() => deleteApplication(app._id)}
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 transition font-semibold"
                            >
                              <MdDelete className="text-lg" />
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="h-6 bg-white" />
        </div>
      </div>
    </div>
  );
}
