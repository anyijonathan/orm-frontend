import {useState } from "react";
import { DataTable } from "../../../Components/Table";
import { TableBoldData, TableFiltersContainer } from "../../../Components/PageShared";
import { Button, IconButton } from "../../../Components/Buttons";
import { useNavigate } from "react-router-dom";
import { ColorCheck, Delete, EditPenOnly, EyeOpenIcon } from "../../../Components/Icons";
import AlertBox from "../../../Components/PageShared/Admin/Alert/alert";
interface RloLossTableProps {
  props: any,
  request:any,
  totalCount:number
  onChangePage: (page: number) => void;
  paginator:boolean
}

const headers = [
  {

    title: "Internal  Id1",

  },
  {

    title: "Loss Type",

  },
  {

    title: "Currency",

  },
  {

    title: "Date Of Occurence",

  },
  {

    title: "Date Discovered",

  },
  // {

  //   title: "Description Of Loss",

  // },
  // {

  //   title: "Root Cause",

  // },
  // {

  //   title: "RiskSource Id",

  // },
  // {

  //   title: "Amount Involved",

  // },
  // {

  //   title: "Amount Recovered",

  // },
  {

    title: "Region",

  },
  // {

  //   title: "Process Involved",

  // },
  // {

  //   title: "Recovery Mode",

  // },
  {

    title: "Event Status",

  },
  {

    title: "Branch/Department",

  },
  {

    title: "Action",

  }
 
  
];


