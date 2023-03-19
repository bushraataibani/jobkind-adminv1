import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allAlerts: [
    // {
    //   show: true,
    //   heading: "Success",
    //   message: "Patient Flag updated successfully",
    //   type: "danger",
    //   id: 13,
    // },
    // {
    //   show: true,
    //   heading: "Success",
    //   message: "Patient Flag updated successfully",
    //   type: "danger",
    //   id: 3,
    // },
  ],
  confirmationConfig: {
    show: false,
    type: "error",

    actionConfirm: undefined,
    cancelLabel: "Cancel",
    confirmLabel: "OK",
    message: "",
    title: "",
    actionAfterSuccess: undefined,
  },
  isUserPinSet: true,
  key: "",
};

export const generalSlice = createSlice({
  name: "general",
  initialState: initialState,
  reducers: {
    setallAlerts: (state, action) => {
      state.allAlerts = action.payload;
    },
    pushNewAlert: (state, action) => {
      state.allAlerts = [
        ...state.allAlerts,
        { ...action.payload, id: new Date().getTime() },
      ];
    },
    deleteAlert: (state, { payload }) => {
      const newAlerts = state.allAlerts.filter((a) => {
        return a.id !== payload;
      });
      state.allAlerts = newAlerts;
    },
    setConfirmationConfig: (state, { payload }) => {
      if (payload) state.confirmationConfig = payload;
      else
        state.confirmationConfig = {
          ...state.confirmationConfig,
          show: false,
          actionConfirm: undefined,
          actionAfterSuccess: undefined,
        };
    },
    isUserPinSet: (state, { payload }) => {
      state.isUserPinSet = payload;
    },
    setSettingTabKey: (state, { payload }) => {
      state.key = payload;
    },
  },
});
