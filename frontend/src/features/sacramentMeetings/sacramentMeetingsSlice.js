import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sacramentMeetingsService from "./sacramentMeetingsService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  sacramentMeetings: [],
};

export const getSacramentMeeting = createAsyncThunk(
  "sacramentmeetings/get",
  async (year, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await sacramentMeetingsService.getSacramentMeeting(year, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSacramentMeetings = createAsyncThunk(
  "sacramentMeetings/byYear",
  async (year, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await sacramentMeetingsService.getSacramentMeetings(year, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const sacramentMeetingsSlice = createSlice({
  name: "sacramentMeetings",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  //Asynchronous functions using thunk
  extraReducers: (builder) => {
    builder
      //handle pending, fulfilled and rejected states for registration
      .addCase(getSacramentMeeting.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSacramentMeeting.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.talk = action.payload;
      })
      .addCase(getSacramentMeeting.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSacramentMeetings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSacramentMeetings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sacramentMeetings = action.payload;
      })
      .addCase(getSacramentMeetings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = sacramentMeetingsSlice.actions;

export default sacramentMeetingsSlice.reducer;
