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
interface PopupSuccessProps {
  open:any,
  setopen:any
  data:any
}

const PopupSuccess = (
  {
  open,
  setopen,
  data
}: PopupSuccessProps
) => {
 let retryMsg=false;
 if(data.includes("retry")){
  retryMsg=true;
 }

  return (
    <>
    {retryMsg && <div className="popupSpacer">Retry request scheduled successfully.<br/><sub>Note: It would be processed in next run of posting service.</sub></div>}
    {!retryMsg && <div className="popupSpacer">Requery response received successfully.<br/><sub>Note: Transaction response code and description has been updated.</sub></div>}
    
           <div className="row gx-2">
            <div className="col-auto">
              <IconButton
                type="button"
                variant="outlined"
                color="neutral"
                icon={<></>}
                buttonTitle="Close"
                onClick={
                  () => setopen(false)
                }
              />
            </div>
           
          </div>
         
    </>
  );
};

export default PopupSuccess;