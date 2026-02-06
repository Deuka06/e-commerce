import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios"; // API инстансын импорттау

// Серверге тапсырыс жіберуге арналған AsyncThunk
export const createOrder = createAsyncThunk(
  "/orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      // Сенің суретіңдегі API адресі (image_2d1abe.png)
      const response = await API.post("orders/create", orderData);
      return response.data;
    } catch (error) {
      // Қате орын алса, серверден келген хабарламаны қайтару
      return rejectWithValue(
        error.response?.data?.message || "Тапсырыс жасау кезінде қате кетті",
      );
    }
  },
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    success: false,
    error: null,
    currentOrder: null,
  },
  reducers: {
    resetOrderState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrderState } = ordersSlice.actions;
export default ordersSlice.reducer;
