import { useLabelContext } from "@/context/label.context";
import { toast } from "sonner";
import { DialogSearch } from "./DialogSearch";
import { useState } from "react";
import { useFetch } from "@/hooks";
import { Subtask } from "@/types";

export function Form() {
  const { label, setLabel } = useLabelContext();
  const [openModal, setOpenModal] = useState(false);
  const { data: tasks, error, loading } = useFetch<Subtask[]>(
    `${import.meta.env.VITE_API_URL}/buscar_subtareas?etiqueta=${label}`
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.currentTarget));
    const label = String(fields.label).trim();

    if (label.length === 0) {
      toast.error("La etiqueta no puede estar vacía");
      return;
    }
    setLabel(label);
    e.currentTarget.reset();
    setOpenModal(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-2 w-[50%]">
        <input
          type="text"
          name="label"
          placeholder="Escribe una etiqueta..."
          className="bg-transparent border border-border text-lg rounded pl-2 w-[80%]"
        />
        <button
          type="submit"
          className="grow bg-transparent border border-border rounded-md hover:bg-border transition duration-300"
        >
          Buscar
        </button>
      </form>
      {openModal && (
        <DialogSearch
          tasks={tasks}
          error={error}
          loading={loading}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
}
