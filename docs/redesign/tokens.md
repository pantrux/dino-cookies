# Tokens & Reglas de Estilo (CSS Modules)

> Persistencia real del UI: si el valor no vive en un token, es deuda técnica.

## Principios
- Tokens por capas: **primitives → semantic → component**
- Los componentes consumen **semantic tokens** (evitar hex directos y px arbitrarios)
- Escalas compartidas: **spacing / tipografía / radius / shadow**
- Si aparece un caso nuevo **repetido**, se agrega token (no se inventa en cada módulo).

## Naming
- `--color-*` primitives
- `--text-*`, `--surface-*`, `--border-*`, `--interactive-*` semantic
- `--button-*`, `--card-*`, `--input-*`, `--control-*` component (cuando exista necesidad real)

---

## Color tokens

### Primitives
- Brand: `--color-brand-*`
- Neutrals: `--color-neutral-*`
- Status: `--color-error-*`, `--color-success-*`, `--color-warning-*` (usar `700` para texto/interactive cuando aplique contraste)
- Accent (uso acotado): `--color-accent-*`

### Semantic roles (consumir desde UI)
- Surfaces: `--surface-page`, `--surface-elevated`, `--surface-subtle`, `--surface-muted`
- Text: `--text-primary`, `--text-secondary`, `--text-muted`, `--text-inverse`
- Borders: `--border-subtle`, `--border-default`
- Interactions: `--interactive-primary`, `--interactive-primary-hover`, `--interactive-primary-active`
- Focus: `--focus-ring`
- Disabled: `--interactive-disabled-bg`, `--interactive-disabled-text`, `--interactive-disabled-border`
- States: `--text-danger/success/warning`, `--surface-error/success/warning`

Reglas:
- El **magenta** (brand) se usa para CTA primario y estados importantes, no como decoración masiva.
- Evitar hex directos en módulos (salvo casos excepcionales justificados).

---

## Spacing scale
Declarada en `app/globals.css` (usar estrictamente la escala):

- `--space-1: 4px`
- `--space-2: 8px`
- `--space-3: 12px`
- `--space-4: 16px`
- `--space-5: 20px`
- `--space-6: 24px`
- `--space-8: 32px`
- `--space-10: 40px`
- `--space-12: 48px`
- `--space-16: 64px`
- `--space-20: 80px`
- `--space-24: 96px`

Reglas:
- Evitar `padding: 17px`, `gap: 22px`, etc.

---

## Typography tokens

> Objetivo: no hardcodear tamaños/pesos/line-heights en módulos.

### Font sizes
Declarada en `app/globals.css`:

- `--font-size-xs: 12px`
- `--font-size-sm: 14px`
- `--font-size-md: 16px`
- `--font-size-lg: 18px`
- `--font-size-xl: 20px`
- `--font-size-2xl: 24px`
- `--font-size-3xl: 32px`
- `--font-size-4xl: 40px`
- `--font-size-5xl: 48px`

### Line heights
- `--line-height-tight: 1.15`
- `--line-height-heading: 1.2`
- `--line-height-snug: 1.25`
- `--line-height-small: 1.4`
- `--line-height-body: 1.5`
- `--line-height-relaxed: 1.6`

### Font weights
- `--font-weight-normal: 400`
- `--font-weight-medium: 500`
- `--font-weight-semibold: 600`
- `--font-weight-bold: 700`

Reglas:
- Headings: `--font-weight-bold` + `--line-height-tight` (o `--line-height-heading` según caso)
- Body: `--line-height-body` o `--line-height-relaxed` para textos largos.

---

## Radius / Shadow
- `--radius-sm: 4px`
- `--radius-md: 8px`
- Sombras: `--shadow-sm`, `--shadow-md`, `--shadow-lg`

---

## Component tokens (para cumplir reglas sin hardcode)

### Controles (inputs / selects / buttons)
- `--control-height: 44px` (mínimo táctil)
- `--control-padding-x`, `--control-padding-y`
- `--button-height`, `--input-height` (alias por claridad)

Reglas:
- Para altura de botón/input: **usar `--control-height`**, no inventar 44px en módulos.

---

## Aplicación en CSS Modules
- Tokens globales en `app/globals.css`.
- Consumo desde módulos con `var(--token)`.
- Evitar estilos inline en React (se consideran deuda visual).
