// import React, { useState } from "react";
// import pdfToText from "react-pdftotext";

// function PDFTextExtractor({ onTextExtract }) {
//   const [text, setText] = useState("");

//   function extractText(event) {
//     const file = event.target.files[0];
//     pdfToText(file)
//       .then((text) => {
//         setText(text);
//         onTextExtract(text);
//       })
//       .catch((error) => {
//         console.error("Failed to extract text from PDF", error);
//       });
//   }

//   return (
//     <div>
//       <input type="file" accept="application/pdf" onChange={extractText} />
//       <textarea
//         value={text}
//         readOnly
//         rows="10"
//         cols="50"
//         style={{ width: "100%", marginTop: "20px" }}
//       />
//     </div>
//   );
// }

// export default PDFTextExtractor;


// import React, { useState } from "react";
// import pdfToText from "react-pdftotext";
// import "./PDFTextExtractor.css"; // Add custom styles for drag-and-drop

// function PDFTextExtractor({ onTextExtract }) {
//   const [text, setText] = useState("");
//   const [feedback, setFeedback] = useState("");

//   const MAX_FILE_SIZE_MB = 5;

//   // Extract text from the uploaded PDF
//   const extractText = (file) => {
//     pdfToText(file)
//       .then((extractedText) => {
//         setText(extractedText);
//         setFeedback("Text extracted successfully!");
//         onTextExtract(extractedText);
//       })
//       .catch((error) => {
//         console.error("Failed to extract text from PDF", error);
//         setFeedback("Failed to extract text from PDF. Please try again.");
//       });
//   };

//   // Handle file input
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     validateAndProcessFile(file);
//   };

//   // Handle drag-and-drop
//   const handleDrop = (event) => {
//     event.preventDefault();
//     const file = event.dataTransfer.files[0];
//     validateAndProcessFile(file);
//   };

//   const validateAndProcessFile = (file) => {
//     if (!file) {
//       setFeedback("No file selected. Please upload a PDF.");
//       return;
//     }
//     if (file.type !== "application/pdf") {
//       setFeedback("Invalid file type. Only PDF files are allowed.");
//       return;
//     }
//     if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
//       setFeedback(`File size exceeds ${MAX_FILE_SIZE_MB} MB. Please upload a smaller file.`);
//       return;
//     }

//     setFeedback("Processing file...");
//     extractText(file);
//   };

//   return (
//     <div className="pdf-extractor">
//       <div
//         className="drag-drop-area"
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={handleDrop}
//       >
//         <p>Drag and drop your PDF file here, or click to upload.</p>
//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={handleFileChange}
//           style={{ display: "none" }}
//           id="fileInput"
//         />
//         <label htmlFor="fileInput" className="file-upload-button">
//           Choose File
//         </label>
//       </div>

//       {feedback && <p className="feedback">{feedback}</p>}

//       <textarea
//         value={text}
//         readOnly
//         rows="10"
//         cols="50"
//         style={{ width: "100%", marginTop: "20px" }}
//       />
//     </div>
//   );
// }

// export default PDFTextExtractor;


// import React, { useState } from "react";
// import pdfToText from "react-pdftotext";
// import "./PDFTextExtractor.css";

// function PDFTextExtractor({ onTextExtract }) {
//   const [text, setText] = useState("");
//   const [feedback, setFeedback] = useState("");

//   const MAX_FILE_SIZE_MB = 5;

//   const extractText = (file) => {
//     pdfToText(file)
//       .then((extractedText) => {
//         setText(extractedText);
//         setFeedback("Text extracted successfully!");
//         onTextExtract(extractedText);
//       })
//       .catch((error) => {
//         console.error("Failed to extract text from PDF", error);
//         setFeedback("Failed to extract text from PDF. Please try again.");
//       });
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     validateAndProcessFile(file);
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const file = event.dataTransfer.files[0];
//     validateAndProcessFile(file);
//   };

//   const validateAndProcessFile = (file) => {
//     if (!file) {
//       setFeedback("No file selected. Please upload a PDF.");
//       return;
//     }
//     if (file.type !== "application/pdf") {
//       setFeedback("Invalid file type. Only PDF files are allowed.");
//       return;
//     }
//     if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
//       setFeedback(`File size exceeds ${MAX_FILE_SIZE_MB} MB. Please upload a smaller file.`);
//       return;
//     }

//     setFeedback("Processing file...");
//     extractText(file);
//   };

//   return (
//     <div className="pdf-extractor">
//       <div
//         className="drag-drop-area"
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={handleDrop}
//       >
//         <p>Drag and drop your PDF file here, or click to upload.</p>
//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={handleFileChange}
//           style={{ display: "none" }}
//           id="fileInput"
//         />
//         <label htmlFor="fileInput" className="file-upload-button">
//           Choose File
//         </label>
//       </div>

//       {feedback && <p className="feedback">{feedback}</p>}

//       <textarea
//         value={text}
//         readOnly
//         rows="10"
//         cols="50"
//         style={{ width: "100%", marginTop: "20px" }}
//       />
//     </div>
//   );
// }

// export default PDFTextExtractor;

import React, { useState } from "react";
import pdfToText from "react-pdftotext";
import "./PDFTextExtractor.css";

function PDFTextExtractor({ onTextExtract }) {
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState("");

  const MAX_FILE_SIZE_MB = 5;

  // Function to extract name and contact number
  const extractDetails = (text) => {
    // Regex for extracting name (basic pattern for full name)
    const nameRegex = /\b([A-Z][a-z]+\s[A-Z][a-z]+)\b/;
    const nameMatch = text.match(nameRegex);
    const name = nameMatch ? nameMatch[0] : "Name not found";

    // Regex for extracting phone numbers
    const phoneRegex = /\b(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}\b/;
    const phoneMatch = text.match(phoneRegex);
    const contactNo = phoneMatch ? phoneMatch[0] : "Contact number not found";

    return { name, contactNo };
  };

  const extractText = (file) => {
    pdfToText(file)
      .then((extractedText) => {
        const { name, contactNo } = extractDetails(extractedText);
        setText(extractedText);
        setFeedback("Text extracted successfully!");
        onTextExtract(extractedText, name, contactNo);
      })
      .catch((error) => {
        console.error("Failed to extract text from PDF", error);
        setFeedback("Failed to extract text from PDF. Please try again.");
      });
  };

  const validateAndProcessFile = (file) => {
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
    extractText(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    validateAndProcessFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    validateAndProcessFile(file);
  };

  return (
    <div className="pdf-extractor">
      <div
        className="drag-drop-area"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <p>Drag and drop your PDF file here, or click to upload.</p>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="fileInput"
        />
        <label htmlFor="fileInput" className="file-upload-button">
          Choose File
        </label>
      </div>

      {feedback && <p className="feedback">{feedback}</p>}
      <textarea
        value={text}
        readOnly
        rows="10"
        cols="50"
        style={{ width: "100%", marginTop: "20px" }}
      />
    </div>
  );
}

export default PDFTextExtractor;
