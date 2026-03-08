# Auditorías UI (histórico)

Guardar evidencia y reportes de auditoría visual aquí.

## Convención

- Reporte: `audit-YYYY-MM-DD*.md`
- Evidencia (screenshots): `YYYY-MM-DD/screenshots/*.png`

Ejemplo:

```text
docs/redesign/audits/
  2026-03-08/
    screenshots/
      home-desktop-1440x900.png
      home-tablet-834x1112.png
      home-mobile-390x844.png
  audit-2026-03-08-mvp-final.md
```

## Requisitos mínimos del reporte

Cada auditoría debe incluir:
- Score por dimensión
- Top issues (severidad/impacto/esfuerzo)
- Recomendaciones por componente
- Links a evidencia (o paths locales en `audits/<date>/`)

## Captura de screenshots (Playwright)

Ver `docs/redesign/VISUAL_QUALITY_GATES.md`.
