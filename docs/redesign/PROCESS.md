# Rediseño UI/UX — Proceso persistente (Auditoría + Rediseño)

Este documento es el **contrato de trabajo** para el rediseño del sitio. La idea es que sea **repetible y consistente** incluso si cambian sesiones, personas o contexto.

## Objetivo
- Elevar **calidad visual (UI polish)** + **claridad de conversión**.
- Mantener implementación **compatible con Next.js App Router + CSS Modules**.
- Evitar deuda visual: todo cambio debe quedar alineado a tokens/escala.

## Plan persistente (no improvisar)
- Roadmap hacia MVP por PR: `docs/redesign/MVP_PLAN.md`
- Regla: cualquier cambio de alcance/orden se hace actualizando ese plan en un PR dedicado.

## Skills (obligatorias) y para qué se usan

### 1) `ui-design-review` (Auditoría visual)
**Salida obligatoria:** `docs/redesign/audits/audit-YYYY-MM-DD.md`
- Jerarquía visual
- Tipografía
- Color
- Spacing/white space
- Consistencia
- Componentes (buttons/forms/cards)
- Imágenes
- Layout/grid
- Branding/personalidad
- Estándares modernos

### 2) `ui-ux-pro-max` (Dirección visual + recomendación de sistema)
**Salida obligatoria:** `docs/redesign/design-system.md`
- Dirección visual (A/B/C)
- Paleta y roles
- Tipografías
- Layout recomendado para landing
- Anti-patterns a evitar

### 3) `design-system-patterns` (Tokens + arquitectura de estilos)
**Salida obligatoria:** `docs/redesign/tokens.md`
- Tokens (primitives → semantic → component)
- Convenciones de naming
- Cómo se aplican en CSS Modules

### 4) `frontend-design` (UI craft / implementación estética)
**Uso:** durante implementación de componentes.
- Micro-interacciones (sin layout shift)
- Estados hover/focus/disabled
- Detalles de layout y composición

### Complementaria: `product-designer`
**Uso:** para journey y estructura de contenido (si hay cambios de copy/flujo).

---

## Flujo de trabajo (fases)

### Fase 0 — Inputs
**Requerido:** URL staging/deploy + screenshots (desktop + mobile) de:
- Home (hero + primer CTA)
- Sección productos
- Formulario / checkout
- Footer

### Fase 1 — Auditoría (solo diagnóstico)
1. Ejecutar auditoría visual con `ui-design-review`.
2. Generar reporte en `docs/redesign/audits/`.
3. Definir **Top 10 issues** con severidad y esfuerzo.

### Fase 2 — Dirección visual + Sistema base
1. Con `ui-ux-pro-max`, definir:
   - Estilo: Premium minimal / Playful dino / Híbrido
   - Paleta + tipografías
   - Estructura landing (secciones y orden)
2. Guardar en `docs/redesign/design-system.md`.

### Fase 3 — Tokens y reglas (persistencia real)
1. Con `design-system-patterns`, definir tokens y escalas.
2. Guardar en `docs/redesign/tokens.md`.
3. Regla: **cero valores mágicos** (spacing, radios, sombras) fuera del sistema.

### Fase 4 — Implementación
1. Aplicar tokens y refactors progresivos.
2. Ejecutar mejoras por componente (Header/Hero/ProductCard/Form/Footer).
3. `frontend-design` guía el acabado visual.

### Fase 5 — QA visual y criterios de aceptación
- Responsive: 375 / 768 / 1024 / 1440.
- Accesibilidad base:
  - Contraste AA (mínimo 4.5:1 para texto normal)
  - Focus visible
  - Touch targets >= 44x44
- Performance: imágenes optimizadas (evitar `<img>` si corresponde; preferir `next/image`).

---

## Definition of Done (DoD)
Un PR de rediseño se considera listo cuando:
- Incluye update de docs (`audits/` o `design-system.md` o `tokens.md` según aplique).
- No introduce estilos inline.
- No introduce valores mágicos repetidos.
- Componentes tocados tienen estados hover/focus/disabled.
- Validado en mobile + desktop.
