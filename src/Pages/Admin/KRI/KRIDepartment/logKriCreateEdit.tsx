import { useEffect, useId, useState } from "react";
import { BackButton, Button, CancelButton, IconButton } from "../../../../Components/Buttons";
import {
  Divider,
  HorizontalSpacer,
  PageHeader,
  VerticalSpacer,
} from "../../../../Components/PageShared";
import "../../../../Assets/Styles/global.scss";
import styles from "../../../../Assets/Styles/pageShared.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import 'react-dual-listbox/lib/react-dual-listbox.css';
import { useAppDispatch, useAppStateSelector } from "../../../../Services/Store/hooks";
import { createNewKriReportAction, getEditKriReportAction, getMetricsData, getNewKriReportAction, getPreviewKriAction, removeMetricAction, updateNewKriMetricsAction } from "../../../../Services/Actions/kriAction";
import { Radio } from "../../../../Components/Radio";
import { SelectDropDown } from "../../../../Components/DropDown";
import { MinusRed } from "../../../../Layouts/Sidebar/icons";
import Metric from "./metric";
import { addKriDDData , addKrimetrics} from "../../../../Services/Reducers/kriDataSlice";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../../../Components/Input/input";
import { colors } from "@mui/material";
import AlertBox from "../../../../Components/PageShared/Admin/Alert/alert";
import { isUndefined } from "lodash";
import { getuserbyrolelocationAction } from "../../../../Services/Actions/userAction";


