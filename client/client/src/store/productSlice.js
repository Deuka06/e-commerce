import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Категория бойынша тауарларды алу
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (categoryId) => {
    const response = await axios.get(
      `http://194.32.142.105/api/v1/products?categoryId=${categoryId}`
    );
    // Backend "success: true, data: [...]" қайтаратын болса:
    console.log(response, "efefefe");
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    itemProducts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Тауарларды қолмен тазалау керек болса
    clearProducts: (state) => {
      state.itemProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.itemProducts = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;
