# RecetarioIA

Aplicación web para buscar recetas y guardar favoritas utilizando la API pública de TheMealDB. Desarrollada con Next.js 16, App Router, TypeScript y Tailwind CSS siguiendo la metodología de Vibe Coding.

## Capturas (placeholders)

![Página de inicio](/public/screenshots/image1.png)
*Página de inicio con hero y descripción.*

![Lista de recetas](/public/screenshots/iamge2.png)
*Lista de recetas con barra de búsqueda y tarjetas responsivas.*

![Detalle de receta](/public/screenshots/image3.png)
*Vista detallada de una receta con ingredientes e instrucciones.*

![Página de favoritos](/public/screenshots/favoritos.png)
*Página de favoritos con las recetas guardadas.*

## Stack

- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript (modo estricto)
- **Estilos:** Tailwind CSS (mobile‑first, tema claro, acento naranja)
- **API:** TheMealDB (gratuita, sin clave requerida)
- **Persistencia de favoritos:** localStorage
- **Despliegue:** Vercel (ejemplo: https://recetarioia.vercel.app)

## Instalación paso a paso

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/recetario-ia.git
   cd recetario-ia
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Copie el archivo de ejemplo y ajuste si es necesario:
   ```bash
   cp .env.example .env.local
   ```
   Contenido típico de `.env.local`:
   ```
   MEALDB_BASE_URL=https://www.themealdb.com/api/json/v1/1
   ```

4. **Ejecutar el entorno de desarrollo**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en <http://localhost:3000>.

5. **Compilar para producción**
   ```bash
   npm run build
   ```

6. **Iniciar el servidor de producción**
   ```bash
   npm start
   ```

## Variables de entorno (.env.example)

```dotenv
# URL base de la API de TheMealDB
MEALDB_BASE_URL=https://www.themealdb.com/api/json/v1/1
```

## Scripts disponibles

| Script               | Descripción                                          |
|----------------------|------------------------------------------------------|
| `npm run dev`        | Inicia el servidor de desarrollo con recarga rápida. |
| `npm run build`      | Compila la aplicación para producción.               |
| `npm start`          | Ejecuta la aplicación compilada.                     |
| `npm run lint`       | Ejecuta ESLint para revisar el código.               |
| `npm run test`       | (Placeholder) Ejecuta pruebas si se añaden.          |

## Estructura de carpetas

```
recetario-ia/
├─ app/                          # Enrutamiento y páginas (App Router)
│   ├─ acerca/                   # Página "Sobre"
│   ├─ api/                      # Route Handlers (proxy a TheMealDB)
│   │   └─ recetas/
│   │      ├─ route.ts           # Lista / búsqueda
│   │      └─ [id]/route.ts      # Detalle por ID
│   ├─ favoriots/                # Página de favoritos
│   ├─ recetas/                  # Listado y detalle de recetas
│   │   ├─ [id]/                 # Detalle de una receta
│   │   │   ├─ page.tsx
│   │   │   ├─ loading.tsx
│   │   │   └─ error.tsx
│   │   ├─ page.tsx              # Lista / búsqueda
│   │   ├─ loading.tsx
│   │   └─ error.tsx
│   ├─ not-found.tsx             # Página 404 personalizada
│   ├─ layout.tsx                # Layout global (Navbar, Footer)
│   └─ page.tsx                  # Página de inicio
├─ components/                   # Componentes reutilizables
│   ├─ Navbar.tsx                # Navegación responsive (Cliente)
│   ├─ Footer.tsx                # Pie de página
│   ├─ FavoriteButton.tsx        # Botón de favoritos (Cliente)
│   ├─ SearchBar.tsx             # Barra de búsqueda (Cliente)
│   └─ RecipeCard.tsx            # Tarjeta de receta (Servidor)
├─ hooks/                        # Hooks personalizados
│   └─ useFavorites.ts           # Gestión de favoritos con localStorage
├─ lib/                          # Lógica de negocio y servicios
│   └─ mealdb.ts                 # Funciones para llamar a TheMealDB
├─ types/                        # Declaraciones TypeScript
│   └─ recipe.ts                 # Interfaces Recipe y RecipeSummary
├─ public/                       # Assets estáticos
│   └─ screenshots/              # Placeholders para capturas
├─ .env.example                  # Ejemplo de variables de entorno
├─ .eslintrc.js                  # Configuración de ESLint
├─ .gitignore
├─ next.config.ts                # Configuración de Next.js (imágenes, TurboPack)
├─ package.json
├─ tsconfig.json
└─ README.md
```

## Despliegue

Para desplegar en Vercel:

1. Instale la CLI de Vercel (si aún no la tiene): `npm i -g vercel`
2. Desde la raíz del proyecto ejecute: `vercel`
3. Siga los asistentes para vincular el repositorio y configurar las variables de entorno (MEALDB_BASE_URL).
4. Una vez desplegado, acceda a la URL provista (ejemplo: https://recetarioia.vercel.app)

> **Nota:** El enlace anterior es un placeholder; reemplácelo con la URL real obtenida tras el despliegue.

---

¡Gracias por usar RecetarioIA! Si tiene preguntas o sugerencias, abra un issue o envíe un pull request.