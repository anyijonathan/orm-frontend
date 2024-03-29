import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AdminRoutes } from "./admin";
import ProtectedRoute from "./guardedRoute";
import LoginScreen from "../Pages/Authentication/login";
import FA from "../Pages/Authentication/fa";
import LockedOutScreen from "../Pages/Authentication/lockedOut";
import Verification from "../Pages/Authentication/verification";
import KriCategory from "../Pages/Admin/KRICategory";
const Layout = lazy(() => import("../Layouts/Main"));
/**
  * <summary>
  * Routes the request for Authentication: Login screen and  Locked out screen
  * </summary>
  * <param name="path">
  * </param> 
  */

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<>Loading...</>}>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/fa" element={<FA />} />
          <Route path="/locked-out" element={<LockedOutScreen />} />
          <Route path="/verification" element={<Verification />} />
          {/* <Route path="/kri-category" element={<KriCategory />} /> */}
          
                      
          <Route element={<Layout  />}>
            <Route path="/rlo/*" element={
                <ProtectedRoute>
                    <AdminRoutes />
                </ProtectedRoute>
            } />
              <Route path="/ico/*" element={
                <ProtectedRoute>
                    <AdminRoutes />
                </ProtectedRoute>
            } />
              <Route path="/admin/*" element={
                <ProtectedRoute>
                    <AdminRoutes />
                </ProtectedRoute>
            } />
         </Route>


          <Route path="*" element={<LoginScreen />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
