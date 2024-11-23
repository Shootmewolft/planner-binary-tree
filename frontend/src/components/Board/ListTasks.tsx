import { useTasksStore } from "@/store";
import { DialogTask, Tasks } from "./index";
import { SkeletonTasks } from "@/components";

export function ListTasks() {
  const { tasks } = useTasksStore();
  return (
    <div className="bg-gray-main h-[89%] mx-4 rounded-md p-4 flex flex-col gap-4 border border-border overflow-y-auto">
      <header className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Tareas</h3>
        <DialogTask>
            Crear Tarea
        </DialogTask>
      </header>
      {tasks.tareas.length > 0 ? (
        <Tasks tasks={tasks.tareas} />
      ) : (
        <SkeletonTasks />
      )}
    </div>
  );
}
