
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUserLock } from 'react-icons/fa';
import {RepProfileDashboard} from './RepProfileDashboard';
import {showSweetAlert} from '../Includes/SweetAlert2';
import {AssignedServicesTable} from './AssignedServicesTable';
import {RepDetailedHistory} from './RepDetailedHistory';
import OrderHistoryDashboard from './OrderHistoryDashboard';
export const DeliveryRepDetails = ({ userId, sidebarCollapsed, toggleSidebar }) => {


    const { id } = useParams();
    const navigate = useNavigate();
     // Placeholder URL - replace this with your actual Google Maps Embed URL
    const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15858.650892837318!2d3.35121405!3d6.58661705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b927083040c57%3A0x6b772c9d8a59f515!2sIkeja%20City%20Mall!5e0!3m2!1sen!2sng!4v1678893456789!5m2!1sen!2sng";
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
                   <div className="flex items-center justify-between mb-4">
                        {/* Left: Page Header with Filters */}
                        <PageHeaderWithFilters
                            title="Delivery Rep Detail Page"
                            breadcrumbs={[
                            { label: "Dashboard", href: "/dashboard" },
                            { label: "Delivery Rep Management", href: "/delivery-rep-management" },                            
                            { label:""+id }
                            ]}
                            showExportButton={false}
                            filterCategories={[]}
                            onDateChange={() => { }}
                            onFilterChange={() => { }}
                            onExportClick={() => { }}
                            showDateSelector={false}
                            showBackButton={true}
                            onBackClick={() => navigate('/delivery-rep-management')}
                        />

                        {/* Right: Generate Report Button */}
                        <button
                            className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black py-2 px-3 sm:px-4 rounded text-xs sm:text-sm flex items-center gap-2"
                            onClick={()=>{ showSweetAlert('Delivery Rep Suspended Successfully','info'); }}
                        >
                            <FaUserLock className="mr-2" />
                            <span>Suspend / Penalize Rider</span>
                        </button>
                   </div>
                   <RepProfileDashboard repId={id}/>
                   <AssignedServicesTable/>
                       <div className="bg-white rounded-none shadow p-4 w-full mb-6">
                            <h2 className="text-lg font-semibold mb-4">Delivery Rep Location On Map</h2>
                            
                            {/* Map Container */}
                            <div className="relative w-full h-[500px]">
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full border-0 rounded-md"
                                    title="Delivery Rep Location"
                                    src={mapEmbedUrl}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                        <OrderHistoryDashboard/>
                        <RepDetailedHistory/>
                        
                </main>
            </div>
        </div>
    );
};

