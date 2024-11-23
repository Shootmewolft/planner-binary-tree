import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonTasks() {
  return (
    <section className="flex flex-col gap-4">
      <h2>No hay tareas disponibles :)</h2>
      {[...Array(8)].map((_, index) => (
      <div key={index} className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[750px]" />
          <Skeleton className="h-4 w-[500px]" />
        </div>
      </div>
      ))}
    </section>
  );
}
