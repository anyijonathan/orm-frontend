import { useState } from "react";
import { Button, IconButton } from "../../../Components/Buttons";
import { Dropdown, DropdownContentContaner, SelectDropDown } from "../../../Components/DropDown";
import { PageHeader, TableCard, TableFiltersContainer } from "../../../Components/PageShared";
import { CalendarIcon, FilterIcon, ReportSearchIcon } from "../../../Components/Icons";
import { DateRange } from "@mui/icons-material";
import { DateRangePicker } from "../../../Components/DatePicker/rangePicker";
import ReportsTable from "./reportsTable";

const ReportsIndex = () => {
    const [openTypeType, setOpenTypeType] = useState(false);
    const [openBranches, setOpenBranches] = useState(false);
    const [openReport, setOpenReport] = useState(false);
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [openDatePickerTo, setOpenDatePickerTo] = useState(false);
    function setMaxDate(max: string) {
        throw new Error("Function not implemented.");
    }

    return(
        <>
        <PageHeader title="KRI"></PageHeader>
        <TableCard>
            <TableFiltersContainer>
                <div className="tableHeaderDetails transResp">
                    <div className="details">
                        <h3 className="title">Generate Report Type</h3>
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
                    <SelectDropDown
                                    setOpen={setOpenBranches}
                                    open={openBranches}
                                    placeholder="Status"
                                    selectedValue="Select Branch"
                                    options={[
                                        { label: "Select Branch", value: "Active" },
                                        { label: "Inactive", value: "Inactive" },
                                        { label: "Locked", value: "Locked" },
                                        // { label: "By Date", value: "By Date" },
                                    ]} onChange={function (value: string): void {
                                        throw new Error("Function not implemented.");
                                    } }                        />
                    </div>
                    
                    <div className="col-auto">
                    <SelectDropDown
                                    setOpen={setOpenReport}
                                    open={openReport}
                                    placeholder="Status"
                                    selectedValue="Select Report Type"
                                    options={[
                                        { label: "Select Report Type", value: "Active" },
                                        { label: "Inactive", value: "Inactive" },
                                        { label: "Locked", value: "Locked" },
                                        // { label: "By Date", value: "By Date" },
                                    ]} onChange={function (value: string): void {
                                        throw new Error("Function not implemented.");
                                    } }                        />
                    </div>
                    
                    <div className="col-auto">
                    <Dropdown
                  externalToggle={true}
                  handleClose={() => setOpenDatePicker(false)}
                  open={openDatePicker}
                  contentWidth={true}
                  content={
                    <DropdownContentContaner>
                      <DateRangePicker close={function (): void {
                              throw new Error("Function not implemented.");
                          } } onApply={function (selectedDates: Date[]): void {
                              throw new Error("Function not implemented.");
                          } }                      />
                    </DropdownContentContaner>
                  }
                >
                  <IconButton
                    icon={<CalendarIcon />}
                    buttonTitle="Select Date"
                    onClick={() => setOpenDatePicker(!openDatePicker)}
                  />
                </Dropdown>
                    </div>
                    <div className="col-auto">
                        <Button>Generate</Button>
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
            <div className="text-center" style={{padding: '50px'}}>
                <ReportSearchIcon />
                <p><strong>Welcome To Report</strong></p>
                <p>Please input parameters into one or more fields above to generate data</p>
            </div>
        </TableCard>
        <TableCard>
            <TableFiltersContainer>
                    <div className="tableHeaderDetails transResp">
                        <div className="details">
                        <h3 className="title">All Reports</h3>
                        </div>
                        <div>
                            <div className="row gx-3">
                                <div className="col-auto">
                                    <Button color="purple" variant="export">Export</Button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </TableFiltersContainer>
                <div className="samWidth">
                    <ReportsTable props={undefined} request={undefined} totalCount={0} onChangePage={function (page: number): void {
                        throw new Error("Function not implemented.");
                    } } paginator={false} />
                </div>
        </TableCard>
        </>
    );
};

export default ReportsIndex;
