import {  ReactNode } from "react";
import { configureAxios } from "./api/index";
import { useAppStateSelector } from "./Services/Store/hooks";

interface Props {
  children: ReactNode;
}

const InitAxios = ({ children }: Props) => {
  // const authState = useAppStateSelector((state) => state.authState);

  configureAxios({
    // accessToken: authState.token,
    // refreshToken: authState.refresh,
  });

  return <>{children}</>;
};

export default InitAxios;
