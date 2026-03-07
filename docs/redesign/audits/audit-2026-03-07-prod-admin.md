# Auditoría UI — PROD + Admin (Fase A1)

- **Fecha:** 2026-03-07
- **Entorno:** Producción (Cloudflare Pages)
- **URLs:**
  - Home: https://dino-cookies.pages.dev/
  - Admin: https://dino-cookies.pages.dev/admin
- **Objetivo:** levantar hallazgos accionables priorizados (P0/P1/P2) con evidencia, siguiendo `docs/redesign/PROCESS.md`.
- **Breakpoints verificados:** 390×844 (mobile), 834×1112 (tablet), 1440×900 (desktop)

## Evidencia (screenshots)

Ruta: `docs/redesign/audits/2026-03-07-prod-admin/screenshots/`

### Home
- `home-mobile-390x844.png`
- `home-tablet-834x1112.png`
- `home-desktop-1440x900.png`

### Admin
- `admin-mobile-390x844.png`
- `admin-tablet-834x1112.png`
- `admin-desktop-1440x900.png`

---

## Resumen ejecutivo

**Estado actual:** el sitio ya tiene una base razonable (branding con acento magenta, componentes principales presentes), pero la **jerarquía visual/typography** y el **layout/spacing** aún se sienten “template-ish”. El formulario y CTAs existen, pero la experiencia pierde confianza por:

- Hero con **modal superpuesto** que compite con el contenido.
- Secciones con **mucho aire** y poca densidad informativa (especialmente “Favoritos del Horno” y “Amor de Clientes”).
- En Admin, la tabla no es mobile-first (misma tabla comprimida) y faltan affordances para estado/acciones.

---

## Hallazgos priorizados

> Formato: **Problema → Recomendación → Esfuerzo (S/M/L)**

### P0 — Bloqueantes / alta fricción

1) **Hero con modal superpuesto (2 CTAs) compite con la propuesta de valor**
- Problema: el overlay tapa el hero y genera ambigüedad (“tu pedido en 2 horas” vs “compra online / opción recogida”). En mobile se come casi todo el above-the-fold.
- Recomendación: convertir el overlay en **CTA bar / card integrada** dentro del hero (1 CTA primario + 1 secundario), o moverlo bajo el hero con anclaje claro.
- Esfuerzo: **M**

2) **CTA principal ("Realizar Pedido") llega muy abajo**
- Problema: mucha gente decide arriba; hoy el formulario+CTA queda muy abajo y el usuario “scrollea para encontrar cómo comprar”.
- Recomendación: agregar un CTA primario arriba (hero) que ancle al formulario (`#pedido`) + mini resumen de “cómo funciona” (2–3 bullets).
- Esfuerzo: **S/M**

3) **Admin no usable en mobile: tabla comprimida sin alternativa**
- Problema: en 390px la tabla mantiene columnas; el contenido queda apretado y la lectura de contacto/dirección sufre.
- Recomendación: en <768px, cambiar a **cards por pedido** (stacked) con: fecha, cliente, pedido, contacto, dirección, estado + (futuro) acciones.
- Esfuerzo: **M**

### P1 — Quick wins (alto impacto, bajo costo)

1) **Jerarquía tipográfica débil (H2/H3/body se sienten similares)**
- Problema: títulos (“Favoritos del Horno”, “Amor de Clientes”, “¿Listo para disfrutar?”) no marcan un sistema consistente; la lectura es plana.
- Recomendación: definir escala en tokens (ej. `--font-size-h1/h2/h3/body/small`, `--line-height-*`) y aplicarla sistemáticamente.
- Esfuerzo: **S**

2) **Spacing demasiado amplio en secciones de contenido (baja densidad)**
- Problema: secciones con mucha separación y contenido pequeño (especialmente grid de productos con imágenes chicas y mucho blanco alrededor).
- Recomendación: consolidar spacing por sección (`sectionPaddingY`, `contentMaxWidth`, `gridGap`) usando tokens y ajustar densidad.
- Esfuerzo: **S/M**

3) **Grid de “Favoritos del Horno”: imágenes pequeñas + labels de producto poco legibles**
- Problema: las cards no “venden” el producto; el texto parece pequeño y se pierde.
- Recomendación: aumentar tamaño de imagen (ratio consistente), mejorar tipografía del nombre + precio/descriptor, y dar borde/sombra sutil a la card.
- Esfuerzo: **M**

4) **Reviews ("Amor de Clientes") se ven “placeholder”**
- Problema: tarjetas muy livianas, con iniciales genéricas y poco contraste/jerarquía.
- Recomendación: estandarizar componente ReviewCard (avatar, nombre, rating opcional, quote) con spacing consistente y buen contraste.
- Esfuerzo: **S/M**

5) **Form (pedido) necesita refuerzo de affordance y estados**
- Problema: inputs se ven correctos pero “flat”; falta feedback claro (focus/hover/error) y consistencia en alturas.
- Recomendación: normalizar alturas (>=44px), `:focus-visible` más notorio, estados error/disabled, labels con contraste suficiente.
- Esfuerzo: **S**

6) **Admin: badge “Total Pedidos: 2” domina visualmente el header**
- Problema: el pill magenta compite con el título “Panel de Administración”.
- Recomendación: bajar jerarquía (badge neutral) o mover a summary bar secundaria.
- Esfuerzo: **S**

### P2 — Rediseño estructural (si aplica)

1) **IA / Orden de secciones**
- Problema: hoy el flujo es: hero (tapado) → favoritos → reviews → form. Falta “qué vendemos + por qué confiar + cómo comprar” en narrativa clara.
- Recomendación: reordenar como: Propuesta de valor + CTA → Productos (grid fuerte) → Cómo funciona (2–3 pasos) → Reviews → Form.
- Esfuerzo: **L**

2) **Diseño de Admin como producto (no solo tabla)**
- Problema: falta visión de “panel” (filtros, búsqueda, estado real, acciones).
- Recomendación: definir layout con: filtros (estado/fecha), search, y tabla/cards responsivas.
- Esfuerzo: **L**

---

## Mapa de componentes impactados (candidatos a PRs)

- `Hero` / overlay CTA
- `ProductCard` / `ProductList`
- `ReviewSection` / ReviewCard
- `OrderForm` (inputs + button)
- `Admin` (layout responsive + cards)

---

## DoD (Definition of Done) — Auditoría

- [x] URLs baseline definidas
- [x] Evidencia visual (mobile/tablet/desktop) para Home + Admin
- [x] Hallazgos priorizados P0/P1/P2 con recomendación y esfuerzo
- [ ] (Siguiente) Desglosar hallazgos en PRs de implementación según `docs/redesign/MVP_PLAN.md`
