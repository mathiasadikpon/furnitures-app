import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../shared/baseUrl";

export const fetchWomensDresses = createAsyncThunk(
  "womensDresses/fetchWomensDresses",
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

const womensDressesSlice = createSlice({
  name: "womensDresses",
  initialState: { isLoading: true, errMess: null, womensDressesArray: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWomensDresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWomensDresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errMess = null;
        state.womensDressesArray = action.payload;
      })
      .addCase(fetchWomensDresses.rejected, (state, action) => {
        state.isLoading = false;
        state.errMess = action.error ? action.error.message : "Fetch failed";
      });
  },
});

export const womensDressesReducer = womensDressesSlice.reducer;
