import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

const NumberCardsGrid = ({ cards, discType = 'solid', defaultCardSize = 6 }) => {
  return (
    <div
      className="grid gap-4 p-4 w-full"
      style={{
        gridTemplateColumns: `repeat(${defaultCardSize}, minmax(0, 1fr))`,
      }}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 bg-white shadow-sm"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  discType === 'solid'
                    ? card.color
                    : `border-2 border-${card.color.replace('bg-', '')}-500`
                }`}
              ></span>
              <h2 className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                {card.title}
              </h2>
            </div>
            <FaInfoCircle className="cursor-pointer text-gray-400" />
          </div>
          <p className="text-xs text-gray-500 mb-2">{card.description}</p>
          <p className="text-2xl font-bold text-gray-900">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default NumberCardsGrid;
