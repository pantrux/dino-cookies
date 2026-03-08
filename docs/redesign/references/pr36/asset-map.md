# PR-36 — Asset map (reference image)

Objetivo: inventario de assets necesarios para replicar la referencia con alta fidelidad.

## 1) Assets “must-have”

### 1.1 Background paper texture
- **Tipo:** imagen repetible (WebP/PNG) o SVG filter.
- **Uso:** overlay con `mix-blend-mode: multiply` / `opacity` baja.
- **Requisitos:**
  - peso pequeño (< 40KB si es raster)
  - sin patrones obvios
  - escalable

**Opciones implementación**
- A) `public/textures/paper-noise.webp`
- B) `public/textures/paper-noise.png`
- C) SVG noise (feTurbulence) embebido (cuidado con compat/perf).

### 1.2 Logo seal (circular)
- **Tipo:** SVG (preferible) o imagen WebP.
- **Uso:** centrado arriba, con borde tinta y microtexto.
- **Notas:** si el logo es tipográfico, conviene vectorizar para nitidez.

### 1.3 Doodles (line art)
- **Tipo:** SVG stroke.
- **Lista**
  - Dino doodle (hero / bakery)
  - Nubes (2–4 variantes)
  - Separators / mini elementos (estrellas, hojas, migas)

**Guía estilo SVG**
- `stroke: var(--ink-900)`
- `stroke-width`: 2–3 (escala según viewport)
- `fill: none`
- `stroke-linecap: round; stroke-linejoin: round`

### 1.4 Product media
- **Tipo:** WebP (preferible).
- **Uso:** dentro de cards tipo polaroid.
- **Tratamiento:**
  - recorte consistente (1:1 o 4:3)
  - border fino y/o shadow interior suave

---

## 2) Assets “should-have” (para clavar atmósfera)

### 2.1 Paper edge / vignette
- **Tipo:** CSS (gradientes) o imagen.
- **Objetivo:** dar profundidad sin ensuciar.

### 2.2 Stamp / badge editorial
- **Tipo:** SVG.
- **Uso:** micro-elemento decorativo (ej. “Baked Daily”).

---

## 3) Assets “nice-to-have”
- Set de ilustraciones adicionales para futuras secciones.

---

## 4) Qué debe ser CSS (no imágenes)

### Polaroid cards
- Borde tinta + shadow offset + rotación: **CSS**.
- Fondo card: `--surface-card` (paper clara).

### Dividers editoriales
- Línea horizontal (1–2px) + ornamento mínimo: **CSS o SVG** (si ornamento complejo).

---

## 5) Checklist de performance
- Todas las imágenes raster:
  - WebP (o AVIF si se habilita)
  - `next/image` donde aplique
  - dimensiones definidas (evitar CLS)
