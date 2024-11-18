import { Enterprise, Arrows } from "@/Icons";

export function HeaderSidebar() {
  return (
    <header className="flex items-center justify-between select-none hover:bg-border px-3 py-2 mx-2 my-3 rounded transition duration-300">
      <div className="flex items-center relative">
        <Enterprise className="size-7 bg-blue-700 outline outline-[4px] outline-blue-700" />
        <p className="flex flex-col items-center pl-4 leading-[15px] text-sm font-semibold text text-slate-300">
          <strong className="text-lg font-bold text-slate-200">! Shoot</strong>
          Enterprise
        </p>
      </div>
      <Arrows className="size-6" />
    </header>
  );
}
