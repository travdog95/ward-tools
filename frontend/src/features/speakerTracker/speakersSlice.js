import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import speakersService from "./speakersService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  speakers: [],
};

export const getSpeaker = createAsyncThunk("speakers/get", async (speakerId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await speakersService.getSpeaker(speakerId, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getSpeakers = createAsyncThunk("speakers/getAll", async (params, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await speakersService.getSpeakers(params, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const speakersSlice = createSlice({
  name: "speakers",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  //Asynchronous functions using thunk
  extraReducers: (builder) => {
    builder
      //handle pending, fulfilled and rejected states for registration
      .addCase(getSpeaker.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSpeaker.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.talk = action.payload;
      })
      .addCase(getSpeaker.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSpeakers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSpeakers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.speakers = action.payload;
      })
      .addCase(getSpeakers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = speakersSlice.actions;

export default speakersSlice.reducer;
