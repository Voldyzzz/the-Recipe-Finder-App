import { Inputs } from "../types/types";

// const API_KEY = "apiKey=3502a80bdf444d3fab24bfddeb9d41cc";
// const API = "https://api.spoonacular.com/recipes/complexSearch?";
const API = {
  RECIPES: "https://api.spoonacular.com/recipes/complexSearch?",
  RECIPE: "https://api.spoonacular.com/recipes/",
  API_KEY: "apiKey=3502a80bdf444d3fab24bfddeb9d41cc",
};

export const getRecipes = async ({ query, cuisine, maxTime }: Inputs) => {
  const URL = `${API.RECIPES}query=${query}&cuisine=${cuisine}&maxReadyTime=${maxTime}&${API.API_KEY}`;

  try {
    const response: any = await fetch(URL);

    if (!response.ok) {
      throw new Error("Error");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

export const getRecipe = async (id: number) => {
  const URL = `${API.RECIPE}${id}/information?${API.API_KEY}`;

  try {
    const response: any = await fetch(URL);

    if (!response.ok) {
      throw new Error("Error");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

// https://api.spoonacular.com/recipes/complexSearch?query={pasta}&cuisine={Italian}&maxReadyTime={30}&apiKey=3502a80bdf444d3fab24bfddeb9d41cc

// https://api.spoonacular.com/recipes/<recipeId>/information?apiKey=YOUR_API_KEY
