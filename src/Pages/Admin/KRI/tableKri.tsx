import { DataTable } from "../../../Components/Table";
import { TableBoldData } from "../../../Components/PageShared";
import { Button, IconButton } from "../../../Components/Buttons";
import { CloudUploadIcon, ColorCheck, Delete, EditIcon, EditPenOnly, EyeOpenIcon } from "../../../Components/Icons";
import ApproveRejectKri from "../../../Components/PageShared/Admin/DetailedView/ApproveRejectKri";
import { useState } from "react";
import ViewKriDetail from "../../../Components/PageShared/Admin/DetailedView/ViewKriDetail";
import { useNavigate } from "react-router-dom";
interface TransactionsTableProps {
  props: any,
  request:any,
  totalCount:number
  onChangePage: (page: number) => void;
  paginator:boolean
}

const headers = [
  {

    title: "Category",

  },
  {

    title: "Metric",

  },
  {

    title: "Currency",

  },
  {

    title: "Branch",

  },
  {

    title: "Department",

  },
  {

    title: "Region",

  },
  {

    title: "Tolerance Lower Bound",

  },
  {

    title: "Escalation Lower Bound",

  },
  {

    title: "Frequency",

  },
 
  {

    title: "Indicator",

  },
  {

    title: "Appetite Upper Bound",

  },
  {

    title: "Tolerance Upper Bound",

  },
  {

    title: "Escalation Upper Bound",

  },
  {

    title: "Appetite Type",

  },
  {

    title: "Action",

  }
  
];


