import React from 'react';

export default function ChildCard({ child, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{child.name}</h3>
          <p className="text-sm text-gray-600">Gender: {child.gender}</p>
          <p className="text-sm text-gray-600">Birthdate: {formatDate(child.birthdate)}</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => onEdit(child.id)} 
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(child.id)} 
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-gray-50 p-2 rounded">
          <span className="font-medium">Sleep:</span> {child.sleepQuality}
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <span className="font-medium">Appetite:</span> {child.appetite}
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <span className="font-medium">Social:</span> {child.socialBehavior}
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <span className="font-medium">Health:</span> {child.healthStatus}
        </div>
      </div>
    </div>
  );
}