import { Router } from "express";
import axios from "axios";

const router = Router();

const FLASK_SERVER_URL = "http://localhost:6001"; // Flask API URL

// Route to send data to Flask API and get predictionspyth
router.post("/predict", async (req, res) => {
  try {
    const { fileUrl } = req.body;
    if (!req.body.fileUrl) {
      return res.status(400).json({ error: "Missing fileUrl in request body" });
    }
    const response = await axios.post(`${FLASK_SERVER_URL}/api/ml/predict`, {fileUrl});
    console.log("Received response from Flask API:", response.data);
    res.json(response.data); // Send ML prediction response to frontend
  } catch (error) {
    console.error("Error calling Flask API:", error.message);
    res.status(500).json({ error: "Failed to connect to ML server",
      details: error.response?.data || error.message, });
  }
});

export default router;
