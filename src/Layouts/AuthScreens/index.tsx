import { ReactNode } from "react";
import { AuthFCMBLogo, AuthFCMBLogoLarge } from "../../Pages/Authentication/utils";
import logo from '../../Assets/Images/handDrawnArrow.png' 

export interface AuthScreenLayoutType {
  bodyWidth?: string;
}

export const AuthScreenLayout = ({
  children,
  bodyWidth,
}: { children: ReactNode } & AuthScreenLayoutType) => {
  return (
    <div className="loginMainContainer">
      <div className="loginPanContainer">
        <div className="leftPanLogin">
            <div className="authBody" style={{ width: bodyWidth ?? undefined }}>
              {children}
            </div>
        </div>
        <div className="rightPanLogin">
          <AuthFCMBLogoLarge />
        </div>
        <div className="hda">
          <img src={logo} alt={"logo"}/> 
        </div>
      </div>
    </div>
  );
};
