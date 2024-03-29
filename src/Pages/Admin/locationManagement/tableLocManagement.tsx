import { DataTable } from "../../../Components/Table";
import { TableBoldData, TableLightData } from "../../../Components/PageShared";
import { IconButton } from "../../../Components/Buttons";
import { EditPenOnly, EyeOpenIcon, Lock } from "../../../Components/Icons";
import { useEffect, useState } from "react";
import AlertBox from "../../../Components/PageShared/Admin/Alert/alert";
import { UpdateUserAction, roleDetailsAction, userDetailsAction } from "../../../Services/Actions/userAction";
import { useAppDispatch, useAppStateSelector } from "../../../Services/Store/hooks";
import UpdateLocation from "./updateLocation";
import CreateBranch from "./createBranch";
import { id } from "date-fns/locale";
import { EditBranchAction, EditDepartmentAction } from "../../../Services/Actions/locationAction";
import CreateDepartment from "./CreateDepartment";
interface TableProps{
  props:any,
  request:any,
  totalCount:number
  onChangePage: (page: number) => void;
  paginator:boolean
}

const headersBranch = [
  {

    title: "Branch Title",

  },
  {

    title: "Region",

  },
  {

    title: "Sol ID",

  },
  {

    title: "Location Id",

  },
 
  {

    title: "Status",

  },
  {

    title: "Actions",

  }
  
];

const headersDepartment = [
  {

    title: "Department",

  },
  {

    title: "Location Id",

  }, 
  {

    title: "Status",

  },
  {

    title: "Actions",

  }
  
];


const TableLocManagement = ({
  props,
  request,
  totalCount,
  onChangePage,
  paginator,
}: TableProps) => {
  let data:any[] = [];

  const [branchData, setBranchData] = useState<any>(null);  
  const [departmentData, setDepartmentData] = useState<any>(null);  
  const [openAlertBoxLock, setOpenAlertBoxLock] = useState(false);
  const [openAlertBoxStatus, setOpenAlertBoxStatus] = useState(false);
  const [openViewUserDetail, setOpenViewUserDetail] = useState(false);
  const [openEditBranch, setOpenEditBranch] = useState(false);
  const [openEditDepartment, setOpenEditDepartment] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);  
  const [header,setHeader]=useState<any[]>([])
  const dispatch = useAppDispatch();  
  const authState:any = useAppStateSelector((state) => state.authState)
  // const userState:any = useAppStateSelector((state) => state.userState)

  useEffect(() => {
      if(request==="Branch"){
        setBranchData(props); 
        setDepartmentData(null);
        setHeader(headersBranch); 
      }else{
        setDepartmentData(props);
        setBranchData(null);
        setHeader(headersDepartment);
      }  
  }, [props]);

  const handleEditBranchClick = async (iterator:any) =>{
    setOpenEditBranch(true);
    setSelectedRowData(iterator);
  }

  const handleEditDepartmentClick = async (iterator:any) =>{
    setOpenEditDepartment(true);
    setSelectedRowData(iterator);
  }

  const handleSwitchChange = (iterator: any) => {
    // const newStatus = iterator.Status === 'Active' ? 'Inactive' : 'Active';
    setOpenAlertBoxStatus(true);
    setSelectedRowData(iterator);
  };

  const closeAlert = (result: string) => {
    if (result === "ok") {
      
    }
    else {
      console.log("Cancelled status update dispatch call");
    }
  };
  

  const fetchData= async (role:string, name:string, status:string,pageNo:number,isExport: string) =>{
    await dispatch(
      userDetailsAction( {Role:role, name:name, status:status,pageNo:pageNo,isExport: isExport})
      ).then((response:any) => {
        const data1= response?.payload?.userData?.data;
        setBranchData(data1?.data);
    });
  }

  const [branchTitle, setBranchTitle] = useState("");
  const [departmentTitle, setDepartmentTitle] = useState("");
  const [createdById, setCreatedById] = useState<number>();
  const [status, setStatus] = useState("");
  const [solId, setSolId] = useState("");
  const [id, setId] = useState(0);
  const [region, setRegion] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertCon, setAlertCon] = useState(false);
  const [alertD, setAlertD] = useState(false);
  const [alertConD, setAlertConD] = useState(false);

  const EditBranch = async(
    branchTitle: string,
    createdById:number,
    solId:string,
    region:string,
    status:string,
    id:number
    ) =>{
        setBranchTitle(branchTitle);
        setCreatedById(createdById);
        setStatus(status);
        setRegion(region);
        setId(id);
        setAlert(true);
}
const EditBranchOK= async (res:string)=>{
    setAlert(false);
    if(res==="ok"){
    await dispatch(EditBranchAction({
      id: id,
      status: status,
      branch: branchTitle,
      region: region,
      modifiedById: authState?.userData?.data?.data?.userId
          })).then((res:any) =>{
            var result= res?.payload?.requestData?.data;
            if(result) {
                setAlertCon(true);
            }
          });
    }
}
const EditBranchCon = (item:string)=>{
  onChangePage(1);
  // if(item)
  // fetchData(pageNumber,false,location,titleQuery,roleStatusQueryText);
}

const EditDepartment = async(
  departmentTitle: string,
  status:string,
  id:number
  ) =>{
      setDepartmentTitle(departmentTitle);
      setStatus(status);
      setId(id);
      setAlertD(true);
}
const EditDepartmentOK= async (res:string)=>{
  setAlertD(false);
  if(res==="ok"){
  await dispatch(EditDepartmentAction({
    id: id,
    status: status,
    department: departmentTitle,
    modifiedById: authState?.userData?.data?.data?.userId
        })).then((res:any) =>{
          const result= res?.payload?.requestData?.data;
          if(result) {
              setAlertConD(true);
          }
        });
  }
}

  if(branchData){
    let item:any;
    for(let iterator of branchData){
      item = [
        {
          title: <TableBoldData title={iterator?.branch?.toString()} />,
        },
        {
          title: <TableBoldData title={iterator?.region?.toString()} />,
        },
        {
          title: <TableBoldData title={iterator?.solId?.toString()} />,
        },        
        {
          title: <TableBoldData title={iterator?.locationId?.toString()} />,          
        },
       
        {
          title: <TableBoldData title={iterator?.status?.toString()} />,
        },
        {
          title: (
            <div style={{ display: "flex" }}>
              <IconButton
                color="neutral"
                icon={<EditPenOnly />}
                onClick={() => { handleEditBranchClick(iterator)}}
                style={{ padding: "0", width: "auto", border: "none", marginRight: "10px" }}
              />
      
              
              {/* <div className="form-check form-switch">  
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
                  title="Change Location Status"
                  message="Do You Want To Change Status of Branch/Department?"
                  btn1="Ok"
                  btn2="Cancel"
                  onClose={closeAlert}
                />
              )}             */}
                    </div>
                  ),
                },
              ];

              data.push(item);
    }
  }

  if(departmentData){
    let item:any;
    for(let iterator of departmentData){
      item = [
        {
          title: <span style={{ wordWrap: "break-word", wordBreak: "break-all" }}><TableBoldData title={iterator?.department?.toString()} /></span>,
        },   
        {
          title: <TableBoldData title={iterator?.locationId?.toString()} />,          
        },       
        {
          title: <TableBoldData title={iterator?.status?.toString()} />,
        },
        {
          title: (
            <div style={{ display: "flex" }}>
            <IconButton
              color="neutral"
              icon={<EditPenOnly />}
              onClick={() => { handleEditDepartmentClick(iterator)}}
              style={{ padding: "0", width: "auto", border: "none", marginRight: "10px" }}
            />
          
              
              {/* <div className="form-check form-switch">  
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
                  title="Change Location Status"
                  message="Do You Want To Change Status of Branch/Department?"
                  btn1="Ok"
                  btn2="Cancel"
                  onClose={closeAlert}
                />
              )}             */}
                    </div>
                  ),
                },
              ];

              data.push(item);
    }
  }


  return( 
  <>
  <DataTable 
  headers={header} 
  data={[...data]} 
  totalCount={totalCount} 
  onChangePage={onChangePage} 
  paginator={paginator} />;

{openEditBranch && (
                  <CreateBranch
                    open={openEditBranch}
                    setopen={setOpenEditBranch}
                    data={selectedRowData}
                    title="Edit Branch"
                    message="edit"
                    btn1="Save"
                    btn2="Cancel"
                    onClose={EditBranch}
                  />
                )}
                {alert && <AlertBox open={alert} setopen={setAlert} data={data} title="Alert" message="Are You Sure You Want To Edit Branch ?" btn1="OK" btn2="CANCEL" onClose={EditBranchOK} />}
                {alertCon && <AlertBox open={alertCon} setopen={setAlertCon} data={data} title="Alert" message="Branch Details Updated !" btn1="OK" btn2="" onClose={EditBranchCon} />}
  
{openEditDepartment && (
                <CreateDepartment
                  open={openEditDepartment}
                  setopen={setOpenEditDepartment}
                  data={selectedRowData}
                  title="Edit Department"
                  message="edit"
                  btn1="Save"
                  btn2="Cancel"
                  onClose={EditDepartment}
                />
              )}
              {alertD && <AlertBox open={alertD} setopen={setAlertD} data={data} title="Alert" message="Are You Sure You Want To Update Department ?" btn1="OK" btn2="CANCEL" onClose={EditDepartmentOK} />}
              {alertConD && <AlertBox open={alertConD} setopen={setAlertConD} data={data} title="Alert" message=" Department Details Updated !" btn1="OK" btn2="" onClose={EditBranchCon} />}

  </>
  )
};

export default TableLocManagement;
