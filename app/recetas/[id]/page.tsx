// app/recetas/[id]/page.tsx
import { getRecipeById } from '@/lib/mealdb';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import FavoriteButton from '@/components/FavoriteButton';

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
    notFound();
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
          <div className='relative h-64 w-full sm:h-80'>
            <Image
              src={recipe.thumbnail}
              alt={recipe.name}
              fill
              priority
              sizes='(max-width: 1280px) 100vw, 1280px'
              className='object-cover'
            />
          </div>
          <div className='p-6'>
            <div className='grid gap-4 sm:grid-cols-2 mb-6'>
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
            </div>
            <div className='mb-6'>
              <FavoriteButton recipeId={recipe.id} />
            </div>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              Ingredientes
            </h2>
            <ul className='list-disc list-inside space-y-2 text-gray-700 mb-8'>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              Instrucciones
            </h2>
            <p className='text-gray-700 leading-relaxed whitespace-pre-line'>
              {recipe.instructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}