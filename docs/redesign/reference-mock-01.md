# PR-36 — Reverse-engineer visual spec from reference image (Mock 01)

> Este documento es una **spec implementable** (no código) para replicar con alta fidelidad la landing de referencia: estética **vintage/artesanal + jurásico premium**.
>
> **Input visual (fuente de verdad):** imagen de referencia compartida por el usuario.
> - Fondo tipo **pergamino/crema** con textura sutil.
> - **Logo circular** centrado arriba.
> - Heading **serif/condensado** grande, editorial.
> - CTA principal **oliva**.
> - Cards de productos tipo **polaroid** levemente rotadas.
> - Ilustraciones **doodle** (dinosaurio, nubes, elementos orgánicos) en tinta.
> - Bloque secundario “Bakery” con ilustración.
> - Footer editorial.

## Objetivo
- Dejar definida una guía de implementación para que el siguiente PR pueda construir un landing **visualmente “idéntico”** usando Next.js + CSS Modules.
- Minimizar valores mágicos usando tokens (sin imponer cambios en este PR).

## Non-goals (explícito)
- No implementar el landing final en este PR.
- No rehacer copy/estructura de producto fuera de lo necesario.

---

## 1) Layout — descomposición por secciones (desktop-first + adaptación)

### 1.1 Estructura general (vertical)
1. **Top mast / logo seal** (centrado)
2. **Hero editorial**
   - H1 grande (2 líneas)
   - Subcopy breve
   - CTA primaria (oliva) + CTA secundaria (link/outline)
   - Doodles flotantes (nubes / mini elementos)
3. **Product highlights** (cards tipo polaroid)
   - 3–4 cards en row (desktop)
   - Cada card: foto/ilustración producto + label + precio/descriptor
   - Rotación alternada (-2° / +2° / -1° / +1°)
4. **Secondary story block: “Bakery”**
   - Layout 2 columnas: texto editorial + ilustración (dino/horno/masa)
   - CTA secundaria si aplica
5. **Footer editorial**
   - Links en columnas (tipo revista)
   - Pequeña nota/claim

### 1.2 Grid / contenedor
- Contenedor principal centrado: `max-width` ~ **1120–1200px**.
- Padding lateral:
  - Mobile: 16–20px
  - Tablet: 24–32px
  - Desktop: 40–56px

### 1.3 Breakpoints recomendados (para QA visual)
- 375 (mobile)
- 768 (tablet)
- 1024 (laptop)
- 1440 (desktop)

---

## 2) Tipografía — jerarquía y alternativas reales (web)

### 2.1 Objetivo tipográfico
- Sensación **editorial/heritage** (panadería premium) + toque “artesanal”.
- Headings: serif con alto contraste / vibe “poster”.
- Body: serif legible (o sans muy neutral, pero idealmente serif para mantener coherencia vintage).

### 2.2 Stack recomendado (Google Fonts)
**Opción A (recomendada por fidelidad vintage + legibilidad):**
- Display/Headings: **Bodoni Moda** (700–900)
- Body: **Source Serif 4** (400–600)
- Accent (microlabels o stamps): **Fraunces** (semi-condensed feel con optical sizing)

**Opción B (más cálida, menos fashion):**
- Display/Headings: **DM Serif Display**
- Body: **EB Garamond**
- Accent: **Cormorant SC** (small caps, sello editorial)

**Opción C (si se necesita “condensed” más marcado):**
- Display/Headings: **Playfair Display** + tracking negativo y line-height apretado
- Body: **Libre Baskerville**

> Nota: la referencia se percibe **condensada**. Si la fuente elegida no soporta `font-stretch`, replicar con:
> - `letter-spacing: -0.02em` a `-0.04em` en H1
> - `line-height: 0.95–1.05`
> - peso 700–900

### 2.3 Escala tipográfica (aprox.)
- H1: 56–72px (desktop), 38–46px (mobile)
- H2: 32–40px (desktop), 26–30px (mobile)
- Body: 16–18px
- Small: 12–14px

### 2.4 Detalles “editorial”
- Uso consistente de **small caps** / `font-variant-caps: all-small-caps` en labels.
- Subrayados finos o separators tipo línea de tinta.

---

## 3) Color — paleta aproximada (roles + hex sugeridos)

> El objetivo no es clavar el HEX “científico” todavía, sino dejar una paleta funcional para tokens.

### 3.1 Neutrales (pergamino + tinta)
- `paper-50`: **#FBF7ED** (fondo crema)
- `paper-100`: **#F4EEDC** (variación más cálida)
- `paper-200`: **#E9DFC8** (borde/sombra suave)
- `ink-900`: **#22211D** (tinta principal)
- `ink-700`: **#3A382F** (texto secundario)

### 3.2 Accentos
- `olive-600`: **#5E6B3A** (CTA primaria)
- `olive-700`: **#4F5B31** (hover)
- `terracotta-500`: **#C56A4B** (micro-accent cálido)
- `sky-300`: **#AFC6DE** (nubes/doodle suave)

### 3.3 Semánticos sugeridos (para tokens)
- `--surface-page`: `paper-50`
- `--surface-card`: `#FFFCF4`
- `--text-primary`: `ink-900`
- `--text-muted`: `ink-700`
- `--border-strong`: `ink-900` (polaroid)
- `--action-primary-bg`: `olive-600`
- `--action-primary-fg`: `paper-50`

