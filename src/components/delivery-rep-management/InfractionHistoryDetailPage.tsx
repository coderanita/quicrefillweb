import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Icons needed for the main layout and the card details
import { FaFlag, FaBan, FaRegStickyNote, FaRegCopy, FaExclamationTriangle, FaTimes } from 'react-icons/fa'; 

// --- Import your custom includes (assuming correct paths) ---
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import { showSweetAlert } from '../Includes/SweetAlert2';


// --- MOCK DELIVERY REP DATA ARRAY ---
const deliveryReps = [
    {
        id: 'INF-00921',
        name: 'John Smith',
        details: [
            { field: 'Type', detail: 'Delivery Delay' },
            { field: 'Occurred', detail: 'Order #4512 (15 Jun 3:45PM)' },
            { field: 'Admin', detail: 'Miracle T.' },
            { field: 'Notes', detail: `"30min late, no communication"` },
        ],
        history: [
            { date: '25th June 2025', detail: 'CURRENT WARNING', isWarning: true },
            { date: '12th June 2025', detail: 'Late delivery', isWarning: false },
            { date: '5th June 2025', detail: 'Late delivery', isWarning: false },
        ],
    },
    {
        id: 'INF-00895',
        name: 'Alice Johnson',
        details: [
            { field: 'Type', detail: 'Customer Complaint' },
            { field: 'Occurred', detail: 'Order #9876 (10 May 1:00PM)' },
            { field: 'Admin', detail: 'Derek K.' },
            { field: 'Notes', detail: `"Item was left at the wrong door"` },
        ],
        history: [
            { date: '10th May 2025', detail: 'CURRENT WARNING', isWarning: true },
            { date: '1st May 2025', detail: 'Minor issue', isWarning: false },
        ],
    },
    { id: 'INF-00910', name: 'Bob Williams', details: [{ field: 'Type', detail: 'No Issues' }], history: [] },
    
];
// ---------------------------------------------

