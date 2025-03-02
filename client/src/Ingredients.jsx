import { useState } from "react";
import { Search } from "lucide-react";
import "./App.css";

export default function IngredientsSelector() {
  const [selectedIngredients, setSelectedIngredients] = useState([
    "Chicken",
    "Onion",
    "Egg",
  ]);
  const [search, setSearch] = useState("");
  const [ingredients, setIngredients] = useState([
    "Beef",
    "Chicken",
    "Onion",
    "Mushroom",
    "Egg",
    "Rice",
  ]);

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
      const normalizedSearch = search.trim();
      
      if (!ingredients.includes(normalizedSearch)) {
        setIngredients((prev) => [...prev, normalizedSearch]); // Add to dropdown
      }
      
      if (!selectedIngredients.includes(normalizedSearch)) {
        setSelectedIngredients((prev) => [...prev, normalizedSearch]); // Select it
      }

      setSearch(""); // Clear search input after adding
    }
  };

  return (
    <div className="flex flex-col items-center bg-[#F2E8DF] min-h-screen p-6 ingredients">
      <h1 className="text-2xl font-bold text-[#415111] mb-4">Ingredients</h1>

      {/* Selected Ingredients Display */}
      <div className="flex gap-2 mb-4">
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
        <Search className="absolute left-3 top-3 text-[#A6AA9B]"  size={16} />
        <input
          type="text"
          placeholder="Search your ingredients"
          className="w-full pl-10 pr-3 py-2 border rounded-md text-[#415111] bg-white shadow"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Suggestions Heading */}
      <h2 className="text-lg font-semibold text-[#415111] mb-2">Suggestions</h2>

      {/* Ingredients List with Checkboxes */}
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

    
      <button className="bg-white px-6 py-2 rounded-lg shadow text-[#7B8F3D] font-bold hover:bg-gray-100">
        START
      </button>
    </div>
  );
}
