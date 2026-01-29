import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios"; // Өзің жасаған axios конфигін қолданған дұрыс

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      // Query параметр ретінде categoryId жібереміз
      const response = await API.get(`/products`, {
        params: { categoryId },
      });
      console.log("Fetched products:", response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Тауарларды алу мүмкін болмады",
      );
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    itemProducts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearProducts: (state) => {
      state.itemProducts = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        // action.payload-та енді тек тауарлар массиві болады
        state.itemProducts = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;
