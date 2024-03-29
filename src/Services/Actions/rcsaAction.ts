import { createAsyncThunk } from "@reduxjs/toolkit";
import { ObjectLiteral } from "../Utils/types";
import { ApproveRiskReportApi, CreateRCSAApi, GetDocumentApi, RCSAGridDataApi, RejReqRiskReportApi, SubmitRCSAApi } from "../../api/rcsaApi";

export const CreateRiskReportAction = createAsyncThunk<
{ requestData: {
  data: {data:any,total:number};
} },
  {
    formData:any
     ;}
>("risk/createriskreport", async ({formData}) => {
  const data = await CreateRCSAApi(
    formData);
  return { requestData: { data } };
});

export const GetDocumentAction = createAsyncThunk<
{ requestData: {
  data: {data:any,total:number};
} },
  {
    id:number
     ;}
>("risk/getriskdoc", async ({id}) => {
  const data = await GetDocumentApi(
    id);
  return { requestData: { data } };
});
export const SubmitRiskReportAction = createAsyncThunk<
{ requestData: {
  data: {data:any,total:number};
} },
  {
    formData:any
     ;}
>("risk/editriskreport", async ({formData}) => {
  const data = await SubmitRCSAApi(
    formData);
  return { requestData: { data } };
});

export const ApproveRiskReportAction:any = createAsyncThunk<
  { requestData: {
    data: {data:any,total:number};
  } },
  { id: number,
    riskClassification:string,
    riskCategory: string,
    riskRootCause: string,
    riskActionPlanStatus: string,
    riskExpectedResolutionTime: Date,
    riskStrategy: string,
    reportStatus: string,
    modifiedById: number }

>("risk/getriskreportlist", async ({ id,
  riskClassification,
  riskCategory,
  riskRootCause,
  riskActionPlanStatus,
  riskExpectedResolutionTime,
  riskStrategy,
  reportStatus,
  modifiedById }) => {
  const data = await ApproveRiskReportApi( 
    id,
  riskClassification,
  riskCategory,
  riskRootCause,
  riskActionPlanStatus,
  riskExpectedResolutionTime,
  riskStrategy,
  reportStatus,
  modifiedById);
  return { requestData: { data } };
});

export const ReqRejRiskReportAction:any = createAsyncThunk<
  { requestData: {
    data: {data:any,total:number};
  } },
  { id: number,
    updateRequestStatus: string,
    reviewerComments:string,
    reportStatus: string,
    modifiedById: number }

>("risk/updateriskreportstatus", async ({ id,
  updateRequestStatus,
  reviewerComments,
  reportStatus,
  modifiedById }) => {
  const data = await RejReqRiskReportApi( 
    id,
  updateRequestStatus,
  reviewerComments,
  reportStatus,
  modifiedById);
  return { requestData: { data } };
});


export const RCSAGridDataAction:any = createAsyncThunk<
  { requestData: {
    data: {data:any,total:number};
  } },
  { locationId:number,refNum: string,
     branch:string,
     region:string,
     department:string,
      reportStatus:string, 
      minDate:string, 
      maxDate:string,
       pageNumber:number,
       isExport:boolean }

>("risk/getriskreportlist", async ({ locationId,refNum,
    branch, region, department,
     reportStatus, 
     minDate, 
     maxDate,
      pageNumber,
      isExport }) => {
  const data = await RCSAGridDataApi( 
    locationId,refNum,
    branch,
    region,
    department,
     reportStatus, 
     minDate, 
     maxDate,
      pageNumber,
      isExport);
  return { requestData: { data } };
});
