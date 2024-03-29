import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import FieldInputText from "../atoms/FieldInputText";
import {
  Dropdown,
  DropdownContentContaner,
  SelectDropDown,
} from "../../DropDown";
import { CalendarIcon } from "@mui/x-date-pickers";
// import { DateRangePicker } from "@mui/lab";
import { Button, IconButton } from "../../../Components/Buttons";
import { DateRangePicker } from "../../../Components/DatePicker/rangePicker";
import { PageHeader, VerticalSpacer } from "../../PageShared";
import { AtmOutlined, MarginOutlined } from "@mui/icons-material";
import { useAppDispatch } from "../../../Services/Store/hooks";
import { getMetricsData, updateNewKriMetricsAction } from "../../../Services/Actions/kriAction";
import { useNavigate } from "react-router-dom";
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";

const FormOne = (props:any)=> {  
  const [formData, setFormData] = useState({
  kriId:0,
  kriMasterId: 0,
  amountInvolved: '',
  NumberPercentage: '',
  mitigationPlan:'',
  detailDescription:'',
  dateOccurance:'',
  kriMetricId:'',
  metrics:'',
  currency:"NGN",
  Frequency : '',
  AppetiteLowerBound : '',
  AppetiteUpperBound : '',
  AppetiteType : '',
  ToleranceLowerBound : '',
  ToleranceUpperBound : '',
  ToleranceType : '',
  EscalationLowerBound : '',
  EscalationUpperBound : '',
  EscalationType : '',
  RiskAppetiteThreshold : '',
});
  const step=props.step;
  const data= props?.data[1]?.data[0]?.options;
  const Kris= props?.data[0]?.Kris;
  const RefNo= props?.kriRef;
  const kriReportId= props?.kriReportId;
  const metricId= props?.metricIds;
  let kriTitle="";
  let kriMasterId=0;
  const [metricIds,setMetricIds] = useState<number[]>([])
  const [currencyOpen,setCurrencyOpen] = useState(false)
  const [currency,setCurrency] = useState("NGN")
  const [btnTitle,setBtnTitle] = useState("Save & Next")
  const [dateOfOccurrence,setDateOfOccurrence] = useState<string>("")
  const [appType,setAppType] = useState<string>("")
  const [appTypePlaceHolder,setAppTypePlaceHolder] = useState<string>("")
  
   
   
  
  
  const [appetiteLowerBound,setAppetiteLowerBound] = useState<string>("")
  const [toleranceLowerBound,setToleranceLowerBound] = useState<string>("")
  const [escalationLowerBound,setEscalationLowerBound] = useState<string>("")
  const [appetiteUpperBound,setAppetiteUpperBound] = useState<string>("")
  const [toleranceUpperBound,setToleranceUpperBound] = useState<string>("")
  const [maxDateOfOccurance,setMaxDateOfOccurance] = useState<Date | undefined>(new Date())

  // useEffect(()=>{
  //   setMetricIds(metricId);
  //   fetchData(metricId);
  // },[]);
  useEffect(()=>{
    fetchData(metricId);
    if(step==metricId.length){
      setBtnTitle("Save & Preview");
    }else{
      setBtnTitle("Save & Next");
    }
  },[step]);

  const fetchData = async(metricId:number[])=>{
    const id= metricId[step-1]
    await dispatch(getMetricsData({id})).then((res:any)=>{
      const result= res.payload?.requestData?.data?.data[0];
      kriTitle= result.kriMetricTitle;
      kriMasterId= result.kriMetricMasterId;

      setFormData({
        kriId:result.kriReportId,
        kriMasterId: result.kriMetricMasterId,
        amountInvolved: result.amountInvolved,
        NumberPercentage: result.kriData,
        mitigationPlan:result.mitigationPlan,
        detailDescription:result.description,
        dateOccurance:result.dateOccurance,
        kriMetricId:result.metricId,
        metrics:result.kriMetricTitle,
        currency:result.currency,
        Frequency : result.Frequency,
        AppetiteLowerBound : result.appetiteLowerBound,
        AppetiteUpperBound : result.appetiteUpperBound,
        AppetiteType : result.appetiteType,
        ToleranceLowerBound : result.toleranceLowerBound,
        ToleranceUpperBound : result.toleranceUpperBound,
        ToleranceType : result.toleranceType,
        EscalationLowerBound : result.escalationLowerBound,
        EscalationUpperBound : result.escalationUpperBound,
        EscalationType : result.escalationType,
        RiskAppetiteThreshold : result.riskAppetiteThreshold,
     });
     setDateOfOccurrence(result.dateOccurance.toString().substring(0,10));
     setAppType(result.appetiteType.includes("N") ? "Number" : "Percentage");
     setAppTypePlaceHolder(result.appetiteType.includes("N") ? "Enter Number" : "Enter Percentage");
     setAppetiteLowerBound(result.appetiteLowerBound);
     setAppetiteUpperBound(result.appetiteUpperBound);
     setToleranceLowerBound(result.toleranceLowerBound);
     setToleranceUpperBound(result.toleranceUpperBound);
     setEscalationLowerBound(result.escalationLowerBound);
     setMaxDateOfOccurance(InputFrequency(result.reportingPeriod));
     setCurrency(result.currency);
    });
  }

  function getLastDayOfMonth(year: number, month: number): Date {
    // Create a Date object set to the first day of the next month
    const firstDayOfNextMonth = new Date(year, month, 1);
  
    // Subtract one day to get the last day of the current month
    const lastDayOfCurrentMonth = new Date(firstDayOfNextMonth.getTime() - 1);
  
    // Format the date as DD/MM/YYYY
    const day = lastDayOfCurrentMonth.getDate();
    const date = day.toString();
    const formattedDay:number = parseInt(date); 
    const formattedMonth:number = parseInt((lastDayOfCurrentMonth.getMonth()).toString(),10);
    const formattedYear:number =  parseInt(lastDayOfCurrentMonth.getFullYear().toString());
  
    return new Date(formattedYear,formattedMonth,formattedDay);
  }

  const InputFrequency = (fre:string) => {
    let maxDate = new Date();
    let input:string = fre.substring(0,2);
    let maxYear:number;
    if(!(fre.includes("Q" || "H")) && fre.length > 4){
      maxYear = parseInt(fre.substring(3,7),10);
      let month :number= parseInt(fre.substring(0,2),10); 
      maxDate = getLastDayOfMonth(maxYear, month);

      return maxDate;
    }
    if(fre.includes("Q" || "H")){
      switch(input){
        case "Q1":
           maxYear = parseInt(fre.substring(3,7),10);
          maxDate = new Date(maxYear, 3, 31);
          break;
          case "Q2":
           maxYear = parseInt(fre.substring(3,7),10);
          maxDate = new Date(maxYear, 6, 30);
          break;
          case "Q3":
           maxYear = parseInt(fre.substring(3,7),10);
          maxDate = new Date(maxYear, 9, 30);
          break;
          case "Q4":
           maxYear = parseInt(fre.substring(3,7),10);
          maxDate = new Date(maxYear, 12, 31);
          break;
          case "H1":
           maxYear = parseInt(fre.substring(3,7),10);
          maxDate = new Date(maxYear, 6, 30);
          break;
          case "H2":
           maxYear = parseInt(fre.substring(3,7),10);
          maxDate = new Date(maxYear, 12, 31);
          break;
      }
      return maxDate;
    }
    if(fre.length==4){
      const maxYearNumber = parseInt(fre, 10);
      maxDate = new Date(maxYearNumber, 11, 31);
      return maxDate;
    }
    // setDateOfOccurrence(maxDate.toISOString().toString());
    return maxDate;
  }

const[savedMetricId,setSavedMetricId] = useState(0);
  const dispatch = useAppDispatch();
const [ savedRecordId, setSavedRecordId] = useState<any[]>([]);
let SavedRecord:any[]=[];
  const handleInputChange = (e:any) => {
    
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };
const [ preview,setPreview ]=useState(false);
const navigate = useNavigate();

  const HandleSave = async() =>{
    console.log(formData);
    let idx=0;
    await dispatch( 
      updateNewKriMetricsAction({ 
        MasterId : formData.kriMasterId,
        ReportId : kriReportId,
        metricId: formData.kriMetricId,
        DateOccurance : formData.dateOccurance,
        Description : formData.detailDescription,
        AmountInvolved : formData.amountInvolved,
        Currency : currency,
        MitigationPlan : formData.mitigationPlan,
        NumberPercentage : formData.NumberPercentage,
        RiskAppetiteThreshold: "",
       })  
    ) .then((response:any) => {
     const result= response?.payload?.requestData?.data.data;
     if(result.code==="00"){
      console.log(result.data[0].id);
      setSavedMetricId((p) => p=result.data[0].id);
      idx=result.data[0].id;
      setSavedRecordId(prevState => [...prevState, result.data[0].id]);
     }
    
  });
 
  if(step==metricId.length){
       setFormData(
        {
          ...formData,
          ['kriId']:0,
        ['kriMasterId']:0,
        ['amountInvolved']: '',
        ['NumberPercentage']: '',
        ['mitigationPlan']:'',
        ['detailDescription']:'',
        ['dateOccurance']:'',
        ['kriMetricId']:'',
        ['metrics']:'',
        ['currency']:currency,
        ['RiskAppetiteThreshold']: '',
     });
     let savedMetricIds:any[]=[];
     if(savedRecordId.length ==0){
       savedMetricIds.push(idx);
     }else{
       savedMetricIds= savedRecordId;
     }
     const url='/preview-kri-department';
    navigate(`/admin${url}`,{
    state: [savedMetricIds]
});
setPreview(true)
  }
  }
const handleCreateKriData = () => {
  const url='/preview-kri-department';
   navigate(`/admin${url}`,{
   state: [savedRecordId]
});
};

const AddDateOfOccurance =(event:any) => {
  setDateOfOccurrence(event?.target?.value)
}
const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));
const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
          <>
              <VerticalSpacer size={20} />
              <h5>{step} . {formData.metrics}</h5>
              <VerticalSpacer size={20} />
              <div className="row">
                <div className="col-3">
                  <div className="form-group">
                    <label htmlFor="">Date of Occurrence:</label>
                    <div>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Select From Date"
                  onChange={AddDateOfOccurance}
                  value={dateOfOccurrence}
                  max={maxDateOfOccurance?.toLocaleString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                  required
                ></input>
              </div>
                  </div>
                </div>

                <div className="col-3">
                <div className="form-group">
                  <label htmlFor="">{appType}:</label>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      id=""
                      placeholder="Enter"
                      name="NumberPercentage"
                      // onChange={(event)=>SetPercentageIn(event)}
                      // value={percentageInput}
                      // onClick={() => exportExcel()}
                      onFocus={() => setIsVisible(!isVisible)}
                      onBlur={() => setIsVisible(!isVisible)}
                      value={formData.NumberPercentage}
                      onChange={handleInputChange}
                      required
                      style={{ textAlign: "right",}}
                    />
                   {appType == "Percentage" && <span className="input-group-text">%</span>}
                  </div>
                  
                {isVisible && (<div>
                  <p className="rpTextHint">
                    {appetiteLowerBound === appetiteUpperBound && <span>Appetite: {appetiteLowerBound}</span>}
                    {appetiteLowerBound !== appetiteUpperBound && <span>Appetite: {appetiteLowerBound}-{appetiteUpperBound}</span>}
                    {toleranceLowerBound === toleranceUpperBound && <span>, Tolerance: {toleranceLowerBound}</span>}
                    {toleranceLowerBound !== toleranceUpperBound && <span>, Tolerance: {toleranceLowerBound}-{toleranceUpperBound}</span>}
                    <span>, Escalation: {escalationLowerBound}</span>
                                        
                  </p>
                  </div>
                )}
                </div>
                </div>
                <div className="col-3">
                <div className="form-group">
                    <label htmlFor="">Amount Involved:</label>
                    <div className="input-group">
                    
                    <SelectDropDown
                setOpen={setCurrencyOpen}
                open={currencyOpen}
                onChange={(value) => setCurrency(value)}
                // placeholder="Curency"
                selectedValue={currency}
                options={[
                  { label: "NGN", value: "NGN" },
                  { label: "USD", value: "USD" },
                  { label: "GBP", value: "GBP" },
                  { label: "EURO", value: "EURO" },
                ]}
                />
                <input
                      type="number"
                      className="form-control"
                      id=""
                      // onChange={(event)=>SetAmount(event)}
                      placeholder="Enter"
                      name="amountInvolved"
                      // value={amountInvolved}
                      value={formData.amountInvolved}
                      onChange={handleInputChange}
                      required
              />
            </div>
          </div>          
                </div>
                
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="">Mitigation Plan</label>
                    <textarea
                      className=""
                      id=""
                      name="mitigationPlan"
                      // onChange={(event)=>setMitigationPlan(event?.target.value)}
                      rows={4}
                      placeholder="Enter Description"
                      // value={mitigationPlan}
                      value={formData.mitigationPlan}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="">Detailed Description Of Incident</label>
                    <textarea
                      className=""
                      id=""
                      name="detailDescription"
                      rows={4}
                      // onChange={(event)=>setDetailDescription(event?.target.value)}
                      placeholder="Enter Description"
                      // value={detailDescription}
                      value={formData.detailDescription}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            <div className="saveNextBtn">
              <Button type="submit" variant="contained" onClick={HandleSave}
              disabled={dateOfOccurrence == "" || formData.amountInvolved == '' ||  formData.NumberPercentage == '' ||  formData.mitigationPlan == '' ||  formData.detailDescription == '' }  
              
                >{btnTitle}</Button>
            </div>
              
                  
          </> 
    </div>
    
  );
}

export default FormOne;
