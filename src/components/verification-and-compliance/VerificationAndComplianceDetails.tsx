
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import DocumentViewer from './DocumentViewer';
import { useParams, useNavigate } from 'react-router-dom';
export const VerificationAndComplianceDetails = ({ userId, sidebarCollapsed, toggleSidebar }) => {

const navigate = useNavigate();

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Header
                onToggleSidebar={toggleSidebar}
                sidebarCollapsed={sidebarCollapsed}
                userId={userId}
            />
            <div className="flex flex-1">
                <Sidebar sidebarCollapsed={sidebarCollapsed} />
                <main className="flex-1 p-4 md:p-6 overflow-hidden">
                    <PageHeaderWithFilters
                        title=""
                        breadcrumbs={[]}
                        showExportButton={false}
                        filterCategories={[

                        ]}
                        onDateChange={() => { }}
                        onFilterChange={() => { }}
                        onExportClick={() => { }}
                        showSearchBox={false}
                        showBackButton={true}
                        onBackClick={() => { navigate('/verification-and-compliance') }}
                        showDateSelector={false}

                    />
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Left Column - 30% */}
                        <div className="w-full md:w-[30%] bg-white shadow border rounded-lg p-5 space-y-4">
                            <h2 className="text-gray-700 font-semibold">
                                Submission ID: <span className="text-yellow-500">#ORD1001</span>
                            </h2>

                            <div className="border-b pb-2">
                                <p className="text-gray-500 text-sm">Submitted by</p>
                                <p className="text-gray-800 font-medium">Mary Johnson (Rider)</p>
                            </div>

                            <div className="border-b pb-2">
                                <p className="text-gray-500 text-sm">Date & Time</p>
                                <p className="text-gray-800 font-medium">12/02/2025 — 2:54 pm</p>
                            </div>

                            <div className="pb-2">
                                <p className="text-gray-500 text-sm">Submitted from Device</p>
                                <p className="text-gray-800 font-medium">iPhone 13 (IP: 192.168.1.2)</p>
                            </div>
                        </div>

                        {/* Right Column - 70% */}
                        <div className="w-full md:w-[70%] bg-white shadow border rounded-lg p-5 space-y-4">
                            <h2 className="text-yellow-600 font-semibold">Personal Information</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="border-b pb-2">
                                    <p className="text-gray-500 text-sm">Full Name</p>
                                    <p className="text-gray-800 font-medium">Mary Johnson</p>
                                </div>
                                <div className="border-b pb-2">
                                    <p className="text-gray-500 text-sm">Role</p>
                                    <p className="text-gray-800 font-medium">Rider</p>
                                </div>
                                <div className="border-b pb-2">
                                    <p className="text-gray-500 text-sm">Phone Number</p>
                                    <p className="text-gray-800 font-medium">+234 812 345 6789</p>
                                </div>
                                <div className="border-b pb-2">
                                    <p className="text-gray-500 text-sm">ID Number</p>
                                    <p className="text-gray-800 font-medium">0987654321</p>
                                </div>
                                <div className="pb-2">
                                    <p className="text-gray-500 text-sm">Email</p>
                                    <p className="text-gray-800 font-medium">mjohnsonyary@hotmail.com</p>
                                </div>
                                <div className="pb-2">
                                    <p className="text-gray-500 text-sm">Location</p>
                                    <p className="text-gray-800 font-medium">Lekki, Lagos</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DocumentViewer/>
                </main>
            </div>
        </div>
    );
};

