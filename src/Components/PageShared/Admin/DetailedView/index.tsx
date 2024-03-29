import { useState } from "react";  
import TableDetailedView from "./tableDetailedView";
import { Modal, ModalBody, ModalHeader } from "../../../Modal";
import { VerticalSpacer } from "../../../PageShared";
import { ModalItemsContainer } from "../../../Modal/itemCard";
import PopupConfirm from "./popupConfirm";
import PopupSuccess from "./popupSuccess";
import CreateKriCat from "./CreateKriCategory";
import RloView from "../../../../Pages/Admin/RloLossData/rloView";

/**
  * <summary>
  * Provides the model for the detailed view Table
  * </summary>
  * <param name="pageNumbers, open ,data, request, totalCount">
  * </param> 
  * <returns>
  * Table with detailed view for data of selected period
  * </returns> 
  */  
export const DetailedViewModal = (
   {open,setOpen,data,request,totalCount,onChangePage,error}:{open: boolean,setOpen: any,data:any,request:any,totalCount:any,onChangePage:any,error?: boolean}
   ,{ size = 140 }: {size?: number }
) => {

 const [pageNumber,setPageNumber]= useState(1);
 let titleData = "You are viewing the detailed view of the transaction for Request ID "+ request;
 const handlePaginationChange = (pageNumbers: number) => {
 if(pageNumber)
  setPageNumber(pageNumbers);
};

  return (
    <Modal show={open} width="80%" onClose={() => setOpen(false)}>
        <ModalBody>
          <ModalHeader
            title={titleData}
            subtitle=""
            onClose={() => setOpen(false)}
          />
          <form>
            <VerticalSpacer size={24} />
            <ModalItemsContainer>
            <TableDetailedView  open={open} setopen={setOpen}  data={data} request={''} totalCount={totalCount} onChangePage={handlePaginationChange}/>
                
            </ModalItemsContainer>
{}
          </form>
        </ModalBody>
    </Modal>
  );
};
export const PopupConfirmModal = (
  {open,setOpen,data,parentCall}:{open: boolean,setOpen: any,data:any,parentCall:any}
  ,{ size = 140 }: {size?: number }
) => {

let titleData = "Alert ";
const sendDataa = (childData:any) => {
  parentCall(childData);
}

 return (
   <Modal show={open} width="37%" onClose={() => setOpen(false)}>
       <ModalBody>
         <ModalHeader
           title={titleData}
           subtitle=""
           onClose={() => setOpen(false)}
         />
         <form>
           <VerticalSpacer size={0} />
           <ModalItemsContainer>
           <PopupConfirm onOk={sendDataa}  setopen={setOpen} data={data}/>
               
           </ModalItemsContainer>
{}
         </form>
       </ModalBody>
   </Modal>
 );
};

export const PopupSuccessModal = (
  {open,setOpen,data}:{open: boolean,setOpen: any,data:any}
  ,{ size = 140 }: {size?: number }
) => {
let titleData = "More Detail";

 return (
   <Modal show={open} width="37%" onClose={() => setOpen(false)}>
       <ModalBody>
         <ModalHeader
           title={titleData}
           subtitle=""
           onClose={() => setOpen(false)}
         />
         <form>
           <VerticalSpacer size={0} />
           <ModalItemsContainer>
           <RloView/>
           </ModalItemsContainer>
            {}
         </form>
       </ModalBody>
   </Modal>
 );
};