import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import {MOCK_TICKETS} from '../../MockData/feedbackData';

// Define the structure for a not-found or loading ticket
const EMPTY_TICKET = {
    ticketId: 'N/A',
    customerName: 'Loading...',
    issueType: 'N/A',
    issueDescription: 'Loading ticket data...',
    status: 'Loading',
    priority: 'N/A',
    vendorName: 'N/A',
    deliveryRep: 'N/A',
    dateCreated: 'N/A',
    adminResponse: '',
    resolutionHistory: '',
};


export const FeedbackTicketDetailCard = ({ userId, sidebarCollapsed, toggleSidebar }) => {
    // Get ID from URL parameters (assuming route is /tickets/:id)
    const { id } = useParams(); 
    const navigate = useNavigate();
    
    // State to hold the ticket details
    const [ticket, setTicket] = useState(EMPTY_TICKET);
    // State to hold the temporary text in the admin response box
    const [newAdminResponse, setNewAdminResponse] = useState('');

    // Fetch and Filter Data Logic
    useEffect(() => {
        const foundTicket = MOCK_TICKETS.find(t => t.ticketId === id);

        if (foundTicket) {
            setTicket(foundTicket);
        } else {
            setTicket({ ...EMPTY_TICKET, ticketId: id, status: 'Not Found', issueDescription: `Ticket with ID ${id} not found.` });
        }
        
        setNewAdminResponse(''); // Clear unsaved response on new ticket load
    }, [id]);

    
    // --- Utility & State Derivations ---

    const getStatusColorClass = (status) => {
        switch (status) {
            case 'Open':
            case 'In progress': 
                return 'text-yellow-500';
            case 'Resolved':
                return 'text-green-500';
            case 'Not Found':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    };

    const hasUnsavedResponse = newAdminResponse.trim().length > 0;
    const isResolved = ticket.status === 'Resolved';
    const isNotFound = ticket.status === 'Not Found';
    const hasSavedResponse = !!ticket.adminResponse;
    const isActionable = !isResolved && !isNotFound;

    // Mark as Resolved button is enabled if a response is either typed OR already saved
    const canBeResolved = hasUnsavedResponse || hasSavedResponse;

    // --- Core Logic Functions ---

    const handleSendResponse = () => {
        if (!hasUnsavedResponse || !isActionable) return;

        const responseDate = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });

        setTicket(prev => ({
            ...prev,
            adminResponse: newAdminResponse.trim(),
            // Set status to 'In progress' when a response is sent (after Open or Reopen)
            status: 'In progress', 
            resolutionHistory: `Responded on ${responseDate}.`,
        }));

        // Clear the unsaved response, moving the typed text into the saved 'adminResponse' state
        setNewAdminResponse('');
    };

    const handleMarkResolved = () => {
        if (!canBeResolved || !isActionable) return;

        // Use the new typed response if available, otherwise use the existing saved response
        const finalResponse = hasUnsavedResponse ? newAdminResponse.trim() : ticket.adminResponse;

        if (!finalResponse) {
            alert('Please provide an admin response before marking as Resolved.');
            return;
        }

        const resolveDate = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });

        // Ensure resolution history includes "Responded" date
        const responseHistoryPart = ticket.resolutionHistory.includes('Responded')
            ? ticket.resolutionHistory.split('.')[0]
            : `Responded on ${resolveDate}.`; 

        setTicket(prev => ({
            ...prev,
            status: 'Resolved',
            adminResponse: finalResponse,
            resolutionHistory: `${responseHistoryPart}. Resolved on ${resolveDate}.`,
        }));

        setNewAdminResponse('');
    };

    const handleReopen = () => {
        if (!isResolved) return;
        setTicket(prev => ({
            ...prev,
            // Reopening sets status to 'Open'
            status: 'Open',
        }));
    };

    // --- Rendering Functions ---

    const renderResponseArea = () => (
        <div className="mb-4">
            <span className="font-semibold block mb-2">Admin response:</span>
            <textarea
                // Display the new typed response if present, otherwise display the saved response
                value={hasUnsavedResponse ? newAdminResponse : ticket.adminResponse}
                onChange={(e) => setNewAdminResponse(e.target.value)}
                placeholder="Enter admin response here..."
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-800 disabled:bg-gray-50 disabled:cursor-not-allowed"
                disabled={isResolved || isNotFound}
            />
        </div>
    );

    const renderActionButtons = () => {
        if (isNotFound) return null;

        if (isResolved) {
            return (
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={handleReopen}
                        className="w-full sm:w-1/2 bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-500 transition"
                    >
                        Reopen Ticket
                    </button>
                    <button
                        disabled
                        className="w-full sm:w-1/2 bg-green-500 text-white font-semibold py-2 px-4 rounded-lg cursor-not-allowed opacity-70"
                    >
                        Resolved
                    </button>
                </div>
            );
        }

        // Case: Open/In progress Ticket
        return (
            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={handleSendResponse}
                    // 💡 FINAL LOGIC: Enabled ONLY if new text is typed.
                    // This allows for updates/resends even if an old response exists.
                    disabled={!hasUnsavedResponse}
                    className={`w-full sm:w-1/2 font-semibold py-2 px-4 rounded-lg transition 
                  ${hasUnsavedResponse ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                    Send Response
                </button>

                <button
                    onClick={handleMarkResolved}
                    // Enabled only if a response is present (either unsaved or saved)
                    disabled={!canBeResolved}
                    className={`w-full sm:w-1/2 font-semibold py-2 px-4 rounded-lg transition 
                  ${canBeResolved ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                    Mark as Resolved
                </button>
            </div>
        );
    };

    // --- Component JSX Return ---

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
                    <div className="">

                        <PageHeaderWithFilters
                            title="Ticket Details"
                            breadcrumbs={[]}
                            showExportButton={false}
                            filterCategories={[]}
                            onDateChange={() => { }}
                            onFilterChange={() => { }}
                            onExportClick={() => { }}
                            showSearchBox={false}
                            showDateSelector={false}
                            showBackButton={true}
                            onBackClick={() => { navigate('/feedback') }}
                        />
                    </div>
                    <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md text-sm font-medium text-gray-800">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ticket {isNotFound ? 'Not Found' : 'Details'}</h2>

                        {/* Ticket Details */}
                        <div className="mb-2">
                            <span className="font-semibold">Ticket ID:</span> <span className="text-gray-500">{ticket.ticketId}</span>
                        </div>
                        <div className="mb-2">
                            <span className="font-semibold">Customer name:</span> <span className="text-gray-500">{ticket.customerName}</span>
                        </div>
                        <div className="mb-2">
                            <span className="font-semibold">Issue type:</span> <span className="text-gray-500">{ticket.issueType}</span>
                        </div>

                        {/* Issue Description */}
                        <div className="mb-2">
                            <span className="font-semibold">Issue description:</span>
                            <p className="text-gray-500 mt-1">{ticket.issueDescription}</p>
                        </div>

                        {/* Status & Priority */}
                        <div className="mb-2">
                            <span className="font-semibold">Status:</span> <span className={getStatusColorClass(ticket.status)}>{ticket.status}</span>
                        </div>
                        <div className="mb-2">
                            <span className="font-semibold">Priority:</span> <span className="text-red-500">{ticket.priority}</span>
                        </div>

                        {/* Other Details */}
                        <div className="mb-2">
                            <span className="font-semibold">Vendor name:</span> <span className="text-gray-500">{ticket.vendorName}</span>
                        </div>
                        <div className="mb-2">
                            <span className="font-semibold">Delivery rep:</span> <span className="text-gray-500">{ticket.deliveryRep}</span>
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Date created:</span> <span className="text-gray-500">{ticket.dateCreated}</span>
                        </div>

                        {/* Admin Response Area */}
                        {!isNotFound && renderResponseArea()}

                        {/* Resolution History */}
                        <div className="mb-6">
                            <span className="font-semibold">Resolution history:</span>
                            <span className="text-gray-500">{ticket.resolutionHistory || ' None yet.'}</span>
                        </div>

                        {/* Action Buttons */}
                        {renderActionButtons()}
                    </div>

                </main>
            </div>
        </div>

    );
};