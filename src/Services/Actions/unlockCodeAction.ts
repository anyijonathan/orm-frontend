import { createAsyncThunk } from "@reduxjs/toolkit";
import { ObjectLiteral } from "../Utils/types";
import { unlockCode, inputCode } from "../../api/unlockCodeApi";

/**
  * <summary>
  * request the generation of otp and unlock code
  * </summary>
  * <param name="userData,email,code">
  * </param> 
  * <returns>
  * returns the user data and validation of code provided
  * </returns> 
  */
export const unlockCodeAction = createAsyncThunk<
  { userData: ObjectLiteral },
  { email: string }
>("auth/generateotp", async ({ email}) => {
  const data = await unlockCode(email);
  return { userData: {data} };
});

export const inputUnlockCode =  createAsyncThunk<
{ userData: ObjectLiteral },
{ email: string, code: string }
>("auth/submitotp", async ({ email, code}) => {
// const data = await inputCode(email,code);
// return { userData: {data} };
return { userData: {} };
});