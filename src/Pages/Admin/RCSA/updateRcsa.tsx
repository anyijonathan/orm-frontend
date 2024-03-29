import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "../../../Components/Modal";
import { VerticalSpacer } from "../../../Components/PageShared";
import { ModalItemsContainer } from "../../../Components/Modal/itemCard";
import { SelectDropDown } from "../../../Components/DropDown";
import { Button } from "../../../Components/Buttons";
import AlertBox from "../../../Components/PageShared/Admin/Alert/alert";
import { useAppDispatch, useAppStateSelector } from "../../../Services/Store/hooks";
import { ApproveRiskReportAction } from "../../../Services/Actions/rcsaAction";
import { data } from "../UserRoleManagement/RoleManagement/tableGroupingPage";


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
  setopen:any
  data:any  
  onClose: (
    admindata:any
  ) => void;
  cancel:(res:string)=>void;
}

const UpdateRcsa = (
  {
  open,
  setopen,
  data,
  onClose,
  cancel
}: CreateKriCatProps
) => {
 const [IdentifiedRisksType, setIdentifiedRisksType] = useState("");
 const [openRiskRating, setRiskRating] = useState(false);
 const [RiskRatingType, setRiskRatingType] = useState("");
 const [openResponseStrategy, setResponseStrategy] = useState(false);
 const [ResponseStrategyType, setResponseStrategyType] = useState("");
 const [openActionPlan, setActionPlan] = useState(false);
 const [ActionPlanType, setActionPlanType] = useState("");
 const [openAlertBox, setOpenAlertBox] = useState(false);
 const [alertCon, setAlertCon] = useState(false);
 const [riskExpectedResolutionTime, setRiskExpectedResolutionTime] = useState("");
 const [rootCause, setRootCause] = useState("");
 const [title, setTitle] = useState("Approve");
 const [actionPlanning, setActionPlanning] = useState("");
 const dispatch = useAppDispatch();  
 const authState:any = useAppStateSelector((state) => state.authState);
const [openCategorize,setOpenCategorize] = useState(false);
const [openRiskClassification,setOpenRiskClassification] = useState(false);
const [riskClassification, setRiskClassification] = useState("");



const closeAlert=()=>{
  let userId= authState?.userData?.data?.data?.userId;
  let reportStatus= "Approved";
  let id=data.id
    let admindat={
        id,riskClassification,IdentifiedRisksType,rootCause,
        ActionPlanType,riskExpectedResolutionTime,
        ResponseStrategyType,reportStatus, userId
    }
    onClose(admindat);
    setopen(false);
}

useEffect(()=>{
  if(data?.riskClassification){
    setRiskClassification(data?.riskClassification)
    setIdentifiedRisksType(data?.riskCategory)
    setRootCause(data?.riskRootCause)
    // setRiskRatingType(data?.riskRating)    
    // setActionPlanning(data?.riskActionPlan)
    setActionPlanType(data?.riskActionPlanStatus)
    setRiskExpectedResolutionTime(data?.riskExpectedResolutionTime?.toString()?.substring(0,10))        
    setResponseStrategyType(data?.riskStrategy)
  }
  if(data.reportStatus === "Submitted"){
  setTitle("Approve")
    }
    else{
    setTitle("Update")}
    },[]);
let titleData:string = title + " Risk Report";

  return (
    <>
      <Modal show={open} position="right" width="40%" onClose={() => setopen(false)}>
        <ModalBody>
          <ModalHeader
            title={titleData}
            subtitle=""
            onClose={() => setopen(false)}
          />
          {/* <form> */}
            <VerticalSpacer size={14} />
            <ModalItemsContainer>
                <div className="row">
                  <div className="col-12">
                <div className="form-group">
                  <label htmlFor="2">Risk Classification</label>
                  <SelectDropDown
                        setOpen={setOpenRiskClassification}
                        open={openRiskClassification}
                        onChange={(value) => setRiskClassification(value)}
                        placeholder="Select"
                        selectedValue={riskClassification}
                        options={[
                        { label: "People", value: "Significant" },
                        { label: "Process", value: "Major" },
                        { label: "System", value: "Moderate" },
                        { label: "External Limit", value: "Minor" },
                        ]}
                    />
                </div>
              </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="">Risks Categorization</label>
                      <SelectDropDown
                        setOpen={setOpenCategorize}
                        open={openCategorize}
                        onChange={(value) => {setIdentifiedRisksType(value)}}
                        placeholder="Select"
                        selectedValue={IdentifiedRisksType}
                        options={[
                        { label: "CYBER RISK", value: "CYBER RISK" },
                        { label: "TECHNOLOGY RISK", value: "TECHNOLOGY RISK" },
                        { label: "MARKET/ LIQUIDITY RISK", value: "MARKET/ LIQUIDITY RISK" },
                        { label: "OPERATIONAL RISK", value: "OPERATIONAL RISK" },
                        { label: "REGULATORY RISK", value: "REGULATORY RISK" },
                        { label: "COMPLIANCE RISK", value: "COMPLIANCE RISK" },
                        { label: "STRATEGIC RISK", value: "STRATEGIC RISK" },
                        { label: "REGULATORY RISK", value: "REGULATORY RISK" },
                        { label: "REPUTATIONAL RISK", value: "REPUTATIONAL RISK" },
                        { label: "ENVIRONMENTAL/SOCIA RISK", value: "ENVIRONMENTAL/SOCIAL RISK" },
                        { label: "OTHERS", value: "OTHERS" },
                        ]}
                      />
                    </div>
                  </div>
                   <div className="col-12">
                    <div className="form-group">
                      
                      <label htmlFor="">RootCause of Risk</label>

                      <textarea
                            className=""
                            id=""
                            onChange={(e:any)=>{setRootCause(e.target.value)}}
                            name="postContent"
                            rows={4}
                            value={rootCause}
                        />
                    </div>
                  </div> 
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="">Response Strategy</label>
                      <SelectDropDown
                        setOpen={setResponseStrategy}
                        open={openResponseStrategy}
                        onChange={(value) => setResponseStrategyType(value)}
                        placeholder="Select"
                        selectedValue={ResponseStrategyType}
                        options={[
                        { label: "Accept", value: "Accept" },
                        { label: "Mitigate", value: "Mitigate" },
                        { label: "Transfer", value: "Transfer" },
                        { label: "Avoid", value: "Avoid" },
                        ]}
                      />
                        
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="">Status Of Action Plan</label>
                      <SelectDropDown
                        setOpen={setActionPlan}
                        open={openActionPlan}
                        onChange={(value) => setActionPlanType(value)}
                        placeholder="Select"
                        selectedValue={ActionPlanType}
                        options={[
                        { label: "Open", value: "Open" }, 
                        { label: "Work in Progress", value: "Work in Progress" },
                        { label: "Closed", value: "Closed" },
                        ]}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="">Expected Resolution Time</label>
                      <input
                      type="date"
                      className="form-control"
                      placeholder="Select From Date"
                      required                    
                      value={riskExpectedResolutionTime}
                      onChange={(event)=>{setRiskExpectedResolutionTime(event.target.value)}}
                      />
                    </div>
                  </div>
                  
                  
                </div>
                <div className="row mt-2">
                  <div className="col-3">
                    <Button variant="contained" onClick={() => {closeAlert()}}
                    disabled={
                      ResponseStrategyType==="" ||
                      riskExpectedResolutionTime==="" ||
                      ActionPlanType==="" ||
                      rootCause==="" ||
                      IdentifiedRisksType===""
                    }
                    >Submit</Button>
                  </div>
                  <div className="col-3">
                    <Button variant="outlined" onClick={() => {cancel("cancel"); setopen(false)}}>Cancel</Button>
                  </div>
                </div>
            </ModalItemsContainer>
            {/* {} */}
          {/* </form> */}
        </ModalBody>
    </Modal>
    </>
  );
};

export default UpdateRcsa;