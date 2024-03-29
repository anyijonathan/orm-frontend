import { useEffect, useState } from "react";
import { Button, IconButton } from "../../../Components/Buttons";
import {
  Dropdown,
  DropdownContentContaner,
  SelectDropDown,
} from "../../../Components/DropDown";
import { AuditIcon, Bell, CalendarIcon, CloudUploadIcon, GitBranch, GitCommit, GitPullRequest, Layer, Repeat, SettingsBlack, Shuffle } from "../../../Components/Icons";
import {
  PageHeader,
  TableCard,
  TableFiltersContainer,
  VerticalSpacer,
} from "../../../Components/PageShared";
import styles from "../../../Assets/Styles/global.scss?inline";
import { SummaryCard } from "../../../Components/SummaryCard";
import { getBranchGridDataAction, getDepartmentGridDataAction } from "../../../Services/Actions/locationAction";
import { useAppDispatch, useAppStateSelector } from "../../../Services/Store/hooks";


const KriIndicator = () => {
  const [openEscalationType, setOpenEscalationType] = useState(false);
  const [escalationType, setEscalationType] = useState("");
  const [openToleranceType, setOpenToleranceType] = useState(false);
  const [toleranceType, setToleranceType] = useState("");
  const [openFrequencyType, setOpenFrequencyType] = useState(false);
  const [FrequencyType, setFrequencyType] = useState("");
  const [openAppetiteType, setOpenAppetiteType] = useState(false);
  const [AppetiteType, setAppetiteType] = useState("");  
  const [dropDownData, setDropDownData] = useState<any[]>([]);
  const [locationType, setLocationType] = useState("B");
    const [OpenDepartment, setOpenDepartment] = useState(false);
    const [department, setDepartment] = useState("");
    const [typeOrder, setTypeOrder] = useState("");
    const [metricValuesType, setMetricValuesType] = useState("");
    const authState: any = useAppStateSelector((state) => state.authState);

    const dispatch = useAppDispatch();
    
  let [formData, setFormData] = useState({
    LocationId: 0,
    LocationType: "",
    metricName: "",
    frequency: "",
    toleranceLowerBound: "",
    escalationLowerBound: "",
    appetiteUpperBound: "",
    toleranceUpperBound: "",
    escalationUpperBound: "",
    appetiteType: "",
    toleranceType: "",
    escalationType: "",
    createdById:authState?.userData?.data?.data?.userId,
    isActive:true,
  });

  useEffect ( ()=>{
    fetchData("Department");
},[]);

  const handleSave = () => {    
    const jsonData = JSON.stringify(formData);    
    console.log("Data saved:", jsonData);
  };

  const handleSubmit = () => {    
    console.log("Data submitted!");
  };

  const handleCancel = () => {   
    console.log("Cancelled");
  };
  const handleCreate = () => {   
    handleSave(); 
  };

  const handleType=(event:any,value:string)=>{
    event.preventDefault();
    let typeCheck= metricValuesType + value
    setTypeOrder(value)
  //   for (const field of ['appetiteType', 'toleranceType', 'escalationType']) {
  //     formData = {
  //         ...formData,
  //         [field]: typeCheck,
  //     };
  //     setFormData(formData);
  // }
  const fieldsToUpdate: Record<string, string> = {
    appetiteType: typeCheck,
    toleranceType: typeCheck,
    escalationType: typeCheck,
  };

  // Update state using functional update to ensure the latest state is used
  setFormData((prevFormData) => ({
    ...prevFormData,
    ...fieldsToUpdate,
  }));
  }

  const handleInputChange = (field:any, value:any) => {
    setMetricValuesType(value);
        setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  //   if (["appetiteType"].includes(field)) {
  //     formData = {
  //         ...formData,
  //         [field]: value,
  //     };
  //     setFormData(formData);
  // }
  };


  const fetchData= async (location:string) =>{
    if(location==="Branch"){
              setLocationType("B");
    }
  else{
    setLocationType("D");
    await dispatch(
        getDepartmentGridDataAction( {Title:"", status:"Active", PageNumber:1,isExport:true})          //todo- for user mang - pageno. free api
        ).then((response:any) => {
          const result= response?.payload?.requestData?.data;
          const dropdownOptions = result.data.map((item:any) => ({
            label: item.department,
            value: item.id
          }));
          setDropDownData(dropdownOptions)
          setDepartment(dropdownOptions[0]?.value)
    }); 
  }
  }
  const UpdateLocation=(value:any,option:string)=>{
    if(option=="D"){
      setDepartment(value);
    }
  }

  const UpdateType= (value:string, type:string) =>{
    handleInputChange(type, value)
  }
  return (
    <>
      <PageHeader title="KRI Indicator"></PageHeader>
      <div className="pageCard">
        <h5 className="pageCardTitle">Create Indicator Entry Report</h5>
        <div className="row">
        <div className="col-3 btn-group mb-4" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off"  
                    onClick={()=>fetchData("Branch")} checked={locationType==="B"} />
                    <label className="btn btn-outline-primary" htmlFor="btnradio1">Branch</label>

                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off"
                    onClick={()=>fetchData("Department")} checked={locationType==="D"}/>
                    <label className="btn btn-outline-primary" htmlFor="btnradio2">Department</label>
                </div>
                
                { locationType == "D"  &&
                <div className="col-auto">
                    <div className="">
                        <SelectDropDown
                            setOpen={setOpenDepartment}
                            open={OpenDepartment}
                            onChange={(value) => {UpdateLocation(value,"D")}}
                            placeholder="Select Department"
                            selectedValue={department}
                            options={dropDownData}
                        />
                    </div>
                </div>}
        </div>
        <div className="row">
          {/* <div className="col-12"> */}
            <div className="form-group col-6">
              <label htmlFor="">Input Kri Metric Indicator</label>
              <textarea
                className="form-control"
                id="kri"
                placeholder="Enter "
                name="kri"
                rows={2}
                onChange={(e) => handleInputChange("metricName", e.target.value)}
              />
            </div>
            <div className="form-group col-6">
              <label htmlFor="">Frequency</label>
              <SelectDropDown
                setOpen={setOpenFrequencyType}
                open={openFrequencyType}
                onChange={(value) => handleInputChange("frequency", value)}
                placeholder="Select Frequency"
                selectedValue={formData.frequency}
                options={[
                  { label: "Monthly", value: "Monthly" },
                  { label: "Quaterly", value: "Quaterly" },
                  { label: "Half-Yearly", value: "Half-Yearly" },
                  { label: "Yearly", value: "Yearly" },
                ]}
              />
            </div>
            {/* </div> */}
            </div>
            <div className="row">
              <div className="form-group col-3">
              <label htmlFor="radio111">Appetite Type/Tolerance Type/Escalation Type</label>
              <SelectDropDown
                setOpen={setOpenAppetiteType}
                open={openAppetiteType}
                onChange={(value) => handleInputChange("appetiteType", value)}
                placeholder="Select Appetite Type"
                selectedValue={metricValuesType}
                options={[
                  { label: "Number", value: "N" },
                  { label: "Percentage", value: "P" },
                ]}
              />
              {/* <VerticalSpacer size={14} /> */}
              { metricValuesType != ""
              &&
              <div className="btn-group marginleft" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="btnradio" id="btnradio22" autoComplete="off" onClick={(e:any)=>handleType(e,"A")} checked={typeOrder === "A"}/>
                        <label className="btn btn-outline-primary" htmlFor="btnradio22">Ascending</label>

                        <input type="radio" className="btn-check" name="btnradio" id="btnradio23" autoComplete="off" onClick={(e:any)=>handleType(e,"D")} checked={typeOrder === "D"}/>
                        <label className="btn btn-outline-primary" htmlFor="btnradio23">Descending</label>
                    </div>
              }
              </div>
            </div>
          <div className="row">
            {/* <div className="col-12"> */}
            <div className="form-group col-4">
              <label htmlFor="">Appetite Upper Bound</label>
              <input
                type="text"
                className="form-control"
                id=""
                placeholder="Enter Detail"
                name=""
                onChange={(e) => handleInputChange("appetiteUpperBound", e.target.value)}
              />
            </div>

            <div className="form-group col-4">
              <label htmlFor="">Appetite Lower Bound</label>
              <input
                type="text"
                className="form-control"
                id=""
                placeholder="Enter Detail"
                name=""
                onChange={(e) => handleInputChange("appetiteLowerBound", e.target.value)}
              />
            </div>
            {/* <div className="form-group col-4">
              <label htmlFor="">Appetite Type</label>
              <SelectDropDown
                setOpen={setOpenAppetiteType}
                open={openAppetiteType}
                onChange={(value) => handleInputChange("appetiteType", value)}
                placeholder="Select Appetite Type"
                selectedValue={formData.appetiteType}
                options={[
                  { label: "Number", value: "NA" },
                  { label: "Percentage", value: "PD" },
                ]}
              />
            </div> */}
            {/* </div> */}
          </div>
        <div className="row">
          {/* <div className="col-6"> */}
            <div className="form-group col-4">
              <label htmlFor="">Tolerance Upper Bound</label>
              <input
                type="text"
                className="form-control"
                id=""
                placeholder="Enter Detail"
                name=""
                onChange={(e) => handleInputChange("toleranceUpperBound", e.target.value)}
              />
            </div>

            <div className="form-group col-4">
              <label htmlFor="">Tolerance Lower Bound</label>
              <input
                type="text"
                className="form-control"
                id=""
                placeholder="Enter Detail"
                name=""
                onChange={(e) => handleInputChange("toleranceLowerBound", e.target.value)}
              />
            </div>
            {/* <div className="form-group col-4">
              <label htmlFor="">Tolerance Type</label>
              <SelectDropDown
                setOpen={setOpenToleranceType}
                open={openToleranceType}
                onChange={(value) => handleInputChange("toleranceType", value)}
                placeholder="Select Tolerance Type"
                selectedValue={formData.toleranceType}
                options={[
                  { label: "Number", value: "NA" },
                  { label: "Percentage", value: "PD" },
                ]}
              />
            </div> */}
          </div>
            {/* </div> */}
        <div className="row">
          {/* <div className="col-6"> */}

            <div className="form-group  col-4">
              <label htmlFor="">Escalation Upper Bound</label>
              <input
                type="text"
                className="form-control"
                id=""
                placeholder="Enter Detail"
                name=""
                onChange={(e) => handleInputChange("escalationUpperBound", e.target.value)}
              />
            </div>

            <div className="form-group  col-4">
              <label htmlFor="">Escalation Lower Bound</label>
              <input
                type="text"
                className="form-control"
                id=""
                placeholder="Enter Detail"
                name=""
                onChange={(e) => handleInputChange("escalationLowerBound", e.target.value)}
              />
            </div>         
            {/* <div className="form-group  col-4">
              <label htmlFor="">Escalation Type</label>
              <SelectDropDown
                setOpen={setOpenEscalationType}
                open={openEscalationType}
                onChange={(value) => handleInputChange("escalationType", value)}
                placeholder="Select Escalation Type"
                selectedValue={formData.escalationType}
                options={[
                  { label: "Number", value: "NA" },
                  { label: "Percentage", value: "PD" },
                ]}
              />
            </div> */}
          {/* </div> */}
          </div>
          <div className="row">
          <div className="col-auto">
          <Button onClick={handleCreate}>Save</Button>
             {/* bind event to click button and create data to be send */}
          </div>          
          <div className="col-auto">
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
          <div className="col-auto">
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default KriIndicator;
