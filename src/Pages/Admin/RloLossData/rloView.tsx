import { useLocation, useNavigate } from "react-router-dom";
import {
  Divider,
  PageHeader, VerticalSpacer
} from "../../../Components/PageShared";
import AlertBox from "../../../Components/PageShared/Admin/Alert/alert";
import { useEffect, useState } from "react";
import { BackButton, Button } from "../../../Components/Buttons";
import { useAppDispatch, useAppStateSelector } from "../../../Services/Store/hooks";
import { ApproveLossDataAction, getAllLossDetailAction, updateApprovalStatusLossData } from "../../../Services/Actions/lossAction";
import UpdateReport from "./updateReport";
import ApproveRejectModal from "../../../Components/PageShared/Admin/ApproveRejectModal/approveRejectModal";
import { ModalItemCard, ModalItemContent, ModalItemContentsContainer } from "../../../Components/Modal/itemCard";

const RloView = () => {
  const { state } = useLocation();
  const [ data, setData] = useState<any>();
  const dispatch = useAppDispatch();
  const authState:any = useAppStateSelector((state) => state.authState)
  const [ lossId, setLossId] = useState<number>(0);
  const [openAlertBox,setOpenAlertBox]= useState(false);

  useEffect(() =>{
    fetchData(state[1].item.id);
    setLossId(state[1].item.id);
  },[])
  const fetchData = async(id:number) =>{
    await dispatch(getAllLossDetailAction({id})).then((res:any)=>{
      const result= res.payload.requestData.data.data[0];
      console.log(result);
      setData(result);
    })
  }

  const handleDownloadButtonClick = (base64Data: string, fileType: string) => {
    if (base64Data) {
      // Decode base64 data
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
  
      // Create Blob based on the file type
      const blob = new Blob([byteArray], { type: `application/${fileType}` });
  
      // Create a download link
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `LossData_downloaded_file.${fileType}`; // Set the desired file name with the correct extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  

  const navigate = useNavigate();
  const [openUpdateReport, setopenUpdateReport] = useState(false);
  const [openApproveModal, setOpenApproveModal] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);

   const closeApprove = async(cmt:any) => {
    let reportStatus = "Approved";
    if(data?.reportStatus?.includes("UpdatedByBORM")){
      reportStatus = "Approved" +"-UpdatedByBORM";
    }else{
      reportStatus= "Approved"
    }
    if(cmt !== "" && lossId !== 0){
      await dispatch(
        updateApprovalStatusLossData({ id:lossId,action:reportStatus, reviewerComments:cmt, approvedById:authState?.userData?.data?.data?.userId})
      ).then((result:any) =>{
      GotoGrid();
        if(result?.payload?.userData){
          // setOpenSuccess(true);
          // sendData('Success');
        }
        })  
      }
    setOpenApproveModal(false) 
   }
   const closeReject = async(cmt:any) => {
    let reportStatus = "Rejected";

    if(cmt !== "" && lossId !== 0){
    await dispatch(
      updateApprovalStatusLossData({ id:lossId,action: reportStatus, reviewerComments:cmt, approvedById:authState?.userData?.data?.data?.userId})
    ).then((result:any) =>{
      GotoGrid();
      if(result?.payload?.userData){
        // setOpenSuccess(true);
        // sendData('Success');
      }
      })  
    }
    setOpenRejectModal(false) 
   }
   const GotoGrid=()=>{
    let userRole:string=authState?.userData?.data?.data?.userRole;
    userRole=userRole.toLocaleLowerCase();
    const url='/rlo-loss-data';
    return navigate(`/${userRole}${url}`)
   }

 const [SelectStaffJobRoleType, setSelectStaffJobRoleType] = useState("");
 const [InternalBusinessLineType, setInternalBusinessLineType] = useState("");
 const [BaselEventTypeIType, setBaselEventTypeIType] = useState("");
 const [BaselEventTypeIIType, setBaselEventTypeIIType] = useState("");
 const [BaselEventTypeIIIType, setBaselEventTypeIIIType] = useState("");
 const [BaselLevelIBTType, setBaselLevelIBTType] = useState("");
 const [BaselLevelIIBTType, setBaselLevelIIBTType] = useState("");
 const [RootCauseType, setRootCauseType] = useState("");
 const [ProcessInvolvedType, setProcessInvolvedType] = useState("");
 const [riskSourceType, setRiskSourceType] = useState("");
 const [lessonsLearnt, setLessonsLearnt] = useState("");
 const [id, setId] = useState(0);
const [isActive,setIsActive]= useState(false);
   const OpenAlert = (item:any)=>{
      setId(item?.id);
    setLessonsLearnt(item?.lessonsLearnt)
    setRiskSourceType(item?.riskSourceType)
    setProcessInvolvedType(item?.ProcessInvolvedType)
    setRootCauseType(item?.RootCauseType)
    setBaselLevelIIBTType(item?.BaselLevelIIBTType)
    setBaselLevelIBTType(item?.BaselLevelIBTType)
    setBaselEventTypeIIIType(item?.BaselEventTypeIIIType)
    setBaselEventTypeIIType(item?.BaselEventTypeIIType)
    setBaselEventTypeIType(item?.BaselEventTypeIType)
    setInternalBusinessLineType(item?.InternalBusinessLineType)
    setSelectStaffJobRoleType(item?.SelectStaffJobRoleType)

    setOpenAlertBox(true);
   }

   const SubmitLossData = async(item:string) =>{
    let reportStatus = "";
    if(data?.reportStatus?.includes("UpdatedByBORM")){
      reportStatus = data?.reportStatus;
    }else{
      reportStatus= data?.reportStatus +"-UpdatedByBORM"
    }
    await dispatch(ApproveLossDataAction({
      id : id,
      StaffJobRole : SelectStaffJobRoleType,
      InternalBusLine : InternalBusinessLineType,
      BaselEventTypeI : BaselEventTypeIType,
      BaselEventTypeII : BaselEventTypeIIType,
      BaselEventTypeIII : BaselEventTypeIIIType,
      BaselLevel1BusinessLine : BaselLevelIBTType,
      BaselLevel2BusinessLine : BaselLevelIIBTType,
      RootCauseTypeBORM : RootCauseType,
      ProcessInvolved : ProcessInvolvedType,
      RiskSource : riskSourceType,
      LessonLearnt : lessonsLearnt,
      ReportStatus : reportStatus,
      ModifiedById : authState?.userData?.data?.data?.userId
    })).then((res:any) =>{
      var result= res?.payload?.requestData?.data;
      if(result) {
        GotoGrid();
      }
    });
  }

  const CancelUpdate = (res:string) => {
       if(res)
       console.log("update cancelled!");
  }
  return (
    data && <>
    <BackButton navigate={navigate}  />
    <PageHeader title="Loss Data View">
    <div className="row">
      {authState?.userData?.data?.data?.userRole?.toLocaleLowerCase()?.includes("ico")
       &&  
       ((data?.reportStatus?.toString()?.includes("Submitted")) 
      //  || (data?.reportStatus?.toString()?.includes("Approved")) || (data?.reportStatus?.toString()?.includes("Rejected")) 
       )
       &&
       authState?.userData?.data?.data?.userId === data.validatorILOUserId
       &&
      <> 
        <div className="col-auto">
          <Button variant="contained" color="error" onClick={() => setOpenRejectModal(true)}>Reject</Button>
          {openRejectModal && <ApproveRejectModal open={openRejectModal} setopen={setOpenRejectModal} data={""} title="Reject Loss Data" message="Please Confirm If You Would Like To Reject Loss Data " btn1="Yes, Reject" btn2="Cancel" onClose={closeReject}/>}
        </div>
        <div className="col-auto">
          <Button variant="contained" color="primary" onClick={() => setOpenApproveModal(true)}>Approve</Button>
          {openApproveModal && <ApproveRejectModal open={openApproveModal} setopen={setOpenApproveModal} data={""} title="Approve Loss Data" message="Please Confirm If You Would Like To Approve Loss Data " btn1="Yes, Approved" btn2="Cancel" onClose={closeApprove}/>}
        </div>
      </>
      }
        {
        authState?.userData?.data?.data?.userRole?.toLocaleLowerCase()?.includes("admin") 
        &&  
        (data?.reportStatus !== "Draft")
        &&
        <div className="col-auto">
          <Button className="col-auto" variant="contained" onClick={() => { setopenUpdateReport(true);}}
          disabled={!(data?.reportStatus.includes("Approved"))}
          >Update Report</Button>
        </div>
        }
          {openUpdateReport && <UpdateReport open={openUpdateReport} setopen={setopenUpdateReport} id={ lossId } status={data?.reportStatus} onClose={OpenAlert} cancel={CancelUpdate}/>}
          {openAlertBox && <AlertBox open={openAlertBox} setopen={setOpenAlertBox} data={"msg"} title="Confirmation" message={"Are you sure you want to update ?"} btn1="OK" btn2="Cancel" onClose={SubmitLossData}/>}

    </div>
        
      </PageHeader>
      <div className="pageCard">
        <div className="pageCardHeader">
          <strong>Report Detail</strong> <span className="badge"><div className={data?.reportStatus}>{data?.reportStatus}</div></span>
        </div>
          <div className="row gx-2">
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="1">Reference ID</label>
                <div className="viewBoxContent">{data?.refNum}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="1">Validator ILO Name</label>
                <div className="viewBoxContent">{data?.validatorILOUserName}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="2">Date of Occurrence</label>
                <div className="viewBoxContent">{data?.dateOccurance?.toString().substring(0,10)}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="3">Date of Discovery</label>
                <div className="viewBoxContent">{data?.dateDiscovery?.toString().substring(0,10)}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="11">Region</label>
                <div className="viewBoxContent">{data?.region}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="12">Branch/Department</label>
                <div className="viewBoxContent">{data?.branch}{data?.department}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="4">Loss Type</label>
                <div className="viewBoxContent">{data?.lossType?.toString()}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="5">Recovery Channel</label>
                <div className="viewBoxContent">{data?.recoveryChannel?.toString()}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Near Miss</label>
                <div className="viewBoxContent">{data?.nearMissAmount?.toString()} {data?.currency?.toString()}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="6">Potential Loss</label>
                <div className="viewBoxContent">{data?.potentialLossAmount?.toString()} {data?.currency?.toString()}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="7">Gross Actual Loss</label>
                <div className="viewBoxContent">{data?.grossActualAmount?.toString()}  {data?.currency?.toString()}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="8">Amount Recovered</label>
                <div className="viewBoxContent">{data?.recoveredAmount?.toString()}  {data?.currency?.toString()}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="9">Further Recovery</label>
                <div className="viewBoxContent">{data?.furtherRecoveredAmount?.toString()}  {data?.currency?.toString()}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="10">Net Actual Loss</label>
                <div className="viewBoxContent">{data?.netActualLossAmount?.toString()}  {data?.currency?.toString()}</div>
              </div>
            </div>
            
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="13">Staff Involved</label>
                <div className="viewBoxContent">{data?.staffInvolvement?.toString()}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="14">Event Status</label>
                <div className="viewBoxContent">{data?.eventStatus?.toString()}</div>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="15">Detailed Loss Event/ Incident Description</label>
                <div className="viewBoxContent">{data?.description?.toString()}</div>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="16">Root Cause of Event/Incident</label>
                <div className="viewBoxContent">{data?.rootCauseRLO?.toString()}</div>
              </div>
            </div>
          </div>
      </div>
      <VerticalSpacer size={20}></VerticalSpacer>

    { data?.documents != "" &&
      <ModalItemCard>
              <ModalItemContent header={true} title="Uploaded Documents" />
              <VerticalSpacer size={10} />
              <Divider />
              <VerticalSpacer size={20} />
              <ModalItemContentsContainer>
              <div>
                {/* {data?.documents} */}
                <button onClick={()=>handleDownloadButtonClick(data?.documents,data?.fileType)}>{data?.documentName} </button>
                </div>
              </ModalItemContentsContainer>
            </ModalItemCard>
            }




    { authState?.userData?.data?.data?.userRole?.toLocaleLowerCase()?.includes("admin") 
        &&  
        <>
        <div className="pageCard">
      <label htmlFor="00">Update History</label>
                <div className="display-linebreak">
                  <pre>{data?.updateHistory?.replace(/'\\n'/g, '\n')}</pre>
                  </div>
      </div>
      <div className="pageCard">
      <label htmlFor="00">Revier Comments</label>
                <div className="display-linebreak">
                  <pre>{data?.reviewerComments?.replace(/'\\n'/g, '\n')}</pre>
                  </div>
      </div>
      </>}
    
        <VerticalSpacer size={20}></VerticalSpacer>
        { data?.reportStatus === "Approved-UpdatedByBORM"
        &&
        <div className="accordion-item">
        <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
          <div>
            <strong>View BORM Submitted Details</strong>
          </div>
          <div>{isActive ? "-" : "+"}</div>
        </div>
        {isActive && (
          <div className="accordion-content">
    
    <div className="pageCard mt-3">
        <div className="row">
          <div className="col-4"><h6>Business Line</h6></div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="17">Staff Job Role</label>
              <div className="viewBoxContent">{data?.staffJobRole?.toString()}</div>

            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="18">Internal Business Line</label>
              <div className="viewBoxContent">{data?.internalBusLine?.toString()}</div>

            </div>
          </div>
        </div>
        <Divider/>
        <VerticalSpacer size={20}></VerticalSpacer>
        <div className="row">
          <div className="col-4">
            <h6>Basel Events</h6>
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="19">Basel Event Type I</label>
                  <div className="viewBoxContent">{data?.baselEventTypeI?.toString()}</div>

                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="20">Basel Event Type II</label>
                  <div className="viewBoxContent">{data?.baselEventTypeII?.toString()}</div>

                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="21">Basel Event Type III</label>
                  <div className="viewBoxContent">{data?.baselEventTypeIII?.toString()}</div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider/>
        <VerticalSpacer size={20}></VerticalSpacer>
        <div className="row">
          <div className="col-4">
            <h6>Basel Level</h6>
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="22">Basel Level I Business Line</label>
                  <div className="viewBoxContent">{data?.baselLevel1BusinessLine?.toString()}</div>

                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="23">Basel Level II Business Line</label>
                  <div className="viewBoxContent">{data?.baselLevel2BusinessLine?.toString()}</div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider/>
        <VerticalSpacer size={20}></VerticalSpacer>
        <div className="row">
          <div className="col-4">
            <h6>Involvement</h6>
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="24">Root Cause</label>
                  <div className="viewBoxContent">{data?.rootCauseTypeBORM?.toString()}</div>

                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="25">Process Involved</label>
                  <div className="viewBoxContent">{data?.processInvolved?.toString()}</div>

                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="26">Risk Source</label>
                  <div className="viewBoxContent">{data?.riskSource?.toString()}</div>

                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="27">Lessons Learnt</label>
                  <div className="viewBoxContent">{data?.lessonLearnt?.toString()}</div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
      </div>
        )}
        </div>
        }
    </>
  );
};
export default RloView;
