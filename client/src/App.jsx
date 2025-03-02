import { BrowserRouter, Routes, Route } from "react-router-dom";
import FoodSearching from "./FoodSearching";
import Restriction from "./Restriction";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<div>this is supposed to be landing page</div>}
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
