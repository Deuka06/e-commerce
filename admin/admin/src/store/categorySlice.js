import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios"; // Өзіңіз көрсеткен axios.js файлын импорттау

export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/categories");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Категория қосуға арналған Thunk
export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      // POST сұранысы: /categories (baseURL автоматты түрде қосылады)
      const response = await API.post("/categories", categoryData);
      return response.data;
    } catch (error) {
      // Қате болса, серверден келген хабарламаны қайтару
      return rejectWithValue(error.response?.data || "Серверде қате болды");
    }
  },
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload.data); // Жаңа категорияны тізімге қосу
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ////////////////////////////////
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
