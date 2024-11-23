import React from "react";

function RoleInput({ role, onChange }) {
  return (
    <div className="w-full max-w-xs mx-auto">
      <label className="block text-lg font-semibold text-gray-700 mb-2">Role</label>
      <input
        type="text"
        value={role}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter Role"
        className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-xl placeholder-gray-400 transition-all duration-300 ease-in-out hover:border-indigo-400"
      />
    </div>
  );
}

export default RoleInput;