const TableKri = ({
  props,
  request,
  totalCount,
  onChangePage,
  paginator
}: TransactionsTableProps) => {
  let data = []
  let data2 = []
 
  let data1 =[{
    category: "category1",
    textField: "random-1",
    toleranceLowerBound: "toleranceLowerBound-1",
    escalationLowerBound: "escalationLowerBound-1",
    metric: "metric1",
    currency: "naira",
    branch: "branch2",
    department: "fintech",
    region: "anambra",
    frequency: "Frequency1",
    indicator: "indicator-1",
    appetiteUpperBound: "appetiteUpperBound-1",
    toleranceUpperBound: "toleranceUpperBound-1",
    escalationUpperBound: "escalationUpperBound-1",
    appetiteType: "appetiteType1",
    kriStatus: "Saved"
  },
  {
    category: "category2",
    textField: "random-2",
    toleranceLowerBound: "toleranceLowerBound-2",
    escalationLowerBound: "escalationLowerBound-2",
    metric: "metric2",
    currency: "usd",
    branch: "branch1",
    department: "investment-banking",
    region: "bauchi",
    frequency: "Frequency2",
    indicator: "indicator-2",
    appetiteUpperBound: "appetiteUpperBound-2",
    toleranceUpperBound: "toleranceUpperBound-2",
    escalationUpperBound: "escalationUpperBound-2",
    appetiteType: "appetiteType2",
    kriStatus: "Submitted"
  },
];
  if(props.length>0){
    data2.push(props)
  } else {
    data2.push(data1)
  }
  let array= data2[0];
  const [openApproveRejectKri, setOpenApproveRejectKri] = useState(false);
  const [openViewKri, setOpenViewKri] = useState(false);
  const navigate = useNavigate();
 const moreDetails =async (
  iterator:any)=>{
    let childData = {
        
    
    }
    const url='/kri-view';
    return navigate(`/admin${url}`, {
      state:[{action:'view'},{childData}]
    })
}
const editDetails =async (
  category:any, toleranceLowerBound:any,
  escalationLowerBound:any, frequency:any,
  metric:any, currency:any,
  branch:any, department:any,
  region:any, indicator:any,
  appetiteUpperBound:any, toleranceUpperBound:any,
  escalationUpperBound:any, appetiteType:any,
  kriStatus:any)=>{
    let childData = {
      category	:	category,
      toleranceLowerBound	:	toleranceLowerBound,
      escalationLowerBound	:	escalationLowerBound,
      frequency	:	frequency,
      metric	:	metric,
      currency	:	currency,
      branch	:	branch,
      department	:	department,
      region	:	region,
      indicator	:	indicator,
      appetiteUpperBound	:	appetiteUpperBound,
      toleranceUpperBound	:	toleranceUpperBound,
      escalationUpperBound	:	escalationUpperBound,
      appetiteType	:	appetiteType,
      kriStatus	:	kriStatus // Saved , Submitted, Approved , Rejected
    }
    const url='/create-kri';
    return navigate(`/admin${url}`, {
      state:[{action:'edit'},{childData}]
    })
}
  if(array){
    for (const iterator of array) {
        
    let item= [
   
        {
   
          title: <TableBoldData title={iterator.category?.toString()}/>,
  
       },
       {
   
        title: <TableBoldData title={iterator.metric?.toString()} />,

      },
      {
   
        title: <TableBoldData title={iterator.currency?.toString()} />,

     },
       {
   
        title: <TableBoldData title={iterator.branch?.toString()} />,

     },
      {
   
        title: <TableBoldData title={iterator.department?.toString()} />,

     }, 
      {
   
        title: <TableBoldData title={iterator.region?.toString()} />,

     }, 
      {
   
        title: <TableBoldData title={iterator.toleranceLowerBound?.toString()}/>,

      },
      {
   
        title: <TableBoldData title={iterator.escalationLowerBound?.toString()} />,

     },
      {
   
        title: <TableBoldData title={iterator.frequency?.toString()} />,

     },
     {
   
      title: <TableBoldData title={iterator?.indicator.toString()}/>,
      
    },
    {
 
      title: <TableBoldData title={iterator.appetiteUpperBound?.toString()}/>,

    },
    {
 
      title: <TableBoldData title={iterator.toleranceUpperBound?.toString()}/>,

    },
    {
 
      title: <TableBoldData title={iterator.escalationUpperBound?.toString()} />,

    },
   {
 
    title: <TableBoldData title={iterator.appetiteType?.toString()} />,

   },
     {

        title: <div style={{display: "flex"}}>
                <IconButton
                color="neutral"
                icon={<EyeOpenIcon />}
                onClick={() => moreDetails(
                  iterator
                  )}
                style={{ padding: "0", width: "auto", border: "none", marginRight: "10px" }}
                />
                {/* {openViewKri && <ViewKriDetail open={openViewKri} setopen={setOpenViewKri} data={ "msg" } />} */}
                <IconButton
                color="neutral"
                icon={<EditPenOnly />}
                style={{ padding: "0", width: "auto", border: "none", marginRight: "10px" }}
                onClick={() => editDetails(
                  iterator.category, iterator.toleranceLowerBound,
                  iterator.escalationLowerBound, iterator.frequency,
                  iterator.metric, iterator.currency,
                  iterator.branch, iterator.department,
                  iterator.region, iterator.indicator,
                  iterator.appetiteUpperBound, iterator.toleranceUpperBound,
                  iterator.escalationUpperBound, iterator.appetiteType,
                  iterator.kriStatus
                )}
                hidden = {iterator?.kriStatus != "Saved"}
                />
                <IconButton
                color="neutral"
                icon={<Delete />}
                style={{ padding: "0", width: "auto", border: "none", marginRight: "10px" }}
                />
                <IconButton
                color="neutral"
                icon={<ColorCheck />}
                onClick={() => { setOpenApproveRejectKri(true);}}
                style={{ padding: "0", width: "auto", border: "none" }}
                />
                {openApproveRejectKri && <ApproveRejectKri open={openApproveRejectKri} setopen={setOpenApproveRejectKri} data={ "msg" } />}
            </div>
        ,

     }
   
       ]
   
       data.push(item)
   
   }
  }
  return (
   
      <DataTable headers={headers} data={[...data]} totalCount={totalCount} onChangePage={onChangePage} paginator={true}  />
   
  );
};

export default TableKri;
