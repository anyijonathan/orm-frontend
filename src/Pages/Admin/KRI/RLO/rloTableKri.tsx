import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableBoldData } from "../../../../Components/PageShared";
import { Button, IconButton } from "../../../../Components/Buttons";
import { ColorCheck, Delete, EditPenOnly, EyeOpenIcon } from "../../../../Components/Icons";
import { DataTable } from "../../../../Components/Table";
interface TransactionsTableProps {
  props: any,
  request:any,
  totalCount:number
  onChangePage: (page: number) => void;
  paginator:boolean
}
const headers = [
  {

    title: "KRI Reference ID",

  },
  {

    title: "KRI Category",

  },
  {

    title: "Metric Name",

  },
  {

    title: "Description",

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

    title: "Frequency",

  },
  {

    title: "Actions",

  }
  
];

const RloTableKri = ({
  props,
  request,
  totalCount,
  onChangePage,
  paginator
}: TransactionsTableProps) => {
  let data = []
  let data2 = []
 
  let data1 =[{
    KRIReferenceID: "123123",
    KRICategory: "Category Name",
    MetricName: "Detail Will Come Here",
    Description: "Detail Will Come Here",
    Currency: "Naira",
    Branch: "Lagos",
    Department: "Lagos",
    Region: "Lagos",
    Frequency: "Daily",
  },
  {
    KRIReferenceID: "33433",
    KRICategory: "Category Name",
    MetricName: "Detail 2",
    Description: "Detail Will Come Here",
    Currency: "Naira",
    Branch: "Lagos",
    Department: "Lagos",
    Region: "Lagos",
    Frequency: "Daily",
  },
];
  data2.push(data1)
  let array= data1
  const navigate = useNavigate();
  const handleCreateKriData = () => {
    const url='/create-kri-data';
     navigate(`/admin${url}`);
  };
  const [openApproveRejectKri, setOpenApproveRejectKri] = useState(false);
  const [openViewKri, setOpenViewKri] = useState(false);

  if(array){
    for (const iterator of array) {
        
    let item= [
   
        {
   
          title: <TableBoldData title={iterator.KRIReferenceID?.toString()}/>,
  
       },
       {
   
        title: <TableBoldData title={iterator?.KRICategory.toString()}/>,
        
      },
      {
   
        title: <TableBoldData title={iterator.MetricName?.toString()}/>,

      },
      {
   
        title: <TableBoldData title={iterator.Description?.toString()} />,

     },
      {
   
        title: <TableBoldData title={iterator.Currency?.toString()} />,

     },
      {
   
        title: <TableBoldData title={iterator.Branch?.toString()} />,

     },
      {
   
        title: <TableBoldData title={iterator.Department?.toString()} />,

     }, 
      {
   
        title: <TableBoldData title={iterator.Region?.toString()} />,

     }, 
      {
   
        title: <TableBoldData title={iterator.Frequency?.toString()} />,

     }, 
     {

        title: <div style={{display: "flex"}}>
            <IconButton
            color="neutral"
            icon={<EyeOpenIcon />}
            style={{ padding: "0", width: "auto", border: "none", marginRight: "10px" }}
            />
            <Button size="small" color="primary"  onClick={handleCreateKriData}>
                Log Data
            </Button>
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

export default RloTableKri;
