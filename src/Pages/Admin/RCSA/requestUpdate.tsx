import { useState } from "react";
import { BackButton, Button } from "../../../Components/Buttons";
import { Divider, PageHeader, VerticalSpacer } from "../../../Components/PageShared";
import { useLocation, useNavigate } from "react-router-dom";
import { SelectDropDown } from "../../../Components/DropDown";
import AlertBox from "../../../Components/PageShared/Admin/Alert/alert";

const RequestUpdate = () => {
   
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const [openAlertBoxApprove, setOpenAlertBoxApprove] = useState(false);
    const [openAlertBoxReject, setOpenAlertBoxReject] = useState(false);
    const [openRequestUpdate, setRequestUpdate] = useState(false);
    const [RequestUpdateType, setRequestUpdateType] = useState("");
    const [isActiveSecond, setIsActiveSecond] = useState(false);
    const handleRequest = (action: any) => {
        if (action == "Approve") setOpenAlertBoxApprove(true);
        else setOpenAlertBoxReject(true);

        // setPageNumber(pageNumber);
    };
    const [openAlertBox, setOpenAlertBox] = useState(false);
    const closeAlert = (result: string) => {
        console.log('Clicked:', result);
        if (result === "ok") {
            // console.log('Clicked:', pageData[0]?.kriReportId);
            // updateSubmitStatus(pageData[0]?.kriReportId);
        }
        setOpenAlertBox(false);
        const url = '/rcsa';
        navigate(`/admin${url}`);
    };
    return (
        <>
            <BackButton navigate={navigate} />
            <PageHeader title="Request Update"></PageHeader>
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

            <div className="pageCard">
                <div className="row">
                    <div className="col-4">
                        <h6>Request</h6>
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <div className="col-6">
                            <div className="form-group">
                            <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                    <label className="form-check-label" htmlFor="flexCheckChecked">
                                        Request Update
                                    </label>
                                </div>
                            </div>
                                
                                {/* <div className="form-group">
                                    <label htmlFor="">Request Update</label>
                                    <SelectDropDown
                                        setOpen={setRequestUpdate}
                                        open={openRequestUpdate}
                                        onChange={(value) => setRequestUpdateType(value)}
                                        placeholder="Select"
                                        selectedValue={RequestUpdateType}
                                        options={[
                                            { label: "Approve", value: "approve" },
                                            { label: "Reject", value: "reject" },
                                        ]}
                                    />
                                </div> */}
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="">Comments</label>
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
                            <Button variant="contained" onClick={() => { setOpenAlertBox(true); }}>Submit</Button>
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
export default RequestUpdate;