from flask import Flask, request, jsonify
from models import Proyecto, SubTarea

app = Flask(__name__)

proyecto = Proyecto(nombre="Shoot")

@app.route('/subtarea', methods=['POST'])
def agregar_subtarea():
    data = request.json
    subtarea = SubTarea(
        id_tarea=data['id_tarea'],
        nombre=data['nombre'],
        fecha_vencimiento=data.get('fecha_vencimiento'),
        prioridad=data['prioridad'],
        etiquetas=data.get('etiquetas', []),
        notas=data.get('notas', "")
    )
    proyecto.agregar_subtarea(subtarea, lado=data.get('lado'))
    return jsonify({"message": "Subtarea agregada con éxito"}), 201

@app.route('/subtarea/<string:id_tarea>', methods=['DELETE'])
def eliminar_subtarea(id_tarea):
    mensaje = proyecto.eliminar_subtarea(id_tarea)
    return jsonify({"message": mensaje})

@app.route('/buscar', methods=['POST'])
def buscar_subtareas_por_etiqueta():
    data = request.json 
    etiqueta = data.get('etiqueta')

    if not etiqueta:
        return jsonify({"error": "Se debe proporcionar una etiqueta"}), 400

    subtareas = proyecto.buscar_subtareas_por_etiqueta(etiqueta)

    if not subtareas:
        return jsonify({"message": "No se encontraron subtareas con esa etiqueta"}), 404

    return jsonify({"subtareas": subtareas}), 200

@app.route('/proyecto', methods=['GET'])
def mostrar_proyecto():
    return jsonify({"proyecto": repr(proyecto)})

@app.route('/subtareas', methods=['GET'])
def obtener_subtareas():
    subtareas = proyecto.tareas

    if not subtareas:
        return jsonify({"message": "No hay subtareas en el proyecto."}), 404

    subtareas_respuesta = []
    for subtarea in subtareas:
        subtareas_respuesta.append({
            "id_tarea": subtarea.id_tarea,
            "nombre": subtarea.nombre,
            "fecha_vencimiento": subtarea.fecha_vencimiento,
            "prioridad": subtarea.prioridad,
            "etiquetas": subtarea.etiquetas,
            "notas": subtarea.notas,
        })
    
    return jsonify({"subtareas": subtareas_respuesta}), 200

if __name__ == '__main__':
    app.run(debug=True)