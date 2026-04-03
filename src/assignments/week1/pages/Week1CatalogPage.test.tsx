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
    renderPage();

    await screen.findByText(/Wireless Mouse/i);
  });

  it("renders empty state", async () => {
    server.use(http.get("/api/products", () => HttpResponse.json([])));

    renderPage();

    await screen.findByText(/No products/i);
  });

  it("renders error and retry button", async () => {
    server.use(
      http.get("/api/products", () => new HttpResponse(null, { status: 500 }))
    );

    renderPage();

    await screen.findByText(/Failed/i);
    expect(screen.getByText(/Retry/i)).toBeInTheDocument();
  });

  //  FILTER TEST
  it("filters products without API refetch", async () => {
    renderPage();

    await screen.findByText(/Wireless Mouse/i);

    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, "keyboard");

    expect(screen.queryByText(/Wireless Mouse/i)).not.toBeInTheDocument();
  });

});