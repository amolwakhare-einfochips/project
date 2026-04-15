import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import Week1CatalogPage from "./Week1CatalogPage";
import { server } from "../../../mocks/server";
import { http, HttpResponse } from "msw";
import { store } from "../../../store";

// MSW
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Helper
const renderPage = () => {
  const queryClient = new QueryClient();

  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Week1CatalogPage />
      </QueryClientProvider>
    </Provider>
  );
};

describe("Week1CatalogPage", () => {
  it("renders products after loading", async () => {
    server.use(
      http.get("/api/products", () =>
        HttpResponse.json([
          {
            id: 1,
            name: "Wireless Mouse",
            price: 29.99,
            category: "Peripherals",
          },
        ])
      )
    );

    renderPage();

    expect(await screen.findByText(/Wireless Mouse/i)).toBeInTheDocument();
  });

  it("renders empty state", async () => {
    server.use(
      http.get("/api/products", () => HttpResponse.json([]))
    );

    renderPage();

    expect(await screen.findByText(/No products/i)).toBeInTheDocument();
  });

  it("renders error and retry button", async () => {
    server.use(
      http.get("/api/products", () =>
        new HttpResponse(null, { status: 500 })
      )
    );

    renderPage();

    expect(await screen.findByText(/Failed/i)).toBeInTheDocument();
    expect(screen.getByText(/Retry/i)).toBeInTheDocument();
  });

  it("filters products without API refetch", async () => {
    server.use(
      http.get("/api/products", () =>
        HttpResponse.json([
          {
            id: 1,
            name: "Wireless Mouse",
            price: 29.99,
            category: "Peripherals",
          },
          {
            id: 2,
            name: "Mech Keyboard",
            price: 89.0,
            category: "Peripherals",
          },
        ])
      )
    );

    renderPage();

    await screen.findByText(/Wireless Mouse/i);

    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, "keyboard");

    expect(
      screen.queryByText(/Wireless Mouse/i)
    ).not.toBeInTheDocument();
  });
});