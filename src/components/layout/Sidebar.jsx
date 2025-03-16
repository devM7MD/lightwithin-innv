import React, { useState } from 'react';
import { sidebarLinks } from '../../data/sidebarLinks';
import { auth, db } from '../../utils/firebase';
import { signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      try {
        const user = auth.currentUser;
        
        if (user) {
          // Update last activity
          const userRef = doc(db, 'users', user.uid);
          await updateDoc(userRef, {
            lastLogout: new Date().toISOString(),
            lastActivity: 'logout',
            isOnline: false
          });
        }

        await signOut(auth);
        localStorage.removeItem('userSettings');
        sessionStorage.clear();
        window.location.href = '/login';
        
      } catch (error) {
        console.error('Logout error:', error);
        alert('Error during logout. Please try again.');
      }
    }
  };

  return (
    <div className={`bg-gradient-to-b from-blue-600 to-blue-700 text-white 
                    ${isCollapsed ? 'w-20' : 'w-72'} min-h-screen py-8 px-4 
                    relative shadow-xl transition-all duration-300 ease-in-out
                    transform -translate-x-full md:translate-x-0`}>
      
      
      <div className="flex items-center justify-center mb-10">
        <div className="relative">
          <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
          <h1 className={`text-3xl font-bold relative bg-gradient-to-r from-white to-blue-100 
                         bg-clip-text text-transparent transition-all duration-300
                         ${isCollapsed ? 'text-xl' : 'text-3xl'}`}>
            {isCollapsed ? 'LW' : 'LightWithin'}
          </h1>
        </div>
      </div>

      
      <nav className="space-y-2">
        {sidebarLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            className="flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-200
                       hover:bg-white/10 hover:shadow-lg hover:shadow-blue-800/20
                       active:scale-[0.98] group relative"
            title={isCollapsed ? link.label : ''}
          >
           
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 
                          group-hover:opacity-100 rounded-xl transition-opacity duration-200"></div>
            
            
            {link.icon && (
              <span className="text-xl">
                {link.icon}
              </span>
            )}
            
            
            <span className={`relative font-medium text-white/90 group-hover:text-white
                            transition-all duration-300 ${isCollapsed ? 'hidden' : 'block'}`}>
              {link.label}
            </span>
          </a>
        ))}
      </nav>

     
      <div className="absolute bottom-8 left-0 right-0 px-4 space-y-4">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6"></div>
        
      
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl
                     bg-white/5 hover:bg-white/10 transition-all duration-200
                     hover:shadow-lg hover:shadow-blue-800/20 active:scale-[0.98]
                     font-medium text-white/90 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isCollapsed ? "M13 5l-7 7 7 7" : "M11 19l7-7-7-7"}
            />
          </svg>
          <span className={`${isCollapsed ? 'hidden' : 'block'}`}>
            Collapse Sidebar
          </span>
        </button>

        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl
                     bg-white/10 hover:bg-red-500/50 transition-all duration-200
                     hover:shadow-lg hover:shadow-red-800/20 active:scale-[0.98]
                     font-medium text-white/90 hover:text-white"
          title={isCollapsed ? 'Logout' : ''}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
            />
          </svg>
          <span className={`${isCollapsed ? 'hidden' : 'block'}`}>
            Logout
          </span>
        </button>
      </div>

     
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 via-transparent to-blue-900/20 pointer-events-none"></div>
    </div>
  );
}
