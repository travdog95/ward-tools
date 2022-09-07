import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import filesService from "./filesService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const uploadFile = createAsyncThunk(
  "files/uploadFile",
  async (formData, config, thunkAPI) => {
    try {
      return await filesService.upload(formData, config);
    } catch (err) {
      const message = "";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  //Asynchronous functions using thunk
  extraReducers: (builder) => {
    builder
      //handle pending, fulfilled and rejected states for registration
      .addCase(uploadFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export default filesSlice.reducer;
