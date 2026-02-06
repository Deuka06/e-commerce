import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios"; // axios.js файлына баратын жолды тексер

// API инстансын қолдана отырып мекемелерді алу
export const fetchInstitutions = createAsyncThunk(
  "institutions/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      // API.get қолданамыз, себебі baseUrl және headers (token)
      // сенің axios.js файлында алдын ала реттелген болуы керек
      const response = await API.get("/courier/institutions");
      console.log("Institutions API response:", response.data); // Жауапты тексеру үшін лог
      return response.data.data;
    } catch (error) {
      // Қате болса, сервердің жауабын қайтару
      return rejectWithValue(error.response?.data || "Серверде қате шықты");
    }
  },
);

const institutionsSlice = createSlice({
  name: "institutions",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstitutions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstitutions.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchInstitutions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default institutionsSlice.reducer;
