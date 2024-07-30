# Documentación del Proyecto

## Descripción General

Este repositorio contiene la solución a las tareas 1 y 2, incluyendo un backend hecho en ASP.NET Core .NET 6 y un frontend hecho en React 18 utilizando Bun y Vite. A continuación se detallan las diferentes partes del proyecto y cómo utilizarlas.

## Enlaces de Ejecución

- **Backend**: [https://prueba-tecnica-2024.onrender.com/swagger/index.html](https://prueba-tecnica-2024.onrender.com/swagger/index.html)
- **Frontend**: [https://prueba-tecnica-2024-1.onrender.com](https://prueba-tecnica-2024-1.onrender.com)

## Estructura del Proyecto

### 1. Caso 1

- **Descripción**: Contiene un proyecto de tipo library donde se encuentran las clases con sus respectivos métodos para la tarea 1.
- **Ubicación**: `./Caso 1`

### 2. TestCase1

- **Descripción**: Contiene las pruebas unitarias para el library de la tarea 1.
- **Ubicación**: `./TestCase1`

### 3. WebApi-Real-Plaza

- **Descripción**: Contiene el backend de la aplicación para la tarea 2. Esta aplicación está hecha en ASP.NET Core .NET 6.
- **Ubicación**: `./WebApi-Real-Plaza`
- **Configuración**:
  - **Variables de entorno**: Asegúrate de configurar las variables de entorno necesarias en el archivo `.env`.
  - **Construcción y Ejecución**:
    ```bash
    # Construir la imagen Docker
    docker build -t mi-aplicacion-backend ./WebApi-Real-Plaza
    
    # Ejecutar el contenedor Docker
    docker run -p 5000:80 mi-aplicacion-backend
    ```

### 4. frontend-prueba-tecnica

- **Descripción**: Contiene el frontend de la aplicación para la tarea 2. Esta aplicación está hecha en React 18 utilizando Bun y Vite.
- **Ubicación**: `./frontend-prueba-tecnica`
- **Configuración**:
  - **Variables de entorno**: Asegúrate de configurar las variables de entorno en un archivo `.env`.
  - **Construcción y Ejecución**:
    ```bash
    # Instalar dependencias
    bun install
    
    # Ejecutar la aplicación en modo desarrollo
    bun run dev
    
    # Construir la aplicación para producción
    bun run build
    ```

### 5. DB-Postgre.sql

- **Descripción**: Contiene un script SQL para una base de datos PostgreSQL.
- **Ubicación**: `./DB-Postgre.sql`
- **Uso**:
  - Ejecuta este script en tu instancia de PostgreSQL para crear y configurar la base de datos necesaria para la aplicación.
  - Ejemplo:
    ```sql
    \i 'ruta/al/archivo/DB-Postgre.sql'
    ```

## Requisitos Previos

- **Docker**: Asegúrate de tener Docker instalado en tu máquina.
- **Bun**: Asegúrate de tener Bun instalado. [Instrucciones de instalación](https://bun.sh/docs/installation).
- **Node.js**: Asegúrate de tener Node.js instalado, aunque Bun generalmente lo instala automáticamente.

## Pasos para Ejecutar el Proyecto

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/jhonny95M/prueba-tecnica-2024.git
   cd prueba-tecnica-2024
