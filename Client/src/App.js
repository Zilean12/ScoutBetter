// import React, { useState } from "react";
// import Groq from "groq-sdk";
// import "./App.css";
// import { PDFTextExtractor } from "./PDFTextExtractor";

// const groq = new Groq({
//   apiKey: process.env.REACT_APP_GROQ_API_KEY || "your-api-key-here",
//   dangerouslyAllowBrowser: true,
// });

// function App() {
//   const [prompt, setPrompt] = useState(""); // Store the prompt (extracted text)
//   const [response, setResponse] = useState(""); // Store the response from the API
//   const [text, setText] = useState(""); // Store the raw extracted text
//   const [role, setRole] = useState("");

//   // Update the extracted text in the parent component (App)
//   const handleTextExtraction = (extractedText) => {
//     setText(extractedText); // Update local state with extracted text
//     setPrompt(extractedText); // Set the extracted text as the prompt for the API
//   };

//   // Handle prompt change (used for manual input)
//   const handlePromptChange = (event) => {
//     setPrompt(event.target.value);
//   };
//   const handleRoleChange = (event) =>{
//     setRole(event.target.value);
//   }

//   // Handle API submission
//   const handleSubmit = async () => {
//     if (prompt.trim() === "") {
//       setResponse("Prompt cannot be empty!");
//       return;
//     }
//     try {
//       const chatCompletion = await groq.chat.completions.create({
//         messages: [
//           {
//             role: "user",
//             content: prompt+" [End of Resume]. Now, analyze the resume content for "+role+" and give scores on Skillsets, Role Fitment, Projects, and give the whole response in a structured way without any extra text",
//           },
//         ],
//         model: "llama3-8b-8192",
//       });

//       const content =
//         chatCompletion.choices[0]?.message?.content || "No response received.";
//       setResponse(content);
//     } catch (error) {
//       console.error("Error fetching Groq response:", error);
//       setResponse("An error occurred while fetching the response.");
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Enter Prompt</h1>
//         <input
//           type="text"
//           id="prompt"
//           value={prompt}
//           onChange={handlePromptChange}
//           placeholder="Type your prompt here..."
//         />
//         <input 
//         type="text"
//         id="role"
//         value = {role}
//         onChange={handleRoleChange}
//         placeholder="Enter Role"
//         />
//         <button onClick={handleSubmit}>Submit</button>

//         <div className="response">
//           <h2>Response:</h2>
//           <p>{response}</p>
//         </div>

//         {/* Pass the handleTextExtraction function to PDFTextExtractor */}
//         <PDFTextExtractor onTextExtract={handleTextExtraction} />
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import "./App.css";
import { PDFTextExtractor } from "./PDFTextExtractor";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState(""); // Store the prompt (extracted text)
  const [response, setResponse] = useState(""); // Store the response from the API
  const [text, setText] = useState(""); // Store the raw extracted text
  const [role, setRole] = useState("");

  // Update the extracted text in the parent component (App)
  const handleTextExtraction = (extractedText) => {
    setText(extractedText); // Update local state with extracted text
    setPrompt(extractedText); // Set the extracted text as the prompt for the API
  };

  // Handle prompt change (used for manual input)
  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  // Handle API submission
  const handleSubmit = async () => {
    if (prompt.trim() === "" || role.trim() === "") {
      setResponse("Prompt and role cannot be empty!");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5000/analyze", {
        prompt,
        role,
      });
      setResponse(data.response);
    } catch (error) {
      console.error("Error fetching response from server:", error);
      setResponse("An error occurred while fetching the response.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Resume Analysis</h1>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Type your prompt here..."
        />
        <input
          type="text"
          id="role"
          value={role}
          onChange={handleRoleChange}
          placeholder="Enter Role"
        />
        <button onClick={handleSubmit}>Submit</button>

        <div className="response">
          <h2>Response:</h2>
          <p>{response}</p>
        </div>

        {/* Pass the handleTextExtraction function to PDFTextExtractor */}
        <PDFTextExtractor onTextExtract={handleTextExtraction} />
      </header>
    </div>
  );
}

export default App;