import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLabelContext } from "@/context";
import { Subtask } from "@/types";
import { SubTask } from "./SubTask";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  tasks: Subtask[] | null;
  error: Error | null
  loading: boolean;
}

export function DialogSearch({ openModal, setOpenModal, tasks, error, loading }: Props) {
  const { label } = useLabelContext();
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>
            Subtareas filtradas por la etiqueta <strong>{label}</strong>{" "}
          </DialogTitle>
        </DialogHeader>
        <ul className="flex flex-col gap-3">
        {loading && error !== null && (<li>Cargando...</li>)}
        {tasks && error !== null ? (
          tasks.map((task) => (
            <SubTask
              key={task.id_tarea}
              date={task.fecha_vencimiento}
              labels={task.etiquetas}
              name={task.nombre}
              notes={task.notas}
              priority={task.prioridad}
            />
          ))
        ) : (
          <li>No hay subtareas con esta etiqueta</li>
        )}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
