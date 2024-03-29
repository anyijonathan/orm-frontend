import { Button, IconButton } from "../../../Components/Buttons";
import {
  PageHeader,
  TableCard,
  TableFiltersContainer,
} from "../../../Components/PageShared";
import "../../../Assets/Styles/global.scss";
import {
  Dropdown,
  DropdownContentContaner,
  SelectDropDown,
} from "../../../Components/DropDown";
import { useState, useEffect } from "react";
import { CalendarIcon, FilterIcon } from "../../../Components/Icons";
import RcsaTable from "./rcsaTable";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useAppDispatch, useAppStateSelector } from "../../../Services/Store/hooks";
import { DateRangePicker } from "../../../Components/DatePicker/rangePicker";
import { RCSAGridDataAction } from "../../../Services/Actions/rcsaAction";
import { getCurrentRole } from "../../../Services/Utils/route";
const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
const RCSA = () => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openDatePickerTo, setOpenDatePickerTo] = useState(false);
  const [openDatePickerFilter, setOpenDatePickerFilter] = useState(false);
  const [openRcsaStatus, setOpenRcsaStatus] = useState(false);
  const [RcsaStatus, setRcsaStatus] = useState("");
  const [openRegion, setOpenRegion] = useState(false);
  const [Region, setRegion] = useState("");
  const [openBranch, setOpenBranch] = useState(false);
  const [Branch, setBranch] = useState("");
  const [openDepartment, setOpenDepartment] = useState(false);
  const [Department, setDepartment] = useState("");
  const [openUnit, setOpenUnit] = useState(false);
  const [Unit, setUnit] = useState("");
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [lang, setLang] = useState(null);
  const [langList, setLangList] = useState([]);
  const [group, setGroup] = useState([]);
  const [groupList, setgroupList] = useState([]);

  const [data, setData] = useState<any[]>();
  const [totalCount, setTotalCount] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [paginator, setpaginator] = useState(true);
  const dispatch = useAppDispatch();  
  const authState:any = useAppStateSelector((state) => state.authState)
  const locationState:any = useAppStateSelector((state) => state.locationDataState);
  const [minDate, setMinDate]  = useState((new Date(new Date().setMonth(new Date().getMonth() - 3))).toLocaleDateString('en-CA'));
  const [maxDate, setMaxDate] = useState(new Date().toLocaleDateString('en-CA'));
  const [refIdQuery,setRefIdQuery] = useState("");
