import React from 'react';
import { FaUser, FaMotorcycle, FaClipboard, FaUserCog, FaInfoCircle } from 'react-icons/fa';

interface StatCardData {
  title: string;
  icon: React.ReactNode;
  value: string;
  percentage: string;
  percentageColor: 'green' | 'red';
  showPercentageBox: boolean;
  description: string;
  extraInfo: string;
}

interface StatsCardProps {
  cards: StatCardData[];
  wrapInGrid?: boolean; // Optional prop to control grid wrapping
}

const StatsCard: React.FC<StatCardData> = ({ title, icon, value, percentage, percentageColor, description, extraInfo, showPercentageBox }) => {
  return (
    <div className="bg-white rounded-md border border-gray-300 shadow-md p-4 relative">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center">
          <div className="w-5 h-5 bg-gray-200 rounded-md flex items-center justify-center">
            {icon}
          </div>
          <span className="text-gray-600 ml-2 text-xs">{title}</span>
        </div>
        <FaInfoCircle className="cursor-pointer text-gray-400 text-xs" />
      </div>

      <div className="flex items-center mb-1">
        <div className="text-2xl font-bold mb-2">{value}</div>
        {showPercentageBox && percentage && (
          <span
            className={`
            ${percentageColor === 'green' ? 'bg-green-100 text-green-600 border border-green-300' : ''}
            ${percentageColor === 'red' ? 'bg-red-100 text-red-500 border border-red-300' : ''}
            ml-2 px-2 py-1 rounded-xl text-xs font-semibold flex items-center
          `}
          >
            {percentage}
            {percentageColor === 'green' && (
              <svg className="w-4 h-4 text-green-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 4h6m0 0v6m0-6L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {percentageColor === 'red' && (
              <svg className="w-4 h-4 text-red-500 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20H4m0 0v-6m0 6L14 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
        )}

      </div>

      {(description || extraInfo) && (
        <div className="text-xs text-gray-500">
          {description} {extraInfo && (
            <>
              : <span className="font-semibold">{extraInfo}</span>
            </>
          )}
        </div>
      )}

    </div>
  );
};

const StatsCards: React.FC<StatsCardsProps> = ({ cards, wrapInGrid = true }) => {
  const Wrapper = wrapInGrid ? 'div' : React.Fragment;

  return (
    <Wrapper {...(wrapInGrid ? { className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 z-5' } : {})}>
      {cards.map((card, index) => (
        <StatsCard key={index} {...card} />
      ))}
    </Wrapper>
  );
};

export default StatsCards;
