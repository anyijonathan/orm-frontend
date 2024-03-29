import { useLocation, useNavigate } from "react-router-dom";
import { BackButton, Button } from "../../../Components/Buttons";
import { Divider, PageHeader, VerticalSpacer } from "../../../Components/PageShared";
import { SelectDropDown } from "../../../Components/DropDown";
import { useEffect, useState } from "react";
import SubmitConfirmation from "../../../Components/PageShared/Admin/SubmitConfirmation";
import { useAppDispatch, useAppStateSelector } from "../../../Services/Store/hooks";
import { CreateRiskReportAction, GetDocumentAction, SubmitRiskReportAction } from "../../../Services/Actions/rcsaAction";
import DropFileInput from "../../../Components/DropFileInput/dropFileInput";
import AlertBox from "../../../Components/PageShared/Admin/Alert/alert";
import StateManagedSelect from "react-select/dist/declarations/src/stateManager";
import { setuid } from "process";


const CreateRcsa = () => {
  const navigate = useNavigate();
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
  const [riskActionPlan, setRiskActionPlan] = useState("");
  const [processes, setProcesses] = useState("");
  const [subProcesses, setSubProcesses] = useState("");
  const [inherentRisk, setInherentRisk] = useState("");
  const [controls, setControls] = useState("");
  const [riskClassification, setRiskClassification] = useState("");
  const [residualRiskAssessment, setResidualRiskAssessment] = useState("");
  const [openAlertBoxSave, setOpenAlertBoxSave] = useState(false);
  const [openAlertBoxSubmit, setOpenAlertBoxSubmit] = useState(false);
  const [recordId, setRecordId] = useState(0);
  const [status, setStatus] = useState("");
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
  const [loading, setLoading] = useState(false);
  const goBack = () => {
    navigate(-1);
  };
  const dispatch = useAppDispatch();  

  const authState:any = useAppStateSelector((state) => state.authState)
  let locationState:any = useAppStateSelector((state) => state.locationDataState)

  let action :any;
  const { state } = useLocation();

  useEffect( ()=>{
  if(state && state.length > 0){
    action = state[0]?.action;
    if(action=="edit"){
      SetupEdit(state[1]?.item);
    }
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
      // setRiskClassification(item?.riskClassification);
      setImpactSeverity(item?.riskSeverity);
      setDirectionRisk(item?.riskDirection);
      setControls(item?.implementedControls);
      setControlsDesign(item?.riskControlDesign);
      setControlsType(item?.riskControlType);
      // setControlEffectiveness(item?.riskControlEffectiveness);
      setResidualRiskAssessment(item?.riskResidual);
      setResponsibility(item?.riskResponsibility);
      setStatus(item?.reportStatus);
      setDocuments(item?.documents)
      setDocumentsExt(item?.documentExtension)
      setDocumentsName(item?.documentName)
      setRiskActionPlan(item?.riskActionPlan)
      if(item?.documents != ""){
        let id= item?.id;
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

  const closeAlertSubmit = ( result: string) => {
    if(result=="ok") {
      SubmitRCSA("Submitted");
    }
  }

  const closeAlertSave = ( result: string) => {
    if(result=="ok") {
      if(recordId == 0){
        SaveRCSA("Draft");
      }else{
        SubmitRCSA("Draft");
      }
    }
  }
  const SaveRCSA=async(status:string)=>{
    let res:any[]=[];
    setLoading(true);
    const formData = new FormData();
      // formData.append('id',formValues?.id?.toString());
      formData.append('LocationType',locationState?.currentLocation?.locationType);
      formData.append('LocationId',locationState?.currentLocation?.locationId);
      formData.append('ValidatorUserId',authState?.userData?.data?.data?.userId);
      formData.append('ProcessName',processes);
      formData.append('SubProcessName',subProcesses);
      formData.append('InherentThreatRisk',inherentRisk);
      formData.append('FrequencyOfOccurance',LikelihoodFrequency);
      // formData.append('RiskClassification',riskClassification);
      // formData.append('riskRootCause',"");
      formData.append('RiskSeverity',ImpactSeverity);
      formData.append('RiskDirection',DirectionRisk);
      formData.append('ImplementedControls',controls);
      formData.append('RiskControlDesign',ControlsDesign);
      formData.append('RiskControlType',ControlsType);
      // formData.append('RiskControlEffectiveness',ControlEffectiveness);
      formData.append('RiskResidual',residualRiskAssessment);
      formData.append('RiskResponsibility',Responsibility);
      formData.append('RiskActionPlan',riskActionPlan);
      formData.append('ReportStatus',status);
      formData.append('CreatedById',authState?.userData?.data?.data?.userId);
      for (const document of uploadedDocument) {
        formData.append('RiskDocuments', document, document.name);
        formData.append('DocumentName', document.name);
      }
    await dispatch(
      CreateRiskReportAction(
        {
         formData 
        }
      )
    ).then((response:any) => {
    res=response?.payload?.requestData?.data?.data;
    if(res){
      setRecordId(res[0].id);
      setAlertCon(true);
      setLoading(false);
    }
  });
  }

  const SubmitRCSA=async(status:string)=>{
    setLoading(true);
    let res:any[]=[];
    const formData = new FormData();
      formData.append('id',recordId?.toString());
      // formData.append('LocationType',locationState?.currentLocation?.locationType);
      // formData.append('LocationId',locationState?.currentLocation?.locationId);
      formData.append('ValidatorUserId',authState?.userData?.data?.data?.userId);
      formData.append('ProcessName',processes);
      formData.append('SubProcessName',subProcesses);
      formData.append('InherentThreatRisk',inherentRisk);
      formData.append('FrequencyOfOccurance',LikelihoodFrequency);
      // formData.append('RiskClassification',riskClassification);
      // formData.append('riskRootCause',"");
      formData.append('RiskSeverity',ImpactSeverity);
      formData.append('RiskDirection',DirectionRisk);
      formData.append('ImplementedControls',controls);
      formData.append('RiskControlDesign',ControlsDesign);
      formData.append('RiskControlType',ControlsType);
      // formData.append('RiskControlEffectiveness',ControlEffectiveness);
      formData.append('RiskResidual',residualRiskAssessment);
      formData.append('RiskResponsibility',Responsibility);
      formData.append('RiskActionPlan',riskActionPlan);
      formData.append('ReportStatus',status);
      formData.append('ModifiedById',authState?.userData?.data?.data?.userId);
      for (const document of uploadedDocument) {
        formData.append('RiskDocuments', document, document.name);
        formData.append('DocumentName', document.name);
      }
    await dispatch(
      SubmitRiskReportAction(
        {
         formData 
        }
      )
    ).then((response:any) => {
    res=response?.payload?.requestData?.data?.data;
    if(status==="Draft"){
      setRecordId(res[0].id);
      setAlertCon(true);
      setLoading(false);
    }else{
      setLoading(false);
      GotoGrid();
    }
  });
  }

  const GotoGrid=()=>{
    let userRole:string=authState?.userData?.data?.data?.userRole;
    userRole=userRole.toLocaleLowerCase();
    const url='/rcsa';
    return navigate(`/${userRole}${url}`)
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

  const handleFileChange = (fileList: any) => {
    // Handle the file list, for example, log it to the console
    console.log('File List:', fileList);
    setUploadedDocument(fileList);

  };

  return (
    <>
      <BackButton navigate={navigate} />
      { state[0]?.action === "edit"
      &&
      <>
      <PageHeader title="Edit RCSA"></PageHeader>      
      <strong>Edit RCSA data detail    </strong>
        <span className="badge"><div className="Approved">{status}</div></span>

        </>
        }
      { state[0]?.action === "create"
      &&
      <>
      <PageHeader title="Create RCSA"></PageHeader>      
      <strong>Enter RCSA data detail</strong>
      </>
      }
      <p>
        Please fill the data input and ensure the information is correct before
        submitting.{" "}
      </p>
      <div className="pageCard mt-3 mb-5">
        <div className="row">
          <div className="col-4">
            <h6>Business Line</h6>
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="">Branch/Department</label>
                  <input
                    type="text"
                    disabled
                    className="form-control"
                    placeholder={locationState?.currentLocation?.locationName}
                    
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider/>
        <VerticalSpacer size={20}></VerticalSpacer>
        <div className="row">
          <div className="col-4">
            <h6>Business Process</h6>
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="">Processes</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter"
                    onChange={(e:any)=>setProcesses(e.target.value)}
                    value={processes}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="">Sub Processes</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter"
                    onChange={(e:any)=>setSubProcesses(e.target.value)}
                    value={subProcesses}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider/>
        <VerticalSpacer size={20}></VerticalSpacer>
        <div className="row">
          <div className="col-4">
            <h6>Inherent Risk Identification</h6>
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="">What are the inherent threads/risks that could affect the achievement of the business/process goals and objectives?</label>
                  <textarea
                    className=""
                    name="postContent"
                    rows={4}
                    placeholder="Enter Detail"
                    onChange={(e:any)=>setInherentRisk(e.target.value)}
                    value={inherentRisk}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider/>
        <VerticalSpacer size={20}></VerticalSpacer>
        <div className="row">
          <div className="col-4">
            <h6>Inherent Risk Assessment</h6>
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="">Impact/Severity of the identified risks</label>
                  <SelectDropDown
                        setOpen={setOpenImpactSeverity}
                        open={OpenImpactSeverity}
                        onChange={(value) => setImpactSeverity(value)}
                        placeholder="Select"
                        selectedValue={ImpactSeverity}
                        options={[
                        { label: "Significant", value: "Significant" },
                        { label: "Major", value: "Major" },
                        { label: "Moderate", value: "Moderate" },
                        { label: "Minor", value: "Minor" },
                        { label: "Insignificant", value: "Insignificant" },
                        ]}
                    />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="">Direction of Risk</label>
                  <SelectDropDown
                        setOpen={setOpenDirectionRisk}
                        open={OpenDirectionRisk}
                        onChange={(value) => setDirectionRisk(value)}
                        placeholder="Select"
                        selectedValue={DirectionRisk}
                        options={[
                        { label: "Increasing", value: "Increasing" },
                        { label: "Static", value: "Static" },
                        { label: "Decreasing", value: "Decreasing" },
                        ]}
                    />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="">Likelihood/Frequency of Occurrence of the identified risks</label>
                  <SelectDropDown
                        setOpen={setOpenLikelihoodFrequency}
                        open={OpenLikelihoodFrequency}
                        onChange={(value) => setLikelihoodFrequency(value)}
                        placeholder="Select"
                        selectedValue={LikelihoodFrequency}
                        options={[
                        { label: "Certainly/Daily", value: "Certainly/Daily" },
                        { label: "Likely/Weekly", value: "Likely/Weekly" },
                        { label: "Possible/Monthly", value: "Possible/Monthly" },
                        { label: "Unlikely/Quarterly", value: "Unlikely/Quarterly" },
                        { label: "Very Rare/Annually", value: "Very Rare/Annually" },
                        ]}
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider/>
        <VerticalSpacer size={20}></VerticalSpacer>
        <div className="row">
          <div className="col-4">
            <h6>Control Assessment</h6>
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="">Implemented Controls</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter"
                    onChange={(e:any)=>setControls(e.target.value)}
                    value={controls}

                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="">Controls Design</label>
                  <SelectDropDown
                        setOpen={setOpenControlsDesign}
                        open={OpenControlsDesign}
                        onChange={(value) => setControlsDesign(value)}
                        placeholder="Select"
                        selectedValue={ControlsDesign}
                        options={[
                        { label: "Automated", value: "Automated" },
                        { label: "Semi-Automated", value: "Semi-Automated" },
                        { label: "Manual", value: "Manual" },
                        ]}
                    />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="">Controls Type</label>
                  <SelectDropDown
                        setOpen={setOpenControlsType}
                        open={OpenControlsType}
                        onChange={(value) => setControlsType(value)}
                        placeholder="Select"
                        selectedValue={ControlsType}
                        options={[
                        { label: "Preventive", value: "Preventive" },
                        { label: "Detective", value: "Detective" },
                        { label: "Corrective", value: "Corrective" }, 
                        ]}
                    />
                </div>
              </div>
              {/* <div className="col-6">
                <div className="form-group">
                  <label htmlFor="">Control Effectiveness</label>
                  <SelectDropDown
                        setOpen={setOpenControlEffectiveness}
                        open={OpenControlEffectiveness}
                        onChange={(value) => setControlEffectiveness(value)}
                        placeholder="Select"
                        selectedValue={ControlEffectiveness}
                        options={[
                        { label: "Almost Certain", value: "Almost Certain" },
                        { label: "Probable", value: "Probable" },
                        { label: "Rare", value: "Rare" },
                        ]}
                    />
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <Divider/>
        <VerticalSpacer size={20}></VerticalSpacer>
        <div className="row">
          <div className="col-4">
            <h6>Residual Risk Assessment</h6>
          </div>
          <div className="col-8">
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                    <label htmlFor="">Residual Risk. Remaining risks after applying the controls</label>
                    <textarea
                        className=""
                        name="postContent"
                        rows={4}
                        placeholder="Enter Detail"
                    onChange={(e:any)=>setResidualRiskAssessment(e.target.value)}
                    value={residualRiskAssessment}

                    />
                    </div>
                </div>
            </div>
          </div>
        </div>
        <Divider/>
        <VerticalSpacer size={20}></VerticalSpacer>
        <div className="row">
          <div className="col-4">
            <h6>Risk Response</h6>
          </div>
          <div className="col-8">
            <div className="row">
            <div className="col-6">
                <div className="form-group">
                <label htmlFor="">Action Plans To Mitigate The Residual Risks</label>
                    <textarea
                    name=""
                    rows={4}
                    className="form-control"
                    placeholder="Enter"
                    onChange={(e:any)=>setRiskActionPlan(e.target.value)}
                    value={riskActionPlan}
                  />
                </div>
                </div>
                <div className="col-6">
                <div className="form-group">
                <label htmlFor="">Responsibility</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Enter"
                    onChange={(e:any)=>setResponsibility(e.target.value)}
                    value={Responsibility}

                  />
                </div>
                </div>

                
                
            </div>
          </div>
        </div>
        <Divider/>
        <VerticalSpacer size={20}></VerticalSpacer>
        <div className="col-12">
            <div className="form-group">
              <label htmlFor="">Supporting Documents (Optional)</label>
              <div>
                {downloadDocuments!=="" &&
                <button onClick={()=>handleDownloadButtonClick(downloadDocuments,documentsExt, documentsName)}>{ documentsName} </button>
              }
                </div>
              <DropFileInput onFileChange={handleFileChange} />
            </div>
          </div>
          <Divider/>
        <VerticalSpacer size={20}></VerticalSpacer>
        <div className="row">
        <div className="col-auto">
              { status !== "Approved"
                &&
                <Button onClick={() => { setOpenAlertBoxSave(true);}}
              disabled={
                ControlsDesign=="" ||
                ControlsType=="" ||
                ControlsDesign=="" ||
                residualRiskAssessment=="" ||
                riskActionPlan=="" ||
                processes=="" ||
                subProcesses=="" ||
                inherentRisk=="" ||
                ImpactSeverity=="" ||
                DirectionRisk=="" ||
                LikelihoodFrequency=="" ||
                controls=="" || loading
              }
              >Save</Button>}
              {openAlertBoxSave && <SubmitConfirmation open={openAlertBoxSave} setopen={setOpenAlertBoxSave} title={"Save"}  onClose={closeAlertSave}/>}
              {alertCon && <AlertBox open={alertCon} setopen={setAlertCon} data={""} title="Alert" message="RCSA Report Saved !" btn1="OK" btn2="" onClose={()=>{}} />}

            </div>
            {
              recordId != 0 &&
              <div className="col-auto">
              <Button onClick={() => { setOpenAlertBoxSubmit(true);}}
            disabled={loading}
              >Submit</Button>
              {openAlertBoxSubmit && <SubmitConfirmation open={openAlertBoxSubmit} setopen={setOpenAlertBoxSubmit} title={"Submit"}  onClose={closeAlertSubmit}/>}
            </div>}
            <div className="col-auto">
              <Button variant="outlined" color="neutral" onClick={() => { goBack();}}>Cancel</Button>
            </div>
        </div>
      </div>
    </>
  );
};

export default CreateRcsa;
