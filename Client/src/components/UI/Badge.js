import React from 'react';

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variantClasses = {
    default: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    outline: 'border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200',
  };

  return (
    <span className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

