import { createSlice } from "@reduxjs/toolkit";

const confirmationDialogInitialState = {
  title: "Title",
  message: "Enter message",
  open: false,
  onSubmit: undefined,
};
const initialState = {
  confirmationDialog: confirmationDialogInitialState,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    reset: () => initialState,
    closeDialog: (state) => {
      state.confirmationDialog.open = false;
    },
    openDialog: (state, action) => {
      console.log(action.payload);
      state.confirmationDialog = {
        ...state.confirmationDialog,
        ...{
          open: true,
          title: action.payload.title,
          message: action.payload.message,
        },
      };
    },
    confirmDialog: (state) => {
      console.log("confirmDialog");
    },
  },
});

export const { reset, closeDialog, openDialog, confirmDialog } = appSlice.actions;

export default appSlice.reducer;
