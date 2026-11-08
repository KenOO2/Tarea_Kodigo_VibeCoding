// components/SearchBar.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({
  defaultValue = '',
}: {
  defaultValue?: string;
}) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.replace(`/recetas?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSubmit} className='mb-6'>
      <div className='relative'>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Buscar recetas...'
          className='block w-full pl-10 pr-4 py-3 mb-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500'
        />
        <button
          type='submit'
          className='absolute inset-y-0 right-0 flex items-center px-4 text-base font-medium text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-offset-2 focus:ring-orange-300 rounded-r-lg'
        >
          Buscar
        </button>
      </div>
    </form>
  );
}