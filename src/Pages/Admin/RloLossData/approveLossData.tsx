import { useLocation, useNavigate } from "react-router-dom";
import { Divider, PageHeader, VerticalSpacer } from "../../../Components/PageShared";
import AlertBox from "../../../Components/PageShared/Admin/Alert/alert";
import { useEffect, useState } from "react";
import { BackButton, Button } from "../../../Components/Buttons";
import { useAppDispatch, useAppStateSelector } from "../../../Services/Store/hooks";
import { SelectDropDown } from "../../../Components/DropDown";
import { ApproveLossDataAction, CreateLossDataAction, getAllLossDetailAction } from "../../../Services/Actions/lossAction";

const ApproveLossData = () => {
  const [isActive, setIsActive] = useState(false);
  const [isActiveB, setIsActiveB] = useState(true);
  const { state } = useLocation();
  const [openAlertBoxSubmit, setOpenAlertBoxSubmit] = useState(false);
  const [openAlertBoxSave, setOpenAlertBoxSave] = useState(false);

  const navigate = useNavigate();
  const [openSelectAprrove, setSelectAprrove] = useState(false);
  const [selectAprroveType, setSelectAprroveType] = useState("");
  const [openSelectStaffJobRole, setSelectStaffJobRole] = useState(false);
  const [SelectStaffJobRoleType, setSelectStaffJobRoleType] = useState("");
  const [openInternalBusinessLine, setInternalBusinessLine] = useState(false);
  const [InternalBusinessLineType, setInternalBusinessLineType] = useState("");
  const [openBaselEventTypeI, setBaselEventTypeI] = useState(false);
  const [BaselEventTypeIType, setBaselEventTypeIType] = useState("");
  const [openBaselEventTypeII, setBaselEventTypeII] = useState(false);
  const [BaselEventTypeIIType, setBaselEventTypeIIType] = useState("");
  const [openBaselEventTypeIII, setBaselEventTypeIII] = useState(false);
  const [BaselEventTypeIIIType, setBaselEventTypeIIIType] = useState("");
  const [openBaselLevelIBT, setBaselLevelIBT] = useState(false);
  const [BaselLevelIBTType, setBaselLevelIBTType] = useState("");
  const [openBaselLevelIIBT, setBaselLevelIIBT] = useState(false);
  const [BaselLevelIIBTType, setBaselLevelIIBTType] = useState("");
  const [openRootCause, setRootCause] = useState(false);
  const [RootCauseType, setRootCauseType] = useState("");
  const [openProcessInvolved, setProcessInvolved] = useState(false);
  const [ProcessInvolvedType, setProcessInvolvedType] = useState("");
  const [openRiskSource, setRiskSource] = useState(false);
  const [riskSourceType, setRiskSourceType] = useState("");
  const [lessonsLearnt, setLessonsLearnt] = useState("");
  const [comment, setComment] = useState("");
  const [dateOfOccurrence, setDateOfOccurrence] = useState("");
  const [nearMiss,setNearMiss ] = useState("");
  const [recoveryMode,setRecoveryMode] = useState("");
  const [lossType,setLossType] = useState("");
  const [dateDiscovered,setDateDiscovered] = useState("");
  const [refId,setRefId] = useState("");
  const [reportStatus,setReportStatus] = useState("");
  const [potentialLoss,setPotentialLoss] = useState("");
  const [grossActualLoss,setGrossActualLoss] = useState("");
  const [netActualLoss,setNetActualLoss] = useState("");
  const [staffInvolvement,setStaffInvolvement] = useState("");
  const [eventStatus,setEventStatus] = useState("");
  const [detailedLossEvent,setDetailedLossEvent] = useState("");
  const [amountRecovered,setAmountRecovered] = useState("");
  const [furtherRecovery,setFurtherRecovery] = useState("");
  const [currency,setCurrency] = useState("");
  const [rootCauses, setRootCauses] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [ data, setData] = useState<any>();
  const dispatch = useAppDispatch();
  const authState:any = useAppStateSelector((state) => state.authState)

  useEffect(() =>{
  // setData(state[1].item);
  // if(state[1]?.item?.id !== 0 && state[1]?.item?.reportStatus === "Approved" || "Rejected" || "Submitted-UpdatedByBORM")
  if(state[0].action === "adminEdit"){
    fetchData(state[1].item.id);
  }
  if(state[0].action === "adminNew" || "adminEdit"){
    
    setDateOfOccurrence(state[2]?.newDataUpdate?.dateOccurance)
      setNearMiss(state[2]?.newDataUpdate?.nearMissAmount ?? 0)
      setRecoveryMode(state[2]?.newDataUpdate?.recoveryChannel ?? "")
      setLossType(state[2]?.newDataUpdate?.lossType ?? "")
      setDateDiscovered(state[2]?.newDataUpdate?.dateDiscovery)
      setRefId(state[2]?.newDataUpdate?.refNum ?? "")
      setReportStatus(state[2]?.newDataUpdate?.reportStatus ?? "")
      setPotentialLoss(state[2]?.newDataUpdate?.potentialLossAmount ?? "")
      setGrossActualLoss(state[2]?.newDataUpdate?.grossActualAmount ?? "")
      setAmountRecovered(state[2]?.newDataUpdate?.recoveredAmount ?? "")
      setNetActualLoss(state[2]?.newDataUpdate?.netActualLossAmount ?? "")
      setStaffInvolvement(state[2]?.newDataUpdate?.staffInvolvement ?? "")
      setEventStatus(state[2]?.newDataUpdate?.eventStatus ?? "")
      setDetailedLossEvent(state[2]?.newDataUpdate?.description ?? "")
      setRootCauses(state[2]?.newDataUpdate?.rootCauseRLO ?? "")
      setFurtherRecovery(state[2]?.newDataUpdate?.furtherRecoveredAmount ?? "")
      setLessonsLearnt(state[2]?.newDataUpdate?.lessonsLearnt ?? "")
      setRiskSourceType(state[2]?.newDataUpdate?.riskSource ?? "")
      setProcessInvolvedType(state[2]?.newDataUpdate?.processInvolved ?? "")
      setRootCauseType(state[2]?.newDataUpdate?.rootCauseTypeBORM ?? "")
      setBaselLevelIIBTType(state[2]?.newDataUpdate?.baselLevel2BusinessLine ?? "")
      setBaselLevelIBTType(state[2]?.newDataUpdate?.baselLevel1BusinessLine ?? "")
      setBaselEventTypeIIIType(state[2]?.newDataUpdate?.baselEventTypeIII ?? "")
      setBaselEventTypeIIType(state[2]?.newDataUpdate?.baselEventTypeII ?? "")
      setBaselEventTypeIType(state[2]?.newDataUpdate?.baselEventTypeI ?? "")
      setInternalBusinessLineType(state[2]?.newDataUpdate?.internalBusLine ?? "")
      setSelectStaffJobRoleType(state[2]?.newDataUpdate?.staffJobRole ?? "")
      setSelectAprroveType(state[2]?.newDataUpdate?.reportStatus ?? "")
      setCurrency(state[2]?.newDataUpdate?.currencyType ?? "")
  }
  },[])

  const fetchData=async (id:number)=>{
    await dispatch(getAllLossDetailAction({id})).then((res:any)=>{
      const result= res.payload.requestData.data.data[0];
      console.log(result);
      // setData(result);
      setDateOfOccurrence(result?.dateOccurance)
      setNearMiss(result?.nearMiss)
      setRecoveryMode(result?.recoveryChannel)
      setLossType(result?.dateOccurance)
      setDateDiscovered(result?.dateDiscovery)
      setRefId(result?.refNum)
      setReportStatus(result?.reportStatus)
      setPotentialLoss(result?.potentialLossAmount)
      setGrossActualLoss(result?.grossActualAmount)
      setAmountRecovered(result?.recoveredAmount)
      setNetActualLoss(result?.netActualLossAmount)
      setStaffInvolvement(result?.processInvolved)
      setEventStatus(result?.eventStatus)
      setDetailedLossEvent(result?.description)
      setRootCauses(result?.rootCauseRLO)
      setFurtherRecovery(result?.furtherRecoveredAmount)
      setLessonsLearnt(result?.lessonLearnt)
      setRiskSourceType(result?.riskSource)
      setProcessInvolvedType(result?.processInvolved)
      setRootCauseType(result?.rootCauseTypeBORM)
      setBaselLevelIIBTType(result?.baselLevel2BusinessLine)
      setBaselLevelIBTType(result?.baselLevel1BusinessLine)
      setBaselEventTypeIIIType(result?.baselEventTypeIII)
      setBaselEventTypeIIType(result?.baselEventTypeII)
      setBaselEventTypeIType(result?.baselEventTypeI)
      setInternalBusinessLineType(result?.internalBusLine)
      setSelectStaffJobRoleType(result?.staffJobRole)
      setSelectAprroveType(result?.reportStatus)
      setCurrency(result?.currencyType)
      
    })
  }

  const [openAlertBox, setOpenAlertBox] = useState(false);
  const closeAlertSave = async ( result: string) => {
    console.log('Clicked:', result);
    if(result==="ok") {
      setLoading(true)
        // console.log('Clicked:', pageData[0]?.kriReportId);
        await SubmitLossData("Draft");
    }
    setOpenAlertBox(false);
    // const url='/rlo-loss-data';
    // navigate(`/admin${url}`);
  };
  const closeAlertSubmit = async ( result: string) => {
    console.log('Clicked:', result);
    let statusx = reportStatus;

    if(result==="ok") {
        // console.log('Clicked:', pageData[0]?.kriReportId);
      
        if(reportStatus === "Draft" || reportStatus === ""){
        await SubmitLossData("Approved-UpdatedByBORM");
        }else{
          // SubmitLossData(reportStatus +"-UpdatedByBORM");
          if(reportStatus.includes("UpdatedByBORM")){
            statusx = reportStatus;
          }else{
            statusx= reportStatus +"-UpdatedByBORM";
          }
          await SubmitLossData(statusx);
        }
    }
    setOpenAlertBox(false);
    // const url='/rlo-loss-data';
    // navigate(`/admin${url}`);
  };
  const SubmitLossData = async(status:string) =>{
    if(state[0].action === "adminNew"  && id==0){
      await SaveStep1LossData(status);
    }else{
      let recordId= state[1]?.item?.id;
      if(recordId == 0){
        recordId= id;
      }
      await SaveStep2LossData(status,recordId);
      setOpenAlertBox(false);
        const url='/rlo-loss-data';
        navigate(`/admin${url}`);
    }
  }
  const CancelBtn =() =>{
    const url='/rlo-loss-data';
    navigate(`/admin${url}`);
  }

  const SaveStep2LossData=async (status:string,id:number)=>{
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
      ReportStatus : status,
      // ReviewerComments : comment,
      ModifiedById : 1
    })).then((res:any) =>{
      var result= res?.payload?.requestData?.data;
      if(result) {
      setLoading(false)

        // setOpenAlertBox(false);
        // const url='/rlo-loss-data';
        // navigate(`/admin${url}`);
      }
    });
  }
