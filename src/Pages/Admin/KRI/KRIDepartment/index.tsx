import { useEffect, useState } from "react";
import  "../../../../Assets/Styles/global.scss";
import { any } from "jest-mock-extended";
import { useNavigate } from "react-router-dom";
import { PageHeader, TableCard, TableFiltersContainer } from "../../../../Components/PageShared";
import { Button, IconButton } from "../../../../Components/Buttons";
import { CalendarIcon, FileIcon, FilterIcon } from "../../../../Components/Icons";
import CreateKri from "../createKri";
import { Dropdown, DropdownContentContaner, SelectDropDown } from "../../../../Components/DropDown";
import DepartmentTable from "./departmentTable";
import { useAppDispatch, useAppStateSelector } from "../../../../Services/Store/hooks";
import { kriDetailsAction, kriGridDetailsAction } from "../../../../Services/Actions/kriAction";
import { DateRangePicker } from "../../../../Components/DatePicker/rangePicker";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { getCurrentRole } from "../../../../Services/Utils/route";
import { UsersIcon } from "../../../../Layouts/Sidebar/icons";
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

type MyData = {
  id: number;
  name: string;
  completeddate: string;
};
type IParameters = {
  PageNumber: number;
  RequestId: string;
  minDate: string;
  maxDate: string;
};

