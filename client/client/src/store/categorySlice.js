import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

// Серверден категорияларды алу үшін AsyncThunk
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      // Бұл жерде API қолданамыз. Ол автоматты түрде "/api/v1/categories"-ке сұраныс жібереді
      const response = await API.get("/categories");
      return response.data;
    } catch (error) {
      // Қатені әдемілеп ұстау үшін
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    status: "idle", // 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
