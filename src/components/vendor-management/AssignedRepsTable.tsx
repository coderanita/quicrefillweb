import React, { useState, useEffect } from "react";
import { FaPlusCircle, FaMinusCircle, FaEye, FaTimes, FaFlag, FaTrashAlt } from "react-icons/fa";
// Assuming you have this helper function
// import {showSweetAlert} from '../Includes/SweetAlert2'; 

// --- INITIAL DATA (Unchanged) ---
const INITIAL_REPS = [
    { RepID: "REP-401", Name: "John Doe", TotalDeliveries: 3210, AvgDeliveryTime: "28 mins", Flagged: false, Status: "Active" },
    { RepID: "REP-402", Name: "Jane Smith", TotalDeliveries: 2145, AvgDeliveryTime: "32 mins", Flagged: false, Status: "Active" },
    { RepID: "REP-403", Name: "Ibrahim Musa", TotalDeliveries: 1980, AvgDeliveryTime: "39 mins", Flagged: true, Status: "Active" },
    { RepID: "REP-404", Name: "Ngozi Okeke", TotalDeliveries: 2350, AvgDeliveryTime: "35 mins", Flagged: false, Status: "Active" },
    { RepID: "REP-405", Name: "Anthony Ade", TotalDeliveries: 2000, AvgDeliveryTime: "30 mins", Flagged: false, Status: "Active" },
];

const statusColor = {
    Active: "text-green-800",
    Inactive: "text-yellow-800",
    Suspended: "text-red-800",
};

// --- Helper Function to calculate next Rep ID ---
const calculateNextRepId = (reps) => {
    if (reps.length === 0) return "REP-401";

    // Extract all numeric parts from existing RepIDs (e.g., 'REP-405' -> 405)
    const existingNumbers = reps
        .map(rep => rep.RepID)
        .filter(id => id && id.startsWith('REP-'))
        .map(id => parseInt(id.substring(4)))
        .filter(num => !isNaN(num));

    // Find the highest number or use 400 as a base if none found
    const maxNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) : 400;
    
    // The next ID number
    const nextNumber = maxNumber + 1;

    return `REP-${nextNumber.toString().padStart(3, '0')}`;
};

