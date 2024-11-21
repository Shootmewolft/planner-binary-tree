import { Button } from "../ui/button";

export function ListTasks() {
  return (
    <div className="bg-gray-main h-[89%] mx-4 rounded-md p-4 flex flex-col gap-4 border border-border">
      <header className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Tareas</h3>
        <Button variant="outline" className="rounded-md">
          Crear Tarea
        </Button>
      </header>
      <ul>
        <li className="flex items-center justify-between p-2 bg-black-200 rounded-md">
          <div>
            <h1 className="text-lg font-bold">Task 1</h1>
            <p className="text-sm">Description of Task 1</p>
          </div>
          <button className="bg-red-500 text-white px-2 py-1 rounded-md ml-2">
            Delete
          </button>
        </li>
        <li className="flex items-center justify-between p-2 bg-black-200 rounded-md mt-2">
          <div>
            <h1 className="text-lg font-bold">Task 2</h1>
            <p className="text-sm">Description of Task 2</p>
          </div>
          <button className="bg-red-500 text-white px-2 py-1 rounded-md ml-2">
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
}
