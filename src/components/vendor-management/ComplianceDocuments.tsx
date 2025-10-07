import React, { useState, useEffect } from 'react';
// Import icons from react-icons/fa
import { FaTimes, FaCheckCircle, FaExclamationTriangle, FaEye, FaDownload, FaSyncAlt, FaRegCheckCircle } from 'react-icons/fa';

// 1. Updated Placeholder Image URL to the public path: /images/item.png
const MOCK_DOCUMENT_IMAGE_URL = '/images/item.png'; 
// NOTE: Assuming showSweetAlert is available globally or correctly imported
// If you are using this file in isolation, you might need to mock showSweetAlert or remove the import/calls.
import {showSweetAlert} from '../Includes/SweetAlert2'; 

// Data for the compliance documents
const complianceDocuments = [
    { id: '#VER786393', title: 'CAC Registration', date: '10/03/2025', status: 'Verified', statusColor: 'bg-green-100 text-green-800' },
    { id: '#VER7860173', title: 'Tax Clearance Certificate', date: '09/03/2025', status: 'Verified', statusColor: 'bg-green-100 text-green-800' },
    { id: '#VER7860328', title: 'Business Permit', date: '08/03/2025', status: 'Pending Review', statusColor: 'bg-yellow-100 text-yellow-800' },
    { id: '#VER7860749', title: 'Insurance Policy', date: '08/03/2025', status: 'Verified', statusColor: 'bg-green-100 text-green-800' },
];

const ComplianceDocuments = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    

    // Function to open the modal and set the selected document
    const handlePreviewClick = (document) => {
        setSelectedDocument(document);
        setModalVisible(true);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedDocument(null);
    };

    // Function now uses showSweetAlert for confirmation
    const handleDownloadClick = () => {
        console.log("Downloading documents...");
        // Calling SweetAlert function
        if (typeof showSweetAlert === 'function') {
            showSweetAlert('Download initiated for all documents.', 'success');
        }
    };

    // Function now uses showSweetAlert for confirmation
    const handleRequestUpdateClick = () => {
        console.log("Requesting compliance update...");
        // Calling SweetAlert function
        if (typeof showSweetAlert === 'function') {
            showSweetAlert('Update request has been submitted.', 'success');
        }
    };

    // Modal component to display document details (Image Preview kept)
    const DocumentModal = () => {
        if (!selectedDocument) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 font-[Inter]">
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl h-5/6 relative flex flex-col">
                    <button onClick={handleCloseModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors z-10">
                        <FaTimes className="h-6 w-6" />
                    </button>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Preview: {selectedDocument.title}</h3>

                    {/* Document Details Section */}
                    <div className="flex justify-between items-center mb-4 text-sm text-gray-600 p-2 bg-gray-50 rounded">
                        <p><strong>Submission ID:</strong> {selectedDocument.id}</p>
                        <p><strong>Date:</strong> {selectedDocument.date}</p>
                        <p>
                            <strong>Status:</strong>
                            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${selectedDocument.statusColor}`}>
                                {selectedDocument.status}
                            </span>
                        </p>
                    </div>

                    {/* Mock Document Content Viewer with Placeholder Image */}
                    <div className="flex-grow border border-gray-300 rounded-lg overflow-hidden bg-white p-2">
                        <div className="h-full w-full overflow-y-auto flex justify-center items-start">
                            <img 
                                src={MOCK_DOCUMENT_IMAGE_URL} 
                                alt={`Preview of ${selectedDocument.title}`}
                                className="w-full h-auto max-w-lg object-contain border border-dashed border-gray-300 p-4" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        
            <div className="max-w-full mx-auto mt-6">
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-800">Compliance Documents Submitted</h2>
                    </div>
                    <div className="overflow-auto p-4">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-100 text-gray-600 tracking-wider">
                                <tr>
                                    <th scope="col" className="px-3 py-2 text-left font-medium">Submission ID</th>
                                    <th scope="col" className="px-3 py-2 text-left font-medium">Document Title</th>
                                    <th scope="col" className="px-3 py-2 text-left font-medium">Submission Date</th>
                                    <th scope="col" className="px-3 py-2 text-left font-medium">Status</th>
                                    <th scope="col" className="px-3 py-2 text-left font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 text-gray-600">
                                {complianceDocuments.map((doc) => (
                                    <tr key={doc.id}>
                                        <td className="px-3 py-2 whitespace-nowrap">{doc.id}</td>
                                        <td className="px-3 py-2 whitespace-nowrap">{doc.title}</td>
                                        <td className="px-3 py-2 whitespace-nowrap">{doc.date}</td>
                                        <td className="px-3 py-2 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${doc.statusColor}`}>
                                                {doc.status === 'Verified' ? (
                                                    <FaCheckCircle className="h-3 w-3 mr-1" />
                                                ) : (
                                                    <FaExclamationTriangle className="h-3 w-3 mr-1" />
                                                )}
                                                {doc.status}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap text-blue-500 hover:text-blue-700 cursor-pointer">
                                            <button onClick={() => handlePreviewClick(doc)} className="text-blue-500 hover:text-blue-700 font-medium flex items-center">
                                                <FaEye className="h-4 w-4 mr-1" />
                                                Preview Documents
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                    {/* Reverted to original gray gradient styles */}
                    <button onClick={handleDownloadClick} className="flex items-center bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black py-2 px-4 rounded text-sm">
                        <FaDownload className="h-4 w-4 mr-2" />
                        Download Documents
                    </button>
                    {/* Reverted to original gray gradient styles */}
                    <button onClick={handleRequestUpdateClick} className="flex items-center bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black py-2 px-4 rounded text-sm">
                        <FaSyncAlt className="h-4 w-4 mr-2" />
                        Request Compliance Update
                    </button>
                </div>
                
                    {modalVisible && <DocumentModal />}
            </div>
        
        
    );
};

export default ComplianceDocuments;