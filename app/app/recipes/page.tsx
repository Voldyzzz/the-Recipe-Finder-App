"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const Recipes = () => {
  const [listOfRecipes, setListOfRecipes] = useState<any[]>([]);

  useEffect(() => {
    const savedRecipes = localStorage.getItem("recipes");
    if (savedRecipes) {
      setListOfRecipes(JSON.parse(savedRecipes));
    }
  }, []);

  return (
    <div className="p-5 bg-gray-100 mx-auto w-[1000px] min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">Recipes</h2>

      <ul className="space-y-4">
        {listOfRecipes.length > 0 ? (
          listOfRecipes.map((recipe) => (
            <li
              key={recipe.id}
              className="flex items-center bg-white shadow-lg p-4 rounded-lg hover:shadow-xl transition-shadow duration-200 "
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-32 h-32 object-cover rounded-md mr-4"
              />
              <div>
                <Link href={`/recipes/${recipe.id}`}>
                  <h3 className="text-xl font-semibold text-gray-800 cursor-pointer">
                    {recipe.title}
                  </h3>
                </Link>
              </div>
            </li>
          ))
        ) : (
          <li className="text-center text-lg text-gray-500">
            No recipes found.
          </li>
        )}
      </ul>
    </div>
  );
};

export default Recipes;
