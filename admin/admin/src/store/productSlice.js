import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

// Тауар қосуға арналған Thunk
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      // Swagger бойынша: POST /products
      const response = await API.post("/products", productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Тауар қосу мүмкін болмады",
      );
    }
  },
);

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      // Скриншоттағыдай: /products?categoryId=1
      const response = await API.get(`/products?categoryId=${categoryId}`);
      return response.data.data; // API құрылымына байланысты (әдетте response.data.data)
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/products/${id}`, productData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/products/${id}`);
      return id; // Өшкен тауардың ID-ін қайтарамыз
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        // Егер тізімді бірден жаңартқың келсе:
        state.items.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ///////////////////////////////////
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    ///////////////////////////////////
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.items = state.items.filter(
        (product) => (product._id || product.id) !== action.payload,
      );
    });
    //////////////////////////////////
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const index = state.items.findIndex(
        (p) => (p.id || p._id) === action.payload.id,
      );
      if (index !== -1) {
        state.items[index] = action.payload; // Тізімдегі тауарды жаңарту
      }
    });
  },
});

export default productSlice.reducer;
