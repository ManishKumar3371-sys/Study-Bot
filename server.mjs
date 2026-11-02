import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY .env file mein nahi mili.");
  process.exit(1);
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        error: "Please enter a valid prompt.",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });

    res.json({ text: response.text });
  } catch (error) {
    console.error("Gemini API error:", error.message);

    res.status(500).json({
      error: "Gemini API request failed. Check the server terminal.",
    });
  }
});

app.listen(3001, () => {
  console.log("Backend running at http://localhost:3001");
});