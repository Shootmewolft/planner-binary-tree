import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HTTP_METHODS } from "@/models";
import { fetching } from "@/services";
import { useTasksStore } from "@/store";
import { responseBodyTask, responseTask } from "@/types";
import { FormEvent, ReactNode, useRef } from "react";
import { toast } from "sonner";
import { InputDialog } from "../InputDialog";

interface Props {
  children: ReactNode;
}

export function DialogTask({ children }: Props) {
  const { addTask } = useTasksStore();
  const nameInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameInput.current?.value;
    const description = descriptionInput.current?.value;

    if (!name || !description) {
      toast.error("Por favor, llena todos los campos");
      return;
    }

    const response = await fetching<responseBodyTask, responseTask>(
      HTTP_METHODS.POST,
      "/tarea",
      {
        nombre: name,
        descripcion: description,
      }
    );

    if (!response || response instanceof Error) {
      toast.error("No puedes crear más de dos tareas");
      nameInput.current.value = "";
      descriptionInput.current.value = "";
      return;
    }
    const task = response.tarea;

    toast.success("Tarea creada exitosamente");
    nameInput.current.value = "";
    descriptionInput.current.value = "";
    addTask(task);
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-black rounded-xl px-4 py-2 font-semibold text-sm hover:bg-gray-main">
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear tarea</DialogTitle>
          <DialogDescription>
            Añade un nombre y descripción para tu nueva tarea.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <InputDialog
            name="name"
            placeholder="Estudiar para cálculo..."
            type="text"
            label="Nombre"
            ref={nameInput}
          />
          <InputDialog
            name="description"
            placeholder="Estudiar para el examen final de cálculo..."
            type="text"
            label="Descripción"
            ref={descriptionInput}
          />
          <DialogFooter>
            <Button type="submit">Crear tarea</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
