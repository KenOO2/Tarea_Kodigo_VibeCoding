// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12'>
      <div className='text-center'>
        <h1 className='text-5xl font-bold text-gray-900 mb-6'>
          404
        </h1>
        <h2 className='text-3xl font-semibold text-gray-700 mb-4'>
          Página no encontrada
        </h2>
        <p className='text-gray-600 mb-8 max-w-xl'>
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link
          href='/'
          className='inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm bg-orange-600 text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}