const LogKriCreateEdit = () => {
  const schema = yup.object().shape({

    detailDescription: yup.string().required("Enter a valid Description"),
    mitigationPlan: yup.string().required("Enter a valid Plan"),
    amountInvolved: yup.number().positive().required("Enter a valid amount"),
    NumberPercentage: yup.number().positive().integer().required("Enter a valid input"),
  
  });
const { register, handleSubmit, formState: {errors}} = useForm(
  {
    resolver:yupResolver(schema)
  }
);

  let [formData, setFormData] = useState({
    kriId:0,
    kriMasterId: 0,
    amountInvolved: '',
    NumberPercentage: '',
    mitigationPlan:'',
    detailDescription:'',
    dateOccurance:'',
    kriMetricId:0,
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
  const dispatch = useAppDispatch();
  const [ options, setOptions ]= useState<any>([]);
  const [ allData, setAllData ]= useState<any>([]);
  const authState:any = useAppStateSelector((state) => state.authState)
  const { state } = useLocation();
  const [reportId, setReportId] = useState(0);
  const regex = /^(0[1-9]|1[0-2])\/\d{4}$/;
  const [ pageTitle, setPageTitle ] = useState("");
  const [ pageSubTitle, setPageSubTitle ] = useState("");
  const [OpenSelectKriMetric, setOpenSelectKriMetric] = useState(false);
  const [selectKriMetric, setSelectKriMetric] = useState("");
  const [filledKri, setFilledKri] = useState<any>([]);
  const [initialDropdown, setInitialDropdown] = useState<any>([]);
  const [icoUser, setIcoUser] = useState<any>([]);
  const [dateOfOccurrence,setDateOfOccurrence] = useState<string>("")
const [errorMessage, setErrorMessage] = useState("")
  const AddDateOfOccurance =(event:any) => {
    setDateOfOccurrence(event?.target?.value)
  }
let mode="";
  useEffect(() => {    
    getico();
      if(state && state[1]) {
        const recordId = state[0].id;
        setReportId(state[0].id);
        const locId = state[1].loc;
        mode =  state[2]?.mode;
        fetchEditData(recordId, locId);
        if(mode==="edit"){
          setPageTitle("Edit KRI Report");
          setPageSubTitle("Edit KRI Detail");
        }
      }else{
        fetchData(frequecy,[]); 
        setPageTitle("Create KRI Report");
        setPageSubTitle("Create KRI Detail");
      }
    }, []);

    const getico=async ()=>{
      await dispatch (getuserbyrolelocationAction(
    {   LocationId:locationState?.currentLocation?.locationId,
        RoleId:0,
        RoleTitle:"ICO",
        userStatus:"Active",
        PageNumber: 1, }  
      )).then((res:any)=>{
        const result= res?.payload?.requestData?.data?.data?.data;
        const dropdownOptions = result.map((user:any) => ({
          label: user.userName,
          value: user.userId
        }));
        setIcoUser(dropdownOptions);
      })

    }

  const [ frequecy, setFrequency ] = useState("Monthly");
  const [ reportingPeriod, setReportingPeriod ] = useState("");
  const [selected, setSelected] = useState<any[]>([]);
  const [oldSelected, setOldSelected] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [addData, setAddData] = useState(false);
  const [reportingValidation, setReportingValidation] = useState(false);
  const [krireportIdNew, setKrireportIdNew] = useState<number>(0)
  const [metricIdNew, setMetricIdNew] = useState<number>(0)
  const [kriRefIdNew, setKriRefIdNew] = useState<string>("")
  const [newMetric, setNewMetric] = useState<string>("")
  const [dateOfOccurance, setDateOfOccurance] = useState<Date>(new Date())
  const [mitigationPlan, setMitigationPlan] = useState<string>("")
  const [currency, setCurrency] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [numPercentage, setNumPercentage] = useState<number>()
  const [amountInvolved, setAmountInvolved] = useState<number>()
  const [appetiteLowerBound,setAppetiteLowerBound] = useState<string>("")
  const [toleranceLowerBound,setToleranceLowerBound] = useState<string>("")
  const [escalationLowerBound,setEscalationLowerBound] = useState<string>("")
  const [appetiteUpperBound,setAppetiteUpperBound] = useState<string>("")
  const [toleranceUpperBound,setToleranceUpperBound] = useState<string>("")
  const [maxDateOfOccurance,setMaxDateOfOccurance] = useState<Date | undefined>(new Date())
  const [appType,setAppType] = useState<string>("")
  const [appTypePlaceHolder,setAppTypePlaceHolder] = useState<string>("")
  const [currencyOpen,setCurrencyOpen] = useState(false)
  const [ savedRecordId, setSavedRecordId] = useState<any[]>([]);
  let [savedMetricId,setSavedMetricId] = useState(0);
  const [ pageData, setPageData] = useState<any[]>([]);
  const [openAlertBox,setOpenAlertBox] =useState(false);
  const [openICOName,setOpenICOName] = useState(false);
  const [icoGia,setIcoGia] = useState("");
  const [icoGiaName,setIcoGiaName] = useState("");
  const locationState:any = useAppStateSelector((state) => state.locationDataState);

  const SelectReporting=(e:any)=>{
    setReportingPeriod("");
    setSelectKriMetric("");
    setReportingValidation(false);    
    fetchData(e,[])
  }

  const fetchData = async(freqcy:string, ids:any)=>{
    setFrequency(freqcy);
      await dispatch( 
        getNewKriReportAction({ locationType: locationState?.currentLocation?.locationType, locationId: locationState?.currentLocation?.locationId, frequecy: freqcy})  
      ) .then((response:any) => {
       const result= response?.payload?.requestData?.data;
       console.log(result.data);

       const data:any = result.data;
       setAllData(data);
      PreparefinalData(data, freqcy, ids)
     });
    }

    const fetchEditData = async(recordId:number, locId:number) => {
      // todo - update method...
      await dispatch( 
        getEditKriReportAction({ id: recordId, loc:locId })  
      ) .then(async (response:any) => {
       const result= response?.payload?.requestData?.data;
       console.log(result.data);
       const data:any = result.data;
       setReportingPeriod(data[0]?.reportingPeriod);
       setFrequency(data[0]?.reportingFrequency); 
       setReportingValidation(true);    
      const ids: number[] = data.map((item:any) => item.id);
      setSelected(ids);
      setOldSelected(ids);
      await fetchData(data[0]?.reportingFrequency, ids);
      });
    }

    const PreparefinalData =(xata:any, freq:string, ids:any[]) =>{
    let Data:any[]=[];
      if(state && state.length > 1 && state[2]?.mode === "edit"){
        Data = xata.filter((item:any) => !ids.includes(item.id));
        fetchSavedKriData([],[state[0].id]);

      }else{
        Data=xata;
      }
       
      // }
      const groupedData = Data.reduce((acc:any, curr:any) => {
        const locationType = curr.locationType.toString(); // Convert locationType to string
        if (!acc[locationType]) {
          acc[locationType] = []; // Initialize if locationType is encountered for the first time
        }
        if(curr.frequency === freq)
        acc[locationType].push({ value: curr.id, label: curr.metricName, id:curr.kriMetricId }); // Push kriMetricId and metricName pair
        return acc;
      }, {});
      
      // Convert the groupedData to the desired format
      const transformedData = Object.entries(groupedData).map(([label, options]) => ({
        label,
        options,
      }));
      const pro= Object.values(groupedData);

      console.log(groupedData);
      setOptions(transformedData);
      setInitialDropdown(pro[0]);
      dispatch(addKriDDData(pro[0]))
      console.log(kriDDData)
      
    }
    const kriDDData:any = useAppStateSelector((state) => state?.kriDDDataState?.KriDropDownData[0]?.data)
    const krimetricData:any = useAppStateSelector((state) => state?.kriDDDataState?.KriMetricData[0]?.data)
   const UpdateData=(e:any)=>{
    setFrequency(e);
    PreparefinalData(allData, e,[]);
   } 

  const handleCreateKriData = async() => {
    console.log("kri..", selected)
    console.log("old kri..", oldSelected)

    // Find new entries in the 'new' object that were not in 'old'
    const newEntriesNotInOld = selected.filter(entry => !oldSelected.includes(entry));

    // Find entries that have been removed from 'new' and were in 'old'
    const removedEntries = oldSelected.filter(entry => !selected.includes(entry));

    console.log("New entries not in old:", newEntriesNotInOld); 
    console.log("Removed entries:", removedEntries);
    const createdById= authState?.userData?.data?.data?.userId;
    let status = "Draft"
    if(state && state.length > 1 && state[2]?.mode) {
      status="edit"
    }
    else{
      status="Draft"
    };
    await dispatch( 
      createNewKriReportAction({ refNum:reportId,frequecy:frequecy,reportingPeriod:reportingPeriod,dateOfOccurance:InputFrequency(reportingPeriod),locationId:2,locationType:"",status:status, createdById: createdById , kris:newEntriesNotInOld, removeKris:removedEntries
    })  
    ) .then((response:any) => {
     const result= response?.payload?.requestData?.data;
     console.log(result.data);
     const data:any = result.data;
     const ref=result?.data[0]?.newRefNum;
     const kriReportId = result?.data[0]?.reportId;
     const metricIds = result?.data[0]?.metricIds;
     const allData:any = [{selected},{options}, {ref},{kriReportId}]
    const ActivePage=1;
     const url='/start-kri-data-department';
     navigate(`/admin${url}`,{
      state:[{ActivePage},{refNo:data[0]?.newRefNum},{data:options},{kriReportId : kriReportId},{metricIds:metricIds},{reportingPeriod:reportingPeriod}]
    });
    });
   
  };

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
    if(!((fre.includes("Q")) || (fre.includes("H"))) && fre.length > 4){
      maxYear = parseInt(fre.substring(3,7),10);
      let month :number= parseInt(fre.substring(0,2),10); 
      maxDate = getLastDayOfMonth(maxYear, month);

      return maxDate;
    }
    if((fre.includes("Q")) || (fre.includes("H"))){
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
  const navigate = useNavigate();
    let reportingPeriodMsg ="";
    let reportingPeriodHint ="";

    if(frequecy === 'Monthly'){
      reportingPeriodMsg ="MM/YYYY";
      reportingPeriodHint ="Ex: For January 2024 enter 01/2024";
    }
    if(frequecy === 'Quarterly'){
      reportingPeriodMsg ="Q1/YYYY";
      reportingPeriodHint ="Ex: For Jan-Mar 2024(first quarter), enter Q1/2024";
    }
    if(frequecy === 'Half-Yearly'){
      reportingPeriodMsg ="H1/YYYY";
      reportingPeriodHint ="Ex: For Jan-June 2024(first half), enter H1/2024";
    }
    if(frequecy === 'Yearly'){
      reportingPeriodMsg ="YYYY";
      reportingPeriodHint ="Ex: Enter 2024";
    }

    const ReportingPeriodValidation = (e:any) => {
      let p:string=e.target.value;
      setReportingPeriod(p.toLocaleUpperCase());
      if(e.target.placeholder === "MM/YYYY"){
        const regex = /^(0[1-9]|1[0-2])\/\d{4}$/;
        ReturnValidation(regex,e.target.value)
      }
      if(e.target.placeholder === "Q1/YYYY"){
        const regex = /^Q[1-4]\/\d{4}$/;
        ReturnValidation(regex,e.target.value)
      }
      if(e.target.placeholder === "H1/YYYY"){
        const regex = /^H[1-2]\/\d{4}$/;
        ReturnValidation(regex,e.target.value)
      }
      if(e.target.placeholder === "YYYY"){
        const regex = /^\d{4}$/;
        ReturnValidation(regex,e.target.value)
      }
    
    }

    const ReturnValidation = (regex:any, value:any) =>{
      if(regex.test(value)){
        setReportingValidation(true);
      }else{
        setReportingValidation(false);
      }
    }

    const HandleDDOptions = async(item:any) => {
      setFilledKri((pre: any[])=>{pre?.push(kriDDData.find((option:any) => option.value === item))});
      const updatedOptions = kriDDData?.filter((option:any) => option.value !== item);
      // setInitialDropdown((pre: any[])=>{pre=updatedOptions});
      const datax=kriDDData.find((option:any) => option.value === item);
      dispatch(addKrimetrics(datax));
      console.log(kriDDData.find((option:any) => option.value === item));
      console.log(updatedOptions);
      dispatch(addKriDDData(updatedOptions))
      console.log(krimetricData);
      setSelectKriMetric("");
    }

    const closeAlert =(result:string)=>{
      if(result==="ok"){
      // CancelHandle(formData.kriMetricId);
      RemoveMetric(formData.kriMetricId)
      const url='/kri-department';
      let userRole:string=authState?.userData?.data?.data?.userRole;
      userRole=userRole?.toLocaleLowerCase();
      navigate(`/${userRole}${url}`);
      }
    }

    const AddMetricHandle = async (item:any) => {
      // setFilledKri((pre: any[])=>{pre?.push(kriDDData.find((option:any) => option.value === item))});
      // const updatedOptions = kriDDData?.filter((option:any) => option.value !== item);
      // // setInitialDropdown((pre: any[])=>{pre=updatedOptions});
      // const datax=kriDDData.find((option:any) => option.value === item);
      // await dispatch(addKrimetrics(datax));
      // console.log(kriDDData.find((option:any) => option.value === item));
      // console.log(updatedOptions);
      // await dispatch(addKriDDData(updatedOptions))
      // console.log(krimetricData);
      // setSelectKriMetric("");

      await HandleDDOptions(item);
      if(kriRefIdNew !=="" && krireportIdNew > 0 && metricIdNew > 0 && formData.kriMasterId >0 && selectKriMetric !==""){
         await HandleSave(formData.kriMasterId);
      }
      // else{
        
          const createdById= authState?.userData?.data?.data?.userId;
          let status = "Draft";
          if(pageData.length>0) {
            status="edit"
          }
          let kriId:number[]= [];
          kriId.push(item);
          await dispatch( 
            createNewKriReportAction({ refNum:reportId,frequecy:frequecy,reportingPeriod:reportingPeriod,dateOfOccurance:InputFrequency(reportingPeriod),locationId:locationState?.currentLocation?.locationId,locationType:locationState?.currentLocation?.locationType,status:status, createdById: createdById , kris:kriId, removeKris:[], ValidatorILOUserId:Number(icoGia)
          })  
          ) .then(async (response:any) => {
          const result= response?.payload?.requestData?.data;
          console.log(result.data);
          //  const data:any = result.data;
          const ref=result?.data[0]?.newRefNum;
          setKriRefIdNew(ref);
          const kriReportId = result?.data[0]?.reportId;
          setKrireportIdNew(kriReportId);
          const metricIds = result?.data[0]?.metricIds[0];
          setMetricIdNew(metricIds);
          await fetchSelectedMetricData(metricIds);
          

          //  const allData:any = [{selected},{options}, {ref},{kriReportId}]
          // const ActivePage=1;
          //  const url='/start-kri-data-department';
          //  navigate(`/admin${url}`,{
          //   state:[{ActivePage},{refNo:data[0]?.newRefNum},{data:options},{kriReportId : kriReportId},{metricIds:metricIds},{reportingPeriod:reportingPeriod}]
          // });
            });
          // }
    

    }

    const HandleSave = async(item:any) =>{
      let idx=0;
      await dispatch( 
        updateNewKriMetricsAction({ 
          MasterId : item,
          ReportId : krireportIdNew,
          metricId: metricIdNew,
          DateOccurance : dateOfOccurance,
          Description : formData.detailDescription,
          AmountInvolved : formData.amountInvolved,
          Currency : currency,
          MitigationPlan : formData.mitigationPlan,
          NumberPercentage : formData.NumberPercentage,
          RiskAppetiteThreshold: "",
         })  
      ) .then(async (response:any) => {
      const result= response?.payload?.requestData?.data.data;
       if(result.code==="00"){
        idx=result.data[0].id;
        setSavedMetricId(result.data[0].id);
        setSavedRecordId((prevState:any) => [...prevState, result.data[0].id]);
       }
       setAddData(true);
       await setFormData({
          ...formData,
        amountInvolved: "",
        NumberPercentage: "",
        mitigationPlan:"",
        detailDescription:"",       
     });
    //  formData.amountInvolved= "",
    //  formData.NumberPercentage= "",
    //  formData.mitigationPlan="",
    //  formData.detailDescription="", 
     setNewMetric("")

     let savedMetricIds:any[]=[];
     if(savedRecordId.length ===0){
       savedMetricIds.push(idx);
     }else{
       savedMetricIds= savedRecordId;
     }

     if(kriDDData?.length>0){
     await fetchSavedKriData(savedMetricIds,[])
     }else{
      const url='/preview-kri-department';
      let userRole:string=authState?.userData?.data?.data?.userRole;
      userRole=userRole?.toLocaleLowerCase();
      navigate(`/${userRole}${url}`,{
        state: [result?.data[0]?.id] 
     });
     }
      
    });
    }

    const fetchSavedKriData= async(ids:number[], rids:number[]) =>{
      if(kriDDData?.length>0 || state[2]?.mode==="edit"){
      await dispatch(getPreviewKriAction({ids:ids, rids:rids})).then((response:any) =>{
      const result= response?.payload?.requestData?.data.data;
      setPageData(result);
      setIcoGia((p:any)=>p=result[0]?.validatorILOUserId);
      setIcoGiaName((p:any)=>p=result[0]?.validatorILOUserName);
     });
    }
   }

    const fetchSelectedMetricData = async(id:number)=>{

      await dispatch(getMetricsData({id})).then((res:any)=>{
        const result= res.payload?.requestData?.data?.data[0];  
        setReportId(result.kriReportId);
        setNewMetric((p:string)=>p=result.kriMetricTitle)
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
      setAddData(true);
       setDateOfOccurrence(result.dateOccurance.toString().substring(0,10));
       setAppType(result.appetiteType.includes("N") ? "Number" : "Percentage");
       setAppTypePlaceHolder(result.appetiteType.includes("N") ? "Enter Number" : "Enter Percentage");
       setAppetiteLowerBound(result.appetiteLowerBound);
       setAppetiteUpperBound(result.appetiteUpperBound);
       setToleranceLowerBound(result.toleranceLowerBound);
       setToleranceUpperBound(result.toleranceUpperBound);
       setEscalationLowerBound(result.escalationLowerBound);
       setMaxDateOfOccurance(InputFrequency(result.reportingPeriod));
       setCurrency(result.currency !== "" ? result.currency : "NGN");
      });
    }

    const handleInputChange = (e:any) => {
    
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
      console.log(formData);
    };

    const SelectKriMetrics = (value:any) => {

      if(newMetric !== "" && (formData.amountInvolved === "" || formData.detailDescription === "" || formData.NumberPercentage === "")){
        setErrorMessage("Please fill all the mandatory fields..")
      }else{
        setSelectKriMetric(value);
      }

    }
    const GotoGrid=()=>{
      let userRole:string=authState?.userData?.data?.data?.userRole;
      userRole=userRole.toLocaleLowerCase();
      const url='/kri-department';
      return navigate(`/${userRole}${url}`)
     }
    const RemoveMetric = async(id:number) => {
      if(id && id>0){
      await dispatch(removeMetricAction({id})).then(async (res:any)=>{
        const result= res?.payload?.requestData?.data?.description;
        if(result?.includes("Report")){
          GotoGrid();
        }
      
        const removedItem = { id: "", label: formData.metrics, value: formData.kriMasterId };
        let oldData: any[] =[];
        if(kriDDData?.length>0){ oldData = kriDDData?.slice();}
        oldData.push(removedItem);
        dispatch(addKriDDData(oldData))

        setAddData(false);
       setFormData(
        {
          ...formData,
        ['kriId']:0,
        ['kriMasterId']:0,
        ['amountInvolved']: "",
        ['NumberPercentage']: "",
        ['mitigationPlan']:"",
        ['detailDescription']:"",
        ['dateOccurance']:"",
        ['kriMetricId']:0,
        ['metrics']:"",
        ['currency']:currency,
        ['RiskAppetiteThreshold']: "",
      });
      setNewMetric((p:string)=>p="")

      if(result?.includes("metric")){
     await fetchSavedKriData([],[reportId])
      }
      })
      }
      if(state && state.length>1 && state[2]?.mode==="edit"){
        fetchEditData(state[0].id,state[1].loc)
      }
    }

    const CancelHandle = (id:number) =>{
      //todo alert box- to ask user - remove or fill

      if(id && id>0){
        setOpenAlertBox(true);
      }else{
        const url='/kri-department';
        let userRole:string=authState?.userData?.data?.data?.userRole;
      userRole=userRole?.toLocaleLowerCase();
      navigate(`/${userRole}${url}`);
      }
      
    }

    const PreviewHandle = async (id:number) =>{
      if(id && id>0){
        await HandleDDOptions(id);
        await HandleSave(id);
      }
      if(savedMetricId===0){
        savedMetricId=pageData[0]?.metricId;
      }
      if(savedMetricId){
      const url='/preview-kri-department';
      let userRole:string=authState?.userData?.data?.data?.userRole;
      userRole=userRole?.toLocaleLowerCase();
      navigate(`/${userRole}${url}`,{
        state: [savedMetricId]   //-------------------------------------------
     });}
    }

    // const EditPreviewHandle = () =>{
      
    //   const url='/preview-kri-department';
    //   navigate(`/admin${url}`,{
    //     state: [pageData[0].metricId]   //-------------------------------------------
    //  });
    // }


    const SaveHandle = async(id:number) =>{
      if(id && id>0){
        await HandleDDOptions(id);
        await HandleSave(id);
      }
    }

    return (
    <>
      {/* <BackButton navigate={navigate}></BackButton> */}
      <PageHeader title={pageTitle}></PageHeader>
      <div className="pageCard">
        <div className="pageCardHeader">
          <strong>{pageSubTitle}</strong>
          <p>Please fill the data input and ensure the information is correct before submitting.</p>
        </div>
        <div className="row">
        {/* <FormRegistration /> */}
        <div className="col-3">
                <div className="form-group">
                    <label htmlFor="department">ICO/GIA*</label>
                    {/* {!state &&  */}
                    <SelectDropDown
                    setOpen={setOpenICOName}
                    open={openICOName}
                    onChange={(value) => {setIcoGia(value)}}
                    placeholder="Select"
                    selectedValue={icoGia}
                    options={icoUser}
                    // disabled={state && state.length>=2 && state[2]?.mode==="edit"}
                />
                 {/* } */}
                {/* {state && state.length>=2 && state[2]?.mode==="edit" &&
                <div className={styles?.dateFrom}><input type="text" className="form-control" placeholder={icoGiaName} disabled></input></div>
                } */}

                </div>
            </div> 
            {locationState?.currentLocation?.locationType==="D" &&
             <div className="col-2">
                <div className="form-group">
                    <label htmlFor="department">Department</label>
                    <div className={styles?.dateFrom}><input type="text" className="form-control" placeholder={locationState?.currentLocation?.locationName} disabled></input></div>
                </div>
            </div>}
            {locationState?.currentLocation?.locationType==="B" &&
              <div className="col-2">
                <div className="form-group">
                    <label htmlFor="solid">Branch</label>
                    <div className={styles?.dateFrom}><input type="text" className="form-control" placeholder={locationState?.currentLocation?.locationName} disabled></input></div>
                </div>
            </div>}
            <div className="col-2"> 
              <div className="form-group">
                  <label htmlFor="frequency">Frequency</label>
                  <Radio label="Monthly " value="Monthly" checked={frequecy === 'Monthly'} onChange={(e:any) => SelectReporting(e.target.value)} 
                  disabled={state && state.length>=2 && state[2]?.mode==="edit"}
                  />
                  <Radio label="Quarterly " value="Quarterly" checked={frequecy === 'Quarterly'} onChange={(e:any) => SelectReporting(e.target.value)} 
                  disabled={state && state.length>=2 && state[2]?.mode==="edit"}
                  />
                  <Radio label="Half-Yearly " value="Half-Yearly" checked={frequecy === 'Half-Yearly'} onChange={(e:any) => SelectReporting(e.target.value)} 
                  disabled={state && state.length>=2 && state[2]?.mode==="edit"}
                  />
                  <Radio label="Yearly " value="Yearly" checked={frequecy === 'Yearly'} onChange={(e:any) => SelectReporting(e.target.value)} 
                  disabled={state && state.length>=2 && state[2]?.mode==="edit"}
                  />
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="report">Reporting Period*</label>
                <div className="input-group">
                <input
                  type="text"
                  value={reportingPeriod}
                  placeholder={reportingPeriodMsg}
                  onChange={(e)=>{ReportingPeriodValidation(e)}}
                  className="form-control"
                  onFocus={() => setIsVisible(!isVisible)}
                  onBlur={() => setIsVisible(!isVisible)}
                  disabled={state && state.length>=2 && state[2]?.mode==="edit"}
                  />
                  {reportingValidation ? (
                        
                        <span className="authCheck input-group-text">
                          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.3333 1L5 8.33333L1.66667 5" stroke="#12B76A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                         // Confirmation icon

                        ) : (
                          <span className="authCheck input-group-text">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 6L6 10M6 6L10 10M14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>

                        )}
                  </div>
                  {isVisible && (
                    <p className="rpTextHint">{reportingPeriodHint}</p>
                  )}
              </div>  
            </div>
         </div>
          <Divider color="black" />
         <VerticalSpacer size={20} />
          {/* {<Metric SelectKriMetric={""}/>} */}
      {pageData.length>0 && <div>
      {pageData?.map((data, index) => (
          <div key={index} className="pageCard mb-4">
            {((data?.description !== "" && data?.mitigationPlan !== "")|| (state && state?.length > 1 && state[2]?.mode==="edit") )&& (<div>
            <div className="row align-items-center">
                <div className="col-auto">
                <strong>{data?.kriMetricTitle}</strong>
                <span className="badge text-bg"><div className="Submitted"> {data?.riskAppetiteThreshold}</div></span>
                <IconButton buttonTitle="Remove" onClick={() => RemoveMetric(data.metricId)} iconPosition="right" variant="remove" color="neutral" icon={<MinusRed />} />

                </div>
                {/* <div className="col-auto">
                    <IconButton
                    icon={<EditIcon />}
                    buttonTitle="Edit Detail"
                    variant="textIconButtonOnly"
                    onClick={() => EditHandler(index)}
                    />
                </div> */}
            </div>
            <div className="grayBox">
              <div className="row gx-2">
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="occ">Date of Occurrence</label>
                    <div className="viewBoxContent">{data?.dateOccurance?.toString().substring(0,10)}</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="num">Number/Percentage</label>
                    <div className="viewBoxContent">{data?.kriData}</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="amt">Amount Involved</label>
                    <div className="viewBoxContent">{data?.amountInvolved}  {data?.currency}</div>
                  </div>
                </div>
              </div>
              <div className="row gx-2">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="mplan">Mitigation Plan/Actions</label>
                    <div className="viewBoxContent">
                    {data?.mitigationPlan}
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="des">Detailed Description Of Incident</label>
                    <div className="viewBoxContent">
                    {data?.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>)}
          </div>
      ))}
      </div>}
          {/* {addData && (
            <div className="row">
              <div className="col-5">
                <h6>{formData.metrics}</h6>
                <IconButton buttonTitle="Remove" onClick={() => setAddData(!addData)} iconPosition="right" variant="remove" color="neutral" icon={<MinusRed />} />
              </div>
              <div className="col-7">
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="">Date of Occurrence:</label>
                      <input type="date" className="form-control" placeholder="Select Date" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="">Percentage:</label>
                      <input type="number" className="form-control" placeholder="Select Date" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="">Amount Involved:</label>
                      <input type="number" className="form-control" placeholder="Select Date" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="">Mitigation Plan:</label>
                      <textarea
                      className=""
                      id=""
                      name="mitigationPlan"
                      rows={4}
                      placeholder="Enter Description"
                      required
                    />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="">Detailed Description Of Incident:</label>
                      <textarea
                      className=""
                      id=""
                      name="mitigationPlan"
                      rows={4}
                      placeholder="Enter Description"
                      required
                    />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}  */}
        {/* <form onSubmit={handleSubmit(AddMetricHandle)}> */}
         { addData && formData.metrics !== "" && newMetric !== "" && 
         <div className="row">
              {/* <VerticalSpacer size={20} /> */}
              <div className="col-5">
              <h5> {newMetric}</h5>
              <IconButton buttonTitle="Remove" onClick={() => RemoveMetric(formData.kriMetricId)} iconPosition="right" variant="remove" color="neutral" icon={<MinusRed />} />
            </div>
              {/* <VerticalSpacer size={20} /> */}
              <div className="col-7">
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="occ">Date of Occurrence*</label>
                    <div>
                <Input
                  type="date"
                  className="form-control"
                  placeholder="Select From Date"
                  onChange={AddDateOfOccurance}
                  value={dateOfOccurrence}
                  max={maxDateOfOccurance?.toLocaleString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                  required
                ></Input>
              </div>
                  </div>
                </div>

                <div className="col-6">
                <div className="form-group">
                  <label htmlFor="">{appType}*</label>
                  <div className="input-group">
                    <Input
                      {...register("NumberPercentage")}
              error={errors.NumberPercentage?.message as string}
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
                   {appType === "Percentage" && <span className="input-group-text">%</span>}
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
                <div className="col-12">
                <div className="form-group">
                    <label htmlFor="amt">Amount Involved*</label>
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
                <Input
                      {...register("amountInvolved")}
                        // error={errors.amountInvolved?.message as string}

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
                    <label htmlFor="mplan">Mitigation Plan*</label>
                    <textarea
                       {...register("mitigationPlan")}
                        // error={errors.mitigationPlan?.message as string}

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
                    <label htmlFor="des">Detailed Description Of Incident*</label>
                    <textarea
                       {...register("detailDescription")}
                        // error={errors.detailDescription?.message as string}
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
              </div>
        </div>
        }
                  
        {errorMessage !== "" && <p >{errorMessage}</p>}
        {/* <p>{errors.root?.message}</p> */}
         <VerticalSpacer size={20} />
         <Divider color="black" />
         <VerticalSpacer size={20} /> 
         {kriDDData?.length>0 && 
         <div className="row">
          <div className="col">
             <SelectDropDown
                setOpen={setOpenSelectKriMetric}
                open={OpenSelectKriMetric}
                onChange={(value) => SelectKriMetrics(value)}
                placeholder="Select"
                selectedValue={selectKriMetric}
                options={kriDDData ?? []}
            />
          </div>
          <div className="col-auto">
            <Button variant="contained" onClick={()=> {AddMetricHandle(selectKriMetric)}} color="primary" 
            disabled={(!reportingValidation || selectKriMetric === "" || icoGia === "") && ( selectKriMetric === "" || formData.amountInvolved === "" || formData.detailDescription === "" || formData.NumberPercentage === "" || formData.detailDescription === "" || icoGia === "")
            }>Add Metric</Button>
          </div>
         </div> }

         {/* </form> */}
          <VerticalSpacer size={20} />
          <div className="row">
            <div className="col-auto">
              {kriDDData && kriDDData?.length >0 && <Button variant="contained" onClick={ ()=>{SaveHandle(formData.kriMasterId)}}
              // disabled={formData.amountInvolved === "" || formData.detailDescription === "" || formData.NumberPercentage === "" || formData.detailDescription === ""}
              disabled={true}
              >Save</Button>}
              {kriDDData && kriDDData?.length === 0 && <Button variant="contained"
              onClick={ ()=>{PreviewHandle(formData.kriMasterId)}}
              disabled={kriDDData?.length !== 0 || formData.amountInvolved === "" || formData.detailDescription === "" || formData.NumberPercentage === "" || formData.detailDescription === ""}
              >Save & Preview</Button>}

              {state && state?.length>1 && state[2]?.mode==="edit" && isUndefined(kriDDData) && <Button variant="contained"
              onClick={ ()=>{PreviewHandle(formData.kriMasterId)}}
              >Save & Preview</Button>}
            </div>
            <div className="col-auto">
              <Button variant="outlined" onClick={() => CancelHandle(formData.kriMetricId)}>Cancel</Button>
              {openAlertBox && <AlertBox open={openAlertBox} setopen={setOpenAlertBox} data={"msg"} title={"Alert"} message={"You have unsaved changes. Are you sure you want to cancel?"} btn1={"OK"} btn2={"Cancel"} onClose={closeAlert} />}
            </div>
          </div>
          


          

          
         {/* <Divider color="black" />
         <VerticalSpacer size={20} />  */}
        {/* <div className="row">
            <strong>Search, Select and Start KRI Data Entry</strong>
        </div> 
        <div className="row mb-4">
          <div className="col-12">
            <DualListBox
                options={options}
                selected={selected}
                canFilter
                onChange={(newValue) => setSelected(newValue)}
            />
          </div>
        </div> */}
        {/* <div className="btnGroup">
          <div className="row">
            <div className="col-auto">
            { ((selected.length > 0   &&
             frequecy !== "" &&
              reportingPeriod !== "" &&
               reportingValidation) || (state && state?.length >= 2 && state[2]?.mode==="edit")) &&
                <Button variant="contained" onClick={()=> handleCreateKriData()}>Start</Button>
            }
            </div>
            <div className="col-auto">
              <CancelButton navigate={navigate}></CancelButton>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};
export default LogKriCreateEdit;
