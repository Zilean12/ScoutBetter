
import { jsPDF } from "jspdf";

/**
 * Purpose:
 * The `generatePDFReport` function generates a comprehensive PDF report of a resume analysis. 
 * This report includes sections such as the job role, analysis, resume score, project details, 
 * certifications, strengths and weaknesses, and a footer. It formats the text appropriately and handles 
 * pagination if the content exceeds one page.
 * 
 * This function is used to provide a downloadable, printable resume analysis report that can be shared with candidates.
 * 
 * Parameters:
 * - resumeText: The text content of the resume.
 * - role: The job role for which the resume is being analyzed.
 * - analysisData: An object containing the resume analysis, score, strengths, weaknesses, projects, certifications, etc.
 * - username: The name of the candidate (used in the filename for the PDF).
 * - contactNo: The candidate's contact number (not currently used in this function but can be added to the report if needed).
 */
export const generatePDFReport = (resumeText, role, analysisData, username, contactNo) => {
  const doc = new jsPDF(); // Create a new jsPDF instance
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20; // Margin for the document
  const lineHeight = 14; // Line height for text
  const titleFontSize = 24; // Larger title font size for more impact
  const sectionHeadingFontSize = 18; // Larger font for section headings
  const normalFontSize = 12; // Standard text font size
  const subTextFontSize = 10; // Footer font size
  const sectionSpacing = 10; // Extra space between sections
  let cursorY = margin; // Track the vertical position of text

  // Helper function to add a new page if the current one is full
  const addNewPageIfNeeded = () => {
    if (cursorY + lineHeight > pageHeight - margin) {
      doc.addPage(); // Add a new page
      cursorY = margin; // Reset the cursor position
    }
  };

  // Add a custom title with bold and larger font
  doc.setFont("helvetica", "bold");
  doc.setFontSize(titleFontSize);
  const title = "Resume Analysis Report";
  const titleWidth = doc.getTextWidth(title);
  const titleX = (pageWidth - titleWidth) / 2; // Centered title
  doc.text(title, titleX, cursorY);
  cursorY += lineHeight * 2; // Add extra space after the title

  // Add the job role section with title and role value
  doc.setFontSize(sectionHeadingFontSize);
  doc.setFont("helvetica", "bold");
  doc.text("Job Role:", margin, cursorY);
  doc.setFont("helvetica", "italic");
  doc.text(role, margin + 40, cursorY); // Indented value for role
  cursorY += lineHeight * 1.5; // Add space after the role

  // Add horizontal line to separate sections
  doc.setLineWidth(0.5);
  doc.line(margin, cursorY, pageWidth - margin, cursorY);
  cursorY += sectionSpacing; // Space below the line

  // Add the analysis section
  doc.setFontSize(sectionHeadingFontSize);
  doc.setFont("helvetica", "bold");
  doc.text("Analysis:", margin, cursorY);
  cursorY += sectionSpacing;

  // Split analysis text into lines that fit within the page width and apply formatting
  doc.setFontSize(normalFontSize);
  doc.setFont("helvetica", "normal");
  const analysisLines = doc.splitTextToSize(analysisData.analysis, pageWidth - 2 * margin);
  analysisLines.forEach((line) => {
    addNewPageIfNeeded();
    doc.text(line, margin, cursorY);
    cursorY += lineHeight;
  });

  cursorY += sectionSpacing;

  // Add resume score section
  doc.setFontSize(sectionHeadingFontSize);
  addNewPageIfNeeded();
  doc.setFont("helvetica", "bold");
  doc.text("Resume Score:", margin, cursorY);
  cursorY += lineHeight;

  doc.setFontSize(normalFontSize);
  doc.setFont("helvetica", "normal");
  doc.text(`Score: ${analysisData.score}/100`, margin + 40, cursorY); // Indented score
  cursorY += sectionSpacing;

  // Add horizontal line for visual separation
  doc.setLineWidth(0.5);
  doc.line(margin, cursorY, pageWidth - margin, cursorY);
  cursorY += sectionSpacing; // Space below the line

  // Add project details (if available)
  if (analysisData.projects) {
    addNewPageIfNeeded();
    doc.setFontSize(sectionHeadingFontSize);
    doc.setFont("helvetica", "bold");
    doc.text("Project Details:", margin, cursorY);
    cursorY += sectionSpacing;

    analysisData.projects.forEach((project) => {
      if (project.name) {
        doc.setFontSize(normalFontSize);
        doc.setFont("helvetica", "bold");
        doc.text(`**${project.name}**`, margin, cursorY);
        cursorY += lineHeight;

        if (project.strengths) {
          doc.setFont("helvetica", "normal");
          const strengthsText = `Strengths: ${project.strengths}`;
          const strengthsLines = doc.splitTextToSize(strengthsText, pageWidth - 2 * margin);
          strengthsLines.forEach((line) => {
            addNewPageIfNeeded();
            doc.text(line, margin + 10, cursorY); // Indented for better readability
            cursorY += lineHeight;
          });
        }

        if (project.weaknesses) {
          doc.setFont("helvetica", "normal");
          const weaknessesText = `Weaknesses: ${project.weaknesses}`;
          const weaknessesLines = doc.splitTextToSize(weaknessesText, pageWidth - 2 * margin);
          weaknessesLines.forEach((line) => {
            addNewPageIfNeeded();
            doc.text(line, margin + 10, cursorY); // Indented for better readability
            cursorY += lineHeight;
          });
        }
      }
    });
  }

  // Add certifications (if available)
  if (analysisData.certifications) {
    addNewPageIfNeeded();
    doc.setFontSize(sectionHeadingFontSize);
    doc.setFont("helvetica", "bold");
    doc.text("Certifications:", margin, cursorY);
    cursorY += sectionSpacing;

    analysisData.certifications.forEach((certification) => {
      doc.setFontSize(normalFontSize);
      doc.setFont("helvetica", "bold");
      doc.text(`**${certification.name}**`, margin, cursorY);
      cursorY += lineHeight;

      if (certification.strengths) {
        doc.setFont("helvetica", "normal");
        const strengthsText = `Strengths: ${certification.strengths}`;
        const strengthsLines = doc.splitTextToSize(strengthsText, pageWidth - 2 * margin);
        strengthsLines.forEach((line) => {
          addNewPageIfNeeded();
          doc.text(line, margin + 10, cursorY); // Indented for better readability
          cursorY += lineHeight;
        });
      }

      if (certification.weaknesses) {
        doc.setFont("helvetica", "normal");
        const weaknessesText = `Weaknesses: ${certification.weaknesses}`;
        const weaknessesLines = doc.splitTextToSize(weaknessesText, pageWidth - 2 * margin);
        weaknessesLines.forEach((line) => {
          addNewPageIfNeeded();
          doc.text(line, margin + 10, cursorY); // Indented for better readability
          cursorY += lineHeight;
        });
      }
    });
  }

  // Add Strengths and Weaknesses section
  if (analysisData.strengths || analysisData.weaknesses) {
    addNewPageIfNeeded();
    doc.setFontSize(sectionHeadingFontSize);
    doc.setFont("helvetica", "bold");
    doc.text("Strengths & Weaknesses:", margin, cursorY);
    cursorY += sectionSpacing;

    // Strengths
    if (analysisData.strengths) {
      doc.setFontSize(normalFontSize);
      doc.setFont("helvetica", "normal");
      const strengthsText = `Strengths: ${analysisData.strengths.join(", ")}`;
      const strengthsLines = doc.splitTextToSize(strengthsText, pageWidth - 2 * margin);
      strengthsLines.forEach((line) => {
        addNewPageIfNeeded();
        doc.text(line, margin, cursorY);
        cursorY += lineHeight;
      });
    }

    // Weaknesses
    if (analysisData.weaknesses) {
      doc.setFontSize(normalFontSize);
      doc.setFont("helvetica", "normal");
      const weaknessesText = `Weaknesses: ${analysisData.weaknesses.join(", ")}`;
      const weaknessesLines = doc.splitTextToSize(weaknessesText, pageWidth - 2 * margin);
      weaknessesLines.forEach((line) => {
        addNewPageIfNeeded();
        doc.text(line, margin, cursorY);
        cursorY += lineHeight;
      });
    }
  }

  cursorY += sectionSpacing;

  // Add footer (optional) with smaller font and centered
  const footerText = "Generated by Resume Analyzer";
  doc.setFontSize(subTextFontSize);
  const footerY = pageHeight - margin / 2;
  for (let i = 1; i <= doc.internal.getNumberOfPages(); i++) {
    doc.setPage(i);
    const footerWidth = doc.getTextWidth(footerText);
    const footerX = (pageWidth - footerWidth) / 2;
    doc.text(footerText, footerX, footerY);
  }

  // Save the PDF with the username in the filename
  doc.save(`Resume_Analysis_Report_${username}.pdf`);
};
