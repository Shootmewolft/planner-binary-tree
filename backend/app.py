from flask import Flask, request, jsonify
from models import Proyecto, SubTarea
from datetime import datetime

app = Flask(__name__)

proyecto = Proyecto(nombre="Shoot")

@app.route('/subtarea', methods=['POST'])
def agregar_subtarea():
    try:
        # Verificar que los datos necesarios estén presentes
        data = request.json
        if not data:
            return jsonify({"error": "No se ha recibido un cuerpo de solicitud."}), 400

        nombre = data.get('nombre')
        prioridad = data.get('prioridad')

        if not nombre:
            return jsonify({"error": "El campo 'nombre' es obligatorio."}), 400

        if not prioridad:
            return jsonify({"error": "El campo 'prioridad' es obligatorio."}), 400

        # Validación de fecha_vencimiento (si es proporcionada)
        fecha_vencimiento = data.get('fecha_vencimiento')
        if fecha_vencimiento:
            try:
                fecha_vencimiento = datetime.fromisoformat(fecha_vencimiento)
            except ValueError:
                return jsonify({"error": "El campo 'fecha_vencimiento' debe tener un formato de fecha válido."}), 400

        # Obtener el id_tarea desde la solicitud, si se proporciona
        id_tarea = data.get('id_tarea')

        # Crear la subtarea (el id_tarea se asigna automáticamente si no se proporciona)
        try:
            subtarea = SubTarea(
                nombre=nombre,
                fecha_vencimiento=fecha_vencimiento,
                prioridad=prioridad,
                etiquetas=data.get('etiquetas', []),
                notas=data.get('notas', ""),
                id_tarea=id_tarea
            )
        except ValueError as e:
            return jsonify({"error": str(e)}), 400  # Devolver error si el ID ya está en uso

        # Intentar agregar la subtarea al proyecto
        lado = data.get('lado')
        proyecto.agregar_subtarea(subtarea, lado=lado)

        return jsonify({"message": "Subtarea agregada con éxito", "id_tarea": subtarea.id_tarea}), 201

    except KeyError as e:
        return jsonify({"error": f"Falta el campo obligatorio: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": f"Ha ocurrido un error inesperado: {str(e)}"}), 500


@app.route('/subtarea/<int:id_tarea>', methods=['DELETE'])
def eliminar_subtarea(id_tarea):
    try:
        # Intentar eliminar la subtarea
        mensaje = proyecto.eliminar_subtarea(id_tarea)
        
        # Si no se encuentra la subtarea
        if "No se encontró una subtarea con ID" in mensaje:
            return jsonify({"error": mensaje}), 404

        return jsonify({"message": mensaje}), 200
    
    except Exception as e:
        # Manejo de errores generales
        return jsonify({"error": f"Ha ocurrido un error inesperado: {str(e)}"}), 500


@app.route('/buscar', methods=['POST'])
def buscar_subtareas_por_etiqueta():
    try:
        data = request.json
        
        # Verificar que el JSON es válido
        if not data:
            return jsonify({"error": "El cuerpo de la solicitud debe ser un JSON válido."}), 400
        
        etiqueta = data.get('etiqueta')

        if not etiqueta:
            return jsonify({"error": "Se debe proporcionar una etiqueta"}), 400

        # Buscar las subtareas por etiqueta
        subtareas = proyecto.buscar_subtareas_por_etiqueta(etiqueta)

        # Si no se encuentran subtareas
        if not subtareas:
            return jsonify({"message": "No se encontraron subtareas con esa etiqueta"}), 404

        return jsonify({"subtareas": subtareas}), 200

    except Exception as e:
        # Manejo de errores generales
        return jsonify({"error": f"Ha ocurrido un error inesperado: {str(e)}"}), 500


@app.route('/proyecto', methods=['GET'])
def mostrar_proyecto():
    try:
        # Verificar si el objeto proyecto existe (esto es más relevante si hay una lógica más compleja)
        if not proyecto:
            return jsonify({"error": "No se ha encontrado el proyecto."}), 404

        return jsonify({"proyecto": repr(proyecto)}), 200

    except Exception as e:
        # Manejo de cualquier error inesperado
        return jsonify({"error": f"Ha ocurrido un error inesperado: {str(e)}"}), 500


@app.route('/subtareas', methods=['GET'])
def obtener_subtareas():
    try:
        subtareas = proyecto.tareas

        # Verificar si no hay subtareas
        if not subtareas:
            return jsonify({"message": "No hay subtareas en el proyecto."}), 404

        subtareas_respuesta = []
        for subtarea in subtareas:
            # Formatear la fecha de vencimiento solo como "YYYY-MM-DD"
            fecha_vencimiento = subtarea.fecha_vencimiento.strftime('%Y-%m-%d') if subtarea.fecha_vencimiento else None

            # Construir la respuesta con las subtareas
            subtareas_respuesta.append({
                "id_tarea": subtarea.id_tarea,
                "nombre": subtarea.nombre,
                "fecha_vencimiento": fecha_vencimiento,
                "prioridad": subtarea.prioridad,
                "etiquetas": subtarea.etiquetas,
                "notas": subtarea.notas,
            })

        return jsonify({"subtareas": subtareas_respuesta}), 200

    except AttributeError as e:
        return jsonify({"error": "El proyecto no tiene subtareas definidas."}), 500
    except Exception as e:
        return jsonify({"error": f"Ha ocurrido un error inesperado: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)
