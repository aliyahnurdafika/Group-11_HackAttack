import { useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import Navbar from "./Navbar";
import "./App.css";

export default function Ingredients() {
  // Ingredient selection state
  const [selectedIngredients, setSelectedIngredients] = useState([
    //previously chicken onion etc
  ]);
  const [search, setSearch] = useState("");
  const [ingredients, setIngredients] = useState([
    //previously the checkboxes
  ]);

  // Recipe API states
  const [recipeTitles, setRecipeTitles] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Toggle selection from the suggestions list
  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  // Add new ingredient on Enter press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
      const normalizedSearch = search.trim();
      if (!ingredients.includes(normalizedSearch)) {
        setIngredients((prev) => [...prev, normalizedSearch]);
      }
      if (!selectedIngredients.includes(normalizedSearch)) {
        setSelectedIngredients((prev) => [...prev, normalizedSearch]);
      }
      setSearch("");
    }
  };

  // Fetch recipe titles from the backend API
  async function fetchRecipeTitles() {
    if (selectedIngredients.length === 0) {
      setError("Please select at least one ingredient.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/api/getRecipeTitles", {
        ingredients: selectedIngredients,
        restrictions: [],
        allergies: []
      });
      setRecipeTitles(response.data.recipes);
      setRecipeDetails(null);
    } catch (err) {
      setError("Error: Unable to fetch recipes.");
    } finally {
      setLoading(false);
    }
  }

  // Fetch full recipe details when a title is clicked
  async function fetchRecipeDetails(title) {
    setSelectedRecipe(title);
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/api/getRecipeDetails", {
        recipeTitle: title,
        restrictions: [],
        allergies: []
      });
      setRecipeDetails(response.data);
    } catch (err) {
      setError("Error: Unable to fetch recipe details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-6 ingredients bg-custom">
      <h1 className="text-3xl font-bold text-[#415111] mb-6">Nutreazy</h1>

      {/* Display Selected Ingredients as Pills */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {selectedIngredients.map((ingredient) => (
          <span
            key={ingredient}
            className="px-4 py-2 bg-white rounded-full text-[#7B8F3D] font-semibold shadow"
          >
            {ingredient}
          </span>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative w-64 mb-4">
        <Search className="absolute left-3 top-3 text-[#A6AA9B]" size={16} />
        <input
          type="text"
          placeholder="Search your ingredients"
          className="w-full pl-10 pr-3 py-2 border rounded-md text-[#415111] bg-white shadow"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Ingredients Suggestions List */}
      <div className="flex flex-col gap-2 mb-6 w-64 bg-white p-3 rounded-lg shadow">
        {ingredients
          .filter((ingredient) =>
            ingredient.toLowerCase().includes(search.toLowerCase())
          )
          .map((ingredient) => (
            <label
              key={ingredient}
              className="flex items-center space-x-2 text-[#415111] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedIngredients.includes(ingredient)}
                onChange={() => toggleIngredient(ingredient)}
                className="w-5 h-5 accent-[#7B8F3D] border-[#4A572F] rounded"
              />
              <span>{ingredient}</span>
            </label>
          ))}
      </div>

      {/* Generate Recipe Button */}
      <button
        onClick={fetchRecipeTitles}
        disabled={selectedIngredients.length === 0 || loading}
        className="bg-white px-6 py-2 rounded-lg shadow text-[#7B8F3D] font-bold hover:bg-gray-100 mb-4"
      >
        {loading ? "Processing..." : "Create Recipe"}
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Recipe Suggestions */}
      {recipeTitles.length > 0 && (
        <div className="w-64 mb-6">
          <h2 className="text-lg font-semibold text-[#415111] mb-2">Recipe Suggestions:</h2>
          <div className="flex flex-col gap-2">
            {recipeTitles.map((title, index) => (
              <button
                key={index}
                onClick={() => fetchRecipeDetails(title)}
                className="p-2 border rounded bg-white hover:bg-gray-100 text-[#415111] shadow"
              >
                {title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recipe Details */}
      {recipeDetails && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow w-full max-w-xl text-[#415111]">
          <h2 className="text-lg font-bold mb-2">{recipeDetails.title}</h2>
          <p className="mb-2">
            <strong>Description:</strong> {recipeDetails.description}
          </p>
          <p className="mb-2">
            <strong>Prep Time:</strong> {recipeDetails.prep_time}
          </p>
          <p className="mb-2">
            <strong>Cook Time:</strong> {recipeDetails.cook_time}
          </p>
          <p className="mb-2">
            <strong>Servings:</strong> {recipeDetails.servings}
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
