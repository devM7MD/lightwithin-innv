import React, { useState, useEffect } from 'react';
import { auth } from '../../utils/firebase';

export default function Navbar() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Get display name or email
        setUserName(user.displayName || user.email?.split('@')[0] || 'User');
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-500 to-teal-400 shadow-lg z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
              <h1 className="text-2xl font-bold relative text-white">
                LightWithin
              </h1>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-4">
              <a href="/dashboard" className="px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-all duration-200">
                Dashboard
              </a>
              <a href="/reports" className="px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-all duration-200">
                Reports
              </a>
              <a href="/settings" className="px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-all duration-200">
                Settings
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-white/10 transition-all duration-200 relative">
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                />
              </svg>
            </button>

            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 group">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                    />
                  </svg>
                </div>
                <div className="hidden md:block">
                  <p className="text-white font-medium group-hover:text-white/90 transition-colors">
                    {userName}
                  </p>
                  <p className="text-white/70 text-sm group-hover:text-white/80 transition-colors">
                    View Profile
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </header>
  );
}