// --- Modal Placeholder Component ---
const NotesModal = ({ repName, isOpen, onClose, onAddNote }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const comment = e.target.elements.comment.value.trim();
        if (!comment) return;

        // Add the new note to the history
        onAddNote(comment); 
        
        showSweetAlert(`Note added for ${repName}!`, 'success');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-semibold text-gray-800">Add Comment/Note</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4">
                    <textarea
                        name="comment" // Added name attribute for form submission
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                        rows="5"
                        placeholder="Type your notes or comments here..."
                        required
                    ></textarea>
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-sm"
                        >
                            Save Note
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
// ---------------------------------------------


export const InfractionHistoryDetailPage = ({ userId, sidebarCollapsed, toggleSidebar }) => {
    
    const { id } = useParams();
    const navigate = useNavigate();

    // State for dynamic data, loading, and the modal
    const [repData, setRepData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [repHistory, setRepHistory] = useState([]); // State for mutable history

    // Effect to fetch/filter data based on the URL ID
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            const foundRep = deliveryReps.find(rep => rep.id === id);
            setRepData(foundRep);
            setRepHistory(foundRep ? foundRep.history : []); // Initialize mutable history state
            setIsLoading(false);
        }, 300); 

        return () => clearTimeout(timer); 
    }, [id]);

    // Function to add a new note/comment to the history list
    const handleAddNoteToHistory = useCallback((comment) => {
        const today = new Date().toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric' 
        });

        const newNote = {
            date: today,
            detail: `Admin Comment: "${comment}"`,
            isWarning: false,
        };

        // Prepend the new note to the history list
        setRepHistory(prevHistory => [newNote, ...prevHistory]); 

    }, []);

    // Handler for the "Issue Final Warning" button
    const handleFinalWarning = () => {
        showSweetAlert(`Final Warning Issued to ${repData?.name || 'Rep'}`, 'warning');
    };

    // Handler for the "Suspend Account" button
    const handleSuspendAccount = () => {
        showSweetAlert(`${repData?.name || 'Rep'} Account Suspended Successfully`, 'error');
    };

    // Handler for the "Add Comments/Notes" button (opens modal)
    const handleOpenNotesModal = () => {
        setIsModalOpen(true);
    };

    // --- Content Rendering Functions ---

    const renderCardContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-start items-center h-64">
                    <p className="text-xl text-gray-500">Loading details for Rep ID: **{id}**...</p>
                </div>
            );
        }

        if (!repData) {
            return (
                <div className="bg-white rounded-lg shadow-lg p-8 text-center w-full max-w-xl">
                    <FaExclamationTriangle className="h-10 w-10 text-red-500 mb-4" />
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Rep Not Found</h2>
                    <p className="text-lg text-gray-600">
                        Delivery Representative with ID **{id}** not found in the records.
                    </p>
                </div>
            );
        }

        // --- Actual Card UI using repData and repHistory ---
        return (
            // Card is now left-aligned (max-w-xl limits its width)
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xl"> 
                
                {/* Header */}
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h2 className="text-2xl font-bold text-gray-800">{repData.name}</h2>
                    <button className="text-gray-500 hover:text-blue-600 transition duration-150" title="Copy Details">
                        <FaRegCopy className="h-6 w-6" />
                    </button>
                </div>
                
                {/* Details Table */}
                <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm border-collapse">
                        <thead className="bg-gray-100 text-gray-600 font-medium border-t">
                            <tr>
                                <th className="text-left px-4 py-3">Field</th>
                                <th className="text-left px-4 py-3">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-gray-800">
                            {repData.details.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 text-gray-500">{item.field}</td>
                                    <td className="px-4 py-2">{item.detail}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* History (Uses dynamic repHistory state) */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-1">Infraction History</h3>
                    <table className="w-full text-sm">
                        <tbody>
                            {repHistory.length > 0 ? (
                                repHistory.map((item, index) => (
                                    <tr key={index} className="border-t border-gray-100">
                                        <td className="py-2 w-1/3">{item.date}</td>
                                        <td 
                                            className={`py-2 ${
                                                item.isWarning ? 'font-semibold text-red-600' : 'font-medium text-gray-700'
                                            }`}
                                        >
                                            {item.detail}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="py-2 text-gray-500 italic">No infraction history found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap justify-start gap-3 pt-4 border-t">
                    <button 
                        onClick={handleFinalWarning}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded text-sm transition shadow-md"
                    >
                        Issue Final Warning
                    </button>
                    <button 
                        onClick={handleSuspendAccount}
                        // Used FaBan (Prohibited) icon for Suspend
                        className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded text-sm flex items-center gap-2 transition shadow-md"
                    >                        
                        <span>Suspend Account</span>
                    </button>
                    <button 
                        onClick={handleOpenNotesModal} // Opens the modal
                        className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-gray-700 py-2 px-4 rounded text-sm flex items-center transition shadow-sm"
                    >
                        <FaRegStickyNote className="mr-2" />
                        Add Comments/Notes
                    </button>
                </div>
            </div>
        );
    };

    // --- Main Layout Render ---
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Header
                onToggleSidebar={toggleSidebar}
                sidebarCollapsed={sidebarCollapsed}
                userId={userId}
            />
            <div className="flex flex-1">
                <Sidebar sidebarCollapsed={sidebarCollapsed} />
                <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                    
                    {/* Top Row: Header and Flag Button */}
                    <div className="flex items-start md:items-center justify-between mb-6 flex-col md:flex-row gap-4">
                        {/* Left: Page Header with Filters */}
                        <PageHeaderWithFilters
                            title="Infraction History Detail Page"
                            breadcrumbs={[
                                { label: "Dashboard", href: "/dashboard" },
                                { label: "Delivery Rep Management", href: "/delivery-rep-management" }, 
                                { label: id }
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

                        {/* Right: Flag Delivery Rep Button (Uses FaFlag icon) */}
                        <button
                            className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black py-2 px-3 sm:px-4 rounded text-xs sm:text-sm flex items-center gap-2 shadow-md transition"
                            onClick={() => { showSweetAlert('Delivery Rep Flagged Successfully', 'info'); }}
                        >
                            <FaFlag className="mr-2" /> {/* Changed icon to FaFlag */}
                            <span>Flag Delivery Rep</span>
                        </button>
                    </div>
                    
                    {/* Main Content Area: The Details Card (Left aligned) */}
                    {renderCardContent()}
                    
                </main>
            </div>
            
            {/* Notes Modal */}
            {repData && (
                <NotesModal 
                    repName={repData.name} 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    onAddNote={handleAddNoteToHistory} // Pass the history update function
                />
            )}
        </div>
    );
};