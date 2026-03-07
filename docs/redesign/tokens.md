# Tokens & Reglas de Estilo (CSS Modules)

> Persistencia real del UI: si el valor no vive en un token, es deuda técnica.

## Principios
- Tokens por capas: **primitives → semantic → component**
- Los componentes consumen **semantic tokens** (evitar hex directos y px arbitrarios)
- Escalas compartidas: **spacing / tipografía / radius / shadow**

## Naming
- `--color-*` primitives
- `--text-*`, `--surface-*`, `--border-*`, `--interactive-*` semantic
- `--button-*`, `--card-*`, `--input-*` component (cuando exista necesidad real)

## Spacing scale
Usar estrictamente esta escala (declarada en `app/globals.css`):

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
- Si aparece un caso nuevo repetido, se agrega token (no se inventa en cada módulo).

## Typography scale
Declarada en `app/globals.css`:

- `--font-size-xs: 12px`
- `--font-size-sm: 14px`
- `--font-size-md: 16px`
- `--font-size-lg: 18px`
- `--font-size-xl: 20px`
- `--font-size-2xl: 24px`
- `--font-size-3xl: 32px`
- `--font-size-4xl: 40px`
- `--line-height-tight: 1.15`
- `--line-height-body: 1.5`

Reglas:
- Los títulos usan `--line-height-tight`.
- El texto normal usa `--line-height-body`.

## Radius / Shadow
- `--radius-sm: 4px`
- `--radius-md: 8px`
- Sombras: `--shadow-sm`, `--shadow-md`, `--shadow-lg`

## Aplicación en CSS Modules
- Tokens globales en `app/globals.css`
- Consumo desde módulos con `var(--token)`.
- Evitar estilos inline en React (se consideran deuda visual).
