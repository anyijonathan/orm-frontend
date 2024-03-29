import { useState } from "react";
// import  "../../../Assets/Styles/global.scss";
import { any } from "jest-mock-extended";
import { useNavigate } from "react-router-dom";
import { PageHeader, TableCard, TableFiltersContainer } from "../../../../Components/PageShared";
import { Button, IconButton } from "../../../../Components/Buttons";
import { FileIcon, FilterIcon } from "../../../../Components/Icons";
import CreateKri from "../createKri";
import { SelectDropDown } from "../../../../Components/DropDown";
import RloTableKri from "./rloTableKri";
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

const KRIRloHome = () => {
  const navigate = useNavigate();
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
  const [openCreateKri, setOpenCreateKri] = useState(false);
  const handleCreateKriClick = () => {
    const url='/create-kri';
     navigate(`/admin${url}`);
  };
  const handleCreateKriData = () => {
    const url='/create-kri-data';
     navigate(`/admin${url}`);
  };
  return (
    <>
      <PageHeader title="KRI"></PageHeader>
      <TableCard>
        <TableFiltersContainer>
          <div className="tableHeaderDetails transResp">
            <div className="details">
              <h3 className="title">KRI List</h3>
              <div>
                <p className="subtitle">Total Count: {totalCount}</p>
              </div>
            </div>
            <div>
                <div className="row gx-3">
                    <div className="col-auto">
                        <IconButton
                            icon={<FileIcon />}
                            buttonTitle="Export"
                        />
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
                <input type="text" className="form-control" id="" placeholder="Curency" name="" />
              </div>
              <div className="col-auto">
                <input type="text" className="form-control" id="" placeholder="Amount Involved" name="" />
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
        <RloTableKri
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
export default KRIRloHome;
