import React, { useState } from 'react';

export default function StatusDropdown({ 
  defaultValue = '',
  name,
  options = [
    { value: 'Good', label: '😊 Good' },
    { value: 'Average', label: '😐 Average' },
    { value: 'Bad', label: '😔 Bad' }
  ] 
}) {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    setError(false);
  };

  return (
    <div className="relative min-w-[200px]">
      <select
        name={name}
        value={selectedValue}
        onChange={handleChange}
        className={`w-full appearance-none bg-gradient-to-r from-blue-50 to-teal-50
                   border ${error ? 'border-red-400' : 'border-gray-200'} 
                   text-gray-700 py-3 px-4 pr-8 rounded-lg
                   leading-tight focus:outline-none focus:ring-2 
                   ${error ? 'focus:ring-red-200 focus:border-red-400' : 'focus:ring-blue-200 focus:border-blue-400'}
                   transition-all duration-200
                   hover:border-blue-300 cursor-pointer font-medium`}
      >
        <option value="" disabled>Select value</option>
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            className="py-2 text-gray-700 bg-white hover:bg-blue-50"
          >
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg 
          className={`fill-current h-5 w-5 ${error ? 'text-red-400' : 'text-gray-500'}`}
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">Please select a value</p>
      )}
    </div>
  );
} 