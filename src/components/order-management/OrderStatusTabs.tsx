import React from 'react';

/**
 * Renders a set of tabs for filtering order statuses.
 *
 * @param {object} props - The component props.
 * @param {string} [props.activeTab='All'] - The currently active tab.
 * @param {function} props.onTabClick - The callback function when a tab is clicked.
 * @param {string[]} [props.tabs=[]] - An array of tab names to display.
 */
const OrderStatusTabs = ({ activeTab = 'All', onTabClick, tabs = [] }) => {
  return (
    <div className="flex justify-center mb-2 mt-4">
      <div className="inline-flex flex-wrap justify-center gap-2 bg-white rounded-lg shadow-md p-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabClick?.(tab)}
            className={`tab-button px-5 py-2 rounded-md text-sm font-medium focus:outline-none transition duration-150 ease-in-out whitespace-nowrap ${
              activeTab === tab
                ? 'bg-yellow-400 text-black'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrderStatusTabs;
