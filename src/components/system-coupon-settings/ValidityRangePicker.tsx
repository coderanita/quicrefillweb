import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { FaCalendarAlt } from "react-icons/fa";
import "react-date-range/dist/styles.css"; // main css
import "react-date-range/dist/theme/default.css"; // theme css
import { format } from "date-fns";

const ValidityRangePicker = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: value?.startDate || new Date(),
      endDate: value?.endDate || new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setRange([ranges.selection]);
    onChange(ranges.selection);
  };

  return (
    <div className="relative w-full">
      {/* Input Box */}
      <div
        className="flex items-center justify-between border border-gray-300 rounded-lg px-3 py-2 cursor-pointer bg-white"
        onClick={() => setOpen(!open)}
      >
        <span className="text-gray-700 text-sm">
          {format(range[0].startDate, "d MMM")} - {format(range[0].endDate, "d MMM")}
        </span>
        <FaCalendarAlt className="text-yellow-500" />
      </div>

      {/* Calendar Dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 shadow-lg bg-white rounded-lg">
          <DateRange
            ranges={range}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            editableDateInputs={true}
             rangeColors={["#facc15"]} 
          />
          <div className="flex justify-end p-2">
            <button
              className="bg-yellow-600 text-white px-4 py-1 rounded-md hover:bg-yellow-700"
              onClick={() => setOpen(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidityRangePicker;
