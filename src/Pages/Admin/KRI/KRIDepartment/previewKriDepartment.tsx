import { useLocation, useNavigate } from "react-router-dom";
import { BackButton, Button, CancelButton, IconButton } from "../../../../Components/Buttons";
import { PageHeader } from "../../../../Components/PageShared";
import { EditIcon, FilterIcon } from "../../../../Components/Icons";
import AlertBox from "../../../../Components/PageShared/Admin/Alert/alert";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppStateSelector } from "../../../../Services/Store/hooks";
import { UpdateStatusAction, createNewKriReportAction, getPreviewKriAction } from "../../../../Services/Actions/kriAction";
import { getCurrentRole } from "../../../../Services/Utils/route";


const PreviewKriDepartment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [openAlertBox, setOpenAlertBox] = useState(false);
  const [openConfBox, setOpenConfBox] = useState(false);
  const [openConfNillBox, setOpenConfNillBox] = useState(false);
  const [openNillAlertBox, setOpenNillAlertBox] = useState(false);
  // const [totalKri, setTotalKri] = useState(0);
  // const [filledKri, setFilledKri] = useState(0);
  const dispatch = useAppDispatch();
  const [ pageData, setPageData] = useState<any[]>([]);
  const authState:any = useAppStateSelector((state) => state.authState);
  let locationState:any = useAppStateSelector((state) => state.locationDataState)
