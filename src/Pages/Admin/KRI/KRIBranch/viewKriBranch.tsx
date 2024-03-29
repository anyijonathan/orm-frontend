import { useLocation, useNavigate } from "react-router-dom";
import { BackButton, Button } from "../../../../Components/Buttons";
import { PageHeader } from "../../../../Components/PageShared";
import { useEffect, useState } from "react";
import { UpdatefinalKriAction, getDetailviewKriAction, getPreviewKriAction } from "../../../../Services/Actions/kriAction";
import { useAppDispatch, useAppStateSelector } from "../../../../Services/Store/hooks";
import ApproveRejectModal from "../../../../Components/PageShared/Admin/ApproveRejectModal/approveRejectModal";
import { getCurrentRole } from "../../../../Services/Utils/route";


const ViewKriBranch = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [ pageData, setPageData] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const authState:any = useAppStateSelector((state) => state.authState)
  const [openApproveModal, setOpenApproveModal] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  useEffect(()=>{
    
    fetchData(state)
  },[])

  const fetchData= async(id:number) => {
    await dispatch(getDetailviewKriAction({ids:id})).then((response:any) =>{
      const result= response?.payload?.requestData?.data.data;
      setPageData(result);
  });
}
const GotoGrid=()=>{
  let userRole:string=authState?.userData?.data?.data?.userRole;
  userRole=userRole.toLocaleLowerCase();
  const url='/kri-department';
  return navigate(`/${userRole}${url}`)
 }

const closeApprove = async(cmt:any) => {
  let reportStatus = "Approved";
  if(cmt !== ""){
    const userId=authState?.userData?.data?.data?.userId
await dispatch(UpdatefinalKriAction(
  {
  id:pageData[0]?.kriReportId,
  status:reportStatus,
  comments:cmt,
  approvedByid:userId
  }  
  )).then((response:any) =>{
    const r= response?.payload?.requestData?.data;
    if(r.code === "00"){
      setOpenApproveModal(false); 
      GotoGrid();
    }
  });
  }
 }
 const closeReject = async(cmt:any) => {
  let reportStatus = "Rejected";
  if(cmt !== ""){
    const userId=authState?.userData?.data?.data?.userId
await dispatch(UpdatefinalKriAction(
  {
  id:pageData[0]?.kriReportId,
  status:reportStatus,
  comments:cmt,
  approvedByid:userId
  }  
  )).then((response:any) =>{
    const r= response?.payload?.requestData?.data;
    if(r.code === "00"){
      setOpenApproveModal(false); 
      GotoGrid();
    }
  });
  }
 }

  return (
    <>
      <BackButton navigate={navigate}  />
      <PageHeader title="KRI Details">
      { getCurrentRole()==="ico"
      &&
      authState?.userData?.data?.data?.userId === pageData[0]?.validatorILOUserId
      &&
        <div className="col-auto">
        {(pageData[0]?.reportStatus?.toString()!=="Approved" && 
        pageData[0]?.reportStatus?.toString()!=="Rejected")
        && <div className="row">
          <div className="col-auto">
          <Button variant="contained" color="error" onClick={() => setOpenRejectModal(true)}>Reject</Button>
          {openRejectModal && <ApproveRejectModal open={openRejectModal} setopen={setOpenRejectModal} data={""} title="Reject KRI Report" message="Please Confirm If You Would Like To Reject KRI Report " btn1="Yes, Reject" btn2="Cancel" onClose={closeReject}/>}
          </div>
          <div className="col-auto">
          <Button variant="contained" color="primary" onClick={() => setOpenApproveModal(true)}>Approve</Button>
          {openApproveModal && <ApproveRejectModal open={openApproveModal} setopen={setOpenApproveModal} data={""} title="Approve KRI Report" message="Please Confirm If You Would Like To Approve KRI Report " btn1="Yes, Approved" btn2="Cancel" onClose={closeApprove}/>}
          </div>
        </div>}
      </div>}
      </PageHeader>
      {/* <p>Reported on october 25, 2023</p> */}
      <div className="pageCard mb-4">
        <div className="pageCardHeader">
          <strong>Report Detail</strong> <span className="badge"><div className={pageData[0]?.reportStatus?.toString()}>{pageData[0]?.reportStatus}</div></span>
        </div>
        <div className="">
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
                <div className="viewBoxContent">{pageData[0]?.locationName}</div>
              </div>
            </div>
            <div className="col-2">
              <div className="form-group">
                <label htmlFor="">Region</label>
                <div className="viewBoxContent">{pageData[0]?.region}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Reporting Period</label>
                <div className="viewBoxContent">{pageData[0]?.reportingPeriod}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pageCard mb-4">
      <div className="row gx-2">
      <div className="col-4">
              <div className="form-group">
                <strong>ICO/GIA</strong>
                <div className="viewBoxContent">{pageData[0]?.validatorILOUserName}</div>
              </div>
            </div>
            {pageData[0]?.comments !== null && <div className="col-12">
              <div className="form-group">
              <strong>Reviewer's Comments</strong>
                <div className="viewBoxContent">{pageData[0]?.comments?.toString()}</div>
              </div>
            </div>}
            </div>
      </div>
      {pageData.map((data, index) => (
        <div className="pageCard mb-4">
          <div className="pageCardHeader">
            <strong>{data?.kriMetricTitle}</strong> <span className="badge text-bg"><div className="Submitted"> {pageData[0]?.riskAppetiteThreshold}</div></span>
          </div>
          <div className="row gx-2">
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="">Date of Occurrence</label>
                <div className="viewBoxContent">{data?.dateOccurance.toString().substring(0,10)}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="">Number/Percentage</label>
                <div className="viewBoxContent">{data?.kriData}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="">Amount Involved</label>
                <div className="viewBoxContent">{data?.amountInvolved}</div>
              </div>
            </div>
          </div>
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
      ))}
          {}
{/*       
      
        {pageData.map((data, index) => (
        <div key={index} className="pageCard mb-4">
        <div className="row align-items-center mb-2">
            <div className="col-auto">
                <h5>{data?.kriMetricTitle}</h5>
            </div>
        </div>
        <div className="">
          
        </div>
        <div className="">
          
        </div>
      </div>
        ))}
              {} */}
    </>
  );
};
export default ViewKriBranch;
