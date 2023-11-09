import { configureStore } from "@reduxjs/toolkit";
import { login, logout } from "./authSlice";

import AuthReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});
