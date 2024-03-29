import React, { useEffect, useState } from 'react';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { Modal, ModalBody } from '../../Modal';
import { VerticalSpacer } from '..';
import { ModalItemsContainer } from '../../Modal/itemCard';
import { AlertCircle2, CircleCheck2 } from '../../Icons';
import { SelectDropDown } from '../../DropDown';
import { useAppDispatch, useAppStateSelector } from '../../../Services/Store/hooks';
import { addLocation } from '../../../Services/Reducers/locationSlice';
import { Button } from '../../Buttons';
import { getBranchGridDataAction, getDepartmentGridDataAction } from '../../../Services/Actions/locationAction';

interface modelProps {
    openModel:any
  }

  interface Loc {
    locationId: string;
    locationName: string;
    locationType: string;
    region: string;
  }
const AdminLocation = ({openModel}:modelProps) => {
  const [openStatus, setOpenStatus] = useState(false);
  const [open, setOpen] = useState(false);

  const [locationOption, setLocationOption] = useState("");
  const [locationType, setLocationType] = useState("");
  const authState: any = useAppStateSelector((state) => state.authState);

  const [optionsForFloatingButton, setOptionsForFloatingButton] = useState<any[]>([]);

  // Ensure the useEffect dependency array includes authState.userData
  useEffect(() => {
    setOpen(openModel);
    if (authState?.userData) { // Check if userData exists before accessing its properties
      const data = authState?.userData?.data?.data?.locationData;
      if (authState?.userData?.data?.data) { // Check if locationData exists before accessing its properties
        if (locationType === "B") {
            fetchBranchLocation();
        } else if (locationType === "D") {
            fetchDepartmentLocation();
        }
      }
    }
  }, [authState]); // Include authState in the dependency array

  const fetchBranchLocation=async()=>{
    await dispatch(
      getBranchGridDataAction( {Title:"", status:"Active", PageNumber:1,isExport:true})          //todo- for user mang - pageno. free api
      ).then((response:any) => {
        const result= response?.payload?.requestData?.data;
        const dropdownOptions = result.data.map((item:any) => ({
          label: item.branch,
          value: item.id,
          region:item.region
        }));
        setOptionsForFloatingButton(dropdownOptions)
  }); 
  }
  const fetchDepartmentLocation=async()=>{
    await dispatch(
      getDepartmentGridDataAction( {Title:"", status:"Active", PageNumber:1,isExport:true})          //todo- for user mang - pageno. free api
      ).then((response:any) => {
        const result= response?.payload?.requestData?.data;
        const dropdownOptions = result.data.map((item:any) => ({
          label: item.department,
          value: item.id,
          region:null
        }));
        setOptionsForFloatingButton(dropdownOptions)
  }); 
  }
  
  const handleButtonClick = (event:any, locationType:string) => {
    event.preventDefault();
    setLocationType(locationType);
    if(locationType=="D"){
        fetchDepartmentLocation()
    }else{
        fetchBranchLocation()
    }
  };

  const handleCloseModal = (event:any) => {
    event.preventDefault();
    setOpen(false);
  };
const dispatch=useAppDispatch();

const handleUpdateModal = (event:any) => {
  event.preventDefault();
    // Access selected option object using locationOption in optionsForFloatingButton
    const selectedOption = optionsForFloatingButton.find(
      (option) => option.value === locationOption
    );

    if (selectedOption) {
      const loc: Loc = {
        locationId: selectedOption.value, // Set location ID from selected option
        locationName: selectedOption.label, // Set location name from selected option
        locationType: locationType, // Set location type from authState
        region: selectedOption.region,
        // authState.userData.data.data.locationType === "B" ? authState.userData.data.data.region : "", // Set region conditionally based on location type
      };

      dispatch(addLocation(loc));
      setOpen(false);
    } else {
      console.error("No selected option found based on locationOption:", locationOption);
    }
  };

  return (
    <div>     

      <Modal show={open} width="30%" onClose={() => setOpen(false)}>
        <ModalBody>
          <form>
            <VerticalSpacer size={14} />
            <ModalItemsContainer>
                <div className="row">
                  <div className="col-12">
                    <div className="text-center">
                      <AlertCircle2 />
                     <CircleCheck2 />

                    </div>
                    <p>Select Location for Loss Report:</p>
                    <VerticalSpacer size={20} />
                    {/* {authState?.userData?.data?.data?.locationType === "B" && <h3 className="text-center">Switch Branch</h3>}
                    {authState?.userData?.data?.data?.locationType === "D" && <h3 className="text-center">Switch Department</h3>} */}
                    {/* <div className="row">
                        <div className="col-6">
                            <Button variant="export" color='neutral' className="floating-button" onClick={(e:any)=>handleButtonClick(e,"B")}>
                                Branch
                            </Button>
                        </div>
                        <div className="col-6">
                        <Button variant="export" color='neutral' className="floating-button" onClick={(e:any)=>handleButtonClick(e,"D")}>
                            Department
                        </Button>
                        </div>
                    </div> */}

                    <div className="btn-group marginleft" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" onClick={(e:any)=>handleButtonClick(e,"B")} checked={locationType === "B"}/>
                        <label className="btn btn-outline-primary" htmlFor="btnradio1">Branch</label>

                        <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" onClick={(e:any)=>handleButtonClick(e,"D")} checked={locationType === "D"}/>
                        <label className="btn btn-outline-primary" htmlFor="btnradio2">Department </label>
                    </div>
                    <VerticalSpacer size={14} />
                  </div>
                  <div className="col-12 mt-4">
                    <div className="form-group">
                    {locationType === "B" && 
                      <label htmlFor="select">
                        Select Branch
                      </label>
                      }
                      {locationType === "D" && 
                        <label htmlFor="select">
                        Select Department
                        </label>
                        }
                      <SelectDropDown
                        setOpen={setOpenStatus}
                        open={openStatus}
                        onChange={(value) => setLocationOption(value)}
                        placeholder="Select"
                        selectedValue={locationOption}
                        options={optionsForFloatingButton}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-2 align-self-center">
                  <div className="col-auto">
                    <Button variant="outlined" color="neutral" onClick={handleCloseModal}>Cancel</Button>
                  </div>
                  <div className="col-auto">
                    <Button variant="contained" disabled={locationOption === ""} onClick={handleUpdateModal}>Select</Button>
                  </div>
                </div>
            </ModalItemsContainer>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AdminLocation;
