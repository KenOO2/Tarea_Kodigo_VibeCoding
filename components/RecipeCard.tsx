// components/RecipeCard.tsx
import Image from 'next/image';
import Link from 'next/link';

interface RecipeCardProps {
  recipe: {
    id: string;
    name: string;
    category: string;
    area: string;
    thumbnail: string;
  };
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recetas/${recipe.id}`} className='group'>
      <div className='bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300'>
        <div className='h-48 w-full relative'>
          <Image
            src={recipe.thumbnail}
            alt={recipe.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className='object-cover'
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
  );
}