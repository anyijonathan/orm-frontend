import { apiClient, config } from ".";

/**
  * <summary>
  * GetRequestDetailById: fetches the Requested Details based on id for the selected start dates and min dates
  * GetExportTransactionDetails: fetches the Transaction details for selected dates
  * GetTransactionDetails: fetches the details based on start date and end dates
  * </summary>
  * <param name="PageNumber, requestId,minDate,maxDate">
  * </param> 
  * <returns>
  *  The Response is returned 
  * </returns> 
  */
export const GetRequestDetailById = async (PageNumber:number,requestId?:string,minDate?:string,maxDate?:string) => {
  let uri ='stprequests/requestdetailbyid?RequestId='+requestId+'&FromDate='+minDate+'&ToDate='+maxDate+'&PageNumber='+PageNumber+'&PageSize='+10+'&Paginate=true'
  const response = await apiClient.get(uri,config);
  return response.data;
};


export const GetExportTransactionDetails = async (minDate?:string,maxDate?:string) => {
  let uri ='stprequests/getexporttransactiondetails?FromDate='+minDate+'&ToDate='+maxDate+''
  const response = await apiClient.get(uri,config);
  return response.data;
};

export const GetTransactionDetails = async (PageNumber:number,status?:string[],minDate?:string,maxDate?:string) => {
  let statusParams="";
  if (status) {
    for (let st of status) {
      statusParams += "Status=" + st.trim() + "&"
    }
  }

  let uri ='stprequests/gettransactiondetails?'+statusParams+'FromDate='+minDate+'&ToDate='+maxDate+'&PageNumber='+PageNumber+'&PageSize='+10+'&Paginate=true'
  const response = await apiClient.get(uri,config);
  return response.data;
};

export const GetSearchTransactionDetails = async (PageNumber:number,FieldName?:string, QueryText?:string,minDate?:string,maxDate?:string,isExport?:string) => {
 let pageSize = 10;
 if(isExport == "Export"){
  pageSize = 99999;
 }

  let uri ='stprequests/getsearchresult?FieldName='+FieldName+'&QueryText='+QueryText+'&FromDate='+minDate+'&ToDate='+maxDate+'&PageNumber='+PageNumber+'&PageSize='+pageSize+'&Paginate=true'
  const response = await apiClient.get(uri,config);
  return response.data;
};

export const UpdateResponseCodeByTrnsRefNo = async (TransRefNo: string,requestId: string,responsecode: string,payername:string,cracctno:string,dracctno:string,retryCount:number) => {
  try{
  const response = await apiClient.post("stprequests/retry", {
    TransRefNo: TransRefNo,
    requestId: requestId,
    responsecode: responsecode,
    payername:payername,
    cracctno:cracctno,
    dracctno:dracctno,
    retryCount:retryCount
  },config);
  return response.data;
}catch(ex){
  return "400"
}  
};

export const createCategory = async (stan:string,requestId:string,transRefNo:string,lastResponseCode:string) => {
  try{
    let url= 'stprequests/getRequeryResult?stan=' +stan+ '&requestId=' +requestId+ '&transRefNo='+transRefNo + '&lastResponseCode=' +lastResponseCode
  const response = await apiClient.get(url,config);
  return response.data;
}catch(ex){
  return "400"
}  
};

export const UpdateResponseCodeByRefresh = async (stan:string,requestId:string,transRefNo:string,lastResponseCode:string) => {
  try{
    let url= 'stprequests/getRequeryResult?stan=' +stan+ '&requestId=' +requestId+ '&transRefNo='+transRefNo + '&lastResponseCode=' +lastResponseCode
  const response = await apiClient.get(url,config);
  return response.data;
}catch(ex){
  return "400"
}  
};
