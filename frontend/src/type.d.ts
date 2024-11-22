export interface Tasks {
  tareas: Task[];
}

export interface Task {
  descripcion:         string;
  id_tarea:            number;
  nombre:              string;
  subtareas_derecha:   Subtareas[];
  subtareas_izquierda: Subtareas[];
}

export interface Subtask {
  etiquetas:           string[];
  fecha_vencimiento:   Date;
  id_tarea:            number;
  nombre:              string;
  notas:               string;
  prioridad:           string;
  subtareas_derecha:   Task[];
  subtareas_izquierda: Task[];
}
