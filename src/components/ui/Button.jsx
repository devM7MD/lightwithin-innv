import React from 'react';

export default function Button({ children, onClick, type = "button", className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors ${className}`}
    >
      {children}
    </button>
  );
}