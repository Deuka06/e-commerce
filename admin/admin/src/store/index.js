import { configureStore } from "@reduxjs/toolkit";
// import adminProductReducer from "./adminProductSlice";
// import categoryReducer from "./categorySlice";
// import authReducer from "./authSlice";
import categoryReducer from "./categorySlice";
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    // auth: authReducer, // Авторизация үшін
    categories: categoryReducer, // Категориялар үшін
    products: productReducer, // Тауарлар үшін
    // adminProducts: adminProductReducer, // Админ панельдің өнімдері үшін
  },
});
