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
export const createKriData = async (email: string) => {
    try{
    const response = await apiClient.post("/auth/createKriData", {
      email: email,
    },config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const updateKriData = async (email: string) => {
    try{
    const response = await apiClient.post("/auth/updateKirData", {
      email: email,
    },config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };
  export const kriDataDetails = async (locationId:string,refNo?:string,branch?:string,status?:string, PageNumber?:number, minDate?:string,maxDate?:string, IsExport?:boolean) => {
    try{ 
      let pagesize= 10; 
      if(IsExport){
        pagesize=99999;
      }
        
    let uri ='kri/getkrigridData?locationId='+locationId+'&refNo='+refNo+'&branch='+branch+'&status='+status+'&minDate='+minDate+'&maxDate='+maxDate+'&pageNumber='+PageNumber+'&PageSize='+pagesize+'&Paginate=true';
    const response = await apiClient.get(uri,config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const kriGridDataDetails = async (locationId?:number,refNo?:string,branch?:string,department?:string,status?:string, PageNumber?:number, minDate?:string,maxDate?:string, IsExport?:boolean) => {
    try{ 
      let pagesize= 10; 
      if(IsExport){
        pagesize=99999;
      }
        
    let uri ='kri/getKriGridReportData?locationId='+locationId+'&refNo='+refNo+'&branch='+branch+'&department='+department+'&status='+status+'&minDate='+minDate+'&maxDate='+maxDate+'&pageNumber='+PageNumber+'&PageSize='+pagesize+'&Paginate=true';
    const response = await apiClient.get(uri,config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const getPreviewKriApi = async (ids:number[],rids:number[]) => {
    try{
      // let uri ='kri/getPreviewKri?'
      let param="";
      // for(let i=0;i<ids.length;i++){
        // if(i==0){
         param +=  "ids=" + ids[0]
        // }
        // else{
        //  param +=  "&ids=" + ids[i] 
        // }
      //  }
      //  for(let i=0;i<rids.length;i++){
        // if(ids.length==0){
         param +=  "&rids=" + rids[0]
        // }
        // else{
        //  param +=  "&rids=" + rids[i] 
        // }
      //  } 
     let uri ='kri/getpreviewkriapi?' + param
    const response = await apiClient.get(uri,config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const getDetailviewKriApi = async (ids:number[]) => {
    try{
      let param="";
        param +=  "ids=" + ids
     let uri ='kri/getDetailKriApi?' + param
    const response = await apiClient.get(uri,config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const getMetricDataApi = async (id:number) => {
    try{
      let param="";
        param +=  "id=" + id
     let uri ='kri/getmetricdataapi?' + param
    const response = await apiClient.get(uri,config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const removeMetricApi = async (id:number) => {
    try{
      let param="";
        param +=  "id=" + id
     let uri ='kri/removemetric?' + param
    const response = await apiClient.get(uri,config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const updatePreviewKriApi = async (id:number) => {
    try{
     let uri ='kri/updatePreviewKriApi?id=' + id
    const response = await apiClient.get(uri,config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const updateFinalKriApi = async (id:number,
    status:string,
    comments:string,
    approvedByid:number) => {
    try{
     let uri ='kri/updateFinalKriApi' 
    const response = await apiClient.post(uri,{
      id:id,
    status:status,
    comments:comments,
    approvedByid:approvedByid
    },config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const newKriDataApi = async (locationType: string, locationId: number, frequecy:string ) => {
    try{ 
    let uri ='kri/getnewkridata?locationType='+locationType+ '&locationId='+locationId+ '&frequecy='+frequecy ;
    const response = await apiClient.get(uri,config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const deleteKriReportApi = async (id: number ) => {
    try{ 
    let uri ='kri/deleteKriReportApi?id='+id;
    const response = await apiClient.get(uri,config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const EditKriDataApi = async (id: number, loc:number ) => {
    try{ 
    let uri ='kri/geteditkridata?id='+id+ '&loc='+loc;
    const response = await apiClient.get(uri,config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const createNewKriReportApi = async (refNum:number,frequecy:string,reportingPeriod:string,dateOfOccurance:Date,locationId:number,locationType:string,status:string, createdById: number, kris:number[], removeKris:number[] , ValidatorILOUserId:number) => {
    try{
    const response = await apiClient.post("kri/postnewkri", { 
      refNum:refNum,
      reportingFrequency:frequecy,
      reportingPeriod:reportingPeriod,
      dateOfOccurance:dateOfOccurance,
      locationId:locationId,
      locationType:locationType,
      status:status,
      createdById:createdById,
      kris:kris,
      removeKris:removeKris,
      ValidatorILOUserId:ValidatorILOUserId
     },config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };


  export const updateKriReportApi = async (allData:any ) => {
    try{ 
    let uri ='kri/updatekridata'
    const response = await apiClient.post(uri,{allData},config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };


  export const updateNewKriMetricsApi = async (
    MasterId : number,
    ReportId : number,
    metricId : number,
    DateOccurance : Date,
    Description : string,
    AmountInvolved : string,
    Currency : string,
    MitigationPlan : string,
    NumberPercentage : string,
    RiskAppetiteThreshold: string
     ) => {
    try{ 
    let uri ='kri/postkrireport'
    const response = await apiClient.post(uri,{
      masterId:MasterId,
      reportId:ReportId,
      metricId:metricId,
      DateOccurance:DateOccurance,
      Description:Description,
      AmountInvolved:AmountInvolved,
      Currency:Currency,
      MitigationPlan:MitigationPlan,
      NumberPercentage:NumberPercentage,
      RiskAppetiteThreshold:RiskAppetiteThreshold
    },config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };