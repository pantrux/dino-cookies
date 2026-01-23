# Dino Cookies 🦕🍪

Una aplicación web moderna y minimalista para la gestión de pedidos de galletas caseras, desplegada en Cloudflare Pages con base de datos D1.

## Características

- **Diseño Premium Minimalista**: Estilo visual limpio inspirado en "H&O" (Tonos blanco, fucsia y gris).
- **Formulario de Pedidos**: Validación en tiempo real, separación de nombre/apellido, y campo de email.
- **Panel de Administración**: Dashboard protegido (`/admin`) para visualizar pedidos en una tabla.
- **Base de Datos D1**: Almacenamiento persistente en Cloudflare D1 (SQLite en el edge).
- **Integraciones Backend**:
  - **Webhook n8n**: Envío automático de datos de pedidos a un flujo de trabajo externo.
  - **Cloudflare D1**: Base de datos SQL distribuida globalmente.
- **Internacionalización**: Todo el contenido está nativamente en Español.
- **Edge Runtime**: Ejecución en el edge de Cloudflare para máxima velocidad.

## Tecnologías Utilizadas

- **Frontend**: [Next.js](https://nextjs.org/) (App Router), React
- **Estilos**: CSS Modules (Vanilla CSS) con variables globales
- **Backend**: Next.js API Routes con Edge Runtime
- **Base de Datos**: [Cloudflare D1](https://developers.cloudflare.com/d1/) (SQLite)
- **Hosting**: [Cloudflare Pages](https://pages.cloudflare.com/)

## Desarrollo Local

### Requisitos Previos

- Node.js 18+
- npm o yarn
- Cuenta de Cloudflare (para D1)

### Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/TU_USUARIO/dino-cookies.git
   cd dino-cookies
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar D1 local**:
   ```bash
   # Crear base de datos D1 local
   npx wrangler d1 create galletas-db --local
   
   # Ejecutar schema
   npx wrangler d1 execute galletas-db --local --file=./schema.sql
   ```

4. **Correr el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Scripts Disponibles

- `npm run dev` - Servidor de desarrollo Next.js
- `npm run build` - Build para Cloudflare Pages
- `npm run preview` - Preview del build con Wrangler
- `npm run deploy` - Deploy a Cloudflare Pages

## Despliegue en Cloudflare Pages

Para instrucciones detalladas de despliegue, consulta [DEPLOYMENT.md](./DEPLOYMENT.md).

### Resumen Rápido

1. Crear base de datos D1 en Cloudflare Dashboard
2. Ejecutar `schema.sql` en la consola D1
3. Crear repositorio en GitHub y hacer push
4. Conectar Cloudflare Pages con GitHub
5. Vincular base de datos D1 al proyecto

## Estructura del Proyecto

- `/app` - Rutas y páginas (Home, Admin, API Routes)
- `/components` - Componentes reutilizables (Hero, OrderForm, ProductCard, etc.)
- `/lib` - Lógica de utilidades y funciones de base de datos D1
- `/public` - Activos estáticos e imágenes
- `schema.sql` - Schema de base de datos D1
- `wrangler.toml` - Configuración de Cloudflare Workers/Pages

## API Endpoints

- `POST /api/order` - Crear nuevo pedido
- `GET /api/admin/orders` - Obtener todos los pedidos (admin)

## Licencia

© 2026 Dino Cookies. Todos los derechos reservados.
