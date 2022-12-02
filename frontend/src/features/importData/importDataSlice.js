import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import importDataService from "./importDataService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  speakerData: { membersNotFound: [], newTalks: [], meetingsCreated: [] },
};

export const importSpeakerData = createAsyncThunk(
  "importData/speakerData",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await importDataService.importSpeakerData(data, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const importDataSlice = createSlice({
  name: "importData",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  //Asynchronous functions using thunk
  extraReducers: (builder) => {
    builder
      .addCase(importSpeakerData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(importSpeakerData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.speakerData = action.payload;
      })
      .addCase(importSpeakerData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = importDataSlice.actions;

export default importDataSlice.reducer;
