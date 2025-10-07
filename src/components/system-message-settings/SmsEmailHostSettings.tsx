import React, { useState } from "react";
import { FaPencilAlt, FaTrashAlt, FaPlus } from "react-icons/fa";
import ReusableTable from "../Includes/ReusableTable";
import { confirmDelete } from "../Includes/SweetAlert2";

const SmsEmailHostSettings = () => {
  const [activeTab, setActiveTab] = useState("SMS");

  // ===== Data =====
  const [smsData, setSmsData] = useState([
    { id: "MSG1001", template: "Order Confirmation", content: "Your order is confirmed.", status: "Active", provider: "SMTP", date: "25/01/27 10:15 AM" },
    { id: "MSG1002", template: "Delivery Update", content: "Your delivery is on the way.", status: "Active", provider: "SMTP", date: "25/01/27 02:45 PM" },
  ]);

  const [emailData, setEmailData] = useState([
    { id: "MSG2001", template: "Welcome Email", content: "Welcome to Quicrifill!", status: "Active", provider: "SMTP", date: "25/01/27 10:15 AM" },
    { id: "MSG2002", template: "Password Reset", content: "Reset your password.", status: "Inactive", provider: "SMTP", date: "25/01/26 11:20 AM" },
  ]);

  const [hostData, setHostData] = useState([
    { provider: "SMTP", status: "Active" },
    { provider: "SendGrid", status: "Inactive" },
    { provider: "Twilio", status: "Active" },
  ]);

  // ===== Edit/Add Modal states =====
  const [smsEditRow, setSmsEditRow] = useState(null);
  const [emailEditRow, setEmailEditRow] = useState(null);
  const [hostEditRow, setHostEditRow] = useState(null);

  // ===== Helpers =====
  const activeHosts = hostData.filter((h) => h.status === "Active").map((h) => h.provider);

  // Toggle host status by provider (assumes provider is unique; replace with id if you add ids)
  const toggleHostStatus = (provider) => {
    setHostData((prev) => prev.map((h) => (h.provider === provider ? { ...h, status: h.status === "Active" ? "Inactive" : "Active" } : h)));
  };

  // ===== Column definitions (render receives full row) =====
  const messageColumns = (handleEdit) => [
    { header: "Message ID", accessor: "id" },
    { header: "Template Name", accessor: "template" },
    {
      header: "Content",
      accessor: "content",
      render: (row) => <span className="line-clamp-2">{row.content}</span>,
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => <span className={`${row.status === "Active" ? "text-green-500" : "text-red-500"} font-semibold`}>{row.status}</span>,
    },
    { header: "Provider", accessor: "provider" },
    { header: "Date Created", accessor: "date" },
    {
      header: "Actions",
      accessor: "actions",
      render: (row) => (
        <div className="flex items-center space-x-2">
          <button className="text-gray-600 hover:text-gray-900" onClick={() => handleEdit(row)}>
            <FaPencilAlt />
          </button>
          <button
            className="text-red-600 hover:text-red-900"
            onClick={() => {
              
            if(activeTab === "SMS") confirmDelete(setSmsData,"id",row.id,"SMS ");
             else if (activeTab === "Email")confirmDelete( setEmailData,"id",row.id,"Email");
              
            }}
          >
            <FaTrashAlt />
          </button>
        </div>
      ),
    },
  ];

  const hostColumns = [
    { header: "Provider", accessor: "provider" },
    {
      header: "Status",
      accessor: "status",
      render: (row) => <span className={`${row.status === "Active" ? "text-green-600" : "text-red-600"} font-semibold`}>{row.status}</span>,
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (row) => (
        <div className="flex items-center space-x-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={row.status === "Active"}
              onChange={() => toggleHostStatus(row.provider)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-yellow-300 rounded-full peer peer-checked:bg-yellow-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
          </label>

          <button className="text-gray-600 hover:text-gray-900" onClick={() => handleEditHost(row)}>
            <FaPencilAlt />
          </button>

          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={() => {
              confirmDelete(setHostData,"provider",row.provider,"Host");
              
            }}
          >
            <FaTrashAlt />
          </button>
        </div>
      ),
    },
  ];

  // ===== Edit handlers that correctly set index on edit object =====
  const handleEditSms = (row) => {
    const index = smsData.findIndex((r) => r.id === row.id);
    setSmsEditRow({ ...row, index });
  };

  const handleEditEmail = (row) => {
    const index = emailData.findIndex((r) => r.id === row.id);
    setEmailEditRow({ ...row, index });
  };

  const handleEditHost = (row) => {
    const index = hostData.findIndex((h) => h.provider === row.provider);
    setHostEditRow({ ...row, index });
  };

  // ===== Save handlers (update if index present, else append) =====
  const handleSmsSave = () => {
    if (!smsEditRow) return;
    if (smsEditRow.index !== undefined && smsEditRow.index >= 0) {
      setSmsData((prev) => prev.map((item, i) => (i === smsEditRow.index ? { ...smsEditRow } : item)));
    } else {
      // generate unique id
      const nextId = `MSG${1000 + smsData.length + 1}`;
      setSmsData((prev) => [...prev, { ...smsEditRow, id: nextId }]);
    }
    setSmsEditRow(null);
  };

  const handleEmailSave = () => {
    if (!emailEditRow) return;
    if (emailEditRow.index !== undefined && emailEditRow.index >= 0) {
      setEmailData((prev) => prev.map((item, i) => (i === emailEditRow.index ? { ...emailEditRow } : item)));
    } else {
      const nextId = `MSG${2000 + emailData.length + 1}`;
      setEmailData((prev) => [...prev, { ...emailEditRow, id: nextId }]);
    }
    setEmailEditRow(null);
  };

  const handleHostSave = () => {
    if (!hostEditRow) return;
    if (hostEditRow.index !== undefined && hostEditRow.index >= 0) {
      setHostData((prev) => prev.map((item, i) => (i === hostEditRow.index ? { ...hostEditRow } : item)));
    } else {
      setHostData((prev) => [...prev, hostEditRow]);
    }
    setHostEditRow(null);
  };

  // ===== Add button opens a blank create-modal (no index) =====
  const openAddModal = () => {
    if (activeTab === "SMS")
      setSmsEditRow({ template: "", content: "", status: "Active", provider: activeHosts[0] || "", date: new Date().toLocaleString() });
    if (activeTab === "Email")
      setEmailEditRow({ template: "", content: "", status: "Active", provider: activeHosts[0] || "", date: new Date().toLocaleString() });
    if (activeTab === "Host") setHostEditRow({ provider: "", status: "Active" });
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      {/* Tabs */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex flex-wrap justify-center gap-4 bg-white rounded-lg shadow-md p-2">
          {["SMS", "Email", "Host"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-2 rounded-md text-sm font-medium ${
                activeTab === tab ? "bg-yellow-400 text-black" : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Add Button */}
      <div className="flex justify-end max-w-6xl mx-auto mb-4">
        <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 bg-my-yellow-light hover:my-yellow-dark text-black rounded-md shadow">
          <FaPlus /> Add {activeTab} 
        </button>
      </div>

      {/* Tables */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-6xl mx-auto">
        {activeTab === "SMS" && <ReusableTable title="" columns={messageColumns(handleEditSms)} data={smsData} />}
        {activeTab === "Email" && <ReusableTable title="" columns={messageColumns(handleEditEmail)} data={emailData} />}
        {activeTab === "Host" && <ReusableTable title="" columns={hostColumns} data={hostData} />}
      </div>

      {/* Modals */}
      {smsEditRow && (
        <EditModal
          title="SMS Details"
          row={smsEditRow}
          setRow={setSmsEditRow}
          onSave={handleSmsSave}
          fields={["template", "content", "status", "provider"]}
          activeHosts={activeHosts}
        />
      )}
      {emailEditRow && (
        <EditModal
          title="Email Details"
          row={emailEditRow}
          setRow={setEmailEditRow}
          onSave={handleEmailSave}
          fields={["template", "content", "status", "provider"]}
          activeHosts={activeHosts}
        />
      )}
      {hostEditRow && (
        <EditModal title="Host Details" row={hostEditRow} setRow={setHostEditRow} onSave={handleHostSave} fields={["provider", "status"]} activeHosts={activeHosts} />
      )}
    </div>
  );
};

// ===== Modal Component =====
const EditModal = ({ title, row, setRow, onSave, fields, activeHosts }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>

        {fields.map((field) => (
          <div className="mb-4" key={field}>
            <label className="block mb-1 capitalize">{field}</label>

            {field === "content" ? (
              <textarea className="w-full border rounded px-2 py-1" rows={3} value={row[field] || ""} onChange={(e) => setRow({ ...row, [field]: e.target.value })} />
            ) : field === "provider" ? (
              <select className="w-full border rounded px-2 py-1" value={row[field] || ""} onChange={(e) => setRow({ ...row, [field]: e.target.value })}>
                {activeHosts.length ? activeHosts.map((h) => <option key={h} value={h}>{h}</option>) : <option value="">No Active Host</option>}
              </select>
            ) : field === "status" ? (
              <select className="w-full border rounded px-2 py-1" value={row[field] || "Active"} onChange={(e) => setRow({ ...row, [field]: e.target.value })}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            ) : (
              <input type="text" className="w-full border rounded px-2 py-1" value={row[field] || ""} onChange={(e) => setRow({ ...row, [field]: e.target.value })} />
            )}
          </div>
        ))}

        <div className="flex justify-end space-x-3">
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setRow(null)}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-yellow-400 rounded" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmsEmailHostSettings;
