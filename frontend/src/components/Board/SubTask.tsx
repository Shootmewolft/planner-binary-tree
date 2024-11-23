import { formatDateToYMD } from "@/utils";
import { Badge } from "../ui/badge";

interface Props {
  name: string;
  notes: string;
  priority: string;
  date: Date;
  labels: string[];
  isSidebar?: boolean;
  children?: React.ReactNode;
}

export function SubTask({
  name,
  notes,
  date,
  labels,
  priority,
  isSidebar,
  children,
}: Props) {
  const dateFormated = formatDateToYMD(date);
  const priorityFormated = priority[0].toUpperCase() + priority.slice(1);

  return (
    <li
      className={`border border-border p-4 flex flex-col gap-2 ${
        isSidebar && "border-gray-sidebar rounded-xl"
      }`}
    >
      <header className="flex justify-between">
        <Badge variant="default" className="rounded-xl">
          {priorityFormated}
        </Badge>
        <time className="text-gray-400">{dateFormated}</time>
      </header>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg">{name}</h2>
          <p className="text-gray-400">{notes}</p>
        </div>
        {children}
      </div>
      <footer className="flex items-center gap-2">
        {labels.map((label) => (
          <Badge
            key={label}
            variant={isSidebar ? "default" : "secondary"}
            className="block-inline"
          >
            {label}
          </Badge>
        ))}
      </footer>
    </li>
  );
}
