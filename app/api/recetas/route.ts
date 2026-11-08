// app/api/recetas/route.ts
import { NextResponse } from 'next/server';
import { searchRecipes } from '@/lib/mealdb';

export async function GET(request: Request) {
  // Se lee fuera del try/catch para no capturar el aviso interno de Next.js
  // (con Cache Components, acceder a request.url hace que la ruta sea dinámica).
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.trim() || '';

  if (!query) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  try {
    const recipes = await searchRecipes(query);
    return NextResponse.json(recipes);
  } catch (error) {
    console.error('Error in GET /api/recetas:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
