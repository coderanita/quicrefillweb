import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const DataTableWrapper = ({
  tabs = [],
  actionsByTab = {},
  columns = [],
  tableData = [],
  totalEntries = 0,
  rowsPerPage = 10,
  activeTab, // Now received as a prop
  onTabChange, // Now received as a prop
  setFilteredData,
  globalActions = []
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset currentPage to 1 whenever the activeTab or tableData changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, tableData]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = tableData.slice(startIndex, startIndex + rowsPerPage);
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const navigate = useNavigate();
  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        {/* Tabs on the left (conditionally rendered) */}
        <div className="w-full md:w-auto">
          {tabs.length > 0 && (
            <nav className="border-b border-gray-200 -mb-px flex space-x-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => onTabChange(tab)}
                  className={`whitespace-nowrap py-3 px-1 border-b-2 text-sm ${activeTab === tab
                      ? 'border-orange-500 text-orange-500 font-semibold'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          )}
        </div>

        {/* Actions on the right (tab-specific + global) */}
        <div className="flex space-x-2 justify-end w-full md:w-auto">
          {[...(actionsByTab[activeTab] || []), ...globalActions].map((action, index) => (
            <button
              key={`action-${index}`}
              onClick={() => {
                if (action.onClick) {
                  action.onClick(); 
                } else if (action.route) {
                  navigate(action.route); 
                }
              }}
              className="bg-yellow-400 text-sm text-black rounded-lg px-3 py-2 font-semibold hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 mb-2"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>


      {/* Table */}
      <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 mb-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-left text-gray-600 text-sm">
                {columns.map((col, index) => (
                  <th key={index} className="p-3">{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t text-gray-700 hover:bg-gray-100 text-sm">
                  {columns.map((col, colIndex) => {
                    const value = row[col.key];

                    if (col.render) {
                      return (
                        <td key={colIndex} className="p-3">
                          {col.render(value, row, setFilteredData)}
                        </td>
                      );
                    }

                    return <td key={colIndex} className="p-3">{value}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 p-4 border-t">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Total entries: <span className="font-bold">{totalEntries}</span>
            </span>
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-3 py-1 flex items-center space-x-1 text-sm ${currentPage === 1 ? 'text-gray-400' : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <i className="fa fa-chevron-left text-xs"></i> <span>Previous</span>
            </button>
          </div>
          <div className="flex items-center space-x-1">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 text-sm rounded-full ${currentPage === i + 1
                    ? 'bg-yellow-500 text-white font-bold'
                    : 'text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 flex items-center space-x-1 text-sm ${currentPage === totalPages ? 'text-gray-400' : 'text-gray-600 hover:text-gray-800'
              }`}
          >
            <span>Next</span> <i className="fa fa-chevron-right text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTableWrapper;