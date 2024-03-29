import { applyMiddleware, Middleware, Dispatch, AnyAction } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import rootReducer from "../Reducers/index";
import { composeWithDevTools } from "@redux-devtools/extension";

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
const logger = createLogger();
const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] = [];

const initialState = {};

const devTools =
  process.env.NODE_ENV === "production"
    ? applyMiddleware(...middlewares)
    : composeWithDevTools(applyMiddleware(...middlewares));

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});
export type AppDispatch = typeof store.dispatch;
export default store;
