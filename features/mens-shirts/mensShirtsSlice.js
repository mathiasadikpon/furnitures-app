import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../shared/baseUrl";

export const fetchMensShirts = createAsyncThunk(
  "mensShirts/fetchMensShirts",
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

const mensShirtsSlice = createSlice({
  name: "mensShirts",
  initialState: { isLoading: true, errMess: null, mensShirtsArray: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMensShirts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMensShirts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errMess = null;
        state.mensShirtsArray = action.payload;
      })
      .addCase(fetchMensShirts.rejected, (state, action) => {
        state.isLoading = false;
        state.errMess = action.error ? action.error.message : "Fetch failed";
      });
  },
});

export const mensShirtsReducer = mensShirtsSlice.reducer;
