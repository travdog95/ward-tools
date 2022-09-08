import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fileManagementService from "./fileManagementService";

const initialState = {
  file: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  files: [],
};

export const uploadFile = createAsyncThunk(
  "files/uploadFile",
  async (formData, config, thunkAPI) => {
    try {
      return await fileManagementService.upload(formData, config);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getFiles = createAsyncThunk("files/getAll", async (thunkAPI) => {
  try {
    console.log("slice");
    return await fileManagementService.getFiles();
  } catch (err) {
    const message = "";
    return thunkAPI.rejectWithValue(message);
  }
});

export const fileManagementSlice = createSlice({
  name: "fileManagement",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      // state.file = null;
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
        state.file = action.payload;
        state.message = "File uploaded successfully!";
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.file = null;
      })
      .addCase(getFiles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.files = action.payload;
        state.message = "Files loaded successfully!";
      })
      .addCase(getFiles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.files = [];
      });
  },
});

export const { reset } = fileManagementSlice.actions;

export default fileManagementSlice.reducer;
