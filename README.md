# Proyecto Flask API + React

Este proyecto combina un backend desarrollado en Flask API y un frontend en React. El backend implementa un árbol binario que sirve como base para gestionar dos tareas principales, las cuales a su vez tienen múltiples subtareas.

## Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Configuración](#configuración)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Uso del Proyecto](#uso-del-proyecto)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Descripción del Proyecto

Este proyecto tiene como objetivo:

1. **Gestión de Tareas Principales:** Utiliza un árbol binario para organizar y priorizar dos tareas principales.
2. **Gestión de Subtareas:** Cada tarea principal puede desprender múltiples subtareas, permitiendo una jerarquía clara y ordenada.

El backend maneja la lógica de datos y operaciones sobre el árbol binario, mientras que el frontend proporciona una interfaz intuitiva para interactuar con las tareas y subtareas.

## Tecnologías Utilizadas

- **Backend:** Flask API, Python
- **Frontend:** React, TypeScript, TailwindCSS, Zustand, ShadcnUI, Axios

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas:

- Python 3.8 o superior
- Node.js y npm/pnpm
- Git

## Configuración

### Backend

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <CARPETA_DEL_PROYECTO>
   ```
2. Ve al directorio del backend:
   ```bash
   cd backend
   ```
3. Crea y activa un entorno virtual:
   ```bash
   python -m venv venv
   source venv/bin/activate # En Windows: venv\Scripts\activate
   ```
4. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```
5. Inicia el servidor:
   ```bash
   python app.py # Para Python de Microsoft Store: py app.py
   ```

El backend estará disponible en `http://localhost:5000`.

### Frontend

1. Ve al directorio del frontend:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   bun install
   ```
3. Inicia la aplicación React:
   ```bash
   bun run dev
   ```

El frontend estará disponible en `http://localhost:5173`.

## Uso del Proyecto

1. Accede a `http://localhost:3000` para interactuar con la aplicación.
2. Desde el frontend, puedes:
   - Ver las tareas principales y sus subtareas.
   - Agregar, editar o eliminar tareas y subtareas.
   - Visualizar la estructura jerárquica en tiempo real.

El backend se encargará de realizar las operaciones en el árbol binario y devolverá los datos actualizados al frontend.

## Contribución

Si deseas contribuir, por favor:

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad:
   ```bash
   git checkout -b nueva-funcionalidad
   ```
3. Realiza tus cambios y haz un commit:
   ```bash
   git commit -m "Añadir nueva funcionalidad"
   ```
4. Envía un pull request.

## Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

