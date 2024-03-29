import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "../../../Components/Table";
import { Button } from "../../../Components/Buttons";
import { TableBoldData } from "../../../Components/PageShared";
interface TransactionsTableProps {
  props: any,
  request:any,
  totalCount:number
  onChangePage: (page: number) => void;
  paginator:boolean
}
const headers = [
  {

    title: "ID",

  },
  {

    title: "Report Name",

  },
  {

    title: "Report Type",

  },
  {

    title: "Reported By",

  },
  {

    title: "Description",

  },
  {

    title: "Intervel",

  },
  {

    title: "Report Date",

  },

];

const ReportsTable = ({
  props,
  request,
  totalCount,
  onChangePage,
  paginator
}: TransactionsTableProps) => {
  let data = []
  let data2 = []

  let data1 =[{
    ID: "12432",
    Indicator: "Indicator Name",
    Branch: "Opebi Branch",
    Department: "Loan Recovery",
    Frequency: "Monthly",
    DateCreated: "11-11-2024",
    Action: " ",
  },
];
  data2.push(data1)
  let array= data1
  const [openCurrencyType, setOpenCurrencyType] = useState(false);
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
          title: <TableBoldData title={iterator.ID?.toString()}/>,
        },
        {
          title: <TableBoldData title={iterator.Indicator?.toString()}/>,
        },
        {
          title: <TableBoldData title={iterator.Branch?.toString()}/>,
        },
        {
          title: <TableBoldData title={iterator.Department?.toString()}/>,
        },
        {
          title: <TableBoldData title={iterator.Frequency?.toString()}/>,
        },
        {
          title: <TableBoldData title={iterator.DateCreated?.toString()}/>,
        },
        {
          title: <><Button variant="text" size="small">View</Button></>,
        },


       ]

       data.push(item)

   }
  }
  return (

      <DataTable headers={headers} data={[...data]} totalCount={totalCount} onChangePage={onChangePage} paginator={true}  />

  );
};

export default ReportsTable;