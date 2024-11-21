import { Task } from "@/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import axios from "axios";
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
          axios.post("http://localhost:5000/tasks", {nombre: name, descripcion: description})
            .then((res) => {
              return res;
            });
        },
        addSubTask: () => {},
      }),
      { name: "tasks" }
    )
  )
);
