import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Task, Tasks } from "@/types";

interface Store {
  tasks: Tasks;
  addTask: (task: Task) => void;
  removeTask: (id: number) => void;
  resetTasks: () => void;
}

export const useTasksStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        tasks: { tareas: [] },

        addTask: (task) => {
          set((state) => ({
            tasks: { tareas: [...state.tasks.tareas, task] },
          }));
        },

        removeTask: (id: number) => {
          set((state) => ({
            tasks: {
              tareas: state.tasks.tareas.filter(
                (task: Task) => task.id_tarea !== id
              ),
            },
          }));
        },

        resetTasks: () => {
          set({ tasks: { tareas: [] } });
        },
      }),
      { name: "tasks" }
    )
  )
);
