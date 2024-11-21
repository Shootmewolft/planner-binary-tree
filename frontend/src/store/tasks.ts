import { Task } from "@/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Store {
  tasks: Task[];
  addTask: (name: string, description: string) => Promise<void>;
}

export const useTasksStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        tasks: [],
        addTask: async (name: string, description: string): Promise<void> => {
          fetch("http://localhost:5000/tasks", {
            method: "POST",
            body: JSON.stringify({ nombre: name, descripion: description }),
          })
            .then((res) => res.json())
            .then((res) => {return res});
        },
        addSubTask: () => {},
      }),
      { name: "tasks" }
    )
  )
);
