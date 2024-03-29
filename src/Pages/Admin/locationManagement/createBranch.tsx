import { useEffect, useState } from "react";
import { useId } from 'react';
import { Modal, ModalBody } from "../../../Components/Modal";
import { VerticalSpacer } from "../../../Components/PageShared";
import { ModalItemsContainer } from "../../../Components/Modal/itemCard";
import { MailIcon } from "../../../Components/Icons";
import { Button } from "../../../Components/Buttons";
import { useAppStateSelector } from "../../../Services/Store/hooks";
import { Branch } from "@rsuite/icons";
import { SelectDropDown } from "../../../Components/DropDown";


interface CreateProps {
  open:any,
  setopen:any
  data:any
  title:any
  message:string
  btn1:string
  btn2?:string
  onClose: (
    branchTitle: string,
    createdById:number,
    solId:string,
    region:string,
    status:string,
    id:number) => void;
}

const CreateBranch = (
  {
  open,
  setopen,
  data,
  title,
  message,
  btn1,
  btn2,
  onClose,
}: CreateProps
) => {
 const [branch, setBranch] = useState("");
 const [solid, setSolid] = useState("");
 const [id, setId] = useState<number>(0);
 const [region, setRegion] = useState("");
 const [status, setStatus] = useState("");
 const authState:any = useAppStateSelector((state) => state.authState);
 let titleData = title;

 useEffect(()=>{
    if(message==="edit"){
        setBranch(data?.branch);
        setSolid(data?.solId);
        setStatus(data.status)
        setRegion(data?.region);
        setId(data?.id);

    }
 },[]);
 const OkAlert= (event:any) =>{
  onClose(branch,authState?.userData?.data?.data?.userId,solid,region,status,id);
  setopen(false);
 }
 const CancelAlert= (event:any) =>{
  event?.preventDefault();
  setopen(false);
 }

 const [openStatus, setOpenStatus] =  useState(false);

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
                    <div className="row">
                    <div className="col-4">
                    <div className="form-group">
                    <label htmlFor="">Branch Title</label>
                      <input type="text" className="form-control"  placeholder="Enter " name="" 
                      value={branch} 
                      onChange={(e) => setBranch(e.target.value)} required
                      />
                    </div>
                  </div> 

                  {<div className="col-4">
                    <div className="form-group">
                    <label htmlFor="">Sol Id</label>
                      <input type="text" className="form-control"  placeholder="Enter " name="" 
                      value={solid} 
                      onChange={(e) => setSolid(e.target.value)} required
                      disabled={message==="edit"}
                      />
                    </div>
                  </div>}

                  <div className="col-4">
                    <div className="form-group">
                    <label htmlFor="">Region</label>
                      <input type="text" className="form-control"  placeholder="Enter " name="" 
                      value={region} 
                      onChange={(e) => setRegion(e.target.value)} required
                      />
                    </div>
                  </div>

                  {message==="edit" && <div className="col-4">
                    <div className="form-group">
                    <label htmlFor="">Status</label>
                    <SelectDropDown
                    setOpen={setOpenStatus}
                    open={openStatus}
                    onChange={(value) => setStatus(value)}
                    placeholder="Select"
                    selectedValue={status}
                    options={[
                    { label: "Active", value: "Active" },
                    { label: "Inactive", value: "Inactive" },
                    ]}
                />
                    </div>
                  </div>}
                    </div>
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
          </form>
        </ModalBody>
    </Modal>       
    </>
  );
};

export default CreateBranch;