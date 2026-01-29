import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios"; // axios файлының жолын тексеріп ал

// 1. Асинхронды GET сұранысы
export const fetchCourierOrders = createAsyncThunk(
  "courier/fetchOrders",
  async ({ page = 1, limit = 20 }, { rejectWithValue }) => {
    try {
      // Сұраныс: /courier/orders?page=1&limit=20
      const response = await API.get("/courier/orders", {
        params: { page, limit },
      });
      return response.data; // Скриншоттағы "success", "count", "data" бар объект
    } catch (error) {
      return rejectWithValue(error.response?.data || "Серверде қате туындады");
    }
  },
);

const courierSlice = createSlice({
  name: "courier",
  initialState: {
    orders: [], // Тапсырыстар тізімі (data массиві)
    stats: null, // Жалпы статистика (pending, processing және т.б.)
    pagination: null, // Беттеу мәліметтері
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Мұнда қажет болса қосымша синхронды редьюсерлер қосуға болады
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourierOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCourierOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        // API-ден келетін құрылымды сақтау:
        state.orders = action.payload.data;
        state.stats = action.payload.stats;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCourierOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default courierSlice.reducer;
