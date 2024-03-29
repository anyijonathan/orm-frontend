import { useState } from "react";

import {
  PageHeader,
  TableCard,
  TableFiltersContainer,
} from "../../../Components/PageShared";
import { SummaryCard } from "../../../Components/SummaryCard";
import { useNavigate } from "react-router-dom";
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

const UserRoleManagementDashboard = () => {
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
  const [paginator, setpaginator] = useState(true);
  const handlePaginationChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
    // fetchData(pageNumber);
  };
  const [openCreateKri, setopenCreateKri] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = (type: string,) => {    
    const url='/user-management';
    return navigate(`/admin${url}`,)
  };
  const handleNavigate2 = (type: string,) => {    
    const url='/role-management';
    return navigate(`/admin${url}`,)
  };

  return (
    <>
      <PageHeader title="User & Role Management"></PageHeader>
      <div className="row">
        <div className="col-3">
         <SummaryCard title={"All Active Users"} count={100} onClick={() => handleNavigate("user-management")} />
        </div>
        <div className="col-3">
         <SummaryCard title={"All Active Roles"} count={40} onClick={() => handleNavigate2("role-management")} />
        </div>
      </div>
    </>
  );
};
export default UserRoleManagementDashboard;
