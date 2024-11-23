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


// import React from "react";
// import "./ResponseDisplay.css";
// import { marked } from 'marked';


// function ResponseDisplay({ response }) {
//   if (!response || !response.score) {
//     return null;
//   }

//   const { analysis, score } = response;

//   const scoreHighlights = `
//     - **Relevance to Job Description (50%):** How well the resume matches the job description.
//     - **Inclusion of Key Sections (30%):** Ensures the presence of essential sections (e.g., Skills, Experience).
//     - **Formatting Quality (20%):** Evaluates bullet points, spacing, and structure.
//   `;

//   const formattedAnalysis = marked(analysis);  // Format analysis using Markdown

//   return (
//     <div className="response-display">
//       <h3>Resume Analysis</h3>
//       <div dangerouslySetInnerHTML={{ __html: formattedAnalysis }} />

//       <h3>Resume Score</h3>
//       <div className="progress-bar-container">
//         <div
//           className="progress-bar"
//           style={{ width: `${score}%`, backgroundColor: score >= 70 ? "green" : "orange" }}
//         >
//           <span className="progress-text">{score}/100</span>
//         </div>
//       </div>

//       <h4>Scoring Criteria</h4>
//       <ul>
//         <li><strong>Relevance:</strong> 50%</li>
//         <li><strong>Key Sections:</strong> 30%</li>
//         <li><strong>Formatting:</strong> 20%</li>
//       </ul>

//       <h4>Key Highlights</h4>
//       <p>{scoreHighlights}</p>
//     </div>
//   );
// }



// export default ResponseDisplay;


import React from "react";
import "./ResponseDisplay.css";
import { marked } from "marked";

function ResponseDisplay({ response, candidateName }) {
  if (!response || !response.score) {
    return null;
  }

  const { analysis, score, highlights } = response;

  // Markdown-rendered analysis
  const formattedAnalysis = marked(analysis || "No analysis provided.");

  // Score highlights dynamically rendered
  const scoreDetails = [
    { title: "Relevance to Job Description", weight: 50, description: "How well the resume matches the job description." },
    { title: "Inclusion of Key Sections", weight: 30, description: "Ensures the presence of essential sections (e.g., Skills, Experience)." },
    { title: "Formatting Quality", weight: 20, description: "Evaluates bullet points, spacing, and structure." },
  ];

  return (
    <div className="response-display bg-white shadow-lg p-6 rounded-lg">
      {candidateName && (
        <h3 className="text-xl font-semibold text-indigo-600">
          Resume Analysis for {candidateName}
        </h3>
      )}

      <div dangerouslySetInnerHTML={{ __html: formattedAnalysis }} className="mt-4 text-gray-700" />

      <h3 className="mt-6 text-lg font-bold text-indigo-700">Resume Score</h3>
      <div className="progress-bar-container bg-gray-200 rounded-full h-6 mt-4 overflow-hidden relative">
        <div
          className={`progress-bar h-full transition-all duration-300 ${
            score >= 70 ? "bg-green-500" : "bg-orange-500"
          }`}
          style={{ width: `${score}%` }}
        />
        <span className="absolute inset-0 flex items-center justify-center font-semibold text-white">
          {score}/100
        </span>
      </div>

      <h4 className="mt-6 text-md font-semibold text-gray-800">Scoring Criteria</h4>
      <ul className="list-disc pl-6 text-gray-600 mt-2">
        {scoreDetails.map((detail, index) => (
          <li key={index}>
            <strong>{detail.title} ({detail.weight}%):</strong> {detail.description}
          </li>
        ))}
      </ul>

      {highlights && (
        <>
          <h4 className="mt-6 text-md font-semibold text-gray-800">Key Highlights</h4>
          <div className="mt-2 text-gray-600">
            <h5 className="font-bold">Strengths:</h5>
            <ul className="list-disc pl-6">
              {highlights.strengths?.map((strength, index) => (
                <li key={index}>{strength}</li>
              )) || <li>No strengths identified.</li>}
            </ul>
            <h5 className="mt-4 font-bold">Weaknesses:</h5>
            <ul className="list-disc pl-6">
              {highlights.weaknesses?.map((weakness, index) => (
                <li key={index}>{weakness}</li>
              )) || <li>No weaknesses identified.</li>}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default ResponseDisplay;
