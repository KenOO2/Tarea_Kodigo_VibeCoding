// app/recetas/[id]/loading.tsx
export default function RecipeDetailLoading() {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12'>
      <div className='space-y-4'>
        <h2 className='text-2xl font-bold text-gray-900'>
          Cargando receta...
        </h2>
        <div className='w-full max-w-xs'>
          <div className='h-4 bg-gray-200 rounded animate-pulse' />
          <div className='mt-2 space-y-2'>
            {[1, 2, 3, 4, 5].map((_, idx) => (
              <div key={idx} className='h-2 bg-gray-200 rounded w-[80%] animate-pulse' />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}