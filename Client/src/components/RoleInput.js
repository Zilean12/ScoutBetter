import React from "react";

function RoleInput({ role, onChange }) {
  return (
    <input
      type="text"
      value={role}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter Role"
    />
  );
}

export default RoleInput;
