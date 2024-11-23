import React from "react";

function PromptInput({ prompt, onChange }) {
  return (
    <input
      type="text"
      value={prompt}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type your prompt here..."
    />
  );
}

export default PromptInput;
