import { apiClient, config } from ".";

/**
  * <summary>
  *  get the otp from the backend and validates the otp after taking code from user
  * </summary>
  * <param name="email, otp">
  * </param> 
  * <returns>
  * returns OTP and validates the OTP
  * </returns> 
  */
// export const CreateLossData = async (
//   locationType: string,
//   locationId: number,
//   validatorILOUserId: number,
//   dateOccurance: Date,
//   dateDiscovery: Date,
//   dateReported: Date,
//   description: string,
//   rootCauseRLO: string,
//   lossType: string,
//   currencyType: string,
//   amountInvolved: number,
//   nearMissAmount: number,
//   potentialLossAmount: number,
//   grossActualAmount: number,
//   recoveredAmount: number,
//   furtherRecoveredAmount: number,
//   recoveryChannel: string,
//   staffInvolvement: string,
//   eventStatus: string,
//   reportStatus: string,
//   createdById: number) => {
//   try{
//   const response = await apiClient.post("/loss/createlossdatarlo", {
//   locationType: locationType,
//   locationId: locationId,
// validatorILOUserId:validatorILOUserId,
// dateOccurance:dateOccurance,
// dateDiscovery:dateDiscovery,
// dateReported:dateReported,
// description:description,
// rootCauseRLO:rootCauseRLO,
// lossType:lossType,
// currencyType:currencyType,
// amountInvolved:amountInvolved,
// nearMissAmount:nearMissAmount,
// potentialLossAmount:potentialLossAmount,
// grossActualAmount:grossActualAmount,
// recoveredAmount:recoveredAmount,
// furtherRecoveredAmount:furtherRecoveredAmount,
// recoveryChannel:recoveryChannel,
// staffInvolvement:staffInvolvement,
// eventStatus:eventStatus,
// reportStatus:reportStatus,
// createdById:createdById
//   },config);
//   return response.data;
// }catch(ex){
//   return "400"
// }  
// };
  

export const CreateLossData = async (
  formData:any
    ) => {
    try{
    const response = await apiClient.post("/loss/createlossdatarlo", formData);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };
  

  export const updateLossData = async (  formData: any) => {
    try{
    const response = await apiClient.post("/loss/updatelossdatarlo", formData);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const updateApprovalStatusLossDataApi = async (id:number,action:string, reviewerComments:string, approvedById:number) => {
    try{
    const response = await apiClient.post("/loss/approvelossdataborm", {
      id:id,action:action, reviewerComments:reviewerComments, approvedById:approvedById
    },config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const lossDataDetails = async (locationId: number,refNo:string,branch:string,region:string,department:string,eventStatus:string,reportStatus:string,pageNumber: number,minDate:Date, maxDate:Date, isexport:boolean) => {
    try{
      let pageSize:number= 10;
      if(isexport){
        pageSize=999999;
      }else{
        pageSize=10
      }
      let uri ='loss/getlossgriddata?locationId='+locationId+'&refNo='+refNo+'&branch='+branch+'&region='+region+'&department='+department+'&eventStatus='+eventStatus+'&reportStatus='+reportStatus+'&minDate='+minDate+'&maxDate='+maxDate+'&pageNumber='+pageNumber+'&PageSize='+pageSize+'&Paginate=true';
    const response = await apiClient.get(uri,config
    );
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const getAllLossApi = async (id: number) => {
    try{
      
      let uri ='loss/GetFullLossDataBySingleId?id='+id;
    const response = await apiClient.get(uri,config
    );
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const UpdateLossDataBoam = async ( 
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
     ModifiedById : number) => {
    try{
    const response = await apiClient.post("/loss/updatelossdataborm", {
      id:id,
      StaffJobRole : StaffJobRole,
      InternalBusLine : InternalBusLine,
      BaselEventTypeI : BaselEventTypeI,
      BaselEventTypeII : BaselEventTypeII,
      BaselEventTypeIII : BaselEventTypeIII,
      BaselLevel1BusinessLine : BaselLevel1BusinessLine,
      BaselLevel2BusinessLine : BaselLevel2BusinessLine,
      RootCauseTypeBORM : RootCauseTypeBORM,
      ProcessInvolved : ProcessInvolved,
      RiskSource : RiskSource,
      LessonLearnt : LessonLearnt,
      ReportStatus : ReportStatus,
      // ReviewerComments : ReviewerComments,
      ModifiedById : ModifiedById
    },config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };