import { apiClient, config } from ".";
import { saveRoles } from "../constants/enum";

export const getAllUserGridRequest = async (Role:string,name:string,status:string,PageNumber:number,isExport:string) => {
    let pagesize = 10;
    if(isExport === "Export"){
      pagesize = 99999;
    }
    let uri ='users/getusers?userName='+name+'&userRole='+Role+'&status='+status+'&PageNumber='+PageNumber+'&PageSize='+pagesize+'&Paginate=true'
    const response = await apiClient.get(uri,config);
    return response.data;
  };



  export const updateUserDetailsApi = async (  
    id: number,
    locationIds: number[],
    roleId: number,
    status: string,) => {
    try{
    const response = await apiClient.post("users/updateuserdetails", {
      id: id,
      locationIds: locationIds,
      roleId: roleId,
      status: status,
    },config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const newUserDetailsApi = async (
    email: string,
    userName: string,
    locationIds: number[],
    staffId: string,
    roleId: number,
    status: string,
  ) => {
    try{
    const response = await apiClient.post("users/newuser", {
      email: email,
    userName: userName,
    locationIds: locationIds,
    staffId: staffId,
    roleId: roleId,
    status: status,
    },config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const CreateNewRoleRequest = async ( roleTitle: string , createdBy: string) => {
    try{
    let uri ='role/postnewrole?roleTitle='+roleTitle+ '&createdBy='+createdBy

    const response = await apiClient.post(uri, {},config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const updateRoleDetailsApi = async ( data:saveRoles[]) => {
    try{
    const response = await apiClient.post("role/updateroleaccess", {data },config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const updateRoleStatusApi = async ( 
    roleId: number,
    status: boolean,
    updatedBy: string) => {
    try{
    const response = await apiClient.post("role/updateRole", {roleId,status,updatedBy },config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const getUserAdDetailsRequest = async (email:string) => {
    let uri ='users/createormuser?email='+email
    const response = await apiClient.get(uri,config);
    return response.data;
  };


  export const getRoleRequest = async (roleTitle:string, status:boolean | undefined,PageNumber: number, isExport:string) => {
    let pagesize = 10;
    if(isExport === "Export"){
      pagesize = 99999;
    }
    let uri ='role/getroles?roleTitle='+roleTitle+'&status='+status+'&pageNumber='+PageNumber+'&PageSize='+pagesize+'&Paginate=true'
    const response = await apiClient.get(uri,config);
    return response.data;
  };

  export const getViewRoleRequest = async (roleTitle?:string) => {
    
    let uri ='role/getviewroles?roleTitle='+roleTitle
    const response = await apiClient.get(uri,config);
    return response.data;
  };

  export const updateuserdetailsApi = async ( email:string,userName:string,roleTitle:string,status:string) => {
    try{
    const response = await apiClient.post("users/updateuserdetails", {email,userName,roleTitle,status },config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const getuserbyrolelocationAPI = async (LocationId:number,RoleId:number,RoleTitle:string,userStatus:string,PageNumber:number) => {
    let pagesize = 9999;
    let uri ='users/getuserbyrolelocation?Locationid='+LocationId+'&Roleid='+RoleId+'&RoleTitle='+RoleTitle+'&UserStatus='+userStatus+'&PageNumber='+PageNumber+'&PageSize='+pagesize+'&Paginate=true'
    const response = await apiClient.get(uri,config);
    return response.data;
  };
