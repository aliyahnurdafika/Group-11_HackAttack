import React from "react";
import Navbar from "./Navbar";
import "./App.css";

export default function LandingPage() {
  return (
    <div className="bg-[#f2e8df] min-h-screen">

      <section className="py-12 px-4 bg-[#f2e8df]">
        <div className="max-w-screen-xl mx-auto flex flex-col-reverse md:flex-row items-center md:justify-between ">
          <div className="md:w-1/2 mt-8 md:mt-0 ">
            <h1 className="text-4xl md:text-5xl font-extrabold text-orange-500 mb-4">
              Nutrition made eazy!
            </h1>
            <p className="text-lg text-gray-800 mb-6">
              Cooking meets convenience! No waste, no hassle – just easy, personalized cooking!
            </p>
            <button className="inline-block bg-orange-400 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-md">
              START NOW
            </button>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://media.istockphoto.com/id/1457979959/photo/snack-junk-fast-food-on-table-in-restaurant-soup-sauce-ornament-grill-hamburger-french-fries.jpg?b=1&s=612x612&w=0&k=20&c=w8BdPTIA_yaRkhmQWrqJXSKTLZDXXNtgPJh5KjyahCA="
              alt="Delicious food bowls"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-20 mt-20 px-4">
        <div className="max-w-screen-md mx-auto text-center">
          <h2 className="text-5xl md:text-4xl font-bold text-[#415111] mb-4">
            How to?
          </h2>
          <p className="text-lg text-[#415111] leading-relaxed">
            Simply enter the ingredients you have at home, along with your dietary preferences and allergy restrictions, and we’ll generate delicious, tailored recipes just for you. Whether you’re looking for a quick meal or a dish that fits your lifestyle, we’ve got you covered.
          </p>
        </div>
      </section>
    </div>
  );
}
