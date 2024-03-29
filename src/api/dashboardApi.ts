import { apiClient, config } from ".";

/**
  * <summary>
  * Fetches the  data for transactions and pie chart based on selected from date and end Date
  * </summary>
  * <param name="PageNumber,minDate, maxDate ">
  * </param> 
  * <returns>
  * Transaction data pie chart data
  * </returns> 
  */


export const lossDataDashboadTrendApi = async (baselEventType1:string, months:number, year:number) => {
  try{
    const monthsQueryString = generateMonthsQueryString(months);
    const uri = `dashboard/getlossdatatrend?baselEventType1=${baselEventType1}&${monthsQueryString}&year=${year}`;
    const response = await apiClient.get(uri,config);
  return response.data
}catch(ex){
  return "400"
}  
};
export const lossDataDashboadRDdApi = async (baselEventType1:string, months:number, year:number) => {
  try{
    const monthsQueryString = generateMonthsQueryString(months);
    const uri = `dashboard/getregionalinternalfraud?baselEventType1=${baselEventType1}&${monthsQueryString}&year=${year}`;
    const response = await apiClient.get(uri,config);
  return response.data
}catch(ex){
  return "400"
}  
};
const generateMonthsQueryString = (months: number): string => {
  const monthsArray = Array.from({ length: months }, (_, index) => index + 1);
  return monthsArray.map(month => `months=${month}`).join('&');
};

export const OperationalRiskApi = async (baselEventType1:string, months:number, year:number) => {
  try{
    const monthsQueryString = generateMonthsQueryString(months);
    const uri = `dashboard/getoperationalrisklosses?baselEventType1=${baselEventType1}&${monthsQueryString}&year=${year}`;
    const response = await apiClient.get(uri,config);
  return response.data
}catch(ex){
  return "400"
}  
};

export const RootCauseApi = async (baselEventType1:string, months:number, year:number) => {
  try{
    const monthsQueryString = generateMonthsQueryString(months);
    const uri = `dashboard/getrootcauseanalysisforactualloss?baselEventType1=${baselEventType1}&${monthsQueryString}&year=${year}`;
    const response = await apiClient.get(uri,config);
  return response.data
}catch(ex){
  return "400"
}  
};

export const GrossLossApi = async (baselEventType1:string, months:number, year:number) => {
  try{
    const monthsQueryString = generateMonthsQueryString(months);
    const uri = `dashboard/getgrossvsrecoveryvsnetloss?baselEventType1=${baselEventType1}&${monthsQueryString}&year=${year}`;
    const response = await apiClient.get(uri,config);
  return response.data
}catch(ex){
  return "400"
}  
};
export const RiskReportApi = async (locationId:number,locationType:string, months:number, year:number) => {
  try{
    const monthsQueryString = generateMonthsQueryString(months);
    const uri = `dashboard/riskreports?locationId=${locationId}&locationType=${locationType}&${monthsQueryString}&year=${year}`;
    const response = await apiClient.get(uri,config);
  return response.data
}catch(ex){
  return "400"
}  
};

export const KycKriApi = async (metricMasterIds:string, months:number, year:number) => {
  try{
    const metric1=6;
    const metric2=10;
    const monthsQueryString = generateMonthsQueryString(months);
    const uri = `dashboard/getkyccompliance?metricMasterIds=${metric1}&metricMasterIds=${metric2}&${monthsQueryString}&year=${year}`;
    const response = await apiClient.get(uri,config);
  return response.data
}catch(ex){
  return "400"
}  
};

export const KriIndicatorsApi = async (locationId:number, months:number, year:number) => {
  try{
    // const monthsQueryString = generateMonthsQueryString(months);
    const uri = `dashboard/getkeyriskindicator?locationId=${locationId}&months=&${months}&year=${year}`;
    const response = await apiClient.get(uri,config);
  return response.data
}catch(ex){
  return "400"
}  
};

export const CctvKriApi = async (metricMasterIds:string, months:number, year:number) => {
  try{
    const metric1=6;
    const metric2=10;
    const monthsQueryString = generateMonthsQueryString(months);
    const uri = `dashboard/getnonfunctionalcctvandpatches?metricMasterIds=${metric1}&metricMasterIds=${metric2}&${monthsQueryString}&year=${year}`;
    const response = await apiClient.get(uri,config);
  return response.data
}catch(ex){
  return "400"
}  
};

export const getpieChartData = async (baselEventType1:string, months:number,year:number) => {
  try{
  const response = await apiClient.get("dashboard/getpiechartdata",config);
  return response.data
}catch(ex){
  return "400"
}
}



