import { useId, useState } from "react";
import { BackButton, Button, IconButton } from "../../../../Components/Buttons";
import {
  PageHeader,
  TableCard,
  TableFiltersContainer,
} from "../../../../Components/PageShared";
import "../../../../Assets/Styles/global.scss";
import styles from "../../../Assets/Styles/pageShared.module.scss";
import { Dropdown, DropdownContentContaner, SelectDropDown } from "../../../../Components/DropDown";
import { DateRangePicker } from "../../../../Components/DatePicker/rangePicker";
import { CalendarIcon } from "../../../../Components/Icons";
import { useNavigate } from "react-router-dom";
import LogKriTable from "./logKriTable";
    

const LogKriData = () => {
  const [openDateOfOccurrence, setOpenDateOfOccurrence] = useState(false);
  const [openIndicator, setOpenIndicator] = useState(false);
  const [IndicatorType, setIndicatorType] = useState("");
  const [openFrequency, setOpenFrequency] = useState(false);
  const [FrequencyType, setFrequencyType] = useState("");
  const [openCurrency, setOpenCurrency] = useState(false);
  const [CurrencyType, setCurrencyType] = useState("");
  const [openDepartment, setOpenDepartment] = useState(false);
  const [DepartmentType, setDepartmentType] = useState("");
  const [openStaff, setOpenStaff] = useState(false);
  const [StaffType, setStaffType] = useState("");
  const postTextAreaId = useId();
  const navigate = useNavigate();
  const [data, setData] = useState<MyData[]>([]);
    const [requestID, setRequestID] = useState("");
    const [totalCount, setTotalCount] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [paginator, setpaginator] = useState(true);
    const handlePaginationChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
    // fetchData(pageNumber);
    };
    type MyData = {
    id: number;
    name: string;
    completeddate: string;
    };
  return (
    <>
      <BackButton navigate={navigate}></BackButton>
      <PageHeader title="Log KRI Data"></PageHeader>
      <div className="pageCard">
        <div className="pageCardHeader">
          <strong>KRI <span className="hihglightBranchName">Branch Name</span></strong>
          <p>Please fill the data input and ensure the information is correct before submitting.</p>
        </div>
        <div className="row">
          <div className="col">
            <LogKriTable
            props={data}
            request={requestID}
            totalCount={totalCount}
            onChangePage={handlePaginationChange}
            paginator={paginator}
            />
          </div>
        </div>
        <div className="btnGroup">
          <div className="row">
            <div className="col-auto">
              <Button variant="contained">Submit</Button>
            </div>
            <div className="col-auto">
              <Button variant="outlined" color="neutral">Cancel</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LogKriData;
