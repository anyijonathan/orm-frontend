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


const CreateKriData = () => {
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
  return (
    <>
      <BackButton navigate={navigate}></BackButton>
      <PageHeader title="Log KRI Data"></PageHeader>
      <div className="pageCard">
        <div className="pageCardHeader">
          <strong>Enter KRI detail</strong>
          <p>Please fill the data input and ensure the information is correct before submitting.</p>
        </div>
        <div className="grayBox">
          <div className="grayBoxHeading">KRI Detail</div>
          <div className="row gx-2">
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">KRI Reference ID</label>
                <div className="viewBoxContent">1232131231</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">KRI Category</label>
                <div className="viewBoxContent">534545</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Metric Name</label>
                <div className="viewBoxContent">Metric Name</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Currency</label>
                <div className="viewBoxContent">USD</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Branch</label>
                <div className="viewBoxContent">Lagos</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Department</label>
                <div className="viewBoxContent">Lagos</div>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="">Region</label>
                <div className="viewBoxContent">Lagos</div>
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <label htmlFor="">Description</label>
                <div className="viewBoxContent">
                  <p>Lorem Ipsum is dummy text of the printing and typesetting industry, derived from a Latin passage by Cicero. Learn about its history, usage, variations and sources, and how to generate realistic Lorem Ipsum online.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="">Period</label>
              <Dropdown
                externalToggle={true}
                handleClose={() => setOpenDateOfOccurrence(false)}
                open={openDateOfOccurrence}
                contentWidth={true}
                content={
                  <DropdownContentContaner>
                    <DateRangePicker
                      close={function (): void {
                        throw new Error("Function not implemented.");
                      }}
                      onApply={function (selectedDates: Date[]): void {
                        throw new Error("Function not implemented.");
                      }}
                    />
                  </DropdownContentContaner>
                }
              >
                <IconButton
                  icon={<CalendarIcon />}
                  buttonTitle="Select Date"
                  onClick={() => setOpenDateOfOccurrence(!openDateOfOccurrence)}
                />
              </Dropdown>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="">Actual Value</label>
              <input type="number" className="form-control" id="" placeholder="Enter Detail" name="" />
            </div>
          </div>
                
          <div className="col-8">
            <div className="form-group">
                <label htmlFor={postTextAreaId}>
                  Root Cause
                </label>
                <textarea
                  className=""
                  id={postTextAreaId}
                  name="postContent"
                  rows={4}
                  placeholder="Enter Detail"
                />
            </div>
          </div>
        </div>
        <div className="btnGroup">
          <div className="row">
            <div className="col-auto">
              <Button variant="contained">Submit</Button>
            </div>
            <div className="col-auto">
              <Button variant="outlined">Save</Button>
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
export default CreateKriData;
