import { useState, useEffect } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCopy } from "react-icons/fa";
import { showSweetAlert } from '../Includes/SweetAlert2';
import {users} from '../../MockData/WithdrawalData';
// Mock local array of users




export const AccountNumberSubmissionDetails = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any>(null);
  const [comment, setComment] = useState("");

  // Fetch user and redirect if not found
  useEffect(() => {
    const foundUser = users.find((u) => u.id === id);
    if (!foundUser) {
      navigate('/withdrawal-management-account-no-submission');
    } else {
      setUser(foundUser);
    }
  }, [id, navigate]);

  // Guard rendering until user is loaded
  if (!user) return null;

  // Handle adding/updating admin note
  const handleCommentSubmit = () => {
    if (!comment.trim()) return;

    setUser((prev: any) => ({
      ...prev,
      adminNotes: comment,
    }));

    // Update local array as well
    const userIndex = users.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex].adminNotes = comment;
    }

    showSweetAlert("Comment added successfully", "success");
    setComment("");
  };

  // Handle status change
  const handleStatusChange = (newStatus: string) => {
    setUser((prev: any) => ({
      ...prev,
      status: newStatus,
    }));

    // Update local array
    const userIndex = users.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex].status = newStatus;
    }

    showSweetAlert(`Status changed to ${newStatus}`, "success");
  };

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
            title="Account Number Submission Requests Details"
            filterTitle='Service Type'
            breadcrumbs={[
              { label: "Withdrawal Management", href: "/withdrawal-management" },
              { label: "Account Number Submission Requests", href: "/withdrawal-management-account-no-submission" },
              { label: "Requests Details" },
              { label: "" + id }
            ]}
            showExportButton={false}
            filterCategories={[]}
            onDateChange={() => { }}
            onFilterChange={() => { }}
            onExportClick={() => { }}
            showSearchBox={false}
            showDateSelector={false}
            showBackButton={true}
            onBackClick={() => { navigate('/withdrawal-management-account-no-submission') }}
          />

          {/* User Details Card */}
          <div className="max-w-xl bg-white rounded-xl shadow-md p-6 space-y-4 mt-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{user.id}</h2>
              <button className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-xl hover:shadow-md">
                <FaCopy className="text-gray-800" />
              </button>
            </div>

            {/* Table */}
            <div>
              <table className="w-full text-sm border-separate border-spacing-0">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left text-gray-500 font-semibold border-b border-gray-200 py-3 px-4 rounded-tl-md">Field</th>
                    <th className="text-left text-gray-500 font-semibold border-b border-gray-200 py-3 px-4 rounded-tr-md">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="border-b border-gray-200 py-3 px-4 text-[#576079]">User Name</td>
                    <td className="border-b border-gray-200 py-3 px-4 font-semibold">{user.userName}</td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-200 py-3 px-4 text-[#576079]">User Type</td>
                    <td className="border-b border-gray-200 py-3 px-4">{user.userType}</td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-200 py-3 px-4 text-[#576079]">Business Name</td>
                    <td className="border-b border-gray-200 py-3 px-4">{user.businessName}</td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-200 py-3 px-4 text-[#576079]">Bank Name</td>
                    <td className="border-b border-gray-200 py-3 px-4">{user.bankName}</td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-200 py-3 px-4 text-[#576079]">Account Number</td>
                    <td className="border-b border-gray-200 py-3 px-4 font-semibold">{user.accountNumber}</td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-200 py-3 px-4 text-[#576079]">Account Holder Name</td>
                    <td className="border-b border-gray-200 py-3 px-4">{user.accountHolderName}</td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-200 py-3 px-4 text-[#576079]">BVN (Bank Verification Number)</td>
                    <td className="border-b border-gray-200 py-3 px-4">{user.bvn}</td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-200 py-3 px-4 text-[#576079]">Date Submitted</td>
                    <td className="border-b border-gray-200 py-3 px-4">{user.dateSubmitted}</td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-200 py-3 px-4 text-[#576079]">Previous Transactions Linked to Account?</td>
                    <td className="border-b border-gray-200 py-3 px-4">{user.previousTransactions}</td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-200 py-3 px-4 text-[#576079]">Auto-Verification Status</td>
                    <td className="border-b border-gray-200 py-3 px-4 text-green-600 font-medium">{user.autoVerificationStatus}</td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-200 py-3 px-4 text-[#576079]">Admin Notes</td>
                    <td className="border-b border-gray-200 py-3 px-4 text-gray-500">{user.adminNotes || "(No notes yet)"}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-[#576079]">Status</td>
                    <td className={`py-3 px-4 font-medium text-xs ${
                      user.status === "Approved"
                        ? "text-green-600"
                        : user.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-500"
                    }`}>
                      {user.status}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => handleStatusChange('Approved')}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-xs py-2.5 px-2 rounded"
              >
                Approve
              </button>

              <button
                onClick={() => handleStatusChange('Rejected')}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium text-xs py-2.5 px-2 rounded"
              >
                Reject
              </button>

              <button
                className="w-full bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black border border-gray-300 text-xs py-2.5 px-2 rounded flex items-center justify-center gap-1"
              >
                <i className="fa fa-info-circle text-gray-600 text-xs"></i> Request More Info
              </button>
            </div>
          </div>

          {/* Admin Notes Card */}
          <div className="max-w-xl mt-6 bg-white rounded-xl shadow-md p-6 space-y-2">
            <label className="block text-gray-700 text-sm font-medium">Add / Update Admin Notes:</label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
            />
            <button
              onClick={handleCommentSubmit}
              className="bg-gray-200 hover:bg-gray-300 text-black font-medium text-xs py-2 px-4 rounded"
            >
              Submit Comment
            </button>
          </div>

        </main>
      </div>
    </div>
  );
};
