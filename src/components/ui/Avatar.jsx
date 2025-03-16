import React from 'react';

export default function Avatar({ src, alt, size = 'md', className = '' }) {
  // Determine size class
  const sizeClass = {
    'sm': 'w-8 h-8',
    'md': 'w-12 h-12',
    'lg': 'w-16 h-16',
    'xl': 'w-24 h-24'
  }[size] || 'w-12 h-12';
  
  return (
    <div className={`${sizeClass} rounded-full overflow-hidden ${className}`}>
      {src ? (
        <img 
          src={src} 
          alt={alt || 'User avatar'} 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-mint-200 flex items-center justify-center">
          <span className="text-mint-800 font-bold">
            {(alt && alt.charAt(0).toUpperCase()) || 'U'}
          </span>
        </div>
      )}
    </div>
  );
}