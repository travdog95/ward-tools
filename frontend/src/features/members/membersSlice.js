import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import membersService from "./membersService";
import { formatByIds } from "../../utils/helpers";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdating: false,
  message: "",
  members: [],
  byId: {},
  allIds: [],
  speakerFilters: {
    speakerType: "all",
    willing: "all",
  },
};

export const getMembers = createAsyncThunk("members/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await membersService.getMembers(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateMember = createAsyncThunk("members/update", async (member, thunkAPI) => {
  const id = member.id;
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await membersService.updateMember(id, member, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    reset: (state) => initialState,
    setSpeakerFilters(state, action) {
      return { ...state, speakerFilters: action.payload };
    },
  },
  //Asynchronous functions using thunk
  extraReducers: (builder) => {
    builder
      //handle pending, fulfilled and rejected states for registration
      .addCase(getMembers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMembers.fulfilled, (state, action) => {
        const members = action.payload.data;
        state.allIds = members.map((member) => {
          return member._id;
        });
        state.byId = { ...state.members.byId, ...formatByIds(members) };
        state.isLoading = false;
        state.isSuccess = true;
        state.members = members;
      })
      .addCase(getMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateMember.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.isSuccess = true;
        state.byId[action.payload._id] = action.payload;
      })
      .addCase(updateMember.rejected, (state, action) => {
        state.isUpdating = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setSpeakerFilters } = membersSlice.actions;

export default membersSlice.reducer;
