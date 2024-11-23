const express = require("express");
const { analyzeResume } = require("../controllers/analyzeController");

const router = express.Router();

// POST /analyze
router.post("/", analyzeResume);

module.exports = router;
