import express from "express";
import cors from "cors";
import { OpenAI } from "openai";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
const port = 5001;
app.use(cors());
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.GPT_API_KEY,
});

app.post("/api/gpt", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });
    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`running on http://localhost:${port}`);
});
