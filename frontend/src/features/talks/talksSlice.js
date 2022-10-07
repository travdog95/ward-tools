import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import talksService from "./talksService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  talk: {},
  talks: [],
};

export const getTalk = createAsyncThunk("talks/get", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await talksService.getTalk(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getTalksByMember = createAsyncThunk("members/talks", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await talksService.getTalksByMember(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateTalk = createAsyncThunk("talks/update", async (talk, thunkAPI) => {
  const id = talk.id;
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await talksService.updateTalk(id, talk, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const talksSlice = createSlice({
  name: "talks",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  //Asynchronous functions using thunk
  extraReducers: (builder) => {
    builder
      //handle pending, fulfilled and rejected states for registration
      .addCase(getTalk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTalk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.talk = action.payload;
      })
      .addCase(getTalk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTalksByMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTalksByMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.talks = action.payload;
      })
      .addCase(getTalksByMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateTalk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTalk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.talk = action.payload;
      })
      .addCase(updateTalk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = talksSlice.actions;

export default talksSlice.reducer;
