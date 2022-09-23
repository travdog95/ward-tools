import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fileManagementService from "./fileService";

const initialState = {
  file: null,
  previewFile: {
    fileName: "",
    data: [],
  },
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

export const getFiles = createAsyncThunk("files/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await fileManagementService.getFiles(token);
  } catch (err) {
    const message = "";
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteFile = createAsyncThunk("files/delete", async (file, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await fileManagementService.deleteFile(file, token);
  } catch (err) {
    const message = "";
    return thunkAPI.rejectWithValue(message);
  }
});

export const previewFile = createAsyncThunk("files/preview", async (filename, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await fileManagementService.preview(filename, token);
  } catch (err) {
    const message = err.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const importDataFile = createAsyncThunk("files/import", async (file, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await fileManagementService.importData(file, token);
  } catch (err) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const fileManagementSlice = createSlice({
  name: "fileManagement",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.isFileUploaded = false;
      state.isFileDeleted = false;
      state.message = "";
      state.files = [];
      // state.previewFile = {};
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
        state.file = action.payload.filename;
        state.files.push(action.payload.filename);
        state.message = "File uploaded successfully!";
        state.previewFile = { fileName: "", data: [] };
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
        // state.isSuccess = true;
        state.files = action.payload;
      })
      .addCase(getFiles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.files = state.files.filter((file) => file !== action.payload.file);
        state.message = "File deleted successfully";
        state.file = null;
        state.previewFile = { fileName: "", data: [] };
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(previewFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(previewFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.previewFile = action.payload;
        // state.message = "File loaded successfully!";
      })
      .addCase(previewFile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.file = null;
      })
      .addCase(importDataFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(importDataFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.importDataFile = action.payload;
        // state.message = "File loaded successfully!";
      })
      .addCase(importDataFile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.file = null;
      });
  },
});

export const { reset } = fileManagementSlice.actions;

export default fileManagementSlice.reducer;
