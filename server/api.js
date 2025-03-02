import express from "express";
import cors from "cors";
import { OpenAI } from "openai";
import dotenv from "dotenv";
import fs from "fs";
import csvParser from "csv-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5001;

const openai = new OpenAI({
  apiKey: process.env.GPT_API_KEY,
});

const validIngredients = new Set();
fs.createReadStream("./ingredients.csv")
  .pipe(csvParser())
  .on("data", (row) => {
    if (row.ingredients) {
      validIngredients.add(row.ingredients.toLowerCase().trim());
    }
  })
  .on("end", () => {
    console.log(
      "CSV file successfully processed. Valid ingredients count:",
      validIngredients.size
    );
  });

const bannedWords = [
  "trash",
  "hammer",
  "plastic",
  "metal",
  "rock",
  "dirt",
  "soil",
  "macbook",
  "laptop",
  "computer",
  "iphone",
  "tablet",
  "charger",
  "exhaust",
  "racing",
  "sony",
  "xm5",
  "headphone",
  "headphones",
];

function containsBannedWord(text) {
  const lowerText = text.toLowerCase();
  return bannedWords.some((word) => {
    const regex = new RegExp(`\\b${word}\\b`, "i");
    return regex.test(lowerText);
  });
}

function sanitizeIngredients(ingredients) {
  let filtered = ingredients.filter((ing) => !containsBannedWord(ing));
  console.log("After banned words filtering:", filtered);
  filtered = filtered.filter((ing) =>
    validIngredients.has(ing.toLowerCase().trim())
  );
  console.log("After CSV validation filtering:", filtered);
  return filtered;
}

app.post("/api/getRecipeTitles", async (req, res) => {
  try {
    let { ingredients, restrictions, allergies } = req.body;
    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ error: "No ingredients provided." });
    }

    const filteredIngredients = sanitizeIngredients(ingredients);
    if (filteredIngredients.length === 0) {
      return res
        .status(400)
        .json({ error: "No valid edible ingredients provided." });
    }
    const ingredientsStr = filteredIngredients.join(", ");
    console.log("Final sanitized ingredients:", ingredientsStr);

    let prompt = `Generate 3 unique recipe names using these edible ingredients: ${ingredientsStr}.
Only consider ingredients common in kitchens or grocery stores. Do not include or base the recipe on any non-food items (e.g., "racing exhaust", "macbook air m1", "sony xm5", etc.).`;

    if (restrictions && restrictions.length > 0) {
      prompt += ` Consider the following dietary restrictions: ${restrictions.join(
        ", "
      )}.`;
    }
    if (allergies && allergies.length > 0) {
      prompt += ` And the following allergies: ${allergies.join(", ")}.`;
    }

    prompt += ` Ensure the response is strictly formatted as JSON:
{
  "recipes": ["Recipe 1", "Recipe 2", "Recipe 3"]
}`;

    console.log("Prompt for GPT (titles):", prompt);

    const apiResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    let content = apiResponse.choices[0].message.content.trim();
    console.log("Raw GPT response (titles):", content);
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
    const { recipeTitle, restrictions, allergies } = req.body;
    if (!recipeTitle) {
      return res.status(400).json({ error: "No recipe title provided." });
    }

    if (containsBannedWord(recipeTitle)) {
      return res.status(400).json({ error: "Invalid recipe title provided." });
    }

    let prompt = `Provide a detailed recipe for "${recipeTitle}".`;
    if (restrictions && restrictions.length > 0) {
      prompt += ` Consider the following dietary restrictions: ${restrictions.join(
        ", "
      )}.`;
    }
    if (allergies && allergies.length > 0) {
      prompt += ` Avoid these allergens: ${allergies.join(", ")}.`;
    }
    prompt += `
Ignore any non-edible ingredients (e.g., trash, hammer, etc.) and ensure the response is in valid JSON format with the following structure:
{
  "title": "Recipe Title",
  "description": "A short description of the recipe.",
  "ingredients": ["Ingredient 1", "Ingredient 2", "..."],
  "instructions": [
    "Step 1: ...",
    "Step 2: ...",
    "Step 3: ..."
  ],
  "prep_time": "Preparation time",
  "cook_time": "Cooking time",
  "servings": "Number of servings",
  "allergies": "${
    allergies && allergies.length > 0 ? allergies.join(", ") : "None"
  }",
  "restrictions": "${
    restrictions && restrictions.length > 0 ? restrictions.join(", ") : "None"
  }"
}

Ensure "instructions" is an array where each step is a separate string.`;

    console.log("Prompt for GPT (details):", prompt);

    const apiResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    let content = apiResponse.choices[0].message.content.trim();
    console.log("Raw GPT response (details):", content);
    if (!content.startsWith("{")) {
      content = content.substring(content.indexOf("{"));
    }
    let parsedResponse = JSON.parse(content);
    if (typeof parsedResponse.instructions === "string") {
      parsedResponse.instructions = parsedResponse.instructions
        .split(/\s*\d+\.\s*/)
        .map((step) => step.trim())
        .filter((step) => step.length > 0);
    }
    res.json(parsedResponse);
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    res.status(500).json({
      error: "Failed to fetch recipe details",
      details: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
