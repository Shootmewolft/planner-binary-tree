from datetime import datetime
class IDGenerator:
    _current_id = 1

    @classmethod
    def next_id(cls):
        id_generado = cls._current_id
        cls._current_id += 1
        return id_generado


class Tarea:
    def __init__(self, nombre, descripcion):
        self.id_tarea = IDGenerator.next_id() 
        self.nombre = nombre
        self.descripcion = descripcion
        self.subtareas_izquierda = []  # Lista de subtareas del lado izquierdo
        self.subtareas_derecha = []  # Lista de subtareas del lado derecho

    def agregar_subtarea(self, subtarea, lado):
        """
        Agrega una subtarea a la tarea actual según el lado especificado.
        """
        if lado not in ["izquierdo", "derecho"]:
            raise ValueError("El lado debe ser 'izquierdo' o 'derecho'.")

        if lado == "izquierdo":
            self.subtareas_izquierda.append(subtarea)
        else:  # lado == "derecho"
            self.subtareas_derecha.append(subtarea)

    def eliminar_subtarea(self, id_subtarea):
        """
        Elimina una subtarea de la tarea si el id coincide.
        """
        # Verificar si la subtarea está en el lado izquierdo
        for subtarea in self.subtareas_izquierda:
            if subtarea.id_tarea == id_subtarea:
                self.subtareas_izquierda.remove(subtarea)
                return f"Subtarea con ID {id_subtarea} eliminada exitosamente."
    
        # Verificar si la subtarea está en el lado derecho
        for subtarea in self.subtareas_derecha:
            if subtarea.id_tarea == id_subtarea:
                self.subtareas_derecha.remove(subtarea)
                return f"Subtarea con ID {id_subtarea} eliminada exitosamente."
    
        # Si no se encontró la subtarea
        return f"No se encontró una subtarea con ID {id_subtarea}."
    


    def eliminar_tarea(self, id_tarea):
        """
        Elimina la tarea principal y sus subtareas.
        """
        if self.id_tarea == id_tarea:
            # Eliminar todas las subtareas asociadas
            self.subtareas_izquierda.clear()
            self.subtareas_derecha.clear()
            return f"Tarea con ID {id_tarea} y sus subtareas eliminadas exitosamente."
        return None

    def to_dict(self):
        """
        Convierte la tarea a un diccionario, incluyendo subtareas organizadas por lados.
        """
        return {
            "id_tarea": self.id_tarea,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "subtareas_izquierda": [subtarea.to_dict() for subtarea in self.subtareas_izquierda],
            "subtareas_derecha": [subtarea.to_dict() for subtarea in self.subtareas_derecha],
        }

# Lista global para almacenar las tareas principales
tareas = []

def agregar_tarea(nombre, descripcion):
    """Agrega una nueva tarea principal."""
    if len(tareas) >= 2:
        raise ValueError("Solo se pueden agregar dos tareas.")

    if not nombre:
        raise ValueError("El campo 'nombre' es obligatorio.")

    if not descripcion:
        raise ValueError("El campo 'descripcion' es obligatorio.")

    tarea = Tarea(nombre=nombre, descripcion=descripcion)
    tareas.append(tarea)
    return tarea

def eliminar_tarea(id_tarea):
    """Elimina una tarea y todas sus subtareas asociadas."""
    for tarea in tareas:
        mensaje = tarea.eliminar_tarea(id_tarea)
        if mensaje:
            tareas.remove(tarea)  # Elimina la tarea principal de la lista de tareas
            return mensaje
    return f"No se encontró una tarea con ID {id_tarea}."

def obtener_todas_las_tareas():
    """Devuelve una lista de todas las tareas y sus subtareas."""
    return [tarea.to_dict() for tarea in tareas]

