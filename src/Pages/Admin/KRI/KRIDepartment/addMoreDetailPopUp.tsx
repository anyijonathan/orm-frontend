import { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "../../../../Components/Modal";
import { VerticalSpacer } from "../../../../Components/PageShared";
import { ModalItemsContainer } from "../../../../Components/Modal/itemCard";
import { Dropdown, DropdownContentContaner, SelectDropDown } from "../../../../Components/DropDown";
import { Button, IconButton } from "../../../../Components/Buttons";
import { DateRangePicker } from "../../../../Components/DatePicker/rangePicker";
import { CalendarIcon } from "../../../../Components/Icons";
import FormRegistration from "../../../../Components/Stepper/organisms/FormRegistration";
import { useLocation, useNavigate } from "react-router-dom";



const AddMoreDetailPopUp  = () => {

 const [openAmountInvolved, setAmountInvolved] = useState(false);
 const [StatusType, setStatusType] = useState("");
 const [openSelectMetrics, setSelectMetrics] = useState(false);
 const [SelectMetricsType, setSelectMetricsType] = useState("");
 const [openMitigationPlan, setMitigationPlan] = useState(false);
 const [MitigationPlanType, setMitigationPlanType] = useState("");
 const [openDatePicker, setOpenDatePicker] = useState(false);
 let titleData = "Add Detail";
 const navigate = useNavigate();
 const { state } = useLocation();
 const ActivePage = state[0]?.ActivePage;
 const refno=  state[1]?.refNo;
const data= state[2]?.data;
const kriReportId = state[3]?.kriReportId
const metricIds= state[4]?.metricIds
const reportingPeriod= state[5].reportingPeriod
//  const handleCreateKriData = () => {
//   const url='/preview-kri-department';
//    navigate(`/admin${url}`);
// };
  return (
    <>      
     <FormRegistration 
     Kris={ActivePage} 
     refNo={refno} 
     data={data} 
     kriReportId={kriReportId} 
     metricIds={metricIds}
     reportingPeriod={reportingPeriod}
     />

      {/* <Button className="col-2 mt-4" onClick={()=> handleCreateKriData()}>Preview</Button> */}
            
     
    </>
  );
};

export default AddMoreDetailPopUp;