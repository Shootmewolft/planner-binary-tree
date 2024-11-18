import { ReactNode } from "react";

interface Props {
  label: string;
  children: ReactNode;
}

export function ItemListSidebar({ label, children }: Props) {
  return (
    <li className="hover:bg-border transition duration-300 p-1 rounded text-lg cursor-pointer flex items-center gap-2">
      {children}
      {label}
    </li>
  );
}
