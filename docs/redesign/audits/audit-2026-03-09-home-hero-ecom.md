# Audit + Ajustes — Home Hero (Bakery Ecommerce)

Fecha: 2026-03-09

## Objetivo
Acercar la home a una referencia tipo **bakery ecommerce moderna** con:
- Hero más dominante (composición 2 columnas)
- Un “producto protagonista” visible arriba del fold
- Jerarquía clara: headline → subcopy → CTA → señales de confianza

## Hallazgos (antes)
1) **Hero demasiado centrado / plano**: faltaba un bloque visual fuerte que justificara el producto en 1 vistazo.
2) **CTA sin contexto visual**: la llamada a la acción existía, pero el “por qué comprar” no se percibía de inmediato.
3) **Jerarquía de arriba del fold**: copy + doodles generaban personalidad, pero no un layout de ecommerce moderno.

## Cambios aplicados (después)
- Hero en **layout split** (copy + visual) en desktop; stack centrado en mobile.
- Imagen protagonista (cookie) con **frame** estilo polaroid + glow suave.
- “Floating cards” tipo ecommerce para reforzar:
  - best seller
  - packaging (box regalo)
- Métricas (horneado/ingredientes/entrega) convertidas a **dl** para semántica + claridad.

## Checklist de calidad
- Sin estilos inline.
- Reutiliza tokens existentes; donde faltaba, se agregaron **tokens locales del componente** (CSS custom props) para evitar repetición.
- Focus ring heredado desde globals.

## Pendientes / Próximos pasos sugeridos
- Revisar consistencia de sombras/radios para unificar lenguaje visual entre Hero y ProductCard.
- Considerar imagen específica de "box" (packaging) para que el hero sea aún más ecommerce.
