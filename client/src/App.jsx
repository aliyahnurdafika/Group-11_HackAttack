import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import FoodSearching from "./FoodSearching";
import Restriction from "./Restriction";
import Navbar from "./Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navbar />}
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
