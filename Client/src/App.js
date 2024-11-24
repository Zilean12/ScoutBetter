import React, { useState } from "react";
import PromptInput from "./components/PromptInput";
import RoleInput from "./components/RoleInput";
import ResponseDisplay from "./components/ResponseDisplay";
import PDFTextExtractor from "./components/PDFTextExtractor";
import { analyzeResume } from "./api/analyzeApi";
import { generatePDFReport } from "./utils/reportGenerator";
import { Sun, Moon } from 'lucide-react';
import './styles/globals.css';

function App() {
  const [prompt, setPrompt] = useState("");
  const [role, setRole] = useState("");
  const [response, setResponse] = useState({});
  const [username, setUsername] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleTextExtraction = (extractedText) => {
    setPrompt((prevPrompt) => prevPrompt + "\n" + extractedText);
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
      generatePDFReport(prompt, role, response, username, contactNo);
    } else {
      alert("No analysis to download. Please submit the resume for analysis first.");
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-300">
              Resume Analysis
            </h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-200 transition-colors duration-200 hover:bg-indigo-200 dark:hover:bg-indigo-700"
            >
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </div>
          <p className="mt-2 text-xl text-gray-600 dark:text-gray-300">
            Upload your resume, specify the role, and get instant analysis
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <RoleInput role={role} onChange={setRole} />
            <div className="flex space-x-4">
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                Analyze Resume
              </button>
              <button
                onClick={handleDownloadReport}
                className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Download Report
              </button>
            </div>
          </div>
          <PDFTextExtractor onTextExtract={handleTextExtraction} />
        </div>

        <ResponseDisplay response={response} candidateName={username} />
      </div>
    </div>
  );
}

export default App;

