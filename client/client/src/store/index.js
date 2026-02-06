import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import categoryReducer from "./categorySlice";
import productReducer from "./productSlice";
import courierReducer from "./courierSlice";
import institutionsReducer from "./institutionsSlice";
import ordersReducer from "./ordersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    products: productReducer,
    courier: courierReducer,
    institutions: institutionsReducer,
    orders: ordersReducer,
  },
});
