// app/recetas/loading.tsx
export default function RecetasLoading() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6'>
          Recetas
        </h1>
        <div className='space-y-4'>
          <div className='h-10 w-56 bg-gray-200 rounded animate-pulse' />
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, idx) => (
              <div key={idx} className='bg-white rounded-lg shadow h-48 animate-pulse' />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}