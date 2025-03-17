"use client";

import React, { Suspense, lazy } from "react";

const RecipeContent = lazy(() => import("./RecipeContent"));

const Recipe = () => {
  return (
    <Suspense fallback={<div className="text-center text-xl">Loading...</div>}>
      <RecipeContent />
    </Suspense>
  );
};

export default Recipe;
