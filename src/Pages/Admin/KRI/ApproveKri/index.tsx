import { BackButton, Button, CancelButton } from "../../../../Components/Buttons";
import {
  PageHeader
} from "../../../../Components/PageShared";
import "../../../../Assets/Styles/global.scss";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SelectDropDown } from "../../../../Components/DropDown";
import { useAppDispatch, useAppStateSelector } from "../../../../Services/Store/hooks";
import { UpdatefinalKriAction, getDetailviewKriAction } from "../../../../Services/Actions/kriAction";
import AlertBox from "../../../../Components/PageShared/Admin/Alert/alert";
import { getCurrentRole } from "../../../../Services/Utils/route";


const ApproveKri = () => {
  const navigate = useNavigate();
  const [selectAprrove, setSelectAprrove] = useState(false);
  const [selectAprroveType, setSelectAprroveType] = useState("");
  const [comments, setComments] = useState("");
  const { state } = useLocation();
  const [ pageData, setPageData] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const [openAlertBox, setOpenAlertBox] = useState(false);
  const [openConfBox, setOpenConfBox] = useState(false);
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
    fetchData(state)
  },[])

  const fetchData= async(id:number) => {
    await dispatch(getDetailviewKriAction({ids:id})).then((response:any) =>{
      const result= response?.payload?.requestData?.data.data;
      setPageData(result);
      if(result.length >0){
        setComments(result[0]?.comments);
        setSelectAprroveType(result[0]?.reportStatus);
      }
  });
}
const authState:any = useAppStateSelector((state) => state.authState)

const SubmitFinalKri = async()=>{
  const userId=authState?.userData?.data?.data?.userId
await dispatch(UpdatefinalKriAction({id:pageData[0]?.kriReportId,
  status:selectAprroveType,
  comments:comments,
  approvedByid:userId
}  
  )).then((response:any) =>{
    const r= response?.payload?.requestData?.data;
    if(r.code === "00"){
      setOpenAlertBox(false);
    }
  });

}

const closeAlert = ( result: string) => {
  console.log('Clicked:', result);
  if(result==="ok") {
    SubmitFinalKri();
  setOpenConfBox(true);
  }
};

const closeAndFetch= (result:string) => {
  const url='/kri-department';
  navigate(`/admin${url}`);
}

const GotoGrid=()=>{
  let userRole:string=authState?.userData?.data?.data?.userRole;
  userRole=userRole.toLocaleLowerCase();
  const url='/kri-department';
  return navigate(`/${userRole}${url}`)
 }

  return (
    <>
      <BackButton navigate={navigate}  />
      <PageHeader title="Review KRI Details"></PageHeader>
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
                <div className="viewBoxContent">{authState?.userData?.data?.data?.region}</div>
              </div>
            </div>
            
            <div className="form-group">
                <label htmlFor="">ICO/GIA</label>
                <div className="viewBoxContent">{pageData[0]?.validatorILOUserName}</div>
              </div>
          </div>
        </div>
    {pageData.map((data, index) => (
      <div key={index} className="pageCard mb-4">
        <div className="pageCardHeader">
            <strong>{data?.kriMetricTitle}</strong> <span className="badge"><div className="Submitted">{data?.riskAppetiteThreshold}</div></span>
        </div>
        <div className="">
          <div className="row gx-2">
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Date of Occurrence</label>
                <div className="viewBoxContent">{data?.dateOccurance.toString().substring(0,10)}</div>
              </div>
            </div>
            {/* <div className="col-3">
              <div className="form-group">
                <label htmlFor="">KRI Metrics</label>
                <div className="viewBoxContent">Detail Here</div>
              </div>
            </div> */}
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Number/Percentage</label>
                <div className="viewBoxContent">{data?.kriData}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Amount Involved</label>
                <div className="viewBoxContent">{data?.amountInvolved}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="row gx-2">
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
      <div className="pageCard">
        <div className="row">
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Review Status </label>
              <SelectDropDown
                setOpen={setSelectAprrove}
                open={selectAprrove}
                onChange={(value) => setSelectAprroveType(value)}
                placeholder="Select"
                selectedValue={selectAprroveType}
                options={[
                  { label: "Approve", value: "Approve" },
                  { label: "Reject", value: "Reject" },
                ]}
              />
            </div>
          </div>
          <div className="col-9">
            <div className="form-group">
              <label htmlFor="">Your Comments</label>
              <textarea
                className=""
                id=""
                name="postContent"
                rows={4}
                placeholder="Enter Detail"
                value={comments}
                onChange={(event)=>setComments(event?.target?.value)}
              />
            </div>
          </div>
        </div>
        <div className="btnGroup">
          <div className="row">
            <div className="col-auto">
              <Button variant="contained"onClick={()=> setOpenAlertBox(true)} disabled={ (selectAprroveType === "" || comments === "" || comments === null ) }>Submit</Button>
            {openAlertBox && <AlertBox open={openAlertBox} setopen={setOpenAlertBox} data={"msg"} title={"Alert"} message={"Are you sure you want to update KRI status?"} btn1={"OK"} btn2={"Cancel"} onClose={closeAlert} />}
            {openConfBox && <AlertBox open={openConfBox} setopen={setOpenConfBox} data={"msg"} title={"Alert"} message={"KRI Status Updated Successfully! "} btn1={"OK"} btn2={""} onClose={closeAndFetch} />}

            </div>
            <div className="col-auto">
              <Button onClick={GotoGrid}>Cancel</Button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ApproveKri;
