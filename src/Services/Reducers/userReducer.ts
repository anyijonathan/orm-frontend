import { createSlice } from "@reduxjs/toolkit";
import { userDetailsAction } from "../Actions/userAction";
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
export const userSlice = createSlice({
    name: "authentication",
    initialState: {
        userData:{},
        loading: false,
    },
    reducers: {
      handleUser: (state, payload) => {},
    },
    extraReducers(builder) {
      builder.addCase(userDetailsAction.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(userDetailsAction.fulfilled, (state, { payload }) => {      
        state.userData = payload.userData;
        state.loading = false;
      });      
      builder.addCase(userDetailsAction.rejected, (state) => {
        state.loading = false;
      });
    },
  });