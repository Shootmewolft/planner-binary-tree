import { useLabelContext } from "@/context/label.context";
import { toast } from "sonner";

export function Form() {
  const { setLabel } = useLabelContext();
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
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-[50%]">
      <input
        type="text"
        name="label"
        placeholder="Escribe una etiqueta..."
        className="bg-transparent border border-border text-lg rounded pl-2 w-[80%]"
      />
      <button type="submit" className="grow bg-transparent border border-border rounded-md hover:bg-border transition duration-300">Buscar</button>
    </form>
  );
}