const [locationId,setLocationId] = useState<number>(0);
const [locationType,setLocationType] = useState("");
const [reportStatus,setReportStatus] = useState("");
const [recordCount,setRecordCount] = useState<any>();
const [isExport,setIsExport] = useState(false);
const [submitCount, setSubmitCount] = useState(0);
  const [draftCount, setDraftCount] = useState(0);
  const [approveCount, setApproveCount] = useState(0);
  const [rejectCount, setRejectCount] = useState(0);
  const [allCount, setAllCount] = useState(0);

  const handlePaginationChange = (pageNumbers: number) => {
    setPageNumber(pageNumbers);
    // fetchData(pageNumbers,false,location,titleQuery,roleStatusQueryText);
  };

  const createRCSA = () => {
    let userRole:string=authState?.userData?.data?.data?.userRole;
    userRole=userRole.toLocaleLowerCase();
    const url = '/create-rcsa';
    return navigate(`/${userRole}${url}`, {
      state: [{ action: 'create' }, { type: "create" }]
    })
  };


  useEffect (()=>{
    if(getCurrentRole() == "admin"){
    FetchData(0,refIdQuery, "", "", "", reportStatus,minDate, maxDate, 1,false);
    }
    else{      
    setLocationId(locationState?.currentLocation?.locationId );
    setLocationType(locationState?.currentLocation?.locationType);
      if(locationState?.currentLocation?.locationType === "B"){
        setBranch(locationState?.currentLocation?.locationName);
        setRegion(locationState?.currentLocation?.region);
    FetchData(locationId,refIdQuery, "", "", "", reportStatus,minDate, maxDate, 1,false);

      }else{
        setDepartment(locationState?.currentLocation?.locationName);
    FetchData(locationId,refIdQuery, "", "", "", reportStatus,minDate, maxDate, 1,false);

      }

    }
  },[]);

  const FetchData = async (locationId:number,refNum:string, branch:string, region:string, department:string, reportStatus:string, minDate:string, maxDate:string, pageNumber:number,isExport:boolean) => {
    let res:any[]=[];
    await dispatch(
      RCSAGridDataAction(
        {
          locationId,refNum, branch, region, department, reportStatus, minDate, maxDate, pageNumber,isExport
        }
      )
    ).then((response:any) => {
      const result= response?.payload?.requestData?.data.data[0];
      setData(result?.riskData);
      console.log(result)
    setSubmitCount(result?.recordCounts?.submittedCount);
    setApproveCount(result?.recordCounts?.approvedCount);
    setDraftCount(result?.recordCounts?.draftCount);
    setRejectCount(result?.recordCounts?.rejectCount);
    setAllCount(result?.recordCounts?.submittedCount + result?.recordCounts?.approvedCount + result?.recordCounts?.draftCount + result?.recordCounts?.rejectCount);

    GotoGrid();
  });
  }
  const GotoGrid=()=>{
    let userRole:string=authState?.userData?.data?.data?.userRole;
    userRole=userRole.toLocaleLowerCase();
    const url='/rcsa';
    return navigate(`/${userRole}${url}`)
   }

  const SearchFilters = async () => {
    if(getCurrentRole()=="admin"){
      await FetchData(0,refIdQuery,  Branch, Region, Department, reportStatus, minDate, maxDate, 1,false);
    }else{
      await FetchData(locationId,refIdQuery,  "", "", "", reportStatus, minDate, maxDate, 1,false);
    }
  }
  const ClearFilters = async () => {
    
    setRefIdQuery("");
    setMinDate((new Date(new Date().setMonth(new Date().getMonth() - 3))).toLocaleDateString('en-CA'));
    setMaxDate(new Date().toLocaleDateString('en-CA'));
    if(getCurrentRole() === "admin"){
      setRegion("");
      setBranch("");
      setDepartment("");
    await FetchData(0,"","", "", "", "",(new Date(new Date().setMonth(new Date().getMonth() - 3))).toLocaleDateString('en-CA'), new Date().toLocaleDateString('en-CA'), 1,false);

    }else{
    await FetchData(locationId,"",  "", "", "", "", (new Date(new Date().setMonth(new Date().getMonth() - 3))).toLocaleDateString('en-CA'), new Date().toLocaleDateString('en-CA'), 1,false);
    }
  }

  const UpdateStatusValues = async (value:string, tCount:number) =>{
    setReportStatus(value);
    if(getCurrentRole()=="admin"){
      await FetchData(0,refIdQuery,  Branch, Region, Department, value, minDate, maxDate, 1,false);
    }else{
      await FetchData(locationId,refIdQuery,  "", "", "", value, minDate, maxDate, 1,false);
    }

    setTotalCount(tCount);

  }

  const ExportRiskReport = async () => {
    await dispatch(RCSAGridDataAction({
      refNum:refIdQuery, branch:Branch, region:Region,
       department:Department, reportStatus:reportStatus,
        minDate:minDate, maxDate:maxDate, pageNumber:1,isExport:true
    }))
    .then(async (response:any) =>{
    let dataRes= response?.payload?.requestData?.data?.data[0];
    let result= dataRes?.riskData;
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
      "ORM_RiskReport" +
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
      let createdDate:string= elements["createdDate"]
      let modifiedDate:string= elements["modifiedDate"]
      let approvedDate:string= elements["approvedDate"]
      let riskExpectedResolutionTime:string= elements["riskExpectedResolutionTime"]
      modifiedDate=modifiedDate?.substring(0,10) + " " + modifiedDate?.substring(11,16)
      createdDate=createdDate?.substring(0,10) + " " + createdDate?.substring(11,16)
      approvedDate=approvedDate?.substring(0,10) + " " + approvedDate?.substring(11,16)
      riskExpectedResolutionTime=riskExpectedResolutionTime?.substring(0,10) + " " + riskExpectedResolutionTime?.substring(11,16)
      object = {};
      Object.assign(object, {
        "RefNum": elements["refNum"],
      });
      Object.assign(object, {
        "LocationType": elements["locationType"],
      });
      Object.assign(object, {
        "LocationName": elements["locationName"],
      });
      Object.assign(object, {
        "ProcessName": elements["processName"],
      });
      Object.assign(object, {
        "SubProcessName": elements["subProcessName"],
      });
      Object.assign(object, { "Inherent Threat Risk": elements["inherentThreatRisk"] });
      Object.assign(object, { "Frequency Of Occurance": elements["frequencyOfOccurance"] });
      Object.assign(object, {
        "Risk Classification": elements["riskClassification"],
      });
      Object.assign(object, { "Risk RootCause": elements["riskRootCause"] });
      Object.assign(object, { "Risk Severity": elements["riskSeverity"] });
      Object.assign(object, {
        "Risk Direction": elements["riskDirection"],
      });
      Object.assign(object, { "Implemented Controls": elements["implementedControls"] });
      Object.assign(object, { "Risk Control Design": elements["riskControlDesign"] });
      Object.assign(object, {
        "Risk Control Type": elements["riskControlType"],
      });
      Object.assign(object, { "Risk Control Effectiveness": elements["riskControlEffectiveness"] });
      Object.assign(object, { "Risk Residual": elements["riskResidual"] });
      Object.assign(object, { "Risk Responsibility": elements["riskResponsibility"] });
      Object.assign(object, { "Risk Category": elements["riskCategory"] });
      Object.assign(object, { "Risk ResidualRating": elements["riskResidualRating"] });
      Object.assign(object, { "Risk ActionPlan": elements["riskActionPlan"] });
      Object.assign(object, { "Risk Action Plan Status": elements["riskActionPlanStatus"] });
      Object.assign(object, { "Risk Expected Resolution Time": riskExpectedResolutionTime });
      Object.assign(object, { "Risk Strategy": elements["riskStrategy"] });
      Object.assign(object, { "Report Status": elements["reportStatus"] });
      Object.assign(object, { "Update Request Status": elements["updateRequestStatus"] });
      Object.assign(object, { "Report Status": elements["reportStatus"] });
      Object.assign(object, { "Risk Control Assessment": elements["riskControlAssessment"] });
      Object.assign(object, { "Risk Control Quality": elements["riskControlQuality"] });
      Object.assign(object, { "Risk Rating": elements["riskRating"] });
      Object.assign(object, { "Reviewer Comments": elements["reviewerComments"] });
      Object.assign(object, { "Created By": elements["createdByName"] });
      Object.assign(object, { "Created Date": createdDate});
      Object.assign(object, { "Modified By": elements["modifiedByName"] });
      Object.assign(object, { "Modified Date": modifiedDate});
      Object.assign(object, { "Approved Date": approvedDate });
      Object.assign(object, { "Approved By": elements["approvedByName"] });
      arr.push(object);
    });
    return arr;
  };

  return (
    <>
      <PageHeader title="RCSA">
        { getCurrentRole() === "rlo"
        &&
          <div>
          <Button onClick={() => { createRCSA() }}>Create RCSA Report</Button>
        </div>
        }
      </PageHeader>
      <TableCard>
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

          </div>
        </TableFiltersContainer>
        <TableFiltersContainer>
          <div className="">
            <div className="mb-2">
              <strong>Filter Search</strong>
              <span> Date Of Reporting : {minDate} - {maxDate} </span>

            </div>
            <div className="row">
              <div className="col-auto">
                <div className="">
                  <div className="dateFrom">
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
                        buttonTitle="Date Of Reporting"
                        onClick={() => setOpenDatePicker(!openDatePicker)}
                      />
                    </Dropdown>
              </div>
                  </div>
                </div>
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Ref ID"
                  value={refIdQuery}
                  onChange={(event:any)=>{setRefIdQuery(event?.target.value)}}
                />
              </div>
              { getCurrentRole() !== "admin" &&
              <>
              {locationType === "B" &&
                <>
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Branch"
                  value={Branch}
                  onChange={(event:any)=>{setBranch(event?.target.value)}}
                  disabled={getCurrentRole() !== "admin"}
                />
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Region"
                  value={Region}
                  onChange={(event:any)=>{setRegion(event?.target.value)}}
                  disabled={getCurrentRole() !== "admin"}

                />
              </div>
              </>}
              {locationType === "D" &&
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Department"
                  value={Department}
                  onChange={(event:any)=>{setDepartment(event?.target.value)}}
                  disabled={getCurrentRole() !== "admin"}

                />
              </div>}

              </>}

              { getCurrentRole() === "admin" &&
              <>
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Branch"
                  value={Branch}
                  onChange={(event:any)=>{setBranch(event?.target.value)}}
                  disabled={getCurrentRole() !== "admin"}
                />
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Region"
                  value={Region}
                  onChange={(event:any)=>{setRegion(event?.target.value)}}
                  disabled={getCurrentRole() !== "admin"}

                />
              </div>
            
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Department"
                  value={Department}
                  onChange={(event:any)=>{setDepartment(event?.target.value)}}
                  disabled={getCurrentRole() !== "admin"}

                />
              </div>

              </>}

              <div className="col-auto">
                <Button onClick={()=>{SearchFilters()}}>Search</Button>
              </div>
              <div className="col-auto">
                <IconButton
                  icon={<FilterIcon />}
                  buttonTitle="Clear Filter"
                  variant="textIconButtonOnly"
                  onClick={ClearFilters}
                />
              </div>
            </div>
          </div>
          <div className="col-auto align-self-end">
            <Button variant="export" color="purple"
            onClick={ExportRiskReport}
            >
              Export
            </Button>
          </div>
        </TableFiltersContainer>
        <div className="sameWidth">
        <RcsaTable
        props={data}
        request={location}
        totalCount={totalCount}
        onChangePage={handlePaginationChange}
        paginator={paginator}
        />
        </div>
        
      </TableCard>
    </>
  );
};
export default RCSA;
