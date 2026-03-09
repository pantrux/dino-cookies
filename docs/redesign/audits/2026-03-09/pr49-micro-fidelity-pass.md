# PR-49 — Micro-fidelity pass final del home

**Fecha:** 2026-03-09
**Objetivo:** cerrar diferencias visibles menores contra la referencia final tras los PRs 40–48, sin cambiar la arquitectura del layout.

## Ajustes aplicados

### 1) Hero más editorial
- Se redujo el aire superior para acercar el mast + hero al look de póster.
- El `h1` ganó escala, tracking más ajustado y mejor balance visual.
- El subtítulo quedó más contenido para reforzar jerarquía.

### 2) Atmósfera paper/ink más profunda
- Se intensificó el fondo tipo pergamino con una capa radial adicional y un poco más de textura.
- Se reforzó la separación visual entre contenido y fondo sin endurecer el contraste general.

### 3) Composición con ornamentos
- Se integraron doodles/ornamentos sutiles en el hero y en la sección de productos.
- La intención es que se sientan como parte del layout, no como stickers aislados.
- Fix post-review: los ornamentos de `ProductList` quedaron explícitamente detrás del contenido usando `isolation: isolate` + `z-index: -1`.

### 4) Masthead refinado
- Se compactó levemente el header.
- Se afinó la regla decorativa y la posición del utilitario para mejorar ritmo vertical.

## Archivos modificados
- `app/page.module.css`
- `components/Header.module.css`
- `components/Hero.module.css`
- `components/ProductList.module.css`

## Evidencia visual
- Baseline previo al pass:
  - `docs/redesign/audits/2026-03-09/pr49-baseline/`
- Resultado posterior al pass:
  - `docs/redesign/audits/2026-03-09/pr49-fidelity-pass/`

## Verificación
- `npm run build` ✅
- Capturas en desktop / tablet / mobile ✅
