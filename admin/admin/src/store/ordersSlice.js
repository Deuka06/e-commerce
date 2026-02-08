import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios"; // Өзің жасаған axios инстансын импорттаймыз

// 1. Клиенттің тапсырыстар тарихын алу
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      // "api" инстансын қолданамыз, baseURL мен token автоматты түрде қосылады
      const response = await api.get("/orders/my");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Тапсырыстарды жүктеу мүмкін болмады",
      );
    }
  },
);

// 2. Жаңа тапсырыс жасау
export const createNewOrder = createAsyncThunk(
  "orders/createNewOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await api.post("/orders/create", orderData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Тапсырыс жіберілмеді",
      );
    }
  },
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ orderId, newStatus }, thunkAPI) => {
    try {
      const response = await api.patch(`/orders/${orderId}/status`, {
        status: newStatus,
      });
      return response.data; // Серверден жаңартылған тапсырыс қайтады
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUserOrders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // createNewOrder
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      // updateOrderStatus
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload.data || action.payload;
        // Тізімдегі ескі тапсырысты жаңасымен ауыстырамыз
        state.list = state.list.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order,
        );
      });
  },
});

export const { clearOrderError } = ordersSlice.actions;
export default ordersSlice.reducer;
