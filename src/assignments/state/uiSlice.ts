import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type UiState = {
  search: string;
  category: string;
  sort: "asc" | "desc";
};

const initialState: UiState = {
  search: "",
  category: "all",
  sort: "asc",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setSort(state, action: PayloadAction<"asc" | "desc">) {
      state.sort = action.payload;
    },
  },
});

export const { setSearch, setCategory, setSort } = uiSlice.actions;
export default uiSlice.reducer;