import { useLocation, useNavigate } from "react-router-dom";
import { BackButton, Button } from "../../../Components/Buttons";
import { PageHeader } from "../../../Components/PageShared";
import { useEffect, useState } from "react";
import UpdateRcsa from "./updateRcsa";
import { useAppDispatch, useAppStateSelector } from "../../../Services/Store/hooks";
import { ApproveRiskReportAction, GetDocumentAction, ReqRejRiskReportAction } from "../../../Services/Actions/rcsaAction";
import AlertBox from "../../../Components/PageShared/Admin/Alert/alert";
import ApproveRejectModal from "../../../Components/PageShared/Admin/ApproveRejectModal/approveRejectModal";
import { getCurrentRole } from "../../../Services/Utils/route";

const ViewRcsa = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [openUpdateRcsa, setopenUpdateRcsa] = useState(false);


  const [OpenImpactSeverity, setOpenImpactSeverity] = useState(false);
  const [ImpactSeverity, setImpactSeverity] = useState("");
  const [OpenDirectionRisk, setOpenDirectionRisk] = useState(false);
  const [DirectionRisk, setDirectionRisk] = useState("");
  const [OpenLikelihoodFrequency, setOpenLikelihoodFrequency] = useState(false);
  const [LikelihoodFrequency, setLikelihoodFrequency] = useState("");
  const [OpenControlsDesign, setOpenControlsDesign] = useState(false);
  const [ControlsDesign, setControlsDesign] = useState("");
  const [OpenControlsType, setOpenControlsType] = useState(false);
  const [ControlsType, setControlsType] = useState("");
  const [OpenControlEffectiveness, setOpenControlEffectiveness] = useState(false);
  const [openRiskClassification, setOpenRiskClassification] = useState(false);
  const [ControlEffectiveness, setControlEffectiveness] = useState("");
  const [OpenResponsibility, setOpenResponsibility] = useState(false);
  const [alertCon, setAlertCon] = useState(false);
  const [Responsibility, setResponsibility] = useState("");
  const [processes, setProcesses] = useState("");
  const [subProcesses, setSubProcesses] = useState("");
  const [inherentRisk, setInherentRisk] = useState("");
  const [controls, setControls] = useState("");
  const [riskClassification, setRiskClassification] = useState("");
  const [residualRiskAssessment, setResidualRiskAssessment] = useState("");
  const [openAlertBoxSave, setOpenAlertBoxSave] = useState(false);
  const [openAlertBoxSubmit, setOpenAlertBoxSubmit] = useState(false);
  const [recordId, setRecordId] = useState(0);
  const [status, setStatus] = useState(0);
  const [uploadedDocument, setUploadedDocument] = useState<any[]>([]);
  const [documents, setDocuments] = useState("");
  const [downloadDocuments, setDownloadDocuments] = useState("");
  const [documentsExt, setDocumentsExt] = useState("");
  const [documentsName, setDocumentsName] = useState("");

  const [region,setRegion] =useState("");
  const [refno,setRefno] =useState("");
  const [locationType,setLocationType] =useState("");
  const [locationId,setLocationId] =useState(0);
  const [locationName,setLocationName] =useState("");
  const dispatch = useAppDispatch();  
  const authState:any = useAppStateSelector((state) => state.authState);

  const [openApproveModal, setOpenApproveModal] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [riskResidualRating,setRiskResidualRating] =useState("");
  const [riskRating,setRiskRating] =useState("");
  const [riskControlEffectiveness,setRiskControlEffectiveness] =useState("");
  const [riskControlQuality,setRiskControlQuality] =useState("");
  const [riskControlAssessment,setRiskControlAssessment] =useState("");
  const [riskActionPlan,setRiskActionPlan] =useState("");
  const [comments,setComments] =useState("");
  const [alertConRequest, setAlertConRequest] = useState(false);
  const [alertConReject, setAlertConReject] = useState(false);
  
  let action :any;

  useEffect( ()=>{

    if(state && state.length > 0){
      action = state[0]?.action;
      if(action=="view"){
        SetupEdit(state[1]?.item);
      }
    }
    // SetupEdit(state[1]?.item);
    if(state[1]?.item?.reportStatus == "Submitted"){
      setUpdateApproveBtn("Approve");
      setConformationMsg("Risk Report Approved !");
    }else{
      setUpdateApproveBtn("Update");
      setConformationMsg("Risk Report Updated !")
    }

    },[]);
    
  const SetupEdit = async (item:any) => {
    setRegion(item?.region);
    setRefno(item?.refNum);
    setLocationType(item?.locationType)
    setLocationId(item?.locationId)
    setLocationName(item?.locationName)
    setRecordId(item?.id);
    setProcesses(item?.processName);
      setSubProcesses(item?.subProcessName);
      setInherentRisk(item?.inherentThreatRisk);
      setLikelihoodFrequency(item?.frequencyOfOccurance);
      setRiskClassification(item?.riskClassification);
      setImpactSeverity(item?.riskSeverity);
      setDirectionRisk(item?.riskDirection);
      setControls(item?.implementedControls);
      setControlsDesign(item?.riskControlDesign);
      setControlsType(item?.riskControlType);
      setControlEffectiveness(item?.riskControlEffectiveness);
      setResidualRiskAssessment(item?.riskResidual);
      setResponsibility(item?.riskResponsibility);
      setStatus(item?.reportStatus);
      setDocuments(item?.documents)
      setDocumentsExt(item?.documentExtension)
      setDocumentsName(item?.documentName)
      setComments(item?.reviewerComments)
      setRiskControlAssessment(item?.riskControlAssessment)
      setRiskControlQuality(item?.riskControlQuality)
      setRiskControlEffectiveness(item?.riskControlEffectiveness)
      setRiskResidualRating(item?.riskResidualRating)
      setRiskRating(item?.riskRating)
      setRiskActionPlan(item?.riskActionPlan)

      if(item.documents != ""){
        let id= item.id;
        await dispatch(
          GetDocumentAction(
            {
              id 
            }
          )
        ).then((response:any) => {
        const res=response?.payload?.requestData?.data?.data;
        if(res){
          setDownloadDocuments(res[0].documents);
        }
      });
      }
// alert(id)
  }

  const handleDownloadButtonClick = (base64Data: string, fileType: string, fileName:string) => {
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
      link.download = `${fileName}`; // Set the desired file name with the correct extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const UpdateRiskReport=async (item:any)=>{
    await dispatch(
      ApproveRiskReportAction(
        {
          id: item?.id,
          riskClassification: item?.riskClassification,    
          riskCategory: item?.IdentifiedRisksType,    
          riskRootCause: item?.rootCause,
          riskActionPlanStatus: item?.ActionPlanType,
          riskExpectedResolutionTime: item?.riskExpectedResolutionTime,
          riskStrategy: item?.ResponseStrategyType,
          reportStatus: "Approved",
          modifiedById: authState?.userData?.data?.data?.userId
        }        
      )
    ).then((response:any) => {
    const res=response?.payload?.requestData?.data?.data;
    if(res){
      setAlertCon(true);
    }
  });
  
  }
   const Cancel =(item:any)=>{
    console.log(item);
   }

   const closeRequestUpdate = async (comment:any) => {
    if(comment!==""){
        await dispatch(
          ReqRejRiskReportAction(
            {
              id: state[1]?.item?.id,
              updateRequestStatus: "Requested",
              reviewerComments:comment,
              reportStatus: state[1]?.item?.reportStatus,
              modifiedById: authState?.userData?.data?.data?.userId
            }
          )
        ).then((response:any) => {
        const res=response?.payload?.requestData?.data?.data;
        if(res){
          setAlertConRequest(true);
        }
      });
    }
   }
   
   const closeReject = async (comment:any) => {
    if(comment!==""){
    await dispatch(
      ReqRejRiskReportAction(
        {
          id: state[1]?.item?.id,
          updateRequestStatus: "",
          reviewerComments:comment,
          reportStatus: "Rejected",
          modifiedById: authState?.userData?.data?.data?.userId
        }
      )
    ).then((response:any) => {
    const res=response?.payload?.requestData?.data?.data;
    if(res){
      setAlertConReject(true);
    }
  });
  }
   }
