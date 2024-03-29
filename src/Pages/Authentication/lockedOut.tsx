import "../../Assets/Styles/Pages/authentication.scss";
import { VerticalSpacer } from "../../Components/PageShared";
import { TextButton } from "../../Components/Buttons";
import {
  AuthHeader,
} from "./utils";
import {
  useAppDispatch,
} from "../../Services/Store/hooks";
import { AuthScreenLayout } from "../../Layouts/AuthScreens";
import { DangerIcon } from "../../Components/Icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { unlockCodeAction } from "../../Services/Actions/unlockCodeAction"

const LockedOutScreen = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [emailid, setEmailid] = useState('');
  const  email  = state || '';
  useEffect(() => {
    setEmailid(email)    
    }, []);
 
  const dispatch = useAppDispatch();
  const sendUnlockCode = async () =>{
        await dispatch(  
          unlockCodeAction({email: emailid})
        ).then((response:any) => {
          const result= response?.payload?.auth?.data?.userData?.data?.data 
        if(result?.code=='00'){
          navigate('/Verification', {state: emailid}); 
        }
      })
  }


  return (
    <AuthScreenLayout>
      <div className="lockedOutIcon">
        <DangerIcon />
      </div>
      <VerticalSpacer size={40} />
      <AuthHeader title="You have been locked out!" />
      <p className="authTagline lockedOut">
      You have reached the maximum number of invalid sign-in attempts. Please click on the button to get the unlock code via email.
      </p>
      <VerticalSpacer size={18} />
      {/* <a href="/verification"></a> */}
      <p className="lockedOutIcon">
        <TextButton className="sendCodeBtn" onClick={sendUnlockCode} type="button" data-testid="unlock-button">
            Send unlock code
        </TextButton>
      </p>
    </AuthScreenLayout>
  );
};

export default LockedOutScreen;
