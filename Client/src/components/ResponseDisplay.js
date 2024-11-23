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

function ResponseDisplay({ response }) {
  if (!response) {
    return null;
  }

  return (
    <div className="response-display">
      <h3>Resume Analysis</h3>
      <p>{response.analysis}</p>

      <h3>Resume Score</h3>
      <p><strong>{response.score}</strong>/100</p>
    </div>
  );
}

export default ResponseDisplay;
