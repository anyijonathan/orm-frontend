import { useState } from "react";
import { useId } from 'react';
import { Modal, ModalBody, ModalHeader } from "../../../Components/Modal";
import { VerticalSpacer } from "../../../Components/PageShared";
import { ModalItemsContainer } from "../../../Components/Modal/itemCard";

interface CreateKriProps {
  open:any,
  setopen:any
  data:any
}

const ViewUserDetail = (
  {
  open,
  setopen,
  data
}: CreateKriProps
) => {
 let retryMsg=false;
 const [openStatus, setOpenStatus] = useState(false);
 const [StatusType, setStatusType] = useState("");
 const [openDateOfCreation, setOpenDateOfCreation] = useState(false);
 const [openDateOfOccurrence, setOpenDateOfOccurrence] = useState(false);
 const postTextAreaId = useId();
 let titleData = "View User";
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
              <div className="grayBox">
                <div className="row gx-2">
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="">User Name</label>
                      <div className="viewBoxContent">{data.userName?.toString()}</div>
                    </div>
                  </div>
                  {/* <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="">Email</label>
                      <div className="viewBoxContent">{data.emailId?.toString()}</div>
                    </div>
                  </div> */}
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="">Branch</label>
                      <div className="viewBoxContent">{data.branch?.toString()}</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="">Department</label>
                      <div className="viewBoxContent" style={{ wordWrap: "break-word", wordBreak: "break-all" }}>{data.department?.toString()}</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="">Status</label>
                      <div className="viewBoxContent">{data.status?.toString()}</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="">Assigned Role</label>
                      <div className="viewBoxContent">{data.userRole?.toString()}</div>
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

export default ViewUserDetail;