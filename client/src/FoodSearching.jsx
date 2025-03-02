import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css";

export default function FoodSearching() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipeTitles, setRecipeTitles] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const { restrictions, allergies } = location.state || {};

  const availableIngredients = [
    "Chicken",
    "Garlic",
    "Butter",
    "Mushroom",
    "Salmon",
    "Pasta",
    "Lemon",
    "Herbs",
    "Rice",
    "Tomato",
    "Cheese",
    "Onion",
    "Carrot",
  ];

  async function handleIngredientSelect(event, index) {
    const selected = event.target.value;
    if (selected && !selectedIngredients.includes(selected)) {
      const newIngredients = [...selectedIngredients];
      newIngredients[index] = selected;
      setSelectedIngredients(newIngredients);
    }
  }

  function removeIngredient(index) {
    const newIngredients = selectedIngredients.filter((_, i) => i !== index);
    setSelectedIngredients(newIngredients);
  }

  async function fetchRecipeTitles() {
    if (selectedIngredients.length === 0) {
      setError("Please select at least one ingredient.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/getRecipeTitles",
        {
          ingredients: selectedIngredients,
          restrictions: restrictions,
          allergies: allergies,
        }
      );

      setRecipeTitles(response.data.recipes);
      setRecipeDetails(null);
    } catch (error) {
      setError("Error: Unable to fetch recipes.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchRecipeDetails(title) {
    setSelectedRecipe(title);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/getRecipeDetails",
        {
          recipeTitle: title,
          restrictions: restrictions,
          allergies: allergies,
        }
      );

      setRecipeDetails(response.data);
    } catch (error) {
      setError("Error: Unable to fetch recipe details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="text-white p-4 bg-gray-800 min-h-screen w-full flex flex-col items-center gap-4">
      <div className="text-3xl">Nutreazy</div>

      <div className="mt-4 w-full max-w-xl">
        <h2 className="font-semibold">Select Ingredients:</h2>

        {selectedIngredients.map((ingredient, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <select
              value={ingredient}
              onChange={(event) => handleIngredientSelect(event, index)}
              className="p-2 border rounded bg-gray-200 text-black"
            >
              <option value="">Select an ingredient</option>
              {availableIngredients
                .filter(
                  (item) =>
                    !selectedIngredients.includes(item) || item === ingredient
                )
                .map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
            </select>
            <button
              onClick={() => removeIngredient(index)}
              className="p-2 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          onClick={() => setSelectedIngredients([...selectedIngredients, ""])}
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Add Ingredient
        </button>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Selected Ingredients:</h3>
        <p>
          {selectedIngredients.filter(Boolean).join(", ") || "None selected"}
        </p>
      </div>

      <button
        onClick={fetchRecipeTitles}
        disabled={selectedIngredients.length === 0 || loading}
        className="mt-4 p-2 bg-green-500 text-white rounded-lg disabled:bg-gray-600"
      >
        {loading ? "Processing..." : "Create Recipe"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="mt-4 w-full max-w-xl">
        <h2 className="font-semibold">Recipe Suggestions:</h2>
        <div className="flex flex-col gap-2">
          {recipeTitles.map((title, index) => (
            <button
              key={index}
              onClick={() => fetchRecipeDetails(title)}
              className="p-2 border rounded bg-blue-100 hover:bg-blue-200 text-black"
            >
              {title}
            </button>
          ))}
        </div>
      </div>

      {recipeDetails && (
        <div className="mt-4 p-4 bg-gray-700 rounded-lg shadow-lg w-full max-w-xl">
          <h2 className="text-lg font-bold">{recipeDetails.title}</h2>
          <p>
            <strong>Description:</strong> {recipeDetails.description}
          </p>
          <p>
            <strong>Prep Time:</strong> {recipeDetails.prep_time}
          </p>
          <p>
            <strong>Cook Time:</strong> {recipeDetails.cook_time}
          </p>
          <p>
            <strong>Servings:</strong> {recipeDetails.servings}
          </p>
          <p>
            <strong>Restrictions:</strong> {recipeDetails.restrictions}
          </p>
          <p>
            <strong>Allergents:</strong> {recipeDetails.allergies}
          </p>

          <h3 className="font-semibold mt-2">Ingredients:</h3>
          <ul className="list-disc pl-5">
            {recipeDetails.ingredients.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h3 className="font-semibold mt-2">Instructions:</h3>
          <ol className="list-decimal pl-5">
            {recipeDetails.instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
