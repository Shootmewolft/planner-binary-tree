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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { HTTP_METHODS } from "@/models";
import { fetching } from "@/services";
import { useSubtasksStore, useTasksStore } from "@/store";
import { responseBodySubTask, responseSubtask } from "@/types";
import { FormEvent, ReactNode, useRef, useState } from "react";
import { toast } from "sonner";
import {
  InputDialog,
  SelectTask,
  Textarea,
  Calendar,
  Label,
} from "@/components";
import { formatDateToYMD } from "@/utils";

interface Props {
  children: ReactNode;
  idTask: number;
}

export function DialogSubTask({ children, idTask }: Props) {
  const { tasks } = useTasksStore();
  const { addSubTask } = useSubtasksStore();
  const inputName = useRef<HTMLInputElement>(null);
  const labelInput = useRef<HTMLInputElement>(null);
  const notesInput = useRef<HTMLTextAreaElement>(null);
  const [date, setDate] = useState<Date>();
  const [valueSelect, setValueSelect] = useState<string | null>(null);
  const side = useRef<"derecho" | "izquierdo">();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = inputName.current?.value;
    const label = labelInput.current?.value;
    const notes = notesInput.current?.value;

    if (!name || !label || !notes || !date || !valueSelect) {
      toast.error("Por favor, llena todos los campos");
      return;
    }

    if (idTask === tasks.tareas[0].id_tarea) {
      side.current = "izquierdo";
    } else {
      side.current = "derecho";
    }

    const subTask = {
      nombre: name,
      prioridad: valueSelect,
      lado: side.current!,
      fecha_vencimiento: formatDateToYMD(date),
      etiquetas: label.split(","),
      notas: notes,
    };

    const response = await fetching<responseBodySubTask, responseSubtask>(
      HTTP_METHODS.POST,
      "/subtarea",
      subTask
    );
    if (response instanceof Error) {
      toast.error("Hubo un error al crear la subtarea");
      return;
    }
    toast.success("Subtarea creada exitosamente");
    inputName.current!.value = "";
    labelInput.current!.value = "";
    notesInput.current!.value = "";
    setDate(undefined);
    setValueSelect(null);
    addSubTask(
      {
        ...subTask,
        fecha_vencimiento: date,
        id_tarea: response.id_tarea,
        subtareas_derecha: [],
        subtareas_izquierda: [],
        id_tarea_padre: idTask,
      },
      side.current!
    );
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-black rounded-xl px-4 py-2 font-semibold text-sm hover:bg-gray-main">
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Subtarea</DialogTitle>
          <DialogDescription>
            Rellena todos los campos para continuar.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <InputDialog
            name="name"
            placeholder="Estudiar para cálculo..."
            type="text"
            label="Nombre"
            ref={inputName}
          />
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-center">
              Prioridad
            </Label>
            <SelectTask setValueSelect={setValueSelect} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-center">
              Fecha de vencimiento
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date ? (
                    format(date, "yyy-MM-dd")
                  ) : (
                    <span>Selecciona un día</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <InputDialog
            label="Etiquetas"
            name="label"
            placeholder="CSS, HTML, JS..."
            type="text"
            ref={labelInput}
          />
          <div className="grid grid-cols-1 grid-rows-1 items-center gap-4">
            <Label htmlFor="description" className="text-left">
              Observaciones:
            </Label>
            <Textarea
              placeholder="Si tengo problemas le pido ayuda a Juan..."
              className="h-[100px]"
              ref={notesInput}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Crear subtarea</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
