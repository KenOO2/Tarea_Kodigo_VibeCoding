// app/api/recetas/[id]/route.ts
import { NextResponse } from 'next/server';
import { getRecipeById } from '@/lib/mealdb';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: 'Recipe ID is required' }, { status: 400 });
  }

  try {
    const recipe = await getRecipeById(id);
    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }
    return NextResponse.json(recipe);
  } catch (error) {
    console.error('Error in GET /api/recetas/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
