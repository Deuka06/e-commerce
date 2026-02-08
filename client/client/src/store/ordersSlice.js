import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios"; // API инстансын импорттау

export const fetchMyOrders = createAsyncThunk(
  "orders/fetchMyOrders",
  async (userId, { rejectWithValue }) => {
    try {
      // Сенің API: GET /orders/my?userId=2
      const response = await API.get(`orders/my`, {
        params: { userId },
      });
      console.log("Fetched Orders:", response); // API-дан келген деректерді тексеру
      return response.data; // API-дан келетін тапсырыстар массиві
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Тапсырыстарды жүктеу мүмкін болмады",
      );
    }
  },
);

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
    list: [],
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
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload; // Деректерді list-ке сақтаймыз
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //////////////////////////////////
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
