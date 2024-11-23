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

// import React, { useState } from "react";
// import "./App.css";
// import { PDFTextExtractor } from "./PDFTextExtractor";
// import axios from "axios";

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
//   const handleRoleChange = (event) => {
//     setRole(event.target.value);
//   };

//   // Handle API submission
//   const handleSubmit = async () => {
//     if (prompt.trim() === "" || role.trim() === "") {
//       setResponse("Prompt and role cannot be empty!");
//       return;
//     }

//     try {
//       const { data } = await axios.post("http://localhost:5000/analyze", {
//         prompt,
//         role,
//       });
//       setResponse(data.response);
//     } catch (error) {
//       console.error("Error fetching response from server:", error);
//       setResponse("An error occurred while fetching the response.");
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Resume Analysis</h1>
//         <input
//           type="text"
//           id="prompt"
//           value={prompt}
//           onChange={handlePromptChange}
//           placeholder="Type your prompt here..."
//         />
//         <input
//           type="text"
//           id="role"
//           value={role}
//           onChange={handleRoleChange}
//           placeholder="Enter Role"
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

// Testing phase 2

// import React, { useState } from "react";
// import "./App.css";
// import PromptInput from "./components/PromptInput";
// import RoleInput from "./components/RoleInput";
// import ResponseDisplay from "./components/ResponseDisplay";
// import PDFTextExtractor from "./components/PDFTextExtractor";
// import { analyzeResume } from "./api/analyzeApi";

// function App() {
//   const [prompt, setPrompt] = useState("");
//   const [role, setRole] = useState("");
//   const [response, setResponse] = useState("");

//   const handleTextExtraction = (extractedText) => {
//     setPrompt(extractedText);
//   };

//   const handleSubmit = async () => {
//     if (!prompt.trim() || !role.trim()) {
//       setResponse("Prompt and role cannot be empty!");
//       return;
//     }

//     try {
//       const apiResponse = await analyzeResume(prompt, role);
//       setResponse(apiResponse);
//     } catch (error) {
//       setResponse(error.message);
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Resume Analysis</h1>
//         <PromptInput prompt={prompt} onChange={setPrompt} />
//         <RoleInput role={role} onChange={setRole} />
//         <button onClick={handleSubmit}>Submit</button>
//         <ResponseDisplay response={response} />
//         <PDFTextExtractor onTextExtract={handleTextExtraction} />
//       </header>
//     </div>
//   );
// }

// export default App;

// import React, { useState } from "react";
// import "./App.css";
// import PromptInput from "./components/PromptInput";
// import RoleInput from "./components/RoleInput";
// import ResponseDisplay from "./components/ResponseDisplay";
// import PDFTextExtractor from "./components/PDFTextExtractor";
// import { analyzeResume } from "./api/analyzeApi";

// function App() {
//   const [prompt, setPrompt] = useState("");
//   const [role, setRole] = useState("");
//   const [response, setResponse] = useState("");

//   const handleTextExtraction = (extractedText) => {
//     setPrompt(extractedText);
//   };

//   const handleSubmit = async () => {
//     if (!prompt.trim() || !role.trim()) {
//       setResponse("Prompt and role cannot be empty!");
//       return;
//     }

//     try {
//       const apiResponse = await analyzeResume(prompt, role);
//       setResponse(apiResponse);
//     } catch (error) {
//       setResponse(error.message);
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Resume Analysis</h1>
//         <PromptInput prompt={prompt} onChange={setPrompt} />
//         <RoleInput role={role} onChange={setRole} />
//         <button onClick={handleSubmit}>Submit</button>
//         <ResponseDisplay response={response} />
//         <PDFTextExtractor onTextExtract={handleTextExtraction} />
//       </header>
//     </div>
//   );
// }

// export default App;

// import React, { useState } from "react";
// import PromptInput from "./components/PromptInput";
// import RoleInput from "./components/RoleInput";
// import ResponseDisplay from "./components/ResponseDisplay";
// import PDFTextExtractor from "./components/PDFTextExtractor";
// import { analyzeResume } from "./api/analyzeApi";

// function App() {
//   const [prompt, setPrompt] = useState("");
//   const [role, setRole] = useState("");
//   const [response, setResponse] = useState({});

//   const handleTextExtraction = (extractedText) => {
//     setPrompt(extractedText);
//   };

//   const handleSubmit = async () => {
//     if (!prompt.trim() || !role.trim()) {
//       setResponse({ analysis: "Prompt and role cannot be empty!", score: 0 });
//       return;
//     }

//     try {
//       const apiResponse = await analyzeResume(prompt, role);
//       setResponse(apiResponse);
//     } catch (error) {
//       setResponse({ analysis: "Error occurred while analyzing resume.", score: 0 });
//     }
//   };

