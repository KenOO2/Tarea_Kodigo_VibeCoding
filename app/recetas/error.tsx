// app/recetas/error.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function RecetasError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12'>
      <div className='max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6'>
          Algo salió mal
        </h1>
        <p className='text-gray-600 mb-6'>
          No pudimos cargar las recetas. Por favor, intenta de nuevo.
        </p>
        <div className='flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-3'>
          <button
            onClick={reset}
            className='flex w-full items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm bg-orange-600 text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
          >
            Reintentar
          </button>
          <button
            onClick={() => router.push('/')}
            className='flex w-full items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300'
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}