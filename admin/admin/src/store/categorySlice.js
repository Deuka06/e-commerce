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

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      // image_e06ac0.png скриншотындағыдай PUT сұранысы
      const response = await API.put(`/categories/${id}`, categoryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Жаңарту кезінде қате шықты",
      );
    }
  },
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      // Скриншоттағыдай DELETE сұранысы: /categories/5
      await API.delete(`/categories/${id}`);
      return id; // Өшірілген ID-ді қайтарамыз, оны store-дан алып тастау үшін
    } catch (error) {
      return rejectWithValue(error.response?.data || "Жою кезінде қате шықты");
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
        const newCategory = action.payload.data || action.payload;
        state.items.push(newCategory); // Жаңа категорияны тізімге қосу
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
    ////////////////////////////////
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.loading = false;
      const updated = action.payload.data || action.payload;
      // Ескі категорияны жаңасымен ауыстыру
      const index = state.items.findIndex((item) => item.id === updated.id);
      if (index !== -1) {
        state.items[index] = updated;
      }
    });
    /////////////////////////////////
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.loading = false;
      // Өшірілген категорияны тізімнен бірден алып тастау (UI автоматты түрде жаңарады)
      state.items = state.items.filter((item) => item.id !== action.payload);
    });
  },
});

export default categorySlice.reducer;
