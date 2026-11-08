# CLAUDE.md — Guía del proyecto

## Contexto
Aplicación web "RecetarioIA" (tema libre, puedes cambiarlo) construida con **Vibe Coding**
para una actividad evaluada. La IA genera el código; el desarrollador dirige, valida e itera.
Se evalúa calidad del código, control de la arquitectura y evidencia del proceso.

## Stack obligatorio
- Next.js 16+ con **App Router** (carpeta `app/`)
- **TypeScript** estricto (`strict: true`), sin `any`
- **Tailwind CSS** para estilos
- Node 20+ y npm
- Despliegue en Vercel; código en GitHub

## Requisitos funcionales mínimos (NO omitir)
1. Mínimo **4 rutas** distintas:
   - `/` (inicio)
   - `/recetas` (listado con búsqueda)
   - `/recetas/[id]` (detalle, ruta dinámica)
   - `/favoritos` (guardados por el usuario)
   - `/acerca` (opcional, 5ª ruta)
2. Consumo de API mediante **Route Handlers** (`app/api/.../route.ts`).
   El front NUNCA llama directo a la API externa; siempre pasa por `/api/...`.
3. Mezcla de **Server Components** (por defecto) y **Client Components** (`"use client"` solo cuando haga falta: estado, efectos, eventos).
4. Hooks `useState` y `useEffect` (ej.: favoritos, búsqueda, tema).
5. **Responsive** (mobile-first con breakpoints `sm:`, `md:`, `lg:`).
6. **Loading UI** (`loading.tsx`) y **Error UI** (`error.tsx`) en las rutas con datos.
7. Variables sensibles en `.env.local`; mantener `.env.example` actualizado. Nunca commitear `.env.local`.

## Estructura de carpetas esperada
```
app/
  layout.tsx
  page.tsx
  loading.tsx
  error.tsx
  not-found.tsx
  recetas/
    page.tsx
    loading.tsx
    error.tsx
    [id]/page.tsx
  favoritos/page.tsx
  acerca/page.tsx
  api/
    recetas/route.ts
    recetas/[id]/route.ts
components/        # componentes reutilizables (Navbar, RecipeCard, SearchBar, FavoriteButton...)
lib/               # funciones auxiliares y cliente de API
types/             # interfaces TypeScript
public/
```

## Convenciones de código
- Componentes en PascalCase, archivos de componentes `NombreComponente.tsx`.
- Funciones y variables en camelCase; constantes en UPPER_SNAKE_CASE.
- Tipar props con `interface`. Tipar respuestas de API en `types/`.
- Componentes pequeños (< 150 líneas); extraer lógica a `lib/` o hooks propios.
- Usar `next/image` y `next/link`, no `<img>` ni `<a>` internos.
- Manejar siempre `try/catch` en Route Handlers y devolver `NextResponse.json` con código HTTP correcto.
- Accesibilidad básica: `alt` en imágenes, `aria-label` en botones de icono, contraste suficiente.
- Textos de la interfaz en **español**; código y nombres técnicos en inglés.
- Sin código muerto, sin `console.log` en la versión final.

## Reglas para la IA (importante)
1. **Trabaja en pasos pequeños.** Un paso = una funcionalidad. No generes todo el proyecto de golpe.
2. Antes de escribir código, di en 2-3 líneas qué archivos vas a crear/modificar.
3. Entrega **el archivo completo** con su ruta como encabezado (ej.: `// app/recetas/page.tsx`). No uses "..." ni "resto del código igual".
4. No inventes dependencias. Si necesitas instalar algo, indica el comando `npm install` exacto y justifica por qué.
5. No uses APIs obsoletas de Next.js. En Next 15/16 `params` y `searchParams` son **Promesas** (`await params`).
6. No cambies la arquitectura ni renombres archivos sin que yo lo pida.
7. Si hay un error que pego, explica la causa y da la corrección mínima.
8. Al terminar cada paso, indica cómo probarlo (`npm run dev`, URL a abrir) y propone un mensaje de commit.

## API externa por defecto
TheMealDB (gratuita, sin clave): `https://www.themealdb.com/api/json/v1/1/`
- Buscar: `search.php?s={texto}`
- Detalle: `lookup.php?i={id}`
La URL base va en `.env.local` como `MEALDB_BASE_URL` (ver `.env.example`).

## Comandos
```bash
npm install
npm run dev      # desarrollo en http://localhost:3000
npm run build    # comprobar que compila antes de desplegar
npm run lint
```

## Git: historial iterativo (evaluado)
Commits pequeños y descriptivos con Conventional Commits:
`feat: añade listado de recetas`, `fix: corrige params async en detalle`,
`style: mejora responsive del navbar`, `docs: actualiza VIBE_CODING.md`.
Mínimo un commit por funcionalidad.

## Documentación del proceso (entregable)
Mantener `VIBE_CODING.md` actualizado tras cada paso con:
- Prompt principal usado
- Qué generó la IA y qué tuve que corregir
- Decisiones técnicas
- Problemas encontrados y cómo se resolvieron

## Definición de "terminado"
- [ ] 4+ rutas funcionando
- [ ] Route Handler consumido desde el front
- [ ] Server + Client Components combinados
- [ ] loading.tsx y error.tsx probados
- [ ] Responsive revisado en móvil y escritorio
- [ ] `npm run build` y `npm run lint` sin errores
- [ ] `.env.example`, `README.md` y `VIBE_CODING.md` completos
- [ ] Desplegado en Vercel con variables de entorno configuradas
