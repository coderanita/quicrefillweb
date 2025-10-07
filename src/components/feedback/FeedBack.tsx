import { useState } from 'react';
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import ReusableTable from "../Includes/ReusableTable";
import { useNavigate } from 'react-router-dom';
import { confirmDelete } from '../Includes/SweetAlert2';
import { FaTrash } from "react-icons/fa";
import FeedbackTicketSummary from './FeedbackTicketSummary';

export const Feedback = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  // Table data
  const FeedbackData = [
    {
      ticketId: "TCK1001",
      customerName: "John Doe",
      issueType: "Delivery",
      status: "Resolved",
      priority: "High",
      dateCreated: "25/01/27 10:15 AM",
    },
    {
      ticketId: "TCK1002",
      customerName: "Oluwasegun Kingsley",
      issueType: "Delivery",
      status: "Resolved",
      priority: "High",
      dateCreated: "25/01/27 10:15 AM",
    },
    {
      ticketId: "TCK1003",
      customerName: "Jessica Alfred",
      issueType: "Payment",
      status: "Open",
      priority: "Low",
      dateCreated: "25/01/27 10:15 AM",
    },
    {
      ticketId: "TCK1004",
      customerName: "Chisom Kalu",
      issueType: "Service",
      status: "Open",
      priority: "Medium",
      dateCreated: "25/01/27 10:15 AM",
    },
    {
      ticketId: "TCK1005",
      customerName: "Benson Chukwu",
      issueType: "Payment",
      status: "In progress",
      priority: "Low",
      dateCreated: "25/01/27 10:15 AM",
    },
    {
      ticketId: "TCK1006",
      customerName: "Chisom Kalu",
      issueType: "Service",
      status: "Open",
      priority: "Medium",
      dateCreated: "25/01/27 10:15 AM",
    },
    {
      ticketId: "TCK1007",
      customerName: "Oluwasegun Kingsley",
      issueType: "Delivery",
      status: "Resolved",
      priority: "High",
      dateCreated: "25/01/27 10:15 AM",
    },
    {
      ticketId: "TCK1008",
      customerName: "Benson Chukwu",
      issueType: "Payment",
      status: "In progress",
      priority: "Low",
      dateCreated: "25/01/27 10:15 AM",
    },
    {
      ticketId: "TCK1009",
      customerName: "Chisom Kalu",
      issueType: "Service",
      status: "Open",
      priority: "Medium",
      dateCreated: "25/01/27 10:15 AM",
    },
  ];


  // Function to get the color class for the Status cell
  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "text-green-500";
      case "Open":
        return "text-yellow-500";
      case "In progress":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  // Function to get the color class for the Priority cell
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-500";
      case "Medium":
        return "text-orange-500";
      case "Low":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  const FeedbackColumns = [
    { header: "Ticket ID", accessor: "ticketId" },
    { header: "Customer Name", accessor: "customerName" },
    { header: "Issue Type", accessor: "issueType" },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        // The inline-block classes replicate the styling of the original HTML
        <span className={`inline-block px-2 py-1 ${getStatusColor(row.status)} font-semibold text-xs`}>
          {row.status}
        </span>
      ),
    },
    {
      header: "Priority",
      accessor: "priority",
      render: (row) => (
        // The inline-block classes replicate the styling of the original HTML
        <span className={`inline-block px-2 py-1 ${getPriorityColor(row.priority)} font-semibold text-xs`}>
          {row.priority}
        </span>
      ),
    },
    { header: "Date Created", accessor: "dateCreated" },
    {
      header: "Action",
      accessor: "actions",
      render: (row) => (
        <div className="flex items-center space-x-2">
          {/* Assumes a Font Awesome icon or similar for the trash icon */}
          <button
            className="mr-2 text-red-500 hover:text-red-700"
            // Replace with your actual delete logic
            onClick={() => confirmDelete(setFeedbackTickets, 'ticketId', row.ticketId,"FeedBack")}
          >
            {/* Using a placeholder for FaTrash since the full component isn't provided */}
            <FaTrash />
          </button>
          <a href={`/feedback-view/${row.ticketId}`} className="text-blue-500 hover:underline">
            View Details
          </a>
        </div>
      ),
    },
  ];

  const [feedbackTickets, setFeedbackTickets] = useState(FeedbackData);





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
              title="Feedback"
              breadcrumbs={[]}
              showExportButton={false}
              filterCategories={[{ name: 'Order Status', options: ['Completed', 'In Progress', 'Disputed', 'Canceled'] },
              { name: 'Payment Type', options: ['Wallet', 'On delivery', 'Transfer', 'Flatterwave'] },
              { name: 'Service Type', options: ['Diesel', 'Electricity', 'Gas Refill', 'Petroleum', 'Accessories'] },]}
              onDateChange={() => { }}
              onFilterChange={() => { }}
              onExportClick={() => { }}
              showSearchBox={true}

            />


          </div>

          <FeedbackTicketSummary />

          <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 ">
            <ReusableTable
              title="Feedback Tickets" // Added a title for context
              columns={FeedbackColumns}
              data={feedbackTickets} // Use the new state variable for feedback data
              rowsPerPage={8}
              showPagination={true}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

