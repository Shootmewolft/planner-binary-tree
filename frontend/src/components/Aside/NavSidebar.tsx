import { Day, Tasks, Projects } from "@/Icons";
import { ItemListSidebar } from "./index";

export function NavSidebar() {
  return (
    <nav className="px-2">
      <ul className="flex flex-col">
        <ItemListSidebar label="Mi día">
          <Day className="size-7" />
        </ItemListSidebar>
        <ItemListSidebar label="Tareas">
          <Tasks className="size-7" />
        </ItemListSidebar>
        <ItemListSidebar label="Proyectos">
          <Projects className="size-7" />
        </ItemListSidebar>
      </ul>
    </nav>
  );
}
