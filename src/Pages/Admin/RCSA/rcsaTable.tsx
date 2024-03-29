import {useState } from "react";
import { DataTable } from "../../../Components/Table";
import { TableBoldData, TableFiltersContainer, TableLightData } from "../../../Components/PageShared";
import { Button, IconButton } from "../../../Components/Buttons";
import { useNavigate } from "react-router-dom";
import { AuditIcon, CheckSquare, ColorCheck, Delete, EditPenOnly, EyeOpenIcon, GitCommit, PendingIcon, Repeat, SuccessIcon } from "../../../Components/Icons";
import AlertBox from "../../../Components/PageShared/Admin/Alert/alert";
import { useAppStateSelector } from "../../../Services/Store/hooks";
interface RloLossTableProps {
  props: any,
  request:any,
  totalCount:number
  onChangePage: (page: number) => void;
  paginator:boolean
}


const headers = [
  {

    title: "RefNum",

  },
  {

    title: "Processes",

  },
  {

    title: "Sub Processes",

  },
  {

    title: "Branch/Department",

  },
  {

    title: "Date of Reporting",

  },
  {

    title: "Risk Rating",

  },
  {

    title: "Created By",

  },
  {

    title: "Update Requested By BoRM",

  },
  {

    title: "Status",

  },
  {

    title: "Action",

  }
];

 
const RcsaTable = (

{props,request,totalCount,onChangePage,paginator}:{props: any,request: any,totalCount:any,onChangePage:any,paginator:any}
) => {
  const [openSuccess, setOpenSuccess] = useState(false);
  const navigate = useNavigate();
const authState:any = useAppStateSelector((state) => state.authState)

  const viewRCSA = (item:any) => {
    
    let userRole:string=authState?.userData?.data?.data?.userRole;
    userRole=userRole.toLocaleLowerCase();
    const url='/view-rcsa';
    return navigate(`/${userRole}${url}`, {
      state: [{ action: 'view' }, {item}, { type: "view" }]
    })
   };
  const ReqRCSA = () => {
    let userRole:string=authState?.userData?.data?.data?.userRole;
    userRole=userRole.toLocaleLowerCase();
    const url='/request-update-rcsa';
    return navigate(`/${userRole}${url}`, {
      // state:[{action:'create'},{type:"create"}]
    })
   };
  const editRCSA = (item:any) => {
    let userRole:string=authState?.userData?.data?.data?.userRole;
    userRole=userRole.toLocaleLowerCase();
    const url = '/create-rcsa';
    return navigate(`/${userRole}${url}`, {
      state: [{ action: 'edit' }, {item}, { type: "edit" }]
    })
    
   };
  const approveRCSA = () => {
    let userRole:string=authState?.userData?.data?.data?.userRole;
    userRole=userRole.toLocaleLowerCase();
    const url='/approve-rcsa';
    return navigate(`/${userRole}${url}`, {
      // state:[{action:'create'},{type:"create"}]
    })
   };
  

  let data = []
  // let data2 = []
  const [openAlertBox, setOpenAlertBox] = useState(false);
  // let data1 ={
  //   ID: "112121",
  //   Processes: "Analytics & Insights",
  //   Currency: "fgfgg",
  //   SubProcesses: "Campaign Data Saurce",
  //   DepartmentUnit: "CRM Customer Analytics & Insights",
  //   DateSubmitted: "11/11/2023",
  //   Status: "Approved",
  // }
  // data2.push(data1)
  let array= props

  if(array){
    for (const iterator of array) {
        let showEdit = false;
        if((iterator?.reportStatus === "Draft") || (iterator?.updateRequestStatus === "Requested")){
          showEdit=true;
        }
    let item= [
   
        {
   
          title: <TableBoldData title={iterator.refNum?.toString()}/>,
  
       },
       {
   
        title: <TableBoldData title={iterator?.processName?.toString()}/>,
        
      },
      {
   
        title: <TableBoldData title={iterator?.subProcessName?.toString()} />,

     },
      {
   
        title: <TableBoldData title={iterator?.locationName?.toString()} />,

     },
     {
      title: 
      <>
        <TableBoldData title={iterator?.createdDate?.toString().substring(0,10)}/>
        <TableLightData title={iterator?.createdDate?.toString().substring(11,19)}/>
      </>
    },
    {

      title: <TableBoldData title={iterator?.riskRating?.toString()} />,
  
    },
    {

      title: <TableBoldData title={iterator?.createdByName?.toString()} />,
  
    },
    
    {

      title: <TableBoldData title={iterator?.updateRequestStatus?.toString()} />,
  
    },
     {
   
      title: <><span className="badge"><div className={iterator?.reportStatus?.toString()}>{iterator?.reportStatus?.toString() }</div></span></>,

     },
    {

  title:<div style={{display: "flex"}}>
    
                <IconButton
                color="neutral"
                icon={<EyeOpenIcon />}
                onClick={() => { viewRCSA(iterator)}}
                style={{ padding: "0", width: "auto", border: "none", marginRight: "10px" }}
                />
                {/* <IconButton
                color="neutral"
                icon={<Repeat />}
                onClick={() => { viewRCSA()}}
                style={{ padding: "0", width: "auto", border: "none", marginRight: "10px" }}
                />
                <IconButton
                color="neutral"
                icon={<ColorCheck />}
                onClick={() => { approveRCSA()}}
                style={{ padding: "0", width: "auto", border: "none", marginRight: "10px" }}
                />
                <IconButton
                color="neutral"
                icon={<PendingIcon />}
                onClick={() => { ReqRCSA()}}
                style={{ padding: "0", width: "auto", border: "none", marginRight: "10px" }}
                /> */}
              {  (authState?.userData?.data?.data?.userId == iterator?.createdById)
              &&
              (showEdit) &&
              <IconButton
                color="neutral"
                icon={<EditPenOnly />}
                onClick={() => { editRCSA(iterator)}}
                style={{ padding: "0", width: "auto", border: "none", marginRight: "10px" }}
                />}
            </div>
   

    }
   
       ]
   
       data.push(item)
   
   }
  }
  return (
    <>
      <DataTable headers={headers} data={[...data]} totalCount={totalCount} onChangePage={onChangePage} paginator={true}  />
      {/* <PopupSuccessModal open={openSuccess} setOpen={setOpenSuccess} data={ sdata1 }/> */}
    </>
  );
};

export default RcsaTable;
