import { useState } from "react";
import { VerticalSpacer } from "../..";
import { Button, IconButton } from "../../../Buttons";
import { DateRangePicker } from "../../../DatePicker/rangePicker";
import { Dropdown, DropdownContentContaner, SelectDropDown } from "../../../DropDown";
import { CalendarIcon } from "../../../Icons";
import { Modal, ModalBody, ModalHeader } from "../../../Modal";
import { ModalItemsContainer } from "../../../Modal/itemCard";

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
interface CreateKriCatProps {
  open:any,
  setopen:any
  data:any
}

const CreateKriCat = (
  {
  open,
  setopen,
  data
}: CreateKriCatProps
) => {
 let retryMsg=false;
 if(data.includes("retry")){
  retryMsg=true;
 }
 const [openStatus, setOpenStatus] = useState(false);
 const [StatusType, setStatusType] = useState("");
 let titleData = "Create KRI Category";
//  const onSubmit = async () => {
//   await dispatch( 
//     userLogin({ email: emails, password: password })  
//   ) .then((response:any) => {
//     const result= response?.payload?.userData?.data
//   if(result?.code==="996" || result?.data?.code==="ERR_NETWORK"){
//     const failedAttempts=result?.data?.failLoginCount
//     const remainingAttempts= 3-parseInt(failedAttempts)
//     let errorMessage="Server is not reachable!!"
//     setMessage(errorMessage)
//     if(remainingAttempts <= 0){
//       navigate('/locked-out', {state: emails});
//     }else{
//       errorMessage="!Invalid Password. You have only " + remainingAttempts + " attempt left."
//       setMessage(errorMessage);
//       navigate('/login');
//     }
//   }
//   if(result?.code==="00"){
//       loginSucessfull(result)
//   }
// }
// );
// }
  return (
    <>
    {/* {retryMsg && <div className="popupSpacer">Retry request scheduled successfully.<br/><sub>Note: It would be processed in next run of posting service.</sub></div>}
    {!retryMsg && <div className="popupSpacer">Requery response received successfully.<br/><sub>Note: Transaction response code and description has been updated.</sub></div>} */}
      <Modal show={open} position="right" width="60%" onClose={() => setopen(false)}>
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
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="">Category Name</label>
                      <input type="text" className="form-control" id="" placeholder="Enter Detail" name="" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="">Number Of Indicator</label>
                      <input type="number" className="form-control" id="" placeholder="Enter Detail" name="" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="">Status</label>
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
                </div>
                <div className="row mt-2">
                  <div className="col-2">
                    <Button variant="contained">Create</Button>
                  </div>
                  <div className="col-2">
                    <Button variant="outlined" onClick={() => setopen(false)}>Cancel</Button>
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

export default CreateKriCat;