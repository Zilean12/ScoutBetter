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

// import React, { useState } from "react";
// import pdfToText from "react-pdftotext";
// import "./PDFTextExtractor.css";

// function PDFTextExtractor({ onTextExtract }) {
//     const [text, setText] = useState("");
//    const [feedback, setFeedback] = useState("");

//   const MAX_FILE_SIZE_MB = 5;

//   // Function to extract name and contact number
//   const extractDetails = (text) => {
//     // Regex for extracting name (basic pattern for full name)
//     const nameRegex = /\b([A-Z][a-z]+\s[A-Z][a-z]+)\b/;
//     const nameMatch = text.match(nameRegex);
//     const name = nameMatch ? nameMatch[0] : "Name not found";

//     // Regex for extracting phone numbers
//     const phoneRegex = /\b(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}\b/;
//     const phoneMatch = text.match(phoneRegex);
//     const contactNo = phoneMatch ? phoneMatch[0] : "Contact number not found";

//     return { name, contactNo };
//   };

//   const extractText = (file) => {
//     pdfToText(file)
//       .then((extractedText) => {
//         const { name, contactNo } = extractDetails(extractedText);
//         setText(extractedText);
//         setFeedback("Text extracted successfully!");
//         onTextExtract(extractedText, name, contactNo);
//       })
//       .catch((error) => {
//         console.error("Failed to extract text from PDF", error);
//         setFeedback("Failed to extract text from PDF. Please try again.");
//       });
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

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     validateAndProcessFile(file);
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const file = event.dataTransfer.files[0];
//     validateAndProcessFile(file);
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

// function PDFTextExtractor({ onTextExtract }) {
//   const [texts, setTexts] = useState([]); // Now useState is defined
//   const [feedback, setFeedback] = useState("");

//   const MAX_FILE_SIZE_MB = 5;

  // Function to extract name and contact number
  // const extractDetails = (text) => {
  //   const nameRegex = /\b([A-Z][a-z]+\s[A-Z][a-z]+)\b/;
  //   const nameMatch = text.match(nameRegex);
  //   const name = nameMatch ? nameMatch[0] : "Name not found";

  //   const phoneRegex = /\b(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}\b/;
  //   const phoneMatch = text.match(phoneRegex);
  //   const contactNo = phoneMatch ? phoneMatch[0] : "Contact number not found";

  //   return { name, contactNo };
  // };

//   const extractText = (file) => {
//     pdfToText(file)
//       .then((extractedText) => {
//         // const { name, contactNo } = extractDetails(extractedText);
//         setTexts((prevTexts) => [
//           ...prevTexts,
//           { extractedText},
//         ]);
//         setFeedback("Text extracted successfully!");
//         onTextExtract(extractedText);
//       })
//       .catch((error) => {
//         console.error("Failed to extract text from PDF", error);
//         setFeedback("Failed to extract text from PDF. Please try again.");
//       });
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

//   const handleFileChange = (event) => {
//     const files = event.target.files;
//     if (files) {
//       Array.from(files).forEach(validateAndProcessFile);
//     }
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const files = event.dataTransfer.files;
//     if (files) {
//       Array.from(files).forEach(validateAndProcessFile);
//     }
//   };

//   return (
//     <div className="pdf-extractor max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-100 to-blue-50 shadow-2xl rounded-lg">
//       <div
//         className="drag-drop-area border-4 border-dashed border-indigo-500 p-8 text-center rounded-xl cursor-pointer transition-all hover:border-indigo-700 hover:bg-indigo-50"
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={handleDrop}
//       >
//         <p className="text-gray-700 font-semibold text-lg mb-5">Drag and drop your PDF files here, or click to upload.</p>
//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={handleFileChange}
//           multiple
//           style={{ display: "none" }}
//           id="fileInput"
//         />
//         <label
//           htmlFor="fileInput"
//           className="file-upload-button inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg text-xl font-semibold shadow-md cursor-pointer transform transition-transform duration-200 hover:scale-105"
//         >
//           Choose Files
//         </label>
//       </div>

//       {feedback && (
//         <p
//           className={`feedback mt-4 text-center p-3 rounded-md ${feedback.includes("successfully") ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}
//         >
//           {feedback}
//         </p>
//       )}

//       {texts.length > 0 && (
//         <div className="mt-6">
//           <h4>Extracted Text from Files:</h4>
//           {texts.map((textData, index) => (
//             <div key={index} className="mt-4">
//               <h5>File {index + 1}:</h5>
//               <textarea
//                 value={textData.extractedText}
//                 readOnly
//                 rows="12"
//                 className="w-full p-5 border rounded-lg bg-white text-gray-700 shadow-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
//                 style={{ height: "250px" }}
//               />
//               <p className="mt-2"><strong>Name:</strong> {textData.name}</p>
//               <p><strong>Contact Number:</strong> {textData.contactNo}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default PDFTextExtractor;

// import React, { useState } from "react"; 
// import pdfToText from "react-pdftotext";

// function PDFTextExtractor({ onTextExtract }) {
//   const [texts, setTexts] = useState(""); // Use a single string to accumulate all texts
//   const [feedback, setFeedback] = useState("");

//   const MAX_FILE_SIZE_MB = 5;

//   const extractText = (file, index) => {
//     pdfToText(file)
//       .then((extractedText) => {
//         // Format the text for this specific file
//         const formattedText = `[resume ${index + 1}]\n${extractedText}\n[end of resume ${index + 1}]`;

//         // Append the formatted text to the existing content
//         setTexts((prevTexts) => prevTexts + "\n" + formattedText);

//         setFeedback("Text extracted successfully!");
//         onTextExtract(formattedText); // Optionally call the callback for each file (can be modified as per your needs)
//       })
//       .catch((error) => {
//         console.error("Failed to extract text from PDF", error);
//         setFeedback("Failed to extract text from PDF. Please try again.");
//       });
//   };

//   const validateAndProcessFile = (file, index) => {
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
//     extractText(file, index);
//   };

//   const handleFileChange = (event) => {
//     const files = event.target.files;
//     if (files) {
//       Array.from(files).forEach((file, index) => validateAndProcessFile(file, index));
//     }
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const files = event.dataTransfer.files;
//     if (files) {
//       Array.from(files).forEach((file, index) => validateAndProcessFile(file, index));
//     }
//   };

//   return (
//     <div className="pdf-extractor max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-100 to-blue-50 shadow-2xl rounded-lg">
//       <div
//         className="drag-drop-area border-4 border-dashed border-indigo-500 p-8 text-center rounded-xl cursor-pointer transition-all hover:border-indigo-700 hover:bg-indigo-50"
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={handleDrop}
//       >
//         <p className="text-gray-700 font-semibold text-lg mb-5">Drag and drop your PDF files here, or click to upload.</p>
//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={handleFileChange}
//           multiple
//           style={{ display: "none" }}
//           id="fileInput"
//         />
//         <label
//           htmlFor="fileInput"
//           className="file-upload-button inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg text-xl font-semibold shadow-md cursor-pointer transform transition-transform duration-200 hover:scale-105"
//         >
//           Choose Files
//         </label>
//       </div>

//       {feedback && (
//         <p
//           className={`feedback mt-4 text-center p-3 rounded-md ${feedback.includes("successfully") ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}
//         >
//           {feedback}
//         </p>
//       )}

//       {texts && (
//         <div className="mt-6">
//           <h4>Extracted Text from Files:</h4>
//           <textarea
//             value={texts} // Display all extracted text in one textarea
//             readOnly
//             rows="12"
//             className="w-full p-5 border rounded-lg bg-white text-gray-700 shadow-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
//             style={{ height: "250px" }}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default PDFTextExtractor;

// import React, { useState } from "react"; 
// import pdfToText from "react-pdftotext"; 

// function PDFTextExtractor({ onTextExtract }) {
//   const [texts, setTexts] = useState(""); 
//   const [feedback, setFeedback] = useState("");

//   const MAX_FILE_SIZE_MB = 5;

