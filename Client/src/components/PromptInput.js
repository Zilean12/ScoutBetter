import React from "react";

function PromptInput({ prompt, onChange }) {
  return (
    <input
      type="text"
      value={prompt}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type your prompt here..."
      className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg placeholder-gray-500 transition duration-200"
    />
  );
}

export default PromptInput;
