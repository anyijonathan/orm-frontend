
/**
  * <summary>
  * validates the request based on bearer token
  * </summary>
  * <param name="baseUrl,AccessToken,REFRESH_TOKEN ">
  * </param> 
  * <returns>
  * authorizes the request or send appropriate error message
  * </returns> 
  */
export const config = {
  headers:{
    'Content-Type': 'application/json'
  }
};

import axios from "axios";
import toast from "react-hot-toast";

export const apiClient = axios.create({
  // baseURL: "https://localhost:7281/api/",
  baseURL: "https://sbscormapi.fcmb-azr-msase.p.azurewebsites.net/api/",

});

let ACCESS_TOKEN: string;
let REFRESH_TOKEN: string;

interface AxiosConfigProps {
  accessToken?: string  | null;
  refreshToken?: string | null;
}

export function configureAxios({
  accessToken,
  refreshToken,
}: AxiosConfigProps) {
  ACCESS_TOKEN = (accessToken && accessToken!=='')?accessToken: localStorage.getItem("token") ?? "";
  REFRESH_TOKEN = refreshToken ?? "";
  apiClient.interceptors.request.use(
    (req) => {
  ACCESS_TOKEN = (accessToken && accessToken!=='')?accessToken: localStorage.getItem("token") ?? "";
  REFRESH_TOKEN = refreshToken ?? "";
      if (ACCESS_TOKEN) {
        req.headers.authorization = `Bearer ${ACCESS_TOKEN}`;
      }
      return req;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        toast.error(
          error.response.data.description ||
            "An error occured, please try again"
        );
      } else if (error.request) {
        toast.error("Network error, please try again");
      } else {
        toast.error("An error occured, please try again");
      }
      return Promise.reject(error);
    }
  );
}

