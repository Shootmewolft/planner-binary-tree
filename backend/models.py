from datetime import datetime

class SubTarea:
    def __init__(self, id_tarea, nombre, fecha_vencimiento, prioridad, etiquetas=None, notas=""):
        self.id_tarea = id_tarea
        self.nombre = nombre
        self.fecha_vencimiento = fecha_vencimiento
        self.prioridad = prioridad
        self.etiquetas = etiquetas if etiquetas else []
        self.notas = notas
        self.subtareas_izquierda = None
        self.subtareas_derecha = None

    def agregar_subtarea(self, subtarea, lado):
        if self.subtareas_izquierda is None:
            self.subtareas_izquierda = subtarea
        elif self.subtareas_derecha is None:
            self.subtareas_derecha = subtarea
        elif lado == "izquierda":
            self.subtareas_izquierda.agregar_subtarea(subtarea, lado)
        elif lado == "derecha":
            self.subtareas_derecha.agregar_subtarea(subtarea, lado)

    def eliminar_subtarea(self, id_tarea):
        if self.subtareas_izquierda and self.subtareas_izquierda.id_tarea == id_tarea:
            self.subtareas_izquierda = None
        elif self.subtareas_derecha and self.subtareas_derecha.id_tarea == id_tarea:
            self.subtareas_derecha = None
        else:
            if self.subtareas_izquierda:
                self.subtareas_izquierda.eliminar_subtarea(id_tarea)
            if self.subtareas_derecha:
                self.subtareas_derecha.eliminar_subtarea(id_tarea)

    def buscar_subtareas_por_etiqueta(self, etiqueta, resultados=None):
        if resultados is None:
            resultados = []

        if etiqueta in self.etiquetas:
            resultados.append({
                "id_tarea": self.id_tarea,
                "nombre": self.nombre,
                "fecha_vencimiento": self.fecha_vencimiento,
                "prioridad": self.prioridad,
                "etiquetas": self.etiquetas,
                "notas": self.notas
            })

        if self.subtareas_izquierda:
            self.subtareas_izquierda.buscar_subtareas_por_etiqueta(etiqueta, resultados)
        if self.subtareas_derecha:
            self.subtareas_derecha.buscar_subtareas_por_etiqueta(etiqueta, resultados)

        return resultados
    
    def mostrar_arbol(self, nivel=0):
        """
        Muestra el árbol completo de subtareas con una representación jerárquica.
        """
        indentacion = "  " * nivel
        print(f"{indentacion}- {self.nombre} (ID: {self.id_tarea}, Prioridad: {self.prioridad})")
        if self.subtareas_izquierda:
            self.subtareas_izquierda.mostrar_arbol(nivel + 1)
        if self.subtareas_derecha:
            self.subtareas_derecha.mostrar_arbol(nivel + 1)


class Proyecto(SubTarea):
    def __init__(self, nombre):
        super().__init__(id_tarea=None, nombre=nombre, fecha_vencimiento=None, prioridad=None)
        self.tareas = []

    def agregar_subtarea(self, subtarea, lado=None):
        """
        Agrega una subtarea (como instancia de `SubTarea`) al proyecto.
        """
        if not isinstance(subtarea, SubTarea):
            raise TypeError("La subtarea debe ser una instancia de SubTarea.")
        self.tareas.append(subtarea)
        super().agregar_subtarea(subtarea, lado)
        print(self.tareas)

    def eliminar_subtarea(self, id_tarea):
        """
        Elimina una subtarea del proyecto por su ID.
        """
        for subtarea in self.tareas:
            if subtarea.id_tarea == id_tarea:
                self.tareas.remove(subtarea)
                super().eliminar_subtarea(id_tarea)
                return f"Subtarea con ID {id_tarea} eliminada exitosamente."
        return f"No se encontró una subtarea con ID {id_tarea}."

    def buscar_subtareas_por_etiqueta(self, etiqueta):
        """
        Busca subtareas dentro del proyecto por etiqueta.
        """
        resultados = []
        for subtarea in self.tareas:
            subtarea.buscar_subtareas_por_etiqueta(etiqueta, resultados)
        return resultados

    def mostrar_arbol_completo(self):
        """
        Muestra todo el árbol del proyecto, incluyendo todas las subtareas.
        """
        print(f"Proyecto: {self.nombre}")
        for subtarea in self.tareas:
            subtarea.mostrar_arbol(1)

    def __repr__(self):
        return f"Proyecto: {self.nombre}, Total Subtareas: {len(self.tareas)}"

# # USO DE LA CLASES
# proyecto = Proyecto("Proyecto de Ejemplo")
# subtarea1 = SubTarea(
#     id_tarea=1,
#     nombre="Primera Subtarea",
#     fecha_vencimiento=datetime(2024, 12, 1),
#     prioridad="Alta",
#     etiquetas=["importante", "urgente"]
# )
# subtarea2 = SubTarea(
#     id_tarea=2,
#     nombre="Segunda Subtarea",
#     fecha_vencimiento=datetime(2024, 12, 10),
#     prioridad="Media",
#     etiquetas=["urgente"]
# )
# subtarea3 = SubTarea(
#     id_tarea=3,
#     nombre="Tercera Subtarea",
#     fecha_vencimiento=datetime(2024, 12, 15),
#     prioridad="Baja",
#     etiquetas=["asd"]
# )
# subtarea4 = SubTarea(
#     id_tarea=4,
#     nombre="Cuarta Subtarea",
#     fecha_vencimiento=datetime(2024, 12, 12),
#     prioridad="Alta",
#     etiquetas=["CSS"]
# )

# proyecto.agregar_subtarea(subtarea1, lado="izquierda")
# proyecto.agregar_subtarea(subtarea2, lado="derecha")
# proyecto.agregar_subtarea(subtarea3, lado="izquierda")

# print("Buscar subtareas por etiqueta 'urgente':")
# print(proyecto.buscar_subtareas_por_etiqueta("urgente"))
# print("\nEliminar subtarea con ID 2:")
# print(proyecto.eliminar_subtarea(2))

# print("\nEstado del proyecto:")
# print(proyecto)
# for tarea in proyecto.tareas:
#     print(tarea)

# print("Arbol completo del proyecto:")
# proyecto.mostrar_arbol_completo()