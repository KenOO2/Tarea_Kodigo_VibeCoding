// lib/mealdb.ts
import { Recipe } from '../types/recipe';

const MEALDB_BASE_URL = process.env.MEALDB_BASE_URL || 'https://www.themealdb.com/api/json/v1/1';

export async function searchRecipes(query: string): Promise<Recipe[]> {
  try {
    const response = await fetch(`${MEALDB_BASE_URL}/search.php?s=${query}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch recipes: ${response.statusText}`);
    }
    const data = await response.json();
    if (!data.meals) {
      return [];
    }
    return data.meals.map((meal: any) => ({
      id: meal.idMeal,
      name: meal.strMeal,
      category: meal.strCategory,
      area: meal.strArea,
      instructions: meal.strInstructions,
      thumbnail: meal.strMealThumb,
      ingredients: getIngredients(meal),
    }));
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  try {
    const response = await fetch(`${MEALDB_BASE_URL}/lookup.php?i=${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch recipe: ${response.statusText}`);
    }
    const data = await response.json();
    if (!data.meals || data.meals.length === 0) {
      return null;
    }
    const meal = data.meals[0];
    return {
      id: meal.idMeal,
      name: meal.strMeal,
      category: meal.strCategory,
      area: meal.strArea,
      instructions: meal.strInstructions,
      thumbnail: meal.strMealThumb,
      ingredients: getIngredients(meal),
    };
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    throw error;
  }
}

function getIngredients(meal: any): string[] {
  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      const formatted = `${measure?.trim() ?? ''} ${ingredient?.trim() ?? ''}`.trim();
      ingredients.push(formatted);
    } else {
      break;
    }
  }
  return ingredients;
}