const LossDataTable = (

{props,request,totalCount,onChangePage,paginator}:{props: any,request: any,totalCount:any,onChangePage:any,paginator:any}
) => {
  const [openSuccess, setOpenSuccess] = useState(false);
  const navigate = useNavigate();

  const moreDetails =async (
    InternalBusinessLineId:any, LossType:any,
    Currency:any, DateOfOccurrence:any,
    DateDiscovered:any, DescriptionOfLoss:any,
    RootCause:any, RiskSourceId:any,
    AmountInvolved:any, AmountRecovered:any,
    Region:any, ProcessInvolved:any,
    RecoveryMode:any, EventStatus:any,
    Department:any)=>{
      let childData = {
        InternalBusinessLineId: InternalBusinessLineId,
        LossType: LossType,
        Currency: Currency,
        DateOfOccurrence: DateOfOccurrence,
        DateDiscovered: DateDiscovered,
        DescriptionOfLoss: DescriptionOfLoss,
        RootCause: RootCause,
        RiskSourceId: RiskSourceId,
        AmountInvolved: AmountInvolved,
        AmountRecovered: AmountRecovered,
        Region: Region,
        ProcessInvolved: ProcessInvolved,
        RecoveryMode: RecoveryMode,
        EventStatus: EventStatus,
        Department: Department
      }
      const url='/loss-data-view';
      return navigate(`/admin${url}`, {
        state:[{action:'view'},{childData}]
      })
  }

  let data = []
  let data2 = []
  const [openAlertBox, setOpenAlertBox] = useState(false);
  let data1 ={
    InternalBusinessLineId: "sdsd",
    LossType: "erer",
    Currency: "fgfgg",
    DateOfOccurrence: "vbvbb",
    DateDiscovered: "erer",
    DescriptionOfLoss: "vnng",
    RootCause: "asas",
    RiskSourceId: "vhgdff",
    AmountInvolved: "hdsd",
    AmountRecovered: "ghgh",
    Region: "fdfdfdf",
    ProcessInvolved: "etdsd",
    RecoveryMode: "fdfdfg",
    EventStatus: "nghhgh",
    Department: "eertte"
  }
  data2.push(data1)
  let array= data2

  if(array){
    for (const iterator of array) {
        
    let item= [
   
        {
   
          title: <TableBoldData title={iterator.InternalBusinessLineId?.toString()}/>,
  
       },
       {
   
        title: <TableBoldData title={iterator?.LossType?.toString()}/>,
        
      },
      {
   
        title: <TableBoldData title={iterator.Currency?.toString()}/>,

      },
      {
   
        title: <TableBoldData title={iterator.DateOfOccurrence?.toString()} />,

     },
      {
   
        title: <TableBoldData title={iterator.DateDiscovered?.toString()} />,

     },
    //  {

    //     title: <TableBoldData title={iterator.DescriptionOfLoss?.toString()} />,

    //  },
    //  {
   
    //   title: <TableBoldData title={iterator.RootCause?.toString()} />,

    //  },
    //  {
   
    //   title: <TableBoldData title={iterator.RiskSourceId?.toString()}/>,

    //  },
    //  {
   
    //   title: <TableBoldData title={iterator.AmountInvolved?.toString()}/>,

    //  },
    // {
  
    //   title: <TableBoldData title={iterator.AmountRecovered?.toString()}/>,

    // },
    {

      title: <TableBoldData title={iterator.Region?.toString()}/>,

    },
    // {
   
    //   title: <TableBoldData title={iterator.ProcessInvolved?.toString()} />,

    // },
    // {
    
    //   title: <TableBoldData title={iterator.RecoveryMode?.toString()}/>,

    // },
    {
    
      title: <TableBoldData title={iterator.EventStatus?.toString()} />,
      
    },
    {
    
      title: 
      // <div>{iterator?.locationType === "B" &&
        <TableBoldData title={iterator?.Department?.toString()}/>,
        // }
        // {/* </div> */}

    },
    {

  //     title: <div className="moreDetailButton">
  //     <Button
  //     variant="contained"
  //     data-bs-toggle="tooltip" data-bs-placement="top" title=""
  //     onClick={() => moreDetails(
  //       iterator.InternalBusinessLineId,iterator.LossType,
  //       iterator.Currency,iterator.DateOfOccurrence,
  //       iterator.DateDiscovered,iterator.DescriptionOfLoss,iterator?.RootCause,
  //       iterator.RiskSourceId,iterator.AmountInvolved,iterator?.AmountRecovered,
  //       iterator.Region,iterator.ProcessInvolved,iterator?.RecoveryMode,
  //       iterator.EventStatus,iterator.Department
      

  //     )}
  //   >View</Button>
  // </div>
  title:<div style={{display: "flex"}}>
                <IconButton
                color="neutral"
                icon={<EyeOpenIcon />}
                onClick={() => moreDetails(
                iterator.InternalBusinessLineId,iterator.LossType,
                iterator.Currency,iterator.DateOfOccurrence,
                iterator.DateDiscovered,iterator.DescriptionOfLoss,iterator?.RootCause,
                iterator.RiskSourceId,iterator.AmountInvolved,iterator?.AmountRecovered,
                iterator.Region,iterator.ProcessInvolved,iterator?.RecoveryMode,
                iterator.EventStatus,iterator.Department
                )}
                style={{ padding: "0", width: "auto", border: "none", marginRight: "10px" }}
                />
                <IconButton
                color="neutral"
                icon={<EditPenOnly />}
                style={{ padding: "0", width: "auto", border: "none", marginRight: "10px" }}
                />
                <IconButton
                color="neutral"
                icon={<Delete />}
                onClick={() => { setOpenAlertBox(true);}}
                style={{ padding: "0", width: "auto", border: "none", marginRight: "10px" }}
                />
                <IconButton
                color="neutral"
                icon={<ColorCheck />}
                onClick={() => { setOpenAlertBox(true);}}
                style={{ padding: "0", width: "auto", border: "none" }}
                />
                {openAlertBox && <AlertBox open={openAlertBox} setopen={setOpenAlertBox} data={"msg"} title={"Alert"} message={"Alert Message Here"} btn1={"OK"} btn2={"Close"} onClose={function (result: string): void {
                throw new Error("Function not implemented.");
            } } />}
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

export default LossDataTable;
