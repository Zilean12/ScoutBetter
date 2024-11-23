// import React from "react";

// function ResponseDisplay({ response }) {
//   return (
//     <div className="response">
//       <h2>Response:</h2>
//       <p>{response}</p>
//     </div>
//   );
// }

// export default ResponseDisplay;


import React from "react";
import "./ResponseDisplay.css";
import { marked } from 'marked';



function ResponseDisplay({ response }) {
  if (!response || !response.score) {
    return null;
  }

  const { analysis, score } = response;

  const scoreHighlights = `
    - **Relevance to Job Description (50%):** How well the resume matches the job description.
    - **Inclusion of Key Sections (30%):** Ensures the presence of essential sections (e.g., Skills, Experience).
    - **Formatting Quality (20%):** Evaluates bullet points, spacing, and structure.
  `;
  
  const formattedAnalysis = marked(analysis);  // Format analysis using Markdown

  return (
    <div className="response-display">
      <h3>Resume Analysis</h3>
      <div dangerouslySetInnerHTML={{ __html: formattedAnalysis }} />

      <h3>Resume Score</h3>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${score}%`, backgroundColor: score >= 70 ? "green" : "orange" }}
        >
          <span className="progress-text">{score}/100</span>
        </div>
      </div>

      <h4>Scoring Criteria</h4>
      <ul>
        <li><strong>Relevance:</strong> 50%</li>
        <li><strong>Key Sections:</strong> 30%</li>
        <li><strong>Formatting:</strong> 20%</li>
      </ul>

      <h4>Key Highlights</h4>
      <p>{scoreHighlights}</p>
    </div>
  );
}


export default ResponseDisplay;
