import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, logoutApi,  userEmailValidate } from "../../api/auth";
import { ObjectLiteral } from "../Utils/types";
/**
  * <summary>
  * This service is to execute auth
  * actions e.g. logout and user check in AD
  * </summary>
  * <param name="open, setopen, indata">
  * </param> 
  * <returns>
  * formatted data is returned for the auth actions
  * </returns> 
  */
export const userLogin = createAsyncThunk<
  { userData: ObjectLiteral },
  { email: string; password: string }
>("auth/login", async ({ email, password }) => {
 const data = await login(email, password);
 localStorage.setItem("token", data.data.token);
 return { userData: {data} };
});


  export const logoutAction = createAsyncThunk<
  { userData: ObjectLiteral },
  { email: any }
>("auth/logout", async ({ email }) => {
  const data = await logoutApi(email);
  return { userData: {data} };
});




 export const validateUserEmail = createAsyncThunk<
{ userData: ObjectLiteral },
{ email: string }
>("auth/userexists", async ({ email }) => {
const data = await userEmailValidate(email);
return { userData: {data} };
});

