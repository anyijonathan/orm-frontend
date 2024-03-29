import { createAsyncThunk } from "@reduxjs/toolkit";
import { CctvKriApi, GrossLossApi, KriIndicatorsApi, KycKriApi, OperationalRiskApi, RiskReportApi, RootCauseApi, getpieChartData, lossDataDashboadRDdApi, lossDataDashboadTrendApi } from "../../api/dashboardApi"

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
// export const getAllRequests = createAsyncThunk<
//   { requestData: {
//     data: {data:any,total:number};
//   } },
//   { PageNumber: number; minDate: string, maxDate: string, isExport:string }
// >("/stprequests", async ({ PageNumber, minDate, maxDate, isExport }) => {
//   const data = await getAllRequest(PageNumber, minDate, maxDate, isExport);
//   return { requestData: { data } };
// });

export const lossDataDashboadTrendAction= createAsyncThunk<
{ requestData:{
  data:any;
  total:number}},
{ baselEventType1:string, months:number, year:number }
>("dashboard/getlossdatatrend", async ({baselEventType1, months, year}) => {
  const data = await lossDataDashboadTrendApi(baselEventType1, months, year);
  return {requestData: data };
});
export const lossDataDashboadRDAction= createAsyncThunk<
{ requestData:{
  data:any;
  total:number}},
{ baselEventType1:string, months:number, year:number }
>("dashboard/getregionalinternalfraud", async ({baselEventType1, months, year}) => {
  const data = await lossDataDashboadRDdApi(baselEventType1, months, year);
  return {requestData: data };
});
export const OperationalRiskAction= createAsyncThunk<
{ requestData:{
  data:any;
  total:number}},
{ baselEventType1:string, months:number, year:number }
>("dashboard/getoperationalrisklosses", async ({baselEventType1, months, year}) => {
  const data = await OperationalRiskApi(baselEventType1, months, year);
  return {requestData: data };
});
export const RootCauseAction= createAsyncThunk<
{ requestData:{
  data:any;
  total:number}},
{ baselEventType1:string, months:number, year:number }
>("dashboard/getrootcauseanalysisforactualloss", async ({baselEventType1, months, year}) => {
  const data = await RootCauseApi(baselEventType1, months, year);
  return {requestData: data };
});
export const GrossLossAction= createAsyncThunk<
{ requestData:{
  data:any;
  total:number}},
{ baselEventType1:string, months:number, year:number }
>("dashboard/getgrossvsrecoveryvsnetloss", async ({baselEventType1, months, year}) => {
  const data = await GrossLossApi(baselEventType1, months, year);
  return {requestData: data };
});
export const RiskReportAction= createAsyncThunk<
{ requestData:{
  data:any;
  total:number}},
{ locationId:number,locationType:string, months:number, year:number }
>("dashboard/riskreports", async ({locationId,locationType, months, year}) => {
  const data = await RiskReportApi(locationId,locationType, months, year);
  return {requestData: data };
});

export const KycKriAction= createAsyncThunk<
{ requestData:{
  data:any;
  total:number}},
{ metricMasterIds:string, months:number, year:number }
>("dashboard/getkyccompliance", async ({metricMasterIds, months, year}) => {
  const data = await KycKriApi(metricMasterIds, months, year);
  return {requestData: data };
});

export const KriIndicatorsAction= createAsyncThunk<
{ requestData:{
  data:any;
  total:number}},
{ locationId:number, months:number, year:number }
>("dashboard/getkeyriskindicator", async ({locationId, months, year}) => {
  const data = await KriIndicatorsApi(locationId, months, year);
  return {requestData: data };
});

export const CctvKriAction= createAsyncThunk<
{ requestData:{
  data:any;
  total:number}},
{ metricMasterIds:string, months:number, year:number }
>("dashboard/getnonfunctionalcctvandpatches", async ({metricMasterIds, months, year}) => {
  const data = await CctvKriApi(metricMasterIds, months, year);
  return {requestData: data };
});


export const getpieChartDetails= createAsyncThunk<
{ requestData:{
  data:any;
  total:number}},
{ baselEventType1:string, months:number, year:number }
>(
  "dashboard/getgrossvsrecoveryvsnetloss", async ({baselEventType1, months, year}) => {
  const data = await getpieChartData(baselEventType1, months, year);
  return {requestData: data };
});






