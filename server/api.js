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

app.post("/api/getRecipeTitles", async (req, res) => {
  try {
    const { ingredients,restrictions,allergies } = req.body;
    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ error: "No ingredients provided." });
    }

    const prompt = `Generate 3 unique recipe names using these ingredients: ${ingredients.join(
      ", "
    )}.
    Consider the following dietary restrictions: ${restrictions.join(", ")}.
    And the following allergies: ${allergies.join(", ")}.
    Ensure the response is strictly formatted as JSON:
    {
      "recipes": ["Recipe 1", "Recipe 2", "Recipe 3"]
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    let content = response.choices[0].message.content.trim();
    if (!content.startsWith("{")) {
      content = content.substring(content.indexOf("{"));
    }

    res.json(JSON.parse(content));
  } catch (error) {
    console.error("Error fetching recipe titles:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch recipe titles", details: error.message });
  }
});

app.post("/api/getRecipeDetails", async (req, res) => {
  try {
    const { recipeTitle,restrictions,allergies } = req.body;
    if (!recipeTitle) {
      return res.status(400).json({ error: "No recipe title provided." });
    }

    const prompt = `Provide a detailed recipe for "${recipeTitle}" and based on the "${restrictions}" restrictions and "${allergies} allergies. Ensure the response is in valid JSON format. 
    IMPORTANT: "instructions" MUST be an array, with each step as a separate string. DO NOT return a single paragraph.
    
    Example:
    {
      "title": "Garlic Butter Chicken",
      "description": "A delicious garlic butter chicken recipe.",
      "ingredients": ["Chicken", "Garlic", "Butter", "Salt", "Pepper"],
      "instructions": [
        "- Melt butter in a pan over medium heat.",
        "- Add minced garlic and sauté for 1 minute.",
        "- Place chicken in the pan and cook for 6 minutes per side.",
        "- Season with salt & pepper and serve hot."
      ],
      "prep_time": "10 minutes",
      "cook_time": "20 minutes",
      "servings": 2,
      "restrictions": "Vegetarian, Gluten-Free",
      "allergies": "Dairy, Nuts",
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    let content = response.choices[0].message.content.trim();
    if (!content.startsWith("{")) {
      content = content.substring(content.indexOf("{"));
    }

    let parsedResponse = JSON.parse(content);

    if (typeof parsedResponse.instructions === "string") {
      parsedResponse.instructions = parsedResponse.instructions
        .split(/(?<=\d\.)\s+/)
        .map((step) => step.trim());
    }

    res.json(JSON.parse(content));
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    res
      .status(500)
      .json({
        error: "Failed to fetch recipe details",
        details: error.message,
      });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
