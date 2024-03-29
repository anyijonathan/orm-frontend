import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateNewBranchApi, CreateNewDepartmentApi, EditBranchApi, EditDepartmentApi, getBranchGridDataApi, getDepartmentGridDataApi } from "../../api/locationApi";

export const getBranchGridDataAction:any = createAsyncThunk<
  { requestData: {
    data: {data:any,total:number};
  } },
  { pageNumber:number,isExport: boolean, title:string,status:string }

>("location/getbranchlist", async ({pageNumber, isExport,title,status }) => {
  const data = await getBranchGridDataApi(pageNumber, isExport,title,status);
  return { requestData: { data } };
});

export const getDepartmentGridDataAction:any = createAsyncThunk<
  { requestData: {
    data: {data:any,total:number};
  } },
  { pageNumber:number,isExport: boolean, title:string,status:string }

>("location/getdepartmentlist", async ({pageNumber, isExport,title,status }) => {
  const data = await getDepartmentGridDataApi(pageNumber, isExport,title,status);
  return { requestData: { data } };
});

export const CreateNewDepartmentAction:any = createAsyncThunk<
  { requestData: {
    data: {data:any,total:number};
  } },
  { department: string,
    createdById:number }

>("location/CreateDepartmentLocation", async ({department,createdById }) => {
  const data = await CreateNewDepartmentApi(department,createdById);
  return { requestData: { data } };
});

export const CreateNewBranchAction:any = createAsyncThunk<
  { requestData: {
    data: {data:any,total:number};
  } },
  { solId: string,
    branch: string,
    region: string,
    createdById:number }

>("location/CreateBranchLocation", async ({solId,branch,region,createdById }) => {
  const data = await CreateNewBranchApi(solId,branch,region,createdById);
  return { requestData: { data } };
});

export const EditBranchAction:any = createAsyncThunk<
  { requestData: {
    data: {data:any,total:number};
  } },
  { id: number,
  status: string,
  branch: string,
  region: string,
  modifiedById: number }

>("location/UpdateBranchLocation", async ({id, status, branch, region, modifiedById }) => {
  const data = await EditBranchApi(id, status, branch, region, modifiedById);
  return { requestData: { data } };
});

export const EditDepartmentAction:any = createAsyncThunk<
  { requestData: {
    data: {data:any,total:number};
  } },
  { id: number,
  status: string,
  department: string,
  modifiedById: number }

>("location/UpdateBranchLocation", async ({id, status, department, modifiedById }) => {
  const data = await EditDepartmentApi(id, status, department, modifiedById);
  return { requestData: { data } };
});