import React, { useState } from "react";
import pdfToText from "react-pdftotext";

function PDFTextExtractor({ onTextExtract }) {
  // State to store extracted text
  const [text, setText] = useState("");

  // Function to extract text from the PDF
  function extractText(event) {
    const file = event.target.files[0];
    pdfToText(file)
      .then((text) => {
        setText(text); // Store extracted text in the state
        onTextExtract(text); // Pass extracted text to parent component (App)
      })
      .catch((error) => {
        console.error("Failed to extract text from pdf", error);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <input type="file" accept="application/pdf" onChange={extractText} />
        <textarea
          value={text}
          readOnly
          rows="10"
          cols="50"
          style={{ width: "100%", marginTop: "20px" }}
        />
      </header>
    </div>
  );
}

export { PDFTextExtractor };
export default PDFTextExtractor;