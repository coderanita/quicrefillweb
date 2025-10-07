import React from 'react';
import { FaStar, FaTrophy, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const topThree = [
  { rank: 2, name: 'Frank Marcus', avatar: 'images/Avatar/Frank Marcus.png' },
  { rank: 1, name: 'Uchenna Paul', avatar: 'images/Avatar/Uchenna Paul.png' },
  { rank: 3, name: 'Glory Amina', avatar: 'images/Avatar/Glory Amina.png' },
];

const others = [
  { rank: 4, name: 'Collins Emeka', avatar: 'images/Avatar/Collins Emeka.png', rating: 5 },
  { rank: 5, name: 'Stephen George', avatar: 'images/Avatar/Stephen George.png', rating: 4 },
  { rank: 6, name: 'John Gregory', avatar: 'images/Avatar/John Gregory.png', rating: 4.5 },
];

const StarRating = ({ rating = 5 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="text-yellow-400 text-xs flex gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} />
      ))}
      {hasHalfStar && <FaStarHalfAlt key="half" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} />
      ))}
    </div>
  );
};

const DeliveryRepLeaderboard = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex-1">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-sm">Delivery Rep Leaderboard</h2>
        <a href="delivery-rep-management.html" className="text-xs text-yellow-500 font-medium">
          View all
        </a>
      </div>

      {/* Top 3 */}
      <div className="flex justify-center items-end gap-6 mb-6">
        {topThree.map(({ rank, name, avatar }) => (
          <div
            key={rank}
            className={`flex flex-col items-center ${rank === 1 ? 'mb-6' : ''}`}
          >
            <div className="relative mb-1">
              <img
                src={avatar}
                className={`rounded-full ${rank === 1 ? 'w-16 h-16 border-4 border-yellow-400' : 'w-14 h-14'}`}
                alt={name}
              />
              <div className="absolute -top-1 -left-1 w-6 h-6 bg-yellow-400 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {rank}
              </div>
              {rank === 1 && (
                <FaTrophy className="text-yellow-400 text-xl absolute -top-4 left-1/2 -translate-x-1/2" />
              )}
            </div>
            <p className="text-xs font-medium">{name}</p>
            <StarRating />
          </div>
        ))}
      </div>

      {/* Others */}
      <div className="space-y-4 text-sm">
        {others.map(({ rank, name, avatar, rating }) => (
          <div key={rank} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-black text-white text-xs font-bold px-2 py-1 rounded-md w-6 flex items-center justify-center">
                {rank}
              </div>
              <img src={avatar} className="w-9 h-9 rounded-full" alt={name} />
              <p>{name}</p>
            </div>
            <StarRating rating={rating} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryRepLeaderboard;
