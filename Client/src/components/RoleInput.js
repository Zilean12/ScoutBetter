import React from "react";

function RoleInput({ role, onChange }) {
  return (
    <div className="w-full">
      <label
        htmlFor="role"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        Job Role
      </label>
      <input
        type="text"
        id="role"
        value={role}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter the job role"
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400 transition-all duration-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white appearance-none"
      />
    </div>
  );
}

export default RoleInput;

