import { createSlice } from "@reduxjs/toolkit";
import { getNewKriReportAction, kriDetailsAction, kriGridDetailsAction, updateStateAction } from "../Actions/kriAction";

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
export const kriSlice = createSlice({
    name: "authentication",
    initialState: {
        newKriData:{},
        selectedKris:{},
        KriGridData:{},
        KriGridReportData:{},
        loading: false,
    },
    reducers: {
      handleRole: (state, payload) => {},
    },
    extraReducers(builder) {
      builder.addCase(getNewKriReportAction.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getNewKriReportAction.fulfilled, (state, { payload }) => {
      
        state.newKriData = payload.requestData;
        state.loading = false;
      });
      builder.addCase(getNewKriReportAction.rejected, (state) => {
        state.loading = false;
      });
      builder.addCase(updateStateAction.fulfilled, (state,{ payload }) => {
      
        state.selectedKris = payload.requestData;
        state.loading = false;
      });

      builder.addCase(kriDetailsAction.fulfilled, (state,{ payload }) => {
      
        state.KriGridData = payload.requestData?.data?.data;
        state.loading = false;
      });

      builder.addCase(kriGridDetailsAction.fulfilled, (state,{ payload }) => {
      
        state.KriGridReportData = payload.requestData?.data?.data;
        state.loading = false;
      });

    },
  });