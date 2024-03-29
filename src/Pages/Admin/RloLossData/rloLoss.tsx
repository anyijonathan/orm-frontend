import { useEffect, useState } from "react";
import { Button, IconButton } from "../../../Components/Buttons";
import {
  Dropdown,
  DropdownContentContaner,
  SelectDropDown,
} from "../../../Components/DropDown";
import {
  CalendarIcon,
  FilterIcon,
} from "../../../Components/Icons";
import {
  PageHeader,
  TableCard,
  TableFiltersContainer,
} from "../../../Components/PageShared";
import RloLossTable from "./rloLossTable";
import styles from "../../../Assets/Styles/Component/table.module.scss";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useAppDispatch, useAppStateSelector } from "../../../Services/Store/hooks";
import { lossDataDetailsAction } from "../../../Services/Actions/lossAction";
import { DateRangePicker } from "../../../Components/DatePicker/rangePicker";
import { getCurrentRole } from "../../../Services/Utils/route";
import { Branch } from "@rsuite/icons";
import { addLocation } from "../../../Services/Reducers/locationSlice";
const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";
type MyData = {
  InternalBusinessLineId: any;
  LossType: any;
  Currency: any;
  DateOfOccurrence: any;
  DateDiscovered: any;
  DescriptionOfLoss: any;
  RootCause: any;
  RiskSourceId: any;
  AmountInvolved: any;
  AmountRecovered: any;
  Region: any;
  ProcessInvolved: any;
  RecoveryMode: any;
  EventStatus: any;
  Department: any;
  ReportStatus: any;
};
interface Loc {
  locationId: string;
  locationName: string;
  locationType: string;
  region: string;
}
const RloLossData = () => {
  const [data, setData] = useState<MyData[]>([]);
  const [requestID, setRequestID] = useState("");
  const [totalCount, setTotalCount] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [paginator, setpaginator] = useState(true);
  const [openEventstatus, setOpenEventstatus] = useState(false);
  const [eventstatus, setEventstatus] = useState("");
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [reportstatus, setReportstatus] = useState("");
  const [openRegion, setOpenRegion] = useState(false);
  const [region, setRegion] = useState("");
  const [branch, setBranch] = useState("");
  const [openDepartment, setOpenDepartment] = useState(false);
  const [department, setDepartment] = useState("");
  const [solId, setSolId] = useState("");
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedRefNo, setSelectedRefNo] = useState("");
  const authState:any = useAppStateSelector((state) => state.authState)
  const [minDate, setMinDate]  = useState((new Date(new Date().setMonth(new Date().getMonth() - 3))).toLocaleDateString('en-CA'));
  const [maxDate, setMaxDate] = useState(new Date().toLocaleDateString('en-CA'));
  const navigate = useNavigate();
  const [submitCount, setSubmitCount] = useState(0);
  const [draftCount, setDraftCount] = useState(0);
  const [approveCount, setApproveCount] = useState(0);
  const [rejectCount, setRejectCount] = useState(0);
  const [updatedByBORMCount, setUpdatedByBORMCount] = useState(0);
  const [aUpdatedByBORMCount, setAUpdatedByBORMCount] = useState(0);
  const [rUpdatedByBORMCount, setRUpdatedByBORMCount] = useState(0);
  const [allCount, setAllCount] = useState(0);
  const [locationId, setLocationId] = useState(0);
  const [dateSearch, setDateSearch] = useState(false);

  const handlePaginationChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
    fetchData(locationId,selectedRefNo,selectedBranch,region,department,eventstatus,reportstatus,pageNumber,false, minDate,maxDate);

  };
  let locationState:any = useAppStateSelector((state) => state.locationDataState)

  useEffect(() => {  

    if(getCurrentRole() !== "admin"){
      setLocationId(locationState?.currentLocation?.locationId)
      if(locationState?.currentLocation?.locationType === "B"){
      setSelectedBranch(locationState.currentLocation.locationName);
      setRegion(locationState.currentLocation.region);
      if(locationState?.currentLocation?.locationId != undefined)
      fetchData(locationState?.currentLocation?.locationId,"","","","","","",1,false, minDate,maxDate);

      }else{
        setDepartment(locationState.currentLocation.locationName)
      if(locationState?.currentLocation?.locationId != undefined)
      fetchData(locationState?.currentLocation?.locationId,"","","","","","",1,false, minDate,maxDate);

    } 
    }else{
        const loc: Loc = {
          locationId: "", // Set location ID from selected option
          locationName: "", // Set location name from selected option
          locationType: "", // Set location type from authState
          region: "",
        };  
        setLocationId(0);
        dispatch(addLocation(loc));
    fetchData(0,"",branch,region,department,"","",1,false, minDate,maxDate);
    }
  
    },[]);

  const fetchData = async (locationId:number,refNo:string,branch:string,region:string,department:string,eventStatus:string,reportStatus:string,pageNumber: number, isexport: boolean, minDate:string,maxDate:string) => {
    await dispatch(lossDataDetailsAction({locationId,refNo:refNo,branch:branch,region:region,department:department,eventStatus:eventStatus,reportStatus:reportStatus,pageNumber:pageNumber,minDate:minDate, maxDate:maxDate, isexport:isexport}))
    .then((response:any) =>{
      const result= response?.payload?.requestData?.data.data[0];
      setData(result?.lossData);
    setTotalCount(response?.payload?.requestData?.data?.total);
    setSubmitCount(result?.recordCounts?.submittedCount);
    setApproveCount(result?.recordCounts?.approvedCount);
    setDraftCount(result?.recordCounts?.draftCount);
    setRejectCount(result?.recordCounts?.rejectCount);
    setAUpdatedByBORMCount(result?.recordCounts?.aUpdatedByBORMCount);
    setAllCount(result?.recordCounts?.submittedCount + result?.recordCounts?.approvedCount + result?.recordCounts?.draftCount + result?.recordCounts?.rejectCount+ result?.recordCounts?.aUpdatedByBORMCount);
  GotoGrid();
  });}

  const GotoGrid=()=>{
    let userRole:string=authState?.userData?.data?.data?.userRole;
    userRole=userRole.toLocaleLowerCase();
    const url='/rlo-loss-data';
    return navigate(`/${userRole}${url}`)
   }
  let userState:any = useAppStateSelector((state) => state.authState)

  const setOpenCreateLossdata = () => {
    let userRole:string=userState?.userData?.data?.data?.userRole;
        userRole=userRole.toLocaleLowerCase();
    const url = "/lossdata";
    return navigate(`/${userRole}${url}`, {
      state: [{ action: "create" }, { type: "create" }],
    });
    // setPageNumber(pageNumber);
  };
  const exportData = async () => {
    await dispatch(lossDataDetailsAction({locationId:locationId,refNo:selectedRefNo,branch:selectedBranch,region:region,department:department,eventStatus:eventstatus,reportStatus:reportstatus,pageNumber:pageNumber,minDate:minDate, maxDate:maxDate, isexport:true}))
    .then(async (response:any) =>{
    let dataRes= response?.payload?.requestData?.data?.data[0];
    let result= dataRes?.lossData;
    // console.log("results", results);

    const worksheet = XLSX.utils.json_to_sheet(
      await creationOfColumnNames(result)
    );
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    let blob = new Blob([excelBuffer], {
      type: EXCEL_TYPE,
    });
    let url = window.URL.createObjectURL(blob);
    saveAs(
      url,
      "ORM_LossDataDetails" +
        "_Data_" +
        new Date().toString().substring(0, 10) +
        EXCEL_EXTENSION
    );
    })
  };
  const creationOfColumnNames = async (results: any) => {
    let arr: any[];
    let object = {};
    arr = [];
    console.log("results_1", results);

    results?.forEach((elements: any) => {
      let dateOfOccurrence:string =elements["dateOfOccurrence"];
      let dateReported:string= elements["dateReported"]
      let dateDiscovered:string= elements["dateDiscovered"]
      dateDiscovered=dateDiscovered?.substring(0,10)
      dateReported=dateReported?.substring(0,10) + " " + dateReported?.substring(11,16)
      dateOfOccurrence = dateOfOccurrence?.substring(0,10)    
      let approvedDate:string= elements["approvedDate"]
      if(approvedDate)approvedDate=approvedDate?.substring(0,10) + " " + approvedDate?.substring(11,16);
      object = {};
      
      Object.assign(object, {
        "RefId": elements["refNum"],
      });
      Object.assign(object, { "Department": elements["department"] });
      Object.assign(object, { "Branch": elements["branch"] });
      Object.assign(object, { "Region": elements["region"] });
      Object.assign(object, { "Loss Type": elements["lossType"] });
      Object.assign(object, { "Currency": elements["currency"] });
      Object.assign(object, {
        "Date Of Occurence": dateOfOccurrence,
      });
      Object.assign(object, { "Date Discovered": dateDiscovered});
      Object.assign(object, { "Date Reported": dateReported});
      Object.assign(object, {
        "Detailed LossEvent": elements["detailedLossEvent"],
      });
      Object.assign(object, { "Root Cause": elements["rootCause"] });
      Object.assign(object, { "Event Status": elements["eventStatus"] });
      Object.assign(object, { "Report Status": elements["reportStatus"] });
      Object.assign(object, { "Recovery Mode": elements["recoveryMode"] });
      Object.assign(object, { "Staff Involvement": elements["staffInvolvement"] });
      
      Object.assign(object, { "Near Miss": elements["nearMiss"] });
      Object.assign(object, { "Potential Loss": elements["potentialLoss"] });
      Object.assign(object, {
        "Gross Actual Loss": elements["grossActualLoss"],
      });
      Object.assign(object, {
        "Further Recovery": elements["furtherRecovery"],
      });
      Object.assign(object, { "Net Actual Loss": elements["netActualLoss"] });
      Object.assign(object, { "Amount Involved": elements["amountInvolved"] });
      Object.assign(object, {
        "Amount Recovered": elements["amountRecovered"],
      });
      
      Object.assign(object, {
        "InternalBusinessLineId": elements["internalBusinessLineId"],
      });
      Object.assign(object, { "RiskSource Id": elements["riskSourceId"] });
      Object.assign(object, {
        "Process Involved": elements["processInvolved"],
      });
      // Object.assign(object, { "Approved By": elements["approvedByName"] });
      // Object.assign(object, { "Approved Date": approvedDate});
      Object.assign(object, { "Reviewed By": elements["validatorILOUserName"] });
      Object.assign(object, { "Reviewed Date": approvedDate});
      Object.assign(object, { "Reviewer Comments": elements["reviewerComments"] });
      Object.assign(object, { "Internal Business Line": elements["internalBusinessLineId"] });
      Object.assign(object, { "Process Involved ": elements["processInvolved"] });
      Object.assign(object, { "Staff Job Role ": elements["staffJobRole"] });
      Object.assign(object, { "Basel Event TypeI ": elements["baselEventTypeI" ]});
      Object.assign(object, { "Basel Event TypeII ": elements["baselEventTypeII"] });
      Object.assign(object, { "Basel Event TypeIII ": elements["baselEventTypeIII" ]});
      Object.assign(object, { "Basel Level1 BusinessLine ": elements["baselLevel1BusinessLine"] });
      Object.assign(object, { "Basel Level2 BusinessLine ": elements["baselLevel2BusinessLine"] });
      Object.assign(object, { "RootCause (BORM) ":elements[ "rootCauseTypeBORM"] });
      Object.assign(object, { "Risk Source ": elements["riskSource"] });
      Object.assign(object, { "Lesson Learnt ": elements["lessonLearnt" ]});
      Object.assign(object, { "Update History ": elements["updateHistory"] });


      arr.push(object);
    });
    return arr;
  };

  const searchQuery = async (event: any) => {
    if(getCurrentRole()=="admin"){
      fetchData(0,selectedRefNo,selectedBranch,region,department,eventstatus,reportstatus,1,false, minDate,maxDate);
    }else{
      fetchData(locationId,selectedRefNo,"","","",eventstatus,reportstatus,1,false, minDate,maxDate);
    }
  };

  const ClearFilter = () => {
    setPageNumber(1);
    setSelectedRefNo("");
    setEventstatus("");
    setReportstatus("");
    setStatus("");
    setDateSearch(false);
    setMinDate((new Date(new Date().setMonth(new Date().getMonth() - 3))).toLocaleDateString('en-CA'));
    setMaxDate(new Date().toLocaleDateString('en-CA'));
    if(getCurrentRole() === "admin"){
      setDepartment("");
      setRegion("");
      setSelectedBranch("");
      fetchData(0,"","","","","","",pageNumber,false,(new Date(new Date().setMonth(new Date().getMonth() - 3))).toLocaleDateString('en-CA'), new Date().toLocaleDateString('en-CA') );

    }else{
    fetchData(locationId,"","","","","","",pageNumber,false,(new Date(new Date().setMonth(new Date().getMonth() - 3))).toLocaleDateString('en-CA'), new Date().toLocaleDateString('en-CA') );
    }

  };

  const UpdateStatusValues = async (value:string, tCount:number) =>{
    setReportstatus(value);
    setStatus(value);
    if(getCurrentRole()=="admin"){
      fetchData(0,selectedRefNo,selectedBranch,region,department,eventstatus,value,1,false, minDate,maxDate);
    }else{
      fetchData(locationId,selectedRefNo,"","","",eventstatus,value,1,false, minDate,maxDate);
    }
    setTotalCount(tCount);

  }

  return (
    <>
      <PageHeader title="Loss Data"></PageHeader>
     <TableCard>
        <TableFiltersContainer>
          <div className="tableHeaderDetails transResp">
            <div className="details">
              <h3 className="title">Loss Data List</h3>
              <div>
                {/* <p className={styles?.title}>Total Count: {totalCount}</p> */}
              </div>
            </div>
            { ((userState?.userData?.data?.data?.userRole?.toString()?.toLowerCase()?.includes("admin")) || (userState?.userData?.data?.data?.userRole?.toString()?.toLowerCase()?.includes("rlo")) )
            &&
            <div className="elementsRight">
              <div className="row gx-3">
                <div className="col-auto">
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      setOpenCreateLossdata();
                    }}
                  >
                    Create Loss Data
                  </Button>
                </div>
              </div>
            </div>}
          </div>
        </TableFiltersContainer>
        <TableFiltersContainer>
          <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" onClick={() => UpdateStatusValues("", allCount)} checked={status === ""}/>
            <label className="btn btn-outline-primary" htmlFor="btnradio1">All({allCount})</label>

            <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" onClick={() => UpdateStatusValues("Submitted", submitCount)} checked={status === "Submitted"} disabled={submitCount==0}/>
            <label className="btn btn-outline-primary" htmlFor="btnradio2">Submitted({submitCount}) </label>

            <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" onClick={() => UpdateStatusValues("Draft", draftCount)} checked={status === "Draft"} disabled={draftCount==0}/>
            <label className="btn btn-outline-primary" htmlFor="btnradio3">Draft({draftCount}) </label>

            <input type="radio" className="btn-check" name="btnradio" id="btnradio4" autoComplete="off" onClick={() => UpdateStatusValues("Approved", approveCount)} checked={status === "Approved"} disabled={approveCount==0}/>
            <label className="btn btn-outline-primary" htmlFor="btnradio4">Approved({approveCount}) </label>

            <input type="radio" className="btn-check" name="btnradio" id="btnradio5" autoComplete="off" onClick={() => UpdateStatusValues("Rejected", rejectCount)} checked={status === "Rejected"} disabled={rejectCount==0}/>
            <label className="btn btn-outline-primary" htmlFor="btnradio5">Rejected({rejectCount}) </label>

            {/* <input type="radio" className="btn-check" name="btnradio" id="btnradio6" autoComplete="off" onClick={() => UpdateStatusValues("Submitted-UpdatedByBORM", updatedByBORMCount)} checked={status === "Submitted-UpdatedByBORM"} disabled={updatedByBORMCount==0}/>
            <label className="btn btn-outline-primary" htmlFor="btnradio6">Submitted-UpdatedByBORM({updatedByBORMCount}) </label> */}

            <input type="radio" className="btn-check" name="btnradio" id="btnradio7" autoComplete="off" onClick={() => UpdateStatusValues("Approved-UpdatedByBORM", aUpdatedByBORMCount)} checked={status === "Approved-UpdatedByBORM"} disabled={aUpdatedByBORMCount==0}/>
            <label className="btn btn-outline-primary" htmlFor="btnradio7">Approved-UpdatedByBORM({aUpdatedByBORMCount}) </label>
{/*             
            <input type="radio" className="btn-check" name="btnradio" id="btnradio8" autoComplete="off" onClick={() => UpdateStatusValues("Rejected-UpdatedByBORM", rUpdatedByBORMCount)} checked={status === "Rejected-UpdatedByBORM"} disabled={rUpdatedByBORMCount==0}/>
            <label className="btn btn-outline-primary" htmlFor="btnradio8">Rejected-UpdatedByBORM({rUpdatedByBORMCount}) </label> */}
          
          </div>
        </TableFiltersContainer>
        <TableFiltersContainer>
          <div className="">
            <div className="mb-2">
              <strong>Filter Search</strong>
              <span> Date Of Occurence : {minDate} - {maxDate} </span>
            </div>
            <div className="row gx-2">
              <div className="col-auto">
              <div className="form-group">
              <div className="col-auto">
              <Dropdown
                      externalToggle={true}
                      handleClose={() => setOpenDatePicker(false)}
                      open={openDatePicker}
                      contentWidth={true}
                      content={
                        <DropdownContentContaner>
                          <DateRangePicker
                            close={() =>{setOpenDatePicker(false);}}
                              onApply={(values) => {
                                setOpenDatePicker(false);
                                setDateSearch(true);
                                const min = (new Date(values[0])).toLocaleDateString('en-GB', {
                                  year: 'numeric',
                                  month: '2-digit',
                                  day: '2-digit',
                              }).split('/').reverse().join('-');
                              setMinDate(min)
                                const max = (new Date(values[1])).toLocaleDateString('en-GB', {
                                  year: 'numeric',
                                  month: '2-digit',
                                  day: '2-digit',
                              }).split('/').reverse().join('-');
                              setMaxDate(max)
                              }}
                            />
                        </DropdownContentContaner>
                      }
                    >
                      <IconButton
                        icon={<CalendarIcon />}
                        iconPosition="right"
                        buttonTitle="Date Of Occurence"
                        onClick={() => setOpenDatePicker(!openDatePicker)}
                      />
                    </Dropdown>
              </div>
              </div>
                 {/* <Dropdown
                  externalToggle={true}
                  handleClose={() => setOpenDatePicker(false)}
                  open={openDatePicker}
                  contentWidth={true}
                  content={
                    <DropdownContentContaner>
                      <DateRangePicker
                        close={() =>{setOpenDatePicker(false);}}
                        onApply={(values) => {
                          setOpenDatePicker(false);
                          const min = (new Date(values[0])).toLocaleDateString('en-GB', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        }).split('/').reverse().join('-');
                        setMinDate(min)
                          const max = (new Date(values[1])).toLocaleDateString('en-GB', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        }).split('/').reverse().join('-');
                        setMaxDate(max)
                        console.log('min',min)
                        console.log('max',max)
                        }}
                      />
                    </DropdownContentContaner>
                  }
                >
                  <IconButton
                    icon={<CalendarIcon />}
                    buttonTitle="Date of Occurence"
                    onClick={() => setOpenDatePicker(!openDatePicker)}
                  />
                </Dropdown> */}
              </div>
              
            <div className="col-auto">
                <input type="text" className="form-control" id="" placeholder="Ref Id" name="" value={selectedRefNo}
              onChange={(e)=>{setSelectedRefNo(e.target.value)}}/>
              </div>
              <div className="col-auto">
                <SelectDropDown
                  setOpen={setOpenEventstatus}
                  open={openEventstatus}
                  onChange={(value) => setEventstatus(value)}
                  placeholder="Event status"
                  selectedValue={eventstatus}
                  
                  options={[
                    { label: "Open", value: "Open" },
                    { label: "Closed", value: "Closed" },
                  ]}
                />
              </div>
              { getCurrentRole() !== "admin" &&
                <> 
              {locationState.currentLocation.locationType === "B" && <>
              <div className="col-auto">
              <input type="text" className="form-control" id="" placeholder="Branch" name="" onChange={(event) => setSelectedBranch(event.target.value)} value={selectedBranch}
              disabled={getCurrentRole() !== "admin"}/>

              </div>
              <div className="col-auto">
              <input type="text" className="form-control" id="" placeholder="Region" name="" onChange={(event) => setRegion(event.target.value)} value={region}
                disabled={getCurrentRole() !== "admin"}/>

              </div>
              </>}
              {locationState.currentLocation.locationType === "D" && <div className="col-auto">
              <input type="text" className="form-control" id="" placeholder="Department" name="" onChange={(event) => setDepartment(event.target.value)} value={department}
                disabled={getCurrentRole() !== "admin"}/>

              </div>}
              </>}

              { getCurrentRole() === "admin" &&
                <> 
              
              <div className="col-auto">
              <input type="text" className="form-control" id="" placeholder="Branch" name="" onChange={(event) => setSelectedBranch(event.target.value)} value={selectedBranch}
              disabled={getCurrentRole() !== "admin"}/>

              </div>
              <div className="col-auto">
              <input type="text" className="form-control" id="" placeholder="Region" name="" onChange={(event) => setRegion(event.target.value)} value={region}
                disabled={getCurrentRole() !== "admin"}/>

              </div>
              <div className="col-auto">
              <input type="text" className="form-control" id="" placeholder="Department" name="" onChange={(event) => setDepartment(event.target.value)} value={department}
                disabled={getCurrentRole() !== "admin"}/>

              </div>
              </>}

              <div className="col-auto">
                <Button onClick={(e) => searchQuery(e)}
                disabled={!dateSearch && selectedRefNo === "" && department === "" && region === "" && selectedBranch == "" && eventstatus === "" }
                >Search</Button>
              </div>
              <div className="col-auto">
                <IconButton
                  icon={<FilterIcon />}
                  buttonTitle="Clear Filter"
                  variant="textIconButtonOnly"
                  onClick={ClearFilter}
                />
              </div>
            </div>
          </div>
          <div className="col-auto align-self-center">
            <Button color="purple" variant="export" onClick={exportData}>Export</Button>
          </div>
        </TableFiltersContainer>
        <div className="sameWidth ">
        <RloLossTable
          props={data}
          request={requestID}
          totalCount={totalCount}
          onChangePage={handlePaginationChange}
          paginator={paginator}
        />
        </div>
      </TableCard>
    </>
  );
};
export default RloLossData;
