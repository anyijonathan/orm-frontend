import { useState } from "react";
import { useId } from 'react';
import { Modal, ModalBody, ModalHeader } from "../../../Modal";
import { VerticalSpacer } from "../..";
import { ModalItemsContainer } from "../../../Modal/itemCard";
import { Button } from "../../../Buttons";
import { AlertCircle, AlertCircle2, CircleCheck, CircleCheck2, MailIcon } from "../../../Icons";


interface CreateKriProps {
  open:any,
  setopen:any
  data:any
  title:any
  message:string
  btn1:string
  btn2?:string
  onClose: (result: string) => void;
}

const ApproveRejectModal = (
  {
  open,
  setopen,
  data,
  title,
  message,
  btn1,
  btn2,
  onClose,
}: CreateKriProps
) => {
 const [openIsActive, setOpenIsActive] = useState(false);
 const [openAssignedRole, setOpenAssignedRole] = useState(false);
 const [AssignedRole, setAssignedRole] = useState("");
 const [openDateOfCreation, setOpenDateOfCreation] = useState(false);
 const [openDateOfOccurrence, setOpenDateOfOccurrence] = useState(false);
 const postTextAreaId = useId();

 const [comment, setComment] = useState("");
 let titleData = title;
 const OkAlert= (event:any) =>{
  // event?.preventDefault();
  onClose(comment);
  setopen(false);
 }
 const CancelAlert= (event:any) =>{
  event?.preventDefault();
  onClose('');
  setopen(false);
 }
  return (
    <>
      <Modal show={open} width="30%" onClose={() => setopen(false)}>
        <ModalBody>
          {/* <ModalHeader
            title={titleData}
            subtitle=""
            onClose={() => setopen(false)}
          /> */}
          <form>
            <VerticalSpacer size={14} />
            <ModalItemsContainer>
                <div className="row">
                  <div className="col-12">
                    <div className="text-center">
                     <AlertCircle2 />
                     <CircleCheck2 />
                    <VerticalSpacer size={20} />
                    </div>
                    <h3  className="text-center">{titleData}</h3>
                    <VerticalSpacer size={14} />
                    <p className="text-center">{message}</p>
                  </div>
                  <div className="col-12 mt-4">
                    <div className="form-group">
                    <label htmlFor={postTextAreaId}>
                        Your Comments
                    </label>
                    <textarea
                        className=""
                        id={postTextAreaId}
                        name="postContent"
                        rows={4}
                        placeholder="Enter Reason"
                        onChange={(e)=>setComment(e.target.value)}
                    />
                    </div>
                  </div>
                </div>
                <div className="row mt-2 align-self-center">
                { btn2 !== "" && <div className="col-auto">
                    <Button variant="outlined" color="neutral" onClick={CancelAlert}>{btn2}</Button>
                  </div>
                  }
                  <div className="col-auto">
                  <Button variant="contained" disabled={comment === ""} onClick={OkAlert}>{btn1}</Button>
                  </div>
                </div>
            </ModalItemsContainer>
           
          </form>
        </ModalBody>
    </Modal>       
    </>
  );
};

export default ApproveRejectModal;