"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import cuisines from "./data/cuisines";
import { Inputs } from "./types/types";
import { getRecipes } from "./services/getRecipes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const { register, handleSubmit, watch } = useForm<Inputs>({
    defaultValues: {
      query: "",
      cuisine: "African",
      maxTime: "30",
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter();
  const query = watch("query"); // следим за значением query

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const recipes = await getRecipes(data);
      localStorage.setItem("recipes", JSON.stringify(recipes));
      if (isClient) {
        router.push("/recipes");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-blue-500 to-purple-600 mx-auto w-[600px] min-h-screen flex flex-col justify-center items-center">
      <h3 className="text-center mb-6 text-4xl font-bold text-white shadow-md">
        Find Your Perfect Recipe
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 p-6 bg-white rounded-2xl shadow-xl w-full max-w-[500px]"
      >
        <input
          type="text"
          placeholder="Enter recipe query..."
          {...register("query")}
          className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        />

        <select
          {...register("cuisine")}
          className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        >
          {cuisines.map((cuisine) => (
            <option key={cuisine} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Max preparation time (min)"
          min="1"
          {...register("maxTime")}
          className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        />

        <button
          type="submit"
          disabled={!query.trim()} // кнопка отключена, если query пуст
          className={`py-2 px-5 rounded-lg font-semibold transition-all shadow-lg ${
            query.trim()
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          Search Recipes
        </button>
      </form>
    </div>
  );
}
