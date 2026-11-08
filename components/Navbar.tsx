// components/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='bg-white border-b shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex-shrink-0 flex items-center'>
            <Link href='/' className='text-xl font-semibold text-orange-600'>
              RecetarioIA
            </Link>
          </div>
          <div className='hidden md:block'>
            <div className='flex space-x-4'>
              <Link href='/' className='text-gray-700 hover:text-orange-600 transition-colors'>
                Inicio
              </Link>
              <Link href='/recetas' className='text-gray-700 hover:text-orange-600 transition-colors'>
                Recetas
              </Link>
              <Link href='/favoritos' className='text-gray-700 hover:text-orange-600 transition-colors'>
                Favoritos
              </Link>
            </div>
          </div>
          <div className='md:hidden'>
            <button
              type='button'
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100'
              onClick={() => setIsOpen(!isOpen)}
              aria-label='Toggle menu'
            >
              <svg className='h-6 w-6' stroke='currentColor' fill='none' viewBox='0 0 24 24'>
                {!isOpen ? (
                  <>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                  </>
                ) : (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <div className='pt-2 pb-3 space-y-1'>
            <Link
              href='/'
              className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600'
            >
              Inicio
            </Link>
            <Link
              href='/recetas'
              className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600'
            >
              Recetas
            </Link>
            <Link
              href='/favoritos'
              className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600'
            >
              Favoritos
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}