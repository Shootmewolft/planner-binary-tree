import { Form } from "./index.ts";

export function HeaderBoard() {
  return (
    <header className="p-4 flex justify-between items-center">
      <span className="text-lg text-dark-gray">
        Proyectos {"> "}
        <strong className="text-off-white">! Shoot</strong>
      </span>
      <Form />
    </header>
  );
}
