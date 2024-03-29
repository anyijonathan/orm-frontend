import { DataTable } from "../../../Components/Table";
import { TableBoldData, TableLightData } from "../../../Components/PageShared";
import { IconButton } from "../../../Components/Buttons";
import { EditPenOnly, EyeOpenIcon, Lock } from "../../../Components/Icons";
import { useEffect, useState } from "react";
import CreateNewUser from "./createNewUser";
import ViewUserDetail from "./viewUserDetail";
import AlertBox from "../../../Components/PageShared/Admin/Alert/alert";
import { UpdateUserAction, roleDetailsAction, userDetailsAction } from "../../../Services/Actions/userAction";
import { useAppDispatch, useAppStateSelector } from "../../../Services/Store/hooks";
import { getBranchGridDataAction, getDepartmentGridDataAction } from "../../../Services/Actions/locationAction";
interface UserTableProps{
  props:any,
  request:any,
  totalCount:number
  onChangePage: (page: number) => void;
  paginator:boolean
}

const headers = [
  {

    title: "User Name",

  },
  {

    title: "User Role",

  },
  {

    title: "Department",

  },
  {

    title: "Branch",

  },
  {

    title: "Last Login Time",

  },
 
  {

    title: "Status",

  },
  {

    title: "Actions",

  }
  
];
type MyData = {
  UserName: string,
  Department: string,
  Branch: string,
  UserRole: string,
  DateOfCreation: string,
  LockStatus:string,
  Status: string
};

