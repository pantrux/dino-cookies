# Plan de Rediseño hacia MVP — Dino Cookies (Roadmap por PR)

> Este plan es **persistente** y es la fuente de verdad para ejecutar el rediseño en PRs incrementales.
> Regla: **no improvisar** cambios fuera de este plan. Si aparece trabajo nuevo, se agrega como PR al plan (con su justificación) antes de implementarlo.

## Contexto
- Repo: `pantrux/dino-cookies`
- Stack: Next.js (App Router) + CSS Modules
- Objetivo: elevar **UI polish**, **consistencia visual** y **claridad de conversión** hasta un MVP (sitio sólido, coherente, accesible y rápido).

## Reglas operativas (obligatorias)
1. **Siempre leer y seguir** `docs/redesign/PROCESS.md` antes de tocar UI.
2. **Secuencia obligatoria de skills/entregables** (antes de implementación):
   1) `ui-design-review` → `docs/redesign/audits/audit-YYYY-MM-DD.md`
   2) `ui-ux-pro-max` → `docs/redesign/design-system.md`
   3) `design-system-patterns` → `docs/redesign/tokens.md`
   4) `frontend-design` → implementación/craft
   5) `product-designer` → solo si cambia flujo/copy/journey
3. Criterios mínimos por PR de UI:
   - 0 estilos inline nuevos
   - 0 valores mágicos repetidos (usar tokens)
   - estados hover/focus/disabled completos
   - validación responsive 375 / 768 / 1024 / 1440
   - a11y base: focus visible, targets >= 44x44, contraste AA cuando aplique
4. **1 PR = 1 tópico** en Telegram. Al abrir tópico nuevo: resumen inicial + recordatorio del proceso.
5. Título PR en GitHub: `PR-{NÚMERO}: {TÍTULO}`.

## Cómo leer este plan
- **PR #{TBD}**: el número se asigna al crear el PR real.
- Cada PR declara (explícitamente): **Objetivo**, **Entregables**, **Verificación** y **Riesgos**.
- Si una sección no aplica (p. ej. PR solo docs), se indica como **N/A**.

---

## Fase A — Auditoría y Dirección (bloquea decisiones de estética)

### PR #{TBD-A1}: Auditoría visual completa (PROD + Admin)
**Skill principal:** `ui-design-review`

**Objetivo**
- Consolidar diagnóstico en un único reporte con top issues priorizados para Home/Checkout y Admin.

**Entregables (docs)**
- `docs/redesign/audits/audit-YYYY-MM-DD.md`
  - Evidencia visual (links o screenshots) para 375/768/1024/1440
  - Top 10 issues con severidad (P0/P1/P2) + esfuerzo (S/M/L)
  - Mapa de componentes impactados

**Scope UI (sin cambios de código)**
- Home (hero, productos, reviews, order form, footer)
- Admin dashboard

**Criterio de aceptación**
- Reporte con issues accionables (cada issue mapea a PRs del plan).

**Verificación**
- N/A (solo documentación)

**Riesgos**
- Bajo: riesgo principal es scope creep (mitigar manteniendo el top-issues priorizado y mapeado a PRs)

---

### PR #{TBD-A2}: Dirección visual y sistema base (variantes + decisiones)
**Skill principal:** `ui-ux-pro-max`

**Objetivo**
- Definir dirección visual única (no mezclar estilos), con reglas claras.

**Entregables (docs)**
- Actualizar `docs/redesign/design-system.md` con:
  - Dirección visual final (una de: Premium minimal / Playful dino / Híbrido)
  - Paleta por roles (semantic)
  - Tipografías (headings/body) + escala
  - Layout recomendado de landing (secciones y orden)
  - Anti-patterns (lista explícita)

**Criterio de aceptación**
- Decisiones de estilo “cerradas” para evitar churn en PRs de implementación.

**Verificación**
- N/A (solo documentación)

**Riesgos**
- Medio: decisiones demasiado vagas generan reinterpretaciones en implementación (mitigar: ejemplos + anti-patterns explícitos)

---

## Fase B — Design System y Tokens (habilita consistencia)

### PR #{TBD-B1}: Hardening del sistema de tokens (primitives → semantic → component)
**Skill principal:** `design-system-patterns`

**Objetivo**
- Completar arquitectura de tokens (incluyendo colores semánticos y componentes clave) y definir reglas de consumo.

**Entregables (docs)**
- Actualizar `docs/redesign/tokens.md` con:
  - tabla de roles semánticos (text/surface/border/interactive)
  - tokens por componente (Button/Input/Card) solo si hay necesidad real
  - convenciones de naming y ejemplos

**Entregables (código)**
- `app/globals.css`:
  - consolidar tokens de color (primitives + semantic)
  - agregar tokens de interacción (hover/focus/disabled)
  - tokens para estados de formulario (error/success/warn)

**Verificación**
- `npm run build`
- grep defensivo: no introducir hex/px mágicos repetidos donde existan tokens

---

## Fase C — Implementación (UI craft por componente)

> Regla: cada PR de implementación toca un conjunto pequeño y coherente de componentes.

### PR #{TBD-C1}: Buttons + Links (componente visual base)
**Skill principal:** `frontend-design`

**Objetivo**
- Unificar botones/links (estados, tamaños, foco, accesibilidad).

**Entregables (código)**
- Crear/ajustar estilos base para botones (según arquitectura actual del repo):
  - si existen componentes React: `components/Button/*`
  - si no: normalizar clases CSS Modules + tokens component-level
- Asegurar:
  - hover sin layout shift
  - focus visible consistente
  - disabled legible

