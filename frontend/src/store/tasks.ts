import { Task } from "@/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Store{
    tasks: Task[];
    addTask: (task: string) => void;
}

export const useTasksStore = create<Store>()(
  devtools(
    persist(
       (set, get) => {
        return {
          questions: [],
          currentQuestion: 1,
          fetchQuestions: async (limit: number) => {
            const res = await fetch("http://localhost:5173");
            const json = await res.json();

            const questions = json
              .sort(() => Math.random() - 0.5)
              .slice(0, limit);
            set({ questions });
          },
        };
      },
      { name: "questions" }
    )
  )
);