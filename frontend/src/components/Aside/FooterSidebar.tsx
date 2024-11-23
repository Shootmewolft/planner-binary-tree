import { Add } from "@/Icons";
import { HTTP_METHODS } from "@/models";
import { fetching } from "@/services";
import { useSubtasksStore, useTasksStore } from "@/store";
import { toast } from "sonner";

export function FooterSidebar() {
  const { resetTasks, tasks } = useTasksStore();
  const { resetSubtasks } = useSubtasksStore();
  const handleClick = () => {
    if (tasks.tareas.length === 0) {
      toast.error("No hay tareas para limpiar");
      return;
    }
    resetTasks();
    tasks.tareas.forEach((task, index) => {
      if (!task) return;
      fetching(HTTP_METHODS.DELETE, `/tarea/${tasks.tareas[index].id_tarea}`);
      toast.success("Tareas eliminadas exitosamente");
    });

    resetSubtasks();

  };
  return (
    <footer className="grow flex items-end p-4">
      <button
        className="flex gap-2 items-center justify-center w-full text-base bg-black px-2 py-1 rounded hover:bg-border transition duration-300"
        onClick={handleClick}
      >
        <Add className="size-5" />
        Nuevo proyecto
      </button>
    </footer>
  );
}
