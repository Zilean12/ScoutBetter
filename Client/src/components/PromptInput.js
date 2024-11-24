import React from "react";

/**
 * Purpose:
 * The PromptInput component renders an input field for users to type a prompt, such as a request 
 * or query, which can then be used for further processing (e.g., generating responses or analyzing text). 
 * This component is controlled, meaning the input value is managed by the parent component, ensuring 
 * consistency and easy data handling in the application.
 *
 * Key Features:
 * - Displays a placeholder text: "Type your prompt here..."
 * - Updates the parent component with the typed prompt using the `onChange` callback
 * - Customizable styling with Tailwind CSS for smooth, responsive user experience
 */

function PromptInput({ prompt, onChange }) {
  return (
    <input
      type="text"
      value={prompt} // The value of the input is controlled by the parent component
      onChange={(e) => onChange(e.target.value)} // Updates the parent component with the new prompt
      placeholder="Type your prompt here..."
      className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg placeholder-gray-500 transition duration-200"
    />
  );
}

export default PromptInput;
