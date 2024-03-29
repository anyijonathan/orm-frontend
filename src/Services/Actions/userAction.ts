import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateNewRoleRequest, getAllUserGridRequest, getRoleRequest, getUserAdDetailsRequest, getViewRoleRequest, getuserbyrolelocationAPI, newUserDetailsApi, updateRoleDetailsApi, updateRoleStatusApi, updateUserDetailsApi, updateuserdetailsApi } from "../../api/userApi";
import { saveRoles } from "../../constants/enum";

/**
  * <summary>
  * Used in dashboardAction.ts
  * </summary>
  * <param name="open, setopen, indata">
  * </param> 
  * <returns>
  * formatted data is returned fo the audit Table
  * </returns> 
  */
export const userDetailsAction = createAsyncThunk<
  { userData: {
    data: {data:any,total:number};
  } },
  { Role:string, name:string, status:string,pageNo:number,isExport: string }
>("users/getusers", async ({Role, name, status,pageNo,isExport}) => {
  const data = await getAllUserGridRequest(Role, name, status,pageNo,isExport);
  return { userData: {  data: data } };
});

export const roleDetailsAction = createAsyncThunk<
  { requestData: {
    data: any
  } },
  { roleTitle:string, status:boolean | undefined, PageNumber: number, isExport:string }
>("role/getroles",  async({roleTitle, status,PageNumber, isExport}) => {
  const data = await getRoleRequest(roleTitle, status,PageNumber, isExport);
  return { requestData: {  data: data} };
});

export const getUserAdDetailsAction = createAsyncThunk<
  { requestData: {
    data: any;
  } },
  { email:string }
>("users/createormuser",  async({email}) => {
  const data = await getUserAdDetailsRequest(email);
  return { requestData: {  data :data} };
});

export const createUserAction = createAsyncThunk<
  { requestData: {
    data: {data:any};
  } },
  {
    email: string,
    userName: string,
    locationIds: number[],
    staffId: string,
    roleId: number,
    status: string,
}
>("users/newuser",  async({email,userName,locationIds,staffId,roleId,status}) => {
  const data = await newUserDetailsApi(email,userName,locationIds,staffId,roleId,status);
  return { requestData: {  data: {data:data} } };
});

export const UpdateUserAction = createAsyncThunk<
  { requestData: {
    data: {data:any};
  } },
  {
    id: number,
    locationIds: number[],
    roleId: number,
    status: string,
}
>("users/updateuserdetails",  async({id,locationIds,roleId,status}) => {
  const data = await updateUserDetailsApi(id,locationIds,roleId,status);
  return { requestData: {  data: {data:data} } };
});

// export const userDetailsSearchAction = createAsyncThunk<
//   { requestData: {
//     data: {data:any,total:number};
//   } },
//   { PageNumber: number; 
//     userRole?: string;
//     userName?: string;
//     status?: string; }
// >("/userDetails",  () => {
//   // const data = await getAllRequest(PageNumber, minDate, maxDate, isExport);
//   return { requestData: {  data: {data:"",total:2} } };
// });

export const getuserbyrolelocationAction = createAsyncThunk<
  { requestData: {
    data: {data:any,total:number};
  } },
  { LocationId:number;
    RoleId:number;
    RoleTitle:string;
    userStatus:string;
    PageNumber: number;   
  }
>("users/getuserbyrolelocation",  async ({LocationId,RoleId,RoleTitle,userStatus,PageNumber}) => {
  const data = await getuserbyrolelocationAPI(LocationId,RoleId,RoleTitle,userStatus,PageNumber);
  return { requestData: {  data: {data:data,total:2} } };
});

export const CreateRoleAction = createAsyncThunk<
  { requestData: {
    data: any
  } },
  { roleTitle: string , createdBy: string}
>("role/postnewrole",  async({roleTitle,createdBy}) => {
   const data = await CreateNewRoleRequest(roleTitle,createdBy);
  return { requestData: {  data: data } };
});

export const viewRoleDetails = createAsyncThunk<
  { requestData: {
    data: any
  } },
  { roleTitle?: string }
>("role/getviewroles",  async({roleTitle}) => {
   const data = await getViewRoleRequest(roleTitle);
  return { requestData: {  data: data } };
});
export const UpdateRoleAction = createAsyncThunk<
  { requestData: {
    data: any
  } }, saveRoles[]
>("role/updateroleaccess",  async(saveData) => {
  const data = await updateRoleDetailsApi(saveData);
  return { requestData: {  data: data} };
});

export const roleUnlockedAction = createAsyncThunk<
  { requestData: {
    data: any
  } }, {
    roleId: number,
    status: boolean,
    updatedBy: string,
  }
>("role/updateRole",  async({roleId,status,updatedBy}) => {
  const data = await updateRoleStatusApi(roleId,status,updatedBy);
  return { requestData: {  data: data} };
});