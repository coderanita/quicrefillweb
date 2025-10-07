import { useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { FaRegCopy, FaInfo } from 'react-icons/fa';
import { showSweetAlert } from '../Includes/SweetAlert2';


const mockUserData = [
  // Record 1 (U-10001) - Initial Pending
  {
    userId: 'U-10001',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+234 801 234 5678',
    registrationDate: '15/01/2025',
    lastLogin: '20/03/2025, 09:45 AM',
    requestDate: '25/03/2025',
    scheduledDeletionDate: '25/04/2025',
    deletionReason: 'Switching to a competitor',
    userComments: 'I no longer need this service due to high fees.',
    reviewStatus: 'Pending',
    policyRetentionMonths: 12,
    initialAdminNotes: 'User appears churned due to high fees. Recommend further investigation.',
  },
  // Record 2 (U-10002) - Initial Approved
  {
    userId: 'U-10002',
    fullName: 'Jane Smith',
    email: 'jane.smith@example.net',
    phone: '+999 555 1234',
    registrationDate: '01/02/2025',
    lastLogin: '28/03/2025, 11:30 AM',
    requestDate: '28/03/2025',
    scheduledDeletionDate: '28/04/2025',
    deletionReason: 'Privacy concerns',
    userComments: 'Please delete all my data immediately.',
    reviewStatus: 'Approved',
    policyRetentionMonths: 12,
    initialAdminNotes: 'Approved based on no outstanding issues.',
  },
  // Record 3 (U-10003) - Generated Pending
  {
    userId: 'U-10003',
    fullName: 'James Williams',
    email: 'james.williams@appservice.com',
    phone: '+1-555-1020',
    registrationDate: '24/12/2024',
    lastLogin: '20/03/2025, 09:16 AM',
    requestDate: '23/03/2025',
    scheduledDeletionDate: '21/02/2025',
    deletionReason: 'No longer using the service',
    userComments: 'Request number 3.',
    reviewStatus: 'Pending',
    policyRetentionMonths: 12,
    initialAdminNotes: 'Checked by Admin 2.',
  },
  // Record 4 (U-10004) - Generated Pending
  {
    userId: 'U-10004',
    fullName: 'Patricia Brown',
    email: 'patricia.brown@appservice.com',
    phone: '+1-555-1030',
    registrationDate: '22/12/2024',
    lastLogin: '18/03/2025, 10:19 AM',
    requestDate: '21/03/2025',
    scheduledDeletionDate: '19/02/2025',
    deletionReason: 'Too expensive',
    userComments: 'Request number 4.',
    reviewStatus: 'Pending',
    policyRetentionMonths: 12,
    initialAdminNotes: 'Checked by Admin 3.',
  },
  // Record 5 (U-10005) - Generated Pending
  {
    userId: 'U-10005',
    fullName: 'Robert Jones',
    email: 'robert.jones@appservice.com',
    phone: '+1-555-1040',
    registrationDate: '20/12/2024',
    lastLogin: '16/03/2025, 11:22 AM',
    requestDate: '19/03/2025',
    scheduledDeletionDate: '17/02/2025',
    deletionReason: 'Duplicate account',
    userComments: 'Request number 5.',
    reviewStatus: 'Pending',
    policyRetentionMonths: 12,
    initialAdminNotes: 'Checked by Admin 4.',
  },
  // Record 6 (U-10006) - Generated Pending
  {
    userId: 'U-10006',
    fullName: 'Jennifer Garcia',
    email: 'jennifer.garcia@appservice.com',
    phone: '+1-555-1050',
    registrationDate: '18/12/2024',
    lastLogin: '14/03/2025, 09:25 AM',
    requestDate: '17/03/2025',
    scheduledDeletionDate: '15/02/2025',
    deletionReason: 'Poor customer service',
    userComments: 'Request number 6.',
    reviewStatus: 'Pending',
    policyRetentionMonths: 12,
    initialAdminNotes: 'Checked by Admin 5.',
  },
  // Record 7 (U-10007) - Generated Pending
  {
    userId: 'U-10007',
    fullName: 'Michael Miller',
    email: 'michael.miller@appservice.com',
    phone: '+1-555-1060',
    registrationDate: '16/12/2024',
    lastLogin: '12/03/2025, 10:28 AM',
    requestDate: '15/03/2025',
    scheduledDeletionDate: '13/02/2025',
    deletionReason: 'Switching to a competitor',
    userComments: 'Request number 7.',
    reviewStatus: 'Pending',
    policyRetentionMonths: 12,
    initialAdminNotes: 'Checked by Admin 6.',
  },
  // Record 8 (U-10008) - Generated Pending
  {
    userId: 'U-10008',
    fullName: 'Linda Davis',
    email: 'linda.davis@appservice.com',
    phone: '+1-555-1070',
    registrationDate: '14/12/2024',
    lastLogin: '10/03/2025, 11:31 AM',
    requestDate: '13/03/2025',
    scheduledDeletionDate: '11/02/2025',
    deletionReason: 'Privacy concerns',
    userComments: 'Request number 8.',
    reviewStatus: 'Pending',
    policyRetentionMonths: 12,
    initialAdminNotes: 'Checked by Admin 7.',
  },
  // Record 9 (U-10009) - Generated Approved
  {
    userId: 'U-10009',
    fullName: 'William Rodriguez',
    email: 'william.rodriguez@appservice.com',
    phone: '+1-555-1080',
    registrationDate: '12/12/2024',
    lastLogin: '08/03/2025, 09:34 AM',
    requestDate: '11/03/2025',
    scheduledDeletionDate: '09/02/2025',
    deletionReason: 'No longer using the service',
    userComments: 'Data usage is low. Approved.',
    reviewStatus: 'Approved',
    policyRetentionMonths: 12,
    initialAdminNotes: 'Quick approval: Low risk.',
  },
  // Record 10 (U-10010) - Generated Approved
  {
    userId: 'U-10010',
    fullName: 'Elizabeth Martinez',
    email: 'elizabeth.martinez@appservice.com',
    phone: '+1-555-1090',
    registrationDate: '10/12/2024',
    lastLogin: '06/03/2025, 10:37 AM',
    requestDate: '09/03/2025',
    scheduledDeletionDate: '07/02/2025',
    deletionReason: 'Too expensive',
    userComments: 'Data usage is low. Approved.',
    reviewStatus: 'Approved',
    policyRetentionMonths: 12,
    initialAdminNotes: 'Quick approval: Low risk.',
  },
  // Record 11 (U-10011) - Generated Approved
  {
    userId: 'U-10011',
    fullName: 'Richard Hernandez',
    email: 'richard.hernandez@appservice.com',
    phone: '+1-555-1100',
    registrationDate: '08/12/2024',
    lastLogin: '04/03/2025, 11:40 AM',
    requestDate: '07/03/2025',
    scheduledDeletionDate: '05/02/2025',
    deletionReason: 'Duplicate account',
    userComments: 'Data usage is low. Approved.',
    reviewStatus: 'Approved',
    policyRetentionMonths: 12,
    initialAdminNotes: 'Quick approval: Low risk.',
  },
  // Record 12 (U-10012) - Generated Approved
  {
    userId: 'U-10012',
    fullName: 'Barbara Lopez',
    email: 'barbara.lopez@appservice.com',
    phone: '+1-555-1110',
    registrationDate: '06/12/2024',
    lastLogin: '02/03/2025, 09:43 AM',
    requestDate: '05/03/2025',
    scheduledDeletionDate: '03/02/2025',
    deletionReason: 'Poor customer service',
    userComments: 'Data usage is low. Approved.',
    reviewStatus: 'Approved',
    policyRetentionMonths: 12,
    initialAdminNotes: 'Quick approval: Low risk.',
  },
  // Record 13 (U-10013) - Generated Approved
  {
    userId: 'U-10013',
    fullName: 'Joseph Gonzalez',
    email: 'joseph.gonzalez@appservice.com',
    phone: '+1-555-1120',
    registrationDate: '04/12/2024',
    lastLogin: '28/02/2025, 10:46 AM',
    requestDate: '03/03/2025',
    scheduledDeletionDate: '01/02/2025',
    deletionReason: 'Switching to a competitor',
    userComments: 'Data usage is low. Approved.',
    reviewStatus: 'Approved',
    policyRetentionMonths: 12,
    initialAdminNotes: 'Quick approval: Low risk.',
  },
  // Record 14 (U-10014) - Generated Approved
  {
    userId: 'U-10014',
    fullName: 'Susan Wilson',
    email: 'susan.wilson@appservice.com',
    phone: '+1-555-1130',
    registrationDate: '02/12/2024',
    lastLogin: '26/02/2025, 11:49 AM',
    requestDate: '01/03/2025',
    scheduledDeletionDate: '30/01/2025',
    deletionReason: 'Privacy concerns',
    userComments: 'Data usage is low. Approved.',
    reviewStatus: 'Approved',
    policyRetentionMonths: 12,
    initialAdminNotes: 'Quick approval: Low risk.',
  },
  // Record 15 (U-10015) - Generated Approved
  {
    userId: 'U-10015',
    fullName: 'Thomas Anderson',
    email: 'thomas.anderson@appservice.com',
    phone: '+1-555-1140',
    registrationDate: '30/11/2024',
    lastLogin: '24/02/2025, 09:52 AM',
    requestDate: '27/02/2025',
    scheduledDeletionDate: '28/01/2025',
    deletionReason: 'No longer using the service',
    userComments: 'Data usage is low. Approved.',
    reviewStatus: 'Approved',
    policyRetentionMonths: 12,
    initialAdminNotes: 'Quick approval: Low risk.',
  },
  // Record 16 (U-10016) - Generated Approved
  {
    userId: 'U-10016',
    fullName: 'Jessica Thomas',
    email: 'jessica.thomas@appservice.com',
    phone: '+1-555-1150',
    registrationDate: '28/11/2024',
    lastLogin: '22/02/2025, 10:55 AM',
    requestDate: '25/02/2025',
    scheduledDeletionDate: '26/01/2025',
    deletionReason: 'Too expensive',
    userComments: 'Data usage is low. Approved.',
    reviewStatus: 'Approved',
    policyRetentionMonths: 12,
    initialAdminNotes: 'Quick approval: Low risk.',
  },
  // Record 17 (U-10017) - Generated Rejected
  {
    userId: 'U-10017',
    fullName: 'Charles Taylor',
    email: 'charles.taylor@appservice.com',
    phone: '+1-555-1160',
    registrationDate: '26/11/2024',
    lastLogin: '20/02/2025, 11:58 AM',
    requestDate: '23/02/2025',
    scheduledDeletionDate: '24/01/2025',
    deletionReason: 'Duplicate account',
    userComments: 'User has pending payments.',
    reviewStatus: 'Rejected',
    policyRetentionMonths: 12,
    initialAdminNotes: 'Rejected: Financial hold.',
  },
  // Record 18 (U-10018) - Generated Rejected
  {
    userId: 'U-10018',
    fullName: 'Sarah Moore',
    email: 'sarah.moore@appservice.com',
    phone: '+1-555-1170',
    registrationDate: '24/11/2024',
    lastLogin: '18/02/2025, 09:01 AM',
    requestDate: '21/02/2025',
    scheduledDeletionDate: '22/01/2025',
    deletionReason: 'Poor customer service',
    userComments: 'User has pending payments.',
    reviewStatus: 'Rejected',
    policyRetentionMonths: 12,
    initialAdminNotes: 'Rejected: Financial hold.',
  },
  // Record 19 (U-10019) - Generated Rejected
  {
    userId: 'U-10019',
    fullName: 'Christopher Jackson',
    email: 'christopher.jackson@appservice.com',
    phone: '+1-555-1180',
    registrationDate: '22/11/2024',
    lastLogin: '16/02/2025, 10:04 AM',
    requestDate: '19/02/2025',
    scheduledDeletionDate: '20/01/2025',
    deletionReason: 'Switching to a competitor',
    userComments: 'User has pending payments.',
    reviewStatus: 'Rejected',
    policyRetentionMonths: 12,
    initialAdminNotes: 'Rejected: Financial hold.',
  },
  // Record 20 (U-10020) - Generated Rejected
  {
    userId: 'U-10020',
    fullName: 'Karen Martin',
    email: 'karen.martin@appservice.com',
    phone: '+1-555-1190',
    registrationDate: '20/11/2024',
    lastLogin: '14/02/2025, 11:07 AM',
    requestDate: '17/02/2025',
    scheduledDeletionDate: '18/01/2025',
    deletionReason: 'Privacy concerns',
    userComments: 'User has pending payments.',
    reviewStatus: 'Rejected',
    policyRetentionMonths: 12,
    initialAdminNotes: 'Rejected: Financial hold.',
  },
  // Record 21 (U-10021) - Generated Rejected
  {
    userId: 'U-10021',
    fullName: 'Daniel Lee',
    email: 'daniel.lee@appservice.com',
    phone: '+1-555-1200',
    registrationDate: '18/11/2024',
    lastLogin: '12/02/2025, 09:10 AM',
    requestDate: '15/02/2025',
    scheduledDeletionDate: '16/01/2025',
    deletionReason: 'No longer using the service',
    userComments: 'User has pending payments.',
    reviewStatus: 'Rejected',
    policyRetentionMonths: 12,
    initialAdminNotes: 'Rejected: Financial hold.',
  },
  // Record 22 (U-10022) - Generated Rejected
  {
    userId: 'U-10022',
    fullName: 'Nancy Perez',
    email: 'nancy.perez@appservice.com',
    phone: '+1-555-1210',
    registrationDate: '16/11/2024',
    lastLogin: '10/02/2025, 10:13 AM',
    requestDate: '13/02/2025',
    scheduledDeletionDate: '14/01/2025',
    deletionReason: 'Too expensive',
    userComments: 'User has pending payments.',
    reviewStatus: 'Rejected',
    policyRetentionMonths: 12,
    initialAdminNotes: 'Rejected: Financial hold.',
  },
  // Record 23 (U-10023) - Generated Under Review
  {
    userId: 'U-10023',
    fullName: 'Matthew Thompson',
    email: 'matthew.thompson@appservice.com',
    phone: '+1-555-1220',
    registrationDate: '14/11/2024',
    lastLogin: '08/02/2025, 11:16 AM',
    requestDate: '11/02/2025',
    scheduledDeletionDate: '12/01/2025',
    deletionReason: 'Duplicate account',
    userComments: 'High lifetime value. Reviewing retention options.',
    reviewStatus: 'Under Review',
    policyRetentionMonths: 12,
    initialAdminNotes: 'Reviewing: Potential retention case.',
  },
  // Record 24 (U-10024) - Generated Under Review
  {
    userId: 'U-10024',
    fullName: 'Lisa White',
    email: 'lisa.white@appservice.com',
    phone: '+1-555-1230',
    registrationDate: '12/11/2024',
    lastLogin: '06/02/2025, 09:19 AM',
    requestDate: '09/02/2025',
    scheduledDeletionDate: '10/01/2025',
    deletionReason: 'Poor customer service',
    userComments: 'High lifetime value. Reviewing retention options.',
    reviewStatus: 'Under Review',
    policyRetentionMonths: 12,
    initialAdminNotes: 'Reviewing: Potential retention case.',
  },
  // Record 25 (U-10025) - Generated Under Review
  {
    userId: 'U-10025',
    fullName: 'Anthony Harris',
    email: 'anthony.harris@appservice.com',
    phone: '+1-555-1240',
    registrationDate: '10/11/2024',
    lastLogin: '04/02/2025, 10:22 AM',
    requestDate: '07/02/2025',
    scheduledDeletionDate: '08/01/2025',
    deletionReason: 'Switching to a competitor',
    userComments: 'High lifetime value. Reviewing retention options.',
    reviewStatus: 'Under Review',
    policyRetentionMonths: 12,
    initialAdminNotes: 'Reviewing: Potential retention case.',
  },
];

// --- Helper Components (Kept simple and reusable) ---

const DetailTableSection = ({ title, rows }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 md:w-7/12">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      <button className="text-gray-500 hover:text-gray-700 transition duration-150">
        <FaRegCopy className="h-5 w-5" />
      </button>
    </div>
    
    <div className="overflow-x-auto p-4">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left px-4 py-2 font-medium text-gray-600">Field</th>
            <th className="text-left px-4 py-2 font-medium text-gray-600">Value</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="px-4 py-2 text-gray-500">{row.label}:</td>
              <td className="px-4 py-2 font-medium text-gray-800">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const PolicyInfoCard = ({ retentionMonths }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 flex items-start space-x-4">
    <div className="flex-shrink-0 p-1 rounded-full border border-orange-500 bg-orange-50 text-orange-500 flex items-center justify-center">
      <FaInfo className="h-2 w-2" /> 
    </div>
    <div>
      <p className="text-sm text-gray-700">
        In compliance with our policies, all user data is retained for up to **{retentionMonths} months** before permanent deletion. This request will remain in our system for review during this period.
      </p>
    </div>
  </div>
);

// -------------------------------------------------------------------
// 3. MAIN COMPONENT (Gets ID from useParams)
// -------------------------------------------------------------------

export const AccountDeletionDetailView = () => {
  
  
  const { id } = useParams();
  const userData = mockUserData.find(user => user.userId === id);
  
  // 3. State for editable Admin Notes
  const [adminNotes, setAdminNotes] = useState(userData?.initialAdminNotes || '');

  // 4. Handle cases where the user ID is invalid or not found
  if (!userData) {
    return (
      <div className="p-10 text-center bg-white shadow-lg m-6 rounded-lg">
        <h2 className="text-xl font-semibold text-red-600">User ID "{userId}" Not Found</h2>
        <p className="text-gray-600 mt-2">Check your route configuration or the mock data array.</p>
      </div>
    );
  }
  
  // --- Data preparation ---
  const userInfoRows = [
    { label: "User ID", value: userData.userId },
    { label: "Full Name", value: userData.fullName },
    { label: "Email Address", value: userData.email },
    { label: "Phone Number", value: userData.phone },
    { label: "Registration Date", value: userData.registrationDate },
    { label: "Last Login", value: userData.lastLogin },
  ];
  
  const deletionRequestRows = [
    { label: "Request Date", value: userData.requestDate },
    { label: "Scheduled Deletion Date", value: `${userData.scheduledDeletionDate} (Based on the retention policy)` },
    { label: "Reason for Deletion", value: `"${userData.deletionReason}" (if provided)` },
    { label: "Additional User Comments", value: `"${userData.userComments}"` },
    { 
      label: "Review Status", 
      value: <span className="font-medium text-yellow-500">{userData.reviewStatus}</span> 
    },
  ];

  // Placeholder button actions
  const handleApprove = () => showSweetAlert(`Approving deletion for User ID: ${userData.userId}`,'success');
  const handleReject = () => showSweetAlert(`Rejecting deletion for User ID: ${userData.userId}`,'info');

  return (
    <div className="p-6 bg-gray-50">
      
      {/* 1. User Information & Policy Section */}
      <div className="flex flex-col md:flex-row gap-6">
        <DetailTableSection
          title="User Information Section"
          rows={userInfoRows}
        />
        
        <div className="md:w-5/12 space-y-4">
          <PolicyInfoCard retentionMonths={userData.policyRetentionMonths} />
        </div>
      </div>

      <div className="my-6 border-t border-gray-200" />
      
      {/* 2. Deletion Request Details Section */}
      <div className="flex flex-col md:flex-row gap-6">
        <DetailTableSection
          title="Deletion Request Details Section"
          rows={deletionRequestRows}
        />
        
        <div className="md:w-5/12 space-y-4">
          {/* Placeholder */}
        </div>
      </div>
      
      <div className="my-6 border-t border-gray-200" />

      {/* 3. Admin Actions Section */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-white rounded-lg shadow-sm p-4 md:w-7/12">
          <div className="mb-4">
            <label htmlFor="adminNotes" className="block text-sm font-medium text-gray-700">Admin Notes:</label>
            <div className="mt-1">
              <textarea
                id="adminNotes"
                rows="3"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                placeholder="Add notes here..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              className="w-1/2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-150"
              onClick={handleApprove}
            >
              Approve Deletion
            </button>
            <button
              className="w-1/2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition duration-150"
              onClick={handleReject}
            >
              Reject Deletion
            </button>
          </div>
        </div>

        <div className="md:w-5/12 space-y-4">
          {/* Placeholder */}
        </div>
      </div>
    </div>
  );
};

export default AccountDeletionDetailView;