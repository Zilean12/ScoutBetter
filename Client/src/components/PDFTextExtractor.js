import React, { useState } from "react";
import pdfToText from "react-pdftotext";
import { Upload } from 'lucide-react';
import { Card } from "./UI/Card";

function PDFTextExtractor({ onTextExtract }) {
  const [feedback, setFeedback] = useState("");
  const MAX_FILE_SIZE_MB = 5;

  const extractText = (file, index) => {
    pdfToText(file)
      .then((extractedText) => {
        const formattedText = `[resume ${index + 1}]\n${extractedText}\n[end of resume ${index + 1}]`;
        console.log(formattedText); // Log the extracted text to the console
        setFeedback("Text extracted successfully!");
        onTextExtract(formattedText);
      })
      .catch((error) => {
        console.error("Failed to extract text from PDF", error);
        setFeedback("Failed to extract text from PDF. Please try again.");
      });
  };

  const validateAndProcessFile = (file, index) => {
    if (!file) {
      setFeedback("No file selected. Please upload a PDF.");
      return;
    }

    if (file.type !== "application/pdf") {
      setFeedback("Invalid file type. Only PDF files are allowed.");
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setFeedback(`File size exceeds ${MAX_FILE_SIZE_MB} MB. Please upload a smaller file.`);
      return;
    }

    setFeedback("Processing file...");
    extractText(file, index);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file, index) => validateAndProcessFile(file, index));
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      Array.from(files).forEach((file, index) => validateAndProcessFile(file, index));
    }
  };

  return (
    <Card className="w-full p-6">
      <div
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer transition-all duration-200 hover:border-indigo-500 dark:hover:border-indigo-400"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Drag and drop your PDF files here, or click to upload
        </p>
        <div className="relative">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            multiple
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium shadow-sm transition-all duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Choose Files
          </label>
        </div>
      </div>

      {feedback && (
        <div
          className={`mt-4 p-3 rounded-md ${
            feedback.includes("successfully")
              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
              : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
          }`}
        >
          {feedback}
        </div>
      )}
    </Card>
  );
}

export default PDFTextExtractor;
