// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'RecetarioIA',
  description: 'App para buscar recetas y guardar favoritas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='es'>
      <body className='bg-gray-50 min-h-screen'>
        <Navbar />
        <main className='flex-min-none'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