const[id,setId]=useState(0);
  const SaveStep1LossData = async (status: string) => {
      const formData = new FormData();
      formData.append('LocationType', state[2]?.newDataUpdate?.locationType);
      formData.append('LocationId', state[2]?.newDataUpdate?.locationId);
      formData.append('ValidatorILOUserId', authState?.userData?.data?.data?.userId?.toString());
      formData.append('DateOccurance',state[2]?.newDataUpdate?.dateOccurance?.toString());
      formData.append('DateDiscovery',state[2]?.newDataUpdate?.dateDiscovery?.toString());
      formData.append('DateReported',state[2]?.newDataUpdate?.dateReported?.toString());
      formData.append('Description',state[2]?.newDataUpdate?.DetailedLossEvent ?? state[2]?.newDataUpdate?.description);
      formData.append('RootCauseRLO',state[2]?.newDataUpdate?.RootCause ?? state[2]?.newDataUpdate?.rootCauseRLO);
      formData.append('LossType',state[2]?.newDataUpdate?.LossType ?? state[2]?.newDataUpdate?.lossType);
      formData.append('CurrencyType',state[2]?.newDataUpdate?.Currency ?? state[2]?.newDataUpdate?.currencyType);
      formData.append('AmountInvolved',state[2]?.newDataUpdate?.AmountInvolved ?? state[2]?.newDataUpdate?.amountInvolved);
      formData.append('NearMissAmount',state[2]?.newDataUpdate?.NearMiss ?? state[2]?.newDataUpdate?.nearMissAmount);
      formData.append('PotentialLossAmount',state[2]?.newDataUpdate?.PotentialLoss ?? state[2]?.newDataUpdate?.potentialLossAmount);
      formData.append('GrossActualAmount',state[2]?.newDataUpdate?.GrossActualLoss ?? state[2]?.newDataUpdate?.grossActualAmount);
      formData.append('RecoveredAmount',state[2]?.newDataUpdate?.AmountRecovered ?? state[2]?.newDataUpdate?.recoveredAmount);
      formData.append('FurtherRecoveredAmount',state[2]?.newDataUpdate?.FurtherRecovery ?? state[2]?.newDataUpdate?.furtherRecoveredAmount);
      formData.append('RecoveryChannel',state[2]?.newDataUpdate?.RecoveryChannel ?? state[2]?.newDataUpdate?.recoveryChannel);
      formData.append('StaffInvolvement',state[2]?.newDataUpdate?.StaffInvolvement ?? state[2]?.newDataUpdate?.staffInvolvement);
      formData.append('EventStatus',state[2]?.newDataUpdate?.EventStatus ?? state[2]?.newDataUpdate?.eventStatus);
      formData.append('ReportStatus',status);
      formData.append('CreatedById',authState?.userData?.data?.data?.userId?.toString());

    for (const document of state[2]?.newDataUpdate?.documents) {
      formData.append('registrationDocuments', document, document.name);
      formData.append('documentName', document.name);
    }
      
    // console.log("FormData entries:");
    // for (const entry of formData.entries()) {
    //   console.log(entry);
    // }
      let id=0;
      await dispatch(CreateLossDataAction({formData})).then(
      async (response: any) => {
        const result= response?.payload?.requestData?.data;
        if(result?.code == "00"){
          id= result?.data[0]?.id;
          setId(id);
          await SaveStep2LossData(status, id);
          setLoading(false)
        }
        // console.log("Loss data updated!", formData);
        // let userRole:string=authState?.userData?.data?.data?.userRole;
        // userRole=userRole.toLocaleLowerCase();
        // // if(userRole == "rlo"){
        // const url = "/rlo-loss-data";
        // navigate(`/${userRole}${url}`);
        // }

      //   if(userRole.includes("admin")){
      //     let item={id:id};
      //     const url='/loss-data-approval';
      //     navigate(`/${userRole}${url}`, {
      //   state:[{action:'adminNew'},{item},{newDataUpdate}]
      // })
      //   }
      }
    );
  };


  return (
    <>
      {/* <BackButton navigate={navigate} /> */}
      <PageHeader title="Enter Loss Data Details"></PageHeader>
      <div className="accordion-item">
        <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
          <div>
            <strong>View Previous Step Details</strong>
          </div>
          <div>{isActive ? "-" : "+"}</div>
        </div>
        {isActive && (
          <div className="accordion-content">
            <div className="pageCard">
        <div className="pageCardHeader">
          <strong>Report Details</strong> <span className="badge"><div className="Submitted">{reportStatus}</div></span>
        </div>
          <div className="row gx-2">
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Reference ID</label>
                <div className="viewBoxContent">{refId}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Date of Occurrence</label>
                <div className="viewBoxContent">{dateOfOccurrence?.toString().substring(0,10)}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Date of Discovery</label>
                <div className="viewBoxContent">{dateDiscovered?.toString().substring(0,10)}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Loss Type</label>
                <div className="viewBoxContent">{lossType?.toString()}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Recovery Channel</label>
                <div className="viewBoxContent">{recoveryMode?.toString()}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Near Miss</label>
                <div className="viewBoxContent">{nearMiss?.toString()}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Potential Loss</label>
                <div className="viewBoxContent">{potentialLoss?.toString()}   {currency?.toString()}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Gross Actual Loss</label>
                <div className="viewBoxContent">{grossActualLoss?.toString()}   {currency?.toString()}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Amount Recovered</label>
                <div className="viewBoxContent">{amountRecovered?.toString()}   {currency?.toString()}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Further Recovery</label>
                <div className="viewBoxContent">{furtherRecovery?.toString()}   {currency?.toString()}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Net Actual Loss</label>
                <div className="viewBoxContent">{netActualLoss?.toString()}   {currency?.toString()}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Region</label>
                <div className="viewBoxContent">North</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Branch</label>
                <div className="viewBoxContent">Kano Road, Kano</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Staff Involved</label>
                <div className="viewBoxContent">{staffInvolvement?.toString()}</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Event Status</label>
                <div className="viewBoxContent">{eventStatus?.toString()}</div>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Detailed Loss Event/ Incident Description</label>
                <div className="viewBoxContent">{detailedLossEvent?.toString()}</div>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Root Cause of Event/Incident</label>
                <div className="viewBoxContent">{rootCauses?.toString()}</div>
              </div>
            </div>
          </div>
      </div>
          </div>
        )}
      </div>
              <div className="accordion-item">
        <div className="accordion-title" onClick={() => setIsActiveB(!isActiveB)}>
          <div>
            <strong>Enter BoRM Submitted Details</strong>
          </div>
          <div>{isActiveB ? "-" : "+"}</div>
        </div>
        {isActiveB && (<div className="pageCard">
        <div className="row">
          <div className="col-4"><h6>Business Line</h6></div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="">Staff Job Role</label>
              {/* <SelectDropDown
                setOpen={setSelectStaffJobRole}
                open={openSelectStaffJobRole}
                onChange={(value) => setSelectStaffJobRoleType(value)}
                placeholder="Select Metrics"
                selectedValue={SelectStaffJobRoleType}
                options={[
                  { label: "Agent", value: "Agent" },
                  { label: "Banking Officer", value: "Banking Officer" },
                ]}
              /> */}
                <input  className="form-control" 
                        type="text" 
                        name=""
                        onChange={(event) => setSelectStaffJobRoleType(event.target.value)}
                        id="internal B line"
                        value={SelectStaffJobRoleType}
                        />
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="">Internal Business Line</label>
              {/* <SelectDropDown
                setOpen={setInternalBusinessLine}
                open={openInternalBusinessLine}
                onChange={(value) => setInternalBusinessLineType(value)}
                placeholder="Select Metrics"
                selectedValue={InternalBusinessLineType}
                options={[
                  { label: "Retail Banking", value: "Retail Banking" },
                  { label: "other", value: "other" },
                ]}
              /> */}
          <input  className="form-control" 
                type="text" 
                name=""
                onChange={(event) => setInternalBusinessLineType(event.target.value)}
                id="internal B line"
                 value={InternalBusinessLineType}
                 />
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
                  <label htmlFor="">Basel Event Type I</label>
                  <SelectDropDown
                    setOpen={setBaselEventTypeI}
                    open={openBaselEventTypeI}
                    onChange={(value) => setBaselEventTypeIType(value)}
                    placeholder="Select Metrics"
                    selectedValue={BaselEventTypeIType}
                    options={[
                      { label: "internal fraud", value: "internal fraud" },
                      { label: "external fraud", value: "external fraud" },
                      { label: "employment practices & workplace safety", value: "employment practices & workplace safety" },
                      { label: "Client_ Product & Business practices", value: "Client_ Product & Business practices" },
                      { label: "Damage to physical assets", value: "Damage to physical assets" },
                      { label: "Business disruptions and system failures", value: "Business disruptions and system failures" },
                      { label: "Execution_ delivery & process management", value: "Execution_ delivery & process management" },
                    ]}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="">Basel Event Type II</label>
                  <SelectDropDown
                    setOpen={setBaselEventTypeII}
                    open={openBaselEventTypeII}
                    onChange={(value) => setBaselEventTypeIIType(value)}
                    placeholder="Select Metrics"
                    selectedValue={BaselEventTypeIIType}
                    options={[
                      { label: "Theft & Fraud", value: "Theft & Fraud" },
                      { label: "Safe Environment", value: "Safe Environment" },
                      { label: "Disasters & other events", value: "Disasters & other events" },
                      { label: "Systems", value: "Systems" },
                      { label: "Transaction Capture_ Execution & Maintenance", value: "Transaction Capture_ Execution & Maintenance" },
                      { label: "Monitoring & Reporting", value: "Monitoring & Reporting" },
                      { label: "Customer/Client Account Management", value: "Customer/Client Account Management" },
                    ]}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="">Basel Event Type III</label>
                  <SelectDropDown
                    setOpen={setBaselEventTypeIII}
                    open={openBaselEventTypeIII}
                    onChange={(value) => setBaselEventTypeIIIType(value)}
                    placeholder="Select Metrics"
                    selectedValue={BaselEventTypeIIIType}
                    options={[
                      { label: "Bank-Customer Relationship", value: "Bank-Customer Relationship" },
                      { label: "Cash Suppression", value: "Cash Suppression" },
                      { label: "Cash Theft", value: "Cash Theft" },
                      { label: "Delay in treating customers request", value: "Delay in treating customers request" },
                      { label: "Dispute over performance of advisory activities", value: "Dispute over performance of advisory activities" },
                      { label: "erroneous entry", value: "erroneous entry" },
                      { label: "error in clearing customers cheque", value: "error in clearing customers cheque" },
                      { label: "failed mandatory reporting obligation", value: "failed mandatory reporting obligation" },
                      { label: "fire outbreak", value: "fire outbreak" },
                      { label: "forgery", value: "forgery" },
                      { label: "fraud (withdrawals and deposits)", value: "fraud (withdrawals and deposits)" },
                      { label: "income reversals", value: "income reversals" },
                      { label: "incorrect client records", value: "incorrect client records" },
                      { label: "mailing error", value: "mailing error" },
                      { label: "miscommunication", value: "miscommunication" },
                      { label: "missed deadline/responsibility", value: "missed deadline/responsibility" },
                      { label: "model/system mis-operation", value: "model/system mis-operation" },
                      { label: "processing error", value: "processing error" },
                      { label: "slip and fall", value: "slip and fall" },
                      { label: "software failure", value: "software failure" },
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
            <h6>Basel Level</h6>
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="">Basel Level I Business Line</label>
                  <SelectDropDown
                    setOpen={setBaselLevelIBT}
                    open={openBaselLevelIBT}
                    onChange={(value) => setBaselLevelIBTType(value)}
                    placeholder="Select Metrics"
                    selectedValue={BaselLevelIBTType}
                    options={[
                      { label: "Corporate Finance", value: "Corporate Finance" },
                      { label: "Trading and Sales", value: "Trading and Sales" },
                      { label: "Retail Banking", value: "Retail Banking" },
                      { label: "Commercial Banking", value: "Commercial Banking" },
                      { label: "Payment & Settlement", value: "Payment & Settlement" },
                      { label: "Agency Services", value: "Agency Services" },
                    ]}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="">Basel Level II Business Line</label>
                  <SelectDropDown
                    setOpen={setBaselLevelIIBT}
                    open={openBaselLevelIIBT}
                    onChange={(value) => setBaselLevelIIBTType(value)}
                    placeholder="Select Metrics"
                    selectedValue={BaselLevelIIBTType}
                    options={[
                      { label: "Corporate Finance", value: "Corporate Finance" },
                      { label: "Sales", value: "Sales" },
                      { label: "Retail Banking", value: "Retail Banking" },
                      { label: "Commercial Banking", value: "Commercial Banking" },
                      { label: "External Clients", value: "External Clients" },
                      { label: "Issuer and Paying Agents", value: "Issuer and Paying Agents" },
                      { label: "Corporate Agents", value: "Corporate Agents" },
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
            <h6>Involvement</h6>
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="">Root Cause</label>
                  <SelectDropDown
                    setOpen={setRootCause}
                    open={openRootCause}
                    onChange={(value) => setRootCauseType(value)}
                    placeholder="Select Metrics"
                    selectedValue={RootCauseType}
                    options={[
                      { label: "Process Breach", value: "Process Breach" },
                      { label: "Poor configuration of suspense accounts", value: "Poor configuration of suspense accounts" },
                      { label: "Policy Violation", value: "Policy Violation" },
                      { label: "System Failure", value: "System Failure" },
                      { label: "Weak Controls", value: "Weak Controls" },
                      { label: "Business Decision", value: "Business Decision" },
                      { label: "Poor Customer Service", value: "Poor Customer Service" },
                      { label: "External Fraud", value: "External Fraud" },
                      { label: "Policy / SOP Violation", value: "Policy / SOP Violation" },
                    ]}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="">Process Involved</label>
                  <SelectDropDown
                    setOpen={setProcessInvolved}
                    open={openProcessInvolved}
                    onChange={(value) => setProcessInvolvedType(value)}
                    placeholder="Select Metrics"
                    selectedValue={ProcessInvolvedType}
                    options={[
                      { label: "Fund Withdrawal", value: "Fund Withdrawal" },
                      { label: "Loan Administration", value: "Loan Administration" },
                      { label: "E-Channels", value: "E-Channels" },
                      { label: "Account restriction", value: "Account restriction" },
                      { label: "Fund Transfer2", value: "Fund Transfer2" },
                      { label: "Account Opening", value: "Account Opening" },
                      { label: "Property Acquisition", value: "Property Acquisition" },
                      { label: "Failed Transaction", value: "Failed Transaction" },
                      { label: "People", value: "People" },
                      { label: "Process Breach", value: "Process Breach" },
                      { label: "Customer Service", value: "Customer Service" },
                      { label: "Environmental Safety", value: "Environmental Safety" },
                      { label: "Fraudulent inflows", value: "Fraudulent inflows" },
                      { label: "Fraudulent transfers", value: "Fraudulent transfers" },
                      { label: "Clearing Cheques", value: "Clearing Cheques" },
                      { label: "Cash Suppression", value: "Cash Suppression" },
                      { label: "Incorrect BVN Linkage", value: "Incorrect BVN Linkage" },
                      { label: "Cash Deposit", value: "Cash Deposit" },
                      { label: "Unmerited/unearned salaries", value: "Unmerited/unearned salaries" },
                    ]}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="">Risk Source</label>
                  <SelectDropDown
                    setOpen={setRiskSource}
                    open={openRiskSource}
                    onChange={(value) => setRiskSourceType(value)}
                    placeholder="Select Metrics"
                    selectedValue={riskSourceType}
                    options={[
                      { label: "People", value: "People" },
                      { label: "Process", value: "Process" },
                      { label: "System", value: "System" },
                      { label: "External Events", value: "External Events" },
                    ]}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="">Lessons Learnt</label>
                  <textarea
                    className=""
                    id=""
                    name="postContent"
                    rows={4}
                    placeholder="Enter Detail"
                    value={lessonsLearnt}
                    onChange={(e)=>{setLessonsLearnt(e.target.value)}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>)}
      </div>
      <div className="">
        {/* <div className="row">
          <div className="col-4">
            <h6>Status</h6>
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="">Review Status</label>
                  <SelectDropDown
                    setOpen={setSelectAprrove}
                    open={openSelectAprrove}
                    onChange={(value) => setSelectAprroveType(value)}
                    placeholder="Select"
                    selectedValue={selectAprroveType}
                    options={[
                      { label: "Approved", value: "Approved" },
                      { label: "Rejected", value: "Rejected" },
                    ]}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="">Your Comments</label>
                  <textarea
                    className=""
                    id=""
                    name="postContent"
                    rows={4}
                    placeholder="Enter Detail"
                    onChange={(e)=>{setComment(e.target.value)}}
                    value={comment}
                  />
                </div>
            </div>
            </div>
          </div>
        </div> */}
        
        <div className="btnGroup">
          <div className="row">
            <div className="col-auto">
              { id != 0
                &&
                <Button variant="contained" onClick={() => { setOpenAlertBoxSubmit(true);}}
              disabled= {riskSourceType==="" || ProcessInvolvedType==="" || RootCauseType==="" || BaselLevelIIBTType ==="" || BaselLevelIBTType === ""
              || BaselEventTypeIIIType === "" || BaselEventTypeIIType === "" || BaselEventTypeIType === "" || InternalBusinessLineType === "" || 
              SelectStaffJobRoleType === "" || lessonsLearnt === "" || loading
            }
              >Submit</Button>}
              {openAlertBoxSubmit && <AlertBox open={openAlertBoxSubmit} setopen={setOpenAlertBoxSubmit} data={"msg"} title={"Alert"} message={"Are you sure you want to Submit ?"} btn1={"OK"} btn2={"Cancel"} onClose={closeAlertSubmit} />}
            </div>
            <div className="col-auto">
              { (state[0].action === "adminNew") && id ==0 &&
                <Button variant="contained" onClick={() => { setOpenAlertBoxSave(true);}}
              disabled={riskSourceType==="" || ProcessInvolvedType==="" || RootCauseType==="" || BaselLevelIIBTType ==="" || BaselLevelIBTType === ""
            || BaselEventTypeIIIType === "" || BaselEventTypeIIType === "" || BaselEventTypeIType === "" || InternalBusinessLineType === "" || 
            SelectStaffJobRoleType === "" || lessonsLearnt === "" || loading
          }
              >Save</Button>
              }
              {openAlertBoxSave && <AlertBox open={openAlertBoxSave} setopen={setOpenAlertBoxSave} data={"msg"} title={"Alert"} message={"Are you sure you want to Save ?"} btn1={"OK"} btn2={"Cancel"} onClose={closeAlertSave} />}
            </div>
            <div className="col-auto">
              <Button variant="outlined" color="neutral" onClick={()=>CancelBtn()}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ApproveLossData;
