import { useEffect, useId, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { BackButton, Button, IconButton } from "../../../Components/Buttons";
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
} from "../../../Components/PageShared";
import "../../../Assets/Styles/global.scss";
import { SummaryCard } from "../../../Components/SummaryCard";
import AlertBox from "../../../Components/PageShared/Admin/Alert/alert";
import { size } from "lodash";
import { useAppDispatch, useAppStateSelector } from "../../../Services/Store/hooks";
import { kriDetailsAction } from "../../../Services/Actions/kriAction";
const formValue = {
  category: "",
  toleranceLowerBound: "",
  escalationLowerBound: "",
  frequency: "",
  metric: "",
  currency: "",
  branch: "",
  department: "",
  region: "",
  indicator: "",
  appetiteUpperBound: "",
  toleranceUpperBound: "",
  escalationUpperBound: "",
  appetiteType: "",
  kriStatus:""
}
type MyData = {
  kruStatus: string;
};
interface CreateKriProps {
  open:any,
  setopen:any
  data:any
}
const CreateKri = ( {
  open,
  setopen,
  data
}: CreateKriProps) => {
 const { state } = useLocation();
  const [openCategoryType, setOpenCategoryType] = useState(false);
  const [CategoryType, setCategoryType] = useState("");
  const [openCurrencyType, setOpenCurrencyType] = useState(false);
  const [openBranchType, setOpenBranchType] = useState(false);
  const [openDepartmentType, setOpenDepartmentType] = useState(false);
  const [openRegionType, setOpenRegionType] = useState(false);
  const [openFrequencyType, setOpenFrequencyType] = useState(false);
  const [CurrencyType, setCurrencyType] = useState("");
  const [openAppetiteType, setOpenAppetiteType] = useState(false);
  const [OpenRegion, setOpenRegion] = useState(false);
  const [OpenDepartment, setOpenDepartment] = useState(false);
  const [ifEdit, setIfEdit] = useState(false);
  const [Department, setDepartment] = useState("");
  const [category, setCategory] = useState("");
  const [AppetiteType, setAppetiteType] = useState("");
  const [branch, setBranch] = useState("");
  const [frequency, setFrequency] = useState("");
  const [currency, setCurrency] = useState("");
  const [Region, setRegion] = useState("");
  const [formValues, setFormValues] = useState(formValue);
  const navigate = useNavigate();
  const [openAlertBoxConfirm, setOpenAlertBoxConfirm] = useState(false);
  const [data1, setData] = useState<MyData[]>([]);
  const [_id, setId] = useState("");

  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    _id:"",
    category: "",
    toleranceLowerBound: "",
    escalationLowerBound: "",
    metric: "",
    currency: "",
    branch: "",
    Department: "",
    Region: "",
    frequency: "",
    indicator: "",
    appetiteUpperBound: "",
    toleranceUpperBound: "",
    escalationUpperBound: "",
    appetiteType: "",
    kriStatus:""
  });
  let action :any;
  if(state && state.length > 0){
    action = state[0]?.action;
  }
  const fetchData= async (pageNo:number,isExport: string) =>{
    await dispatch(
      kriDetailsAction( {PageNumber:pageNo,isExport})
      ).then((response:any) => {
        const result= response?.payload?.userData?.data;
         data ={
          _id:"",
          category: "",
          toleranceLowerBound: "",
          escalationLowerBound: "",
          frequency: "",
          metric: "",
          currency: "",
          branch: "",
          Department: "",
          Region: "",
          indicator: "",
          appetiteUpperBound: "",
          toleranceUpperBound: "",
          escalationUpperBound: "",
          appetiteType: "",
          kriStatus:""
       }
        setId(data._id)
       // tableData=data1
        setData(data);
       //  setTotalCount(15);
   });
 }
  useEffect(() => {
    fetchData(1,"false")
  
 
   if(action == 'edit'){
    setIfEdit(true);
    setDepartment(state[1]?.childData?.department);
    setCategory(state[1]?.childData?.category);
    setAppetiteType(state[1]?.childData?.appetiteType);
    setBranch(state[1]?.childData?.branch);
    setFrequency(state[1]?.childData?.frequency);
    setRegion(state[1]?.childData?.region);
    setCurrency(state[1]?.childData?.currency);
    formData.toleranceLowerBound = state[1]?.childData?.toleranceLowerBound
    formData.escalationLowerBound = state[1]?.childData?.escalationLowerBound
    formData.metric = state[1]?.childData?.metric
    formData.indicator = state[1]?.childData?.indicator
    formData.appetiteUpperBound = state[1]?.childData?.appetiteUpperBound
    formData.toleranceUpperBound = state[1]?.childData?.toleranceUpperBound
    formData.escalationUpperBound = state[1]?.childData?.escalationUpperBound
    formData.kriStatus = state[1]?.childData?.kriStatus
    console.log('formData',formData)
  }
  }, []);
  const handleSave = async () => {
    // Convert form data to JSON format
    formData.kriStatus = "Saved"
    formData.category = category;
    formData.currency = currency;
    formData.branch = branch;
    formData.Department = Department;
    formData.Region = Region;
    formData.frequency = frequency;
    formData.appetiteType = AppetiteType;
   

    const jsonData = JSON.stringify(formData);
    console.log("Data saved:", jsonData);
    if(ifEdit){
      formData._id = _id;
    //  await dispatch(
      //  updateKriDataAction( formData)
        //  ).then((response:any) => {
            // const result= response?.payload?.userData?.data;
            console.log("KRI data updated!", formData)
            const url='/kri-page';
            return navigate(`/admin${url}`, {
              state:[{action:'update'},{type:"update"}]
            })
         // })
    } else {
   
       // await dispatch(
          // createKriDataAction( formData)
          //   ).then((response:any) => {
              // const result= response?.payload?.userData?.data;
              console.log("KRI data updated!", formData)
              const url='/kri-page';
              return navigate(`/admin${url}`, {
                state:[{action:'create'},{type:"create"}]
              })
         //   })
        
    }
    // Perform save operation (you can replace this with your actual save logic)
   
    navigateToGrid();
  };


  const handleCreate = () => {
    // Save the form data when "Create" button is clicked
    handleSave(); // You can customize this based on your requirements
  };

  const handleInputChange = (field:any, value:any) => {
    // Update form data when input changes
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  let userState:any = useAppStateSelector((state) => state.authState)
  const navigateToGrid = () => {
    let userRole:string=userState?.userData?.data?.data?.userRole;
        userRole=userRole?.toLocaleLowerCase();
        const url='/kri-page';
        navigate(`/${userRole}${url}`, {
      state:[{action:'cancel'},{type:"cancel"}]
    })
    // setPageNumber(pageNumber);
   };

   const handleRequest = (action:any) => {
    formData.kriStatus = "Submitted"
    formData.category = category;
    formData.currency = currency;
    formData.branch = branch;
    formData.Department = Department;
    formData.Region = Region;
    formData.frequency = frequency;
    formData.appetiteType = AppetiteType;
    setOpenAlertBoxConfirm(true) 
   }

   const mystyle = {
    content: " *",
    color: "red"

  };

  const closeAlert = ( result: string) => {
    console.log('Clicked:', result);
    if(result=="ok") {
      formData.kriStatus = "Submitted";
      const jsonData = JSON.stringify(formData);
      console.log("Data submitted!", jsonData);
    //  console.log('childData',childData);
      navigateToGrid();
      // await dispatch(
      //   updateLossDataAction( newDataUpdate)
      //     ).then((response:any) => {
      //       // const result= response?.payload?.userData?.data;
      //       console.log("Loss data updated!", newDataUpdate)
      //       const url='/rlo-loss-data';
      //       return navigate(`/admin${url}`, {
      //         state:[{action:'update'},{type:"update"}]
      //       })
      // if(screen){
      //   createUser();
      //   console.log('Clicked:', "createUser");
      // }else{
      //   updateUser();
      //   console.log('Clicked:', "update user");
      // } 
    }
    setOpenAlertBoxConfirm(false)
  };
  
  return (
    <>
      <BackButton navigate={navigate}></BackButton>
      <PageHeader title={ifEdit ? 'Edit KRI': 'Create KRI'}></PageHeader>
      <div className="pageCard">
        <div className="pageCardHeader">
          <strong>{ifEdit ? 'Edit KRI': 'Create KRI'}</strong>
          <p>Please fill the data input and ensure the information is correct before submitting. </p>
        </div>
        <div className="row">
          <div className="col-4 form-group">
            <label htmlFor="">KRI Category</label>
            <SelectDropDown
              setOpen={setOpenCategoryType}
              open={openCategoryType}
              onChange={(value) => setCategory(value)}
              placeholder="Select Category"
              selectedValue={category}
              options={[
                { label: "Category 1", value: "category1" },
                { label: "Category 2", value: "category2" },
                { label: "Category 3", value: "category3" },
              ]}
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">Metric Name</label>
            <input
              type="text"
              className="form-control"
              id=""
              placeholder="Enter Detail"
              name=""
              value={formData.metric}
              onChange={(e) => handleInputChange("metric", e.target.value)}
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">Currency</label>
            <SelectDropDown
              setOpen={setOpenCurrencyType}
              open={openCurrencyType}
              onChange={(value) => setCurrency(value)}
              placeholder="Select Currency"
              selectedValue={currency}
              options={[
                { label: "Naira", value: "naira" },
                { label: "Rupee", value: "rupee" },
                { label: "USD", value: "usd" },
              ]}
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">Branch</label>
            <SelectDropDown
              setOpen={setOpenBranchType}
              open={openBranchType}
              onChange={(value) => setBranch(value)}
              placeholder="Select Branch"
              selectedValue={branch}
              options={[
                { label: "Branch 1", value: "branch1" },
                { label: "Branch 2", value: "branch2" },
                { label: "Branch 3", value: "branch3" },
              ]}
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">Department</label>
            <SelectDropDown
              setOpen={setOpenDepartment}
              open={OpenDepartment}
              onChange={(value) => setDepartment(value)}
              placeholder="Select Department"
              selectedValue={Department}
              options={[
              { label: "Investment banking", value: "investment-banking" },
              { label: "Operations management", value: "operations-management" },
              { label: "Fintech", value: "fintech" },
              ]}
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">Region</label>
            <SelectDropDown
              setOpen={setOpenRegion}
              open={OpenRegion}
              onChange={(value) => setRegion(value)}
              placeholder="Select Region"
              selectedValue={Region}
              options={[
              { label: "Akwa Ibom", value: "akwa-Ibom" },
              { label: "Anambra", value: "anambra" },
              { label: "Bauchi", value: "bauchi" },
              ]}
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">Frequency</label>
            <SelectDropDown
              setOpen={setOpenFrequencyType}
              open={openFrequencyType}
              onChange={(value) => setFrequency(value)}
              placeholder="Select Frequency"
              selectedValue={frequency}
              options={[
                { label: "Frequency 1", value: "Frequency1" },
                { label: "Frequency 2", value: "Frequency2" },
                { label: "Frequency 3", value: "Frequency3" },
              ]}
            />
          </div>
            {/* <div className="col-4 form-group">
              <label htmlFor="">Category</label>
              <SelectDropDown
                setOpen={setOpenCategoryType}
                open={openCategoryType}
                onChange={(value) => handleInputChange("category", value)}
                placeholder="Select Category"
                selectedValue={formData.category}
                options={[
                  { label: "Category 1", value: "category1" },
                  { label: "Category 2", value: "category2" },
                  { label: "Category 3", value: "category3" },
                ]}
              />
            </div> */}
            {/* <div className="col-4 form-group">
              <label htmlFor="">Text Field</label>
              <input
                type="text"
                className="form-control"
                id=""
                placeholder="Enter Detail"
                name=""
                onChange={(e) => handleInputChange("textField", e.target.value)}
              />
            </div> */}
            <div className="col-4 form-group">
              <label htmlFor="" >Tolerance Lower Bound <span style={mystyle} >*</span></label>
              <input
                type="text"
                className="form-control"
                id=""
                placeholder="Enter Detail"
                name=""
                value={formData.toleranceLowerBound}
                onChange={(e) => handleInputChange("toleranceLowerBound", e.target.value)}
                required
              />
            </div>
            <div className="col-4 form-group">
              <label htmlFor="">Escalation Lower Bound</label>
              <input
                type="text"
                className="form-control"
                id=""
                placeholder="Enter Detail"
                name=""
                value={formData.escalationLowerBound}
                onChange={(e) => handleInputChange("escalationLowerBound", e.target.value)}
              />
            </div>
            <div className="col-4 form-group">
              <label htmlFor="" >Indicator <span style={mystyle} >*</span></label>
              <input
                type="text"
                className="form-control required"
                id=""
                placeholder="Enter Detail"
                name=""
                value={formData.indicator}
                onChange={(e) => handleInputChange("indicator", e.target.value)}
                required
              />
            </div>
            <div className="col-4 form-group">
              <label htmlFor="">Appetite Upper Bound</label>
              <input
                type="text"
                className="form-control"
                id=""
                placeholder="Enter Detail"
                name=""
                value={formData.appetiteUpperBound}
                onChange={(e) => handleInputChange("appetiteUpperBound", e.target.value)}
              />
            </div>
            <div className="col-4 form-group">
              <label htmlFor="">Tolerance Upper Bound</label>
              <input
                type="text"
                className="form-control"
                id=""
                placeholder="Enter Detail"
                name=""
                value={formData.toleranceUpperBound}
                onChange={(e) => handleInputChange("toleranceUpperBound", e.target.value)}
              />
            </div>
            <div className="col-4 form-group">
              <label htmlFor="">Escalation Upper Bound</label>
              <input
                type="text"
                className="form-control"
                id=""
                placeholder="Enter Detail"
                name=""
                value={formData.escalationUpperBound}
                onChange={(e) => handleInputChange("escalationUpperBound", e.target.value)}
              />
            </div>
            <div className="col-4 form-group">
              <label htmlFor="">Appetite Type</label>
              <SelectDropDown
                setOpen={setOpenAppetiteType}
                open={openAppetiteType}
                onChange={(value) => setAppetiteType(value)}
                placeholder="Select Appetite Type"
                selectedValue={AppetiteType}
                options={[
                  { label: "Appetite Type 1", value: "appetiteType1" },
                  { label: "Appetite Type 2", value: "appetiteType2" },
                  { label: "Appetite Type 3", value: "appetiteType3" },
                ]}
              />
            </div>
         <div className="row mt-2">
          <div className="col-auto">
          <Button onClick={handleCreate} disabled={formData.indicator =='' || formData.toleranceLowerBound ==''}>Save</Button>
             {/* bind event to click button and create data to be send */}
          </div>          
          <div className="col-auto">
            <Button onClick={() => handleRequest('Approve')} disabled={(formData?.kriStatus == "Submitted") || formData.indicator =='' || formData.toleranceLowerBound ==''}
            >Submit
            {openAlertBoxConfirm && <AlertBox open={openAlertBoxConfirm} setopen={setOpenAlertBoxConfirm} data={formData} title="Alert" message="Are You Sure You Wanted To Submit ?" btn1="OK" btn2="CLOSE" onClose={closeAlert}/>}

            </Button>
          </div>
          <div className="col-auto">
            <Button onClick={() => navigateToGrid()} >Cancel</Button>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateKri;
