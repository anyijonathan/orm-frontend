import { useEffect, useState } from "react";
import { IconButton } from "../../../../Components/Buttons";
import { EyeOpenIcon, EditPenOnly } from "../../../../Components/Icons";
import { TableBoldData, TableLightData } from "../../../../Components/PageShared";
import AlertBox from "../../../../Components/PageShared/Admin/Alert/alert";
import { DataTable } from "../../../../Components/Table";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppStateSelector } from "../../../../Services/Store/hooks";
import { roleDetailsAction, roleUnlockedAction, viewRoleDetails } from "../../../../Services/Actions/userAction";
interface TransactionsTableProps {
  props: any,
  request:any,
  totalCount:number
  onChangePage: (page: number) => void;
  paginator:boolean
}

const headers = [
  {

    title: "Role Title",

  },
  // {

  //   title: "Role Type",

  // },
  {

    title: "NO Of Users",

  },
  {

    title: "Date Of Creation",

  },
  {

    title: "Status",

  },
  {

    title: "Actions",

  }
  
];


const TableRoleManagement = ({
  props,
  request,
  totalCount,
  onChangePage,
  paginator
}: TransactionsTableProps) => {
  let data:any[] = [];
  let [array, setArray] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openAlertBoxStatus, setOpenAlertBoxStatus] = useState(false);
  const [openConfAlertBoxStatus, setOpenConfAlertBoxStatus] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authState:any = useAppStateSelector((state) => state.authState)


  useEffect(() => {
    setArray(props);    
  }, [props]);

  
  const handleNavigate = async(RoleTitle: string,) => {  
    const RoleData="";
    await fetchData(RoleTitle);      
    const url='/edit-role';
    return navigate(`/admin${url}`,{
      state:[{RoleData},{RoleTitle}]
    })
  };
  const handleNavigation =async (RoleTitle: string,) => {
    const RoleData=await fetchData(RoleTitle);    
    const url='/view-role';
    return navigate(`/admin${url}`,{
      state:[{RoleData},{RoleTitle}]
    })
  };

  
  const fetchData=async(roleTitle?:string)=>{
    let result:any[]=[];;
    await dispatch(
      viewRoleDetails({roleTitle:roleTitle})
      ).then((response:any) => {
        result=response?.payload?.requestData?.data.data;
      });
      return result;
  }
  
  const closeAlert = async (result: string) => {
    if (result === "ok") {
      await dispatch(
          roleUnlockedAction({
            roleId: selectedRowData.roleId,
            status: !selectedRowData.status,
            updatedBy: authState?.userData?.data?.data?.userName
          })).then((response:any) => {
            // setIsLoading(true);
            fetchDataUpdate(1,"","",undefined);

          });     
        console.log("Succesful status update dispatch call");
    }
    else {
      console.log("Cancelled status update dispatch call");
    }
  };
  const handleSwitchChange = (iterator: any) => {
    setOpenAlertBoxStatus(true);
    setSelectedRowData(iterator);
  };
  
  if(array){
    for (const iterator of array) {
    const newStatus = iterator.status === true ? 'Active' : 'Inactive';
    let item= [
   
        {
   
          title: <TableBoldData title={iterator.roleTitle?.toString()}/>,
  
       },
        {
   
        title: <TableBoldData title={iterator?.totalCount.toString()}/>,
        
      },
      {
      title: 
      <>
      <TableBoldData title={iterator?.roleCreatedDate?.toString().substring(0,10)} />
      <TableLightData title={iterator?.roleCreatedDate?.toString().substring(11,19)}/>
     </>
      },
      {
   
        title: <TableBoldData title={newStatus} />,

     },
     {

        title: (<div style={{display: "flex"}}>
                <IconButton
                color="neutral"
                icon={<EyeOpenIcon />}
                onClick={() => handleNavigation(iterator.roleTitle)}
                style={{ padding: "0", width: "auto", border: "none", marginRight: "10px" }}
                />
              
                <IconButton
                color="neutral"
                icon={<EditPenOnly />}
                onClick={() => handleNavigate(iterator.roleTitle)}
                style={{ padding: "0", width: "auto", border: "none", marginRight: "10px" }}
                />
                             
                <div className="form-check form-switch"> 
               <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                checked={iterator.status === true}
                onChange={() => handleSwitchChange(iterator)}
                disabled={iterator.roleTitle === "Admin"}
              /> </div>             
                  {openAlertBoxStatus && (
                      <AlertBox
                        open={openAlertBoxStatus}
                        setopen={setOpenAlertBoxStatus}
                        data="msg"
                        title="Change Role Status"
                        message="Do You Want To Change Status Of Role?"
                        btn1="Ok"
                        btn2="Cancel"
                        onClose={closeAlert}
                      />
                    )}
                    {openConfAlertBoxStatus && (
                      <AlertBox
                        open={openConfAlertBoxStatus}
                        setopen={setOpenConfAlertBoxStatus}
                        data="msg"
                        title="Change Role Status"
                        message="Role Status Updated Successfully!"
                        btn1="Ok"
                        btn2=""
                        onClose={()=>{}}
                      />
                    )}
                </div>),
                },
                ]   
       data.push(item)   
   }
  }

  const fetchDataUpdate= async (pageNo:number,isExport: string, roleTitle:string,status:boolean | undefined) =>{
    await dispatch(
      roleDetailsAction( {roleTitle:roleTitle, status:status, PageNumber:pageNo,isExport})
      ).then((response:any) => {
        const result= response?.payload?.requestData?.data;
        setArray(result.data); 
        setOpenAlertBoxStatus(false);
        setOpenConfAlertBoxStatus(true);
        setIsLoading(false);
  });
  }

  return (
   <div>
    {!isLoading && 
      <DataTable 
      headers={headers} 
      data={[...data]} 
      totalCount={totalCount} 
      onChangePage={onChangePage}
      paginator={paginator}  />
    }
   </div>
  );
};

export default TableRoleManagement;


