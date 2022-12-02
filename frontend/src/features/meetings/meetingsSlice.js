import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import meetingsService from "./meetingsService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  updatingMeeting: false,
  addingTalk: false,
  deletingTalk: false,
  updatingTalk: false,
  addingMeetings: false,
  addingPrayer: false,
  updatingPrayer: false,
  message: "",
  meetings: {
    byId: {},
    allIds: [],
    filteredIds: [],
    idsByYear: {},
  },
  filters: {
    year: new Date().getFullYear(),
    month: 0,
    search: "",
  },
  currentMeetingId: 0,
  currentTalkId: 0,
  currentPrayerId: 0,
};

const formatByIds = (items) => {
  const itemsObject = {};

  items.forEach((item) => {
    itemsObject[item._id] = item;
  });

  return itemsObject;
};

export const getMeeting = createAsyncThunk("meetings/get", async (meetingId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await meetingsService.getMeeting(meetingId, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getMeetings = createAsyncThunk("meetings/getAll", async (params, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await meetingsService.getMeetings(params, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getMeetingsByYear = createAsyncThunk("meetings/byYear", async (params, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await meetingsService.getMeetings(params, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateMeeting = createAsyncThunk("meetings/update", async (meeting, thunkAPI) => {
  const id = meeting.id;
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await meetingsService.updateMeeting(id, meeting, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const addTalk = createAsyncThunk("meetings/addTalk", async (talk, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await meetingsService.addTalk(talk, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteTalk = createAsyncThunk("meetings/deleteTalk", async (talk, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await meetingsService.deleteTalk(talk, token);
  } catch (err) {
    const message = "";
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateTalk = createAsyncThunk("meetings/updateTalk", async (talk, thunkAPI) => {
  const id = talk.id;
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await meetingsService.updateTalk(id, talk, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const addMeetingsByYear = createAsyncThunk(
  "meetings/addMeetingsByYear",
  async (year, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await meetingsService.addMeetingsByYear(year, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addPrayer = createAsyncThunk("meetings/addPrayer", async (prayer, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await meetingsService.addPrayer(prayer, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updatePrayer = createAsyncThunk("meetings/updatePrayer", async (prayer, thunkAPI) => {
  const id = prayer.id;
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await meetingsService.updatePrayer(id, prayer, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const meetingsSlice = createSlice({
  name: "meetings",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  //Asynchronous functions using thunk
  extraReducers: (builder) => {
    builder
      //handle pending, fulfilled and rejected states for registration
      .addCase(getMeeting.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMeeting.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.talk = action.payload;
      })
      .addCase(getMeeting.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMeetingsByYear.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMeetingsByYear.fulfilled, (state, action) => {
        const year = parseInt(action.meta.arg.year);
        const meetings = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.meetings.idsByYear[year] = meetings.map((meeting) => {
          return meeting._id;
        });
        state.meetings.byId = { ...state.meetings.byId, ...formatByIds(meetings) };
        state.filters.year = year;
      })
      .addCase(getMeetingsByYear.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMeetings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMeetings.fulfilled, (state, action) => {
        const meetings = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.meetings.allIds = meetings.map((meeting) => {
          return meeting._id;
        });
        state.meetings.byId = { ...state.meetings.byId, ...formatByIds(meetings) };
      })
      .addCase(getMeetings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addMeetingsByYear.pending, (state, action) => {
        // state.currentMeetingId = action.meta.arg.id;
        state.addingMeetings = true;
      })
      .addCase(addMeetingsByYear.fulfilled, (state, action) => {
        state.addingMeetings = false;
        state.isSuccess = true;
        // state.meetings = action.payload;
      })
      .addCase(addMeetingsByYear.rejected, (state, action) => {
        state.addingMeetings = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateMeeting.pending, (state, action) => {
        state.currentMeetingId = action.meta.arg.id;
        state.updatingMeeting = true;
      })
      .addCase(updateMeeting.fulfilled, (state, action) => {
        state.updatingMeeting = false;
        state.isSuccess = true;
        state.sacramentMeeting = action.payload;
        state.currentMeetingId = 0;
      })
      .addCase(updateMeeting.rejected, (state, action) => {
        state.updatingMeeting = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addTalk.pending, (state, action) => {
        state.currentMeetingId = action.meta.arg.sacramentMeeting;
        state.addingTalk = true;
      })
      .addCase(addTalk.fulfilled, (state, action) => {
        const meetingId = action.payload.sacramentMeeting;
        state.addingTalk = false;
        state.isSuccess = true;
        state.currentMeetingId = 0;
        state.meetings.byId[meetingId].talks.push(action.payload);
      })
      .addCase(addTalk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateTalk.pending, (state, action) => {
        state.currentTalkId = action.meta.arg.id;
        state.updatingTalk = true;
      })
      .addCase(updateTalk.fulfilled, (state, action) => {
        state.updatingTalk = false;
        state.isSuccess = true;
        state.currentTalkId = 0;
      })
      .addCase(updateTalk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTalk.pending, (state, action) => {
        state.currentTalkId = action.meta.arg._id;
        state.deletingTalk = true;
      })
      .addCase(deleteTalk.fulfilled, (state, action) => {
        const talkId = action.payload._id;
        const meetingId = action.payload.sacramentMeeting;
        state.deletingTalk = false;
        state.isSuccess = true;
        state.currentTalkId = 0;
        state.meetings.byId[meetingId].talks = state.meetings.byId[meetingId].talks.filter(
          (talk) => talk._id !== talkId
        );
      })
      .addCase(deleteTalk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addPrayer.pending, (state, action) => {
        // state.currentPrayerId = action.meta.arg.sacramentMeeting;
        state.addingPrayer = true;
      })
      .addCase(addPrayer.fulfilled, (state, action) => {
        const meetingId = action.payload.sacramentMeeting;
        state.addingPrayer = false;
        state.isSuccess = true;
        state.currentPrayerId = 0;
        state.meetings.byId[meetingId].prayers.push(action.payload);
      })
      .addCase(addPrayer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePrayer.pending, (state, action) => {
        state.currentPrayerId = action.meta.arg.id;
        state.updatingPrayer = true;
      })
      .addCase(updatePrayer.fulfilled, (state, action) => {
        state.updatingPrayer = false;
        state.isSuccess = true;
        state.currentPrayerId = 0;
      })
      .addCase(updatePrayer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = meetingsSlice.actions;

export default meetingsSlice.reducer;
