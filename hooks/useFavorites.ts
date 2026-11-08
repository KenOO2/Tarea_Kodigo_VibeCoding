// hooks/useFavorites.ts
'use client';

import { useCallback, useSyncExternalStore } from 'react';

const FAVORITES_STORAGE_KEY = 'recetarioia-favorites';
const EMPTY: string[] = [];

// Store compartido: todos los componentes que usan el hook leen la misma fuente
// (localStorage), por lo que el estado se mantiene al recargar o cambiar de página.
const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedValue: string[] = EMPTY;

function readFavorites(): string[] {
  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    // useSyncExternalStore exige devolver la MISMA referencia si nada cambió.
    if (raw === cachedRaw) return cachedValue;
    cachedRaw = raw;
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    cachedValue = Array.isArray(parsed)
      ? parsed.filter((v): v is string => typeof v === 'string')
      : EMPTY;
  } catch {
    cachedValue = EMPTY;
  }
  return cachedValue;
}

function writeFavorites(next: string[]) {
  try {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
  } catch (error) {
    console.error('No se pudieron guardar los favoritos:', error);
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Sincroniza entre pestañas del navegador
  const onStorage = (e: StorageEvent) => {
    if (e.key === FAVORITES_STORAGE_KEY || e.key === null) listener();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

const getServerSnapshot = () => EMPTY;

export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, readFavorites, getServerSnapshot);

  const toggleFavorite = useCallback((id: string) => {
    const current = readFavorites();
    writeFavorites(
      current.includes(id) ? current.filter((favId) => favId !== id) : [...current, id]
    );
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  return { favorites, toggleFavorite, isFavorite };
}
