
const ticketData = [
  {
    id: 1,
    title: 'Total Feedback Tickets',
    value: 100
  },
  {
    id: 2,
    title: 'Open Tickets',
    value: 40
  },
  {
    id: 3,
    title: 'Resolved Tickets',
    value: 60
  },
  {
    id: 4,
    title: 'Avg. Resolution Time',
    value: '2 - 5 days'
  },
];

const FeedbackTicketSummary = () => {
  
  // Internal Card Component for reuse within this single file
  const SummaryCard = ({ title, value }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 flex-1 min-w-[200px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">{title}</span>
          {/* Assumes Font Awesome or similar icon library is linked */}
          <i className="fas fa-info-circle text-gray-400 text-xs"></i>
        </div>
        <span className="text-2xl font-bold text-gray-800 block">{value}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {ticketData.map((data) => (
        <SummaryCard
          key={data.id}
          title={data.title}
          value={data.value}
        />
      ))}
    </div>
  );
};

export default FeedbackTicketSummary;