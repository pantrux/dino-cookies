# Visual Quality Gates — Dino Cookies (QA visual / Release)

Este documento consolida un **checklist reusable** para validar calidad visual antes de merge/release.

> Objetivo: reducir regresiones visuales, mantener consistencia de sistema (tokens/escala) y asegurar un mínimo de accesibilidad y responsive sin sobreingeniería.

## Alcance

Aplicar cuando:
- El PR toca UI (CSS Modules, layout, tipografía, colores, spacing, componentes).
- Se ajustan tokens o reglas del design system.
- Se cambian rutas críticas del funnel: Home / productos / checkout / admin.

## Gate 0 — Preflight (obligatorio)

- [ ] `npm run lint`
- [ ] `npm run build`

> Si el PR es solo docs: marcar como N/A.

## Gate 1 — Evidencia visual (screenshots)

### Breakpoints mínimos
- [ ] Mobile: ~390×844 (≈ 375–430)
- [ ] Tablet: ~834×1112 (≈ 768)
- [ ] Desktop: ~1440×900

### Rutas mínimas a capturar
- [ ] `/` (Home)
- [ ] `/admin` (si aplica al PR)

### Cómo capturar (Playwright)

1) Instalar deps (una vez):

```bash
npm i
npx playwright install --with-deps
```

2) Capturar screenshots:

```bash
BASE_URL=https://dino-cookies.pages.dev npm run qa:visual:screenshots
```

Salida por defecto:
- `docs/redesign/audits/<YYYY-MM-DD>/screenshots/*.png`

Variables opcionales:
- `BASE_URL` (default: prod)
- `OUT_DIR` (override de carpeta de salida)

## Gate 2 — Checklist visual (UI polish)

### Jerarquía & tipografía
- [ ] Existe un **CTA primario** inequívoco (no compite con secundarios).
- [ ] Headings y body siguen una escala consistente (sin tamaños “random”).
- [ ] Line-height legible (aprox 1.4–1.6 en body).

### Color & contraste
- [ ] Contraste AA para texto normal (4.5:1) donde aplique.
- [ ] Los colores usados mapean a tokens (evitar hex “sueltos”).

### Spacing & consistencia
- [ ] Spacing usa escala/tokens (evitar valores mágicos repetidos).
- [ ] Radios/sombras consistentes (si aplica).

### Componentes e interacción
- [ ] Estados definidos: hover / focus / disabled.
- [ ] Sin layout shift en hover (evitar mover el layout).
- [ ] Focus visible (teclado) y orden de tab razonable.

## Gate 3 — Accesibilidad base (rápida)

- [ ] Navegación por teclado: Tab/Shift+Tab llega a CTAs y controles.
- [ ] Touch targets ≥ 44×44 en mobile (cuando aplique).
- [ ] `alt` en imágenes relevantes (si aplica).

## Gate 4 — Checklist de “no deuda visual”

- [ ] No se introducen estilos inline.
- [ ] No se introducen duplicaciones obvias de estilos (refactor mínimo si aparece).
- [ ] Si se agregan nuevos patrones, se documenta en:
  - `docs/redesign/tokens.md` (si es token/escala)
  - o `docs/redesign/design-system.md` (si es regla de sistema/estilo)

## Recomendación de práctica (sin burocracia)

- Para PRs UI: adjuntar 3–6 screenshots representativos en la descripción del PR (o link a carpeta `audits/<date>`).
- Si el PR cambia estética de forma relevante: agregar una mini-sección “Before/After” en el PR.