class SubTarea:
    _id_counter = 1  # Contador estático para generar IDs únicos
    _id_usados = set()  # Conjunto de IDs ya utilizados

    def __init__(self, nombre, fecha_vencimiento, prioridad, etiquetas=None, notas="", id_tarea=None):
        self.id_tarea = IDGenerator.next_id() 
        # Resto de los atributos de la subtarea
        self.nombre = nombre
        self.fecha_vencimiento = fecha_vencimiento
        self.prioridad = prioridad
        self.etiquetas = etiquetas if etiquetas else []
        self.notas = notas
        self.subtareas_izquierda = None
        self.subtareas_derecha = None
    
    
    def to_dict(self):
        return {
            "id_tarea": self.id_tarea,
            "nombre": self.nombre,
            "fecha_vencimiento": self.fecha_vencimiento.isoformat() if self.fecha_vencimiento else None,
            "prioridad": self.prioridad,
            "etiquetas": self.etiquetas,
            "notas": self.notas,
            "subtareas_izquierda": self.subtareas_izquierda.to_dict() if self.subtareas_izquierda else [],
            "subtareas_derecha": self.subtareas_derecha.to_dict() if self.subtareas_derecha else []
        }

    def agregar_subtarea(self, subtarea, lado):
        if lado == "izquierdo":
            if self.subtareas_izquierda is None:
                self.subtareas_izquierda = subtarea
            else:
                self.subtareas_izquierda.agregar_subtarea(subtarea, lado)
        elif lado == "derecho":
            if self.subtareas_derecha is None:
                self.subtareas_derecha = subtarea
            else:
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
    
    @staticmethod
    def buscar_por_etiqueta(etiqueta, tareas):
        """
        Busca todas las subtareas que contienen una etiqueta específica dentro de las tareas.
        """
        subtareas_encontradas = []
        for tarea in tareas:
            # Buscar en las subtareas del lado izquierdo
            subtareas_encontradas += [subtarea for subtarea in tarea.subtareas_izquierda if etiqueta in subtarea.etiquetas]
            # Buscar en las subtareas del lado derecho
            subtareas_encontradas += [subtarea for subtarea in tarea.subtareas_derecha if etiqueta in subtarea.etiquetas]

        return subtareas_encontradas
    


class Proyecto(SubTarea):
    def __init__(self, nombre):
        super().__init__(nombre=nombre, fecha_vencimiento=None, prioridad=None)
        self.tareas = []
    
    def agregar_tarea(self, nombre, descripcion):
        """
        Agrega una nueva tarea principal al proyecto. Solo permite hasta 2 tareas.
        """
        if len(self.tareas) >= 2:
            raise ValueError("Solo se pueden agregar dos tareas principales.")

        tarea = Tarea(nombre, descripcion)
        self.tareas.append(tarea)    

    def agregar_subtarea(self, subtarea, lado):
        """
        Agrega una subtarea al proyecto según el lado especificado.
        """
        if not self.tareas:
            raise ValueError("No hay tareas principales en el proyecto.")
        
        # Asignar al primer o segundo nodo según el lado
        if lado == "izquierdo":
            self.tareas[0].agregar_subtarea(
                subtarea.nombre, subtarea.descripcion, lado="izquierdo"
            )
        elif lado == "derecho":
            if len(self.tareas) < 2:
                raise ValueError("Debe haber dos tareas principales para asignar al lado derecho.")
            self.tareas[1].agregar_subtarea(
                subtarea.nombre, subtarea.descripcion, lado="derecho"
            )
        else:
            raise ValueError("El lado debe ser 'izquierdo' o 'derecho'.")
    
    def eliminar_tarea(self, id_tarea):
        # Buscar tarea por ID
        tarea_a_eliminar = None
        for tarea in self.tareas:
            if tarea.id_tarea == id_tarea:
                tarea_a_eliminar = tarea
                break
            
        if not tarea_a_eliminar:
            return f"No se encontró una tarea con ID {id_tarea}."
    
        # Eliminar subtareas de esa tarea
        for subtarea in tarea_a_eliminar.subtareas_izquierda:
            self.eliminar_subtarea(subtarea.id_tarea)
        for subtarea in tarea_a_eliminar.subtareas_derecha:
            self.eliminar_subtarea(subtarea.id_tarea)
    
        # Eliminar la tarea principal
        self.tareas.remove(tarea_a_eliminar)
        return f"Tarea con ID {id_tarea} y todas sus subtareas han sido eliminadas."

    def eliminar_subtarea(id_tarea):
        """Elimina una subtarea de cualquier tarea a la que pertenezca."""
        for tarea in tareas:
            # Buscar y eliminar en subtareas_izquierda
            for subtarea in tarea.subtareas_izquierda:
                if subtarea.id_tarea == id_tarea:
                    tarea.subtareas_izquierda.remove(subtarea)
                    return f"Subtarea con ID {id_tarea} eliminada exitosamente."
    
            # Buscar y eliminar en subtareas_derecha
            for subtarea in tarea.subtareas_derecha:
                if subtarea.id_tarea == id_tarea:
                    tarea.subtareas_derecha.remove(subtarea)
                    return f"Subtarea con ID {id_tarea} eliminada exitosamente."
    
        return f"No se encontró una subtarea con ID {id_tarea}."
    
    def eliminar_todas_subtareas(self):
        """
        Elimina todas las subtareas del proyecto.
        """
        self.tareas.clear()  ## Elimina todas las subtareas del proyecto
        return "Todas las subtareas han sido eliminadas."
    


    def mostrar_arbol_completo(self):
        """
        Muestra todo el árbol del proyecto, incluyendo todas las subtareas.
        """
        print(f"Proyecto: {self.nombre}")
        for subtarea in self.tareas:
            subtarea.mostrar_arbol(1)

    def __repr__(self):
        return f"Proyecto: {self.nombre}, Total Subtareas: {len(self.tareas)}"