import axios from "axios";

/**
 * Purpose:
 * - This function sends a request to a backend server to analyze a resume based on the given job role and prompt.
 * - It uses an environment variable (`REACT_APP_BASE_URL`) to dynamically determine the server's base URL, ensuring flexibility across different environments (e.g., development, production).

 * How it works:
 * - The function sends an HTTP POST request to the `/analyze` endpoint, appending it to the base URL.
 * - The request includes the `prompt` (resume text) and `role` (job role) as data.
 * - If successful, the server's response is returned, containing the analysis results.
 * - If an error occurs during the request, it logs the issue and throws a descriptive error message for further handling.

 */
export const analyzeResume = async (prompt, role) => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}analyze`, { prompt, role });
    return data.response; // Extract and return the response data from the server
  } catch (error) {
    console.error("Error fetching response from server:", error); // Log the error details for debugging
    throw new Error("An error occurred while fetching the response."); // Throw a meaningful error message
  }
};
