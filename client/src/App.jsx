import { BrowserRouter, Routes, Route } from "react-router-dom";
import FoodSearching from "./FoodSearching";
import Restriction from "./Restriction";
import Navbar from "./Navbar";
import Ingredients from "./Ingredients"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navbar />}
        />
               <Route
          path="/ingredients"
          element={<Ingredients />}
        />
        <Route
          path="/login"
          element={<div>this is supposed to be login page</div>}
        />
        <Route path="/restriction" element={<Restriction />} />
        <Route path="/foodSearching" element={<FoodSearching />} />
      </Routes>
    </BrowserRouter>
  );
}
