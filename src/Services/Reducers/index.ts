import { combineReducers } from "redux";
import { dashboardSlice } from "./dashboardReducer";
import { authSlice } from "./authReducer";
import { modalSlice } from "./modalReducer";
import { tranferSlice } from "./transferReducer";
import { roleSlice } from "./roleReducer";
import { kriSlice } from "./kriReducer";
import { userSlice } from "./userReducer";
import { kriDataSlice } from "./kriDataSlice";
import {locationSlice} from "./locationSlice";

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
const rootReducer = combineReducers({
  dashboardState: dashboardSlice.reducer,
  authState: authSlice.reducer,
  roleState:roleSlice.reducer,
  modalState: modalSlice.reducer,
  transferState:tranferSlice.reducer,
  kriState:kriSlice.reducer,
  userState:userSlice.reducer,
  kriDDDataState:kriDataSlice.reducer,
  locationDataState:locationSlice.reducer,
});

export default rootReducer;

export type IRootState = ReturnType<typeof rootReducer>;
