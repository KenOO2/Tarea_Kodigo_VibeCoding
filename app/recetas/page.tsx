// app/recetas/page.tsx
import { searchRecipes } from '@/lib/mealdb';
import SearchBar from '@/components/SearchBar';
import RecipeCard from '@/components/RecipeCard';
import type { Recipe } from '@/types/recipe';

export default async function RecetasPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q ?? '';

  let recipes: Recipe[] = [];
  if (query) {
    recipes = await searchRecipes(query);
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6'>
          Recetas
        </h1>
        <SearchBar defaultValue={query} />
        {query && recipes.length === 0 ? (
          <p className='text-gray-500 col-span-full'>
            No se encontraron recetas para &quot;{query}&quot;
          </p>
        ) : (
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6'>
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}