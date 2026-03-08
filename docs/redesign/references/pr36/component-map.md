# PR-36 — Component map (reference → implementation)

Objetivo: mapear la referencia a componentes existentes/propuestos en el repo sin tocar código en este PR.

## 1) Secciones (page composition)

### A) Mast / Logo seal
- `Header` (existente)
  - **Cambio esperado en PR-37:** header “centrado + editorial”, menos navbar tradicional.
  - **Subcomponente sugerido:** `LogoSeal` (nuevo)

### B) Hero
- `Hero` (existente)
  - `HeroTitle` (H1)
  - `HeroSubcopy`
  - `HeroActions`
    - `PrimaryButton`
    - `SecondaryLink`
  - `DoodleLayer` (nuevo)

### C) Product highlights
- `ProductList` (existente)
  - **Item nuevo/sugerido:** `PolaroidProductCard`

### D) Bakery block
- **Nuevo sugerido:** `BakeryBlock`
  - `EditorialText`
  - `IllustrationFrame`

### E) Footer editorial
- `Footer` (si existe; si no, nuevo)

---

## 2) Estados por componente (Definition of Done)

### Buttons
- default / hover / active / focus-visible / disabled
- Focus ring: visible y consistente.

### PolaroidProductCard
- default: rotación leve + shadow offset
- hover: aumenta contraste (shadow/border), sin layout shift
- focus-visible: ring accesible

### Links
- default: underline fino (ink)
- hover: underline más grueso o background highlight sutil

---

## 3) CSS Modules — reglas
- Usar tokens (ver `docs/redesign/tokens.md`).
- Evitar valores mágicos repetidos.
- Evitar transforms que cambien el flujo.

---

## 4) QA visual
- Breakpoints: 375/768/1024/1440
- Checklist: `docs/redesign/VISUAL_QUALITY_GATES.md`
