import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../shared/baseUrl";

export const fetchMensShoes = createAsyncThunk(
  "mensShoes/fetchMensShoes",
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

const mensShoesSlice = createSlice({
  name: "mensShoes",
  initialState: { isLoading: true, errMess: null, mensShoesArray: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMensShoes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMensShoes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errMess = null;
        state.mensShoesArray = action.payload;
      })
      .addCase(fetchMensShoes.rejected, (state, action) => {
        state.isLoading = false;
        state.errMess = action.error ? action.error.message : "Fetch failed";
      });
  },
});

export const mensShoesReducer = mensShoesSlice.reducer;
