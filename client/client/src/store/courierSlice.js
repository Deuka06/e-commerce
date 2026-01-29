import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const createCourierOrder = createAsyncThunk(
  "courier/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      // Swagger-де көрсетілгендей /courier/orders жолына сұраныс жіберу
      const response = await API.post("/courier/orders", orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Тапсырыс жіберу мүмкін болмады",
      );
    }
  },
);

const courierSlice = createSlice({
  name: "courier",
  initialState: { loading: false, success: false, error: null },
  reducers: {
    resetStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCourierOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCourierOrder.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createCourierOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = courierSlice.actions;
export default courierSlice.reducer;
