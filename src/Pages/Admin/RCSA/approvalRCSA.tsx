import { useState } from "react";
import { BackButton, Button } from "../../../Components/Buttons";
import { Divider, PageHeader, VerticalSpacer } from "../../../Components/PageShared";
import { useLocation, useNavigate } from "react-router-dom";
import { SelectDropDown } from "../../../Components/DropDown";
import AlertBox from "../../../Components/PageShared/Admin/Alert/alert";

const ApprovalRcsa = () => {
    const [openIR, setIR] = useState(false);
    const [IRType, setIRType] = useState("");
    const [openClassify, setClassify] = useState(false);
    const [ClassifyType, setClassifyType] = useState("");
    const [openIdentifiedRisks, setIdentifiedRisks] = useState(false);
    const [IdentifiedRisksType, setIdentifiedRisksType] = useState("");
    const [openControlAssesment, setControlAssesment] = useState(false);
    const [ControlAssesmentType, setControlAssesmentType] = useState("");
    const [openControlQuality, setControlQuality] = useState(false);
    const [ControlQualityType, setControlQualityType] = useState("");
    const [openRiskRating, setRiskRating] = useState(false);
    const [RiskRatingType, setRiskRatingType] = useState("");
    const [openResponseStrategy, setResponseStrategy] = useState(false);
    const [ResponseStrategyType, setResponseStrategyType] = useState("");
    const [openActionPlan, setActionPlan] = useState(false);
    const [ActionPlanType, setActionPlanType] = useState("");
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const [isActiveSecond, setIsActiveSecond] = useState(false);
    const [openAlertBoxApprove, setOpenAlertBoxApprove] = useState(false);
    const [openAlertBoxReject, setOpenAlertBoxReject] = useState(false);
    const [openSelectAprrove, setSelectAprrove] = useState(false);
    const [SelectAprroveType, setSelectAprroveType] = useState("");
    const handleRequest = (action: any) => {
        if (action == "Approve") setOpenAlertBoxApprove(true);
        else setOpenAlertBoxReject(true);
    
        // setPageNumber(pageNumber);
      };
      const [openAlertBox, setOpenAlertBox] = useState(false);
      const closeAlert = ( result: string) => {
        console.log('Clicked:', result);
        if(result==="ok") {
            // console.log('Clicked:', pageData[0]?.kriReportId);
            // updateSubmitStatus(pageData[0]?.kriReportId);
        }
        setOpenAlertBox(false);
        const url='/rcsa';
        navigate(`/admin${url}`);
      };
    return (
        <>
            <BackButton navigate={navigate} />
            <PageHeader title="Approave RCSA"></PageHeader>
            <div className="accordion-item">
                <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
                    <div>
                        <strong>View Submitted Details</strong>
                    </div>
                    <div>{isActive ? "-" : "+"}</div>
                </div>
                {isActive && (
                    <div className="accordion-content">
                        <div className="pageCard mb-4">
                            <div className="pageCardHeader">
                                <strong>Business Line</strong> <span className="badge"><div className="Submitted">Submitted</div></span>
                            </div>
                            <div className="row gx-2">
                                <div className="col-3">
                                    <div className="form-group">
                                        <label htmlFor="">ID</label>
                                        <div className="viewBoxContent">1232131231</div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="form-group">
                                        <label htmlFor="">Department/Unit</label>
                                        <div className="viewBoxContent">CRM, Customer Analytics & Insight</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pageCard mb-4">
                            <div className="pageCardHeader">
                                <strong>Business Process</strong> <span className="badge"><div className="Submitted">Submitted</div></span>
                            </div>
                            <div className="row gx-2">
                                <div className="col-3">
                                    <div className="form-group">
                                        <label htmlFor="">Processes</label>
                                        <div className="viewBoxContent">Analytics & Insights</div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="form-group">
                                        <label htmlFor="">Sub Processes</label>
                                        <div className="viewBoxContent">Campaign data sourcing</div>
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
                                        <div className="viewBoxContent">No access to adequate data source</div>
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
                                        <div className="viewBoxContent">Significant=5</div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label htmlFor="">Direction of Risk</label>
                                        <div className="viewBoxContent">Static</div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label htmlFor="">Likelihood/ Frequency of Occurrence of the identified risks</label>
                                        <div className="viewBoxContent">Certainly/Daily=5</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="accordion-item">
                <div className="accordion-title" onClick={() => setIsActiveSecond(!isActiveSecond)}>
                    <div>
                        <strong>View Update Details</strong>
                    </div>
                    <div>{isActiveSecond ? "-" : "+"}</div>
                </div>
                {isActiveSecond && (
                    <div className="accordion-content">
                        <div className="pageCard mb-4">
                            <div className="pageCardHeader">
                                <strong>Risk</strong>
                            </div>
                            <div className="row gx-2">
                                <div className="col-3">
                                    <div className="form-group">
                                        <label htmlFor="">Inherent Risk Report</label>
                                        <div className="viewBoxContent">1232131231</div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="form-group">
                                        <label htmlFor="">Classify The Risk As</label>
                                        <div className="viewBoxContent">CRM, Customer</div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="form-group">
                                        <label htmlFor="">Categorize The Identified Risks</label>
                                        <div className="viewBoxContent">Analytics & Insight</div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="form-group">
                                        <label htmlFor="">State The Root Cause For The Identified Risks</label>
                                        <div className="viewBoxContent">Analytics & Insight</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pageCard mb-4">
                            <div className="pageCardHeader">
                                <strong>Controls</strong>
                            </div>
                            <div className="row gx-2">
                                <div className="col-3">
                                    <div className="form-group">
                                        <label htmlFor="">Control Assesment</label>
                                        <div className="viewBoxContent">Analytics & Insights</div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="form-group">
                                        <label htmlFor="">Control Quality</label>
                                        <div className="viewBoxContent">Campaign data sourcing</div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="form-group">
                                        <label htmlFor="">Residual Risk Rating</label>
                                        <div className="viewBoxContent">Campaign data sourcing</div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="form-group">
                                        <label htmlFor="">What Are The Action Plans To Mitigate The Residual Risks?</label>
                                        <div className="viewBoxContent">Campaign data sourcing</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pageCard mb-4">
                            <div className="pageCardHeader">
                                <strong>Strategy & Time</strong>
                            </div>
                            <div className="row gx-2">
                                <div className="col-3">
                                    <div className="form-group">
                                        <label htmlFor="">Response Strategy</label>
                                        <div className="viewBoxContent">Analytics & Insights</div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="form-group">
                                        <label htmlFor="">Status Of Action Plan</label>
                                        <div className="viewBoxContent">Campaign data sourcing</div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="form-group">
                                        <label htmlFor="">Expeted Resolution Time</label>
                                        <div className="viewBoxContent">Campaign data sourcing</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* <div className="pageCard mb-4">
                <div className="row">
                    <div className="col-4">
                        <h6>Risk</h6>
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="">Inherent Risk Report</label>
                                    <SelectDropDown
                                        setOpen={setIR}
                                        open={openIR}
                                        onChange={(value) => setIRType(value)}
                                        placeholder="Select"
                                        selectedValue={IRType}
                                        options={[
                                        { label: "High", value: " " },
                                        { label: "Inactive", value: " " },
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="">Classify The Risk As</label>
                                    <SelectDropDown
                                        setOpen={setClassify}
                                        open={openClassify}
                                        onChange={(value) => setClassifyType(value)}
                                        placeholder="Select"
                                        selectedValue={ClassifyType}
                                        options={[
                                        { label: "High", value: " " },
                                        { label: "Inactive", value: " " },
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="">Categorize The Identified Risks</label>
                                    <SelectDropDown
                                        setOpen={setIdentifiedRisks}
                                        open={openIdentifiedRisks}
                                        onChange={(value) => setIdentifiedRisksType(value)}
                                        placeholder="Select"
                                        selectedValue={IdentifiedRisksType}
                                        options={[
                                        { label: "High", value: " " },
                                        { label: "Inactive", value: " " },
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="">
                                        State The Root Cause For The Identified Risks
                                    </label>
                                    <textarea
                                        className=""
                                        id=""
                                        name="postContent"
                                        rows={4}
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
                        <h6>Controls</h6>
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="">Control Assesment</label>
                                    <SelectDropDown
                                        setOpen={setControlAssesment}
                                        open={openControlAssesment}
                                        onChange={(value) => setControlAssesmentType(value)}
                                        placeholder="Select"
                                        selectedValue={ControlAssesmentType}
                                        options={[
                                        { label: "High", value: " " },
                                        { label: "Inactive", value: " " },
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="">Control Quality</label>
                                    <SelectDropDown
                                        setOpen={setControlQuality}
                                        open={openControlQuality}
                                        onChange={(value) => setControlQualityType(value)}
                                        placeholder="Select"
                                        selectedValue={ControlQualityType}
                                        options={[
                                        { label: "High", value: " " },
                                        { label: "Inactive", value: " " },
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="">Residual Risk Rating</label>
                                    <SelectDropDown
                                        setOpen={setRiskRating}
                                        open={openRiskRating}
                                        onChange={(value) => setRiskRatingType(value)}
                                        placeholder="Select"
                                        selectedValue={RiskRatingType}
                                        options={[
                                        { label: "High", value: " " },
                                        { label: "Inactive", value: " " },
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="">
                                        What Are The Action Plans To Mitigate The Residual Risks?
                                    </label>
                                    <textarea
                                        className=""
                                        id=""
                                        name="postContent"
                                        rows={4}
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
                        <h6>Strategy & Time</h6>
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="">Response Strategy</label>
                                    <SelectDropDown
                                        setOpen={setResponseStrategy}
                                        open={openResponseStrategy}
                                        onChange={(value) => setResponseStrategyType(value)}
                                        placeholder="Select"
                                        selectedValue={ResponseStrategyType}
                                        options={[
                                        { label: "High", value: " " },
                                        { label: "Inactive", value: " " },
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="">Status Of Action Plan</label>
                                    <SelectDropDown
                                        setOpen={setActionPlan}
                                        open={openActionPlan}
                                        onChange={(value) => setActionPlanType(value)}
                                        placeholder="Select"
                                        selectedValue={ActionPlanType}
                                        options={[
                                        { label: "High", value: " " },
                                        { label: "Inactive", value: " " },
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="">Expeted Resolution Time</label>
                                    <input
                                    type="date"
                                    className="form-control"
                                    placeholder="Select From Date"
                                    required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="pageCard">
        <div className="row">
          <div className="col-4">
            <h6>Approval</h6>
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="">Is Approved ?</label>
                  <SelectDropDown
                    setOpen={setSelectAprrove}
                    open={openSelectAprrove}
                    onChange={(value) => setSelectAprroveType(value)}
                    placeholder="Select"
                    selectedValue={SelectAprroveType}
                    options={[
                      { label: "Approve", value: "approve" },
                      { label: "Reject", value: "reject" },
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
                  />
                </div>
            </div>
            </div>
          </div>
        </div>
        
        <div className="btnGroup">
          <div className="row">
            <div className="col-auto">
              <Button variant="contained" onClick={() => { setOpenAlertBox(true);}}>Submit</Button>
              {openAlertBox && <AlertBox open={openAlertBox} setopen={setOpenAlertBox} data={"msg"} title={"Alert"} message={"Are you sure you want to approve/Reject ?"} btn1={"OK"} btn2={"Close"} onClose={closeAlert} />}
            </div>
            <div className="col-auto">
              <Button variant="outlined" color="neutral">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
        </>
    );
};
export default ApprovalRcsa;