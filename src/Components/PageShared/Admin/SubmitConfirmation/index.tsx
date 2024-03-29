import { useState } from "react";
import { useId } from 'react';
import { Modal, ModalBody, ModalHeader } from "../../../Modal";
import { VerticalSpacer } from "../..";
import { ModalItemsContainer } from "../../../Modal/itemCard";
import { Button } from "../../../Buttons";
import { MailIcon } from "../../../Icons";


interface SubmitConfirmationProps {
    open:any,
    setopen:any,
    title?:any,
    onClose: (result: string) => void;
  }

const SubmitConfirmation = (
  {
  open,
  setopen,
  title,
  onClose
}: SubmitConfirmationProps
) => {
 
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
      <Modal show={open} maxwidth="auto" onClose={() => setopen(false)}>
        <ModalBody>
          <form>
            <VerticalSpacer size={14} />
            <ModalItemsContainer>
                <div className="row">
                  <div className="col-12">
                    <div className="text-center">
                    <MailIcon />
                    <VerticalSpacer size={20} />
                    </div>
                    <h3  className="text-center">Alert</h3>
                    <VerticalSpacer size={14} />
                    <p className="text-center">Please confirm if you would like to {title} RCSA report.</p>
                  </div>
                </div>
                <div className="row mt-2 align-self-center">
                  <div className="col-auto">
                    <Button variant="outlined" color="neutral" onClick={CancelAlert}>Cancel</Button>
                  </div>
                  <div className="col-auto">
                    <Button variant="contained" onClick={OkAlert}>OK</Button>
                  </div>
                </div>
            </ModalItemsContainer>
          </form>
        </ModalBody>
    </Modal>       
    </>
  );
};

export default SubmitConfirmation;