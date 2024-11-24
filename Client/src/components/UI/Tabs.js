import React, { useState } from 'react';

export const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className="w-full">
      {React.Children.map(children, (child) => {
        if (child.type === TabsList) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        if (child.type === TabsContent) {
          return React.cloneElement(child, { activeTab });
        }
        return child;
      })}
    </div>
  );
};

export const TabsList = ({ children, activeTab, setActiveTab }) => (
  <div className="flex border-b border-gray-200 dark:border-gray-700">
    {React.Children.map(children, (child) =>
      React.cloneElement(child, { activeTab, setActiveTab })
    )}
  </div>
);

export const TabsTrigger = ({ children, value, activeTab, setActiveTab }) => (
  <button
    className={`px-4 py-2 font-medium text-sm focus:outline-none ${
      activeTab === value
        ? 'text-blue-600 border-b-2 border-blue-600'
        : 'text-gray-500 hover:text-gray-700'
    }`}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </button>
);

export const TabsContent = ({ children, value, activeTab }) => (
  activeTab === value ? <div className="mt-4">{children}</div> : null
);

