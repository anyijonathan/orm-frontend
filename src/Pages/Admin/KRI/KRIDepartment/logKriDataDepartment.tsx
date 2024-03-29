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
// import LogKriTable from "./logKriTable";
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import { useAppDispatch, useAppStateSelector } from "../../../../Services/Store/hooks";
import { createNewKriReportAction, getEditKriReportAction, getNewKriReportAction } from "../../../../Services/Actions/kriAction";
import { Radio } from "../../../../Components/Radio";
import { SelectDropDown } from "../../../../Components/DropDown";
import { MinusRed } from "../../../../Layouts/Sidebar/icons";

const LogKriDataDepartment = () => {
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
  const [SelectKriMetric, setSelectKriMetric] = useState("");
let mode="";
  useEffect(() => {    
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
        fetchData(frequecy); 
        setPageTitle("Create KRI Report");
        setPageSubTitle("Create KRI Detail");
      }
    }, []);

  const [ frequecy, setFrequency ] = useState("Monthly");
  const [ reportingPeriod, setReportingPeriod ] = useState("");
  const [selected, setSelected] = useState<any[]>([]);
  const [oldSelected, setOldSelected] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [addData, setAddData] = useState(false);
  const [reportingValidation, setReportingValidation] = useState(false);

  const fetchData = async(freqcy:string)=>{
    setFrequency(freqcy);
      await dispatch( 
        getNewKriReportAction({ locationType: "", locationId: 1, frequecy: freqcy})  
      ) .then((response:any) => {
       const result= response?.payload?.requestData?.data;
       console.log(result.data);

       const data:any = result.data;
       setAllData(data);
      PreparefinalData(data, freqcy)
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
       setFrequency((p)=>p=data[0]?.reportingFrequency);     
      const ids: number[] = data.map((item:any) => item.id);
      setSelected(ids);
      setOldSelected(ids);
      await fetchData(data[0]?.reportingFrequency);
      });
    }

    const PreparefinalData =(Data:any, freq:string) =>{
      const groupedData = Data.reduce((acc:any, curr:any) => {
        const locationId = curr.locationId.toString(); // Convert locationId to string
        if (!acc[locationId]) {
          acc[locationId] = []; // Initialize if locationId is encountered for the first time
        }
        if(curr.frequency === freq)
        acc[locationId].push({ value: curr.id, label: curr.metricName, id:curr.kriMetricId }); // Push kriMetricId and metricName pair
        return acc;
      }, {});
      
      // Convert the groupedData to the desired format
      const transformedData = Object.entries(groupedData).map(([label, options]) => ({
        label,
        options,
      }));
      
      console.log(transformedData);
      setOptions(transformedData);
      
    }

   const UpdateData=(e:any)=>{
    setFrequency(e);
    PreparefinalData(allData, e);
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
     let userRole:string=authState?.userData?.data?.data?.userRole;
      userRole=userRole?.toLocaleLowerCase();
     navigate(`/${userRole}${url}`,{
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
    if(frequecy === 'Half-yearly'){
      reportingPeriodMsg ="H1/YYYY";
      reportingPeriodHint ="Ex: For Jan-June 2024(first half), enter H1/2024";
    }
    if(frequecy === 'Yearly'){
      reportingPeriodMsg ="YYYY";
      reportingPeriodHint ="Ex: Enter 2024";
    }

    const ReportingPeriodValidation = (e:any) => {
      setReportingPeriod(e.target.value);
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
  return (
    <>
      <BackButton navigate={navigate}></BackButton>
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
                    <label htmlFor="">Department</label>
                    <div className={styles?.dateFrom}><input type="text" className="form-control" placeholder={authState?.userData?.data?.data?.department} disabled></input></div>
                </div>
            </div>
            <div className="col-3">
                <div className="form-group">
                    <label htmlFor="">SOL ID</label>
                    <div className={styles?.dateFrom}><input type="text" className="form-control" placeholder={authState?.userData?.data?.data?.solId} disabled></input></div>
                </div>
            </div>
            <div className="col-2"> 
              <div className="form-group">
                  <label htmlFor="">Frequency</label>
                  <Radio label="Monthly " value="Monthly" checked={frequecy === 'Monthly'} onChange={(e:any) => fetchData(e.target.value)} 
                  disabled={state && state.length>=2 && state[2]?.mode=="edit"}
                  />
                  <Radio label="Quarterly " value="Quarterly" checked={frequecy === 'Quarterly'} onChange={(e:any) => fetchData(e.target.value)} 
                  disabled={state && state.length>=2 && state[2]?.mode=="edit"}
                  />
                  <Radio label="Half-yearly " value="Half-yearly" checked={frequecy === 'Half-yearly'} onChange={(e:any) => fetchData(e.target.value)} 
                  disabled={state && state.length>=2 && state[2]?.mode=="edit"}
                  />
                  <Radio label="Yearly " value="Yearly" checked={frequecy === 'Yearly'} onChange={(e:any) => fetchData(e.target.value)} 
                  disabled={state && state.length>=2 && state[2]?.mode=="edit"}
                  />
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Reporting Period</label>
                <input
                  type="text"
                  value={reportingPeriod}
                  placeholder={reportingPeriodMsg}
                  onChange={(e)=>{ReportingPeriodValidation(e)}}
                  className="form-control"
                  onFocus={() => setIsVisible(!isVisible)}
                  onBlur={() => setIsVisible(!isVisible)}
                  disabled={state && state.length>=2 && state[2]?.mode=="edit"}
                  />
                  {isVisible && (
                    <p className="rpTextHint">{reportingPeriodHint}</p>
                  )}
              </div>  
            </div>
         </div>
         {/* <Divider color="black" />
         <VerticalSpacer size={20} />
         {addData && (
            <div className="row">
              <div className="col-5">
                <h6>Number of incidents of ATM vandalization</h6>
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
          )}
         <VerticalSpacer size={20} />
         <Divider color="black" />
         <VerticalSpacer size={20} /> */}
         {/* <div className="row">
          <div className="col">
            <SelectDropDown
                setOpen={setOpenSelectKriMetric}
                open={OpenSelectKriMetric}
                onChange={(value) => setSelectKriMetric(value)}
                placeholder="Select"
                selectedValue={SelectKriMetric}
                options={[
                    { label: "Number of incidents of ATM vandalization", value: "capital" },
                    { label: "Number of established differences between actual stock position and inventory report (missing stock) ", value: "irregular" },
                    { label: "Number of critical locations without functional CCTV installations (ATM, cash centre, bulk counting room, etc.)", value: "tax" },
                    { label: "Number of locations with no safety equipment (extinguishers, smoke detectors, etc.)", value: "tax" },
                    { label: "Number of safety equipments not serviced as proposed in the maintenance schedule", value: "tax" },
                ]}
            />
          </div>
          <div className="col-auto">
            <Button variant="contained" onClick={()=> setAddData(!addData)} color="primary">Add Metric</Button>
          </div>
         </div> */}
         {/* <VerticalSpacer size={20} />
         <Divider color="black" />
         <VerticalSpacer size={20} /> */}
        <div className="row">
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
        </div>
        <div className="btnGroup">
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
        </div>
      </div>
    </>
  );
};
export default LogKriDataDepartment;
