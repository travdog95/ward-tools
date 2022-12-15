import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import memberService from "./memberService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  // updatingMember: false,
  message: "",
  member: {},
};

export const getMember = createAsyncThunk("members/get", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await memberService.getMember(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// export const updateMember = createAsyncThunk("members/update", async (member, thunkAPI) => {
//   const id = member.id;
//   try {
//     const token = thunkAPI.getState().auth.user.token;
//     return await memberService.updateMember(id, member, token);
//   } catch (error) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString();
//     return thunkAPI.rejectWithValue(message);
//   }
// });

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  //Asynchronous functions using thunk
  extraReducers: (builder) => {
    builder
      //handle pending, fulfilled and rejected states for registration
      .addCase(getMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.member = action.payload;
      })
      .addCase(getMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
    // .addCase(updateMember.pending, (state) => {
    //   state.updatingMember = true;
    // })
    // .addCase(updateMember.fulfilled, (state, action) => {
    //   state.updatingMember = false;
    //   state.isSuccess = true;
    //   state.member = action.payload;
    // })
    // .addCase(updateMember.rejected, (state, action) => {
    //   state.updatingMember = false;
    //   state.isError = true;
    //   state.message = action.payload;
    // });
  },
});

export const { reset } = memberSlice.actions;

export default memberSlice.reducer;
