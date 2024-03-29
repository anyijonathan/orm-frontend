import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableBoldData } from "../../../../Components/PageShared";
import { Button, IconButton } from "../../../../Components/Buttons";
import { ColorCheck, Delete, EditPenOnly, EyeOpenIcon } from "../../../../Components/Icons";
import { DataTable } from "../../../../Components/Table";
import { SelectDropDown } from "../../../../Components/DropDown";
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

    title: "ID",

  },
  {

    title: "Indicator",

  },
  {

    title: "Branch",

  },
  {

    title: "Department",

  },
  {

    title: "Frequency",

  },
  {

    title: "Date Created",

  },
  {

    title: "Action",

  },
  
];

const AllKriTable = ({
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
  let userState:any = useAppStateSelector((state) => state.authState)
  const handleViewKri = () => {
    // const url='/log-kri-data-department';
    const url='/view-kri-metrices'; 
    let userRole:string=userState?.userData?.data?.data?.userRole;
    userRole=userRole?.toLocaleLowerCase();
    navigate(`/${userRole}${url}`);
    };

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
          title: <><Button variant="text" size="small" onClick={()=> handleViewKri()}>View</Button>
          <div className="form-check form-switch" style={{display:"inline-block", verticalAlign: "bottom"}}>  
              <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  // checked={iterator.status === "Active"}
                  // onChange={() => handleSwitchChange(iterator)}
                  // disabled={authState?.userData?.data?.data?.email === iterator.emailId}    
                /> </div> 
          </> ,
        },
       
    
       ]
   
       data.push(item)
   
   }
  }
  return (
   
      <DataTable headers={headers} data={[...data]} totalCount={totalCount} onChangePage={onChangePage} paginator={true}  />
   
  );
};

export default AllKriTable;
