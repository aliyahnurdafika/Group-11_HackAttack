import React, { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  function goBack() {
    navigate("/");
  }

  return (
    <nav className="w-full bg-white shadow-sm ingredients">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        {/* Left side: Logo and Brand Name */}
        <div className="flex items-center space-x-3">
          <img
            src="https://icons.veryicon.com/png/o/food--drinks/yoga-flat-icon/healthy-food.png"
            alt="Nutreazy Logo"
            className="w-12 h-12"
          />
          <span className="text-3xl font-extrabold text-[#7B8F3D]">
            NUTREAZY
          </span>
        </div>

        {/* Desktop Menu: Only display "Home" */}
        <div className="hidden md:flex items-center">
          <button
            onClick={goBack}
            className="text-[#7B8F3D] font-semibold hover:text-[#415111] transition-colors"
          >
            Home
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden inline-flex items-center p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Toggle navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu: Only "Home" */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col p-4 space-y-2">
            <li>
              <button
                onClick={goBack}
                className="block text-gray-700 hover:text-[#7B8F3D] transition-colors"
              >
                Home
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
