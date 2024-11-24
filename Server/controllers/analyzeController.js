// const { analyzeResume } = require("../services/groqService");

// exports.analyzeResume = async (req, res) => {
//   const { prompt, role } = req.body;

//   if (!prompt || !role) {
//     return res.status(400).json({ error: "Prompt and role are required." });
//   }

//   try {
//     const response = await analyzeResume(prompt, role);
//     res.json({ response });
//   } catch (error) {
//     console.error("Error analyzing resume:", error);
//     res.status(500).json({ error: "An error occurred while processing the request." });
//   }
// };


const { analyzeResume } = require("../services/groqService");

/**
 * Purpose:
 * - This controller function handles the API request to analyze a resume.
 * - It validates the input, interacts with a service function to process the analysis, and sends the result back to the client.

 * How it works:
 * 1. Extracts `prompt` (resume text) and `role` (job role) from the request body.
 * 2. Validates the input to ensure both `prompt` and `role` are provided. If not, it returns a `400 Bad Request` response with an error message.
 * 3. Calls the `analyzeResume` service function to perform the resume analysis.
 * 4. If successful, it sends the analysis response back to the client as JSON.
 * 5. If an error occurs during the analysis, it logs the error and returns a `500 Internal Server Error` response with an appropriate error message.
 */
exports.analyzeResume = async (req, res) => {
  const { prompt, role } = req.body;

  // Validate input
  if (!prompt || !role) {
    return res.status(400).json({ error: "Prompt and role are required." });
  }

  try {
    // Call service to analyze resume
    const response = await analyzeResume(prompt, role);

    // Send analysis response back to the client
    res.json({ response });
  } catch (error) {
    // Log the error and send an internal server error response
    console.error("Error analyzing resume:", error);
    res.status(500).json({ error: "An error occurred while processing the request." });
  }
};
