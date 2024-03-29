import { useState } from "react";

import { PageHeader, TableCard, TableFiltersContainer } from "../../../../Components/PageShared";
import { SelectDropDown } from "../../../../Components/DropDown";
import { Radio } from "../../../../Components/Radio";
import styles from "../../../../Assets/Styles/Component/table.module.scss";
import { CheckBox } from "../../../../Components/Checkbox";
import { Button } from "../../../../Components/Buttons";
import Example from "./tableGroupingPage";
import EditTableRole from "./editTableGrouping";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppStateSelector } from "../../../../Services/Store/hooks";
import { CreateRoleAction } from "../../../../Services/Actions/userAction";

type MyData = {
  id: number;
  name: string;
  completeddate: string;
};
type IParameters = {
  PageNumber: number;
  RequestId: String;
  minDate: string;
  maxDate: string;
};

const CreateNewRole = () => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openDatePickerTo, setOpenDatePickerTo] = useState(false);
  const [TypeType, setTypeType] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString("fr-FR"));
  const [openTypeType, setOpenTypeType] = useState(false);
  const [minDate, setMinDate] = useState(
    new Date().toLocaleDateString("fr-FR")
  );
  const [maxDate, setMaxDate] = useState(
    new Date().toLocaleDateString("fr-FR")
  );
  const [data, setData] = useState<MyData[]>([]);
  const [requestID, setRequestID] = useState("");
  const [totalCount, setTotalCount] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [openIsActive, setOpenIsActive] = useState(false);

 const [StatusType, setStatusType] = useState("");
 const [isRoleCreated, setIsRoleCreated ] = useState(false);

  const handlePaginationChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
    // fetchData(pageNumber);
  };
  const [openCreateNewRole, setOpenCreateNewRole] = useState(false);
  const [ roleTitle, setRoleTitle ] = useState('');
  const [ roleData, setRoleData ] = useState([]);

  const dispatch = useAppDispatch();
  const authState:any = useAppStateSelector((state) => state.authState)

  // const { state } = useLocation();

  // const roleData = state[0]?.RoleData;

  const CreateNewRolebtn = (event:any) => {
    setRoleTitle(event.target.value)
  };
  const CreateRolebtn= async() => {
      let createdBy:string= authState?.userData?.data?.data?.userName;
    await dispatch(
      CreateRoleAction({roleTitle, createdBy})
      ).then((response:any) => {
        let result=response?.payload?.requestData?.data;
        console.log("role result: ",result);
        if(result.code === "00"){
          setRoleData(result.data)
          setIsRoleCreated(true);
        }
      }
      )};
  return (
    <>
      <PageHeader title="Create New Role"></PageHeader>
      <div className="row">
        <div className="col-4">
            <div className="form-group">
                <label htmlFor="">Role Title</label>
                <input type="text" className="form-control" id="" onChange={CreateNewRolebtn} placeholder="Enter Role Title" value={roleTitle}  name="" required />
            </div>
            </div>
            <div className="col-auto align-self-center">
            <Button variant="contained" onClick={CreateRolebtn}>Create</Button>
            </div>            
      </div>
     
{isRoleCreated &&
      <TableCard>
        <EditTableRole roleData= {roleData} roleTitle={roleTitle}/>
      </TableCard>}
   
    </>
  );
};
export default CreateNewRole;
