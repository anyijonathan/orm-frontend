import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AppDispatch } from ".";
import { IRootState } from "../Reducers";

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
export const useAppDispatch = () => {
  const dispatch = useDispatch<AppDispatch>();

  return dispatch;
};

export const useAppStateSelector: TypedUseSelectorHook<IRootState> =
  useSelector;
