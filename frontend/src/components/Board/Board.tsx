import { HeaderBoard, ListTasks } from "./index.ts";

export function Board() {
  return (
    <section className="grid-in-main">
      <HeaderBoard />
      <ListTasks />
    </section>
  );
}
