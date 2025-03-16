import React from 'react';
import StatusDropdown from './StatusDropdown';

export default function QuestionField({ question, name }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <span className="text-gray-700 font-medium text-lg">{question}</span>
        <StatusDropdown 
          name={name}
          defaultValue=""
          options={[
            { value: 'Good', label: '😊 Good' },
            { value: 'Average', label: '😐 Average' },
            { value: 'Bad', label: '😔 Bad' }
          ]} 
        />
      </div>
    </div>
  );
} 