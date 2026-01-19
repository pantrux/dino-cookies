# Dino Cookies 🦕🍪

Una aplicación web moderna y minimalista para la gestión de pedidos de galletas caseras (anteriormente "Galletas Online").

## Características

- **Diseño Premium Minimalista**: Estilo visual limpio inspirado en "H&O" (Tonos blanco, fucsia y gris).
- **Formulario de Pedidos**: Validación en tiempo real, separación de nombre/apellido, y campo de email.
- **Panel de Administración**: Dashboard protegido (`/admin`) para visualizar pedidos en una tabla.
- **Integraciones Backend**:
  - **Webhook n8n**: Envío automático de datos de pedidos a un flujo de trabajo externo.
  - **Persistencia Local**: Almacenamiento de pedidos en `data/orders.json` para el dashboard.
- **Internacionalización**: Todo el contenido está nativamente en Español.

## Tecnologías Utilizadas

- **Frontend**: [Next.js](https://nextjs.org/) (App Router), React.
- **Estilos**: CSS Modules (Vanilla CSS) con variables globales para theming fácil.
- **Backend**: Next.js API Routes.

## Instalación y Uso

1.  **Clonar el repositorio**:
    ```bash
    git clone https://pantrux.duckdns.org/gitea/jandrade/dino-cookies.git
    cd dino-cookies
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Correr el servidor de desarrollo**:
    ```bash
    npm run dev
    ```
    Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

- `/app`: Rutas y páginas (Home, Admin).
- `/components`: Componentes reutilizables (Hero, OrderForm, ProductCard, etc.).
- `/lib`: Lógica de utilidades y base de datos simulada.
- `/public`: Activos estáticos e imágenes.

## Licencia

© 2026 Dino Cookies. Todos los derechos reservados.
