# Auditoría UI (Fase 1) — PROD

- **Fecha:** 2026-03-07
- **Entorno:** Producción (Cloudflare Pages)
- **URL baseline:** https://241bd068.dino-cookies.pages.dev
- **Objetivo:** levantar hallazgos accionables (quick wins + items de rediseño) con evidencia, siguiendo `docs/redesign/PROCESS.md`.

## Evidencia (screenshots)

- `screenshots/desktop-1440x900.png`
- `screenshots/tablet-834x1112.png`
- `screenshots/mobile-390x844.png`

## Hallazgos (priorizados)

> Nota: este reporte es “fase 1” (inspección + evidencia). La fase siguiente es desglosar cada hallazgo en issues/PRs por sección/componente.

### P0 — Bloqueantes / alta fricción
1. **Accesibilidad base (contraste + focus visible)**
   - Asegurar contraste AA en textos y controles.
   - Estados `:focus-visible` consistentes y notorios (keyboard-friendly).

2. **Jerarquía tipográfica**
   - Definir escala (H1/H2/H3/body/small) para que el usuario entienda qué es título, qué es contenido y qué es “meta”.

### P1 — Quick wins (alto impacto, bajo costo)
1. **Espaciado y alineación**
   - Consolidar spacing tokens (4/8/12/16/24/32/48) y aplicarlos consistentemente.
   - Revisar gutters/paddings para evitar saltos entre secciones y “edge hugging” en mobile.

2. **Sistema de color (tokens)**
   - Definir tokens: `--color-bg`, `--color-surface`, `--color-text`, `--color-muted`, `--color-primary`, `--color-border`.
   - Mapear tokens a componentes (no usar colores hardcoded).

3. **Componentización mínima**
   - Botones/links: tamaños, radios, sombras (si aplica), variantes.
   - Cards (si existen): padding, borde, hover.

### P2 — Rediseño estructural (si aplica)
1. **IA (Information Architecture)**
   - Priorizar la propuesta de valor arriba del fold.
   - Reordenar secciones en base a objetivo del usuario (comprar / ver catálogo / historia / contacto, etc.).

## DoD (Definition of Done) de Auditoría
- [x] URL baseline definida
- [x] Evidencia visual (desktop/tablet/mobile)
- [x] Hallazgos priorizados (P0/P1/P2)
- [ ] Issues/PRs por hallazgo (pendiente: Fase 2)

## Próximos pasos
1. Crear **PR-3 (Quick wins)**: tokens + escala tipográfica + spacing base.
2. Crear issues por sección para el rediseño estructural (si aplica) y enlazarlos al proceso.
