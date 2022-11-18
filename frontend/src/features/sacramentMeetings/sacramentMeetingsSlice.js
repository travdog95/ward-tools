import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sacramentMeetingsService from "./sacramentMeetingsService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  byYear: {},
  currentTabYear: 0,
  currentMeetingId: 0,
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

export const getSacramentMeetingsByYear = createAsyncThunk(
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

export const updateSacramentMeeting = createAsyncThunk(
  "sacramentMeetings/update",
  async (meeting, thunkAPI) => {
    const id = meeting.id;
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await sacramentMeetingsService.updateSacramentMeeting(id, meeting, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addTalk = createAsyncThunk("sacramentMeetings/addTalk", async (talk, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await sacramentMeetingsService.addTalk(talk, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

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
      .addCase(getSacramentMeetingsByYear.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSacramentMeetingsByYear.fulfilled, (state, action) => {
        const tabYear = parseInt(action.meta.arg);
        state.isLoading = false;
        state.isSuccess = true;
        state.byYear[tabYear] = action.payload[tabYear];
        state.currentTabYear = tabYear;
      })
      .addCase(getSacramentMeetingsByYear.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateSacramentMeeting.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSacramentMeeting.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sacramentMeeting = action.payload;
      })
      .addCase(updateSacramentMeeting.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addTalk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTalk.fulfilled, (state, action) => {
        const meetingId = action.payload.sacramentMeeting;
        const sacramentMeetingIndex = state.byYear[state.currentTabYear].findIndex(
          (m) => m._id === meetingId
        );
        state.isLoading = false;
        state.isSuccess = true;
        state.byYear[state.currentTabYear][sacramentMeetingIndex].talks.push(action.payload);
      })
      .addCase(addTalk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = sacramentMeetingsSlice.actions;

export default sacramentMeetingsSlice.reducer;
