# Design System (Base) — Dino Cookies

> Documento de **Dirección visual (Fase A2)**. Es la fuente de verdad para evitar churn en PRs de implementación.
> 
> Regla: si algo no está aquí (o en `docs/redesign/tokens.md`), **no se inventa** en un PR de UI.

## 1) Dirección visual (DECISIÓN)

**Variante elegida:** **Playful Dino (Premium-lite)**

**Intención:**
- *Playful* por marca (dino/galletas) + *Premium-lite* para confianza (orden/checkout/admin sin vibe “juguete”).

**Principios de estilo (no negociables):**
1. **1 acento fuerte, el resto neutrales.** (El acento guía CTA y estados importantes.)
2. **Tipografía con jerarquía clara.** (No “todo igual”.)
3. **Spacing con escala.** (Nada de 13px/17px random.)
4. **Componentes con estados completos.** (hover/focus/disabled/error.)
5. **Densidad informativa razonable.** (Evitar “mucho blanco + poco contenido”.)

**Referencias de vibe (conceptual):**
- “DTC bakery moderno”: limpio, cálido, confiable.
- Evitar look “Bootstrap template” (bordes/inputs sin intención).

---

## 2) Paleta (roles semánticos)

> Nota: los valores exactos se consolidan en `docs/redesign/tokens.md` y `app/globals.css`. Aquí definimos **roles**.

### Roles base
- **Background (page):** claro cálido (blanco roto / crema muy suave)
- **Surface (cards/forms):** blanco puro o casi blanco
- **Text (primary):** gris muy oscuro (no #000)
- **Text (muted):** gris medio
- **Border:** gris claro

### Marca / interacción
- **Accent / Primary CTA:** magenta/frambuesa (el color fuerte de la marca)
- **Accent hover/active:** misma familia, más oscuro
- **Focus ring:** acento con alpha (visible, consistente)

### Estados
- **Success:** verde (solo feedback)
- **Warning:** ámbar/naranja (solo feedback)
- **Danger:** rojo (errores)

### Reglas de uso
- El **magenta** se usa para: CTA primario, highlights, focus/selected.
- **No** usar magenta como decoración masiva (pierde “punch”).
- Botones secundarios: outline/neutral (no competir con CTA).

---

## 3) Tipografía

> Objetivo: que títulos de sección, labels y body se lean como un sistema.

### Familias
- **Headings:** *Sans display* (recomendado: `Poppins` o similar)
- **Body/UI:** *Sans legible* (recomendado: `Inter` o system-ui si no se quiere cargar fuentes)

### Escala recomendada (desktop)
- **H1:** 40–48 / LH 1.1–1.2
- **H2:** 28–32 / LH 1.2
- **H3:** 20–24 / LH 1.25
- **Body:** 16 / LH 1.5–1.6
- **Small:** 14 / LH 1.4

**Regla de implementación (importante):**
- Estos valores son la **escala objetivo**.
- Antes de cualquier PR de implementación (Fase C), esta escala debe estar representada como **tokens tipográficos** en `docs/redesign/tokens.md` y `app/globals.css` (planificado en **PR-B1**).
- En código: **no hardcodear px/LH**; consumir únicamente tokens (`--font-size-*`, `--line-height-*`).

### Escala recomendada (mobile)
- **H1:** 32–36
- **H2:** 24–28
- **H3:** 18–20
- **Body:** 16 (mantener)

### Reglas
- Máximo **2 familias** (headings + body).
- Usar **peso** (600/700) para jerarquía, no solo tamaño.
- Labels de form: legibles + contraste suficiente (no “gris fantasma”).

---

## 4) Layout landing (estructura recomendada)

> Objetivo: narrativa clara “qué es / por qué confiar / cómo comprar”.

Orden recomendado:
1. **Header**
   - Logo + navegación mínima
   - CTA secundario (WhatsApp/Contacto) con menor jerarquía que el CTA primario

2. **Hero (con CTA integrado, sin overlays intrusivos)**
   - Propuesta de valor clara
   - 1 CTA primario (ancla al formulario `#pedido`)
   - 1 CTA secundario (WhatsApp / ver productos)
   - Microcopy: tiempos/entrega **sin contradicciones**

3. **Productos (Favoritos del Horno)**
   - Grid con cards consistentes
   - Imagen protagonista (calidad) + nombre legible

4. **Cómo funciona (2–3 pasos)**
   - “Elige → completa → recibe/retira”

5. **Social proof (Reviews)**
   - Cards con mejor densidad (avatar, nombre, quote)

6. **Formulario de pedido**
   - Layout claro + inputs con estados
   - CTA primario visible y consistente

7. **Footer**
   - Links esenciales + social

---

## 5) Reglas de componentes (mínimos)

### Botones
- Altura >= **44px**
- Variantes: **primary**, **secondary (outline/neutral)**, **ghost/link**
- Estados completos: default/hover/active/disabled/focus-visible
- Hover **sin layout shift**

### Inputs
- Altura >= **44px**
- Focus visible consistente (ring)
- Estados: default/hover/focus/error/disabled

### Cards
- Padding con tokens
- Border + shadow sutil (si aplica)
- Hover: sutil (no brincar)

### Admin
- Desktop: tabla ok
- Mobile: **cards por pedido** (no tabla comprimida)

---

## 6) Anti-patterns (no hacer)

- **Overlays/modales** que tapan el hero o el CTA (especialmente en mobile).
- **CTAs múltiples** compitiendo (misma jerarquía/estilo).
- “Mucho blanco” sin intención (densidad demasiado baja → parece vacío).
- Product cards con **imagen pequeña** y texto ilegible.
- Tabla en mobile sin estrategia responsive.
- Inline styles / valores mágicos / hardcodes repetidos (si existe token, se usa).
- Focus invisible o muy sutil (teclado debe funcionar bien).
- Copy/promesas contradictorias (ej. entrega/horarios).
