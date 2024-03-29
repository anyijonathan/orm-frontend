import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { routePaths } from "./paths";
import KriCategory from "../Pages/Admin/KRICategory";
import ManageSettings from "../Pages/Admin/ManageSettings";
import KriIndicator from "../Pages/Admin/KRIindicator";
import LoadIndicator from "../Pages/Admin/LoadIndicator";
import LossData from "../Pages/Admin/RloLossData/index";
// import Transfers from "../Pages/Admin/Transfers";
// import Transactions from "../Pages/Admin/Transactions";
import Logout from "../Layouts/Sidebar/logout";
import Loss_Data from "../Pages/Admin/RloLossData";
import RloLossData from "../Pages/Admin/RloLossData/rloLoss";
import KriPage from "../Pages/Admin/KRI";
import RloView from "../Pages/Admin/RloLossData/rloView";
import KriView from "../Pages/Admin/KRI/kriView";
import UserRoleManagementDashboard from "../Pages/Admin/UserRoleManagement";
import UserManagement from "../Pages/Admin/UserRoleManagement/userManagement";
import RoleManagement from "../Pages/Admin/UserRoleManagement/RoleManagement";
import CreateNewRole from "../Pages/Admin/UserRoleManagement/RoleManagement/createNewRole";
import EditRole from "../Pages/Admin/UserRoleManagement/RoleManagement/editRole";
import ViewRole from "../Pages/Admin/UserRoleManagement/RoleManagement/viewRole";
import CreateKri from "../Pages/Admin/KRI/createKri";
import LossDataIndex from "../Pages/Admin/LossData";
// import LossDataView from "../Pages/Admin/LossData/lossDataView";
import CreateKriData from "../Pages/Admin/KRI/RLO/createKRIData";
import KRIRloHome from "../Pages/Admin/KRI/RLO";
import KRIBranch from "../Pages/Admin/KRI/KRIBranch";
import LogKriData from "../Pages/Admin/KRI/KRIBranch/logKriData";
import ViewKriBranch from "../Pages/Admin/KRI/KRIBranch/viewKriBranch";
import KRIDepartment from "../Pages/Admin/KRI/KRIDepartment";
import LogKriDataDepartment from "../Pages/Admin/KRI/KRIDepartment/logKriDataDepartment";
import AddMoreDetailPopUp from "../Pages/Admin/KRI/KRIDepartment/addMoreDetailPopUp";
import PreviewKriDepartment from "../Pages/Admin/KRI/KRIDepartment/previewKriDepartment";
import ApproveLossData from "../Pages/Admin/RloLossData/approveLossData";
import RCSA from "../Pages/Admin/RCSA";
import CreateRcsa from "../Pages/Admin/RCSA/createRcsa";
import ApproveKri from "../Pages/Admin/KRI/ApproveKri";
import ViewRcsa from "../Pages/Admin/RCSA/viewRcsa";
import ApprovalRcsa from "../Pages/Admin/RCSA/approvalRCSA";
import RequestUpdate from "../Pages/Admin/RCSA/requestUpdate";
import EditRcsa from "../Pages/Admin/RCSA/editRCSA";
import Dashboard from "../Pages/Admin/Dashboard";
import LogKriCreateEdit from "../Pages/Admin/KRI/KRIDepartment/logKriCreateEdit";
import LocationManagement from "../Pages/Admin/locationManagement";
import AllKri from "../Pages/Admin/KRI/KRIDepartment/allKri";
import ViewKriMetrices from "../Pages/Admin/KRI/KRIDepartment/viewKriMetrices";
import ReportsPage from "../Pages/Admin/Reports";
import ReportsIndex from "../Pages/Admin/Reports";
/**
  * <summary>
  * Routes the request for Dashboard, UserManagement, AuditTrail, ReportsUser and AuditSettings
  * </summary>
  * <param name="path">
  * </param> 
  */
