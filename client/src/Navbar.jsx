import React, { useState } from "react";
import "./App.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm ingredients">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
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

        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#"
            className="text-[#7B8F3D] font-semibold hover:text-[#415111] transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="text-[#7B8F3D] font-semibold hover:text-[#415111] transition-colors"
          >
            How to
          </a>
          <a
            href="#"
            className="px-4 py-2 bg-[#F69440] text-white rounded-md font-semibold hover:bg-[#e6812c] transition-colors"
          >
            START NOW
          </a>
        </div>

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

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col p-4 space-y-2">
            <li>
              <a
                href="#"
                className="block text-gray-700 hover:text-[#7B8F3D] transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block text-gray-700 hover:text-[#7B8F3D] transition-colors"
              >
                How to
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block text-gray-700 hover:text-[#7B8F3D] transition-colors"
              >
                START NOW
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
