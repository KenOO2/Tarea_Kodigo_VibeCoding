// app/favoritos/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useFavorites } from '@/hooks/useFavorites';
import RecipeCard from '@/components/RecipeCard';
import type { Recipe } from '@/types/recipe';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  // Clave estable: solo vuelve a pedir datos cuando cambian los ids, no la referencia
  const favoritesKey = favorites.join(',');

  useEffect(() => {
    const ids = favoritesKey ? favoritesKey.split(',') : [];
    let cancelled = false;

    async function load() {
      if (ids.length === 0) {
        setRecipes([]);
        setError(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const results = await Promise.allSettled(
        ids.map(async (id) => {
          const res = await fetch(`/api/recetas/${id}`);
          if (!res.ok) throw new Error(`Error ${res.status} al cargar la receta ${id}`);
          return (await res.json()) as Recipe;
        })
      );

      if (cancelled) return;

      const loaded = results
        .filter((r): r is PromiseFulfilledResult<Recipe> => r.status === 'fulfilled')
        .map((r) => r.value);

      setRecipes(loaded);
      if (loaded.length < ids.length) {
        setError('No se pudieron cargar algunas recetas favoritas.');
      }
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [favoritesKey, attempt]);

  if (loading) {
    return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6'>Mis favoritos</h1>
        <p className='sr-only'>Cargando favoritos...</p>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className='h-64 rounded-lg bg-gray-200 animate-pulse' />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <h1 className='text-3xl font-bold text-gray-900 mb-6'>Mis favoritos</h1>

      {error && (
        <div role='alert' className='mb-6 rounded-md border border-red-200 bg-red-50 p-4 text-red-700'>
          <p>{error}</p>
          <button
            onClick={() => setAttempt((n) => n + 1)}
            className='mt-3 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-orange-600 text-white hover:bg-orange-700'
          >
            Reintentar
          </button>
        </div>
      )}

      {recipes.length === 0 && !error ? (
        <div>
          <p className='text-gray-600'>
            Aún no tienes recetas favoritas. Abre una receta y pulsa &quot;Agregar a favoritos&quot;.
          </p>
          <Link
            href='/recetas'
            className='mt-8 inline-flex items-center px-6 py-3 text-sm font-medium rounded-md shadow-sm bg-orange-600 text-white hover:bg-orange-700'
          >
            Explorar recetas
          </Link>
        </div>
      ) : (
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
