import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import FoodSearching from "./FoodSearching";
import Restriction from "./Restriction";
import Navbar from "./Navbar";
import Ingredients from "./Ingredients.jsx";
import SignIn from "./SignIn.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/restriction" element={<Restriction />} />
        <Route path="/ingredients" element={<Ingredients />} />
      </Routes>
    </BrowserRouter>
  );
}
