import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sacramentMeetingsService from "../sacramentMeetingsService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  sacramentMeeting: {},
};

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

export const sacramentMeetingSlice = createSlice({
  name: "sacramentMeeting",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  //Asynchronous functions using thunk
  extraReducers: (builder) => {
    builder
      //handle pending, fulfilled and rejected states for registration
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
      });
  },
});

export const { reset } = sacramentMeetingSlice.actions;

export default sacramentMeetingSlice.reducer;
