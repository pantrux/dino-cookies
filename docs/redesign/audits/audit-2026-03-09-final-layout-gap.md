# Auditoría UI — Gap vs layout final (Referencia “Dino Cookies”)

**Repo:** `pantrux/dino-cookies`
**Fecha:** 2026-03-09
**Objetivo:** documentar por qué el sitio actual sigue **lejos** del diseño final de referencia y convertirlo en backlog ejecutable por PRs.

> Fuente de verdad: imagen de referencia compartida por el usuario (layout final).

---

## 0) Resumen ejecutivo

**Estado actual:** el sitio ya avanzó hacia un “paper/ink + editorial” en tokens, pero aún se percibe como **tema derivado** (no como el arte final) por 5 gaps mayores: **branding/logo, pergamino real, tipografías, botones, y composición de fondos/doodles**.

**Recomendación:** ejecutar un ciclo corto (3–5 PRs) siguiendo `PROCESS.md` para cerrar fidelidad visual con bajo riesgo:

1) Dirección visual cerrada (update `design-system.md` orientado 100% a la referencia)
2) Tokens de composición (pergamino + tinta + sombras “print” + botones)
3) Implementación: logo/brand seal + fuentes + background/ornamentos + botones
4) QA visual con screenshots 375/768/1024/1440

---

## 1) Top Issues (prioridad)

### P0 — Branding/Logo no se parece
- **Problema:** el `logo-v3.png` no transmite el “sello circular / bakery stamp” de la referencia.
- **Impacto:** la página pierde identidad inmediatamente; aunque el layout mejore, seguirá sintiéndose “otra cosa”.
- **Recomendación:** reemplazar por **SVG seal** (vector) o PNG renderizado desde vector.
- **Esfuerzo:** Medio.

### P0 — Fondo pergamino y atmósfera insuficientes
- **Problema:** el fondo actual es crema + gradientes + ruido leve, pero no se percibe como **pergamino con profundidad**.
- **Impacto:** sin la “atmósfera”, todo lo demás se ve plano.
- **Recomendación:** construir “paper stack”:
  - vignetting suave
  - manchas/variaciones (radiales) más notorias
  - textura (noise) con opacidad calibrada
  - borde/sombra exterior opcional (marco)
- **Esfuerzo:** Medio.

### P0 — Tipografía no coincide con el arte final
- **Problema:** aunque hay tipografía editorial, no replica el look “poster heritage” de la referencia.
- **Impacto:** cambia por completo el tono (de moderno/editorial a bakery vintage).
- **Recomendación:** fijar un stack:
  - Display: **DM Serif Display** o **Bodoni Moda** (según fidelidad buscada)
  - Body: **Source Serif 4** / **EB Garamond**
  - Accent labels: **Fraunces** (small-caps)
  - Implementar con `next/font` y tokens `--font-display/--font-serif/--font-accent`.
- **Esfuerzo:** Medio.

### P0 — Botones no se parecen
- **Problema:** hoy los CTAs tienen estilos correctos pero no clavan: radios, sombra “print”, mayúsculas/letterspacing, altura/padding.
- **Recomendación:** definir tokens de botón (altura, radio pill, sombra offset) y aplicar:
  - Primario oliva con sombra dura
  - Secundario outline crema con borde tinta
  - Estados hover/active sin layout shift
- **Esfuerzo:** Bajo–Medio.

### P1 — Fondos/ornamentos (doodles) incompletos
- **Problema:** hay doodles, pero faltan piezas de composición (nubes, remolinos, elementos laterales) y coherencia de stroke.
- **Recomendación:** set de SVGs coherentes (mismo `stroke-width` y opacidad), y layout por capa.
- **Esfuerzo:** Medio.

---

## 2) Dimensiones (score rápido)

- **Jerarquía:** 6/10 (mejoró, pero la referencia es más “hero poster”)
- **Tipografía:** 3/10 (gap grande vs referencia)
- **Color/Paleta:** 6/10 (roles ok; falta “paper depth”)
- **Consistency:** 6/10
- **Imagery:** 4/10 (faltan assets clave: sello/logo + doodles + pergamino)
- **Component craft (botones):** 4/10

---

## 3) Plan propuesto (PRs)

### PR-44 — Dirección visual cerrada (design-system)
- Ajustar `docs/redesign/design-system.md` para que el target sea **literalmente** la referencia (no “premium-lite”).

### PR-45 — Tokens de “paper/ink + print”
- `docs/redesign/tokens.md` + tokens en `globals.css` (si aplica):
  - sombras print
  - radios pill
  - botones
  - layers de background paper

### PR-46 — Implementación: Logo seal + Fonts + Background + Buttons
- Assets en `public/` (SVG/PNG)
- `app/layout.js` con `next/font`
- updates en `Header`, `Button`, wrapper del `page`.

### PR-47 — QA visual (evidencia)
- Capturas por breakpoint, checklist `VISUAL_QUALITY_GATES.md`.

---

## 4) Criterios de aceptación (DoD de fidelidad)

- A primera vista, el usuario debe decir: **“sí, es esa imagen”**.
- Logo/sello centrado con look bakery.
- Fondo pergamino perceptible (sin parecer “solo beige”).
- Tipografías: el H1 se siente “poster/heritage”, no “landing moderna”.
- Botones: pill + sombra hard-print + small-caps/letterspacing.
