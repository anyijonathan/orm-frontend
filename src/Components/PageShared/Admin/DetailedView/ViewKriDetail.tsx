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

const ViewKriDetail = (
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
 let titleData = "View KRI";
  return (
    <>
      <Modal show={open} width="80%" onClose={() => setopen(false)}>
        <ModalBody>
          <ModalHeader
            title={titleData}
            subtitle=""
            onClose={() => setopen(false)}
          />
          <form>
            <VerticalSpacer size={14} />
            <ModalItemsContainer>
              <div className="grayBox">
                <div className="grayBoxHeading">ID's</div>
                <div className="row gx-2">
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">ID</label>
                      <div className="viewBoxContent">1232131231</div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">Kri Indicator ID</label>
                      <div className="viewBoxContent">534545</div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">Kri Metric ID</label>
                      <div className="viewBoxContent">534545</div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">Unit ID</label>
                      <div className="viewBoxContent">534545</div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">Modified By ID</label>
                      <div className="viewBoxContent">534545</div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">Approved By ID</label>
                      <div className="viewBoxContent">534545</div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">Branch ID</label>
                      <div className="viewBoxContent">534545</div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">Reviewer ID</label>
                      <div className="viewBoxContent">534545</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grayBox">
                <div className="grayBoxHeading">Dates</div>
                <div className="row gx-2">
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">Creation Date</label>
                      <div className="viewBoxContent">11-11-2023</div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">Modified Date</label>
                      <div className="viewBoxContent">534545</div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">Approved Date</label>
                      <div className="viewBoxContent">534545</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grayBox">
                <div className="grayBoxHeading">Other Details</div>
                <div className="row gx-2">
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">Category</label>
                      <div className="viewBoxContent">11-11-2023</div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">Frequency</label>
                      <div className="viewBoxContent">534545</div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">Created By</label>
                      <div className="viewBoxContent">534545</div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">Modified By</label>
                      <div className="viewBoxContent">534545</div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">Approved By</label>
                      <div className="viewBoxContent">534545</div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">Is Reviewed</label>
                      <div className="viewBoxContent">534545</div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">Status</label>
                      <div className="viewBoxContent">534545</div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">Is Deleted</label>
                      <div className="viewBoxContent">534545</div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">Reference No</label>
                      <div className="viewBoxContent">534545</div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">Is Nil</label>
                      <div className="viewBoxContent">534545</div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">Is Rlo</label>
                      <div className="viewBoxContent">534545</div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">Unit Name</label>
                      <div className="viewBoxContent">534545</div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">Unit Type Value</label>
                      <div className="viewBoxContent">534545</div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">Unit Type</label>
                      <div className="viewBoxContent">534545</div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">Approval Comment</label>
                      <div className="viewBoxContent">534545</div>
                    </div>
                  </div>
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

export default ViewKriDetail;