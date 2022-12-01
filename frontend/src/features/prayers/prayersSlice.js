import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import prayersService from "./prayersService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  prayer: {},
  prayers: [],
};

export const getPrayer = createAsyncThunk("prayers/get", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await prayersService.getPrayer(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getPrayersByMember = createAsyncThunk("members/prayers", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await prayersService.getPrayersByMember(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const addPrayer = createAsyncThunk("prayers/add", async (talk, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await prayersService.addPrayer(talk, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updatePrayer = createAsyncThunk("prayers/update", async (talk, thunkAPI) => {
  const id = talk.id;
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await prayersService.updatePrayer(id, talk, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const prayersSlice = createSlice({
  name: "prayers",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  //Asynchronous functions using thunk
  extraReducers: (builder) => {
    builder
      //handle pending, fulfilled and rejected states for registration
      .addCase(getPrayer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPrayer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.prayer = action.payload;
        state.prayers.push(action.payload);
      })
      .addCase(getPrayer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addPrayer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPrayer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.talk = action.payload;
      })
      .addCase(addPrayer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPrayersByMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPrayersByMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.prayers = action.payload;
      })
      .addCase(getPrayersByMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePrayer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePrayer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.talk = action.payload;
      })
      .addCase(updatePrayer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = prayersSlice.actions;

export default prayersSlice.reducer;
