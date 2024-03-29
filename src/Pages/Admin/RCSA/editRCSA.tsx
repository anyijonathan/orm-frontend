import { useNavigate } from "react-router-dom";
import { BackButton, Button } from "../../../Components/Buttons";
import { Divider, PageHeader, VerticalSpacer } from "../../../Components/PageShared";
import { SelectDropDown } from "../../../Components/DropDown";
import { useState } from "react";
import SubmitConfirmation from "../../../Components/PageShared/Admin/SubmitConfirmation";


const EditRcsa = () => {
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
  const [ControlEffectiveness, setControlEffectiveness] = useState("");
  const [OpenResponsibility, setOpenResponsibility] = useState(false);
  const [Responsibility, setResponsibility] = useState("");
  const [openAlertBox, setOpenAlertBox] = useState(false);
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <BackButton navigate={navigate} />
      <PageHeader title="Edit RCSA"></PageHeader>
      <strong>Enter loss data detail</strong>
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
                  <label htmlFor="">Department/Unit</label>
                  <input
                    type="text"
                    disabled
                    className="form-control"
                    placeholder="CRM, Customer Analytics & Insight"
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
            <h6>Business Line</h6>
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
                        { label: "1", value: "1" },
                        { label: "2", value: "2" },
                        { label: "3", value: "3" },
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
                        { label: "1", value: "1" },
                        { label: "2", value: "2" },
                        { label: "3", value: "3" },
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
                        { label: "1", value: "1" },
                        { label: "2", value: "2" },
                        { label: "3", value: "3" },
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
                        { label: "1", value: "1" },
                        { label: "2", value: "2" },
                        { label: "3", value: "3" },
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
                        { label: "1", value: "1" },
                        { label: "2", value: "2" },
                        { label: "3", value: "3" },
                        ]}
                    />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="">Control Effectiveness</label>
                  <SelectDropDown
                        setOpen={setOpenControlEffectiveness}
                        open={OpenControlEffectiveness}
                        onChange={(value) => setControlEffectiveness(value)}
                        placeholder="Select"
                        selectedValue={ControlEffectiveness}
                        options={[
                        { label: "1", value: "1" },
                        { label: "2", value: "2" },
                        { label: "3", value: "3" },
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
            <h6>Residual Risk Assessment</h6>
          </div>
          <div className="col-8">
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                    <label htmlFor="">Residual Risk. These are risks that remain after controls have been applied</label>
                    <textarea
                        className=""
                        name="postContent"
                        rows={4}
                        placeholder="Enter Detail"
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
                <label htmlFor="">Responsibility</label>
                  <SelectDropDown
                        setOpen={setOpenResponsibility}
                        open={OpenResponsibility}
                        onChange={(value) => setResponsibility(value)}
                        placeholder="Select"
                        selectedValue={Responsibility}
                        options={[
                        { label: "1", value: "1" },
                        { label: "2", value: "2" },
                        { label: "3", value: "3" },
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
            <div className="col-auto">
              <Button onClick={() => { setOpenAlertBox(true);}}>Update</Button>
              {openAlertBox && <SubmitConfirmation open={openAlertBox} setopen={setOpenAlertBox} onClose={()=>{}}/>}
            </div>
            <div className="col-auto">
              <Button variant="outlined" color="neutral" onClick={() => { goBack();}}>Cancel</Button>
            </div>
        </div>
      </div>
    </>
  );
};

export default EditRcsa;
