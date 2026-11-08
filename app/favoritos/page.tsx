// app/favoritos/page.tsx
'use client';

import { useFavorites } from '@/hooks/useFavorites';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Recipe {
  id: string;
  name: string;
  category: string;
  area: string;
  instructions: string;
  thumbnail: string;
  ingredients: string[];
}

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (favorites.length === 0) {
      setRecipes([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    // Fetch each recipe in parallel
    const fetchRecipes = async () => {
      try {
        const fetchPromises = favorites.map(id =>
          fetch(`/api/recetas/${id}`).then(async res => {
            if (!res.ok) {
              throw new Error(`Failed to fetch recipe ${id}: ${res.status}`);
            }
            return res.json();
          })
        );

        const results = await Promise.allSettled(fetchPromises);
        const successfulRecipes: Recipe[] = [];
        let hasError = false;

        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            successfulRecipes.push(result.value);
          } else {
            console.error(`Failed to fetch favorite recipe ${favorites[index]}:`, result.reason);
            hasError = true;
          }
        });

        setRecipes(successfulRecipes);
        setLoading(false);
        if (hasError) {
          setError('Some favorites could not be loaded. Please try again.');
        }
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setLoading(false);
        setError('An unexpected error occurred while loading favorites.');
      }
    };

    fetchRecipes();
  }, [favorites]);

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12'>
        <div className='space-y-4'>
          <h2 className='text-2xl font-bold text-gray-900'>
            Cargando favoritos...
          </h2>
          <div className='w-full max-w-xs'>
            <div className='h-4 bg-gray-200 rounded animate-pulse' />
            <div className='mt-2 space-y-2'>
              {[1, 2, 3].map((_, idx) => (
                <div key={idx} className='h-2 bg-gray-200 rounded w-[70%] animate-pulse' />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12'>
        <div className='max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-3xl font-bold text-gray-900 mb-6'>
            Error al cargar favoritos
          </h1>
          <p className='text-gray-600 mb-6'>
            {error}
          </p>
          <div className='flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-3'>
            <button
              onClick={() => {
                setLoading(true);
                setError(null);
                // Trigger a refetch by calling the effect again? We'll reset favorites temporarily?
                // Instead, we can just call the fetchRecipes function again, but we don't have it here.
                // We'll rely on the useEffect re-running when favorites change, but we don't want to change favorites.
                // So we'll refetch by setting a temporary state? Let's just refetch by calling the function again.
                // We'll extract the fetchRecipes function to be callable, but for simplicity we'll do:
                window.location.reload();
              }}
              className='flex w-full items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm bg-orange-600 text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
            >
              Reintentar
            </button>
            <button
              onClick={() => {
                // Reset error and loading to try again
                setLoading(true);
                setError(null);
                // We'll trigger a refetch by toggling a dummy state? Instead, we'll just refetch by calling the function again.
                // Since we can't call the fetchRecipes function from here, we'll use a trick: set a dummy state that triggers the effect.
                // But we don't have a dummy state. Let's just reload the page for simplicity in this step.
                window.location.reload();
              }}
              className='flex w-full items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300'
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className='min-h-screen bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-6'>
            Mis favoritos
          </h1>
          <p className='text-gray-600'>
            Aún no tienes recetas favoritas. Explora las recetas y agrega tus favoritas haciendo clic en el botón de favorito en cada página de detalle.
          </p>
          <div className='mt-8'>
            <a
              href='/recetas'
              className='inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm bg-orange-600 text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
            >
              Explorar recetas
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6'>
          Mis favoritos
        </h1>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {recipes.map(recipe => (
            <Link
              key={recipe.id}
              href={`/recetas/${recipe.id}`}
              className='group'
            >
              <div className='bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300'>
                <div className='h-48 w-full relative'>
                  <img
                    src={recipe.thumbnail}
                    alt={recipe.name}
                    className='w-full h-48 object-cover'
                  />
                  <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white px-3 py-2'>
                    <h3 className='text-sm font-medium truncate'>{recipe.name}</h3>
                    <p className='text-xs truncate'>{recipe.category}</p>
                  </div>
                </div>
                <div className='p-4'>
                  <p className='text-gray-600 text-xs'> {recipe.area} </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}