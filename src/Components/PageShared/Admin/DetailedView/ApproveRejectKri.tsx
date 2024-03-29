import { useState } from "react";
import { VerticalSpacer } from "../..";
import { Button, IconButton } from "../../../Buttons";
import { DateRangePicker } from "../../../DatePicker/rangePicker";
import { Dropdown, DropdownContentContaner, SelectDropDown } from "../../../DropDown";
import { CalendarIcon } from "../../../Icons";
import { Modal, ModalBody, ModalHeader } from "../../../Modal";
import { ModalItemsContainer } from "../../../Modal/itemCard";
import { useId } from 'react';

interface CreateKriProps {
  open:any,
  setopen:any
  data:any
}

const ApproveRejectKri = (
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
 const [openCat, setOpenCat] = useState(false);
 const [openFrequency, setOpenFrequency] = useState(false);
 const [openMonth, setOpenMonth] = useState(false);
 const [AfType, setAfType] = useState("");
 const [CatType, setCatType] = useState("");
 const [openDateOfCreation, setOpenDateOfCreation] = useState(false);
 const [openDateOfOccurrence, setOpenDateOfOccurrence] = useState(false);
 const postTextAreaId = useId();
 let titleData = "Approve/Reject KRI";
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
              {/* BORM Admin View */}
              <div className="grayBox">
                  <div className="grayBoxHeading">RLO's Detail</div>
                  <div className="row gx-2">
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="">Peroid</label>
                        <div className="viewBoxContent">Jan - Feb</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="">Actual Value</label>
                        <div className="viewBoxContent">200</div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="">Description</label>
                        <div className="viewBoxContent">Lorem Ipsum is dummy text of the printing and typesetting industry, derived from a Latin passage by Cicero. Learn about its history, usage, variations and sources, and how to generate realistic Lorem Ipsum online.</div>
                      </div>
                    </div>
                  </div>
              </div>

              <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor={postTextAreaId}>
                    Your Comments
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
              

                {/* <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="">Approver User Name</label>
                    <input type="text" className="form-control" disabled id="" placeholder="User Name Here" name="" />
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="">Approving Date</label>
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
                    <label htmlFor="">Additional Founds</label>
                    <SelectDropDown
                      setOpen={setOpenStatus}
                      open={openStatus}
                      onChange={(value) => setAfType(value)}
                      placeholder="Select Additional Founds"
                      selectedValue={AfType}
                      options={[
                      { label: "Detail", value: " " },
                      { label: "Detail", value: " " },
                      ]}
                    />
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="">Category</label>
                    <SelectDropDown
                      setOpen={setOpenCat}
                      open={openCat}
                      onChange={(value) => setCatType(value)}
                      placeholder="Select Category"
                      selectedValue={CatType}
                      options={[
                      { label: "Detail", value: " " },
                      { label: "Detail", value: " " },
                      ]}
                    />
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="">Frequency</label>
                    <SelectDropDown
                      setOpen={setOpenFrequency}
                      open={openFrequency}
                      onChange={(value) => setCatType(value)}
                      placeholder="Select Frequency"
                      selectedValue={CatType}
                      options={[
                      { label: "Weekly", value: " " },
                      { label: "Monthly", value: " " },
                      ]}
                    />
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="">If Monthly</label>
                    <SelectDropDown
                      setOpen={setOpenMonth}
                      open={openMonth}
                      onChange={(value) => setCatType(value)}
                      placeholder="Select Month"
                      selectedValue={CatType}
                      options={[
                      { label: "Jan", value: " " },
                      { label: "Feb", value: " " },
                      ]}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                  <label htmlFor={postTextAreaId}>
                    Comments
                  </label>
                  <textarea
                    className=""
                    id={postTextAreaId}
                    name="postContent"
                    rows={4}
                  />
                  </div>
                </div> */}
              </div>
                <div className="row mt-2">
                  <div className="col-auto">
                    <Button variant="contained">Approve</Button>
                  </div>
                  <div className="col-auto">
                    <Button variant="contained" color="error">Reject</Button>
                  </div>
                  <div className="col-auto">
                    <Button variant="outlined" color="neutral">Cancel</Button>
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

export default ApproveRejectKri;