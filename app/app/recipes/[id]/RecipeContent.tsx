"use client";

import { getRecipe } from "@/app/services/getRecipes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Recipe = () => {
  const [recipe, setRecipe] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const recipeData = await getRecipe(Number(id));
        console.log(recipeData);

        setRecipe(recipeData);
      } catch (error) {
        setError("Failed to load recipe");
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error)
    return <div className="text-center text-xl text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-gray-100 mx-auto max-w-4xl min-h-screen">
      {recipe ? (
        <>
          <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
            {recipe.title}
          </h2>

          <div className="flex justify-center mb-6">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-80 object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="mb-6 text-center text-gray-700">
            <h3 className="text-2xl font-semibold mb-2">Ingredients</h3>
            <ul className="list-disc list-inside space-y-2">
              {recipe.extendedIngredients?.map(
                (ingredient: any, index: number) => (
                  <li key={index} className="text-lg">
                    {ingredient.name} - {ingredient.amount} {ingredient.unit}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="flex justify-between text-gray-700 mb-6">
            <div>
              <h3 className="font-semibold">Time:</h3>
              {recipe.readyInMinutes && (
                <p className="text-lg">{recipe.readyInMinutes} minutes</p>
              )}
            </div>
            <div>
              <h3 className="font-semibold">Servings</h3>
              <p className="text-lg">{recipe.servings} servings</p>
            </div>
          </div>

          <div className="mb-6 text-gray-700">
            <h3 className="text-2xl font-semibold mb-2">Instructions</h3>
            <p className="text-lg">{recipe.instructions}</p>
          </div>
        </>
      ) : (
        <div className="text-center text-lg text-gray-500">
          Recipe not found
        </div>
      )}
    </div>
  );
};

export default Recipe;
