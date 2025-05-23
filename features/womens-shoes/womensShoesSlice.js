import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../shared/baseUrl";

export const fetchWomensShoes = createAsyncThunk(
  "womensShoes/fetchWomensShoes",
  async () => {
    const response = await fetch(baseUrl + "products");
    if (!response.ok) {
      return Promise.reject("Unable to fetch, status: " + response.status);
    }
    const data = await response.json();
    console.log("Fetched data:", data); // Log the fetched data
    return data;
  }
);

const womensShoesSlice = createSlice({
  name: "womensShoes",
  initialState: { isLoading: true, errMess: null, womensShoesArray: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWomensShoes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWomensShoes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errMess = null;
        state.womensShoesArray = action.payload;
      })
      .addCase(fetchWomensShoes.rejected, (state, action) => {
        state.isLoading = false;
        state.errMess = action.error ? action.error.message : "Fetch failed";
      });
  },
});

export const womensShoesReducer = womensShoesSlice.reducer;
