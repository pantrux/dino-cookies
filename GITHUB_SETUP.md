# Guía Rápida: Configurar GitHub y Cloudflare Pages

Esta guía te ayudará a crear el repositorio en GitHub y conectarlo con Cloudflare Pages mientras mantienes tu repositorio en Gitea.

## Paso 1: Crear Repositorio en GitHub

1. Ve a [GitHub](https://github.com) e inicia sesión
2. Haz clic en el botón **"+"** en la esquina superior derecha → **"New repository"**
3. Configura el repositorio:
   - **Repository name**: `dino-cookies` (o el nombre que prefieras)
   - **Description**: "Aplicación web para pedidos de galletas caseras - Cloudflare D1 + Pages"
   - **Visibility**: Público o Privado (tu elección)
   - **NO** marques "Initialize this repository with a README" (ya tienes uno)
4. Haz clic en **"Create repository"**

## Paso 2: Agregar GitHub como Remote

Copia la URL de tu nuevo repositorio (debería verse como `https://github.com/TU_USUARIO/dino-cookies.git`) y ejecuta:

```bash
cd /Users/jandrade/Documents/Antigravity/galletas-online

# Agregar GitHub como segundo remote
git remote add github https://github.com/TU_USUARIO/dino-cookies.git

# Verificar que ambos remotes estén configurados
git remote -v
# Deberías ver:
# github  https://github.com/TU_USUARIO/dino-cookies.git (fetch)
# github  https://github.com/TU_USUARIO/dino-cookies.git (push)
# origin  https://...pantrux.duckdns.org/gitea/jandrade/dino-cookies.git (fetch)
# origin  https://...pantrux.duckdns.org/gitea/jandrade/dino-cookies.git (push)

# Subir código a GitHub
git push github main
```

## Paso 3: Configurar Cloudflare D1

1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navega a **Workers & Pages** → **D1**
3. Haz clic en **"Create database"**
4. Nombre: `galletas-db`
5. Haz clic en **"Create"**
6. **IMPORTANTE**: Copia el **Database ID** que aparece
7. Ve a la pestaña **"Console"**
8. Copia todo el contenido del archivo `schema.sql` de tu proyecto
9. Pégalo en la consola y haz clic en **"Execute"**
10. Verifica que se creó la tabla ejecutando: `SELECT * FROM orders;`

## Paso 4: Actualizar wrangler.toml

Abre el archivo `wrangler.toml` en tu proyecto y reemplaza `REPLACE_WITH_YOUR_DATABASE_ID` con el Database ID que copiaste:

```toml
database_id = "tu-database-id-aqui"
```

Guarda el archivo y haz commit:

```bash
git add wrangler.toml
git commit -m "Actualizar Database ID de D1"
git push github main
git push origin main
```

## Paso 5: Crear Proyecto en Cloudflare Pages

1. En Cloudflare Dashboard, ve a **Workers & Pages**
2. Haz clic en **"Create application"** → **"Pages"** → **"Connect to Git"**
3. Si es tu primera vez, autoriza a Cloudflare a acceder a GitHub
4. Selecciona el repositorio `dino-cookies`
5. Configura el build:
   - **Project name**: `dino-cookies` (o el que prefieras)
   - **Production branch**: `main`
   - **Framework preset**: `Next.js`
   - **Build command**: `npx @cloudflare/next-on-pages`
   - **Build output directory**: `.vercel/output/static`
6. Haz clic en **"Save and Deploy"**

**NOTA**: El primer deploy fallará porque aún no hemos vinculado la base de datos. Esto es normal.

## Paso 6: Vincular Base de Datos D1

1. Una vez que el deploy termine (aunque falle), ve a tu proyecto en Cloudflare Pages
2. Ve a **Settings** → **Functions**
3. Baja hasta **"D1 database bindings"**
4. Haz clic en **"Add binding"**
5. Configura:
   - **Variable name**: `DB` (exactamente así, en mayúsculas)
   - **D1 database**: Selecciona `galletas-db`
6. Haz clic en **"Save"**

## Paso 7: Re-desplegar

1. Ve a la pestaña **"Deployments"**
2. Encuentra el último deployment
3. Haz clic en los tres puntos (...) → **"Retry deployment"**
4. Espera a que complete

## Paso 8: ¡Verificar!

1. Una vez completado, haz clic en el enlace de tu sitio (algo como `dino-cookies.pages.dev`)
2. Prueba el formulario de pedidos
3. Verifica el panel de administración en `/admin`
4. Verifica en D1 Dashboard que los pedidos se guardaron:
   - Ve a tu base de datos D1
   - Console → `SELECT * FROM orders;`

## Mantener Ambos Repositorios Sincronizados

Cada vez que hagas cambios, puedes subir a ambos repositorios:

```bash
# Hacer cambios...
git add .
git commit -m "Descripción de cambios"

# Subir a ambos repositorios
git push origin main    # Gitea
git push github main    # GitHub (activa deploy automático en Cloudflare)
```

O puedes crear un alias para subir a ambos a la vez:

```bash
git config alias.pushall '!git push origin main && git push github main'

# Ahora puedes usar:
git pushall
```

## Solución de Problemas

### Error: "Database not configured"
- Verifica que el binding D1 se llame exactamente `DB` (mayúsculas)
- Asegúrate de haber re-desplegado después de agregar el binding

### Build falla en Cloudflare Pages
- Verifica que el build command sea: `npx @cloudflare/next-on-pages`
- Verifica que el output directory sea: `.vercel/output/static`

### No puedo hacer push a GitHub
- Verifica que hayas agregado el remote correctamente: `git remote -v`
- Si pide autenticación, usa un Personal Access Token en lugar de contraseña

## ¡Listo!

Tu aplicación ahora está:
- ✅ Desplegada en Cloudflare Pages
- ✅ Usando Cloudflare D1 para almacenamiento
- ✅ Sincronizada con GitHub para deploys automáticos
- ✅ Manteniendo copia en Gitea
