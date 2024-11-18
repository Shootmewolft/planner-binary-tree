# API de Gestión de Subtareas

Esta es una API en Flask para la gestión de subtareas dentro de un proyecto. La API permite agregar, eliminar, buscar y mostrar subtareas, así como obtener detalles del proyecto.

## Endpoints

### 1. **Agregar una Subtarea**
- **Método:** `POST`
- **Ruta:** `/subtarea`
- **Descripción:** Este endpoint permite agregar una nueva subtarea al proyecto.
  
#### Parámetros del cuerpo (JSON):
- `nombre` (string): Nombre de la subtarea. **Requerido**
- `prioridad` (string): Prioridad de la subtarea (e.g., "alta", "media", "baja"). **Requerido**
- `fecha_vencimiento` (string, opcional): Fecha de vencimiento en formato ISO (YYYY-MM-DD). **Opcional**
- `id_tarea` (int, opcional): ID de la tarea asociada. **Opcional**
- `etiquetas` (array, opcional): Lista de etiquetas asociadas a la subtarea. **Opcional**
- `notas` (string, opcional): Notas adicionales para la subtarea. **Opcional**
- `lado` (string, opcional): Lado en el que se agregará la subtarea (izquierdo o derecho). **Opcional**

#### Respuesta:
- **Código 201**: Subtarea agregada con éxito.
- **Código 400**: Error en los parámetros de la solicitud.
- **Código 500**: Error interno del servidor.

---

### 2. **Eliminar una Subtarea**
- **Método:** `DELETE`
- **Ruta:** `/subtarea/<int:id_tarea>`
- **Descripción:** Este endpoint elimina una subtarea específica por su ID.

#### Parámetros:
- `id_tarea` (int): ID de la subtarea a eliminar.

#### Respuesta:
- **Código 200**: Subtarea eliminada con éxito.
- **Código 404**: No se encontró la subtarea con el ID proporcionado.
- **Código 500**: Error interno del servidor.

---

### 3. **Eliminar toda la Información del Árbol de Subtareas**
- **Método:** `DELETE`
- **Ruta:** `/subtareas/eliminar`
- **Descripción:** Este endpoint elimina toda la información del árbol de subtareas del proyecto, borrando todas las tareas y subtareas asociadas.

#### Respuesta:
- **Código 200**: Todas las subtareas fueron eliminadas con éxito.
- **Código 500**: Error interno del servidor.

---

### 4. **Buscar Subtareas por Etiqueta**
- **Método:** `POST`
- **Ruta:** `/buscar`
- **Descripción:** Permite buscar subtareas por una etiqueta específica.

#### Parámetros del cuerpo (JSON):
- `etiqueta` (string): Etiqueta que se utilizará para buscar las subtareas. **Requerido**

#### Respuesta:
- **Código 200**: Lista de subtareas encontradas con la etiqueta especificada.
- **Código 400**: Etiqueta no proporcionada.
- **Código 404**: No se encontraron subtareas con esa etiqueta.
- **Código 500**: Error interno del servidor.

---

### 5. **Mostrar Proyecto**
- **Método:** `GET`
- **Ruta:** `/proyecto`
- **Descripción:** Muestra los detalles del proyecto.

#### Respuesta:
- **Código 200**: Detalles del proyecto.
- **Código 404**: No se encontró el proyecto.
- **Código 500**: Error interno del servidor.

---

### 6. **Obtener todas las Subtareas**
- **Método:** `GET`
- **Ruta:** `/subtareas`
- **Descripción:** Devuelve una lista de todas las subtareas en el proyecto.

#### Respuesta:
- **Código 200**: Lista de todas las subtareas en el proyecto.
- **Código 404**: No hay subtareas en el proyecto.
- **Código 500**: Error interno del servidor.

---

## Ejemplo de Solicitudes

### Agregar una Subtarea:

**Solicitud (POST /subtarea):**

```json
{
  "nombre": "Subtarea 1",
  "prioridad": "alta",
  "fecha_vencimiento": "2024-11-20",
  "etiquetas": ["etiqueta1", "etiqueta2"],
  "notas": "Notas adicionales",
  "lado": "izquierdo"
}
```

**Respuesta (201):**

```json
{
  "message": "Subtarea agregada con éxito",
  "id_tarea": 1
}
```

---

### Eliminar Todas las Subtareas:

**Solicitud (DELETE /eliminar_todas_las_subtareas):**

```json
{}
```

**Respuesta (200):**

```json
{
  "message": "Todas las subtareas fueron eliminadas con éxito."
}
```

---

## Iniciar la Aplicación

Para iniciar la aplicación, ejecuta el siguiente comando:

```bash
python app.py
```

La aplicación estará disponible en `http://localhost:5000`.
