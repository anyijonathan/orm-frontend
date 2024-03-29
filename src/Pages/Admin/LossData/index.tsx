import { useState } from "react";
import { Button, IconButton } from "../../../Components/Buttons";
import {
  Dropdown,
  DropdownContentContaner,
  SelectDropDown,
} from "../../../Components/DropDown";
import { AuditIcon, Bell, CalendarIcon, CloudUploadIcon, FileIcon, FilterIcon, GitBranch, GitCommit, GitPullRequest, Layer, Repeat, SettingsBlack, Shuffle } from "../../../Components/Icons";
import {
  PageHeader,
  TableCard,
  TableFiltersContainer,
} from "../../../Components/PageShared";
//import styles from "../../../Assets/Styles/global.scss";
import { DateRangePicker } from "../../../Components/DatePicker/rangePicker";
import styles from "../../../Assets/Styles/Component/table.module.scss";
import { useNavigate } from "react-router-dom";
import LossDataTable from "./lossDataTable";
type MyData = {
  id: number;
  name: string;
  completeddate: string;
};

const LossDataIndex = () => {
 
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openDatePickerTo, setOpenDatePickerTo] = useState(false);
  const [openTypeType, setOpenTypeType] = useState(false);
  const [TypeType, setTypeType] = useState("");
  const [data, setData] = useState<MyData[]>([]);
  const [requestID, setRequestID] = useState("");
  const [totalCount, setTotalCount] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [paginator, setpaginator] = useState(true);
  const navigate = useNavigate();
  const handlePaginationChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  const handleClick = () => {
   // setPageNumber(pageNumber);
  };
  const setOpenCreateLossdata = () => {
    const url='/lossdata';
    return navigate(`/admin${url}`, {
      state:[{action:'create'},{type:"create"}]
    })
    // setPageNumber(pageNumber);
   };
  

  return (
    <>
    <PageHeader title="Loss Data"></PageHeader>
    <TableCard>
      <TableFiltersContainer>
        <div className="tableHeaderDetails transResp">
          <div className="details">
            <h3 className="title">Loss Data List</h3>
            <div>
              <p className={styles?.title}>Total Count: {totalCount}</p>
            </div>
          </div>
          <div className="elementsRight">
                <div className="row gx-3">
                    <div className="col-auto">
                        <Button color="purple" variant="export">Export</Button>
                    </div>
                    <div className="col-auto">
                        <Button color="primary" variant="contained" onClick={() => { setOpenCreateLossdata()}}>
                            Log Loss Data
                        </Button>
                    </div>
                </div>
            </div>
        </div>
      </TableFiltersContainer>
      <TableFiltersContainer>
          <div className="filterBar">
            <div className="mb-2">
              <strong>Filter Search</strong>
            </div>
            <div className="row">
              <div className="col-auto">
                <input type="text" className="form-control" id="" placeholder="Loss Type" name="" />
              </div>
              <div className="col-auto">
                <input type="text" className="form-control" id="" placeholder="Role Type" name="" />
              </div>
              <div className="col-auto">
                <SelectDropDown
                    setOpen={setOpenTypeType}
                    open={openTypeType}
                    onChange={(value) => setTypeType(value)}
                    placeholder="Status"
                    selectedValue={TypeType}
                    options={[
                    { label: "By Date", value: "By Date" },
                    { label: "By Date", value: "By Date" },
                    { label: "By Date", value: "By Date" },
                    ]}
                />
              </div>
              <div className="col-auto">
                <Button>Search</Button>
              </div>
              <div className="col-auto">
                <IconButton
                    icon={<FilterIcon />}
                    buttonTitle="Clear Filter"
                    variant="textIconButtonOnly"
                  />
              </div>
            </div>
          </div>
        </TableFiltersContainer>
      <LossDataTable
        props={data}
        request={requestID}
        totalCount={totalCount}
        onChangePage={handlePaginationChange}
        paginator={paginator}
      />
    </TableCard>
  </>
  );
};
export default LossDataIndex;
