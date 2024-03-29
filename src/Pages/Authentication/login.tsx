import * as yup from "yup";
import "../../Assets/Styles/Pages/authentication.scss";

import {

  AuthFCMBLogo,

  AuthFormContainer,

  AuthHeader,

  AuthTagline,

} from "./utils";

import { Button } from "../../Components/Buttons";
import { userLogin, validateUserEmail } from "../../Services/Actions/authAction";
import {

  useAppDispatch

} from "../../Services/Store/hooks";

import { AuthScreenLayout } from "../../Layouts/AuthScreens";

import { useNavigate } from "react-router-dom";

import { routePaths } from "../../Routes/paths";

import { VerticalSpacer } from "../../Components/PageShared";

import React, { useEffect, useState } from 'react';
import { initializeLocation } from "../../Services/Reducers/locationSlice";

/**
  * <summary>
  * called in index.tsx and guardedRoute.tsx
  * Verifies the valid email for login 
  * </summary>
  * <param name="email,username,password">
  * </param> 
  * <returns>
  * Login Screen content
  * </returns> 
  */ 

const schema = yup.object().shape({

  email: yup.string().email().required("Enter a valid User Name"),

  password: yup.string().min(8).required("Enter a valid Password"),

});

 

const LoginScreen = () => {

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [emailIsValid, setEmailIsValid] = useState(false);

  const [emailEntered, setEmailEntered] = useState(false);

  const [message, setMessage] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [emails, setEmails] = useState('');

  const [password, setPassword] = useState('');

  const [domainName,setDomainName]=useState(false)

  const handleChange = (event:any) => {

    const { value } = event.target;

    setEmails(value);
    setDomainName(true)
    setPassword("")
  };

  const handlePassword = (event:any) => {

    const { value } = event.target;

    setPassword(value)

  };

 

  const handleVerifyEmail = () => {

    if(emails==="") setDomainName(false)

    setEmailEntered(true)

    verifyEmail();

  };

 

  const verifyEmail =  () => {
    dispatch(validateUserEmail({ email: emails }))
    .then((response:any) => {
      const result= response?.payload?.userData?.data
      // alert(result?.code)
      if(result?.code === "998"){
        setEmailIsValid(false); 
        let flag=true 
        setMessage("User doesn't exist or wrong user name!")

      }
      if(result?.code === "802"){
        setMessage("User Account is Locked!")
        navigate('/locked-out', {state: emails});

      }
      if(result?.code==="00"){
        setEmailIsValid(true); // user exist in AD
        setMessage("")
        setEmailEntered(true);
      }
    });
  };

  
  const onSubmit =  async() => {
      await dispatch( 
        userLogin({ email: emails, password: password })  
      ) .then((response:any) => {
       const result= response?.payload?.userData?.data;
       console.log(result);
      if(result?.code==="996" || result?.data?.code==="ERR_NETWORK"){
        const failedAttempts=result?.data?.failLoginCount
        const remainingAttempts= 3-parseInt(failedAttempts)
        let errorMessage="Server is not reachable!!"
        setMessage(errorMessage)
        if(remainingAttempts <= 0){
          navigate('/locked-out', {state: emails});
        }else{
          errorMessage="!Invalid Password. You have only " + remainingAttempts + " attempt left."
          setMessage(errorMessage);
          navigate('/login');
        }
      }
      if(result?.code==="00"){
          loginSucessfull(result)
      }
    }
 );
  }

  const loginSucessfull= (result:any) => {
    if(result?.data?.isAccountLocked){
      const errorMessage="login failed! Account is locked, first unlock the account"
      setMessage(errorMessage)          
                navigate('/locked-out', {state: emails});
    }else{
    const errorMessage="Successful Login!"
    const Loc ={
      locationId: result?.data?.locationData[0]?.locationId,
      locationName: result?.data?.locationType === "B" ? result?.data?.locationData[0]?.branch : result?.data?.locationData[0]?.department,
      locationType: result?.data?.locationType,
      region: result?.data?.locationData[0]?.region,
    }
    setMessage(errorMessage)
    let userRole:string= result?.data?.userRole;
    userRole=userRole.toLocaleLowerCase();
    if(!userRole.includes("admin")){
      dispatch (initializeLocation(Loc))
    }

     navigate('/'+userRole + routePaths.admin.DASHBOARD,  {state: emails});
  }
  }

 

  const togglePasswordVisibility = () => {

    setShowPassword((prevShowPassword) => !prevShowPassword);

  };

//  useEffect (() =>{
//   if(emails !== ""  && password !== ""){
//     verifyEmail();
//   }
//  },[emails,password])

  return (

    <AuthScreenLayout>

      <AuthFCMBLogo />

      <div className="orm">ORM</div>
      <div className="orm">Log in to your account</div>
      <AuthTagline>Welcome back! Please enter your details.</AuthTagline>

      <AuthFormContainer>

        {/* <AuthHeader title="Log in to your account" /> */}


        {/* <VerticalSpacer size={18} /> */}

        <label htmlFor="emailField" className="form-label">Email</label>

        <div className="input-group">

            <input

              id="emailField"

              type="email"

              value={emails}

              className="form-control-auth brdr-removed"

              onChange={handleChange}

              onBlur={() => {

                handleVerifyEmail();

              }}

              onFocus={() => {
              }}

              placeholder="Enter your email"

            />

            <div className="input-group-text">

 

            {domainName? (

                  <span className="fcmbText">@fcmb.com</span> // Confirmation icon

                ) : (<></>

                )}

                {emailEntered && emailIsValid && emails!==""? (

                 <span> 
                 <span className="authCheck">
                   <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M12.3333 1L5 8.33333L1.66667 5" stroke="#12B76A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                 </span>
               </span> // Confirmation icon

                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 6L6 10M6 6L10 10M14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg> // Cross icon

                )}

            </div>

        </div>

        <VerticalSpacer size={18} />

        <label htmlFor="password" className="form-label">Password</label>

        <div className="input-group">

        <input

          id="password"

          type={showPassword ? 'text' : 'password'}

          value={password}

          onChange={handlePassword}

          className="form-control-auth brdr-removed"

          placeholder="Enter your password"

        />

            <div className="input-group-text">

           

            <i className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`} data-testid="password-toggle" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} ></i> {/* Toggle the button text based on showPassword state */}

           

            </div>

        </div>

       

      {message !=='' && <p className="generalError">

        <VerticalSpacer size={15} />

        {message}</p>

        }

        <VerticalSpacer size={24} />
          <Button disabled={!emailIsValid  || password.length<8} type="submit" onClick={onSubmit}>Next</Button>

      </AuthFormContainer>

    </AuthScreenLayout>

  );

};

 

export default LoginScreen;