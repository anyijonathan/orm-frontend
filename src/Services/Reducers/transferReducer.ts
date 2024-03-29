import { createSlice } from "@reduxjs/toolkit";
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
export const tranferSlice = createSlice({
    name: "authentication",
    initialState: {
        transactionData:{},
        loading: false,
    },
    reducers: {
      handleTransfer: (state, payload) => {},
    },
    extraReducers(builder) {
      // builder.addCase(getTransactionDetails.pending, (state) => {
      //   state.loading = true;
      // });
      // builder.addCase(getTransactionDetails.fulfilled, (state, { payload }) => {
      
      //   state.transactionData = payload.requestData;
      //   state.loading = false;
      // });
      // builder.addCase(getTransactionDetails.rejected, (state) => {
      //   state.loading = false;
      // });
    },
  });