// const Dashboard = lazy(() => import("../Pages/Admin/Dashboard"));
// const UserManagement = lazy(() => import("../Pages/Admin/Users"));
// const AuditTrail = lazy(() => import("../Pages/Admin/Audit"));
// const ReportsUser = lazy(() => import("../Pages/Admin/Reports/users"));

// const AuditSettings = lazy(() => import("../Pages/Admin/Settings/Audit/audit"));
const paths = routePaths["admin"];

export const AdminRoutes = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes>
        <Route path={paths.DASHBOARD} element={<Dashboard />} />
        <Route path={paths.KRICATEGORY} element={<KriCategory />} />
        <Route path={paths.MANAGESETTINGS} element={<ManageSettings />} />
        <Route path={paths.KRIINDICATOR} element={<KriIndicator />} />
        <Route path={paths.LOADINDICATOR} element={<LoadIndicator />} />
        <Route path={paths.KRIVIEW} element={<KriView />} />
        {/* Earlier Loss Data Screens */}
        <Route path={paths.LOSSDATA} element={<LossData />} />
        <Route path={paths.RLOLOSSVIEW} element={<RloView />} />
        <Route path={paths.RLOLOSSDATA} element={<RloLossData />} />
        <Route path={paths.LOSSDATAAPPROVAL} element={<ApproveLossData />} />

        {/* New Loss Data Screens as per Figma*/}
        <Route path={paths.LOSSDATAINDEX} element={<LossDataIndex />} />
        {/* <Route path={paths.LOSSDATAVIEW} element={<LossDataView />} /> */}

        <Route path={paths.RCSA} element={<RCSA />} />
        <Route path={paths.CREATERCSA} element={<CreateRcsa />} />
        <Route path={paths.VIEWRCSA} element={<ViewRcsa />} />
        <Route path={paths.APPROVERCSA} element={<ApprovalRcsa />} />
        <Route path={paths.REQUPDATERCSA} element={<RequestUpdate />} />
        <Route path={paths.EDITRCSA} element={<EditRcsa />} />

        <Route path={paths.KRI} element={<KriPage />} />
        <Route path={paths.USERROLEMANAGEMENTDASHBOARD} element={<UserRoleManagementDashboard />} />
        <Route path={paths.USERMANAGEMENT} element={<UserManagement />} />
        <Route path={paths.ROLEMANAGEMENT} element={<RoleManagement />} />
        <Route path={paths.LOCATIONMANAGEMENT} element={<LocationManagement />} />
        <Route path={paths.CREATEROLE} element={<CreateNewRole />} />
        <Route path={paths.EDITROLE} element={<EditRole />} />
        <Route path={paths.VIEWROLE} element={<ViewRole />} />

        <Route path={paths.LOGOUT} element={<Logout />} />
        {/* <Route path={paths.CREATEKRI} element={<CreateKri />} /> */}
        <Route path={paths.CREATEKRIDATA} element={<CreateKriData />} />
        <Route path={paths.KRIRLOHOME} element={<KRIRloHome />} />

        {/* KRI Branch */}
        <Route path={paths.KRIBRANCH} element={<KRIBranch />} />
        <Route path={paths.LOGKRIDATA} element={<LogKriData />} />
        <Route path={paths.VIEWKRIDATA} element={<ViewKriBranch />} />
        <Route path={paths.KRIDEPARTMENT} element={<KRIDepartment />} />
        <Route path={paths.LOGKRIDATADEPARTMENT} element={<LogKriDataDepartment />} />
        <Route path={paths.LogKriCreateEdit} element={<LogKriCreateEdit />} />
        <Route path={paths.STARTKRIDATADEP} element={<AddMoreDetailPopUp />} />
        <Route path={paths.PREVIEWKRIDEP} element={<PreviewKriDepartment />} />
        <Route path={paths.APPROVEKRI} element={<ApproveKri />} />
        <Route path={paths.ALLKRI} element={<AllKri />} />
        <Route path={paths.VIEWKRIMETRICES} element={<ViewKriMetrices />} />
        <Route path={paths.REPORTS} element={<ReportsIndex />} />

 
      </Routes>
    </Suspense>
  );
};
