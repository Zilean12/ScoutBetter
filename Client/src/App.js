
import React, { useState } from "react";
import PromptInput from "./components/PromptInput";
import RoleInput from "./components/RoleInput";
import ResponseDisplay from "./components/ResponseDisplay";
import PDFTextExtractor from "./components/PDFTextExtractor";
import { analyzeResume } from "./api/analyzeApi";
import { generatePDFReport } from "./utils/reportGenerator";

/**
 * Purpose:
 * This application is designed to help users analyze resumes by extracting text from uploaded PDF files, 
 * allowing the user to provide a job role for context. The user can then submit the extracted information 
 * for analysis, view the analysis results, and download a PDF report of the analysis.
 * 
 * Features include:
 * - Dark Mode toggle
 * - PDF text extraction
 * - Resume analysis based on job role
 * - Downloadable report of the analysis
 */

function App() {
  // State variables to manage input fields, response, dark mode, and user details
  const [prompt, setPrompt] = useState(""); // Holds the resume text prompt
  const [role, setRole] = useState(""); // Holds the job role entered by the user
  const [response, setResponse] = useState({}); // Holds the response from the resume analysis API
  const [username, setUsername] = useState(""); // User's name
  const [contactNo, setContactNo] = useState(""); // User's contact number
  const [darkMode, setDarkMode] = useState(false); // State for toggling dark mode

  // Function to toggle between dark and light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Toggle the darkMode state
    if (!darkMode) {
      document.documentElement.classList.add("dark"); // Apply dark theme styles
    } else {
      document.documentElement.classList.remove("dark"); // Remove dark theme styles
    }
  };

  // Function to handle the extracted text from the PDF extractor component
  const handleTextExtraction = (extractedText) => {
    // Append the extracted text to the existing prompt
    setPrompt((prevPrompt) => prevPrompt + "\n" + extractedText);
  };

  // Function to handle form submission for resume analysis
  const handleSubmit = async () => {
    // Check if the prompt and role are filled in
    if (!prompt.trim() || !role.trim()) {
      setResponse({ analysis: "Prompt and role cannot be empty!", score: 0 });
      return;
    }

    try {
      // Call the analyzeResume API with the user input
      const apiResponse = await analyzeResume(prompt, role, username, contactNo);
      setResponse(apiResponse); // Set the response to the state
    } catch (error) {
      // Handle any error that occurs during the API call
      setResponse({ analysis: "Error occurred while analyzing resume.", score: 0 });
    }
  };

  // Function to handle downloading the generated report
  const handleDownloadReport = () => {
    // Check if there is an analysis available for download
    if (response.analysis) {
      // Generate and download the PDF report using the response data
      generatePDFReport(prompt, role, response, username, contactNo);
    } else {
      alert("No analysis to download. Please submit the resume for analysis first.");
    }
  };

  return (
    <div className="App bg-gradient-to-r from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-900 min-h-screen flex items-center justify-center pt-12 pb-12 transition-colors duration-300">
      <div className="container mx-auto p-12 bg-white dark:bg-gray-800 shadow-xl rounded-xl max-w-5xl">
        {/* Header section */}
        <header className="App-header text-center mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300">Resume Analysis</h1>
            {/* Button to toggle between light and dark modes */}
            <button
              onClick={toggleDarkMode}
              className="text-3xl text-indigo-600 dark:text-white transition-transform transform hover:scale-105"
            >
              {darkMode ? (
                <i className="fas fa-sun"></i> // Sun icon for light mode
              ) : (
                <i className="fas fa-moon"></i> // Moon icon for dark mode
              )}
            </button>
          </div>

          {/* Role input form */}
          <div className="mb-8 space-y-6">
            {/* <PromptInput prompt={prompt} onChange={setPrompt} />  */}
            <RoleInput role={role} onChange={setRole} /> {/* Role input field */}
          </div>

          {/* Buttons to submit the resume or download the report */}
          <div className="space-x-6">
            <button
              onClick={handleSubmit}
              className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-xl transform transition-all hover:scale-110 hover:bg-indigo-700"
            >
              Submit
            </button>

            <button
              onClick={handleDownloadReport}
              className="px-8 py-4 bg-green-600 text-white font-semibold rounded-xl shadow-xl transform transition-all hover:scale-110 hover:bg-green-700"
            >
              Download Report
            </button>
          </div>
        </header>

        {/* Display the analysis result */}
        <div className="mt-10">
          <ResponseDisplay response={response} candidateName={username} />
        </div>

        {/* PDF text extractor component for uploading and extracting resume text */}
        <div className="mt-12">
          <PDFTextExtractor onTextExtract={handleTextExtraction} />
        </div>
      </div>
    </div>
  );
}

export default App;
