import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "../../../Components/Modal";
import { VerticalSpacer } from "../../../Components/PageShared";
import { ModalItemsContainer } from "../../../Components/Modal/itemCard";
import { Button, IconButton } from "../../../Components/Buttons";
import { useAppDispatch, useAppStateSelector } from "../../../Services/Store/hooks";
import AlertBox from "../../../Components/PageShared/Admin/Alert/alert";
import { MultiSelect } from "react-multi-select-component";
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
interface CreateProps {
  open:any,
  setopen:any,
  data:any,
  onSave: () => void;
  title:any
  msg:any
  roles:any
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
const UpdateLocation = ({ open, setopen, data, onSave,title,msg}:CreateProps) => {
 const [openAlertBox, setOpenAlertBox] = useState(false);
 const dispatch = useAppDispatch();
 const [isLoading, setIsLoading] = useState(false);
 const [selectedDepartment, setSelectedDepartment] = useState([]);
 const [selectedBranch, setSelectedBranch] = useState([]);



const fetchdata = async() => {
  setIsLoading(true);
//   await dispatch(
//     userDetailsAction( {Role:"", name:data, status:"",pageNo:1,isExport: ""})
//     ).then((response:any) => {
//       const data1= response?.payload?.userData?.data;
//       setInputData(data1?.data[0]);
//       setStatusType(data1?.data[0]?.status?.toString());
//       setAssignedRole(data1?.data[0]?.userRole?.toString());
//       setAdData(data1.data[0]);     
//       setIsLoading(false);
//   });
  }

useEffect(() => {
    
}, []);


 const updateUser = async() => {
//   await dispatch(
//     UpdateUserAction({email:data?.userName,userName:data?.userName,SolId:"",Branch:"",Region:"",Group:"",staffId:"",Department:"",status:StatusType,RoleTitle:AssignedRole})
//       ).then((response:any) => {
//          const result= response?.payload?.userData?.data;
//          onSave();
//       })
//       console.log("user updated!", updateUser)
      setopen(false)
 }

 const closeAlert = ( result: string) => {
  console.log('Clicked:', result);
  if(result==="ok") {
      updateUser();
      console.log('Clicked:', "update user");
    } 
};


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
      <Modal show={open} width="60%" height="100%" onClose={() => setopen(false)}>
        <ModalBody>
          <ModalHeader
            title={title}
            subtitle=""
            onClose={() => setopen(false)}
          />
          <form>
            <VerticalSpacer size={14} />
            <ModalItemsContainer>
        <div>
            
                <div className="row">
                    <div className="col-4">
                    <div className="form-group">
                        <label htmlFor="">Assign Department</label>
                    <MultiSelect
                      options={optionsDepartment}
                      value={selectedDepartment}
                      onChange={setSelectedDepartment}
                      labelledBy="Select"
                    />
                    </div>
                    </div>
                    <div className="col-4">
                    <div className="form-group">
                        <label htmlFor="">Assign Branch</label>
                    <MultiSelect
                      options={optionsBranch}
                      value={selectedBranch}
                      onChange={setSelectedBranch}
                      labelledBy="Select"
                    />
                    </div>
                    </div>
                </div>
                
                </div>
            </ModalItemsContainer>
            <div className="modal-footer">
              <div className="row mt-2">
                <div className="col-auto">
                
                 <Button variant="contained"  onClick={(event)=> {event?.preventDefault(), setOpenAlertBox(true)} }>Save</Button>
              
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

export default UpdateLocation;