import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";
import { describe, it, expect } from "vitest";

const ProblemChild = () => {
  throw new Error("Crash");
};

describe("ErrorBoundary", () => {
  it("shows fallback UI on error", () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
});