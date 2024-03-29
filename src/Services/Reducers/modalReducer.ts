import { createSlice } from "@reduxjs/toolkit";

/**
  * <summary>
  * 
  * </summary>
  * <param name="request">
  * </param> 
  * <returns>
  * 
  * </returns> 
  */
export const modalSlice = createSlice({
  name: "modals",
  initialState: {
    notificationData: {
      show: false,
      title: "",
      info: "",
    },
  },
  reducers: {
    openNotificationModal: (state, { payload }) => {
      state.notificationData.show = true;
      if (payload.title) {
        state.notificationData.title = payload.title;
      }
      if (payload.info) {
        state.notificationData.info = payload.info;
      }
    },
    closeNotificationModal: (state) => {
      state.notificationData.show = false;
      state.notificationData.title = "";
      state.notificationData.info = "";
    },
  },
});

export const { openNotificationModal, closeNotificationModal } =
  modalSlice.actions;
