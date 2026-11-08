// app/recetas/[id]/page.tsx
import { getRecipeById } from '@/lib/mealdb';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import FavoriteButton from '@/components/FavoriteButton'; // Placeholder for next step

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const recipe = await getRecipeById(id);
  
  if (!recipe) {
    return { title: 'Receta no encontrada' };
  }
  
  return {
    title: `${recipe.name} - RecetarioIA`,
    description: `Descubre cómo preparar ${recipe.name}, una deliciosa receta de ${recipe.area}.`
  };
};

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    // Debugging fallback: show ID with debugging suggestions
    return (
      <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-900'>
            Recipe not found (ID: {id})
          </h2>
          <p className='text-gray-600'>
            Unable to find recipe with ID: {id}. This might be due to:
            • Whitespace or formatting issues with the ID
            • The recipe not existing in TheMealDB database
            • A temporary issue with the TheMealDB API
          </p>
          <p className='text-gray-600 mt-4'>
            Try searching for the recipe again or visiting https://www.themealdb.com/api/json/v1/1/lookup.php?i={id} in your browser to see what TheMealDB returns.
          </p>
          <Link
            href='/recetas'
            className='inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm bg-orange-600 text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
          >
            Back to recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='mb-6 flex items-center'>
          <Link href='/recetas' className='mr-4 text-orange-600 hover:text-orange-500'>
            ← Volver a recetas
          </Link>
          <h1 className='text-2xl font-bold text-gray-900'>
            {recipe.name}
          </h1>
        </div>
        <div className='bg-white rounded-lg shadow overflow-hidden'>
          <div className='relative'>
            <img
              src={recipe.thumbnail}
              alt={recipe.name}
              className='w-full h-48 object-cover'
            />
          </div>
          <div className='p-6'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6'>
              <div>
                <p className='text-sm font-medium text-gray-500'>Categoría</p>
                <p className='text-lg font-semibold text-gray-900'>
                  {recipe.category}
                </p>
              </div>
              <div>
                <p className='text-sm font-medium text-gray-500'>Origen</p>
                <p className='text-lg font-semibold text-gray-900'>
                  {recipe.area}
                </p>
              </div>
              <div>
                <p className='text-sm font-medium text-gray-500'>Porciones</p>
                <p className='text-lg font-semibold text-gray-900'>
                  4 personas
                </p>
              </div>
            </div>
            <div className='mb-6'>
              <FavoriteButton recipeId={recipe.id} /> {/* Placeholder for next step */}
            </div>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              Ingredientes
            </h2>
            <ul className='list-disc list-inside space-y-2 text-gray-700'>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              Instrucciones
            </h2>
            <p className='text-gray-700 leading-relaxed'>
              {recipe.instructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}