// import React from "react";
import React, { useState } from "react";
import { Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import FieldInputText from "../atoms/FieldInputText";
import {
  Dropdown,
  DropdownContentContaner,
  SelectDropDown,
} from "../../DropDown";
import { CalendarIcon } from "@mui/x-date-pickers";
// import { DateRangePicker } from "@mui/lab";
import { Button, IconButton } from "../../../Components/Buttons";
import { DateRangePicker } from "../../../Components/DatePicker/rangePicker";
import { VerticalSpacer } from "../../PageShared";

function FormTwo() {
  const { control } = useFormContext();
  const [openAmountInvolved, setAmountInvolved] = useState(false);
  const [StatusType, setStatusType] = useState("");
  const [openSelectMetrics, setSelectMetrics] = useState(false);
  const [SelectMetricsType, setSelectMetricsType] = useState("");
  const [openMitigationPlan, setMitigationPlan] = useState(false);
  const [MitigationPlanType, setMitigationPlanType] = useState("");
  const [openDatePicker, setOpenDatePicker] = useState(false);
  return (
    <div>
    <VerticalSpacer size={20} />
    <h5>KRI Name</h5>
    <VerticalSpacer size={20} />
    <div className="row">
      <div className="col-3">
        <div className="form-group">
          <label htmlFor="">Date of Occurrence</label>
          <Dropdown
            externalToggle={true}
            handleClose={() => setOpenDatePicker(false)}
            open={openDatePicker}
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
              buttonTitle="From Date"
              iconPosition="right"
              onClick={() => setOpenDatePicker(!openDatePicker)}
            />
          </Dropdown>
        </div>
      </div>
      
      <div className="col-3">
        <div className="form-group">
          <label htmlFor="">Number/Percentage</label>
          <input
            type="number"
            className="form-control"
            id=""
            placeholder="Add Number/Percentage"
            name=""
          />
        </div>
      </div>
      <div className="col-3">
          <div className="form-group">
              <label htmlFor="">Amount INvolved</label>
              <input
                type="number"
                className="form-control"
                id=""
                placeholder="Enter"
                name=""
              />
            </div>
          </div>
      <div className="col-6">
            <div className="form-group">
              <label htmlFor="">Mitigation Plan</label>
              <textarea
                className=""
                id=""
                name="postContent"
                rows={4}
                placeholder="Enter Description"
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="">Detailed Description Of Incident</label>
              <textarea
                className=""
                id=""
                name="postContent"
                rows={4}
                placeholder="Enter Description"
              />
            </div>
          </div>
      
    </div>
  
</div>
  );
}

export default FormTwo;
