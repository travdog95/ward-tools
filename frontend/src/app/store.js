import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import fileReducer from "../features/fileManagement/fileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    fileManagement: fileReducer,
  },
});
