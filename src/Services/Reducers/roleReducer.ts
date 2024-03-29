import { createSlice } from "@reduxjs/toolkit";
import { CreateRoleAction, roleDetailsAction, viewRoleDetails } from "../Actions/userAction";
//import { getTransactionDetails} from "../Actions/kriAction";

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
export const roleSlice = createSlice({
    name: "authentication",
    initialState: {
        roleData:{},
        newRoleData:{},
        roleOptions:{},
        loading: false,
    },
    reducers: {
      handleRole: (state, payload) => {},
    },
    extraReducers(builder) {
      builder.addCase(viewRoleDetails.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(viewRoleDetails.fulfilled, (state, { payload }) => {
      
        state.roleData = payload.requestData;
        state.loading = false;
      });
      builder.addCase(CreateRoleAction.fulfilled, (state, { payload }) => {
      
        state.newRoleData = payload.requestData;
        state.loading = false;
      });
      builder.addCase(viewRoleDetails.rejected, (state) => {
        state.loading = false;
      });
      builder.addCase(roleDetailsAction.fulfilled, (state, { payload }) => {
      
        state.roleOptions = payload?.requestData?.data;
        state.loading = false;
      });
    },
  });