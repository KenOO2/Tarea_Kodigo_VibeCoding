# Plantilla VIBE_CODING.md

---

## Prompts principales

Lista de los prompts o instrucciones de alto nivel que guiaron el desarrollo (por ejemplo, los pasos solicitados en la tarea inicial).

- **Paso 1:** Crear la capa de datos (types/recipe.ts, lib/mealdb.ts, route handlers).
- **Paso 2:** Construir la capa de presentación (Navbar, Footer, layout, home page).
- **Paso 3:** Implementar la página de recetas con búsqueda, barra de búsqueda, tarjetas, estados de carga y error.
- **Paso 4:** Añadir la página de detalle de receta, notFound y botón de favoritos (placeholder).
- **Paso 5:** Implementar persistencia de favoritos con localStorage mediante hook y componente.
- **Paso 6:** Mejorar accesibilidad, convertir componentes cliente innecesarios a servidor y agregar página “Acerca”.

---

## Iteraciones

Describa cada iteración (o paso) realizada, lo que se entregó y cómo se verificó.

| Iteración | Objetivo | Archivos creados/modificados | Resultado de prueba |
|-----------|----------|------------------------------|---------------------|
| 1 | Capa de datos y API | `types/recipe.ts`, `lib/mealdb.ts`, `app/api/recetas/route.ts`, `app/api/recetas/[id]/route.ts` | Búsqueda y detalle funcionan en `/api/recetas?q=pasta` y `/api/recetas/52777` |
| 2 | UI básica | `components/Navbar.tsx`, `components/Footer.tsx`, `app/layout.tsx`, `app/page.tsx` | Home page responsive, navbar con menú hamburguesa |
| 3 | Página de recetas | `app/recetas/page.tsx`, `components/SearchBar.tsx`, `components/RecipeCard.tsx`, `app/recetas/loading.tsx`, `app/recetas/error.tsx` | Lista de recetas con búsqueda, carga y error |
| 4 | Detalle de receta | `app/recetas/[id]/page.tsx`, `app/recetas/[id]/loading.tsx`, `app/recetas/[id]/error.tsx`, `app/not-found.tsx`, `components/FavoriteButton.tsx` (placeholder) | Detalle muestra imagen, categoría, área, ingredientes e instrucciones |
| 5 | Favoritos con localStorage | `hooks/useFavorites.ts`, `components/FavoriteButton.tsx` (actualizado), `app/favoritos/page.tsx`, `app/favoritos/loading.tsx`, `app/favoritos/error.tsx` | Favoritos persisten en localStorage y se muestran en `/favoritos` |
| 6 | Accesibilidad y optimizaciones | `app/acerca/page.txt`, mejoras de contraste y aria‑label en varios componentes, conversión de `RecipeCard.tsx` y los loading a Server Component | Página “Acerca” añadida, puntuación Lighthouse mejorada, menos client‑side JS |
| … | … | … | … |

---

## Decisiones técnicas

Registro de las elecciones técnicas más importantes y su justificación.

- **Next.js 16 con App Router:** Se eligió por sus capacidades de Server Components, streaming y route handlers integrados, lo que simplifica el consumo de APIs externas.
- **TypeScript estricto:** Garantiza seguridad de tipos en toda la capa de datos y evita errores en tiempo de ejecución al trabajar con la respuesta de TheMealDB.
- **Tailwind CSS:** Permite diseños responsivos rápidos y mantiene el estilo en los componentes; se utilizó el enfoque mobile‑first y colores de acento naranja para la marca.
- **Server Components por defecto:** Reduce la cantidad de JavaScript enviado al cliente; solo se marca `'use client'` cuando se necesita estado, efectos o manejadores de eventos (Navbar, FavoriteButton, SearchBar, páginas de error, página de favoritos).
- **localStorage para favoritos:** Solución sencilla y sin backend adicional adecuada para un proyecto demo; se sincroniza entre pestañas mediante el evento `storage`.
- **Route Handlers como proxy a TheMealDB:** Evita exponer la clave de API (aunque ésta es pública) y permite controlar códigos de estado y transformación de datos.
- **Manejo de errores y estados de carga:** Se dedicaron archivos `loading.tsx` y `error.tsx` por ruta para ofrecer experiencia de usuario coherente y facilitar el testing.
- **Accesibilidad:** Se añadieron `aria-label` donde faltaba, se mejoró el contraste de colores según WCAG AA y se aseguró que todas las imágenes tengan atributos `alt` descriptivos.
- **Optimización de imágenes:** Se usó el componente `next/image` con `fill` y `sizes` adecuado para evitar warnings y mejorar rendimiento.

---

## Desafíos y soluciones

Descripción de problemas encontrados durante el desarrollo y cómo se resolvieron.

| Desafío | Solución aplicada |
|---------|-------------------|
| **IDs de receta con espacios o formato incorrecto provocaban 404** | Se agregó depuración temporal en `app/recetas/[id]/page.tsx` mostrando el ID exacto y se confirmó que el ID provenía de la búsqueda; luego se corrigió el `getRecipeById` para eliminar espacios y asegurar que el tipo sea string. |
| **Error de hidratación al usar `new Date()` en Footer durante prerenderizado** | Se convirtió el Footer en un Client Component usando `useEffect` para obtener el año únicamente en el cliente, evitando valores dinámicos en el servidor. |
| **Warning de next/image sobre falta de prop `sizes`** | Se añadió la prop `sizes` con valores apropiados para distintos breakpoints (`"(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"`). |
| **Los componentes de favoritos no compartían estado entre pestañas** | Se sustituyó el hook `useFavorites` por una versión que escucha el evento `storage` de `window` para sincronizar cambios entre pestañas y actualiza el estado en todas las instancias. |
| **Desembalaje grande de JavaScript en la carga inicial** | Se convirtieron varios componentes (RecipeCard, loading screens) a Server Components, reduciendo el bundle del cliente y mejorando el tiempo de primera pintura. |
| **Pruebas de accesibilidad fallaban por contraste insuficiente** | Se ajustaron las clases de color de los enlaces y botones a tonos que cumplen con relación de contraste AA (≥4.5:1) según la paleta de Tailwind (ej. `text-gray-800` ↔ `hover:text-orange-600`). |
| **Despliegue en Vercel falló por dominio de imágenes no permitido** | Se actualizó `next.config.ts` usando `images.remotePatterns` en lugar del obsoleto `domains`, especificando `protocol: 'https'` y `hostname: 'www.themealdb.com'`. |

---

## Corrección: favoritos no persistían (revisión posterior)

| Desafío | Solución aplicada |
|---------|-------------------|
| **Al recargar o cambiar de página se perdían los favoritos** | Causa: en `useFavorites` el efecto que *guarda* en localStorage se ejecutaba en el primer render, cuando el estado aún era `[]`, y sobrescribía los datos guardados antes de que el efecto que *lee* los aplicara. Además cada componente tenía su propio estado aislado. Solución: reescribir el hook con `useSyncExternalStore` usando localStorage como única fuente de verdad (compartida entre componentes y pestañas). |
| **`/api/recetas/[id]` fallaba (build roto y favoritos sin cargar)** | En Next 16 `params` es una Promesa; se cambió a `await params`. |
| **Errores de lint (`any`, `<a>` internos, setState en efecto)** | Se tipó la respuesta de TheMealDB, se usó `next/link`, y el Footer pasó a ser un Server Component sin estado. |

---