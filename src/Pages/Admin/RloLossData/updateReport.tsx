import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "../../../Components/Modal";
import { VerticalSpacer } from "../../../Components/PageShared";
import { ModalItemsContainer } from "../../../Components/Modal/itemCard";
import { SelectDropDown } from "../../../Components/DropDown";
import { Button } from "../../../Components/Buttons";
import AlertBox from "../../../Components/PageShared/Admin/Alert/alert";
import { useNavigate } from "react-router-dom";
import { ApproveLossDataAction, getAllLossDetailAction } from "../../../Services/Actions/lossAction";
import { useAppDispatch, useAppStateSelector } from "../../../Services/Store/hooks";
import { Cancel } from "@mui/icons-material";


/**
  * <summary>
  * creates the header and data format for the detialed view table
  * </summary>
  * <param name="open, setopen, data, request, totalCount">
  * </param> 
  * <returns>
  * Formatted table data and is called by index page of DetailedView
  * </returns> 
  */
interface CreateKriCatProps {
  open:any,
  setopen:any,
  id:number,
  status:string,
  onClose: (
    data:any
  ) => void;
  cancel:(res:string)=>void;
}

const UpdateReport = (
  {
  open,
  setopen,
  id,
  status,
  onClose,
  cancel
}: CreateKriCatProps
) => {
  let userState:any = useAppStateSelector((state) => state.authState)
 const [openAlertBox, setOpenAlertBox] = useState(false);
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
 let titleData = "Update Report";
 const navigate = useNavigate();
 const dispatch = useAppDispatch();

 useEffect(()=>{
  if (status?.includes("UpdatedByBORM")){
    fetchData(id);
  }
 },[]);

 const fetchData=async (id:number)=>{
  await dispatch(getAllLossDetailAction({id})).then((res:any)=>{
    const result= res.payload.requestData.data.data[0];
    console.log(result);
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
  })
}

//  const closeAlert = ( result: string) => {
//   console.log('Clicked:', result);
//   if(result==="ok") {
//     onClose({id:id,SelectStaffJobRoleType:SelectStaffJobRoleType,
//       InternalBusinessLineType:InternalBusinessLineType,BaselEventTypeIType:BaselEventTypeIType,
//       BaselEventTypeIIType:BaselEventTypeIIType,BaselEventTypeIIIType:BaselEventTypeIIIType,
//       BaselLevelIBTType:BaselLevelIBTType,BaselLevelIIBTType:BaselLevelIIBTType,
//       RootCauseType:RootCauseType,ProcessInvolvedType:ProcessInvolvedType,
//       riskSourceType:riskSourceType,lessonsLearnt:lessonsLearnt});
//     setopen(false);
//     // SubmitLossData();
//   }
// };
const onCloseSubmit =() => {
  let data= {id,SelectStaffJobRoleType,
    InternalBusinessLineType,BaselEventTypeIType,
    BaselEventTypeIIType,BaselEventTypeIIIType,
    BaselLevelIBTType,BaselLevelIIBTType,
    RootCauseType,ProcessInvolvedType,
    riskSourceType,lessonsLearnt}
  onClose(data);
    setopen(false);
}

// const SubmitLossData = async() =>{
//   let reportStatus = status;
//   if(status.includes("UpdatedByBORM")){
//     reportStatus = status;
//   }else{
//     reportStatus= status +"-UpdatedByBORM"
//   }

//   await dispatch(ApproveLossDataAction({
//     id : id,
//     StaffJobRole : SelectStaffJobRoleType,
//     InternalBusLine : InternalBusinessLineType,
//     BaselEventTypeI : BaselEventTypeIType,
//     BaselEventTypeII : BaselEventTypeIIType,
//     BaselEventTypeIII : BaselEventTypeIIIType,
//     BaselLevel1BusinessLine : BaselLevelIBTType,
//     BaselLevel2BusinessLine : BaselLevelIIBTType,
//     RootCauseTypeBORM : RootCauseType,
//     ProcessInvolved : ProcessInvolvedType,
//     RiskSource : riskSourceType,
//     LessonLearnt : lessonsLearnt,
//     ReportStatus : reportStatus,
//     ModifiedById : userState?.userData?.data?.data?.userId
//   })).then((res:any) =>{
//     var result= res?.payload?.requestData?.data;
//     if(result) {
//       let userRole:string=userState?.userData?.data?.data?.userRole;
//         userRole=userRole?.toLocaleLowerCase();
//         const url = "/rlo-loss-data";
//         navigate(`/${userRole}${url}`);
//     }
//   });
// }

const Cancelled =()=>{
  setopen(false)
  cancel("cancel");
}
  return (
    <>
      <Modal show={open} position="right" width="40%" onClose={() => setopen(false)}>
        <ModalBody>
          <ModalHeader
            title={titleData}
            subtitle=""
            onClose={() => setopen(false)}
          />
          <form>
            <VerticalSpacer size={14} />
            <ModalItemsContainer>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="">Staff Job Role</label>
                      {/* <SelectDropDown
                        setOpen={setSelectStaffJobRole}
                        open={openSelectStaffJobRole}
                        onChange={(value) => setSelectStaffJobRoleType(value)}
                        placeholder="Select from DropDown"
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
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="">Internal Business Line</label>
                      {/* <SelectDropDown
                        setOpen={setInternalBusinessLine}
                        open={openInternalBusinessLine}
                        onChange={(value) => setInternalBusinessLineType(value)}
                        placeholder="Select from DropDown"
                        selectedValue={InternalBusinessLineType}
                        options={[
                          { label: "Retail Banking", value: "Retail Banking" },
                          { label: "other", value: "other" },
                        ]}
                      />
                       */}
                       <input  className="form-control" 
                        type="text" 
                        name=""
                        onChange={(event) => setInternalBusinessLineType(event.target.value)}
                        id="internal B line"
                        value={InternalBusinessLineType}
                        />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="">Basel Event Type I</label>
                      <SelectDropDown
                    setOpen={setBaselEventTypeI}
                    open={openBaselEventTypeI}
                    onChange={(value) => setBaselEventTypeIType(value)}
                    placeholder="Select from DropDown"
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
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="">Basel Event Type II</label>
                      <SelectDropDown
                    setOpen={setBaselEventTypeII}
                    open={openBaselEventTypeII}
                    onChange={(value) => setBaselEventTypeIIType(value)}
                    placeholder="Select from DropDown"
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
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="">Basel Event Type III</label>
                      <SelectDropDown
                    setOpen={setBaselEventTypeIII}
                    open={openBaselEventTypeIII}
                    onChange={(value) => setBaselEventTypeIIIType(value)}
                    placeholder="Select from DropDown"
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
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="">Basel Level I Business Line</label>
                      <SelectDropDown
                    setOpen={setBaselLevelIBT}
                    open={openBaselLevelIBT}
                    onChange={(value) => setBaselLevelIBTType(value)}
                    placeholder="Select from DropDown"
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
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="">Basel Level II Business Line</label>
                      <SelectDropDown
                    setOpen={setBaselLevelIIBT}
                    open={openBaselLevelIIBT}
                    onChange={(value) => setBaselLevelIIBTType(value)}
                    placeholder="Select from DropDown"
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
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="">Root Cause</label>
                      <SelectDropDown
                    setOpen={setRootCause}
                    open={openRootCause}
                    onChange={(value) => setRootCauseType(value)}
                    placeholder="Select from DropDown"
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
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="">Process Involved</label>
                      <SelectDropDown
                    setOpen={setProcessInvolved}
                    open={openProcessInvolved}
                    onChange={(value) => setProcessInvolvedType(value)}
                    placeholder="Select from DropDown"
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
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="">Risk Source</label>
                      <SelectDropDown
                    setOpen={setRiskSource}
                    open={openRiskSource}
                    onChange={(value) => setRiskSourceType(value)}
                    placeholder="Select from DropDown"
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
                        <label htmlFor="">
                            Lessons Learnt
                        </label>
                        <textarea
                          className=""
                          id=""
                          name="ll"
                          rows={4}
                          placeholder="Enter Detail"
                          value={lessonsLearnt}
                          onChange={(e)=>{setLessonsLearnt(e.target.value)}}
                        />
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-3">
                    <Button variant="contained" onClick={() => {onCloseSubmit()}}
                    disabled={ 
                    SelectStaffJobRoleType === "" ||
                    InternalBusinessLineType === "" || BaselEventTypeIType === "" || 
                    BaselEventTypeIIType === "" || BaselEventTypeIIIType === "" || 
                    BaselLevelIBTType === "" || BaselLevelIIBTType === "" || 
                    RootCauseType === "" || ProcessInvolvedType === "" || 
                    riskSourceType === "" || lessonsLearnt === ""}
                    >Update</Button>
                  </div>
                  <div className="col-3">
                    <Button variant="outlined" onClick={() => Cancelled()}>Cancel</Button>
                  </div>
                </div>
            </ModalItemsContainer>
              {}
          </form>
        </ModalBody>
    </Modal>       
    </>
  );
};

export default UpdateReport;
