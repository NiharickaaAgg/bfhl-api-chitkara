import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const askAI = async (question) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const body = {
    contents: [
      {
        parts: [{ text: `Give answer in one word for this question${question}` }]
      }
    ]
  };

  const res = await axios.post(url, body, {
    headers: { "Content-Type": "application/json" },
    timeout: 10000
  });

  const parts = res.data?.candidates?.[0]?.content?.parts;
  if (!parts || parts.length === 0) throw new Error("No AI text");

  return parts.map(p => p.text).join(" ").trim();
};