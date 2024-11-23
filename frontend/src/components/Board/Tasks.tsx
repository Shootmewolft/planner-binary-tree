import { HTTP_METHODS } from "@/models";
import { fetching } from "@/services";
import { useSubtasksStore, useTasksStore } from "@/store";
import { Task } from "@/types";
import { toast } from "sonner";
import { Button, DialogSubTask } from "@/components";
import { SubTask } from "./SubTask";

interface Props {
  tasks: Task[];
}

export function Tasks({ tasks }: Props) {
  const { removeTask } = useTasksStore();
  const { subtasks, removeSubTask } = useSubtasksStore();

  const handleDelete = (id: number, index: number) => {
    subtasks[index !== 0 ? "oneTask" : "twoTask"].map((subtask) => (
      removeSubTask(subtask.id_tarea)
    ))
    removeTask(id);
    fetching(HTTP_METHODS.DELETE, `/tarea/${id}`);
    toast.success("Tarea eliminada exitosamente");
  };

  const handleDeleteSubtask = (id: number) => {
    removeSubTask(id);
    fetching(HTTP_METHODS.DELETE, `/subtarea/${id}`);
    toast.success("Subtarea eliminada con éxito");
  };

  return (
    <ul className="flex flex-col gap-4">
      {tasks.map((task, index) => (
        <li
          key={task.id_tarea}
          className="flex flex-col justify-between px-4 py-2 bg-border rounded-xl gap-4"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold">{task.nombre}</h2>
              <p className="text-sm">{task.descripcion}</p>
            </div>
            <div className="flex gap-5">
              <DialogSubTask idTask={task.id_tarea}>
                Añadir subtarea
              </DialogSubTask>
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleDelete(task.id_tarea, index)}
                className="bg-red-500 rounded-xl "
              >
                Borrar
              </Button>
            </div>
          </div>
          <ul className="flex flex-col gap-2">
            {subtasks[index !== 0 ? "oneTask" : "twoTask"]?.map((subtask) => (
              <SubTask
                key={subtask.id_tarea}
                isSidebar
                date={subtask.fecha_vencimiento}
                labels={subtask.etiquetas}
                name={subtask.nombre}
                notes={subtask.notas}
                priority={subtask.prioridad}
              >
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => handleDeleteSubtask(subtask.id_tarea)}
                  className="bg-red-500 rounded-xl"
                >
                  Borrar
                </Button>
              </SubTask>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}