import React from "react";
import { useAppStateSelector } from "../Services/Store/hooks";
import { Navigate, useLocation} from "react-router-dom";
/**
  * <summary>
  * It provides the secure route for the requested page
  * </summary>
  * <param name="state">
  * </param>  
  */
const ProtectedRoute = (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactPortal | null | undefined; }) => {
    const authState = useAppStateSelector((state) => state.authState);
    let location = useLocation();
     return (
          <>
          {authState.isAuthenticated ? (
           props.children
          ) : <Navigate to="/login" state={{ from: location}} replace />}
        </>
      );
}
export default ProtectedRoute;