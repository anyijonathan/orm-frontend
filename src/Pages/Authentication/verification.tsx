import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PinInput from "react-pin-input";
import "../../Assets/Styles/Pages/authentication.scss";
import {
  AuthFormContainer,
  AuthHeader,
  AuthHeaderIconContainer,
  AuthTagline,
} from "./utils";
import { Button, TextButton } from "../../Components/Buttons";
import { inputUnlockCode, unlockCodeAction } from '../../Services/Actions/unlockCodeAction'
import { useAppDispatch } from "../../Services/Store/hooks";
import { AuthScreenLayout } from "../../Layouts/AuthScreens";
import { MailIcon } from "../../Components/Icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { VerticalSpacer } from "../../Components/PageShared";

/**
  * <summary>
  * Called by lockedOut.tsx, verification.tsx, index.tsx
   * </summary>
  * <param name="request">
  * </param> 
  * <returns>
  * It Perform Otp verification of Email
  * </returns> 
  */
const schema = yup.object().shape({
  pin: yup
    .number()
    .min(4)
    .max(4)
    .required("Please enter the otp code sent to you"),
});

const Verification = (props:any) => {
  const { state } = useLocation();
  const userEmail=state;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [ message, setMessage ] = useState('')
  const [otpStatus, setOtpStatus]= useState(false)
  const onSubmit = async (value:any) => {
    await dispatch(inputUnlockCode({ email: userEmail,code: value }))
    .then((response:any) => {
      const result= response?.payload?.userData?.data
    if(result?.code === '00'){      
      setOtpStatus(true);
      setMessage("Unlock code has been validated successfully ! ")
    }
    if(result?.code === '801'){      
      const message= "Invalid OTP entered!"
      setMessage(message);
    }
  });
    
  };

  const resendCode= async () => {
 await dispatch(unlockCodeAction({email: userEmail})
    ).then((response:any) => {
      const result= response?.payload?.userData?.data
    
    if(result.code==='00'){
      setMessage("Unlock Code Sent on: " + userEmail);
  };
});
  }
  const handleChange = (value:any) => {
    onSubmit(value)
  };
  const backToLogin = () => {
    navigate('/login');
  };
  return (
        <AuthScreenLayout>
      <AuthHeaderIconContainer>
        <MailIcon />
      </AuthHeaderIconContainer>
      <AuthHeader title="Enter OTP" />
      <AuthTagline>
        <p>We sent a verification link to <strong>olivia@fcmb.com</strong></p>
      </AuthTagline>
      <AuthFormContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PinInput
            length={4}
            initialValue=""
            onChange={(value, index) => {}}
            type="numeric"
            inputMode="number"
            style={{ padding: "10px" }}
            onComplete={(value, index) => {handleChange(value)}}
            autoSelect={true}
            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
          />
          {message !== '' && <p className="generalError">
        {message}
        <VerticalSpacer size={15} /></p>}
          <Button type="submit" disabled={!otpStatus} onClick={backToLogin}>Back to login</Button>
        </form>
        <div className="twofaResend">
          Didn't receive the email?{" "}
          <TextButton onClick={resendCode}>Click to resend</TextButton>
        </div>
        {/* <BackToPage /> */}
      </AuthFormContainer>
      {/* <PointerSVG /> */}
    </AuthScreenLayout>
      );
};
export default Verification;
