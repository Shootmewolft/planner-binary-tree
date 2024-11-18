import { Add } from "@/Icons";

export function FooterSidebar() {
  return (
    <footer className="grow flex items-end p-4">
      <button className="flex gap-2 items-center justify-center w-full text-base bg-black px-2 py-1 rounded hover:bg-border transition duration-300">
        <Add className="size-5" />
        Nuevo proyecto
      </button>
    </footer>
  );
}
