import React from 'react';

export default function DashboardCard({ title, value, icon, color = 'bg-mint-200' }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-700">{title}</h3>
          <p className="text-2xl font-semibold mt-2">{value}</p>
        </div>
        <div className={`${color} p-3 rounded-full`}>
          {icon || (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-mint-800" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" 
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}