//   return (
//     <div className="App">
//     <header className="App-header">
//       <h1>Resume Analysis with Scoring</h1>
//       <p>
//         Upload your resume and specify the role to analyze your resume for relevance, key sections, and formatting. 
//         Scores are based on a scale of 0–100.
//       </p>
//       <PromptInput prompt={prompt} onChange={setPrompt} />
//       <RoleInput role={role} onChange={setRole} />
//       <button onClick={handleSubmit}>Submit</button>
//       <ResponseDisplay response={response} />
//       <PDFTextExtractor onTextExtract={handleTextExtraction} />
//     </header>
//   </div>
  
//   );
// }

// export default App;


// import React, { useState } from "react";
// import PromptInput from "./components/PromptInput";
// import RoleInput from "./components/RoleInput";
// import ResponseDisplay from "./components/ResponseDisplay";
// import PDFTextExtractor from "./components/PDFTextExtractor";
// import { analyzeResume } from "./api/analyzeApi";
// import { generatePDFReport } from "./utils/reportGenerator";
// import { getUsernameContact } from "../../server/services/groqService";

// function App() {
//   const [prompt, setPrompt] = useState("");
//   const [role, setRole] = useState("");
//   // const [candidateName, setCandidateName] = useState("");
//   const [response, setResponse] = useState({});
//   const [username, setUsername] = useState("");
//   const [contactNo, setContactNo] = useState("");

//   const handleTextExtraction = (extractedText, name, contactNumber) => {
//     setPrompt(extractedText);
//     setUsername(name);
//     setContactNo(contactNumber);
//   };


//   const handleSubmit = async () => {
//     if (!prompt.trim() || !role.trim()) {
//       setResponse({ analysis: "Prompt and role cannot be empty!", score: 0 });
//       return;
//     }
  
//     try {
//       const { uName, contactNumber } = await getUsernameContact();
//       const apiResponse = await analyzeResume(prompt, role, username, contactNo);
//       setResponse(apiResponse);
//     } catch (error) {
//       setResponse({ analysis: "Error occurred while analyzing resume.", score: 0 });
//     }
//   };
  
//   const handleDownloadReport = () => {
//     if (response.analysis) {
//       generatePDFReport(prompt, role, response);
//     } else {
//       alert("No analysis to download. Please submit the resume for analysis first.");
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Resume Analysis with Scoring</h1>

//         <PromptInput prompt={prompt} onChange={setPrompt} />
//         <RoleInput role={role} onChange={setRole} />
//         <button onClick={handleSubmit}>Submit</button>
//         <ResponseDisplay response={response} candidateName={username} />
//         <PDFTextExtractor onTextExtract={handleTextExtraction} />
//         <button onClick={handleDownloadReport}>Download Report</button>
//       </header>
//     </div>
//   );
// }

// export default App;

  import React, { useState } from "react";
import PromptInput from "./components/PromptInput";
import RoleInput from "./components/RoleInput";
import ResponseDisplay from "./components/ResponseDisplay";
import PDFTextExtractor from "./components/PDFTextExtractor";
import { analyzeResume } from "./api/analyzeApi";
import { generatePDFReport } from "./utils/reportGenerator";
// import { getUsernameContact } from "../../server/services/groqService";

function App() {
  const [prompt, setPrompt] = useState("");
  const [role, setRole] = useState("");

  // const [candidateName, setCandidateName] = useState("");
  const [response, setResponse] = useState({});
  const [username, setUsername] = useState("");
  const [contactNo, setContactNo] = useState("");


  const handleTextExtraction = (extractedText, name, contactNumber) => {
    setPrompt(extractedText);
    setUsername(name);
    setContactNo(contactNumber);
  };

  const handleSubmit = async () => {
    if (!prompt.trim() || !role.trim()) {
      setResponse({ analysis: "Prompt and role cannot be empty!", score: 0 });
      return;
    }

    try {
      const apiResponse = await analyzeResume(prompt, role, username, contactNo);
      setResponse(apiResponse);
    } catch (error) {
      setResponse({ analysis: "Error occurred while analyzing resume.", score: 0 });
    }
  };

  const handleDownloadReport = () => {
        if (response.analysis) {
          generatePDFReport(prompt, role, response);
        } else {
          alert("No analysis to download. Please submit the resume for analysis first.");
        }
      };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Resume Analysis with Scoring</h1>

        <p><strong>Username:</strong> {username || "Not extracted yet"}</p>
        <p><strong>Contact Number:</strong> {contactNo || "Not extracted yet"}</p>

        <PromptInput prompt={prompt} onChange={setPrompt} />
        <RoleInput role={role} onChange={setRole} />
        <button onClick={handleSubmit}>Submit</button>
        <ResponseDisplay response={response} candidateName={username} />
        <PDFTextExtractor onTextExtract={handleTextExtraction} />
        <button onClick={handleDownloadReport}>Download Report</button>
      </header>
    </div>
  );
}
export default App;
