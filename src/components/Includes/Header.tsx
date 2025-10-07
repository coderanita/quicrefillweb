import  { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faAngleRight, faAngleLeft, faSearch, faArrowLeft, faBell, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom'; 

const Header = ({ onToggleSidebar, sidebarCollapsed,  userId }) => {
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    return (
        <header className="bg-white shadow-md flex items-center justify-between p-4 sticky top-0 z-30"> 
            <div className="flex items-center"> 
                <button onClick={onToggleSidebar} className="md:hidden mr-4"> 
                    <FontAwesomeIcon icon={faBars} /> 
                </button>
                <div className="flex items-center mr-4 md:mr-8"> 
                    <img src="/images/logo.png" alt="Quicrefill Logo" className="w-[150px] md:w-[250px]" /> 
                </div>

                
                <button
                    onClick={onToggleSidebar}
                    className="hidden md:flex justify-center items-center p-2 text-gray-600 hover:text-amber-500 transition border border-gray-200 rounded-md px-2 py-1 m-2 z-50"
                > 
                    <FontAwesomeIcon icon={sidebarCollapsed ? faAngleRight : faAngleLeft} /> 
                </button>
            </div>

            {/* Search Bar (Hidden on mobile) */}
            <div className="hidden md:block relative w-1/3"> 
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none pl-10" 
                />
                <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> 
                <button className="absolute right-0 top-0 h-full px-4 bg-gradient-to-b from-[#FFC533] to-[#FFB600] text-black rounded-r-md border border-gray-300 shadow flex items-center justify-center"> 
                    <FontAwesomeIcon icon={faArrowLeft} /> 
                </button>
            </div>

            <div className="flex items-center"> 
                {/* Notification Dropdown */}
                <div className="relative mr-4"> 
                    <button onClick={() => setNotificationOpen(!notificationOpen)} className="relative p-2"> 
                        <FontAwesomeIcon icon={faBell} className="text-gray-600 text-lg" /> 
                        <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs font-bold px-1.5 py-0.5 rounded-full">8</span> 
                    </button>

                    {notificationOpen && (
                        <div
                            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 bg-white border rounded-md shadow-lg z-50" 
                            onClick={() => setNotificationOpen(false)} // Close on item click
                        >
                            <div className="p-3 border-b"> 
                                <span className="font-semibold text-gray-700">Notifications</span> 
                            </div>
                            <ul className="max-h-60 overflow-auto"> 
                                <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"> 
                                    <FontAwesomeIcon icon={faBell} className="text-gray-500 text-sm mr-2" /> 
                                    <span className="text-sm text-gray-700">You have a new message</span> 
                                </li>
                                <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"> 
                                    <FontAwesomeIcon icon={faBell} className="text-green-500 text-sm mr-2" /> {/* Using faBell as a placeholder, original was faCheckCircle */}
                                    <span className="text-sm text-gray-700">Task Completed Successfully</span> 
                                </li>
                                <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"> 
                                    <FontAwesomeIcon icon={faBell} className="text-yellow-500 text-sm mr-2" /> {/* Using faBell as a placeholder, original was faExclamationTriangle */}
                                    <span className="text-sm text-gray-700">System Alert: Update Required</span> 
                                </li>
                            </ul>
                            <div className="p-3 border-t text-center"> 
                                <Link to="/notifications-center" className="text-sm text-blue-500 hover:underline">View all</Link> 
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative"> 
                    <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center rounded-full px-2 py-1 md:px-4 md:py-2 border border-gray-300 shadow-md focus:outline-none"> 
                        <div className="relative w-10 h-10 md:w-10 md:h-10 rounded-full bg-gray-300 mr-2"> 
                            <img src="/images/Avatar/avatar.png" alt="User Avatar" className="w-full h-full object-cover rounded-full" /> 
                            <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" style={{ transform: 'translate(30%, -30%)' }}></div> 
                        </div>
                        <div className="hidden md:block text-left"> 
                            <div className="text-sm font-medium">Timothy Jonson</div> 
                            <div className="text-xs text-gray-500">timoj@Quicrefil.ng</div> 
                        </div>
                    </button>

                    {profileOpen && (
                        <div
                            className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50" 
                            onClick={() => setProfileOpen(false)} // Close on item click
                        >
                            <ul className="py-2"> 
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"> 
                                    <Link to="/profiles-settings" className="flex items-center text-gray-700"> 
                                        <FontAwesomeIcon icon={faUser} className="mr-2" /> 
                                        Profile
                                    </Link>
                                </li>
                                <li className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"> 
                                  <Link to="/logout" className="flex items-center w-full text-left">
                                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> 
                                        Logout
                                    </Link>

                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;