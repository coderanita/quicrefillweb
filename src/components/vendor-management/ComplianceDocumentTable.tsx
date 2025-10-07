import React, { useState } from 'react';
import { 
    FaCheckCircle, 
    FaTimesCircle, 
    FaEye, 
    FaDownload, 
    FaPlus, 
    FaExclamationTriangle,
    FaWindowClose // Icon for closing the modal
} from 'react-icons/fa';
import {showSweetAlert}  from  "../Includes/SweetAlert2";



// --- MOCK DATA FOR DOCUMENTS ---
const VENDOR_COMPLIANCE_DOCS = [
    {
        id: '#VER786393',
        title: 'Business Registration Certificate',
        submitted: true,
        downloadLink: '/docs/bus-reg-786393.pdf'
    },
    {
        id: '#VER7860173',
        title: 'Tax Identification Number (TIN)',
        submitted: true,
        downloadLink: '/docs/tin-7860173.pdf'
    },
    {
        id: '#VER7860328',
        title: 'NIN Verification',
        submitted: true,
        downloadLink: '/docs/nin-7860328.pdf'
    },
    {
        id: '#VER7860749',
        title: 'CAC Registration',
        submitted: false, // MISSING DOCUMENT
        downloadLink: null
    },
    {
        id: '#VER7860981',
        title: 'Proof of Address',
        submitted: true,
        downloadLink: '/docs/poa-7860981.pdf'
    },
    {
        id: '#VER7861102',
        title: 'Safety Certification',
        submitted: false, // MISSING DOCUMENT
        downloadLink: null
    },
];

const MISSING_DOCS = VENDOR_COMPLIANCE_DOCS
    .filter(doc => !doc.submitted)
    .map(doc => doc.title)
    .join(', ');

// --- Document Preview Modal Component ---
const DocumentPreviewModal = ({ docTitle, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-full max-h-[90vh] overflow-hidden flex flex-col">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-bold text-gray-800">Preview: {docTitle}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-600">
                        <FaWindowClose size={24} />
                    </button>
                </div>
                
                {/* Document Content (Static Image) */}
                <div className="flex-grow overflow-y-auto p-4 bg-gray-100 flex items-center justify-center">
                    <img 
                        src="/images/item.png" 
                        alt={`Preview of ${docTitle}`} 
                        className="max-w-full max-h-full object-contain border border-gray-300 shadow-md"
                    />
                </div>
                
                {/* Modal Footer */}
                <div className="p-3 border-t flex justify-end">
                
                </div>

            </div>
        </div>
    );
};


// --- Document Row Component ---
const DocumentRow = ({ doc, onPreview }) => {
    const statusIcon = doc.submitted 
        ? <FaCheckCircle className="text-green-500 mr-1" />
        : <FaTimesCircle className="text-red-500 mr-1" />;

    const statusText = doc.submitted ? 'Yes' : 'No';

    return (
        <tr>
            <td className="px-3 py-2 whitespace-nowrap">
                <a href={doc.downloadLink || '#'} className="text-blue-500 hover:underline">{doc.id}</a>
            </td>
            <td className="px-3 py-2 whitespace-nowrap">{doc.title}</td>
            <td className="px-3 py-2 whitespace-nowrap flex items-center">
                {statusIcon} {statusText}
            </td>
            <td
                className={`px-3 py-2 whitespace-nowrap ${doc.submitted ? 'text-blue-500 hover:text-blue-700 cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`}
                onClick={doc.submitted ? () => onPreview(doc) : undefined}
                title={doc.submitted ? 'Preview Document' : 'Document not submitted'}
            >
                <FaEye className="inline mr-1" />
                Preview Documents
            </td>
        </tr>
    );
};


// --- Main Component ---
const ComplianceDocumentTable = ({ vendorId = 'VND-001' }) => {
    const [previewDoc, setPreviewDoc] = useState(null); // Holds the document object to preview

    const handlePreview = (doc) => {
        setPreviewDoc(doc);
    };

    const handleDownloadAll = () => {
        showSweetAlert(`Initiating download for all submitted documents for ${vendorId}`, 'success');
    };

    const handleRequestAdditional = () => {
        showSweetAlert(`Opening modal to request additional documents from ${vendorId}`, 'info');
    };

    return (
        <>
            <div className="max-w-7xl mx-auto mt-6">
                
                {/* Table Card */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-800">Compliance Documents Submitted</h2>
                    </div>
                    
                    {/* Table Section */}
                    <div className="overflow-x-auto p-4">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-100 text-gray-600 tracking-wider">
                                <tr>
                                    <th scope="col" className="px-3 py-2 text-left font-medium">Submission ID</th>
                                    <th scope="col" className="px-3 py-2 text-left font-medium">Document Title</th>
                                    <th scope="col" className="px-3 py-2 text-left font-medium">Submitted</th>
                                    <th scope="col" className="px-3 py-2 text-left font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 text-gray-600">
                                {VENDOR_COMPLIANCE_DOCS.map(doc => (
                                    <DocumentRow key={doc.id} doc={doc} onPreview={handlePreview} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Footer/Warning */}
                    {MISSING_DOCS && (
                        <div className="p-4 text-sm rounded-b-lg border-t border-yellow-200 bg-yellow-50 text-yellow-800">
                            <FaExclamationTriangle className="inline mr-2" />
                            Missing Documents: <span className="font-semibold">{MISSING_DOCS}</span>
                        </div>
                    )}
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <button
                        onClick={handleDownloadAll}
                        className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black py-2 px-4 rounded text-sm flex items-center"
                    >
                        <FaDownload className="mr-2" />
                        Download Documents
                    </button>
                    <button
                        onClick={handleRequestAdditional}
                        className="bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black py-2 px-4 rounded text-sm flex items-center"
                    >
                        <FaPlus className="mr-2" />
                        Request Additional Compliance Documents
                    </button>
                </div>
            </div>

            {/* Conditional Modal Rendering */}
            {previewDoc && (
                <DocumentPreviewModal
                    docTitle={previewDoc.title}
                    onClose={() => setPreviewDoc(null)}
                />
            )}
        </>
    );
};

export default ComplianceDocumentTable;