const KRIDepartment = () => {
  const navigate = useNavigate();
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openDatePickerTo, setOpenDatePickerTo] = useState(false);
  const [date, setDate] = useState(new Date().toLocaleDateString("fr-FR"));
  const [openTypeType, setOpenTypeType] = useState(false);
  const [minDate, setMinDate]  = useState((new Date(new Date().setMonth(new Date().getMonth() - 3))).toLocaleDateString('en-CA'));
  const [maxDate, setMaxDate] = useState(new Date().toLocaleDateString('en-CA'));
  
  const [data, setData] = useState<MyData[]>([]);
  const [requestID, setRequestID] = useState("");
  const [totalCount, setTotalCount] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [paginator, setpaginator] = useState(true);
  const [submitCount, setSubmitCount] = useState(0);
  const [draftCount, setDraftCount] = useState(0);
  const [approveCount, setApproveCount] = useState(0);
  const [rejectCount, setRejectCount] = useState(0);
  const [allCount, setAllCount] = useState(0);
  const [locationId, setLocationId] = useState(0);
  
  const [ dataGrid,setDataGrid ] = useState<any>([])
  const [branch, setBranch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [refNum, setRefNum] = useState("");
  const [isExport, setIsExport] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [dateSearch, setDateSearch] = useState(false);
  let userState:any = useAppStateSelector((state) => state.authState)
  let locationState:any = useAppStateSelector((state) => state.locationDataState)
const[region,setRegion] =useState("");

  useEffect(() => {  
    if(getCurrentRole() !== "admin"){
      setLocationId(locationState.currentLocation.locationId);
    if(locationState.currentLocation.locationType === "B"){
      setBranch(locationState.currentLocation.locationName);
      setRegion(locationState.currentLocation.region);
      fetchData(locationState.currentLocation.locationId,refNum,"","",status,1,minDate,maxDate, false)
    }else{
      setDepartment(locationState.currentLocation.locationName);
      fetchData(locationState.currentLocation.locationId,refNum,"","",status,1,minDate,maxDate, false)
    } }else{
      fetchData(0,refNum,"","",status,1,minDate,maxDate, false)
    }
    
      // if(!refresh) {fetchData(locationId,refNum,branch,department,status,1,minDate,maxDate, false) }  
    },[]);
    
    useEffect(() => {

      if(refresh) {
      setRefresh(false);
      if(getCurrentRole()==="admin"){
        fetchData(0,refNum,"","",status,1,minDate,maxDate, false); 
      }else{
      fetchData(locationId,refNum,"","",status,1,minDate,maxDate, false); 
      }
    }   
      },[refresh]);
    const dispatch = useAppDispatch();

    const fetchData = async(locationId:number,refNo?:string, branch?:string, department?:string, status?:string, pageNo?:number,minDate?:string,maxDate?:string, isExport?:boolean) => {
      await dispatch( 
        kriGridDetailsAction({locationId:locationId,refNo:refNo, branch:branch,department:department, status:status, PageNumber:pageNo,minDate:minDate,maxDate:maxDate, isExport:isExport})  
      ) .then((response:any) => {
        if(response?.payload?.requestData?.data?.code==="00"){
          const result= response?.payload?.requestData?.data?.data[0];
          console.log(result);      
          setDataGrid(result?.kriData);
          setTotalCount(response?.payload?.requestData?.data?.total);
          setSubmitCount(result?.recordCounts?.submittedCount);
          setApproveCount(result?.recordCounts?.approvedCount);
          setDraftCount(result?.recordCounts?.draftCount);
          setRejectCount(result?.recordCounts?.rejectCount);
          setAllCount(result?.recordCounts?.submittedCount + result?.recordCounts?.approvedCount + result?.recordCounts?.draftCount + result?.recordCounts?.rejectCount);
        }
       
      })
    }

    const handlePaginationChange = (pageNumber: number) => {
      setPageNumber(pageNumber);
       fetchData(locationId,refNum,branch,department,status,pageNumber,minDate,maxDate,isExport);
    };
  const [openCreateKri, setOpenCreateKri] = useState(false);
  const handleCreateKriClick = () => {
     let userRole:string=userState?.userData?.data?.data?.userRole;
     userRole=userRole?.toLocaleLowerCase();
     const url='/create-kri';
     navigate(`/${userRole}${url}`);
  };
  const handleCreateKriData = () => {
    // const url='/log-kri-data-department';
    const url='/log-Kri-Create-Edit'; 
    let userRole:string=userState?.userData?.data?.data?.userRole;
    userRole=userRole?.toLocaleLowerCase();
    navigate(`/${userRole}${url}`);
  };
  const handleManageKri = () => {
    const url='/all-kri'; 
    let userRole:string=userState?.userData?.data?.data?.userRole;
    userRole=userRole?.toLocaleLowerCase();
    navigate(`/${userRole}${url}`);
  };
  // if(dataGrid.length>0)

  const exportData = async() =>{
    let result:any[]=[];
    let locationId:number=0;
    if(getCurrentRole()!="admin"){
      locationId= locationState.currentLocation.locationId
    }
    await dispatch( 
      kriDetailsAction({locationId:locationId,refNo:refNum, branch:"", status:status, PageNumber:pageNumber, minDate:minDate, maxDate:maxDate, isExport:true})  
    ) .then(async (response:any) => {
     result= response?.payload?.requestData?.data.data;
    
      let results= result;
        const worksheet = XLSX.utils.json_to_sheet(await creationOfColumnNames(results));
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        let blob = new Blob([excelBuffer], {
            type:EXCEL_TYPE
          });
          let url = window.URL.createObjectURL(blob);
          saveAs(url, 'ORM_KriReportDetails'+'_Data_'+ new Date().toString().substring(0,10) + EXCEL_EXTENSION); 
  
        })
      }
  const creationOfColumnNames = async (results:any) => {
    let arr: any[];
    let dateOccurance="";
    let dateReported="";
    let object ={}
     arr = []
     results?.forEach((elements:any)=> {
      dateOccurance=elements['dateOccurance'];
      dateReported=elements['dateOccurance'];
      dateOccurance=dateOccurance?.substring(0,10) + " " + dateOccurance?.substring(11,16);
      dateReported=dateReported?.substring(0,10) + " " + dateReported?.substring(11,16) ;
     object ={}
     Object.assign(object, {'Reference Number': elements['reportRefNo']});
     Object.assign(object, {'Location Name': elements['locationName']});
     Object.assign(object, {'Location Type': elements['locationType']});
     Object.assign(object, {'Region': elements['region']});
     Object.assign(object, {'Reporting Period': elements['reportingPeriod']});
     Object.assign(object, {'Report Status': elements['reportStatus']});
     Object.assign(object, {'Reviewed By': elements['validatorILOUserName']});
     Object.assign(object, {'Kri Metric': elements['kriMetricTitle']});
     Object.assign(object, {'Number/Percentage': elements['kriData']});
     Object.assign(object, {'Amount Envolved': elements['amountInvolved']});
     Object.assign(object, {'Currency': elements['currency']});
     Object.assign(object, {'Mitigation Plan': elements['mitigationPlan']});
     Object.assign(object, {'Description': elements['description']});
     Object.assign(object, {'Risk Appetite Threshold': elements['riskAppetiteThreshold']});
     Object.assign(object, {'Reviewer Comments': elements['comments']});
     Object.assign(object, {'Submitted By': elements['submittedBy']});
     Object.assign(object, {'Date Submitted': dateReported});
     Object.assign(object, {'Date of Occurance': dateOccurance});

     arr.push(object)
     })
    return arr;
  }
  const UpdateStatusValues = (value:string) =>{
    setStatus(value);
    if(value === "" ){
      fetchData(locationId,refNum,"","",value,pageNumber,minDate,maxDate,false)
    }else{
      fetchData(locationId,refNum,"","",value,1,minDate,maxDate,false)
    }

  }

  const SearchData = () =>{
    if(getCurrentRole()==="admin"){
      fetchData(0,refNum,branch,department,status,1,minDate,maxDate,false)
    }else{
      fetchData(locationId,refNum,"","",status,1,minDate,maxDate,false)
    }
  }

  const ClearFilters = () =>{
    setStatus("");
    if(getCurrentRole() === "admin"){
      setBranch("");
      setDepartment("");
    }
    setRefNum("");
    setDateSearch(false);
    setMinDate((new Date(new Date().setMonth(new Date().getMonth() - 3))).toLocaleDateString('en-CA'));
    setMaxDate(new Date().toLocaleDateString('en-CA'));

    fetchData(locationId,"","","","",pageNumber,(new Date(new Date().setMonth(new Date().getMonth() - 3))).toLocaleDateString('en-CA'),new Date().toLocaleDateString('en-CA'),false);
  }
  
  return (
    <>
      <PageHeader title="Key Risk Indicators"></PageHeader>
      <TableCard>
        <TableFiltersContainer>
          <div className="tableHeaderDetails transResp">
            <div className="details">
              <h3 className="title">KRI Reports</h3>
              {/* <div>
                <p className="subtitle" data-toggle="tooltip" data-html="true" title="<em>Tooltip</em> <u>with</u> <b>HTML</b>">Total Count: {totalCount}</p>
              </div> */}
            </div>
            <div>
                <div className="row gx-3">
                    <div className="col-auto">
                        {
                          getCurrentRole()==="admin" 
                          &&
                          <Button onClick={()=> handleManageKri()}>Manage KRI Metrices</Button>
                          }
                    </div>
                    { getCurrentRole()==="rlo" &&
                    <div className="col-auto">
                        <Button onClick={()=> handleCreateKriData()}>Create KRI Report</Button>
                    </div>}
                </div>
            </div>
          </div>
        </TableFiltersContainer>
        <TableFiltersContainer>
          <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" onClick={() => UpdateStatusValues("")} checked={status === ""} disabled={allCount==0}/>
            <label className="btn btn-outline-primary" htmlFor="btnradio1">All({allCount})</label>

            <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" onClick={() => UpdateStatusValues("Submitted")} checked={status === "Submitted"} disabled={submitCount==0}/>
            <label className="btn btn-outline-primary" htmlFor="btnradio2">Submitted({submitCount}) </label>

            <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" onClick={() => UpdateStatusValues("Draft")} checked={status === "Draft"} disabled={draftCount==0}/>
            <label className="btn btn-outline-primary" htmlFor="btnradio3">Draft({draftCount}) </label>

            <input type="radio" className="btn-check" name="btnradio" id="btnradio4" autoComplete="off" onClick={() => UpdateStatusValues("Approved")} checked={status === "Approved"} disabled={approveCount==0}/>
            <label className="btn btn-outline-primary" htmlFor="btnradio4">Approved({approveCount}) </label>

            <input type="radio" className="btn-check" name="btnradio" id="btnradio5" autoComplete="off" onClick={() => UpdateStatusValues("Rejected")} checked={status === "Rejected"} disabled={rejectCount==0}/>
            <label className="btn btn-outline-primary" htmlFor="btnradio5">Rejected({rejectCount}) </label>
          </div>
      </TableFiltersContainer>
        <TableFiltersContainer>
          <div className="">
            <div className="mb-2">
              <strong>Filter Search </strong>
               <span> Date Reported : {minDate} - {maxDate} </span>
            </div>
            <div className="row">
              <div className="col-auto">
                <input type="text" className="form-control" id="" placeholder="Reference Number" name="" onChange={(event) => setRefNum(event.target.value)} value={refNum}/>
              </div>
          {getCurrentRole() !== "admin" &&
            <>
            {locationState.currentLocation.locationType === "B" &&  <div className="col-auto">
                <input type="text" className="form-control" id="" placeholder="Branch" name="" onChange={(event) => setBranch(event.target.value)} value={branch}
                disabled={getCurrentRole() !== "admin" }/>
              </div>}
              {locationState.currentLocation.locationType === "D" && <div className="col-auto">
                <input type="text" className="form-control" id="" placeholder="Department" name="" onChange={(event) => setDepartment(event.target.value)} value={department}
                disabled={getCurrentRole() !== "admin" }/>
              </div>}
              </>}

              {getCurrentRole() === "admin" &&
            <>
            <div className="col-auto">
                <input type="text" className="form-control" id="" placeholder="Branch" name="" onChange={(event) => setBranch(event.target.value)} value={branch}
                disabled={getCurrentRole() !== "admin" }/>
              </div>
              <div className="col-auto">
                <input type="text" className="form-control" id="" placeholder="Department" name="" onChange={(event) => setDepartment(event.target.value)} value={department}
                disabled={getCurrentRole() !== "admin" }/>
              </div>
              </>}
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
                        buttonTitle="Date Reported"
                        onClick={() => setOpenDatePicker(!openDatePicker)}
                      />
                    </Dropdown>
              </div>
              <div className="col-auto">
                <Button onClick={SearchData}
                disabled={!dateSearch  && refNum ==="" && branch ==="" }
                >Search</Button>
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
              <Button color="purple" variant="export" onClick={exportData}>Export</Button>
          </div>
        </TableFiltersContainer>
        <div className="sameWidth">
        {dataGrid?.length>0 &&  
        <DepartmentTable
          props={dataGrid}
          request={requestID}
          totalCount={totalCount}
          onChangePage={handlePaginationChange}
          paginator={paginator}
          setRefreshs={()=>{setRefresh(true)}}
        />}
        </div>
      </TableCard>
    </>
  );
};
export default KRIDepartment;
