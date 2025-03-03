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
    const { ingredients, restrictions, allergies } = req.body;
    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ error: "No ingredients provided." });
    }

    let prompt = `Generate 3 unique recipe names using these ingredients: ${ingredients.join(", ")}.`;

    if (restrictions && restrictions.length > 0) {
      prompt += ` Consider the following dietary restrictions: ${restrictions.join(", " )}.`;
    }

    if (allergies && allergies.length > 0) {
      prompt += ` And the following allergies: ${allergies.join(", " )}.`;
    }

    prompt += ` Ignore any non-edible ingredients and ensure the response is strictly formatted as JSON: {
      "recipes": ["Recipe 1", "Recipe 2", "Recipe 3"]
    }` ;

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
    res.status(500).json({ error: "Failed to fetch recipe titles", details: error.message });
  }
});

app.post("/api/getRecipeDetails", async (req, res) => {
  try {
    const { recipeTitle, restrictions, allergies } = req.body;
    if (!recipeTitle) {
      return res.status(400).json({ error: "No recipe title provided." });
    }

    let prompt = `Provide a detailed recipe for "${recipeTitle}".`;

    if (restrictions && restrictions.length > 0) {
      prompt += ` Consider the following dietary restrictions: ${restrictions.join(", " )}.`;
    }

    if (allergies && allergies.length > 0) {
      prompt += ` Avoid these allergens: ${allergies.join(", " )}.`;
    }

    prompt += `
    Ignore any non-edible ingredients like (trash, hammer, etc) and ensure the response is in valid JSON format with the following structure:
    {
      "title": "Recipe Title",
      "description": "A short description of the recipe.",
      "ingredients": ["Ingredient 1", "Ingredient 2", "..."],
      "instructions": [
        "Step 1 ...",
        "Step 2 ...",
        "Step 3 ..."
      ],
      "prep_time": "Preparation time",
      "cook_time": "Cooking time",
      "servings": "Number of servings",
      "allergies": ${(allergies)},
      "restrictions": ${(restrictions)},
    }

    Ensure "instructions" is an array where each step is a separate string.`;

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

    res.json(parsedResponse);
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    res.status(500).json({ error: "Failed to fetch recipe details", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});