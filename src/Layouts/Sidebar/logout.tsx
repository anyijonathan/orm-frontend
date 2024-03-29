  import React, { useEffect, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../../Services/Actions/authAction';
import { useAppDispatch, useAppStateSelector } from '../../Services/Store/hooks';
import LoginScreen from '../../Pages/Authentication/login';
  /**
  * <summary>
  * This is having the code for logout with navigation 
  * </summary>
  * <action>
  * This is used to provide the logout in sidebar
  * </action> 
  */
  const Logout = () => {
    const navigate  = useNavigate();    
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
    
    const authState:any = useAppStateSelector((state) => state.authState)


    useEffect(() => {
      setLoading(true)
      
        if (authState?.userData?.data?.data?.userName) {
        logoutClick();
      } else(navigate('/login'))
       
  }, []);     
      const logoutClick = async () => {
        await dispatch(logoutAction({ email:authState?.userData?.data?.data?.email}))
        .then((response:any) => {
          localStorage.clear();
          if(loading || response)
            {setLoading(false)}
          navigate('/login');
         });                
      }  
    
    return (
        <LoginScreen></LoginScreen>
    );
  };
  
  export default Logout;
