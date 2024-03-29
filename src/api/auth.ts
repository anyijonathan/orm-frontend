import { apiClient, config } from ".";

/**
  * <summary>
  * Authenticate the user login taking email and password as authorization input
  * </summary>
  * <param name="email , password">
  * </param> 
  * <returns>
  * a user session starts after sucessful login
  * </returns> 
  */
export const login = async (email: string, password: string) => {
  try{
  const response = await apiClient.post("/auth/login", {
    email: email,
    password: password,
  },config);
  return response.data;
}catch(ex:any){
  return ex?.response?.data
}
};

//logout
export const logoutApi = async (email: string) => {
  try{
    const response = await apiClient.get("/auth/logout" , { params:{
      email: email
    }});
  return response.data.code;
}catch(ex){
  return "400"
}
};



//update the login attempt failure count after failed login
 export const userEmailValidate = async (userName: string) => {
  try{
  const response = await apiClient.get("/auth/userexists" , { params:{
    userName: userName
  }});
  return response.data;
}catch(ex:any){
  return ex?.response?.data
}
};
