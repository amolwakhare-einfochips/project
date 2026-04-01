import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

async function startApp() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    await worker.start();
    console.log("MSW started");
  }

  createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

startApp();