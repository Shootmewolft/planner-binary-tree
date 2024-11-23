export interface Tasks {
  tareas: Task[];
}

export interface Task {
  descripcion: string;
  id_tarea: number;
  nombre: string;
  subtareas_derecha: Subtareas[];
  subtareas_izquierda: Subtareas[];
}

export interface Subtask {
  etiquetas: string[];
  fecha_vencimiento: Date;
  id_tarea: number;
  nombre: string;
  notas: string;
  prioridad: string;
  subtareas_derecha: Task[];
  subtareas_izquierda: Task[];
}

export interface responseBodyTask {
  nombre: string;
  descripcion: string;
}

export interface responseTask{
  mensaje: string;
  tarea: Task;
}

export interface responseBodySubTask {
  nombre: string;
  prioridad: string;
  lado: "izquierdo" | "derecho";
  fecha_vencimiento: string;
  etiquetas: string[];
  notas: string;
}

export interface responseSubtask{
  message: string;
  id_tarea: number;
}

export interface responseBodySearchTask {
  etiqueta: string
}