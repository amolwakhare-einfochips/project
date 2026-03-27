import { createRoot } from "react-dom/client";
import "./index.module.scss";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./i18n";

async function startApp() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    await worker.start();
    console.log(" MSW started");
  }

  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

startApp();