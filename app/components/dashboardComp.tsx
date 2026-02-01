"use client";

/**
 * ===========================
 * DASHBOARD COMPONENT
 * Admin: can delete & update. Citizen: view only.
 * ===========================
 */

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
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
  const { data: session, status } = useSession();
  const isAdmin = (session?.user as { usertype?: string })?.usertype === "admin";

  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState({
    service: "",
    name: "",
    mobileNo: "",
    address: "",
    documentType: "",
  });

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/application");
      const result = await res.json();

      if (result?.success && Array.isArray(result?.data)) {
        setApps(result.data);
      } else {
        setApps([]);
      }
    } catch (error) {
      console.error(error);
      setApps([]);
      toast.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

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

  const updateApplication = async (id: string) => {
    const toastId = toast.loading("Updating application...");

    try {
      const res = await fetch(`/api/application/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingData),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Update failed", { id: toastId });
        return;
      }

      setApps((prev) =>
        prev.map((app) => (app._id === id ? result.data : app))
      );

      toast.success("Updated successfully", { id: toastId });
      cancelEdit();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const deleteApplication = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application?")) return;

    const toastId = toast.loading("Deleting application...");

    try {
      const res = await fetch(`/api/application/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Delete failed", { id: toastId });
        return;
      }

      setApps((prev) => prev.filter((app) => app._id !== id));
      toast.success("Application deleted", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  if (status === "loading" || loading) return <Loading />;

  return (
    <div className="px-3 sm:px-6 lg:px-10 py-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl border border-white/10 bg-slate-900/90 overflow-hidden">
          {/* Header */}
          <div className="p-5 sm:p-7 border-b border-white/10">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Dashboard
                </h1>
                <p className="text-sm text-white/70">
                  {isAdmin
                    ? "Manage Panchayat applications (edit & delete)"
                    : "View Panchayat applications (read only)"}
                </p>
              </div>

              <button
                onClick={() => {
                  toast("Refreshing data...", { icon: "🔄" });
                  setLoading(true);
                  fetchApplications();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Refresh Data
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 bg-white overflow-x-hidden">
            {apps.length === 0 ? (
              <p className="text-center py-16 font-semibold">
                No applications found
              </p>
            ) : (
              <>
                {/* Desktop table unchanged */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        {[
                          "Service",
                          "Name",
                          "Mobile",
                          "Document",
                          "Address",
                          "Submitted",
                          ...(isAdmin ? ["Actions"] : []),
                        ].map((h) => (
                          <th key={h} className="p-4 text-left font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {apps.map((app) => (
                        <tr key={app._id} className="border-t hover:bg-blue-50">
                          {editingId === app._id && isAdmin ? (
                            <>
                              {["service", "name", "mobileNo", "documentType"].map(
                                (field) => (
                                  <td key={field} className="p-4">
                                    <input
                                      className="w-full border p-2 rounded-md"
                                      value={(editingData as any)[field]}
                                      onChange={(e) =>
                                        setEditingData((prev) => ({
                                          ...prev,
                                          [field]: e.target.value,
                                        }))
                                      }
                                    />
                                  </td>
                                )
                              )}

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

                              <td className="p-4 text-xs">
                                {new Date(app.createdAt).toLocaleString()}
                              </td>

                              <td className="p-4 flex gap-2 justify-end">
                                <button
                                  onClick={() => updateApplication(app._id)}
                                  className="px-4 py-2 bg-green-600 text-white rounded-xl"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={cancelEdit}
                                  className="px-4 py-2 bg-gray-200 rounded-xl"
                                >
                                  Cancel
                                </button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="p-4 font-semibold">
                                {app.service}
                              </td>
                              <td className="p-4">{app.name}</td>
                              <td className="p-4">{app.mobileNo}</td>
                              <td className="p-4">{app.documentType}</td>
                              <td className="p-4 truncate max-w-xs">
                                {app.address}
                              </td>
                              <td className="p-4 text-xs">
                                {new Date(app.createdAt).toLocaleString()}
                              </td>
                              {isAdmin && (
                                <td className="p-4 flex gap-2 justify-end">
                                  <button
                                    onClick={() => handleEdit(app)}
                                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl"
                                  >
                                    <MdEdit />
                                  </button>
                                  <button
                                    onClick={() => deleteApplication(app._id)}
                                    className="px-4 py-2 bg-red-100 text-red-700 rounded-xl"
                                  >
                                    <MdDelete />
                                  </button>
                                </td>
                              )}
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="lg:hidden space-y-5">
                  {apps.map((app) => (
                    <div
                      key={app._id}
                      className="border rounded-2xl p-5 bg-white shadow-sm"
                    >
                      <p className="font-bold break-all">{app.name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(app.createdAt).toLocaleString()}
                      </p>

                      {editingId === app._id && isAdmin ? (
                        <div className="mt-4 space-y-3">
                          {Object.keys(editingData).map((field) => (
                            <input
                              key={field}
                              className="w-full border p-2 rounded-md"
                              value={(editingData as any)[field]}
                              onChange={(e) =>
                                setEditingData((prev) => ({
                                  ...prev,
                                  [field]: e.target.value,
                                }))
                              }
                            />
                          ))}

                          <div className="flex flex-col sm:flex-row gap-3">
                            <button
                              onClick={() => updateApplication(app._id)}
                              className="w-full px-5 py-3 bg-green-600 text-white rounded-xl"
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="w-full px-5 py-3 bg-gray-200 rounded-xl"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="mt-3 break-all">
                            <b>Service:</b> {app.service}
                          </p>
                          <p className="break-all">
                            <b>Mobile:</b> {app.mobileNo}
                          </p>
                          <p className="break-all">
                            <b>Document:</b> {app.documentType}
                          </p>
                          <p className="break-all">
                            <b>Address:</b> {app.address}
                          </p>

                          {isAdmin && (
                            <div className="mt-4 flex flex-col sm:flex-row gap-3">
                              <button
                                onClick={() => handleEdit(app)}
                                className="w-full px-5 py-3 bg-blue-100 text-blue-700 rounded-xl"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteApplication(app._id)}
                                className="w-full px-5 py-3 bg-red-100 text-red-700 rounded-xl"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