const TableUserManagement = ({
  props,
  request,
  totalCount,
  onChangePage,
  paginator,
}: UserTableProps) => {
  let data:any[] = [];

  const [array, setArray] = useState<any>(null);  
  const [openAlertBoxLock, setOpenAlertBoxLock] = useState(false);
  const [openAlertBoxStatus, setOpenAlertBoxStatus] = useState(false);
  const [openViewUserDetail, setOpenViewUserDetail] = useState(false);
  const [openCreateNewUser, setOpenCreateNewUser] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);  
  const dispatch = useAppDispatch();  
  const authState:any = useAppStateSelector((state) => state.authState)
  // const userState:any = useAppStateSelector((state) => state.userState)

  useEffect(() => {
    // if(userState?.userData?.data?.data != props){
    // setArray(userState?.userData?.data?.data);   
    // }else{
      setArray(props);  
    // }  
  }, [props]);
  const handleViewClick = (iterator:any) =>{
    setOpenViewUserDetail(true);
    setSelectedRowData(iterator);
  }
  const handleEditClick = async (iterator:any) =>{
    await fetchRole();
    await fetchBranchLocation();
  await fetchDepartmentLocation();
    setOpenCreateNewUser(true);
    setSelectedRowData(iterator);
  }

  const handleSwitchChange = (iterator: any) => {
    // const newStatus = iterator.Status === 'Active' ? 'Inactive' : 'Active';
    setOpenAlertBoxStatus(true);
    setSelectedRowData(iterator);
  };

  const handleLockChange = (iterator: any) => {    
    // const newLockStatus = iterator.Status === 'Locked' ? 'Active' : 'Locked';
    setOpenAlertBoxLock(true);
    setSelectedRowData(iterator);
  };
  const closeAlert = (result: string) => {
    if (result === "ok") {
      const newStatus = selectedRowData.status === 'Active' ? 'Inactive' : 'Active';  
        updateUser(newStatus);   
        console.log("Succesful status update dispatch call");
          setOpenAlertBoxStatus(false);
          setOpenCreateNewUser(false);
          handleCreateNewUserSave();
    }
    else {
      console.log("Cancelled status update dispatch call");
    }
  };
  
  const updateUser = async(newStatus:string) => {
    await dispatch(
      UpdateUserAction({
          id:selectedRowData?.userId,locationIds:[],roleId:0,status:newStatus     
        } )
        ).then((response:any) => {
          const result= response?.payload?.requestData?.data;
          handleCreateNewUserSave();
        })
   }
  const closeLockAlert = (result: string) => {
    if (result === "ok") {
      const newStatus = "Active";
      updateUser(newStatus);    
      console.log("Successful Lock status update dispatch call");
    } else {
      console.log("Cancelled Lock status update dispatch call");
    }

    // Close the lock alert box
    setOpenAlertBoxLock(false);
  };
  const handleCreateNewUserSave = () =>{
    fetchData("","","",1,"");
  }
  const fetchData= async (role:string, name:string, status:string,pageNo:number,isExport: string) =>{
    await dispatch(
      userDetailsAction( {Role:role, name:name, status:status,pageNo:pageNo,isExport: isExport})
      ).then((response:any) => {
        const data1= response?.payload?.userData?.data;
        setArray(data1?.data);
    });
  }

  const [roles, setRoles] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  
  const fetchRole=async()=>{
    await dispatch(
      roleDetailsAction( {roleTitle:"", status:true, PageNumber:1,isExport:""})           //todo- for user mang - pageno. free api
      ).then((response:any) => {
        const result= response?.payload?.requestData?.data;
        console.log(result);
        const dropdownOptions = result.data.map((item:any) => ({
          label: item.roleTitle,
          value: item.roleId
        }));
        setRoles(dropdownOptions)
  }); 
  }
  const fetchBranchLocation=async()=>{
    await dispatch(
      getBranchGridDataAction( {Title:"", status:"Active", PageNumber:1,isExport:true})          //todo- for user mang - pageno. free api
      ).then((response:any) => {
        const result= response?.payload?.requestData?.data;
        const dropdownOptions = result.data.map((item:any) => ({
          label: item.branch,
          value: item.id
        }));
        setBranches(dropdownOptions)
  }); 
  }
  const fetchDepartmentLocation=async()=>{
    await dispatch(
      getDepartmentGridDataAction( {Title:"", status:"Active", PageNumber:1,isExport:true})          //todo- for user mang - pageno. free api
      ).then((response:any) => {
        const result= response?.payload?.requestData?.data;
        const dropdownOptions = result.data.map((item:any) => ({
          label: item.department,
          value: item.id
        }));
        setDepartments(dropdownOptions)
  }); 
  }

  if(array){
    let item:any;
    for(let iterator of array){
      item = [
        {
          title: <TableBoldData title={iterator?.userName?.toString()} />,
        },
        {
          title: <TableBoldData title={iterator?.userRole?.toString()} />,
        },
        {
          title: <span style={{ wordWrap: "break-word", wordBreak: "break-all" }}><TableBoldData title={iterator?.department?.toString()} /></span>,
        },
        {
          title: <span style={{ wordWrap: "break-word", wordBreak: "break-all" }}><TableBoldData title={iterator?.branch?.toString()} /></span>,
        },        
        {
          title: 
          <>
          <TableBoldData title={iterator?.lastLoginTime?.toString().substring(0,10)} />
          <TableLightData title={iterator?.lastLoginTime?.toString().substring(11,19)}/>
         </>
        },
       
        {
          title: <TableBoldData title={iterator?.status?.toString()} />,
        },
        {
          title: (
            <div style={{ display: "flex" }}>
              <IconButton
                color="neutral"
                icon={<EyeOpenIcon />}
                onClick={() => handleViewClick(iterator)}
                style={{ padding: "0", width: "auto", border: "none", marginRight: "10px" }}
              />
              {openViewUserDetail && (
                <ViewUserDetail 
                open={openViewUserDetail} 
                setopen={setOpenViewUserDetail}
                 data={selectedRowData} />
              )}
              <IconButton
                color="neutral"
                icon={<EditPenOnly />}
                onClick={() => { handleEditClick(iterator)}}
                style={{ padding: "0", width: "auto", border: "none", marginRight: "10px" }}
              />
              {openCreateNewUser && 
              (<CreateNewUser 
                open={openCreateNewUser} 
                setopen={setOpenCreateNewUser} 
                data={selectedRowData}
                onSave={handleCreateNewUserSave}
                title="Edit User"
                msg="Do you want to update user?"
                roles={roles}                          
                branches={branches}
                departments={departments}
                />
              )}
              {/* // open={openCreateNewUser} setopen={setOpenCreateNewUser} data={iterator.UserName?.toString()} />} */}
              {iterator.status === "Locked" && (
                  <IconButton
                  color="neutral"
                  icon={<Lock />}
                  onClick={() => handleLockChange(iterator)}
                  style={{ padding: "0", width: "auto", border: "none", marginRight: "10px" }}
                />
              )}
              {openAlertBoxLock && (
                <AlertBox
                  open={openAlertBoxLock}
                  setopen={setOpenAlertBoxLock}
                  data="msg"
                  title="Lock/Unlock User"
                  message="Do You Want To Change Lock Status Of User?"
                  btn1="Approve"
                  btn2="Reject"
                  onClose={closeLockAlert}
                />
              )}
              <div className="form-check form-switch">  
              <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  checked={iterator.status === "Active"}
                  onChange={() => handleSwitchChange(iterator)}
                  disabled={authState?.userData?.data?.data?.email === iterator.emailId}
                /> </div>             
                      {openAlertBoxStatus && (
                <AlertBox
                  open={openAlertBoxStatus}
                  setopen={setOpenAlertBoxStatus}
                  data="msg"
                  title="Change User Status"
                  message="Do You Want To Change Status Of User?"
                  btn1="Ok"
                  btn2="Cancel"
                  onClose={closeAlert}
                />
              )}            
                    </div>
                  ),
                },
              ];

              data.push(item);
    }
            // ))
  }


  return <DataTable 
  headers={headers} 
  data={[...data]} 
  totalCount={totalCount} 
  onChangePage={onChangePage} 
  paginator={paginator} />;
};

export default TableUserManagement;
