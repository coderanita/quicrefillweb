import React, { useState } from "react";
import { FaClock, FaDownload, FaEye } from "react-icons/fa";

const documentsByTab = {
  "Identity Verification": [
    {
      id: 1,
      title: "National ID Card",
      image: "/images/item.png",
      status: "Pending",
    },
    {
      id: 2,
      title: "Passport",
      image: "/images/item.png",
      status: "Pending",
    },
  ],
  "Business Documents": [
    {
      id: 3,
      title: "Company Registration Certificate",
      image: "/images/item.png",
      status: "Pending",
    },
    {
      id: 4,
      title: "Tax Identification Number",
      image: "/images/item.png",
      status: "Pending",
    },
  ],
  "Service Documents": [
    {
      id: 5,
      title: "Driver’s License",
      image: "/images/item.png",
      status: "Pending",
    },
    {
      id: 6,
      title: "Utility Bill",
      image: "/images/item.png",
      status: "Pending",
    },
  ],
};

const DocumentViewer = () => {
  const [activeTab, setActiveTab] = useState("Identity Verification");
  const [documents, setDocuments] = useState(documentsByTab);
  const [modalDoc, setModalDoc] = useState(null);
  const [rejectModalDoc, setRejectModalDoc] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const handleStatusChange = (tab, id, newStatus, reason = "") => {
    setDocuments((prev) => ({
      ...prev,
      [tab]: prev[tab].map((doc) =>
        doc.id === id ? { ...doc, status: newStatus, reason } : doc
      ),
    }));
  };

  const handleView = (doc) => {
    setModalDoc(doc);
  };

  const handleDownload = (title) => {
    alert(`Downloading ${title}`);
  };

  const tabs = Object.keys(documentsByTab);

  return (
<div className="max-w-full mx-auto bg-white rounded-lg shadow-md mt-6" >
      {/* Tabs */}
      <div className="flex space-x-6 border-b border-gray-300 px-6 pt-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 font-semibold ${
              activeTab === tab
                ? "text-yellow-500 border-b-2 border-yellow-500"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Documents Section */}
      <div className="space-y-8 p-6">
        {documents[activeTab].map((doc, index) => (
          <div key={doc.id} className="relative">
            {/* Top right icons */}
            <div className="absolute top-0 right-0 flex items-center space-x-4 text-gray-600 pr-2 pt-2">
              <div className="flex items-center text-sm font-medium">
                {doc.status === "Pending" && (
                  <span className="flex items-center text-yellow-500">
                    <FaClock className="mr-1" />
                    Pending
                  </span>
                )}
                {doc.status === "Approved" && (
                  <span className="flex items-center text-green-600">
                    ✅ Approved
                  </span>
                )}
                {doc.status === "Rejected" && (
                  <div className="flex flex-col items-end text-red-600">
                    <span className="flex items-center">❌ Rejected</span>
                    {doc.reason && (
                      <span className="text-xs text-red-500 mt-1 max-w-[200px] text-right">
                        Reason: {doc.reason}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <FaDownload
                className="hover:text-black cursor-pointer text-gray-600"
                onClick={() => handleDownload(doc.title)}
              />
              <FaEye
                className="hover:text-black cursor-pointer text-gray-600"
                onClick={() => handleView(doc)}
              />
            </div>

            <h2 className="text-lg font-semibold mb-4">
              {index + 1}. {doc.title}
            </h2>

            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex flex-col items-start">
                <img
                  src={doc.image}
                  alt={doc.title}
                  className="w-48 object-cover border rounded mb-3"
                />
                {doc.status === "Pending" && (
                  <div className="flex space-x-4 mt-3">
                    <button
                      onClick={() =>
                        handleStatusChange(activeTab, doc.id, "Approved")
                      }
                      className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 w-40"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        setRejectModalDoc(doc);
                        setRejectReason("");
                      }}
                      className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 w-40"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
            <hr className="border-t border-gray-200 mx-4 mt-6" />
          </div>
        ))}
      </div>

      {/* View Modal */}
      {modalDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
            <button
              onClick={() => setModalDoc(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">{modalDoc.title}</h2>
            <img
              src={modalDoc.image}
              alt={modalDoc.title}
              className="w-full object-cover border rounded"
            />
          </div>
        </div>
      )}

      {/* Reject Reason Modal */}
      {rejectModalDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
            <button
              onClick={() => setRejectModalDoc(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">
              Reject: {rejectModalDoc.title}
            </h2>

            <textarea
              placeholder="Enter rejection reason..."
              className="w-full border rounded px-3 py-2 mb-4 h-24 resize-none"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />

            <button
              onClick={() => {
                if (!rejectReason.trim()) return alert("Please enter a reason.");
                handleStatusChange(activeTab, rejectModalDoc.id, "Rejected", rejectReason);
                setRejectModalDoc(null);
              }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
            >
              Confirm Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentViewer;