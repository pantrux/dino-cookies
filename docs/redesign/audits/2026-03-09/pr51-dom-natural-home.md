# PR-51 — Reemplazo del home-poster por layout DOM natural

**Fecha:** 2026-03-09
**Objetivo:** corregir la regresión UX introducida por el enfoque `PosterHome` (imagen base + hotspots), manteniendo la dirección visual del diseño final pero con navegación e interacción naturales.

## Motivo del cambio
Pantrux reportó correctamente que el home se sentía como una imagen pegada de fondo con botones sobrepuestos. Aunque el parecido visual había subido, la interacción delataba el truco y la navegación no se veía natural.

## Qué se hizo
- Se eliminó `PosterHome` como base del home.
- Se volvió a un layout real en DOM con secciones navegables:
  - `Header`
  - `Hero`
  - `ProductList`
  - `BakerySection`
  - `Footer`
- Se conservaron los assets útiles extraídos de la referencia:
  - 4 crops de productos
  - ilustración bakery
- Se mantuvo `/pedido` como ruta separada para no sobrecargar el home.
- Se reutilizó la atmósfera parchment / ink / olive del rediseño, pero con composición natural y enlaces reales.

## Resultado
- El home vuelve a sentirse como un sitio real y no como un póster con hotspots.
- La galería, CTA, navegación de pie y bloque “Nosotros” son interactivos de forma normal.
- Se retira el arte completo `home-reference.jpg` del runtime público para no seguir arrastrando el anti-pattern.

## Evidencia
- `docs/redesign/audits/2026-03-09/pr51-dom-natural-home/home-desktop-1440x900.png`
- `docs/redesign/audits/2026-03-09/pr51-dom-natural-home/home-mobile-390x844.png`

## Validación
- `npm run build` ✅
