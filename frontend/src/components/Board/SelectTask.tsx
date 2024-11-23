import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props{
  setValueSelect: (value: string) => void;
}

export const SelectTask = ({setValueSelect}: Props) => {
  return (
    <Select onValueChange={(value) => setValueSelect(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Seleccione una opción" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="alta">Alta</SelectItem>
        <SelectItem value="medio">Media</SelectItem>
        <SelectItem value="baja">Baja</SelectItem>
      </SelectContent>
    </Select>
  );
};
