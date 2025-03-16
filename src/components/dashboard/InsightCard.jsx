// src/components/dashboard/InsightCard.jsx
import React from 'react';

const InsightCard = ({ message, status }) => {
  // Define colors based on status
  const getTextColor = () => {
    switch (status) {
      case 'good':
        return 'text-green-600';
      case 'bad':
        return 'text-red-600';
      case 'warning':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-teal-100/70 rounded-2xl px-6 py-4">
      <p className={`text-center ${getTextColor()}`}>
        {message}
      </p>
    </div>
  );
};

export default InsightCard;