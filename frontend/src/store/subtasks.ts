import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Subtask } from "@/types";

interface Store {
  subtasks: { oneTask: Subtask[]; twoTask: Subtask[] };
  removeSubTask: (idSubtask: number) => void;
  addSubTask: (subtask: Subtask, lado: string) => void;
  resetSubtasks: () => void;
}

export const useSubtasksStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        subtasks: { oneTask: [], twoTask: [] },
        removeSubTask: (idSubtask: number) => {
          set((state) => {
            return {
              subtasks: {
                oneTask: state.subtasks.oneTask.filter(
                  (subtask) => subtask.id_tarea !== idSubtask
                ),
                twoTask: state.subtasks.twoTask.filter(
                  (subtask) => subtask.id_tarea !== idSubtask
                ),
              },
            };
          });
        },

        addSubTask: (subtask: Subtask, side: string) => {
          if (side === "derecho") {
            set((state) => {
              return {
                subtasks: {
                  oneTask: [...state.subtasks.oneTask, subtask],
                  twoTask: state.subtasks.twoTask,
                },
              };
            });
          } else {
            set((state) => {
              return {
                subtasks: {
                  oneTask: state.subtasks.oneTask,
                  twoTask: [...state.subtasks.twoTask, subtask],
                },
              };
            });
          }
        },

        resetSubtasks: () => ({ oneTask: [], twoTask: [] }),
      }),

      { name: "subtasks" }
    )
  )
);
