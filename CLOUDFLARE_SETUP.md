# Configuración Final de Cloudflare Pages

## ✅ Completado Hasta Ahora

1. **Base de Datos D1 Creada**
   - Nombre: `galletas-db`
   - Database ID: `18a3b2f3-6e95-47e6-8d00-c7b68ff0a13c`
   - Schema ejecutado exitosamente (tabla `orders` creada)

2. **Repositorio GitHub**
   - URL: https://github.com/pantrux/dino-cookies
   - Visibilidad: Privado
   - Código subido y actualizado

3. **Proyecto Cloudflare Pages**
   - Nombre: `dino-cookies`
   - URL: https://dino-cookies.pages.dev/

## 🔧 Configuración Manual Requerida

Debido a limitaciones de compatibilidad con Next.js 16, necesitas completar la configuración manualmente en el Dashboard de Cloudflare:

### Paso 1: Conectar GitHub a Cloudflare Pages

1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navega a **Workers & Pages**
3. Busca el proyecto **dino-cookies** que ya fue creado
4. Haz clic en **Settings** → **Builds & deployments**
5. En **Source**, haz clic en **Connect to Git**
6. Selecciona **GitHub** y autoriza si es necesario
7. Selecciona el repositorio **pantrux/dino-cookies**
8. Configura:
   - **Production branch**: `main`
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/` (dejar vacío)
   - **Environment variables**: (dejar vacío por ahora)

### Paso 2: Vincular Base de Datos D1

1. En el proyecto **dino-cookies**, ve a **Settings** → **Functions**
2. Baja hasta **D1 database bindings**
3. Haz clic en **Add binding**
4. Configura:
   - **Variable name**: `DB`
   - **D1 database**: `galletas-db`
5. Haz clic en **Save**

### Paso 3: Trigger Manual Deployment

1. Ve a la pestaña **Deployments**
2. Haz clic en **Create deployment**
3. O simplemente haz un push a GitHub:
   ```bash
   git commit --allow-empty -m "Trigger Cloudflare Pages deployment"
   git push github main
   ```

### Paso 4: Verificar Despliegue

1. Espera a que el deployment complete (puede tomar 2-5 minutos)
2. Una vez completado, visita: https://dino-cookies.pages.dev/
3. Prueba el formulario de pedidos
4. Verifica el panel de administración en `/admin`

## 🔍 Verificar Base de Datos

Para verificar que los pedidos se están guardando en D1:

```bash
npx wrangler d1 execute galletas-db --remote --command="SELECT * FROM orders;"
```

## 📝 Notas Importantes

- **Next.js 16**: La versión actual de `@cloudflare/next-on-pages` no soporta Next.js 16
- **Alternativa**: Cloudflare Pages puede hacer el build directamente desde GitHub
- **D1 Binding**: Ya está configurado en `wrangler.toml`, solo necesitas vincularlo en el dashboard
- **Webhook**: El webhook de n8n seguirá funcionando desde Cloudflare

## 🚨 Si el Build Falla

Si el build falla en Cloudflare Pages, prueba estas configuraciones alternativas:

**Opción 1: Build command**
```
npm install && npm run build
```

**Opción 2: Downgrade Next.js (temporal)**
```bash
npm install next@15.4.10 --legacy-peer-deps
git add package.json package-lock.json
git commit -m "Downgrade Next.js for Cloudflare compatibility"
git push github main
```

## ✅ Checklist Final

- [ ] Conectar GitHub al proyecto de Cloudflare Pages
- [ ] Vincular base de datos D1 (binding `DB`)
- [ ] Trigger deployment
- [ ] Verificar que el sitio funciona
- [ ] Probar formulario de pedidos
- [ ] Verificar panel de administración
- [ ] Confirmar que los datos se guardan en D1

---

**¿Necesitas ayuda?** Puedo guiarte paso a paso por cualquiera de estos pasos.
