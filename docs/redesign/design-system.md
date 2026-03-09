# Design System (Base) — Dino Cookies

> Documento de **Dirección visual (Fase A2)**. Es la fuente de verdad para evitar churn en PRs de implementación.
> 
> Regla: si algo no está aquí (o en `docs/redesign/tokens.md`), **no se inventa** en un PR de UI.

## 1) Referencia visual PR-36 (spec de alta fidelidad)

- Spec: `docs/redesign/reference-mock-01.md`
- Nota: la referencia que estamos reverse-engineering tiene un lenguaje **vintage/artesanal (paper/ink) + jurásico premium** (oliva, serif editorial, polaroids). Esto puede convivir como **variante** o reemplazar la dirección actual, pero la **decisión final** debe cristalizarse en un PR de dirección (manteniendo el proceso).

---

## 2) Dirección visual (DECISIÓN)

**Variante elegida:** **Vintage Bakery Stamp (Paper/Ink) + Jurassic Premium**

**Intención:**
- Replicar **alta fidelidad** del layout final de referencia (no “inspirado por”).
- Sensación: **pergamino + tinta + sello editorial**, con acento **oliva**.

**Principios de estilo (no negociables):**
1. **Composición centrada tipo “poster”.** (Logo seal arriba, hero centrado, bloques simétricos.)
2. **Paper depth real.** (atmósfera pergamino perceptible: gradientes + noise + vignette.)
3. **Tinta + print shadows.** (sombras duras offset, como impresión.)
4. **Tipografía heritage.** (display serif con tracking controlado; body serif legible.)
5. **Botones como sellos.** (pill + small-caps + sombra hard-print; estados sin layout shift.)

**Anti‑patterns:**
- Hero “SaaS moderno” (2 columnas con card a la derecha).
- Botones blandos sin sombra o con radios genéricos.
- Fondo crema plano sin textura.

---

## 3) Paleta (roles semánticos)

> Nota: los valores exactos se consolidan en `docs/redesign/tokens.md` y `app/globals.css`. Aquí definimos **roles**.

### Roles base
- **Background (page):** claro cálido (blanco roto / crema muy suave)
- **Surface (cards/forms):** blanco puro o casi blanco
- **Text (primary):** gris muy oscuro (no #000)
- **Text (muted):** gris medio
- **Border:** gris claro

### Marca / interacción
- **Accent / Primary CTA:** **oliva** (papel + tinta + oliva)
- **Accent hover/active:** oliva más profundo
- **Focus ring:** oliva con alpha (visible, consistente)

### Estados
- **Success:** verde (solo feedback)
- **Warning:** ámbar/naranja (solo feedback)
- **Danger:** rojo (errores)

### Reglas de uso
- El **oliva** se usa para: CTA primario, highlights, focus/selected.
- **No** usar oliva como decoración masiva (pierde fuerza): reservarlo para acciones.
- Botones secundarios: outline/neutral (tinta/paper) para no competir con CTA.

---

## 4) Tipografía

> Objetivo: que títulos de sección, labels y body se lean como un sistema.

### Familias
- **Headings (display):** serif heritage (target: **Bodoni Moda** o **DM Serif Display**)
- **Body/UI:** serif legible (target: **Source Serif 4** o **EB Garamond**)
- **Accents/labels:** serif con personalidad para small-caps (target: **Fraunces**)

### Escala recomendada (desktop)
- **H1 (poster):** 56–72 / LH 0.95–1.05
- **H2:** 32–44 / LH 1.05–1.15
- **H3:** 22–28 / LH 1.15–1.25
- **Body:** 16–18 / LH 1.55–1.75
- **Small:** 12–14 / LH 1.4

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

## 5) Layout landing (estructura recomendada)

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

## 6) Reglas de componentes (mínimos)

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

## 7) Anti-patterns (no hacer)

- **Overlays/modales** que tapan el hero o el CTA (especialmente en mobile).
- **CTAs múltiples** compitiendo (misma jerarquía/estilo).
- “Mucho blanco” sin intención (densidad demasiado baja → parece vacío).
- Product cards con **imagen pequeña** y texto ilegible.
- Tabla en mobile sin estrategia responsive.
- Inline styles / valores mágicos / hardcodes repetidos (si existe token, se usa).
- Focus invisible o muy sutil (teclado debe funcionar bien).
- Copy/promesas contradictorias (ej. entrega/horarios).