const [updateApproveBtn,setUpdateApproveBtn]= useState("");
const [conformationMsg,setConformationMsg]= useState("");
   const GotoGrid=()=>{
    let userRole:string=authState?.userData?.data?.data?.userRole;
    userRole=userRole.toLocaleLowerCase();
    const url='/rcsa';
    return navigate(`/${userRole}${url}`)
   }

  return (
    <>
      <BackButton navigate={navigate}  />
      <PageHeader title="RCSA Details">

      {state[1]?.item?.reportStatus !== "Draft" && getCurrentRole()== "admin" &&
      <div className="row">
      {state[1]?.item?.reportStatus !== "Approved" && state[1]?.item?.reportStatus !== "Rejected"  &&
      <div className="col-auto">
          <Button variant="contained" color="error" onClick={() => setOpenRejectModal(true)}>Reject</Button>
          {openRejectModal && <ApproveRejectModal open={openRejectModal} setopen={setOpenRejectModal} data={""} title="Reject Risk Report" message="Please confirm if you would like to Reject Risk Report " btn1="Yes, Reject" btn2="Cancel" onClose={closeReject}/>}
        </div>}
        {state[1]?.item?.reportStatus == "Approved"  &&
        state[1]?.item?.updateRequestStatus != "Requested"  &&
        <div className="col-auto">
          <Button variant="contained" color="primary" onClick={() => setOpenApproveModal(true)}>Request for Update</Button>
          {openApproveModal && <ApproveRejectModal open={openApproveModal} setopen={setOpenApproveModal} data={""} title="Request for Update" message="Please confirm if you would like to Request for Update " btn1="Yes" btn2="Cancel" onClose={closeRequestUpdate}/>}
        </div>}

        {state[1]?.item?.reportStatus !== "Rejected"  &&
        <div className="col-auto">
          <Button variant="contained" onClick={() => { setopenUpdateRcsa(true);}}>{updateApproveBtn }</Button>
          </div>}
        {openUpdateRcsa && <UpdateRcsa open={openUpdateRcsa} setopen={setopenUpdateRcsa} data={ state[1]?.item } onClose={UpdateRiskReport} cancel={()=>{Cancel}} />}
        {alertCon && <AlertBox open={alertCon} setopen={setAlertCon} data={"msg"} title="Confirmation" message={conformationMsg} btn1="OK" btn2="" onClose={()=>{GotoGrid()}}/>}
        {alertConRequest && <AlertBox open={alertConRequest} setopen={setAlertConRequest} data={"msg"} title="Confirmation" message={"Update Request Created !"} btn1="OK" btn2="" onClose={()=>{GotoGrid()}}/>}
        {alertConReject && <AlertBox open={alertConReject} setopen={setAlertConReject} data={"msg"} title="Confirmation" message={"Report Rejected !"} btn1="OK" btn2="" onClose={()=>{GotoGrid()}}/>}
      </div>}
      </PageHeader>
      <div className="pageCard mb-4">
        <div className="pageCardHeader">
          <strong>Business Line</strong> <span className="badge"><div className={state[1]?.item?.reportStatus}>{state[1]?.item?.reportStatus}</div></span>
        </div>
        <div className="row gx-2">
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">RefNo</label>
                <div className="viewBoxContent">{refno}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Branch/Department</label>
                <div className="viewBoxContent">{locationName}</div>
              </div>
            </div>

            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Region</label>
                <div className="viewBoxContent">{region}</div>
              </div>
            </div>

          </div>
      </div>
      <div className="pageCard mb-4">
        <div className="pageCardHeader">
          <strong>Business Process</strong>
        </div>
        <div className="row gx-2">
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Processes</label>
                <div className="viewBoxContent">{processes}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Sub Processes</label>
                <div className="viewBoxContent">{subProcesses}</div>
              </div>
            </div>
          </div>
      </div>
      <div className="pageCard mb-4">
        <div className="pageCardHeader">
          <strong>Inherent Risk Identification</strong> 
        </div>
        <div className="row gx-2">
            <div className="col-12">
              <div className="form-group">
                <label htmlFor="">What are the inherent threats/risks that could affect the achievement of the business/process  goals and objectives?</label>
                <div className="viewBoxContent">{inherentRisk}</div>
              </div>
            </div>
          </div>
      </div>
      <div className="pageCard mb-4">
        <div className="pageCardHeader">
          <strong>Inherent Risk Assessment </strong> 
        </div>
        <div className="row gx-2">
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="">Impact/Severity  of the identified risks</label>
                <div className="viewBoxContent">{ImpactSeverity}</div>
              </div>
            </div>
            {/* <div className="col-4">
              <div className="form-group">
                <label htmlFor="">Risk Classification</label>
                <div className="viewBoxContent">{riskClassification}</div>
              </div>
            </div> */}
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="">Direction of Risk</label>
                <div className="viewBoxContent">{DirectionRisk}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="">Likelihood/ Frequency of Occurrence of the identified risks</label>
                <div className="viewBoxContent">{LikelihoodFrequency}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="">Inherent Risk Rating </label>
                <div className="viewBoxContent">{riskRating}</div>
              </div>
            </div>
          </div>       
      
      </div>

      <div className="pageCard mb-4">
        <div className="pageCardHeader">
          <strong>Control Assessment </strong> 
        </div>
        <div className="row gx-2">
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="">Implemented Controls</label>
                <div className="viewBoxContent">{controls}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="">Control Design</label>
                <div className="viewBoxContent">{ControlsDesign}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="">Control Type</label>
                <div className="viewBoxContent">{ControlsType}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="">Control Effectiveness</label>
                <div className="viewBoxContent">{riskControlEffectiveness}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="">Control Assessment</label>
                <div className="viewBoxContent">{riskControlAssessment}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="">Control Quality</label>
                <div className="viewBoxContent">{riskControlQuality}</div>
              </div>
            </div>
          </div>       
      
      </div>

      <div className="pageCard mb-4">
        <div className="pageCardHeader">
          <strong>Residual Risk Assessment </strong> 
        </div>
        <div className="row gx-2">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Residual Risk. Remaining risks after applying the controls</label>
                <div className="viewBoxContent">{residualRiskAssessment}</div>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Residual Risk Rating</label>
                <div className="viewBoxContent">{riskResidualRating}</div>
              </div>
            </div>
          </div>       
      
      </div>

      <div className="pageCard mb-4">
        <div className="pageCardHeader">
          <strong>Risk Response</strong> 
        </div>
        <div className="row gx-2">
        <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Action Plan to Mitigate Residual Risk</label>
                <div className="viewBoxContent">{riskActionPlan}</div>
              </div>
            </div>

            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Responsibility</label>
                <div className="viewBoxContent">{Responsibility}</div>
              </div>
            </div>
          
          </div>       
      
      </div>

      <div className="pageCard mb-4">
        <div className="pageCardHeader">
          <strong>Comments</strong> 
        </div>
        <div className="row gx-2">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Comments</label>
                <div className="viewBoxContent">{comments}</div>
              </div>
            </div>
          </div>       
      
      </div>

      { downloadDocuments != ""
            &&
            <div className="pageCard mb-4">
        <div className="pageCardHeader">
          <strong>Document : </strong> 
        </div>
          <div className="row">
            <div className="col-auto">

            <button onClick={()=>handleDownloadButtonClick(downloadDocuments,documentsExt, documentsName)}>{ documentsName} </button>

            </div>
          </div>
          </div>}
      
              {}
    </>
  );
};
export default ViewRcsa;
