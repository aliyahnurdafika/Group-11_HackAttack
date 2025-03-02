import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import FoodSearching from "./FoodSearching";
import Restriction from "./Restriction";
import Navbar from "./Navbar";
import Ingredients from "./Ingredients.jsx";

export default function App() {
  return (
    <BrowserRouter>
        <Navbar/>
      <Routes>
        <Route
          path="/"
          element={<LandingPage/>}
        />
        <Route
          path="/login"
          element={<div>this is supposed to be login page</div>}
        />
        <Route path="/restriction" element={<Restriction />} />
        <Route path="/foodSearching" element={<FoodSearching />} />
         <Route path="/ingredients" element={<Ingredients />} />
      </Routes>
    </BrowserRouter>
  );
}
