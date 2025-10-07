import React, { useState, useEffect, useRef } from 'react';
import Header from './Includes/Header';
import Sidebar from './Includes/Sidebar';
import { FaArrowLeft, FaEye, FaEyeSlash, FaEdit, FaCamera } from 'react-icons/fa'; // Importing FaCamera icon for image upload
import { showSweetAlert } from './Includes/SweetAlert2'; // Importing the SweetAlert2 toast utility

// Sub-component for Profile Information
const ProfileInformation = () => {
    const initialFullName = 'Timothy Johnson';
    const initialEmail = 'timojj@quickefil.ng';
    const initialPhoneNumber = '+2348012345789';
    const initialProfileImage = './images/Avatar/avatar.png'; // Default placeholder image

    const [fullName, setFullName] = useState(initialFullName);
    const [email, setEmail] = useState(initialEmail);
    const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
    const [profileImage, setProfileImage] = useState(initialProfileImage);
    const [isEditing, setIsEditing] = useState(false); // State to manage edit mode

    // Ref for the hidden file input
    const fileInputRef = useRef(null);

    const handleSaveChanges = () => {
        showSweetAlert('Profile information saved successfully!', 'success');
        // Add logic to save data to backend, including profileImage
        setIsEditing(false); // Exit edit mode after saving
    };

    const handleCancel = () => {
        showSweetAlert('Operation Cancelled', 'error');
        // Revert to initial values
        setFullName(initialFullName);
        setEmail(initialEmail);
        setPhoneNumber(initialPhoneNumber);
        setProfileImage(initialProfileImage); // Revert image as well
        setIsEditing(false); // Exit edit mode
    };

    const handleImageClick = () => {
        if (isEditing && fileInputRef.current) {
            fileInputRef.current.click(); // Trigger click on hidden file input
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result); // Set the image preview
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    return (
        <div className="w-full max-w-xl bg-white rounded-lg shadow-md border border-gray-100 p-6 relative">
            {/* Edit Icon - Visible only when not editing */}
            {!isEditing && (
                <button
                    onClick={() => setIsEditing(true)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-yellow-500 transition-colors p-2 rounded-full hover:bg-gray-100"
                    title="Edit Profile Information"
                >
                    <FaEdit className="text-lg" />
                </button>
            )}

            {/* Profile Image with Upload Option */}
            <div className="flex justify-center mb-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-yellow-100 border-2 border-yellow-400 cursor-pointer"
                     onClick={handleImageClick}>
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    {isEditing && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl">
                            <FaCamera />
                        </div>
                    )}
                    {/* Hidden file input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                        accept="image/*"
                        disabled={!isEditing}
                    />
                </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={(e) => e.preventDefault()}>
                {/* Full Name */}
                <div className="mb-4">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => isEditing && setFullName(e.target.value)}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => isEditing && setEmail(e.target.value)}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                    />
                </div>

                {/* Phone Number */}
                <div className="mb-6">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phoneNumber}
                        onChange={(e) => isEditing && setPhoneNumber(e.target.value)}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                    />
                </div>

                {/* Action Buttons (visible only when editing) */}
                {isEditing && (
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={handleSaveChanges}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors"
                        >
                            Save changes
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

// Sub-component for Security Settings
const SecuritySettings = () => {
    const initialOldPassword = ''; // Passwords are not pre-filled for security
    const initialNewPassword = '';
    const initialConfirmPassword = '';
    const initialEnable2FA = true;
    const initialDisplayQRCode = false;

    const [oldPassword, setOldPassword] = useState(initialOldPassword);
    const [newPassword, setNewPassword] = useState(initialNewPassword);
    const [confirmPassword, setConfirmPassword] = useState(initialConfirmPassword);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [enable2FA, setEnable2FA] = useState(initialEnable2FA);
    const [displayQRCode, setDisplayQRCode] = useState(initialDisplayQRCode);
    const [isEditing, setIsEditing] = useState(false); // State to manage edit mode

    const togglePasswordVisibility = (field) => {
        if (field === 'old') setShowOldPassword(!showOldPassword);
        else if (field === 'new') setShowNewPassword(!showNewPassword);
        else if (field === 'confirm') setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSaveChanges = () => {
        showSweetAlert('Security settings saved successfully!', 'success');
        // Add logic to save data to backend
        setIsEditing(false); // Exit edit mode after saving
    };

    const handleCancel = () => {
        showSweetAlert('Operation Cancelled', 'error');
        // Revert to initial values
        setOldPassword(initialOldPassword);
        setNewPassword(initialNewPassword);
        setConfirmPassword(initialConfirmPassword);
        setEnable2FA(initialEnable2FA);
        setDisplayQRCode(initialDisplayQRCode);
        setIsEditing(false); // Exit edit mode
    };

    return (
        <div className="w-full max-w-xl bg-white rounded-lg shadow-md border border-gray-100 p-6 relative">
            {/* Edit Icon - Visible only when not editing */}
            {!isEditing && (
                <button
                    onClick={() => setIsEditing(true)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-yellow-500 transition-colors p-2 rounded-full hover:bg-gray-100"
                    title="Edit Security Settings"
                >
                    <FaEdit className="text-lg" />
                </button>
            )}

            {/* Change Password Section */}
            <h3 className="text-lg font-medium text-gray-800 mb-4">Change Password</h3>

            <form onSubmit={(e) => e.preventDefault()}>
                {/* Password Fields with Show/Hide Feature */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
                    <div className="relative">
                        <input
                            type={showOldPassword ? 'text' : 'password'}
                            id="oldPassword"
                            placeholder="Enter old password"
                            value={oldPassword}
                            onChange={(e) => isEditing && setOldPassword(e.target.value)}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                        />
                        <span
                            className={`absolute inset-y-0 right-3 flex items-center cursor-pointer ${!isEditing ? 'pointer-events-none opacity-50' : ''}`}
                            onClick={() => isEditing && togglePasswordVisibility('old')}
                        >
                            {showOldPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                        </span>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <div className="relative">
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            id="newPassword"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => isEditing && setNewPassword(e.target.value)}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                        />
                        <span
                            className={`absolute inset-y-0 right-3 flex items-center cursor-pointer ${!isEditing ? 'pointer-events-none opacity-50' : ''}`}
                            onClick={() => isEditing && togglePasswordVisibility('new')}
                        >
                            {showNewPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                        </span>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            placeholder="Enter new password"
                            value={confirmPassword}
                            onChange={(e) => isEditing && setConfirmPassword(e.target.value)}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                        />
                        <span
                            className={`absolute inset-y-0 right-3 flex items-center cursor-pointer ${!isEditing ? 'pointer-events-none opacity-50' : ''}`}
                            onClick={() => isEditing && togglePasswordVisibility('confirm')}
                        >
                            {showConfirmPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                        </span>
                    </div>
                </div>

                {/* Enable 2FA Authentication */}
                <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700">Enable 2FA Authentication</h3>
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-gray-600 text-sm">Setup via SMS or Authenticator App</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={enable2FA}
                                onChange={() => isEditing && setEnable2FA(!enable2FA)}
                                disabled={!isEditing}
                            />
                            <div
                                className={`w-10 h-5 bg-gray-300 peer-focus:ring-2 peer-focus:ring-yellow-500 rounded-full peer-checked:bg-yellow-500 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                            ></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                        <span className="text-gray-600 text-sm">Display QR code for app-based authentication</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={displayQRCode}
                                onChange={() => isEditing && setDisplayQRCode(!displayQRCode)}
                                disabled={!isEditing}
                            />
                            <div
                                className={`w-10 h-5 bg-gray-300 peer-focus:ring-2 peer-focus:ring-yellow-500 rounded-full peer-checked:bg-yellow-500 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                            ></div>
                        </label>
                    </div>
                </div>

                {/* Action Buttons (visible only when editing) */}
                {isEditing && (
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={handleSaveChanges}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors"
                        >
                            Save changes
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

// Sub-component for Notification Settings
const NotificationSettings = () => {
    const initialEnableNotifications = true;
    const initialEmailNotifications = false;
    const initialSmsNotifications = false;
    const initialPushNotifications = false;

    const [enableNotifications, setEnableNotifications] = useState(initialEnableNotifications);
    const [emailNotifications, setEmailNotifications] = useState(initialEmailNotifications);
    const [smsNotifications, setSmsNotifications] = useState(initialSmsNotifications);
    const [pushNotifications, setPushNotifications] = useState(initialPushNotifications);
    const [isEditing, setIsEditing] = useState(false); // State to manage edit mode

    // Effect to handle conditional disabling and turning off other switches
    useEffect(() => {
        if (!enableNotifications && isEditing) {
            setEmailNotifications(false);
            setSmsNotifications(false);
            setPushNotifications(false);
        }
    }, [enableNotifications, isEditing]); // Depend on enableNotifications and isEditing

    const handleSaveChanges = () => {
        showSweetAlert('Notification settings saved successfully!', 'success');
        // Add logic to save data to backend
        setIsEditing(false); // Exit edit mode after saving
    };

    const handleCancel = () => {
        showSweetAlert('Operation Cancelled', 'error');
        // Revert to initial values
        setEnableNotifications(initialEnableNotifications);
        setEmailNotifications(initialEmailNotifications);
        setSmsNotifications(initialSmsNotifications);
        setPushNotifications(initialPushNotifications);
        setIsEditing(false); // Exit edit mode
    };

    return (
        <div className="w-full max-w-xl bg-white rounded-lg shadow-md border border-gray-100 p-6 relative">
            {/* Edit Icon - Visible only when not editing */}
            {!isEditing && (
                <button
                    onClick={() => setIsEditing(true)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-yellow-500 transition-colors p-2 rounded-full hover:bg-gray-100"
                    title="Edit Notification Settings"
                >
                    <FaEdit className="text-lg" />
                </button>
            )}

            <form onSubmit={(e) => e.preventDefault()}>
                {/* Spacing added here to prevent overlap with the edit button */}
                <div className="mb-6 pt-10"> {/* Added pt-10 for spacing */}
                    <div className="flex items-center justify-between mt-2 mb-5">
                        <span className="text-gray-800 text-md">Enable / Disabled Notification</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={enableNotifications}
                                onChange={() => isEditing && setEnableNotifications(!enableNotifications)}
                                disabled={!isEditing}
                            />
                            <div
                                className={`w-10 h-5 bg-gray-300 peer-focus:ring-2 peer-focus:ring-yellow-500 rounded-full peer-checked:bg-yellow-500 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                            ></div>
                        </label>
                    </div>

                    <div className={`flex items-center justify-between mt-2 ${!enableNotifications ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <span className="text-gray-600 text-sm">Email Notifications</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={emailNotifications}
                                onChange={() => isEditing && enableNotifications && setEmailNotifications(!emailNotifications)}
                                disabled={!isEditing || !enableNotifications}
                            />
                            <div
                                className={`w-10 h-5 bg-gray-300 peer-focus:ring-2 peer-focus:ring-yellow-500 rounded-full peer-checked:bg-yellow-500 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${!isEditing || !enableNotifications ? 'opacity-50 cursor-not-allowed' : ''}`}
                            ></div>
                        </label>
                    </div>
                    <div className={`flex items-center justify-between mt-2 ${!enableNotifications ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <span className="text-gray-600 text-sm">SMS Notifications</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={smsNotifications}
                                onChange={() => isEditing && enableNotifications && setSmsNotifications(!smsNotifications)}
                                disabled={!isEditing || !enableNotifications}
                            />
                            <div
                                className={`w-10 h-5 bg-gray-300 peer-focus:ring-2 peer-focus:ring-yellow-500 rounded-full peer-checked:bg-yellow-500 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${!isEditing || !enableNotifications ? 'opacity-50 cursor-not-allowed' : ''}`}
                            ></div>
                        </label>
                    </div>
                    <div className={`flex items-center justify-between mt-2 ${!enableNotifications ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <span className="text-gray-600 text-sm">Push Notifications</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={pushNotifications}
                                onChange={() => isEditing && enableNotifications && setPushNotifications(!pushNotifications)}
                                disabled={!isEditing || !enableNotifications}
                            />
                            <div
                                className={`w-10 h-5 bg-gray-300 peer-focus:ring-2 peer-focus:ring-yellow-500 rounded-full peer-checked:bg-yellow-500 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${!isEditing || !enableNotifications ? 'opacity-50 cursor-not-allowed' : ''}`}
                            ></div>
                        </label>
                    </div>
                </div>

                {/* Action Buttons (visible only when editing) */}
                {isEditing && (
                    <div className="mt-[120px] flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={handleSaveChanges}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors"
                        >
                            Save changes
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};


const ProfileSettings = ({ userId, sidebarCollapsed, toggleSidebar }) => {
    // State to manage which sub-component is currently active
    const [activeSetting, setActiveSetting] = useState(null); // Changed default to null

    // Function to render the active component
    const renderActiveSetting = () => {
        switch (activeSetting) {
            case 'information':
                return <ProfileInformation />;
            case 'security':
                return <SecuritySettings />;
            case 'notifications':
                return <NotificationSettings />;
            default:
                return (
                    <div className="w-full max-w-xl bg-white rounded-lg shadow-md border border-gray-100 p-6 text-center text-gray-600">
                        <p className="mb-4">Please select a setting from the left panel to view its details.</p>
                        <p className="text-sm">Click on "Profile Information", "Security Settings", or "Notification Settings" to get started.</p>
                    </div>
                );
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col font-inter">
            {/* Header Component */}
            <Header
                onToggleSidebar={toggleSidebar}
                sidebarCollapsed={sidebarCollapsed}
                userId={userId}
            />

            {/* Main Content Area (Sidebar + Main Content) */}
            <div className="flex flex-1">
                {/* Sidebar Component */}
                <Sidebar sidebarCollapsed={sidebarCollapsed} />

                <main className="flex-1 p-4 md:p-6 overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
                        {/* Left Panel - Navigation */}
                        <div className="w-full md:w-96 shrink-0">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 h-full">
                                <h2 className="text-lg font-medium text-gray-800 mb-4">Profile Settings</h2>

                                {/* Navigation Items */}
                                <div className="space-y-1">
                                    <a
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); setActiveSetting('information'); }} // Prevent default to avoid '#'
                                        className={`flex items-center justify-between p-3 rounded-md cursor-pointer
                                            ${activeSetting === 'information' ? 'bg-yellow-50 text-yellow-500' : 'text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        <span>Profile Information</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </a>

                                    <a
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); setActiveSetting('security'); }} // Prevent default to avoid '#'
                                        className={`flex items-center justify-between p-3 rounded-md cursor-pointer
                                            ${activeSetting === 'security' ? 'bg-yellow-50 text-yellow-500' : 'text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        <span>Security Settings</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </a>

                                    <a
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); setActiveSetting('notifications'); }} // Prevent default to avoid '#'
                                        className={`flex items-center justify-between p-3 rounded-md cursor-pointer
                                            ${activeSetting === 'notifications' ? 'bg-yellow-50 text-yellow-500' : 'text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        <span>Notification Settings</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Vertical Divider (visible on md screens and up) */}
                        <div className="hidden md:block w-px bg-gray-200 h-auto"></div>

                        {/* Right Panel - Dynamic Content */}
                        <div className="flex-1">
                            {/* Back Button - Updated */}
                            {activeSetting && ( // Conditionally render the back button
                                <div className="mb-6">
                                    <button
                                        onClick={() => setActiveSetting(null)} // Set activeSetting to null to show default message
                                        className="text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg p-2 text-md flex items-center"
                                    >
                                        <FaArrowLeft className="text-lg" /> {/* Only arrow icon */}
                                    </button>
                                </div>
                            )}

                            {renderActiveSetting()}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProfileSettings;
