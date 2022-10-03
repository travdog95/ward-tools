import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import fileReducer from "../features/fileManagement/fileSlice";
import memberReducer from "../features/members/memberSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    fileManagement: fileReducer,
    member: memberReducer,
  },
});
