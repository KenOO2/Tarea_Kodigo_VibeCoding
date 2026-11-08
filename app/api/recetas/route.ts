// app/api/recetas/route.ts
import { NextResponse } from 'next/server';
import { searchRecipes } from '@/lib/mealdb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.trim() || '';

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter "q" is required' },
        { status: 400 }
      );
    }

    const recipes = await searchRecipes(query);
    return NextResponse.json(recipes);
  } catch (error) {
    console.error('Error in GET /api/recetas:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}