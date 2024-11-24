// require("dotenv").config();
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const analyzeRoutes = require("./routes/analyzeRoutes");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Routes
// app.use("/analyze", analyzeRoutes);


// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

require("dotenv").config(); 
const express = require("express"); // Import the Express framework for building the server
const bodyParser = require("body-parser"); // Middleware to parse incoming JSON request bodies
const cors = require("cors"); // Middleware to enable Cross-Origin Resource Sharing (CORS)
const analyzeRoutes = require("./routes/analyzeRoutes"); // Import the routes for resume analysis

const app = express(); // Create an Express application instance

/**
 * Purpose:
 * - This script is the main server file for the application.
 * - It sets up and configures the server to handle incoming requests, process them, and send appropriate responses.
 * - Integrates routing, middleware, and environment variable support for flexibility and scalability.

 * How it works:
 * 1. Environment Setup:
 *    - Uses `dotenv` to load environment variables from the `.env` file (e.g., PORT).
 * 
 * 2. Middleware:
 *    - `cors`: Allows the server to handle requests from different origins (enables communication between frontend and backend).
 *    - `bodyParser.json`: Parses incoming JSON data in request bodies for easy access.
 * 
 * 3. Routes:
 *    - The `/analyze` route handles all requests related to resume analysis, delegating them to `analyzeRoutes`.
 * 
 * 4. Server Initialization:
 *    - Starts the server on a specified port (from environment variables or default to 5000).
 *    - Logs a message indicating the server is running.
 */

// Middleware to enable CORS for cross-origin requests
app.use(cors());


// Configure CORS to allow requests from your Netlify domain and localhost
app.use(cors({
  origin: ['https://resume-analyzer123.netlify.app', 'http://localhost:3000']}))


// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define routes for the application
app.use("/analyze", analyzeRoutes);

// Start the server and listen on the specified port
const PORT = 5000; // Port is taken from the .env file or defaults to 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log a message to indicate server is up
});
