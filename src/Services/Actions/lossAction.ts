import { createAsyncThunk } from "@reduxjs/toolkit";
import { ObjectLiteral } from "../Utils/types";
import { unlockCode, inputCode } from "../../api/unlockCodeApi";
import { CreateLossData, UpdateLossDataBoam, getAllLossApi, lossDataDetails, updateApprovalStatusLossDataApi, updateLossData } from "../../api/lossDataApi";

/**
  * <summary>
  * request the generation of otp and unlock code
  * </summary>
  * <param name="userData,email,code">
  * </param> 
  * <returns>
  * returns the user data and validation of code provided
  * </returns> 
  */


export const lossDataDetailsAction:any = createAsyncThunk<
  { requestData: {
    data: {data:any,total:number};
  } },
  { 
    locationId: number,
    refNo:string,
    branch:string,
    region:string,
    department:string,
    eventStatus:string,
    reportStatus:string,
    pageNumber: number,
    minDate:Date, maxDate:Date, isexport:boolean}

>("loss/getlossgriddata", async ({locationId,refNo,branch,region,department,eventStatus,reportStatus,pageNumber,minDate, maxDate, isexport}) => {
  const data = await lossDataDetails(locationId,refNo,branch,region,department,eventStatus,reportStatus,pageNumber,minDate, maxDate, isexport);
  return { requestData: { data } };
});

export const getAllLossDetailAction:any = createAsyncThunk<
  { requestData: {
    data: {data:any,total:number};
  } },
  { id:number}

>("loss/GetFullLossDataBySingleId", async ({id}) => {
  const data = await getAllLossApi(id);
  return { requestData: { data } };
});

// export const CreateLossDataAction = createAsyncThunk<
// { requestData: {
//   data: {data:any,total:number};
// } },
//   {
//      locationType: string,
//      locationId: number,
//      validatorILOUserId: number,
//      dateOccurance: Date,
//      dateDiscovery: Date,
//      dateReported: Date,
//      description: string,
//      rootCauseRLO: string,
//      lossType: string,
//      currencyType: string,
//      amountInvolved: number,
//      nearMissAmount: number,
//      potentialLossAmount: number,
//      grossActualAmount: number,
//      recoveredAmount: number,
//      furtherRecoveredAmount: number,
//      recoveryChannel: string,
//      staffInvolvement: string,
//      eventStatus: string,
//      reportStatus: string,
//      createdById: number
//      ;}
// >("loss/createlossdatarlo", async ({
//   locationType,
//   locationId,
//   validatorILOUserId,
//   dateOccurance,
//   dateDiscovery,
//   dateReported,
//   description,
//   rootCauseRLO,
//   lossType,
//   currencyType,
//   amountInvolved,
//   nearMissAmount,
//   potentialLossAmount,
//   grossActualAmount,
//   recoveredAmount,
//   furtherRecoveredAmount,
//   recoveryChannel,
//   staffInvolvement,
//   eventStatus,
//   reportStatus,
//   createdById}) => {
//   const data = await CreateLossData(
//     locationType,
//     locationId,
//     validatorILOUserId,
//     dateOccurance,
//     dateDiscovery,
//     dateReported,
//     description,
//     rootCauseRLO,
//     lossType,
//     currencyType,
//     amountInvolved,
//     nearMissAmount,
//     potentialLossAmount,
//     grossActualAmount,
//     recoveredAmount,
//     furtherRecoveredAmount,
//     recoveryChannel,
//     staffInvolvement,
//     eventStatus,
//     reportStatus,
//     createdById);
//   return { requestData: { data } };
// });

export const CreateLossDataAction = createAsyncThunk<
{ requestData: {
  data: {data:any,total:number};
} },
  {
     formData: any
     }
>("loss/createlossdatarlo", async ({
  formData
}) => {
  const data = await CreateLossData(
    formData
    );
  return { requestData: { data } };
});

export const updateLossDataAction = createAsyncThunk<
{ requestData: {
  data: {data:any,total:number};
} },
  {
    formData: any
  }
>("loss/updatelossdatarlo", async ({  formData}) => {
  const data = await updateLossData(formData);
  return { requestData: { data } };
});


export const ApproveLossDataAction = createAsyncThunk<
{ requestData: {
  data: {data:any,total:number};
} },
  {
     id:number,
     StaffJobRole : string,
     InternalBusLine : string,
     BaselEventTypeI : string,
     BaselEventTypeII : string,
     BaselEventTypeIII : string,
     BaselLevel1BusinessLine : string,
     BaselLevel2BusinessLine : string,
     RootCauseTypeBORM : string,
     ProcessInvolved : string,
     RiskSource : string,
     LessonLearnt : string,
     ReportStatus : string,
    //  ReviewerComments : string,
     ModifiedById : number
     ;}
>("loss/updatelossdataborm", async ({
  id,
  StaffJobRole,
  InternalBusLine,
  BaselEventTypeI,
  BaselEventTypeII,
  BaselEventTypeIII,
  BaselLevel1BusinessLine,
  BaselLevel2BusinessLine,
  RootCauseTypeBORM,
  ProcessInvolved,
  RiskSource,
  LessonLearnt,
  ReportStatus,
  // ReviewerComments,
  ModifiedById,}) => {
  const data = await UpdateLossDataBoam(
    id,
  StaffJobRole,
  InternalBusLine,
  BaselEventTypeI,
  BaselEventTypeII,
  BaselEventTypeIII,
  BaselLevel1BusinessLine,
  BaselLevel2BusinessLine,
  RootCauseTypeBORM,
  ProcessInvolved,
  RiskSource,
  LessonLearnt,
  ReportStatus,
  // ReviewerComments,
  ModifiedById,
    );
  return { requestData: { data } };
});

export const updateApprovalStatusLossData= createAsyncThunk<
{ requestData: {
  data: {data:any,total:number};
} },
{ id:number,action:string, reviewerComments:string, approvedById:number}

>("loss/approvelossdataborm", async ({
  id,action, reviewerComments, approvedById}) => {
  const data = await updateApprovalStatusLossDataApi(id,action, reviewerComments, approvedById );
  return { requestData: { data } };
});