//   const extractText = (file, index) => {
//     pdfToText(file)
//       .then((extractedText) => {
//         const formattedText = `[resume ${index + 1}]\n${extractedText}\n[end of resume ${index + 1}]`;
//         setTexts((prevTexts) => prevTexts + "\n" + formattedText);
//         setFeedback("Text extracted successfully!");
//         onTextExtract(formattedText);
//       })
//       .catch((error) => {
//         console.error("Failed to extract text from PDF", error);
//         setFeedback("Failed to extract text from PDF. Please try again.");
//       });
//   };

//   const validateAndProcessFile = (file, index) => {
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
//     extractText(file, index);
//   };

//   const handleFileChange = (event) => {
//     const files = event.target.files;
//     if (files) {
//       Array.from(files).forEach((file, index) => validateAndProcessFile(file, index));
//     }
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const files = event.dataTransfer.files;
//     if (files) {
//       Array.from(files).forEach((file, index) => validateAndProcessFile(file, index));
//     }
//   };

//   return (
//     <div className="pdf-extractor max-w-4xl mx-auto p-12 bg-gradient-to-r from-blue-100 to-blue-50 shadow-2xl rounded-lg">
//       <div
//         className="drag-drop-area border-4 border-dashed border-indigo-500 p-12 text-center rounded-xl cursor-pointer transition-all hover:border-indigo-700 hover:bg-indigo-50"
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={handleDrop}
//       >
//         <p className="text-gray-700 font-semibold text-lg mb-8">Drag and drop your PDF files here, or click to upload.</p>
//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={handleFileChange}
//           multiple
//           style={{ display: "none" }}
//           id="fileInput"
//         />
//         <label
//           htmlFor="fileInput"
//           className="file-upload-button inline-block px-8 py-4 bg-indigo-600 text-white rounded-lg text-xl font-semibold shadow-md cursor-pointer transform transition-transform duration-200 hover:scale-105"
//         >
//           Choose Files
//         </label>
//       </div>

//       {feedback && (
//         <p
//           className={`feedback mt-8 text-center p-4 rounded-md ${feedback.includes("successfully") ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}
//         >
//           {feedback}
//         </p>
//       )}

//       {texts && (
//         <div className="mt-8">
//           <h4 className="text-xl font-bold mb-4">Extracted Text from Files:</h4>
//           <textarea
//             value={texts}
//             readOnly
//             rows="12"
//             className="w-full p-6 border rounded-lg bg-white text-gray-700 shadow-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
//             style={{ height: "250px" }}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default PDFTextExtractor;

import React, { useState } from "react";
import pdfToText from "react-pdftotext";

function PDFTextExtractor({ onTextExtract }) {
  const [texts, setTexts] = useState("");
  const [feedback, setFeedback] = useState("");

  const MAX_FILE_SIZE_MB = 5;

  const extractText = (file, index) => {
    pdfToText(file)
      .then((extractedText) => {
        const formattedText = `[resume ${index + 1}]\n${extractedText}\n[end of resume ${index + 1}]`;
        setTexts((prevTexts) => prevTexts + "\n" + formattedText);
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
    <div className="pdf-extractor max-w-4xl mx-auto p-12 bg-gradient-to-r from-indigo-100 to-blue-100 shadow-xl rounded-lg">
      <div
        className="drag-drop-area border-4 border-dashed border-indigo-500 p-12 text-center rounded-xl cursor-pointer transition-all hover:border-indigo-600 hover:bg-indigo-50"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <p className="text-gray-700 font-semibold text-lg mb-8">
          Drag and drop your PDF files here, or click to upload.
        </p>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          multiple
          style={{ display: "none" }}
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="file-upload-button inline-block px-8 py-4 bg-indigo-600 text-white rounded-lg text-xl font-semibold shadow-md cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:bg-indigo-700"
        >
          Choose Files
        </label>
      </div>

      {feedback && (
        <p
          className={`feedback mt-8 text-center p-4 rounded-md ${
            feedback.includes("successfully")
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {feedback}
        </p>
      )}

      {texts && (
        <div className="mt-8">
          <h4 className="text-xl font-bold mb-4">Extracted Text from Files:</h4>
          <textarea
            value={texts}
            readOnly
            rows="12"
            className="w-full p-6 border rounded-lg bg-white text-gray-700 shadow-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            style={{ height: "250px" }}
          />
        </div>
      )}
    </div>
  );
}

export default PDFTextExtractor;
