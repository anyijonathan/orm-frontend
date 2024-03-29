import { apiClient, config } from ".";

export const CreateRCSAApi = async (
    formData:any) => {
    try{
    const response = await apiClient.post("/risk/createriskreport", formData);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const GetDocumentApi = async (
    id:number) => {
    try{
    const response = await apiClient.get('/risk/getriskdoc?id='+id, config);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const SubmitRCSAApi = async (
    formData:any) => {
    try{
    const response = await apiClient.post("/risk/editriskreport", formData);
    return response.data;
  }catch(ex){
    return "400"
  }  
  };

  export const ApproveRiskReportApi = async (
    id: number,
    riskClassification:string,
        riskCategory: string,
        riskRootCause: string,
        riskActionPlanStatus: string,
        riskExpectedResolutionTime: Date,
        riskStrategy: string,
        reportStatus: string,
        modifiedById: number
  ) => {
    try{
      let uri ='risk/updateriskreport'
    const response = await apiClient.post(uri,
      {
        id:id,
        riskClassification:riskClassification,
        riskCategory:riskCategory,
        riskRootCause:riskRootCause,
        riskActionPlanStatus:riskActionPlanStatus,
        riskExpectedResolutionTime:riskExpectedResolutionTime,
        riskStrategy:riskStrategy,
        reportStatus:reportStatus,
        modifiedById:modifiedById
      }
      ,config
    );
    return response.data;
  }catch(ex){
    return "400"
  }  

};

  export const RejReqRiskReportApi = async (
    id: number,
    updateRequestStatus: string,
    reviewerComments:string,
    reportStatus: string,
    modifiedById: number 
  ) => {
    try{
      let uri ='risk/updateriskreportstatus'
    const response = await apiClient.post(uri,
      {
        id:id,
        updateRequestStatus:updateRequestStatus,
        reviewerComments:reviewerComments,
        reportStatus:reportStatus,
        modifiedById:modifiedById
      }
      ,config
    );
    return response.data;
  }catch(ex){
    return "400"
  } 

  };  
  
  export const RCSAGridDataApi = async (
    locationId:number,refNum: string,
     branch: string, 
     region:string,
     department:string,
      reportStatus:string, 
      minDate:string, 
      maxDate:string,
       pageNumber:number,
       isExport:boolean
  ) => {
    try{
      let pageSize:number= 10;
      if(isExport){
        pageSize=999999;
      }else{
        pageSize=10
      }
      let uri ='risk/getriskreportlist?locationId='+locationId+'&refNum='+refNum+'&branch='+branch+'&region='+region+'&department='+department+'&reportStatus='+reportStatus+'&minDate='+minDate+'&maxDate='+maxDate+'&pageNumber='+pageNumber+'&PageSize='+pageSize+'&Paginate=true';
    const response = await apiClient.get(uri,config
    );
    return response.data;
  }catch(ex){
    return "400"
  }  
  };