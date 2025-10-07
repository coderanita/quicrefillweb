import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ServiceData } from "../../MockData/ServiceData";
import { showSweetAlert } from "../Includes/SweetAlert2";

export default function ServiceDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [service, setService] = useState(null);
    const [stats, setStats] = useState(null);

    const [showStatus, setShowStatus] = useState(false);
    const [showPricing, setShowPricing] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const [selectedStatus, setSelectedStatus] = useState("");
    const [price, setPrice] = useState("");
    const [editData, setEditData] = useState({});

    useEffect(() => {
        const found = ServiceData.find((s) => s.id === id);
        if (found) {
            setService(found);
            setStats(found.stats);
            setSelectedStatus(found.status);
            setPrice(found.pricing);
            setEditData(found);
        }
    }, [id]);

    if (!service) {
        return (
            <div className="p-6 text-center text-gray-600">Service not found</div>
        );
    }

    // function to return correct status color
    const getStatusColor = (status) => {
        switch (status) {
            case "Active":
                return "text-green-600";
            case "Inactive":
                return "text-yellow-600";
            case "Discontinued":
                return "text-red-600";
            default:
                return "text-gray-600";
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-6">
            {/* ---------------- Left Section ---------------- */}
            <div className="bg-white rounded-lg shadow-sm p-4 md:w-7/12">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">{service.id}</h2>
                </div>

                {/* Service Info Table */}
                <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="text-left px-4 py-2 font-medium text-gray-600">
                                    Field
                                </th>
                                <th className="text-left px-4 py-2 font-medium text-gray-600">
                                    Details
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr>
                                <td className="px-4 py-2 text-gray-500">Service ID</td>
                                <td className="px-4 py-2 font-medium text-gray-800">
                                    {service.id}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-gray-500">Service Name</td>
                                <td className="px-4 py-2 font-medium text-gray-800">
                                    {service.name}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-gray-500">Vendor Name</td>
                                <td className="px-4 py-2 font-medium text-gray-800">
                                    {service.vendor}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-gray-500">Category</td>
                                <td className="px-4 py-2 font-medium text-gray-800">
                                    {service.category}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-gray-500">Service Status</td>
                                <td className={`px-4 py-2 font-medium ${getStatusColor(service.status)}`}>
                                    {service.status}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-gray-500">Region</td>
                                <td className="px-4 py-2 font-medium text-gray-800">
                                    {service.region}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-gray-500">Pricing</td>
                                <td className="px-4 py-2 font-medium text-gray-800">
                                    {service.pricing}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-gray-500">Minimum Order</td>
                                <td className="px-4 py-2 font-medium text-gray-800">
                                    {service.minOrder}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-gray-500">Maximum Order</td>
                                <td className="px-4 py-2 font-medium text-gray-800">
                                    {service.maxOrder}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-gray-500">Date Added</td>
                                <td className="px-4 py-2 font-medium text-gray-800">
                                    {service.dateAdded}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-gray-500">Last Updated</td>
                                <td className="px-4 py-2 font-medium text-gray-800">
                                    {service.lastUpdated}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap gap-2">
                    <button
                        onClick={() => setShowEdit(true)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded text-sm"
                    >
                        Edit Service
                    </button>
                    <button
                        onClick={() => setShowStatus(true)}
                        className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-gray-700 py-2 px-4 rounded text-sm"
                    >
                        Change Status
                    </button>
                    <button
                        onClick={() => setShowPricing(true)}
                        className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-gray-700 py-2 px-4 rounded text-sm"
                    >
                        Update Pricing
                    </button>
                    <button
                        onClick={() => {
                            showSweetAlert("Service Deleted", "success");
                            navigate("/service-management");
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded text-sm"
                    >
                        Delete Service
                    </button>
                </div>

                {/* --------- Edit Modal --------- */}
                {showEdit && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Edit Service</h3>
                            {Object.entries(editData).map(([key, value]) => {
                                if (["id", "dateAdded", "lastUpdated", "stats"].includes(key)) return null;
                                return (
                                    <div key={key} className="mb-2">
                                        <label className="block text-gray-600 text-sm mb-1 capitalize">
                                            {key}
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            value={editData[key]}
                                            onChange={(e) =>
                                                setEditData({ ...editData, [key]: e.target.value })
                                            }
                                        />
                                    </div>
                                );
                            })}
                            <button
                                onClick={() => {
                                    const now = new Date();
                                    const formattedDate = now.toISOString().split("T")[0]; // YYYY-MM-DD

                                    const updatedService = {
                                        ...service,
                                        ...editData,
                                        lastUpdated: formattedDate, // system generated
                                    };

                                    setService(updatedService);
                                    setShowEdit(false);
                                    showSweetAlert("Service Updated", "success");
                                    navigate("/service-management");
                                }}
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded font-semibold"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={() => setShowEdit(false)}
                                className="w-full mt-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium text-gray-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
                {/* Status Modal */}
                {showStatus && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Status
                            </h3>
                            <div className="space-y-2">
                                <div
                                    onClick={() => setSelectedStatus("Active")}
                                    className={`cursor-pointer font-medium rounded px-4 py-2 w-fit ${selectedStatus === "Active"
                                            ? "bg-green-100 text-green-600"
                                            : "text-green-600"
                                        }`}
                                >
                                    Active
                                </div>
                                <div
                                    onClick={() => setSelectedStatus("Inactive")}
                                    className={`cursor-pointer font-medium rounded px-4 py-2 w-fit ${selectedStatus === "Inactive"
                                            ? "bg-yellow-100 text-yellow-600"
                                            : "text-yellow-600"
                                        }`}
                                >
                                    Inactive
                                </div>
                                <div
                                    onClick={() => setSelectedStatus("Discontinued")}
                                    className={`cursor-pointer font-medium rounded px-4 py-2 w-fit ${selectedStatus === "Discontinued"
                                            ? "bg-red-100 text-red-600"
                                            : "text-red-600"
                                        }`}
                                >
                                    Discontinued
                                </div>
                            </div>
                            <button
                                onClick={() => setShowStatus(false)}
                                className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium text-gray-700"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    setService({ ...service, status: selectedStatus });
                                    setShowStatus(false);
                                    showSweetAlert(
                                        `Status Updated: ${selectedStatus}`,
                                        "success"
                                    );
                                }}
                                className="mt-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded text-sm font-medium text-white"
                            >
                                Update Status
                            </button>
                        </div>
                    </div>
                )}

                {/* Pricing Modal */}
                {showPricing && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Update Pricing
                            </h3>
                            <label className="block text-gray-600 text-sm mb-1">
                                Price <span className="italic">(per kg)</span>
                            </label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <button
                                onClick={() => {
                                    setService({ ...service, pricing: price });
                                    setShowPricing(false);
                                    showSweetAlert("Pricing Updated", "success");
                                }}
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded font-semibold"
                            >
                                Update Pricing
                            </button>
                            <button
                                onClick={() => setShowPricing(false)}
                                className="w-full mt-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium text-gray-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* ---------------- Right Section ---------------- */}
            <div className="md:w-5/12 space-y-4">
                {[
                    { label: "Total Orders", value: stats.totalOrders },
                    { label: "Pending Orders", value: stats.pendingOrders },
                    { label: "Completed Orders", value: stats.completedOrders },
                    { label: "Cancelled Orders", value: stats.cancelledOrders },
                    { label: "Average Rating", value: stats.averageRating },
                    { label: "Total Revenue Generated", value: stats.totalRevenue },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white rounded-lg shadow-sm p-4"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-sm text-gray-500">{stat.label}</h3>
                            <button className="text-gray-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                        {stat.label === "Average Rating" ? (
                            <div className="flex items-center">
                                <div className="flex">
                                    {/* Render full stars */}
                                    {[...Array(Math.floor(stat.value))].map((_, i) => (
                                        <svg
                                            key={i}
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            viewBox="0 0 24 24"
                                            fill="gold"
                                        >
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    ))}
                                    {/* Half star */}
                                    {stat.value % 1 !== 0 && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            viewBox="0 0 24 24"
                                        >
                                            <defs>
                                                <linearGradient
                                                    id="halfGradient"
                                                    x1="0"
                                                    y1="0"
                                                    x2="1"
                                                    y2="0"
                                                >
                                                    <stop offset="50%" stopColor="gold" />
                                                    <stop offset="50%" stopColor="lightgray" />
                                                </linearGradient>
                                            </defs>
                                            <path
                                                fill="url(#halfGradient)"
                                                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                            />
                                        </svg>
                                    )}
                                </div>
                                <span className="ml-2 text-gray-800 font-medium">
                                    ({stat.value})
                                </span>
                            </div>
                        ) : (
                            <div className="text-3xl font-bold text-gray-800">
                                {stat.value}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
