import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function Restriction() {
  const [restrictions, setRestrictions] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const navigate = useNavigate();

  const restrictionList = [
    "Lactose Intolerance",
    "Gluten Intolerance",
    "Keto",
    "Dairy-free",
    "Diabetes",
    "Vegetarianism",
    "Veganism",
    "Kosher",
    "Low Carb",
    "Others",
  ];

  const allergiesList = [
    "Peanut",
    "Soy",
    "Egg",
    "Tree nut",
    "Shellfish",
    "Fish",
    "Dairy",
    "Gluten",
    "Others",
  ];

  function handleRestrictionClick(restriction) {
    setRestrictions((prevRestrictions) => {
      if (prevRestrictions.includes(restriction)) {
        return prevRestrictions.filter((item) => item !== restriction);
      } else {
        return [...prevRestrictions, restriction];
      }
    });
  }

  function handleAllergyClick(allergy) {
    setAllergies((prevAllergies) => {
      if (prevAllergies.includes(allergy)) {
        return prevAllergies.filter((item) => item !== allergy);
      } else {
        return [...prevAllergies, allergy];
      }
    });
  }

  function handleStartCooking() {
    navigate("/FoodSearching", { state: { restrictions, allergies } });
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <div className="bg-orange-200 w-full py-50 text-center">
        <h2 className="text-3xl font-bold mb-2">Dietary Preferences</h2>
        <p className="mb-6">Choose your dietary preferences</p>
        <div className="flex flex-wrap gap-4 justify-center">
          {restrictionList.map((item) => (
            <button
              key={item}
              onClick={() => handleRestrictionClick(item)}
              className={`text-gray-800 px-4 py-2 rounded-full shadow-md border-3 ${
                restrictions.includes(item)
                  ? "bg-orange-400"
                  : "hover:bg-orange-300 bg-white"
              } hover:cursor-pointer`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-lime-200 w-full py-50 text-center">
        <h2 className="text-3xl font-bold mb-2">Allergy Restrictions</h2>
        <p className="mb-6">Choose your allergy restrictions</p>
        <div className="flex flex-wrap gap-4 justify-center">
          {allergiesList.map((item) => (
            <button
              key={item}
              onClick={() => handleAllergyClick(item)}
              className={`text-gray-800 px-4 py-2 rounded-full shadow-md border-3 ${
                allergies.includes(item) ? "bg-green-400" : "hover:bg-green-300 bg-white"
              } hover:cursor-pointer`}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          onClick={handleStartCooking}
          className="bg-white text-orange-500 font-bold p-3 mt-10 rounded-lg shadow-md hover:bg-orange-100 hover:cursor-pointer"
        >
          START COOKING
        </button>
      </div>
    </div>
  );
}
