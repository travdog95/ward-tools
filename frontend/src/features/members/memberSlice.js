import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import memberService from "./memberService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  members: [],
  member: {},
};

export const getMembers = createAsyncThunk("members/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await memberService.getMembers(token);
  } catch (err) {
    const message = "";
    return thunkAPI.rejectWithValue(message);
  }
});

export const getMember = createAsyncThunk("members/get", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await memberService.getMember(id, token);
  } catch (err) {
    const message = "";
    return thunkAPI.rejectWithValue(message);
  }
});

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
      state.members = [];
      state.member = {};
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
        state.isLoading = false;
        // state.isSuccess = true;
        state.members = action.payload;
      })
      .addCase(getMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //handle pending, fulfilled and rejected states for registration
      .addCase(getMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMember.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.isSuccess = true;
        state.member = action.payload;
      })
      .addCase(getMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = memberSlice.actions;

export default memberSlice.reducer;
