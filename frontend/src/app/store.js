import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import authReducer from "../features/auth/authSlice";
import fileReducer from "../features/fileManagement/fileSlice";
import dataReducer from "../features/dataManagement/dataSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    fileManagement: fileReducer,
    data: dataReducer,
  },
});
