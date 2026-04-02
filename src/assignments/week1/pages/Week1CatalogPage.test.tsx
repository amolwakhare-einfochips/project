import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Week1CatalogPage from "./Week1CatalogPage";
import { server } from "../../../mocks/server";
import { http, HttpResponse } from "msw";

// Setup MSW
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Helper
const renderPage = () => {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <Week1CatalogPage />
    </QueryClientProvider>
  );
};

describe("Week1CatalogPage", () => {

  it("renders products after loading", async () => {
    renderPage();

    // wait for success data
    await waitFor(() => {
      expect(screen.getByText(/Wireless Mouse/i)).toBeInTheDocument();
    });
  });

  it("renders empty state", async () => {
    server.use(
      http.get("/api/products", () => {
        return HttpResponse.json([]);
      })
    );

    renderPage();

    await waitFor(() => {
      expect(screen.getByText(/No products/i)).toBeInTheDocument();
    });
  });

  it("renders error and retry button", async () => {
    server.use(
      http.get("/api/products", () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderPage();

    await waitFor(() => {
      expect(screen.getByText(/Failed to load products/i)).toBeInTheDocument(); // ✅ FIXED
      expect(screen.getByText(/Retry/i)).toBeInTheDocument();
    });
  });

});