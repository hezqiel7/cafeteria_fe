# Cafetería App - Frontend

## Descripción
El frontend de la aplicación de cafetería es una interfaz de usuario desarrollada en React que permite a los trabajadores de la cafetería interactuar con el sistema. Proporciona funcionalidades según los roles definidos: recepcionistas, cocineros y administradores. Se conecta al backend mediante una API REST para gestionar productos, pedidos y usuarios.

## Características principales
- **Recepcionista**: Puede añadir nuevos pedidos al sistema.
- **Cocineros**: Visualizan los pedidos, marcan pedidos como listos para entregar o entregados.
- **Administradores**: Gestionan productos, precios y cuentas de usuarios.

## Requisitos previos
- Node.js y npm instalados.
- El backend de la aplicación debe estar corriendo.
- Docker (Recomendado).

## Instrucciones de ejecución
1. Clona el repositorio del frontend:

    ```bash
    git clone https://github.com/hezqiel7/cafeteria_fe
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd cafeteria_fe
    ```

3. Instala las dependencias del proyecto:

    ```bash
    npm install
    ```

4. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto.
   - Define la variable `VITE_DJHOST` con host del backend ('localhost` si ejecutas con docker).

5. Inicia el servidor de desarrollo:

    ```bash
    npm run dev
    ```

6. Accede a la aplicación desde tu navegador en:

    ```
    http://localhost:5173
    ```

## Ejecución con Docker (Opcional)
1. Construye la imagen de Docker:

    ```bash
    docker build -t cafeteria_fe .
    ```

2. Ejecuta el contenedor:

    ```bash
    docker run -p 5173:5173 --env-file .env cafeteria_fe
    ```
