import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import fileManagementReducer from "../features/fileManagement/fileManagementSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    fileManagement: fileManagementReducer,
  },
});
