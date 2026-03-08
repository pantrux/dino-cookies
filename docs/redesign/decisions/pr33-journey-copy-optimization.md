# PR-33 — Journey/copy optimization (decisión de producto/UX)

Fecha: 2026-03-08

## Contexto
En el funnel Home → Menú → Formulario de pedido, el CTA del hero llevaba directo al formulario (`#order`).
Eso genera fricción: el usuario llega con el carrito vacío y se encuentra con un warning/disabled state.

## Objetivo
Mejorar claridad y conversión sin tocar el design system:
- Hacer explícito el **paso 1 (elegir sabores)** y el **paso 2 (confirmar entrega)**.
- Alinear microcopy a expectativas reales del proceso (pedido recibido → contacto posterior para coordinar).

## Decisiones
1. **CTA primario del hero apunta a `#menu`** (primero elegir sabores).
2. **CTA secundario del hero apunta a `#order`** (finalizar pedido).
3. Sección de productos renombrada para indicar paso 1.
4. Encabezado del formulario renombrado para indicar paso 2 y aclarar “qué pasa después”.
5. Copy de botones y alerts más específico:
   - “Agregar” → “Agregar al carrito”
   - “Realizar Pedido” → “Enviar pedido”
   - Warnings de carrito vacío incluyen link directo a `#menu`.

## Riesgos / Consideraciones
- Riesgo bajo: cambios son de texto/anchors. No se modifica layout ni tokens.
- Se evita prometer tiempos o condiciones no garantizadas (solo “te contactaremos para confirmar y coordinar”).

## Verificación
- Navegación de anchors `#menu`/`#order`.
- Estado de carrito vacío: el siguiente paso es obvio.
- `npm run lint` y `npm run build` en verde.
