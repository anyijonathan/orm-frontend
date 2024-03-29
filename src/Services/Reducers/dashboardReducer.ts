import { createSlice } from "@reduxjs/toolkit";
// import { getAllRequests } from "../Actions/dashboardAction";

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
export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    value: 0,
    another: ""
  },
  reducers: {
    incremented: (state, payload) => {
      state.value += 1;
    },
    decremented: (state) => {
      state.value -= 1;
    },
  },
  extraReducers(builder) {
    // builder.addCase(getAllRequests.pending, (state) => {});
    // builder.addCase(getAllRequests.fulfilled, (state, payload) => {});
  },
});

export const { incremented, decremented } = dashboardSlice.actions;
