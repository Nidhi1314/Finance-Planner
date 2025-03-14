import { Router } from "express";
import { post } from "axios";

const router = Router();

const FLASK_SERVER_URL = "http://127.0.0.1:5000"; // Flask API URL

// Route to send data to Flask API and get predictions
router.post("/predict", async (req, res) => {
  try {
    const response = await post(`${FLASK_SERVER_URL}/predict`, req.body);
    res.json(response.data); // Send ML prediction response to frontend
  } catch (error) {
    console.error("Error calling Flask API:", error.message);
    res.status(500).json({ error: "Failed to connect to ML server" });
  }
});

export default router;
