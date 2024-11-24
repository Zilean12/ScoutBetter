// const express = require("express");
// const { analyzeResume } = require("../controllers/analyzeController");

// const router = express.Router();

// // POST /analyze
// router.post("/", analyzeResume);

// module.exports = router;


// const express = require("express");
// const { analyzeResume } = require("../controllers/analyzeController");

// const router = express.Router();

// // POST /analyze
// router.post("/", analyzeResume);

// module.exports = router;

const express = require("express");
const { analyzeResume } = require("../controllers/analyzeController");

const router = express.Router();

/**
 * Purpose:
 * - This file defines the routing logic for handling requests related to resume analysis.
 * - It sets up an endpoint that connects incoming HTTP POST requests to the appropriate controller function.

 * How it works:
 * 1. Imports the Express framework and the `analyzeResume` controller function.
 * 2. Creates a new router instance using `express.Router()`.
 * 3. Defines a POST endpoint (`/`) that triggers the `analyzeResume` function to process resume analysis.
 * 4. Exports the router so it can be used in the main server setup to handle routes under a specific path (e.g., `/analyze`).
 */

// POST /analyze route for analyzing a resume
router.post("/", analyzeResume);

// Export the router to be used in the server
module.exports = router;
