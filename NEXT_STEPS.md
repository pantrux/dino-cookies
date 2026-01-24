# ✅ Repositorio GitHub Creado

## Información del Repositorio

- **URL**: https://github.com/pantrux/dino-cookies
- **Visibilidad**: Privado 🔒
- **Estado**: Código subido exitosamente

## Remotes Configurados

Tu proyecto ahora tiene dos repositorios remotos:

1. **GitHub** (github): https://github.com/pantrux/dino-cookies.git
   - Para despliegues automáticos en Cloudflare Pages
   
2. **Gitea** (origin): https://pantrux.duckdns.org/gitea/jandrade/dino-cookies.git
   - Tu repositorio de respaldo

## Próximos Pasos

### 1. Configurar Cloudflare D1 (Base de Datos)

1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navega a **Workers & Pages** → **D1**
3. Clic en **"Create database"**
4. Nombre: `galletas-db`
5. Clic en **"Create"**
6. **Copia el Database ID** que aparece
7. Ve a la pestaña **"Console"**
8. Abre el archivo `schema.sql` de tu proyecto
9. Copia todo su contenido y pégalo en la consola D1
10. Clic en **"Execute"**

### 2. Actualizar wrangler.toml

Abre `wrangler.toml` y reemplaza `REPLACE_WITH_YOUR_DATABASE_ID` con el Database ID real:

```toml
database_id = "tu-database-id-aqui"
```

Luego haz commit y push:
```bash
git add wrangler.toml
git commit -m "Actualizar Database ID"
git push github main
git push origin main
```

### 3. Crear Proyecto en Cloudflare Pages

1. En Cloudflare Dashboard, ve a **Workers & Pages**
2. Clic en **"Create application"** → **"Pages"** → **"Connect to Git"**
3. Autoriza acceso a GitHub si es necesario
4. Selecciona el repositorio **pantrux/dino-cookies**
5. Configura:
   - **Project name**: `dino-cookies`
   - **Production branch**: `main`
   - **Framework preset**: `Next.js`
   - **Build command**: `npx @cloudflare/next-on-pages`
   - **Build output directory**: `.vercel/output/static`
6. Clic en **"Save and Deploy"**

### 4. Vincular Base de Datos D1

1. Una vez desplegado (aunque falle), ve a tu proyecto
2. **Settings** → **Functions**
3. En **"D1 database bindings"**, clic en **"Add binding"**
4. Configura:
   - **Variable name**: `DB`
   - **D1 database**: `galletas-db`
5. Clic en **"Save"**

### 5. Re-desplegar

1. Ve a **"Deployments"**
2. Clic en los tres puntos del último deployment → **"Retry deployment"**

### 6. ¡Verificar!

Tu sitio estará disponible en algo como: `https://dino-cookies.pages.dev`

## Mantener Ambos Repos Sincronizados

Para subir cambios a ambos repositorios:

```bash
git add .
git commit -m "Descripción"
git push github main  # GitHub (activa deploy en Cloudflare)
git push origin main  # Gitea (backup)
```

O crea un alias:
```bash
git config alias.pushall '!git push github main && git push origin main'
# Luego usa: git pushall
```

---

**¿Necesitas ayuda con alguno de estos pasos?** Puedo guiarte paso a paso.
