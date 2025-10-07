import { useState, useEffect } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import { useParams, useNavigate } from 'react-router-dom';
import ServiceDetails from './ServiceDetails';
import ServiceOrdersHistory from './ServiceOrdersHistory';
import VendorTable from './VendorTable';
import {reviewColumns,reviewData} from "../../MockData/ServiceData";
import ReusableTable from "../Includes/ReusableTable";



export const ServiceManagementDetails = ({ userId, sidebarCollapsed, toggleSidebar }) => {


    const { id } = useParams();
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
                        title="Service Detail Page"
                        breadcrumbs={[{ "label": "Dashboard", "href": "/dashboard" }, { "label": "Service Management", "href": "/service-management" }, { "label": "Service Detail" },
                        { "label": id },

                        ]}
                        showExportButton={false}
                        filterCategories={[]}
                        onDateChange={() => { }}
                        onFilterChange={() => { }}
                        onExportClick={() => { }}
                        showDateSelector={false}
                        showBackButton={true}
                        onBackClick={() => navigate('/service-management')}
                    />
                    <ServiceDetails />
                    <div className="mt-6 w-full">
                        <div className="bg-white rounded-lg shadow-md w-full overflow-hidden">

                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-800">Service Description & Specifications</h2>
                            </div>


                            <div className="p-6">
                                <p className="text-gray-600 mb-6">
                                    Premium logistics services with dependable delivery. Ensuring quality and safety compliance
                                    with industry standards.
                                </p>


                                <div className="grid">

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="text-gray-500 text-sm">Delivery Time:</div>
                                            <div className="text-gray-700">24 Hours</div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="text-gray-500 text-sm">Service Area:</div>
                                            <div className="text-gray-700">Lagos & Ogun State</div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="text-gray-500 text-sm">Safety Certifications:</div>
                                            <div className="text-gray-700">ISO 22000 Certified</div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="text-gray-500 text-sm">Payment Options:</div>
                                            <div className="text-gray-700">Bank Transfer, Wallet Payment, Card Payment</div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="text-gray-500 text-sm">Support Contact:</div>
                                            <div className="text-gray-700">+234 900 000 0000</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ServiceOrdersHistory/>
                    <VendorTable/>
                      <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mt-6">
                        <ReusableTable
                            title="Service Reviews & Ratings"
                            columns={reviewColumns}
                            data={reviewData}
                            rowsPerPage={5}
                            showPagination={true}
                        />
                        </div>
                </main>
            </div>
        </div>
    );
};

