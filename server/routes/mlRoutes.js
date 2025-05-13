import { Router } from "express";
import axios from "axios";

const router = Router();

const FLASK_SERVER_URL = "http://127.0.0.1:5000"; // Flask API URL

// Route to send data to Flask API and get predictions
router.post("/predict", async (req, res) => {
  try {
    console.log("Sending data to Flask API for prediction...");
    const response = await axios.post(`${FLASK_SERVER_URL}/api/ml/predict`, req.body);

    console.log("Prediction received from Flask API:");
    console.log(response.data); // Log the actual prediction data

    res.json(response.data); // Send ML prediction response to frontend
  } catch (error) {
    console.error("Error calling Flask API:", error.message);
    res.status(500).json({ error: "Failed to connect to ML server" });
  }
});

export default router;
