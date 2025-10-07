import React, { useState } from "react";

const SmsEmailSettings = () => {
  const [activeTab, setActiveTab] = useState("sms");

  // Independent edit states
  const [isEditableSms, setIsEditableSms] = useState(false);
  const [isEditableEmail, setIsEditableEmail] = useState(false);

  const [smsSettings, setSmsSettings] = useState({
    enable: true,
    senderId: "Quicrefil",
    deliveryStart: "06:00",
    deliveryEnd: "18:00",
    provider: "SMS Service Provider",
    serviceType: "SMTP",
    user: "Admin",
    password: "?b98cA%KWZAXVF4ff",
    hostName: "mail.quicrefill.com",
    portNumber: "2525",
  });

  const [emailSettings, setEmailSettings] = useState({
    enable: true,
    senderId: "mail.quicrefill@gmail.com",
    deliveryStart: "06:00",
    deliveryEnd: "18:00",
    provider: "Custom",
    serviceType: "SMTP",
    user: "Admin",
    password: "?b98cA%KWZAXVF4ff",
    hostName: "mail.quicrefill.com",
    portNumber: "2525",
  });

  const handleChange = (e, type) => {
    const { id, value, type: inputType, checked } = e.target;
    const newValue = inputType === "checkbox" ? checked : value;

    if (type === "sms") {
      setSmsSettings({ ...smsSettings, [id]: newValue });
    } else {
      setEmailSettings({ ...emailSettings, [id]: newValue });
    }
  };

  const renderForm = (settings, type, editable, setEditable) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
        {/* Column 1 */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-gray-700 text-base opacity-50">
              Enable {type === "sms" ? "SMS" : "Email"} notifications
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="enable"
                checked={settings.enable}
                disabled={!editable}
                onChange={(e) => handleChange(e, type)}
                className="sr-only peer"
              />
              <div
                className={`w-11 h-6 rounded-full relative after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all ${
                  settings.enable
                    ? "bg-yellow-400 peer-checked:bg-yellow-400"
                    : "bg-gray-200 peer-checked:bg-yellow-400"
                } peer-checked:after:translate-x-full peer-checked:after:border-white`}
              ></div>
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1 opacity-50">
              Set {type === "sms" ? "SMS" : "Email"} sender ID
            </label>
            <input
              type="text"
              id="senderId"
              value={settings.senderId}
              disabled={!editable}
              onChange={(e) => handleChange(e, type)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-400 ${
                editable
                  ? "bg-white text-gray-800"
                  : "bg-gray-100 text-gray-500 cursor-not-allowed"
              }`}
            />
          </div>

          <div className="mb-0">
            <label className="block text-gray-700 text-sm font-medium mb-1 opacity-50">
              Delivery time
            </label>
            <div className="flex gap-2">
              <input
                type="time"
                id="deliveryStart"
                value={settings.deliveryStart}
                disabled={!editable}
                onChange={(e) => handleChange(e, type)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-400 ${
                  editable
                    ? "bg-white text-gray-800"
                    : "bg-gray-100 text-gray-500 cursor-not-allowed"
                }`}
              />
              <span className="flex items-center text-gray-500">to</span>
              <input
                type="time"
                id="deliveryEnd"
                value={settings.deliveryEnd}
                disabled={!editable}
                onChange={(e) => handleChange(e, type)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-400 ${
                  editable
                    ? "bg-white text-gray-800"
                    : "bg-gray-100 text-gray-500 cursor-not-allowed"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1 opacity-50">
              {type === "sms" ? "SMS provider" : "Email provider"}
            </label>
            <select
              id="provider"
              value={settings.provider}
              disabled={!editable}
              onChange={(e) => handleChange(e, type)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm appearance-none pr-8 focus:outline-none focus:ring-1 focus:ring-yellow-400 ${
                editable
                  ? "bg-white text-gray-800"
                  : "bg-gray-100 text-gray-500 cursor-not-allowed"
              }`}
            >
              {type === "sms" ? (
                <>
                  <option>SMS Service Provider</option>
                  <option>Provider A</option>
                  <option>Provider B</option>
                </>
              ) : (
                <>
                  <option>Custom</option>
                  <option>Gmail</option>
                  <option>Outlook</option>
                </>
              )}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1 opacity-50">
              Service type
            </label>
            <select
              id="serviceType"
              value={settings.serviceType}
              disabled={!editable}
              onChange={(e) => handleChange(e, type)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm appearance-none pr-8 focus:outline-none focus:ring-1 focus:ring-yellow-400 ${
                editable
                  ? "bg-white text-gray-800"
                  : "bg-gray-100 text-gray-500 cursor-not-allowed"
              }`}
            >
              <option>SMTP</option>
              <option>POP3</option>
              <option>IMAP</option>
            </select>
          </div>

          <div className="mb-0">
            <label className="block text-gray-700 text-sm font-medium mb-1 opacity-50">
              User
            </label>
            <input
              type="text"
              id="user"
              value={settings.user}
              disabled={!editable}
              onChange={(e) => handleChange(e, type)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-400 ${
                editable
                  ? "bg-white text-gray-800"
                  : "bg-gray-100 text-gray-500 cursor-not-allowed"
              }`}
            />
          </div>
        </div>

        {/* Column 3 */}
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1 opacity-50">
              Pass
            </label>
            <input
              type="password"
              id="password"
              value={settings.password}
              disabled={!editable}
              onChange={(e) => handleChange(e, type)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-400 ${
                editable
                  ? "bg-white text-gray-800"
                  : "bg-gray-100 text-gray-500 cursor-not-allowed"
              }`}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1 opacity-50">
              Host name
            </label>
            <input
              type="text"
              id="hostName"
              value={settings.hostName}
              disabled={!editable}
              onChange={(e) => handleChange(e, type)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-400 ${
                editable
                  ? "bg-white text-gray-800"
                  : "bg-gray-100 text-gray-500 cursor-not-allowed"
              }`}
            />
          </div>

          <div className="mb-0">
            <label className="block text-gray-700 text-sm font-medium mb-1 opacity-50">
              Port number
            </label>
            <input
              type="text"
              id="portNumber"
              value={settings.portNumber}
              disabled={!editable}
              onChange={(e) => handleChange(e, type)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-400 ${
                editable
                  ? "bg-white text-gray-800"
                  : "bg-gray-100 text-gray-500 cursor-not-allowed"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Edit / Save Button */}
      <div className="pt-8 flex justify-center w-full">
        <button
          onClick={() => setEditable(!editable)}
          className={`text-white font-semibold py-2 px-20 rounded-md shadow-sm transition-all duration-200 ease-in-out ${
            editable
              ? "bg-green-400 hover:bg-green-500"
              : "bg-my-yellow-light hover:bg-my-yellow-dark"
          }`}
        >
          {editable ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl mt-6">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium focus:outline-none ${
            activeTab === "sms"
              ? "text-my-yellow-light border-b-2 border-my-yellow-light"
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("sms")}
        >
          SMS Settings
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium focus:outline-none ${
            activeTab === "email"
              ? "text-my-yellow-light border-b-2 border-my-yellow-light"
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("email")}
        >
          Email Settings
        </button>
      </div>

      {/* Form */}
      {activeTab === "sms"
        ? renderForm(smsSettings, "sms", isEditableSms, setIsEditableSms)
        : renderForm(emailSettings, "email", isEditableEmail, setIsEditableEmail)}
    </div>
  );
};

export default SmsEmailSettings;
