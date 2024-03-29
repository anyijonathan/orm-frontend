import { useState } from "react";
import { useId } from 'react';
import { Modal, ModalBody, ModalHeader } from "../../../Modal";
import { VerticalSpacer } from "../..";
import { ModalItemsContainer } from "../../../Modal/itemCard";
import { Button } from "../../../Buttons";
import { MailIcon } from "../../../Icons";


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

const AlertBox = (
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
 let retryMsg=false;
 if(data.length>0 && data?.includes("retry")){
  retryMsg=true;
 }
 const [openIsActive, setOpenIsActive] = useState(false);
 const [openAssignedRole, setOpenAssignedRole] = useState(false);
 const [StatusType, setStatusType] = useState("");
 const [AssignedRole, setAssignedRole] = useState("");
 const [openDateOfCreation, setOpenDateOfCreation] = useState(false);
 const [openDateOfOccurrence, setOpenDateOfOccurrence] = useState(false);
 const postTextAreaId = useId();
 let titleData = title;
 const OkAlert= (event:any) =>{
  event?.preventDefault();
  onClose('ok');
  setopen(false);
 }
 const CancelAlert= (event:any) =>{
  event?.preventDefault();
  onClose('cancel');
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
                    <MailIcon />
                    <VerticalSpacer size={20} />
                    </div>
                    <h3  className="text-center">{titleData}</h3>
                    <VerticalSpacer size={14} />
                    <p className="text-center">{message}</p>
                  </div>
                </div>
                <div className="row mt-2 align-self-center">
                { btn2 !== "" && <div className="col-auto">
                    <Button variant="outlined" color="neutral" onClick={CancelAlert}>{btn2}</Button>
                  </div>
                  }
                  <div className="col-auto">
                  <Button variant="contained" onClick={OkAlert}>{btn1}</Button>
                  </div>
                </div>
            </ModalItemsContainer>
            {/* <ModalItemsContainer>
                <div className="row">
                  <div className="col-12">
                    <p className="text-center">{message}</p>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-auto">
                    <Button variant="contained" onClick={OkAlert}>{btn1}</Button>
                  </div>
                  <div className="col-auto">
                  <Button variant="outlined" color="neutral" onClick={CancelAlert}>{btn2}</Button>
                  </div>
                </div>
            </ModalItemsContainer> */}
          </form>
        </ModalBody>
    </Modal>       
    </>
  );
};

export default AlertBox;