### 3.4 Accesibilidad / contraste
- CTA oliva debe mantener contraste AA con texto claro; si falla, usar texto `ink-900` sobre oliva clara (alternativa).

---

## 4) Spacing / radius / shadow / border language

### 4.1 Spacing (escala)
- Base: 4px
- Paso recomendado: 4 / 8 / 12 / 16 / 24 / 32 / 40 / 56 / 72

### 4.2 Bordes y radios
- Lenguaje “papel/tinta”:
  - Bordes visibles (1.5–2px) en `ink-900`
  - Radios bajos: 8–14px (polaroid)
  - Logo seal: círculo perfecto (999px)

### 4.3 Sombras (estética offset, no material)
- Polaroid: sombra **dura** tipo impresión
  - `shadow-polaroid`: `6px 6px 0 rgba(34,33,29,0.9)`
- Elementos suaves (si aplica):
  - `shadow-soft`: `0 18px 50px rgba(34,33,29,0.12)`

### 4.4 Textura del fondo
- Overlay sutil de grano/noise (muy baja opacidad 0.03–0.06)
- Alternativa: SVG noise o PNG/WebP pequeño repetible.

---

## 5) Component inventory (y estados)

### 5.1 Header / Mast
- **LogoSeal** (circular)
  - Estados: normal + hover (ligera rotación 1° o sombreado)

### 5.2 Hero
- **HeroTitle (H1)**
- **HeroSubcopy**
- **PrimaryCTAButton**
  - estados: default/hover/active/focus/disabled
- **SecondaryCTA** (link/outline)
  - estados: hover/focus
- **DoodleLayer** (nubes/elementos)

### 5.3 Product section
- **PolaroidCard**
  - default
  - hover (aumenta contraste de borde/sombra sin mover layout)
  - focus (ring visible; accesible)
- **ProductTag** (small caps)

### 5.4 Bakery block
- **EditorialBlock** (2 col)
- **IllustrationFrame** (borde tinta, fondo paper)

### 5.5 Footer editorial
- **FooterColumns**
- **FooterLink** (subrayado fino)

---

## 6) Asset map — qué es imagen/SVG/CSS

**Ver documento dedicado:** `docs/redesign/references/pr36/asset-map.md`.

Resumen rápido:
- Logo circular: ideal **SVG** (vector)
- Doodles (dino/nubes): ideal **SVG** (stroke)
- Textura de grano: **PNG/WebP** repetible o SVG filter
- Cards “polaroid”: **CSS** (border + shadow + rotate)
- Fotos productos: WebP/JPG optimizadas

---

## 7) Estrategia para replicar “idéntico” (iterativa + visual diff)

### 7.1 Método
1. **Clavar estructura** (secciones y proporciones)
2. **Clavar tipografía** (familias + escala + tracking)
3. **Clavar lenguaje de card polaroid** (borde/sombra/rotación)
4. **Agregar textura + doodles** (atmósfera)
5. **Ajuste fino** (espaciados, alineaciones, microdetalles)

### 7.2 Visual regression / evidencia
- Usar screenshots consistentes por breakpoint (ver `docs/redesign/VISUAL_QUALITY_GATES.md`).
- Reutilizar el script existente:
  - `docs/redesign/scripts/capture_audit_screenshots.mjs`
- Guardar comparativas “antes/después” para PR-37/38.

### 7.3 Regla anti-CLS
- Rotaciones y sombras no deben alterar el flujo:
  - Aplicar `transform: rotate(...)` sobre wrapper con espacio reservado.
  - Hover/focus: **no** cambiar padding/size, solo color/shadow/transform leve.

---

## 8) Riesgos de fidelity + mitigaciones

1. **Mismatch de tipografía (condensed look)**
   - Mitigación: pruebas A/B con 2–3 stacks; ajustar tracking/line-height/peso.

2. **Textura “paper” demasiado falsa**
   - Mitigación: usar overlay de noise + sutil gradiente radial (muy low contrast).

3. **Doodles inconsistentes (stroke vs fill)**
   - Mitigación: estandarizar SVG con `stroke: ink-900; stroke-width` consistente; evitar mezclar estilos.

4. **Polaroids rompen en mobile (rotaciones/overflows)**
   - Mitigación: reducir rotación a 0–1° en <= 375 y usar grid 1 columna.

5. **Contraste del CTA oliva**
   - Mitigación: ajustar olive (más oscuro) o texto (más oscuro) hasta AA.

---

## 9) Propuesta concreta de siguientes PRs

### PR-37: Implement base layout + typography + background atmosphere
**Objetivo**
- Implementar el “mundo” de la página: fondo pergamino + contenedor + tipografías + header/hero.

**Entregables**
- Tokens mínimos (si aplica) o uso consistente de los existentes.
- Header + Hero re-estilizados.
- Background (paper + noise overlay) sin degradar performance.

**Verificación**
- `npm run build`
- Capturas 375/768/1024/1440.

### PR-38: Implement Polaroid cards + Bakery block + Footer editorial
**Objetivo**
- Completar el look distintivo: cards polaroid rotadas, doodles, bloque Bakery y footer.

**Verificación**
- `npm run build`
- Visual QA (gates) + estados hover/focus.

---

## 10) Component map (para implementación)
**Ver documento dedicado:** `docs/redesign/references/pr36/component-map.md`.