const [branch,setBranch] = useState("");
const [region,setRegion] = useState("");
const [department,setDepartment] = useState("");
  useEffect(()=>{
    if(getCurrentRole()!=="admin"){
    if(locationState.currentLocation.locationType === "B"){
      setBranch(locationState.currentLocation.locationName);
      setRegion(locationState.currentLocation.region);
    }else{
      setDepartment(locationState.currentLocation.locationName);
    } }
    if(state){
    let x=[];
    x.push(state[0]);
    fetchData(x,[]);
    }
    // setTotalKri(KriState?.data?.data?.length);
    // setFilledKri(state[0].length)
  },[]);

  const KriState:any = useAppStateSelector((state) => state?.kriState?.newKriData);

 const fetchData= async(ids:number[],rids:number[]) =>{

  await dispatch(getPreviewKriAction({ids:ids, rids:rids})).then((response:any) =>{
  const result= response?.payload?.requestData?.data.data;
  setPageData(result);
console.log(result)
const hasNonEmptyKriData = result.some((item:any) => item.kriData === "");
const flag:boolean = hasNonEmptyKriData;
if(flag){
  setOpenNillAlertBox(flag);
}

 });
  }

  // const FillNillKri = async() =>{
  //   const totalKriIds= KriState?.data?.data.map((item:any) => item.id);
  //   const filledMMKriIds= pageData.map((data) =>data.kriMetricMasterId);
  //   const differentItems: number[] = totalKriIds.filter((item:any) => !filledMMKriIds.includes(item));

  //   const kriReportId = pageData[0].kriReportId;
  //   const frequecy= pageData[0].frequency;
  //   const status = "Nill Kri";
  //   const createdById= 1;
  //   const removedEntries:any[]=[];

  //   await dispatch( 
  //     createNewKriReportAction({ refNum:kriReportId,reportingPeriod:frequecy,locationId:2,locationType:"",status:status, createdById: createdById , kris:differentItems, removeKris:removedEntries
  //   })  
  //   ) .then((response:any) => {
  //    const result= response?.payload?.requestData?.data?.data;
  //    if(result){
  //     setOpenConfNillBox(true);
  //    }
  //   })
  // }

  const UpdateNillKri =() => {    
    fetchData(state[0],[]);
    setOpenConfNillBox(false);
  }
  const closeAlert = async( result: string) => {
    console.log('Clicked:', result);
    if(result==="ok") {
        console.log('Clicked:', pageData[0]?.kriReportId);
        await updateSubmitStatus(pageData[0]?.kriReportId);
    }
    
  };
  // const closeNillAlert = ( result: string) => {
  //   console.log('Clicked:', result);
  //   if(result==="ok") {
  //     FillNillKri();
  //   }
  // };
  const updateSubmitStatus  = async(id:number)=>{
    await dispatch(UpdateStatusAction({id})).then((response:any)=>{
      const result= response.payload.requestData.data;
      if(result.code="00"){
        setOpenConfBox(true);
      }
    });
  }
 const RedirectToGrid = async(result: string) => {
  if(result){
  setOpenAlertBox(false);
  setOpenConfBox(false);
  const url='/kri-department';
  let userRole:string=authState?.userData?.data?.data?.userRole;
      userRole=userRole?.toLocaleLowerCase();
      navigate(`/${userRole}${url}`);
  }
 }
  const EditHandler = (ActivePage:number) => {
    let metrics = pageData.map(item => item.metricId);
    ActivePage+=1;
    // setEdit(true);
    // return <FormRegistration Kris={SelectedKris} refNo={refno} data={data} kriReportId={kriReportId} metricIds={metricIds}/>
    const url='/start-kri-data-department';
    let userRole:string=authState?.userData?.data?.data?.userRole;
      userRole=userRole?.toLocaleLowerCase();
    navigate(`/${userRole}${url}`,{
     state:[{ActivePage},{refNo:pageData[0]?.reportRefNo},{data:metrics},{kriReportId : pageData[0]?.kriReportId},{metricIds:metrics},{reportingPeriod:pageData[0]?.reportingPeriod}]
   });
  }
  
  const GotoStart =()=>{
    let id = pageData[0]?.kriReportId;
    let loc = pageData[0]?.locationId;
    const url='/log-kri-create-edit';
    let userRole:string=authState?.userData?.data?.data?.userRole;
      userRole=userRole?.toLocaleLowerCase();
    navigate(`/${userRole}${url}`,{
     state:[{id},{loc},{mode:"edit"}]
    });
  }
  return (
    <>
      <PageHeader title="Preview KRI Report Detail"></PageHeader>
      <div className="col-auto">
                <IconButton
                icon={<EditIcon />}
                buttonTitle="Edit Report"
                variant="textIconButtonOnly"
                onClick={() => GotoStart()}
                />
            </div>
      <div className="grayBox">
          <div className="row gx-2">
            <div className="col-2">
              <div className="form-group">
                <label htmlFor="">Reference Number</label>
                <div className="viewBoxContent">{pageData[0]?.reportRefNo}</div>
              </div>
            </div>
            <div className="col-2">
              <div className="form-group">
                <label htmlFor="">Date Reported</label> 
                <div className="viewBoxContent">
                <div >{pageData[0]?.dateReported.toString().substring(0,10)}</div>
                <div >{pageData[0]?.dateReported.toString().substring(11,19)}</div>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Branch/Department</label>
                {locationState.currentLocation.locationType === "D" && <div className="viewBoxContent">{department}</div>}
                {locationState.currentLocation.locationType === "B" && <div className="viewBoxContent">{branch}</div>}
              </div>
            </div>
            <div className="col-2">
              <div className="form-group">
                <label htmlFor="">Region</label>
                <div className="viewBoxContent">{region}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Reporting Period</label>
                <div className="viewBoxContent">{pageData[0]?.reportingPeriod}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">ICO/GIA</label>
                <div className="viewBoxContent">{pageData[0]?.validatorILOUserName}</div>
              </div>
            </div>
          </div>
      </div>
      {/* <div className="pageCard mb-3">
        <div className="row align-items-center">
          <div className="col-auto">
            <h5 className="">Please fill all the KRIs assigned to Branch/Department to submit finally.</h5>
          </div>
          <div className="col-auto">
            <IconButton
            icon={<EditIcon />}
            buttonTitle="Edit Report"
            variant="textIconButtonOnly"
            onClick={()=>GotoStart()}
            />
          </div>
        </div>
      <div className="grayBox">
        <div className="row mb-3 align-items-center">
          <div className="col-auto">
            Total KRI Indicators: <span className="badge"><div className="Submitted">{totalKri}</div></span>
          </div>
          <div className="col-auto">
            Filled KRI Indicators: <span className="badge"><div className="Approved">{pageData?.length}</div></span>
          </div>
          <div className="col-auto">
            {totalKri !=  pageData?.length  && <Button variant="contained" color="primary" onClick={()=>setOpenNillAlertBox(true)}> Fill Remaining Indicators as Nill KRI ! </Button>  }
          </div>
        </div>        
      </div>
      </div> */}
      
      {pageData.map((data, index) => (
      <div key={index} className="pageCard mb-4">
        <div className="row align-items-center">
            <div className="col-auto mb-3">
              <strong>{data?.kriMetricTitle}</strong>
              <span className="badge text-bg"><div className="Submitted"> {data?.riskAppetiteThreshold}</div></span>
              {data?.kriData=="" &&  <span className="badge text-bg"><div className="Incomplete"> Incomplete</div></span>}
            </div>
        </div>
        <div className="grayBox">
          <div className="row gx-2">
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Date of Occurrence</label>
                <div className="viewBoxContent">{data?.dateOccurance?.toString().substring(0,10)}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Number/Percentage</label>
                <div className="viewBoxContent">{data?.kriData}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Amount Involved</label>
                <div className="viewBoxContent">{data?.amountInvolved}  {data?.currency}</div>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Mitigation Plan/Actions</label>
                <div className="viewBoxContent">
                {data?.mitigationPlan}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Detailed Description Of Incident</label>
                <div className="viewBoxContent">
                {data?.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ))}
          
      <div className="row mb-4">
        <div className="col-auto">
            <Button onClick={() => { setOpenAlertBox(true);}} 
            disabled={openNillAlertBox}
            >Submit</Button>
        </div>
        <div className="col-auto">
            <Button onClick={GotoStart}>Cancel</Button>
            {openAlertBox && <AlertBox open={openAlertBox} setopen={setOpenAlertBox} data={"msg"} title={"Alert"} message={"Are you sure you want to submit ?"} btn1={"OK"} btn2={"Cancel"} onClose={closeAlert} />}
            {/* {openNillAlertBox && <AlertBox open={openNillAlertBox} setopen={setOpenNillAlertBox} data={"msg"} title={"Alert"} message={"Are you sure you want to submit remaining Indicators as Nill KRI ?"} btn1={"OK"} btn2={"Cancel"} onClose={closeNillAlert} />} */}
            {openConfBox && <AlertBox open={openConfBox} setopen={setOpenConfBox} data={"msg"} title={"Alert"} message={"Report has been Submitted Successfully!"} btn1={"OK"} btn2={""} onClose={RedirectToGrid} />}
            {openConfNillBox && <AlertBox open={openConfNillBox} setopen={setOpenConfNillBox} data={"msg"} title={"Alert"} message={"Reports updated as NILL KRI successfully!"} btn1={"OK"} btn2={""} onClose={UpdateNillKri} />}
        </div>
      </div>
    </>
  );
};
export default PreviewKriDepartment;
