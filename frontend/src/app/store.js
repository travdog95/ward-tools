import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import fileReducer from "../features/fileManagement/fileSlice";
import membersReducer from "../features/members/membersSlice";
import meetingsReducer from "../features/meetings/meetingsSlice";
import talksReducer from "../features/talks/talksSlice";
import prayersReducer from "../features/prayers/prayersSlice";
import importDataReducer from "../features/importData/importDataSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    fileManagement: fileReducer,
    members: membersReducer,
    meetings: meetingsReducer,
    talks: talksReducer,
    prayers: prayersReducer,
    importData: importDataReducer,
  },
});
