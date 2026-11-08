// lib/mealdb.ts
import type { Recipe } from '@/types/recipe';

const MEALDB_BASE_URL =
  process.env.MEALDB_BASE_URL || 'https://www.themealdb.com/api/json/v1/1';

type RawMeal = Record<string, string | null | undefined>;

interface MealDBResponse {
  meals: RawMeal[] | null;
}

function getIngredients(meal: RawMeal): string[] {
  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim() ?? '';
    if (ingredient) {
      ingredients.push(`${measure} ${ingredient}`.trim());
    }
  }
  return ingredients;
}

function mapMeal(meal: RawMeal): Recipe {
  return {
    id: meal.idMeal ?? '',
    name: meal.strMeal ?? '',
    category: meal.strCategory ?? '',
    area: meal.strArea ?? '',
    instructions: meal.strInstructions ?? '',
    thumbnail: meal.strMealThumb ?? '',
    ingredients: getIngredients(meal),
  };
}

export async function searchRecipes(query: string): Promise<Recipe[]> {
  const response = await fetch(
    `${MEALDB_BASE_URL}/search.php?s=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch recipes: ${response.statusText}`);
  }
  const data: MealDBResponse = await response.json();
  return data.meals ? data.meals.map(mapMeal) : [];
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  const response = await fetch(
    `${MEALDB_BASE_URL}/lookup.php?i=${encodeURIComponent(id.trim())}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch recipe: ${response.statusText}`);
  }
  const data: MealDBResponse = await response.json();
  if (!data.meals || data.meals.length === 0) return null;
  return mapMeal(data.meals[0]);
}