// --- View Details Modal (Unchanged) ---
const ViewRepModal = ({ rep, onClose }) => (
    rep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
            <div className="bg-white rounded-xl shadow-2xl p-6 min-w-[350px] w-full max-w-lg transform scale-100 transition-transform duration-300">
                
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Rep Details: {rep.Name}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <FaTimes size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                    
                    <div className="col-span-2">
                        <p className="text-gray-500 font-medium">Rep ID</p>
                        <p className="text-gray-900 font-semibold text-base">{rep.RepID}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Total Deliveries</p>
                        <p className="text-gray-800 font-medium">{rep.TotalDeliveries.toLocaleString()}</p>
                    </div>
                    
                    <div>
                        <p className="text-gray-500">Avg. Delivery Time</p>
                        <p className="text-gray-800 font-medium">{rep.AvgDeliveryTime}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Flagged</p>
                        <p className={`font-semibold ${rep.Flagged ? 'text-red-600' : 'text-green-600'}`}>
                            {rep.Flagged ? <FaFlag className="inline mr-1" /> : ''}
                            {rep.Flagged ? 'Yes (Performance Issue)' : 'No'}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">Status</p>
                        <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                                rep.Status === "Active" ? "bg-green-100 text-green-800" :
                                rep.Status === "Inactive" ? "bg-yellow-100 text-yellow-800" :
                                "bg-red-100 text-red-800"
                            }`}
                        >
                            {rep.Status}
                        </span>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t flex justify-end">
                    <button
                        className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                        onClick={onClose}>Close</button>
                    
                </div>
            </div>
        </div>
    )
);

// --- Assign Rep Modal (Corrected Input Binding) ---
const AssignRepModal = ({ newRep, setNewRep, handleAssignRep, onClose }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewRep(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
            <form
                className="bg-white rounded-xl shadow-2xl p-6 min-w-[350px] w-full max-w-lg transform scale-100 transition-transform duration-300"
                onSubmit={handleAssignRep}
            >
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Assign New Delivery Rep</h3>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Modal Body - Form Fields */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    
                    {/* Rep ID (Now Readonly and Auto-populated) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rep ID</label>
                        <input className="border border-gray-300 w-full p-2 rounded-lg bg-gray-100 text-gray-500" 
                            type="text"
                            name="RepID" 
                            readOnly
                            value={newRep.RepID}
                        />
                    </div>
                    
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input className="border border-gray-300 w-full p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                            type="text" required 
                            name="Name"
                            placeholder="e.g., Adaobi Eke"
                            value={newRep.Name}
                            onChange={handleChange}
                        />
                    </div>
                    
                    {/* Status (Default to Active) */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Initial Status</label>
                        <select className="border border-gray-300 w-full p-2 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                            name="Status"
                            value={newRep.Status}
                            onChange={handleChange}
                        >
                            <option>Active</option>
                            <option>Inactive</option>
                            <option>Suspended</option>
                        </select>
                    </div>

                    {/* Placeholder for other initial metrics */}
                    <p className="col-span-2 text-xs text-gray-500 italic">
                        *Total Deliveries and Avg. Delivery Time will start at 0 and be calculated over time.
                    </p>
                </div>

                {/* Modal Footer - Actions */}
                <div className="pt-4 border-t flex justify-end space-x-3">
                    <button
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                        type="button"
                        onClick={onClose}>Cancel</button>
                    <button className="bg-green-600 px-4 py-2 rounded-lg text-white hover:bg-green-700 transition-colors text-sm font-medium" type="submit">
                        <FaPlusCircle className="inline mr-2" />Assign Rep
                    </button>
                </div>
            </form>
        </div>
    );
};

// --- Remove Reps Modal (Unchanged) ---
const RemoveRepModal = ({ reps, onConfirmRemove, onClose }) => {
    const [selectedReps, setSelectedReps] = useState([]);

    const toggleRepSelection = (repID) => {
        setSelectedReps(prev => 
            prev.includes(repID)
                ? prev.filter(id => id !== repID)
                : [...prev, repID]
        );
    };

    const handleConfirm = () => {
        if (selectedReps.length > 0) {
            onConfirmRemove(selectedReps);
        }
    };
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
            <div className="bg-white rounded-xl shadow-2xl p-6 min-w-[350px] w-full max-w-lg transform scale-100 transition-transform duration-300">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-xl font-bold text-red-700 flex items-center">
                        <FaTrashAlt className="mr-2" />
                        Permanently Remove Delivery Reps
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Modal Body - Rep Selection */}
                <div className="mb-4 max-h-80 overflow-y-auto border p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-3 font-medium">Select reps to permanently remove:</p>
                    {reps.map(rep => (
                        <label key={rep.RepID} className="flex items-center justify-between p-2 hover:bg-red-50 rounded-lg cursor-pointer transition-colors">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedReps.includes(rep.RepID)}
                                    onChange={() => toggleRepSelection(rep.RepID)}
                                    className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                />
                                <span className="ml-3 text-sm font-medium text-gray-700">{rep.Name} ({rep.RepID})</span>
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                                rep.Status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                                {rep.Status}
                            </span>
                        </label>
                    ))}
                    {reps.length === 0 && <p className="text-center text-gray-500 italic">No representatives to remove.</p>}
                </div>

                {/* Warning and Summary */}
                <p className="text-sm text-red-600 mb-4 font-bold">
                    ⚠️ WARNING: This action is permanent. The selected {selectedReps.length} rep(s) will be completely removed from this table.
                </p>

                {/* Modal Footer */}
                <div className="pt-4 border-t flex justify-end space-x-3">
                    <button
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                        type="button"
                        onClick={onClose}>Cancel</button>
                    <button 
                        className="bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50" 
                        type="button"
                        onClick={handleConfirm}
                        disabled={selectedReps.length === 0}
                    >
                        <FaMinusCircle className="inline mr-2" />
                        Confirm Remove ({selectedReps.length})
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Main Component ---
export default function AssignedRepsTable() {
    const [viewModalRep, setViewModalRep] = useState(null);
    const [assignModalOpen, setAssignModalOpen] = useState(false);
    const [removeModalOpen, setRemoveModalOpen] = useState(false); 
    const [reps, setReps] = useState(INITIAL_REPS);
    const [newRep, setNewRep] = useState({
        RepID: "",
        Name: "",
        TotalDeliveries: 0,
        AvgDeliveryTime: "N/A",
        Flagged: false,
        Status: "Active",
    });

    // Effect to calculate and set the next RepID whenever the modal opens or reps change
    useEffect(() => {
        if (assignModalOpen) {
            const nextId = calculateNextRepId(reps);
            setNewRep(prev => ({ 
                ...prev, 
                RepID: nextId,
                Name: "", // Clear name for new entry
                Status: "Active" // Reset status for new entry
            }));
        }
    }, [assignModalOpen, reps]);

    const openAssignModal = () => {
        setAssignModalOpen(true);
    };

    const openRemoveModal = () => {
        setRemoveModalOpen(true);
    };

    const handleAssignRep = (e) => {
        e.preventDefault();
        
        // Ensure data integrity before adding
        const repToAdd = {
            ...newRep,
            TotalDeliveries: parseInt(newRep.TotalDeliveries) || 0,
            Flagged: newRep.Flagged === 'true' || newRep.Flagged === true,
        };

        setReps([...reps, repToAdd]);
        setAssignModalOpen(false);
        // showSweetAlert('Rep Assigned Successfully!', 'success');
    };

    const handleConfirmRemove = (repIDs) => {
        // Filter out any rep whose ID is in the repIDs array.
        setReps(prevReps =>
            prevReps.filter(rep => !repIDs.includes(rep.RepID))
        );
        setRemoveModalOpen(false);
        // showSweetAlert('Reps Permanently Removed!', 'success');
    };
    
    const handleViewDetails = (rep) => {
        setViewModalRep(rep);
    };

    const closeViewModal = () => setViewModalRep(null);
    const closeAssignModal = () => setAssignModalOpen(false);
    const closeRemoveModal = () => setRemoveModalOpen(false);

    return (
        <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
                <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800">Assigned Delivery Reps</h2>
                </div>
                <div className="overflow-auto p-4">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-600 tracking-wider">
                            <tr>
                                <th scope="col" className="px-3 py-2 text-left font-medium">Rep ID</th>
                                <th scope="col" className="px-3 py-2 text-left font-medium">Name</th>
                                <th scope="col" className="px-3 py-2 text-left font-medium">Total Deliveries</th>
                                <th scope="col" className="px-3 py-2 text-left font-medium">Avg. Delivery Time</th>
                                <th scope="col" className="px-3 py-2 text-left font-medium">Flagged?</th>
                                <th scope="col" className="px-3 py-2 text-left font-medium">Status</th>
                                <th scope="col" className="px-3 py-2 text-left font-medium">Details</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-gray-600">
                            {reps.map((rep, index) => (
                                <tr key={rep.RepID || index}>
                                    <td className="px-3 py-2 whitespace-nowrap">{rep.RepID}</td>
                                    <td className="px-3 py-2 whitespace-nowrap">{rep.Name}</td>
                                    <td className="px-3 py-2 whitespace-nowrap">{rep.TotalDeliveries.toLocaleString()}</td>
                                    <td className="px-3 py-2 whitespace-nowrap">{rep.AvgDeliveryTime}</td>
                                    <td className="px-3 py-2 whitespace-nowrap">
                                        {rep.Flagged ? 
                                            <span className="text-red-500 font-medium">Yes</span> : 
                                            <span>No</span>
                                        }
                                    </td>
                                    <td className={`px-3 py-2 whitespace-nowrap ${statusColor[rep.Status] || 'text-gray-600'}`}>
                                        {rep.Status}
                                    </td>
                                    <td
                                        className="px-3 py-2 whitespace-nowrap text-blue-500 hover:text-blue-700 cursor-pointer"
                                        onClick={() => handleViewDetails(rep)}
                                    >
                                        View Details
                                    </td>
                                </tr>
                            ))}
                            {reps.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="px-3 py-4 text-center text-gray-500 italic">No delivery representatives assigned.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
                <button
                    onClick={openAssignModal}
                    className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black py-2 px-4 rounded text-sm flex items-center"
                >
                    <FaPlusCircle className="mr-2" />
                    Assign New Delivery Reps
                </button>
                <button
                    onClick={openRemoveModal}
                    className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black py-2 px-4 rounded text-sm flex items-center"
                >
                    <FaMinusCircle className="mr-2" />
                    Remove Delivery Reps
                </button>
            </div>

            {/* Render Modals */}
            {viewModalRep && <ViewRepModal rep={viewModalRep} onClose={closeViewModal} />}
            {assignModalOpen && (
                <AssignRepModal 
                    newRep={newRep} 
                    setNewRep={setNewRep} 
                    handleAssignRep={handleAssignRep} 
                    onClose={closeAssignModal} 
                />
            )}
            {removeModalOpen && (
                <RemoveRepModal
                    reps={reps}
                    onConfirmRemove={handleConfirmRemove}
                    onClose={closeRemoveModal}
                />
            )}
        </div>
    );
}