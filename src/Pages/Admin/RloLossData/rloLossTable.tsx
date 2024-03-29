import {useState } from "react";
import { DataTable } from "../../../Components/Table";
import { TableBoldData, TableFiltersContainer, TableLightData } from "../../../Components/PageShared";
import { Button, IconButton } from "../../../Components/Buttons";
import RloView from "./rloView";
import { PopupSuccessModal } from "../../../Components/PageShared/Admin/DetailedView";
import { useNavigate } from "react-router-dom";
import { AuditIcon, ColorCheck, Delete, EditPenOnly, EyeOpenIcon } from "../../../Components/Icons";
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

    title: "Ref ID",

  },
  {

    title: "Branch/Department",

  },
  {

    title: "Region",

  },
  {

    title: "Date Reported",

  },
  {

    title: "Date Of Occurence",

  },
  {

    title: "Created By",

  },
  {

    title: "Reviewed By",

  },
  {

    title: "Reviewed Date",

  },
  {

    title: "Event Status",

  },
  {

    title: "Status",

  },
  {

    title: "Action",

  }
 
  
];


const RloLossTable = (

{props,request,totalCount,onChangePage,paginator}:{props: any,request: any,totalCount:any,onChangePage:any,paginator:any}
) => {
  const [openSuccess, setOpenSuccess] = useState(false);
  const navigate = useNavigate();
  let userState:any = useAppStateSelector((state) => state.authState)

  let userRole:string=userState?.userData?.data?.data?.userRole;
   userRole=userRole.toLocaleLowerCase();

  const handleApproveLossData = (item:any) => {
    const url='/loss-data-approval';
     return navigate(`/${userRole}${url}`, {
        state:[{action:'approve'},{item}]
      })
  };
  
  const editDetails =async (item:any)=>{
      
      const url='/lossdata';
      return navigate(`/${userRole}${url}`, {
        state:[{action:'edit'},{item}]
      })
  }
  
  // const addLossDataParentId =async (
  //   iterator:any)=>{
  //     let childData = {
  //       refId: iterator.refId,
  //       parentId: iterator.parentId,
  //       LossType: iterator.LossType,
  //       Currency: iterator.Currency,
  //       DateOfOccurrence: iterator.DateOfOccurrence,
  //       DateDiscovered: iterator.DateDiscovered,
  //       DateReported : iterator.DateReported,
  //       DetailedLossEvent: iterator.DetailedLossEvent,
  //       NearMiss: iterator.NearMiss,
  //       PotentialLoss: iterator.PotentialLoss, 
  //       GrossActualLoss: iterator.GrossActualLoss, 
  //       FurtherRecovery: iterator.FurtherRecovery,
  //       NetActualLoss: iterator.NetActualLoss,  
  //       RootCause: iterator.RootCause,
  //       RiskSourceId: iterator.RiskSourceId,
  //       AmountInvolved: iterator.AmountInvolved,
  //       AmountRecovered: iterator.AmountRecovered,
  //       Region: iterator.Region,
  //       ProcessInvolved: iterator.ProcessInvolved,
  //       RecoveryMode: iterator.RecoveryMode,
  //       EventStatus: iterator.EventStatus,
  //       Department: iterator.Department,
  //       ReportStatus: iterator.ReportStatus // Saved , Submitted, Approved , Rejected
  //     }
  //     const url='/lossdata';
  //     return navigate(`/admin${url}`, {
  //       state:[{action:'parentId'},{childData}]
  //     })
  // }
  const moreDetails =async (item:any)=>{
      const url='/rlo-loss-view';
      return navigate(`/${userRole}${url}`, {
        state:[{action:'view'},{item}]
      })
  }
  
  const handleRequest = () => {
    // setPageNumber(pageNumber);
   };

  let data = []

  let array= props

  if(array){
    for (const iterator of array) {
        
    let item= [
        
        {

        title: <TableBoldData title={iterator.refNum?.toString()}/>,

        },
        
    {
    
      title: <><TableBoldData title={iterator?.branch?.toString()}/>
       <TableBoldData title={iterator?.department?.toString()}/></>

    },
    
    {

      title: <TableBoldData title={iterator?.region?.toString()}/>,

    },
    {
   
      title: <div>
        <TableBoldData title={iterator?.dateReported?.toString().substring(0,10)}/>
        <TableLightData title={iterator?.dateReported?.toString().substring(11,19)}/>
      </div>
    },
       {
        title: 
        <div>
          <TableBoldData title={iterator?.dateOfOccurrence?.toString().substring(0,10)}/>
          {/* <TableLightData title={iterator?.dateOfOccurrence?.toString().substring(11,19)}/> */}
        </div>
      },
      {
        title: 
        <div>
          <TableBoldData title={iterator?.createdByName}/>
        </div>
      },
       {
        title: 
        <div>
          <TableBoldData title={iterator?.validatorILOUserName}/>
        </div>
      },
      {
        title: 
        <div>
          <TableBoldData title={iterator?.approvedDate?.toString().substring(0,10)}/>
          <TableLightData title={iterator?.approvedDate?.toString().substring(11,19)}/> 
        </div>
      },

    {
    
      title: <TableBoldData title={iterator?.eventStatus?.toString()} />,
      
    },
    {
    
      title: <><span className="badge"><div className={iterator?.reportStatus?.toString() }>{iterator?.reportStatus?.toString() }</div></span></>

    },
    {  title:<div style={{display: "flex"}}>
                <IconButton
                color="neutral"
                icon={<EyeOpenIcon />}
                onClick={() => moreDetails(iterator)}
                style={{ padding: "0", width: "auto", border: "none", marginRight: "10px" }}
                />

                {/* report owner edit loss report */}
              {
                (iterator?.createdBy == userState?.userData?.data?.data?.userId) &&
                (iterator.reportStatus?.toString()?.toLocaleLowerCase() === "draft") &&
                <IconButton
                onClick={() => editDetails(iterator)}
                color="neutral"
                icon={<EditPenOnly/>}
                style={{ padding: "0", width: "auto", border: "none", marginRight: "10px" }}
                />
              }


                {/* Admin edit loss report */}
              {
                (iterator.reportStatus?.toString()?.toLocaleLowerCase()?.includes("admin")) &&
                <IconButton
                color="neutral"
                icon={<EditPenOnly/>}
                onClick={()=> handleApproveLossData(iterator) }
                style={{ padding: "0", width: "auto", border: "none" }}
                />
              }
            </div>
   

    }
   
       ]
   
       data.push(item)
   
   }
  }
  return (
    <>
      <DataTable headers={headers} data={[...data]} totalCount={totalCount} onChangePage={onChangePage} paginator={paginator}  />
      {/* <PopupSuccessModal open={openSuccess} setOpen={setOpenSuccess} data={ sdata1 }/> */}
    </>
  );
};

export default RloLossTable;
