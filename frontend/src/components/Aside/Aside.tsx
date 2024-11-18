import { HeaderSidebar, NavSidebar, FooterSidebar } from "./index";

export function Aside() {
  return (
    <aside className="flex flex-col my-2 ml-2 grid-in-aside rounded-md border border-border bg-gray-sidebar">
      <HeaderSidebar />
      <NavSidebar />
      <FooterSidebar />
    </aside>
  );
}
