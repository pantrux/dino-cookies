# Guía de Despliegue - Dino Cookies en Cloudflare Pages

Esta guía te ayudará a desplegar la aplicación Dino Cookies en Cloudflare Pages con base de datos D1.

## Requisitos Previos

- Cuenta de Cloudflare (gratuita)
- Cuenta de GitHub
- Node.js instalado localmente

## Paso 1: Crear Base de Datos D1

1. Inicia sesión en [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Ve a **Workers & Pages** > **D1**
3. Haz clic en **Create database**
4. Nombre: `galletas-db`
5. Copia el **Database ID** que se genera

## Paso 2: Ejecutar el Schema SQL

1. En la página de tu base de datos D1, ve a la pestaña **Console**
2. Copia y pega el contenido del archivo `schema.sql`
3. Haz clic en **Execute**
4. Verifica que la tabla `orders` se haya creado correctamente

## Paso 3: Actualizar wrangler.toml

Abre el archivo `wrangler.toml` y reemplaza `REPLACE_WITH_YOUR_DATABASE_ID` con el Database ID que copiaste en el Paso 1.

```toml
database_id = "tu-database-id-aqui"
```

## Paso 4: Crear Repositorio en GitHub

1. Ve a [GitHub](https://github.com) y crea un nuevo repositorio
2. Nombre sugerido: `dino-cookies`
3. Puede ser público o privado
4. **No** inicialices con README (ya tienes uno)

## Paso 5: Subir Código a GitHub

Ejecuta los siguientes comandos en tu terminal desde la carpeta del proyecto:

```bash
# Agregar el remote de GitHub (reemplaza con tu URL)
git remote add github https://github.com/TU_USUARIO/dino-cookies.git

# Hacer commit de los cambios
git add .
git commit -m "Migración a Cloudflare D1 y Pages"

# Subir a GitHub
git push github main
```

Si tienes problemas con la rama, intenta:
```bash
git push github main -f
```

## Paso 6: Crear Proyecto en Cloudflare Pages

1. En Cloudflare Dashboard, ve a **Workers & Pages**
2. Haz clic en **Create application** > **Pages** > **Connect to Git**
3. Conecta tu cuenta de GitHub
4. Selecciona el repositorio `dino-cookies`
5. Configura el build:
   - **Framework preset**: Next.js
   - **Build command**: `npx @cloudflare/next-on-pages`
   - **Build output directory**: `.vercel/output/static`
6. Haz clic en **Save and Deploy**

## Paso 7: Vincular Base de Datos D1

1. Una vez desplegado, ve a tu proyecto en Cloudflare Pages
2. Ve a **Settings** > **Functions**
3. En **D1 database bindings**, haz clic en **Add binding**
4. Variable name: `DB`
5. D1 database: Selecciona `galletas-db`
6. Haz clic en **Save**

## Paso 8: Re-desplegar

Después de vincular la base de datos, necesitas re-desplegar:

1. Ve a **Deployments**
2. Haz clic en **Retry deployment** en el último despliegue
3. O haz un nuevo commit y push a GitHub para activar un nuevo despliegue

## Paso 9: Verificar el Despliegue

1. Una vez completado el despliegue, haz clic en el enlace de tu sitio
2. Prueba el formulario de pedidos
3. Verifica que los datos se guarden en D1:
   - Ve a tu base de datos D1 en Cloudflare Dashboard
   - Ejecuta: `SELECT * FROM orders;` en la consola
4. Verifica el panel de administración en `/admin`

## Desarrollo Local con D1

Para desarrollar localmente con una base de datos D1 local:

```bash
# Instalar dependencias
npm install

# Crear base de datos D1 local
npx wrangler d1 create galletas-db --local

# Ejecutar schema
npx wrangler d1 execute galletas-db --local --file=./schema.sql

# Iniciar servidor de desarrollo
npm run dev
```

## Despliegues Automáticos

Una vez configurado, cada vez que hagas push a la rama `main` en GitHub, Cloudflare Pages automáticamente:
1. Detectará el cambio
2. Ejecutará el build
3. Desplegará la nueva versión

## Migrar Datos Existentes (Opcional)

Si tienes pedidos en `data/orders.json`, puedes migrarlos manualmente:

1. Abre `data/orders.json`
2. En la consola de D1, ejecuta INSERT statements para cada pedido:

```sql
INSERT INTO orders (firstName, lastName, email, phone, quantity, type, address, date, status)
VALUES ('Juan', 'Pérez', 'juan@example.com', '+56912345678', 2, 'Trufa de Chocolate', 'Calle 123', '2024-01-20T10:00:00Z', 'Pending');
```

## Solución de Problemas

### Error: "Database not configured"
- Verifica que hayas vinculado la base de datos D1 en Settings > Functions
- Asegúrate de que el binding se llame exactamente `DB`

### Build falla
- Verifica que `@cloudflare/next-on-pages` esté instalado
- Revisa los logs de build en Cloudflare Pages

### Webhook no funciona
- El webhook de n8n seguirá funcionando desde Cloudflare
- Verifica que la URL del webhook sea accesible desde internet

## Recursos Adicionales

- [Documentación de Cloudflare D1](https://developers.cloudflare.com/d1/)
- [Documentación de Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Next.js on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