**Criterio de aceptación**
- Botones de Home y Admin se ven coherentes y “de producto”.

**Verificación**
- Storybook / render manual (si aplica) + verificación responsive 375/768/1024/1440
- Navegación por teclado (tab/shift+tab) + focus visible
- `npm run build`

**Riesgos**
- Medio: cambios de estilos pueden romper layouts existentes (mitigar: cambios acotados + validar Home/Admin)

---

### PR #{TBD-C2}: Inputs + Form (OrderForm / Admin forms)
**Skill principal:** `frontend-design`

**Objetivo**
- Formularios con consistencia visual, spacing correcto y estados (error/disabled) bien resueltos.

**Entregables**
- Refactor CSS Modules de inputs para tokens.
- Estados: default/hover/focus/error/disabled.

**Verificación**
- Responsive + navegación teclado
- Estados: default/hover/focus/error/disabled
- `npm run build`

**Riesgos**
- Medio: inconsistencias entre formularios Home/Admin (mitigar: normalizar estilos base y tokens)

---

### PR #{TBD-C3}: Header/Nav + Hero (jerarquía y composición)
**Skill principal:** `frontend-design`

**Objetivo**
- Mejorar jerarquía visual y claridad de CTA sin cambiar copy (salvo que se active `product-designer`).

**Entregables**
- Ajustes de layout/spacing usando escala.
- Mejoras de tipografía (tamaños/line-height) según design system.

**Verificación**
- Responsive 375/768/1024/1440 + check de jerarquía (H1/H2) y CTA
- Focus visible en nav/CTA + targets >= 44x44 donde aplique
- `npm run build`

**Riesgos**
- Medio: cambios en header pueden impactar navegación y CLS (mitigar: validar layout stable y spacing)

---

### PR #{TBD-C4}: ProductCard + ProductList (grid, densidad, consistencia)
**Skill principal:** `frontend-design`

**Objetivo**
- Cards con mejor estructura, consistencia de spacing y estados (hover/focus).

**Entregables**
- Ajuste de layout grid responsivo.
- Tokens para card (si aplica) + sombras/radius consistentes.

**Verificación**
- Grid responde bien en 375/768/1024/1440 (sin overflow)
- Hover/focus sin layout shift
- `npm run build`

**Riesgos**
- Bajo/Medio: riesgo de densidad/spacing inconsistente si se tocan múltiples cards (mitigar: tokens + revisión comparativa)

---

### PR #{TBD-C5}: Social proof (Reviews) + Footer (acabado y confianza)
**Skill principal:** `frontend-design`

**Objetivo**
- Mejorar percepción de confianza y cierre de página.

**Entregables**
- Ajustes de composición + typography.
- Footer sin ruido visual + buen contraste.

**Verificación**
- Responsive 375/768/1024/1440 + contraste AA cuando aplique
- `npm run build`

**Riesgos**
- Bajo: riesgo principal es degradar legibilidad/contraste (mitigar: checklist a11y base)

---

## Fase D — Performance, Imágenes y QA final (MVP readiness)

### PR #{TBD-D1}: Migración de imágenes críticas a `next/image` + performance hygiene
**Skills:** `frontend-design` (impacto visual) + (si se requiere) `devexpert` para quality gates

**Objetivo**
- Reducir CLS/LCP y estandarizar manejo de assets.

**Entregables**
- Reemplazar `<img>` donde aplique por `next/image`.
- Revisar warning `outputFileTracingRoot` (si sigue presente) y documentar/ajustar.

**Verificación**
- `npm run build`
- Lighthouse (opcional) o checklist manual de no-regresiones.

**Riesgos**
- Medio: cambios de imágenes pueden afectar layout/CLS o calidad visual (mitigar: validar dimensiones y breakpoints)

---

### PR #{TBD-D2}: QA visual final + checklist DoD MVP
**Skill principal:** `ui-design-review`

**Objetivo**
- Validación final de MVP con evidencia y checklist.

**Entregables (docs)**
- `docs/redesign/audits/audit-YYYY-MM-DD-mvp-final.md`
  - screenshots finales 375/768/1024/1440
  - checklist DoD completa
  - lista de “post-MVP nice-to-have”

**Verificación**
- N/A (solo documentación + evidencia)

**Riesgos**
- Bajo: si falta evidencia por breakpoint, se invalida el “final QA” (mitigar: checklist estricta y screenshots obligatorios)

---

## Fase E (condicional) — Producto/Copy/Journey

### PR #{TBD-E1}: Ajustes de journey/copy (solo si se decide)
**Skill:** `product-designer`

**Objetivo**
- Mejorar conversión (orden de secciones, microcopy, CTA) sin romper consistencia.

**Entregables**
- Documento de decisiones (en el PR) + cambios acotados.

**Verificación**
- Checklist de no-regresión en conversión (manual)
- `npm run build`

**Riesgos**
- Medio/Alto: cambios de copy/journey pueden afectar conversión (mitigar: cambios pequeños + medir/observar si hay analytics)

---

## Definition of Done (MVP)
El MVP se considera logrado cuando:
- `design-system.md` y `tokens.md` están completos (no placeholders).
- Home (core funnel) se ve coherente y con buen polish.
- Admin mantiene coherencia de tokens y layout.
- A11y base cumplida.
- Build en verde + deploy OK.

## Cambios al plan (control de alcance)
- Cualquier cambio al orden/alcance del roadmap debe hacerse en un PR dedicado que actualice este archivo (`docs/redesign/MVP_PLAN.md`).
