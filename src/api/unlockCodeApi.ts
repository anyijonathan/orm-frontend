import { apiClient, config } from ".";

/**
  * <summary>
  *  get the otp from the backend and validates the otp after taking code from user
  * </summary>
  * <param name="email, otp">
  * </param> 
  * <returns>
  * returns OTP and validates the OTP
  * </returns> 
  */
export const unlockCode = async (email: string) => {
    try{
    const response = await apiClient.post("/auth/generateotp", {
      email: email,
    },config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const inputCode = async (email: string,otp: string) => {
    try{
    const response = await apiClient.post("/auth/submitotp", {
        email: email,
        otp: otp,
    },config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };