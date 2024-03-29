import { useState } from "react";
import { VerticalSpacer } from "../..";
import { Button, IconButton } from "../../../Buttons";
import { DateRangePicker } from "../../../DatePicker/rangePicker";
import { Dropdown, DropdownContentContaner, SelectDropDown } from "../../../DropDown";
import { CalendarIcon } from "../../../Icons";
import { Modal, ModalBody, ModalHeader } from "../../../Modal";
import { ModalItemsContainer } from "../../../Modal/itemCard";
import { useId } from 'react';
/**
  * <summary>
  * creates the header and data format for the detialed view table
  * </summary>
  * <param name="open, setopen, data, request, totalCount">
  * </param> 
  * <returns>
  * Formatted table data and is called by index page of DetailedView
  * </returns> 
  */
interface CreateKriProps {
  open:any,
  setopen:any
  data:any
}

const CreateKri = (
  {
  open,
  setopen,
  data
}: CreateKriProps
) => {
 let retryMsg=false;
 if(data.includes("retry")){
  retryMsg=true;
 }
 const [openStatus, setOpenStatus] = useState(false);
 const [StatusType, setStatusType] = useState("");
 const [openDateOfCreation, setOpenDateOfCreation] = useState(false);
 const [openDateOfOccurrence, setOpenDateOfOccurrence] = useState(false);
 const postTextAreaId = useId();
 let titleData = "Create KRI";
  return (
    <>
      <Modal show={open} width="60%" onClose={() => setopen(false)}>
        <ModalBody>
          <ModalHeader
            title={titleData}
            subtitle=""
            onClose={() => setopen(false)}
          />
          <form>
            <VerticalSpacer size={14} />
            <ModalItemsContainer>
                <div className="row">
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="">User Name</label>
                      <input type="text" className="form-control" disabled id="" placeholder="User Name Here" name="" />
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="">Number Of Indicator</label>
                      <Dropdown
                        externalToggle={true}
                        handleClose={() => setOpenDateOfCreation(false)}
                        open={openDateOfCreation}
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
                          onClick={() => setOpenDateOfCreation(!openDateOfCreation)}
                        />
                      </Dropdown>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="">Currency</label>
                      <SelectDropDown
                        setOpen={setOpenStatus}
                        open={openStatus}
                        onChange={(value) => setStatusType(value)}
                        placeholder="Select Currency"
                        selectedValue={StatusType}
                        options={[
                        { label: "Active", value: " " },
                        { label: "Inactive", value: " " },
                        ]}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="">NO Of Incidents</label>
                      <input type="number" className="form-control" id="" placeholder="Enter Detail" name="" />
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="">Amount Involved</label>
                      <input type="number" className="form-control" id="" placeholder="Enter Detail" name="" />
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="">Date Of Occurrence</label>
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
                  <div className="col-12">
                    <div className="form-group">
                    <label htmlFor={postTextAreaId}>
                      Details Of Incident
                    </label>
                    <textarea
                      className=""
                      id={postTextAreaId}
                      name="postContent"
                      rows={4}
                    />
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-2">
                    <Button variant="contained">Create</Button>
                  </div>
                  <div className="col-2">
                    <Button  color="neutral" variant="outlined" onClick={() => setopen(false)}>Cancel</Button>
                  </div>
                </div>
            </ModalItemsContainer>
              {}
          </form>
        </ModalBody>
    </Modal>       
    </>
  );
};

export default CreateKri;