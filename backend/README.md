# API para Gestión de Tareas y Subtareas

Esta API permite gestionar tareas y subtareas para un proyecto específico, incluyendo la creación, eliminación y búsqueda de tareas y subtareas.

## Endpoints

### 1. **Agregar Tarea**
- **URL:** `/tarea`
- **Método:** `POST`
- **Descripción:** Agrega una nueva tarea principal al proyecto. Solo se pueden agregar dos tareas principales.
- **Cuerpo de la solicitud (JSON):**
  ```json
  {
      "nombre": "Nombre de la tarea",
      "descripcion": "Descripción de la tarea"
  }
  ```
- **Respuestas:**
  - **201:** Tarea agregada exitosamente.
  - **400:** Error en la solicitud (ejemplo: ya existen dos tareas principales).
  - **500:** Error interno.

---

### 2. **Obtener Todas las Tareas**
- **URL:** `/tareas`
- **Método:** `GET`
- **Descripción:** Devuelve todas las tareas principales existentes.
- **Respuestas:**
  - **200:** Lista de tareas.
  - **500:** Error interno.

---

### 3. **Eliminar Tarea**
- **URL:** `/tarea/<int:id_tarea>`
- **Método:** `DELETE`
- **Descripción:** Elimina una tarea principal por su ID.
- **Respuestas:**
  - **200:** Tarea eliminada exitosamente.
  - **404:** Tarea no encontrada.
  - **500:** Error interno.

---

### 4. **Agregar Subtarea**
- **URL:** `/subtarea`
- **Método:** `POST`
- **Descripción:** Agrega una subtarea a una tarea principal específica.
- **Cuerpo de la solicitud (JSON):**
  ```json
  {
      "nombre": "Nombre de la subtarea",
      "prioridad": "Alta",
      "lado": "izquierdo",
      "fecha_vencimiento": "2024-12-31",
      "etiquetas": ["etiqueta1", "etiqueta2"],
      "notas": "Notas adicionales"
  }
  ```
- **Respuestas:**
  - **201:** Subtarea agregada exitosamente.
  - **400:** Error en la solicitud (ejemplo: lado no especificado).
  - **500:** Error interno.

---

### 5. **Eliminar Subtarea**
- **URL:** `/subtarea/<int:id_subtarea>`
- **Método:** `DELETE`
- **Descripción:** Elimina una subtarea por su ID.
- **Respuestas:**
  - **200:** Subtarea eliminada exitosamente.
  - **404:** Subtarea no encontrada.
  - **500:** Error interno.

---

### 6. **Buscar Subtareas por Etiqueta**
- **URL:** `/buscar`
- **Método:** `POST`
- **Descripción:** Busca subtareas asociadas a una etiqueta específica.
- **Cuerpo de la solicitud (JSON):**
  ```json
  {
      "etiqueta": "etiqueta_a_buscar"
  }
  ```
- **Respuestas:**
  - **200:** Lista de subtareas encontradas.
  - **404:** No se encontraron subtareas con la etiqueta.
  - **400:** Error en la solicitud (ejemplo: falta la etiqueta).
  - **500:** Error interno.

---

## Ejecución
Para iniciar la API, ejecuta el siguiente comando:
```bash
python app.py
```
