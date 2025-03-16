import React, { useState } from 'react';
import Button from '../ui/Button';

export default function ChildForm() {
  const [childData, setChildData] = useState({
    name: '',
    gender: '',
    birthdate: '',
    sleepQuality: '',
    appetite: '',
    socialBehavior: '',
    healthStatus: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChildData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const newChild = {
        ...childData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      
      if (typeof window.addChild === 'function') {
        await window.addChild(newChild);
        
        setChildData({
          name: '',
          gender: '',
          birthdate: '',
          sleepQuality: '',
          appetite: '',
          socialBehavior: '',
          healthStatus: ''
        });
      } else {
        console.error('window.addChild is not available');
        alert('System is not ready. Please try again in a moment.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add child. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-medium mb-4">Add child :</h2>
      
      <div className="bg-mint-100 rounded-lg p-3">
        <input
          type="text"
          name="name"
          value={childData.name}
          onChange={handleChange}
          placeholder="child's name"
          className="w-full p-2 rounded-md border-0 focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div className="bg-mint-100 rounded-lg p-3">
        <input
          type="text"
          name="gender"
          value={childData.gender}
          onChange={handleChange}
          placeholder="Child's gender"
          className="w-full p-2 rounded-md border-0 focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div className="bg-mint-100 rounded-lg p-3">
        <input
          type="date"
          name="birthdate"
          value={childData.birthdate}
          onChange={handleChange}
          placeholder="dd/mm/yyyy"
          className="w-full p-2 rounded-md border-0 focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div className="bg-mint-100 rounded-lg p-3">
        <select
          name="sleepQuality"
          value={childData.sleepQuality}
          onChange={handleChange}
          className="w-full p-2 rounded-md border-0 focus:ring-2 focus:ring-blue-500 appearance-none"
        >
          <option value="" disabled>sleep quality : (options)</option>
          <option value="Good">Good</option>
          <option value="Average">Average</option>
          <option value="Poor">Poor</option>
        </select>
      </div>
      
      <div className="bg-mint-100 rounded-lg p-3">
        <select
          name="appetite"
          value={childData.appetite}
          onChange={handleChange}
          className="w-full p-2 rounded-md border-0 focus:ring-2 focus:ring-blue-500 appearance-none"
        >
          <option value="" disabled>appetite: (options)</option>
          <option value="Good">Good</option>
          <option value="Average">Average</option>
          <option value="Poor">Poor</option>
        </select>
      </div>
      
      <div className="bg-mint-100 rounded-lg p-3">
        <select
          name="socialBehavior"
          value={childData.socialBehavior}
          onChange={handleChange}
          className="w-full p-2 rounded-md border-0 focus:ring-2 focus:ring-blue-500 appearance-none"
        >
          <option value="" disabled>social behavior : (options)</option>
          <option value="Excellent">Excellent</option>
          <option value="Good">Good</option>
          <option value="Average">Average</option>
          <option value="Needs Improvement">Needs Improvement</option>
        </select>
      </div>
      
      <div className="bg-mint-100 rounded-lg p-3">
        <select
          name="healthStatus"
          value={childData.healthStatus}
          onChange={handleChange}
          className="w-full p-2 rounded-md border-0 focus:ring-2 focus:ring-blue-500 appearance-none"
        >
          <option value="" disabled>health status: (options)</option>
          <option value="Excellent">Excellent</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Poor">Poor</option>
        </select>
      </div>
      
      <div className="text-center mt-6">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}