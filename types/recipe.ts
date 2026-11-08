// types/recipe.ts
export interface Recipe {
  id: string;
  name: string;
  category: string;
  area: string;
  instructions: string;
  thumbnail: string;
  ingredients: string[];
}

export interface RecipeSummary {
  id: string;
  name: string;
  thumbnail: string;
  category: string;
}