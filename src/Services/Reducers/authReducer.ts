import { createSlice } from "@reduxjs/toolkit";
import { logoutAction, userLogin } from "../Actions/authAction";

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
export const authSlice = createSlice({
  name: "authentication",
  initialState: {
    isAuthenticated: false,
    userData: {},
    token: "",
    refresh: "",
    loading: false,
  },
  reducers: {
    handleAuth: (state, payload) => {},
  },
  extraReducers(builder) {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.isAuthenticated = true;
      state.userData = payload.userData;
      state.loading = false;
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.loading = false;
    });

  },
});

export default authSlice.actions;
