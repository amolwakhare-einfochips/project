import uiReducer, { setSearch, setCategory, setSort } from "./uiSlice";
import { describe, it, expect } from "vitest";

describe("uiSlice", () => {

  it("should update search", () => {
    const state = uiReducer(undefined, setSearch("mouse"));
    expect(state.search).toBe("mouse");
  });

  it("should update category", () => {
    const state = uiReducer(undefined, setCategory("Audio"));
    expect(state.category).toBe("Audio");
  });

  it("should update sort", () => {
    const state = uiReducer(undefined, setSort("desc"));
    expect(state.sort).toBe("desc");
  });

});