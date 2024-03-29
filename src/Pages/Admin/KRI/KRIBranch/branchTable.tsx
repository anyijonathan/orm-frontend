import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableBoldData } from "../../../../Components/PageShared";
import { Button, IconButton } from "../../../../Components/Buttons";
import { ColorCheck, Delete, EditPenOnly, EyeOpenIcon } from "../../../../Components/Icons";
import { DataTable } from "../../../../Components/Table";
import { useAppStateSelector } from "../../../../Services/Store/hooks";
interface TransactionsTableProps {
  props: any,
  request:any,
  totalCount:number
  onChangePage: (page: number) => void;
  paginator:boolean
}
const headers = [
  {

    title: "Reference Number",

  },
  {

    title: "Date Reported",

  },
  {

    title: "Branch/Department",

  },
  {

    title: "Region",

  },
  {

    title: "Actions",

  }
  
];

const BranchTable = ({
  props,
  request,
  totalCount,
  onChangePage,
  paginator
}: TransactionsTableProps) => {
  let data = []
  let data2 = []
 
  let data1 =[{
    RefNumber: "123123",
    DateReported: "Category Name",
    BranchDepartment: "Detail Will Come Here",
    Region: "Lagos",
  },
];
  data2.push(data1)
  let array= data1
  const navigate = useNavigate();
  const handleViewKriData = () => {
     let userRole:string=userState?.userData?.data?.data?.userRole;
        userRole=userRole?.toLocaleLowerCase();
        const url = "/view-kri-data-branch";
        navigate(`/${userRole}${url}`);
  };
  let userState:any = useAppStateSelector((state) => state.authState)

  const [openApproveRejectKri, setOpenApproveRejectKri] = useState(false);
  const [openViewKri, setOpenViewKri] = useState(false);

  if(array){
    for (const iterator of array) {
        
    let item= [
   
        {
   
          title: <TableBoldData title={iterator.RefNumber?.toString()}/>,
  
       },
       {
   
        title: <TableBoldData title={iterator?.DateReported.toString()}/>,
        
      },
      {
   
        title: <TableBoldData title={iterator.BranchDepartment?.toString()}/>,

      },
      {
   
        title: <TableBoldData title={iterator.Region?.toString()} />,

     }, 
     {

        title: <div style={{display: "flex"}}>
            <IconButton
            color="neutral"
            icon={<EyeOpenIcon />}
            onClick={ ()=> handleViewKriData()}
            style={{ padding: "0", width: "auto", border: "none", marginRight: "10px" }}
            />
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

export default BranchTable;
