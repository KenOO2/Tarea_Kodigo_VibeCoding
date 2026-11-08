// components/FavoriteButton.tsx
'use client';

import { useFavorites } from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  recipeId: string;
}

export default function FavoriteButton({ recipeId }: FavoriteButtonProps) {
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <button
      onClick={() => toggleFavorite(recipeId)}
      className={`w-full flex items-center justify-center px-4 py-2 text-sm font-medium transition-all duration-200 ${
        isFavorite(recipeId)
          ? 'bg-red-600 text-white hover:bg-red-700'
          : 'bg-orange-600 text-white hover:bg-orange-700'
      }`}
    >
      {isFavorite(recipeId) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    </button>
  );
}