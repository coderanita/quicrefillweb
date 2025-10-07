import { useState } from "react";
import { FaEdit, FaTrash, FaEllipsisV, FaUserSlash, FaUserCheck, FaCommentDots, FaEnvelope } from "react-icons/fa";

const ActionsCell = ({ row, onEdit, onDelete, extraActions = [] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        {/* ✅ Edit Action */}
        {onEdit && (
          <button
            className="text-gray-500 hover:text-blue-500"
            onClick={() => onEdit(row)}
          >
            <FaEdit />
          </button>
        )}

        {/* ✅ Delete Action */}
        {onDelete && (
          <button
            className="text-gray-500 hover:text-red-500"
            onClick={() => onDelete(row)}
          >
            <FaTrash />
          </button>
        )}

        {/* Dropdown Toggle */}
        {extraActions.length > 0 && (
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaEllipsisV />
          </button>
        )}
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-md z-50"
          style={{ minWidth: "10rem" }}
        >
          {extraActions.map((action) => (
            <button
              key={action.label}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
              onClick={() => {
                action.onClick(row);
                setOpen(false);
              }}
            >
              <span className={`mr-2 ${action.color}`}>{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionsCell;
