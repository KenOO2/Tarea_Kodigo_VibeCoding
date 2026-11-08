// components/Footer.tsx
'use client';

import { useEffect, useState } from 'react';

export default function Footer() {
  const [year, setYear] = useState(0);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className='border-t mt-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='text-center text-sm text-gray-500'>
          © {year} RecetarioIA. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}