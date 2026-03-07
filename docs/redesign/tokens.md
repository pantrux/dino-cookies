# Tokens & Reglas de Estilo (CSS Modules)

> Este documento se completa/ajusta tras la Fase 3.

## Principios
- Tokens por capas: **primitives → semantic → component**
- Los componentes usan **semantic tokens** (no hex directos, no px arbitrarios)

## Naming
- `--color-*` primitives
- `--text-*`, `--surface-*`, `--border-*`, `--interactive-*` semantic
- `--button-*`, `--card-*`, `--input-*` component

## Spacing scale
- (definir escala y prohibir valores fuera de ella)

## Radius / Shadow
- (definir y usar consistente)

## Aplicación en CSS Modules
- Recomendación: declarar tokens globales en `globals.css` (o equivalente) y consumirlos en módulos.
