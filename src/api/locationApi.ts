import { stat } from "fs";
import { apiClient, config } from ".";


export const getBranchGridDataApi = async (pageNumber:number,isExport: boolean, title:string,status:string) => {
    try{ 
      let pagesize= 10; 
      if(isExport){
        pagesize=99999;
      }
        
    let uri ='location/getbranchlist?branch='+title+'&status='+status+'&pageNumber='+pageNumber+'&PageSize='+pagesize+'&Paginate=true';
    const response = await apiClient.get(uri,config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const getDepartmentGridDataApi = async (pageNumber:number,isExport: boolean, title:string,status:string) => {
    try{ 
      let pagesize= 10; 
      if(isExport){
        pagesize=99999;
      }
        
    let uri ='location/getdepartmentlist?department='+title+'&status='+status+'&pageNumber='+pageNumber+'&PageSize='+pagesize+'&Paginate=true';
    const response = await apiClient.get(uri,config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const CreateNewDepartmentApi = async (
    department: string,
    createdById:number) => {
    try{   
    let uri ='location/CreateDepartmentLocation';
    const response = await apiClient.post(uri,{
    department: department,
    createdById:createdById
    },config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };
  
  export const CreateNewBranchApi = async (
    solId: string,
    branch: string,
    region: string,
    createdById:number) => {
    try{   
    let uri ='location/CreateBranchLocation';
    const response = await apiClient.post(uri,{
      solId: solId,
    branch: branch,
    region: region,
    createdById:createdById
    },config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const EditBranchApi = async (
    id: number,
  status: string,
  branch: string,
  region: string,
  modifiedById: number) => {
    try{   
    let uri ='location/UpdateBranchLocation';
    const response = await apiClient.post(uri,{
      id: id,
      status: status,
      branch: branch,
      region: region,
      modifiedById: modifiedById
    },config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const EditDepartmentApi = async (
    id: number,
  status: string,
  department: string,
  modifiedById: number) => {
    try{   
    let uri ='location/UpdateDepartmentLocation';
    const response = await apiClient.post(uri,{
      id: id,
      status: status,
      department: department,
      modifiedById: modifiedById
    },config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };