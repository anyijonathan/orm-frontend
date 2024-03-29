import { useState } from "react";
import { Button, IconButton } from "../../../Components/Buttons";
import { DateRangePicker } from "../../../Components/DatePicker/rangePicker";
import {
  Dropdown,
  DropdownContentContaner,
  SelectDropDown,
} from "../../../Components/DropDown";
import { CalendarIcon, FilterIcon } from "../../../Components/Icons";
import {
  PageHeader,
  TableCard,
  TableFiltersContainer,
} from "../../../Components/PageShared";
import "../../../Assets/Styles/global.scss?inline";
import KriTable from "./kriTable";
import CreateKriCat from "../../../Components/PageShared/Admin/DetailedView/CreateKriCategory";
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

const KriCategory = () => {
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

  return (
    <>
      <PageHeader title="KRI Category"></PageHeader>
      <TableCard>
        <TableFiltersContainer>
          <div className="tableHeaderDetails transResp">
            <div className="details">
              <h3 className="title">Category List</h3>
              <div>
                <p className="subtitle">Total Count: {totalCount}</p>
              </div>
            </div>
            <div>
              <IconButton
                icon={<></>}
                buttonTitle="Create New Category"
                onClick={() => { setopenCreateKri(true);}}
              />
              {openCreateKri && <CreateKriCat open={openCreateKri} setopen={setopenCreateKri} data={ "msg" } />}
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
                <input type="text" className="form-control" id="" placeholder="Company Name" name="" />
              </div>
              <div className="col-auto">
                <input type="text" className="form-control" id="" placeholder="Status" name="" />
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
        <KriTable
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
export default KriCategory;
