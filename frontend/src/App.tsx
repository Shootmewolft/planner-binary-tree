import { Aside, Board, Footer } from "@/components";
import { Toaster } from "sonner";

function App() {
  return (
    <main className="grid min-h-dvh grid-areas-layout grid-cols-layout grid-rows-layout">
      <Aside />
      <Board />
      <Footer />
      <Toaster richColors />
    </main>
  );
}

export default App;