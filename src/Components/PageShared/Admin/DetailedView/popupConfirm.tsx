import { IconButton } from "../../../Buttons";

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
interface PopupConfirmProps {
  setopen:any
  onOk:  any
  data:any
}


const PopupConfirm = (
  {
  setopen, 
  onOk,
  data
}: PopupConfirmProps
) => {
const msg=data;
const eventType = msg.includes("retry") ? "retry" : "requery" ;
  return (
    <>
    <div className="popupSpacer">{msg}</div>
    
           <div className="row gx-2">
            <div className="col-auto">
              <IconButton
                type="button"
                variant="outlined"
                color="neutral"
                icon={<></>}
                buttonTitle="Cancel"
                onClick={
                  () => setopen(false)
                }
              />
            </div>
            <div className="col-auto">
              <IconButton
                type="button"
                variant="contained"
                color="primary"
                icon={<></>}
                buttonTitle="OK"
                onClick={() => 
                  onOk([true,eventType])
                }
              />
            </div>
          </div>
         
    </>
  );
};

export default PopupConfirm;