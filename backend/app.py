from flask import Flask, request, jsonify
from models import Proyecto, SubTarea, agregar_tarea, tareas, obtener_todas_las_tareas, eliminar_tarea
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

proyecto = Proyecto(nombre="Shoot") 

@app.route('/tarea', methods=['POST'])
def agregar_tarea_endpoint():
    try:
        if len(tareas) >= 2:
            return jsonify({"error": "Solo se pueden agregar dos tareas."}), 400

        data = request.json
        if not data:
            return jsonify({"error": "No se ha recibido un cuerpo de solicitud."}), 400

        nombre = data.get('nombre')
        descripcion = data.get('descripcion')

        nueva_tarea = agregar_tarea(nombre, descripcion)
        return jsonify({
            "mensaje": "Tarea agregada exitosamente.",
            "tarea": nueva_tarea.to_dict()
        }), 201

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Ha ocurrido un error interno."}), 500

@app.route('/tareas', methods=['GET'])
def obtener_tareas():
    try:
        todas_las_tareas = obtener_todas_las_tareas()
        return jsonify({
            "tareas": todas_las_tareas
        }), 200
    except Exception as e:
        return jsonify({"error": "Ha ocurrido un error interno."}), 500

@app.route('/tarea/<int:id_tarea>', methods=['DELETE'])
def eliminar_tarea_endpoint(id_tarea):
    try:
        # Llamada a la función global para eliminar tarea
        mensaje = eliminar_tarea(id_tarea)
        if "no se encontró" in mensaje.lower():
            return jsonify({"error": mensaje}), 404  # Si no se encontró la tarea
        return jsonify({"message": mensaje}), 200  # Mensaje de éxito
    except Exception as e:
        return jsonify({"error": f"Ha ocurrido un error inesperado: {str(e)}"}), 500

@app.route('/subtarea', methods=['POST'])
def agregar_subtarea():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No se ha recibido un cuerpo de solicitud."}), 400

        nombre = data.get('nombre')
        prioridad = data.get('prioridad')
        lado = data.get('lado')

        if not nombre or not prioridad or not lado:
            return jsonify({"error": "Los campos 'nombre', 'prioridad' y 'lado' son obligatorios."}), 400

        # Validar el valor del lado
        if lado not in ['izquierdo', 'derecho']:
            return jsonify({"error": "El campo 'lado' debe ser 'izquierdo' o 'derecho'."}), 400

        # Obtener la tarea principal correspondiente
        if lado == 'izquierdo' and tareas:
            tarea_principal = tareas[0]
        elif lado == 'derecho' and len(tareas) > 1:
            tarea_principal = tareas[1]
        else:
            return jsonify({"error": "No hay suficientes tareas principales."}), 400

        # Validar y procesar la fecha de vencimiento
        fecha_vencimiento = data.get('fecha_vencimiento')
        if fecha_vencimiento:
            try:
                fecha_vencimiento = datetime.fromisoformat(fecha_vencimiento)
            except ValueError:
                return jsonify({"error": "El campo 'fecha_vencimiento' debe tener un formato válido."}), 400

        # Crear la subtarea
        subtarea = SubTarea(
            nombre=nombre,
            fecha_vencimiento=fecha_vencimiento,
            prioridad=prioridad,
            etiquetas=data.get('etiquetas', []),
            notas=data.get('notas', "")
        )

        # Agregar la subtarea al lado correspondiente
        tarea_principal.agregar_subtarea(subtarea, lado)

        return jsonify({"message": "Subtarea agregada con éxito", "id_tarea": subtarea.id_tarea}), 201

    except Exception as e:
        return jsonify({"error": f"Ha ocurrido un error inesperado: {str(e)}"}), 500
    
@app.route('/subtarea/<int:id_subtarea>', methods=['DELETE'])
def eliminar_subtarea_endpoint(id_subtarea):
    try:
        # Buscar en las tareas principales
        for tarea in tareas:
            # Llamar a la función eliminar_subtarea de la tarea correspondiente
            mensaje = tarea.eliminar_subtarea(id_subtarea)
            if "eliminada exitosamente" in mensaje:
                return jsonify({"message": mensaje}), 200
        
        return jsonify({"error": f"No se encontró una subtarea con ID {id_subtarea}."}), 404

    except Exception as e:
        return jsonify({"error": f"Ha ocurrido un error inesperado: {str(e)}"}), 500

@app.route('/buscar_subtareas', methods=['GET'])
def buscar_subtareas():
    """
    Endpoint para buscar subtareas por etiqueta.
    """
    etiqueta = request.args.get('etiqueta')
    if not etiqueta:
        return jsonify({"error": "Falta el parámetro 'etiqueta'"}), 400

    ## Filtramos las subtareas dentro de las tareas que contienen la etiqueta proporcionada
    subtareas_encontradas = SubTarea.buscar_por_etiqueta(etiqueta, tareas)

    if subtareas_encontradas:
        return jsonify([subtarea.to_dict() for subtarea in subtareas_encontradas]), 200
    else:
        return jsonify({"message": "No se encontraron subtareas con esa etiqueta."}), 404

if __name__ == '__main__':
    app.run(debug=True)
