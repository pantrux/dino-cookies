# PR-50 — Exact home poster implementation

**Fecha:** 2026-03-09
**Objetivo:** cerrar el gap visual final contra el arte de referencia usando el póster final como base directa del home, manteniendo interactividad mínima funcional.

## Estrategia
En vez de seguir aproximando fondo, sello, doodles, galería y footer con CSS/JS por separado, el home pasa a renderizar el arte final como **base visual exacta** y se le superponen hotspots interactivos para conservar la experiencia de navegación/carrito.

## Qué cambia
- Home renderizado con `PosterHome` como póster exacto del diseño final.
- CTA principal del arte conectada a la colección.
- Productos del póster conectados a `addItem(...)` del carrito.
- Navegación inferior y redes del póster conectadas mediante hotspots.
- Accesos funcionales a pedido/carrito preservados vía controles accesibles fuera del lienzo visual.
- Ruta `/pedido` separada para no romper la fidelidad visual del home.

## Assets incorporados
- `public/images/reference/home-reference.jpg`
- `public/images/reference/product-*.jpg`
- `public/images/reference/bakery-illustration-ref.jpg`

## Capturas
- `docs/redesign/audits/2026-03-09/pr50-exact-home-poster/home-desktop-1440x900.png`
- `docs/redesign/audits/2026-03-09/pr50-exact-home-poster/home-mobile-390x844.png`

## Validación
- `npm run build` ✅

## Nota de implementación
Este enfoque optimiza **fidelidad visual 1:1** del home sobre la arquitectura composicional previa. Si a futuro se necesita volver a un layout 100% reconstruido en DOM, este PR deja como fuente de verdad el arte final y sus coordenadas interactivas.
