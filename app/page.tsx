// app/page.tsx
export default function Home() {
  return (
    <>
      <section className='relative bg-orange-50'>
        <div className='absolute inset-0 -rotate-12 opacity-25'>
          <svg className='h-full w-full' viewBox='0 0 100 100' preserveAspectRatio='none'>
            <polygon points='0,100 100,0 100,100' fill='currentColor' />
          </svg>
        </div>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
          <div className='mx-auto text-center'>
            <h1 className='text-4xl font-bold text-orange-600 sm:text-5xl'>
              Descubre recetas del mundo
            </h1>
            <p className='mt-4 max-w-xl text-lg text-gray-600'>
              Busca miles de recetas internacionales, guarda tus favoritas y
              crea tu propio recetario personal.
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
      </section>

      <section className='mt-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
            ¿Cómo funciona?
          </h2>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            <div className='bg-white p-6 rounded-lg shadow'>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                Busca recetas
              </h3>
              <p className='text-gray-600'>
                Utiliza nuestro buscador para encontrar recetas por nombre,
                ingrediente o categoría.
              </p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow'>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                Guarda favoritas
              </h3>
              <p className='text-gray-600'>
                Crea tu colección personal de recetas favoritas para acceder
                rápidamente cuando las necesites.
              </p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow'>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                Cocina y disfruta
              </h3>
              <p className='text-gray-600'>
                Sigue las instrucciones paso a paso y comparte tus
                creaciones con familiares y amigos.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
