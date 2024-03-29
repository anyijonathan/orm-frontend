import { useEffect, useState } from "react";
import { useId } from 'react';
import { Modal, ModalBody, ModalHeader } from "../../../Components/Modal";
import { VerticalSpacer } from "../../../Components/PageShared";
import { ModalItemsContainer } from "../../../Components/Modal/itemCard";
import { Dropdown, DropdownContentContaner, SelectDropDown } from "../../../Components/DropDown";
import { DateRangePicker } from "../../../Components/DatePicker/rangePicker";
import { Button, IconButton } from "../../../Components/Buttons";
import { CalendarIcon } from "../../../Components/Icons";
import { useAppDispatch, useAppStateSelector } from "../../../Services/Store/hooks";
import { UpdateUserAction, createUserAction, getUserAdDetailsAction, roleDetailsAction, userDetailsAction } from "../../../Services/Actions/userAction";
import { add } from "lodash";
import AlertBox from "../../../Components/PageShared/Admin/Alert/alert";
import { string } from "yup";
import { MultiSelect } from "react-multi-select-component";
import { Radio } from "../../../Components/Radio";
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
interface CreateUserProps {
  open:any,
  setopen:any,
  data:any,
  onSave: () => void;
  title:any
  msg:any
  roles:any,
  branches:any,
  departments:any
}
type Mydata = {
  email: string,
  staffID: string,
  userName: string,
  status: string,
  userGroup:string
  department: string,
  userRole:string,
  UserRoleId:number,
  branch:string,
  region:string,
}
const CreateNewUser = ({ open, setopen, data, onSave,title,msg,roles,branches,departments}:CreateUserProps) => {
 const [adData, setAdData] = useState<Mydata>();
 const [openIsActive, setOpenIsActive] = useState(false);
 const [showDetails, setShowDetails] = useState(false);
 const [email, setEmail] = useState('');
 const [editMode, setEditMode] = useState(false);
 const [openAlertBox, setOpenAlertBox] = useState(false);
 const [openAssignedRole, setOpenAssignedRole] = useState(false);
 const [StatusType, setStatusType] = useState("");
 const [assignedRole, setAssignedRole] = useState<any>();
 const dispatch = useAppDispatch();
 const [isLoading, setIsLoading] = useState(false);
 const [selectedDepartment, setSelectedDepartment] = useState<any[]>([]);
 const [selectedBranch, setSelectedBranch] = useState<any[]>([]);
  const [locationType,setLocationType]=useState("");
// on create user- get the user details from AD
const fetchdata = async() => {
  setIsLoading(true);
  await dispatch(
    userDetailsAction( {Role:"", name:data, status:"",pageNo:1,isExport: ""})
    ).then((response:any) => {
      const data1= response?.payload?.userData?.data;
      setStatusType(data1?.data[0]?.status?.toString());
      setAssignedRole(data1?.data[0]?.userRole?.toString());
      setAdData(data1.data[0]);     
      setIsLoading(false);
  });
  }

useEffect(() => {
  if(title?.includes("Edit")){
    setEmail(data?.UserName?.toString())
    setAdData(data);
  let savedBranch = branches.filter((branchx:any) => data?.branch?.includes(branchx.label));
  let savedDept = departments.filter((dept:any) => data?.department?.includes(dept.label));
  let savedRole = roles.filter((currRole:any) => data?.userRole?.includes(currRole.label));

    setSelectedBranch(savedBranch);
    setSelectedDepartment(savedDept);
    setLocationType("B")
    if(savedBranch.length>0){
    setLocationType("B")
    }else{
    setLocationType("D")
    }
    setEditMode(true);
    setShowDetails(true);
    setStatusType(data?.status?.toString());
    setAssignedRole(data?.userRoleId);
  }
}, []);

  const getUserAdDetails=  async(e:any) =>{
    e.preventDefault();
    await dispatch(
      getUserAdDetailsAction( {email:email})
      ).then((response:any) => {
        const result= response?.payload?.requestData?.data;
        if(result.code==="00"){
        setAdData(result?.data[0]);
      }else{
        alert("user not found in AD!");
      }
    });
  }

 const updateUser = async() => {

  let locationIds:number[]= []
  if(selectedBranch.length>0){
    locationIds=selectedBranch.map(branch => Number(branch.value));
  } else{
    locationIds= selectedDepartment.map(dept => Number(dept.value));;
  }

    let id= data?.userId;
    let roleId:number = assignedRole;
    let status= StatusType
    let staffId=""
  await dispatch(
    UpdateUserAction({
        id,locationIds,roleId,status     
      } )
      ).then((response:any) => {
        const result= response?.payload?.requestData?.data?.data;
        onSave();     
      })
      setopen(false); 
 }

 const createUser = async() => {
  let locationIds:number[]= []
  if(selectedBranch.length>0){
    locationIds=selectedBranch.map(branch => Number(branch.value));
  } else{
    locationIds= selectedDepartment.map(dept => Number(dept.value));;
  }
    let userName= adData && adData.userName ? adData.userName : "";
    let email = adData && adData.userName ? adData.userName : "";
    let roleId:number = assignedRole;
    let status= StatusType
    let staffId=""
  await dispatch(
      createUserAction({
        email,userName,locationIds,staffId,roleId,status     
      } )
      ).then((response:any) => {
        const result= response?.payload?.requestData?.data?.data;
        onSave();     
      })
      setopen(false); 
 }

 const handleInputChange = (e:any) => {
  setEmail(e.target.value);
 }

 const closeAlert = ( result: string) => {
  console.log('Clicked:', result);
  if(result==="ok") {
    if(title.includes("New")){
      createUser();
      console.log('Clicked:', "createUser");
    }else{
      updateUser();
      console.log('Clicked:', "update user");
    } 
  }
  // setOpenAlertBox(true);

};

const CreateUserFromAD=(event:any)=>{
  event.preventDefault();
  setOpenAlertBox(true);

}

 const UpdateRole =(value:any) => {
  setAssignedRole( value);
  if(StatusType !== "" ){
    setShowDetails(true);
  }else{
    setShowDetails(false);
  }
 }

 const UpdateStatus =(value:any) => {
  setStatusType( value);
  if(assignedRole !== ""){
    setShowDetails(true);
  }else{
    setShowDetails(false);
  }
 }

 const optionsBranch = [
  { label: "Lagos Head Office", value: "Lagos Head Office" },
  { label: "Lagos Adeniran Ogunsanya", value: "Lagos Adeniran Ogunsanya" },
  { label: "Enugu Agbani Town", value: "Enugu Agbani Town" },
  { label: "Lagos Rccg", value: "Lagos Rccg" },
  { label: "Abia Aba Road", value: "Abia Aba Road" },
  { label: "Gombe Ashaka", value: "Gombe Ashaka", disabled: true },
];

const optionsDepartment = [
  { label: "Loan Workout and Recovery, Lagos", value: "Loan Workout and Recovery, Lagos" },
  { label: "Loan Workout and Recovery Abuja & North", value: "Loan Workout and Recovery Abuja & North" },
  { label: "Loan Workout and Recovery, South West", value: "Loan Workout and Recovery, South West" },
  { label: "Loan Workout and Recovery, SS & SE", value: "Loan Workout and Recovery, SS & SE" },
  { label: "Agric Business & STCF", value: "Agric Business & STCF" },
  { label: "Non-Oil Export", value: "Non-Oil Export", disabled: true },
];

  return (
  <>
    {!isLoading &&     
      <Modal show={open} width="60%" height="100%" onClose={() => {setopen(false)}}>
        <ModalBody>
          <ModalHeader
            title={title}
            subtitle=""
            onClose={() => setopen(false)}
          />
          <form>
            <VerticalSpacer size={14} />
            <ModalItemsContainer>
                <div className="row">
                { !editMode && <>
                 <div className="col-4">
                    <div className="form-group">
                    <label htmlFor="">User Name</label>
                    <div className="input-group flex-nowrap">
                      <input type="text" className="form-control"  placeholder="Enter User Name" name="" 
                      value={email} 
                      onChange={(e) => handleInputChange(e)} required
                      />
                      <span className="input-group-text" id="addon-wrapping" style={{border: "none"}}>
                      {adData?.userName ? (
                      <span> 
                      <span className="authCheck">
                        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.3333 1L5 8.33333L1.66667 5" stroke="#12B76A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      </span> // Confirmation icon

                      ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 6L6 10M6 6L10 10M14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg> // Cross icon

                      )}
                      </span>
                    </div>
                    </div>
                  </div> 
                  <div className="col-2 align-self-center">
                    <Button variant="contained" onClick={getUserAdDetails}
                    disabled={email===""}>Get User</Button>
                    
                  </div>
                  </>}
                </div>
          <div>
          {adData?.userName &&
          <div className="row">
            <div className="col-6">
            {(selectedBranch?.length > 0 || selectedDepartment?.length > 0) &&
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                        <label htmlFor="">Status</label>
                        <SelectDropDown
                        setOpen={setOpenIsActive}
                        open={openIsActive}
                        onChange={(value) => UpdateStatus(value)}
                        placeholder="Select Status"
                        selectedValue={StatusType}
                        options={[
                        { label: "Active", value: "Active" },
                        { label: "Inactive", value: "Inactive" },
                        ]}
                        />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                        <label htmlFor="">Assign Role</label>
                        <SelectDropDown
                        setOpen={setOpenAssignedRole}
                        open={openAssignedRole}
                        onChange={(value) => UpdateRole(value)}
                        placeholder="Select Role"
                        selectedValue={assignedRole}
                        options={roles}
                        />
                        </div>
                    </div>
                    <div className="col-12">
                    {selectedDepartment.length>0 && <label htmlFor="">Assigned Department</label>}
              <div  className="badgeUserMng">
                {selectedDepartment.length>0 && selectedDepartment?.map((item, index) => (
                  <span className="badge"><div className="Submitted" key={index}>{item?.label}</div></span>
                ))}
              </div>
                    </div>
                </div>
              }
            </div>
            <div className="col-6">
            <div className="row">
                <label htmlFor="loc" className="col-12">Select User Type</label>
                <div className="col-12">
                  <div className="radioInline">
                  <Radio label="Branch User" value="B" checked={locationType === 'B'} onChange={(e:any) => setLocationType(e.target.value)} 
                  disabled={title.includes("Edit")}
                  />
                  <Radio label="Department User" value="D" checked={locationType === 'D'} onChange={(e:any) => setLocationType(e.target.value)} 
                  disabled={title.includes("Edit")}
                  />
                  </div>
                </div>                  
            </div>
              { locationType !== "" && 
              <>
              { locationType === "D" && 
                <>
              
              
                    <div className="col-12">
                    <div className="form-group">
                        <label htmlFor="">Assign Department</label>
                    <MultiSelect
                      options={departments}
                      value={selectedDepartment}
                      onChange={setSelectedDepartment}
                      labelledBy="Select Department..."
                    />
                    </div>
                    </div>
                    
                </>
              }
                  { locationType === "B" &&
                  <>
                    
                    <div className="col-4">
                    <div className="form-group">
                        <label htmlFor="">Assign Branch</label>
                    <MultiSelect
                      options={branches}
                      value={selectedBranch}
                      onChange={setSelectedBranch}
                      labelledBy="Select Branch..."
                    />
                    </div>
                    </div>
                    {selectedBranch.length>0 && <label htmlFor="">Assigned Branch</label>}
                      <div className="badgeUserMng">
                        {selectedBranch.length>0 && selectedBranch?.map((item, index) => (
                          <span className="badge"><div className="Submitted" key={index}>{item?.label}</div></span>
                        ))}
                      </div>
                  </>
                  }
              </>
              }
            </div>
            
            </div>
            }
          </div>
            </ModalItemsContainer>
            <div className="modal-footer">
              <div className="row mt-2">
                <div className="col-auto">
                { title.includes("New") && <Button variant="contained" onClick={CreateUserFromAD} disabled={!showDetails}>Create</Button>}
                
                { title.includes("Edit")  && <Button variant="contained"  onClick={(event)=> {event?.preventDefault(), setOpenAlertBox(true)} }>Save</Button>}
              
                {openAlertBox && <AlertBox open={openAlertBox} setopen={setOpenAlertBox} data={"msg"} title="Confirmation" message={msg} btn1="OK" btn2="Cancel" onClose={closeAlert}/>}
                
                </div>
                <div className="col-auto">
                  <Button variant="outlined" color="neutral" onClick={() => setopen(false)}>Cancel</Button>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
    </Modal>   
    }   
  </>

  );
};

export default CreateNewUser;