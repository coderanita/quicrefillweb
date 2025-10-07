import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Column {
  header: string;
  accessor: string;
  render?: (row: any) => React.ReactNode;
}

interface ReusableTableProps {
  title: string;
  icon?: React.ReactNode;
  columns: Column[];
  data: any[];
  rowsPerPage?: number;
  showPagination?: boolean;
}

const ReusableTable: React.FC<ReusableTableProps> = ({
  title,
  icon,
  columns,
  data,
  rowsPerPage = 5,
  showPagination = true,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = showPagination
    ? data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    : data;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        {icon && <div className="mr-2">{icon}</div>}
        <span className="text-gray-600 font-medium">{title}</span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200 text-left text-gray-600 text-sm">
            <tr className="text-left text-xs">
              {columns.map((col, idx) => (
                <th key={idx} className="p-3 font-medium">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-xs">
            {paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-gray-100">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="p-3 text-gray-800">
                    {typeof col.render === 'function'
                      ? col.render(row)
                      : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPagination && (
        <div className="flex justify-between items-center mt-4 p-4 border-t">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              Total entries: <span className="font-bold">{data.length}</span>
            </span>
            <button
              className="px-3 py-1 text-gray-400 flex items-center space-x-1 disabled:opacity-50"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaChevronLeft /> <span>Previous</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1 rounded-full ${
                  currentPage === i + 1
                    ? 'bg-yellow-500 text-white font-bold'
                    : 'text-gray-700'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            className="px-3 py-1 text-gray-500 flex items-center space-x-1 hover:text-gray-700"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span>Next</span> <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default ReusableTable;
