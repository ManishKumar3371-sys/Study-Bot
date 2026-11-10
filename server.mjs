
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

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({
        error: "Please enter a valid prompt.",
      });
    }

    if (prompt.length > 10000) {
      return res.status(413).json({
        error: "Prompt is too long. Please keep it under 10,000 characters.",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
    });

    res.json({ text: response.text });
  } catch (error) {
    console.error("Gemini API error:", error);

    res.status(500).json({
      error: "Something went wrong. Please try again later.",
    });
  }
});

app.listen(3001, () => {
  console.log("Backend running at http://localhost:3001");
});
