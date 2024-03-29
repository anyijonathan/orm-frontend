import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableBoldData } from "../../../../Components/PageShared";
import { Button, IconButton } from "../../../../Components/Buttons";
import { ColorCheck, Delete, EditPenOnly, EyeOpenIcon } from "../../../../Components/Icons";
import { DataTable } from "../../../../Components/Table";
import { SelectDropDown } from "../../../../Components/DropDown";
interface TransactionsTableProps {
  props: any,
  request:any,
  totalCount:number
  onChangePage: (page: number) => void;
  paginator:boolean
}
const headers = [
  {

    title: "KRI",

  },
  {

    title: "Occurrence",

  },
  {

    title: "Select Week",

  }
  
];

const LogKriTable = ({
  props,
  request,
  totalCount,
  onChangePage,
  paginator
}: TransactionsTableProps) => {
  let data = []
  let data2 = []
 
  let data1 =[{
    KRI: "Number of times vault cash limit was exceeded without ZSM/RSH approvals in place",
    Occurrence: "Category Name",
    SelectWeek: "Detail Will Come Here",
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
   
          title: <TableBoldData title={iterator.KRI?.toString()}/>,
  
       },
       {
   
        title: <div style={{display: "flex"}}>
            <div className="form-group">
              <input type="number" className="form-control" id="" placeholder="Enter Detail" name="" />
            </div>
        </div>
        
      },
      {
   
        title: <div style={{display: "flex"}}>
            <div className="form-group">
                <SelectDropDown
                setOpen={setOpenCurrencyType}
                open={openCurrencyType}
                onChange={(value) => (value)}
                placeholder="Select Currency"
                options={[
                    { label: "Week 1", value: "By Date" },
                    { label: "Week 2", value: "By Date" },
                    { label: "Week 3", value: "By Date" },
                ]}
                />
            </div>
        </div>

      },
   
       ]
   
       data.push(item)
   
   }
  }
  return (
   
      <DataTable headers={headers} data={[...data]} totalCount={totalCount} onChangePage={onChangePage} paginator={true}  />
   
  );
};

export default LogKriTable;
