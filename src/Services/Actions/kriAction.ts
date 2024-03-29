import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetRequestDetailById,GetExportTransactionDetails, GetTransactionDetails, GetSearchTransactionDetails, UpdateResponseCodeByTrnsRefNo, UpdateResponseCodeByRefresh } from "../../api/kriApi";
import { ObjectLiteral } from "../Utils/types";
import { EditKriDataApi, createKriData, createNewKriReportApi, deleteKriReportApi, getDetailviewKriApi, getMetricDataApi, getPreviewKriApi, kriDataDetails, kriGridDataDetails, newKriDataApi, removeMetricApi, updateFinalKriApi, updateKriData, updateKriReportApi, updateNewKriMetricsApi, updatePreviewKriApi } from "../../api/kriDataApi";
import { string } from "yup";

/**
  * <summary>
  * getRequestDetailById: request data by Id based on pagenumber, min date and max date provided by user
  * getExportTransactionDetails: Request the data for Transaction details
  * getTransactionDetails: request transaction details based on min date and max date
  * </summary>
  * <param name="pageNumber, minDate, maxDate, requestId">
  * </param> 
  * <returns>
  * Filtered data requested by user
  * </returns> 
  */
 //complete grid data for kri--export
export const kriDetailsAction:any = createAsyncThunk<
  { requestData: {
    data: {data:any,total:number};
  } },
  {locationId:string, refNo?:string, branch?:string, status?:string, PageNumber?:number , minDate:string,maxDate:string, isExport?:boolean}

>("kri/getkrigridData", async ({locationId,refNo,branch,status, PageNumber,minDate, maxDate, isExport }) => {
  const data = await kriDataDetails(locationId,refNo,branch,status, PageNumber, minDate, maxDate, isExport);
  return { requestData: { data } };
});
// kri page status with count...
export const kriGridDetailsAction:any = createAsyncThunk<
  { requestData: {
    data: {data:any,total:number};
  } },
  { locationId?:number,refNo?:string, branch?:string,department?:string, status?:string, PageNumber?:number , minDate:string,maxDate:string, isExport?:boolean}

>("kri/getKriGridReportData", async ({locationId,refNo,branch,department,status, PageNumber,minDate, maxDate, isExport }) => {
  const data = await kriGridDataDetails(locationId,refNo,branch,department,status, PageNumber, minDate, maxDate, isExport);
  return { requestData: { data } };
});

export const getNewKriReportAction:any = createAsyncThunk<
  { requestData: {
    data: {data:any,total:number};
  } },
  { locationType: string, locationId: number, frequecy: string }

>("kri/getnewkridata", async ({locationType, locationId, frequecy }) => {
  const data = await newKriDataApi(locationType, locationId, frequecy);
  return { requestData: { data } };
});

export const getEditKriReportAction:any = createAsyncThunk<
  { requestData: {
    data: {data:any,total:number};
  } },
  { id: number , loc:number}

>("kri/geteditkridata", async ({id , loc}) => {
  const data = await EditKriDataApi(id,loc);
  return { requestData: { data } };
});

export const createNewKriReportAction:any = createAsyncThunk<
  { requestData: {
    data: {data:any,total:number};
  } },
  { refNum:number,frequecy:string,reportingPeriod:string,dateOfOccurance:Date,locationId:number,locationType:string,status:string, createdById: number, kris:number[], removeKris:number[], ValidatorILOUserId:number }

>("kri/postnewkri", async ({refNum,frequecy,reportingPeriod,dateOfOccurance,locationId,locationType,status,createdById, kris, removeKris, ValidatorILOUserId }) => {
  const data = await createNewKriReportApi(refNum,frequecy,reportingPeriod,dateOfOccurance,locationId,locationType,status,createdById, kris, removeKris, ValidatorILOUserId);
  return { requestData: { data } };
});

export const updateStateAction:any = createAsyncThunk<
  { requestData: {
    data: any;
  } },
  { allData:any }

>("kri/updatekridata",  async({allData }) => {
  const data = await updateKriReportApi(allData);
  return { requestData: { data:{data }} };
});


export const updateNewKriMetricsAction:any = createAsyncThunk<
  { requestData: {
    data: any;
  } },
  {  MasterId : number,
    ReportId : number,
    metricId : number
    DateOccurance : Date,
    Description : string,
    AmountInvolved : string,
    Currency : string,
    MitigationPlan : string,
    NumberPercentage : string,
    RiskAppetiteThreshold : string,
   }

>("kri/postkrireport",  async({
  MasterId,
  ReportId,
  metricId,
  DateOccurance,
  Description,
  AmountInvolved,
  Currency,
  MitigationPlan,
  NumberPercentage,
  RiskAppetiteThreshold}) => {
  const data = await updateNewKriMetricsApi(
    MasterId,
    ReportId,
    metricId,
    DateOccurance,
    Description,
    AmountInvolved,
    Currency,
    MitigationPlan,
    NumberPercentage,
    RiskAppetiteThreshold);
  return { requestData: { data:{data }} };
});

export const getPreviewKriAction:any = createAsyncThunk<
  { requestData: {
    data: any
  } },
  { ids:number[], rids:number[] }

>("kri/getpreviewkriapi", async ({ids, rids} ) => {
  const data = await getPreviewKriApi(ids,rids);
  return { requestData: { data } };
});

export const getDetailviewKriAction:any = createAsyncThunk<
  { requestData: {
    data: any
  } },
  { ids:number[] }

>("kri/getDetailKriApi", async ({ids} ) => {
  const data = await getDetailviewKriApi(ids);
  return { requestData: { data } };
});

export const UpdateStatusAction:any = createAsyncThunk<
  { requestData: {
    data: any
  } },
  { id:number }

>("kri/updatePreviewKriApi", async ({id} ) => {
  const data = await updatePreviewKriApi(id);
  return { requestData: { data } };
});

export const UpdatefinalKriAction:any = createAsyncThunk<
  { requestData: {
    data: any
  } },
  { id:number,
    status:string,
    comments:string,
    approvedByid:number
    }

>("kri/updateFinalKriApi", async ({id,status,comments,approvedByid} ) => {
  const data = await updateFinalKriApi(id,status,comments,approvedByid);
  return { requestData: { data } };
});



export const getMetricsData:any = createAsyncThunk<
  { requestData: {
    data: {data:any,total:number};
  } },
  { id: number }

>("kri/getmetricdataapi", async ({ id }) => {
  const data = await getMetricDataApi( id);
  return { requestData: { data } };
});

export const removeMetricAction:any = createAsyncThunk<
  { requestData: {
    data: {data:any,total:number};
  } },
  { id: number }

>("kri/removeMetric", async ({ id }) => {
  const data = await removeMetricApi( id);
  return { requestData: { data } };
});

export const deletekriAction:any = createAsyncThunk<
  { requestData: {
    data: any
  } },
  { reportId: number }

>("kri/deleteKriReportApi", async ({reportId }) => {
  const data = await deleteKriReportApi(reportId);
  return { requestData: { data } };
});





