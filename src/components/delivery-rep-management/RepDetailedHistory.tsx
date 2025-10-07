import React, { useState } from 'react';
import { FaEye, FaSyncAlt, FaExclamationCircle, FaClipboardList, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// --- MOCK DATA ---

const mockPayouts = [
    { id: 'TXN-00123', amount: '₦50,000', date: '2025-03-10', status: 'Completed', bank: 'GTBank', account: '0023456789', details: 'Weekly earnings withdrawal for Rep R1001. Processed successfully.' },
    { id: 'TXN-00105', amount: '₦30,000', date: '2025-03-10', status: 'Completed', bank: 'Zenith', account: '1012345678', details: 'Bonus payout for high order volume in February.' },
    { id: 'TXN-00098', amount: '₦40,000', date: '2025-02-10', status: 'Completed', bank: 'AccessBank', account: '2045678912', details: 'Regular bi-weekly salary transfer.' },
    { id: 'TXN-00080', amount: '₦20,000', date: '2025-02-01', status: 'Pending', bank: 'FidelityBank', account: '3056789012', details: 'Transfer initiated, awaiting bank clearance.' },
];

const mockIncidents = [
    { id: 'REP-00921', customer: 'Michael E.', type: 'Late Delivery', date: '2025-03-12', status: 'Resolved', description: 'Order was 45 minutes late due to traffic congestion. Customer was offered a 10% discount.' },
    { id: 'REP-00910', customer: 'Aisha K.', type: 'Rude Behavior', date: '2025-03-10', status: 'Pending', description: 'Representative spoke to the customer rudely when asked to wait an extra minute. Rep requires mandatory retraining.' },
    { id: 'REP-00895', customer: 'Emeka O.', type: 'Damaged Package', date: '2025-03-08', status: 'Investigating', description: 'Fragile package arrived with a dent. Insurance claim filed.' },
];

const mockInfractions = [
    { id: 'INF-00921', type: 'Warning', reason: 'Late delivery (3rd offense)', date: '2025-03-12', severity: 'Low', details: 'Final warning issued. Next infraction results in a 1-day suspension.' },
    { id: 'INF-00910', type: 'Flagging', reason: 'Rude Behavior Complaint', date: '2025-03-10', severity: 'Medium', details: 'Case is tied to Incident REP-00910. Currently under review for disciplinary action.' },
    { id: 'INF-00895', type: 'Warning', reason: 'Missed Shift Start Time', date: '2025-03-08', severity: 'Low', details: 'First offense for clocking in late. Verbal warning issued.' },
];

// --- REUSABLE MODAL COMPONENT (Custom) ---

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-red-500">
                        <FaTimes className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---

export const RepDetailedHistory = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({});

    const handleViewDetails = (title, data) => {
        setModalContent({ title, data });
        setIsModalOpen(true);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Completed':
            case 'Resolved':
                return 'text-green-600';
            case 'Pending':
            case 'Warning':
            case 'Low':
                return 'text-yellow-600';
            case 'Investigating':
            case 'Medium':
                return 'text-orange-500';
            case 'High':
            case 'Suspended':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    // --- Payout History Table Component ---
    const PayoutHistoryTable = () => (
        <div className="bg-white rounded-md border border-gray-300 shadow-md p-6 mb-6 mt-4">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                    <h1 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">Payout History</h1>
                    <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
                        <FaSyncAlt className="mr-2"/> Refresh
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-200 text-left text-gray-600 text-sm">
                                <th className="p-3">Transaction ID</th>
                                <th className="p-3">Amount (₦)</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Bank</th>
                                <th className="p-3">Account Number</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockPayouts.map((txn) => (
                                <tr key={txn.id} className="border-t text-gray-700 hover:bg-gray-100">
                                    <td className="p-3 font-medium">{txn.id}</td>
                                    <td className="p-3">{txn.amount}</td>
                                    <td className="p-3">{txn.date}</td>
                                    <td className={`p-3 font-semibold ${getStatusClass(txn.status)}`}>{txn.status}</td>
                                    <td className="p-3">{txn.bank}</td>
                                    <td className="p-3">{txn.account}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => handleViewDetails('Payout Details', { ...txn, 'Type': 'Payout' })}
                                            className="text-blue-500 hover:text-blue-700 font-medium flex items-center text-sm"
                                        >
                                            <FaEye className="mr-1 w-4 h-4"/> View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    // --- Incident Reports Table Component ---
    const IncidentReportsTable = () => (
        <div className="bg-white rounded-md border border-gray-300 shadow-md p-6 mb-6 mt-4">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                    <h1 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">Incident Reports & Complaints</h1>
                    <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
                        <FaExclamationCircle className="mr-2"/> New Report
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-200 text-left text-gray-600 text-sm">
                                <th className="p-3">Report ID</th>
                                <th className="p-3">Customer Name</th>
                                <th className="p-3">Issue Type</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockIncidents.map((incident) => (
                                <tr key={incident.id} className="border-t text-gray-700 hover:bg-gray-100">
                                    <td className="p-3 font-medium">{incident.id}</td>
                                    <td className="p-3">{incident.customer}</td>
                                    <td className="p-3">{incident.type}</td>
                                    <td className="p-3">{incident.date}</td>
                                    <td className={`p-3 font-semibold ${getStatusClass(incident.status)}`}>{incident.status}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => handleViewDetails('Incident Details', { ...incident, 'Type': 'Incident' })}
                                            className="text-blue-500 hover:text-blue-700 font-medium flex items-center text-sm"
                                        >
                                            <FaEye className="mr-1 w-4 h-4"/> View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
const navigate = useNavigate();
    // --- Infractions History Table Component ---
    const InfractionsHistoryTable = () => (
        <div className="bg-white rounded-md border border-gray-300 shadow-md p-6 mb-6 mt-4">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                    <h1 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">Infractions History</h1>                    
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-200 text-left text-gray-600 text-sm">
                                <th className="p-3">Infraction ID</th>
                                <th className="p-3">Type</th>
                                <th className="p-3">Reason</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Severity</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockInfractions.map((infraction) => (
                                <tr key={infraction.id} className="border-t text-gray-700 hover:bg-gray-100">
                                    <td className="p-3 font-medium">{infraction.id}</td>
                                    <td className={`p-3 font-semibold ${getStatusClass(infraction.type)}`}>{infraction.type}</td>
                                    <td className="p-3">{infraction.reason}</td>
                                    <td className="p-3">{infraction.date}</td>
                                    <td className={`p-3 font-semibold ${getStatusClass(infraction.severity)}`}>{infraction.severity}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() =>{navigate('/delivery-rep-management-infraction-history-detail/'+infraction.id)} }
                                            className="text-blue-500 hover:text-blue-700 font-medium flex items-center text-sm"
                                        >
                                            <FaEye className="mr-1 w-4 h-4"/> View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    // --- Dynamic Details Modal Content ---
    const DetailsModalContent = ({ data }) => {
        const displayData = Object.entries(data).filter(([key, value]) => 
            key !== 'details' && key !== 'id' && key !== 'Type' && key !== 'description'
        );

        return (
            <div className="space-y-4">
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <tbody>
                            {displayData.map(([key, value], index) => (
                                <tr key={key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                    <td className="px-4 py-3 font-medium text-gray-600 w-1/3">{key.replace(/([A-Z])/g, ' $1').trim()}</td>
                                    <td className={`px-4 py-3 text-gray-800 font-semibold ${getStatusClass(value)}`}>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {(data.details || data.description) && (
                    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                        <h4 className="font-bold text-gray-700 mb-2">
                            {data.Type === 'Incident' ? 'Complaint Description' : 'Full Details'}
                        </h4>
                        <p className="text-sm text-gray-600">{data.details || data.description}</p>
                    </div>
                )}
            </div>
        );
    };

    return (
            <div>
            <PayoutHistoryTable />
            <IncidentReportsTable />
            <InfractionsHistoryTable />
        
    
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`${modalContent.title || 'Details'}: ${modalContent.data?.id || ''}`}
            >
                <DetailsModalContent data={modalContent.data || {}} />
            </Modal>
        </div>    
    );
};