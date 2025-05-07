import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../shared/baseUrl";

export const fetchFurnitures = createAsyncThunk(
  "furnitures/fetchFurnitures",
  async () => {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      return Promise.reject("Unable to fetch, status: " + response.status);
    }
    const data = await response.json();
    return data;
  }
);

const furnituresSlice = createSlice({
  name: "furnitures",
  initialState: { isLoading: true, errMess: null, furnituresArray: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFurnitures.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFurnitures.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errMess = null;
        state.furnituresArray = action.payload;
      })
      .addCase(fetchFurnitures.rejected, (state, action) => {
        state.isLoading = false;
        state.errMess = action.error ? action.error.message : "Fetch failed";
      });
  },
});

export const furnituresReducer = furnituresSlice.reducer;
