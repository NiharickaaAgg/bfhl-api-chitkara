import express from "express";
import dotenv from "dotenv";
import { askAI } from "./utils/ai.js";
import { fibonacci, isPrime, gcd } from "./utils/math.js";

dotenv.config();

const app = express();
app.use(express.json());

const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL;
const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: OFFICIAL_EMAIL
  });
});

app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;
    const keys = Object.keys(body);

    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        official_email: OFFICIAL_EMAIL
      });
    }

    const key = keys[0];
    let data;

    if (key === "fibonacci") {
      data = fibonacci(Number(body[key]));
    } 
    else if (key === "prime") {
      data = body[key].filter(isPrime);
    } 
    else if (key === "lcm") {
      data = body[key].reduce((a, b) => (a * b) / gcd(a, b));
    } 
    else if (key === "hcf") {
      data = body[key].reduce((a, b) => gcd(a, b));
    } 
    else if (key === "AI") {
      try {
        const aiText = await askAI(body[key]);
        data = aiText.split(/\s+/)[0]; 
      } catch {
        data = "Unavailable";
      }
    } 
    else {
      return res.status(400).json({
        is_success: false,
        official_email: OFFICIAL_EMAIL
      });
    }

    res.status(200).json({
      is_success: true,
      official_email: OFFICIAL_EMAIL,
      data
    });

  } catch {
    res.status(500).json({
      is_success: false,
      official_email: OFFICIAL_EMAIL
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});