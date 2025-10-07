import { useState } from "react";

export const OrderDetailsCard = ({ data }) => {
    const [location, setLocation] = useState(data.location);
    const [isEditingLocation, setIsEditingLocation] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(data.paymentStatus);
    const [statusTimeline, setStatusTimeline] = useState(data.statusTimeline);
    const [actionsVisible, setActionsVisible] = useState(true);
    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    const latestStatus =
        [...statusTimeline]
            .reverse()
            .find((s) => s.completed && s.time) || { status: "Unknown" };
    const terminalStatuses = ["Approved", "Completed", "Cancelled"];
    const handleStatusAction = (action) => {
        const normalizedStatus = {
            Approve: "In progress",
            Complete: "Completed",
            Cancel: "Canceled",
        }[action] || action;

        const cleanedTimeline = statusTimeline.filter(
            (entry) =>
                !terminalStatuses.includes(entry.status) &&
                entry.status !== "In progress"
        );

        const updatedTimeline = [
            ...cleanedTimeline,
            {
                status: normalizedStatus,
                time: getCurrentTime(),
                completed: true,
            },
        ];

        setStatusTimeline(updatedTimeline);
        setActionsVisible(false);
    };


    const handleLocationChange = () => setIsEditingLocation(true);
    const handleLocationSave = () => setIsEditingLocation(false);

    const handlePaymentStatusChange = (status) => setPaymentStatus(status);

    const getVisibleActions = (status) => {
        switch (status) {
            case "In progress":
                return ["Complete", "Cancel"];
            case "Completed":
                return ["Cancel"];
            case "Cancelled":
                return [];
            default:
                return ["Approve", "Complete", "Cancel"];
        }
    };
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

    const handleStatusSelect = (status) => {
        setPaymentStatus(status);
        setIsDropdownOpen(false);
    };

    return (
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow overflow-hidden">
            <div className="flex flex-col md:flex-row">

                {/* Left Section */}
                <div className="flex-1 p-4 md:p-6 border-b md:border-b-0 md:border-r border-gray-300">
                    <div className="space-y-4 divide-y divide-solid divide-gray-200">
                        <div className="font-medium">Order ID: <span className="text-yellow-600">{data.id}</span></div>
                        <div className="pt-4">
                            <div className="text-sm text-gray-500">Customer name</div>
                            <div className="font-medium">{data.customerName}</div>
                        </div>
                        <div className="pt-4">
                            <div className="text-sm text-gray-500">Vendor name</div>
                            <div className="font-medium">{data.vendorName}</div>
                        </div>
                        <div className="pt-4">
                            <div className="text-sm text-gray-500">Rider name</div>
                            <div className="font-medium">{data.riderName}</div>
                        </div>
                        <div className="pt-4">
                            <div className="text-sm text-gray-500">Location</div>
                            {isEditingLocation ? (
                                <div className="flex items-center gap-2 mt-1">
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                                    />
                                    <button
                                        onClick={handleLocationSave}
                                        className="px-2 py-1 text-sm bg-green-100 text-green-700 rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <div className="font-medium">
                                    {location}
                                    <button
                                        onClick={handleLocationChange}
                                        className="ml-2 mt-2 px-2 py-1 text-sm bg-yellow-100 text-yellow-700 rounded"
                                    >
                                        Change
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Middle Section */}
                <div className="flex-1 p-4 md:p-6 border-b md:border-b-0 md:border-r border-gray-300">
                    <div className="space-y-4 divide-y divide-solid divide-gray-200">
                        <div className="text-yellow-600 font-semibold">Item in delivery</div>
                        <div className="pt-4 flex justify-between">
                            <div>
                                <div>• {data.item.name}</div>
                                <div className="text-sm text-gray-500">Quantity: {data.item.quantity}</div>
                            </div>
                            <div className="font-semibold">₦{data.item.price.toLocaleString()}</div>
                        </div>
                        <div className="pt-4 flex justify-between text-gray-700">
                            <span>Service fee</span>
                            <span>₦{data.serviceFee.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Total fee</span>
                            <div className="relative">
                                <button
                                    onClick={toggleDropdown}
                                    className={`flex items-center text-xs px-2 py-1 rounded border ${paymentStatus === "Paid"
                                            ? "text-green-600 border-green-600"
                                            : "text-red-600 border-red-600"
                                        }`}
                                >
                                    {paymentStatus} <i className="fa-solid fa-caret-down ml-1"></i>
                                </button>

                                {isDropdownOpen && (
                                    <ul
                                        className="absolute right-0 mt-1 w-24 bg-white border border-gray-200 rounded shadow z-10 text-sm"
                                        onMouseDown={(e) => e.preventDefault()}
                                    >
                                        <li
                                            onClick={() => handleStatusSelect("Paid")}
                                            className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-green-600"
                                        >
                                            Paid
                                        </li>
                                        <li
                                            onClick={() => handleStatusSelect("Unpaid")}
                                            className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-red-600"
                                        >
                                            Unpaid
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </div>

                        <div className="pt-4 flex justify-between">
                            <span>Coupon code</span>
                            <span className="text-gray-600 font-medium">{data.couponCode || "—"}</span>
                        </div>
                        <div className="pt-4 flex justify-between">
                            <span>Payment</span>
                            <span className="text-gray-600">{data.paymentMethod}</span>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex-1 p-4 md:p-6">
                    <div className="space-y-4 divide-y divide-solid divide-gray-200">
                        <div className="flex items-center gap-3">
                            <img src="/images/Avatar/avatar.png" className="w-12 h-12 rounded-full" alt="Rider" />
                            <div>
                                <div className="font-semibold">{data.riderName} has {data.riderStatus}</div>
                                <div className="flex gap-2 mt-1">
                                    <button className="bg-green-600 text-white text-sm px-3 py-1 rounded"><i className="fas fa-phone"></i> Call</button>
                                    <button className="bg-yellow-400 text-sm px-3 py-1 rounded">Assign</button>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 space-y-2 text-sm text-gray-700">
                            {statusTimeline.map((status, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 font-medium">
                                        {status.completed ? (
                                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-[10px]">
                                                <i className="fas fa-check"></i>
                                            </div>
                                        ) : (
                                            <div className="w-4 h-4 border border-gray-400 rounded-full"></div>
                                        )}
                                        {status.status}
                                    </div>
                                    {status.time && <span className="text-sm text-gray-500">{status.time}</span>}
                                </div>
                            ))}

                        </div>

                        {/* Action Buttons */}
                        <div className="pt-4 flex gap-2">
                            {actionsVisible &&
                                getVisibleActions(latestStatus.status).map((action) => (
                                    <button
                                        key={action}
                                        onClick={() => handleStatusAction(action)}
                                        className={`px-4 py-2 rounded ${action === "Approve"
                                            ? "bg-green-600 hover:bg-green-700 text-white"
                                            : action === "Complete"
                                                ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                                                : "bg-red-500 hover:bg-red-600 text-white"
                                            }`}
                                    >
                                        {action}
                                    </button>
                                ))}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};
