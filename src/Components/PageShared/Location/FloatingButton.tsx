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
import { getCurrentRole } from '../../../Services/Utils/route';
import { useNavigate } from 'react-router-dom';

const FloatingButton = () => {
  const [openStatus, setOpenStatus] = useState(false);
  const [open, setOpen] = useState(false);

  const [statusType, setStatusType] = useState("");
  const authState: any = useAppStateSelector((state) => state.authState);
  const locationState:any = useAppStateSelector((state) => state.locationDataState);
  const [optionsForFloatingButton, setOptionsForFloatingButton] = useState<any[]>([]);
 const [title, setTitle] = useState("");
 const navigate = useNavigate();

  // Ensure the useEffect dependency array includes authState.userData
  useEffect(() => {
    if (authState?.userData) { // Check if userData exists before accessing its properties
      const data = authState?.userData?.data?.data?.locationData;
      if (authState?.userData?.data?.data) { // Check if locationData exists before accessing its properties
        if (authState?.userData?.data?.data?.locationType === "B") {
      setStatusType(authState?.userData?.data?.data?.locationData[0]?.branch);
          const branches = data.map((item: any) => ({
            label: item.branch,
            value: item.locationId,
            region: item.region,
          }));
          setOptionsForFloatingButton(branches);
        } else if (authState?.userData?.data?.data?.locationType === "D") {
      setStatusType(authState?.userData?.data?.data?.locationData[0]?.department);
          const departments = data.map((item: any) => ({
            label: item.department,
            value: item.locationId,
            region: null,

          }));
          setOptionsForFloatingButton(departments);
        }
      }
    }
    if(locationState?.currentLocation?.locationType === "B"){
      setTitle("Switch Branch");
    }
    if(locationState?.currentLocation?.locationType === "D"){
      setTitle("Switch Department");
    } 
  }, [authState,locationState]); // Include authState in the dependency array

  const handleButtonClick = (event:any) => {
    event.preventDefault();
    setOpen(true);
  };
  interface Loc {
    locationId: string;
    locationName: string;
    locationType: string;
    region: string;
  }
  const handleCloseModal = (event:any) => {
    event.preventDefault();
    setOpen(false);
  };
const dispatch=useAppDispatch();

const handleUpdateModal = (event:any) => {
  event.preventDefault();
    // Access selected option object using statusType in optionsForFloatingButton
    const selectedOption = optionsForFloatingButton.find(
      (option) => option.value === statusType
    );

    if (selectedOption) {
      const loc: Loc = {
        locationId: selectedOption.value, // Set location ID from selected option
        locationName: selectedOption.label, // Set location name from selected option
        locationType: authState.userData.data.data.locationType, // Set location type from authState
        region: selectedOption.region,
        // authState.userData.data.data.locationType === "B" ? authState.userData.data.data.region : "", // Set region conditionally based on location type
      };

      dispatch(addLocation(loc));

      let userRole:string=getCurrentRole();
        userRole=userRole?.toLocaleLowerCase();
        const url = "/dashboard";
        navigate(`/${userRole}${url}`);

      setOpen(false);
    } else {
      console.error("No selected option found based on statusType:", statusType);
    }
  };

  return (
    <div>
    { getCurrentRole()!=="admin" &&
    authState?.userData?.data?.data?.locationData?.length > 1 
    &&
      <Button variant="export" color='neutral' className="floating-button" onClick={handleButtonClick}>
        {title}
      </Button>}

      <Modal show={open} width="30%" onClose={() => setOpen(false)}>
        <ModalBody>
          <form>
            <VerticalSpacer size={14} />
            <ModalItemsContainer>
                <div className="row">
                  <div className="col-12">
                    <div className="text-center">
                      <AlertCircle2 />
                    </div>
                    <VerticalSpacer size={20} />
                    {authState?.userData?.data?.data?.locationType === "B" && <h3 className="text-center">Switch Branch</h3>}
                    {authState?.userData?.data?.data?.locationType === "D" && <h3 className="text-center">Switch Department</h3>}
                    <VerticalSpacer size={14} />
                  </div>
                  <div className="col-12 mt-4">
                    <div className="form-group">
                    {authState?.userData?.data?.data?.locationType === "B" && 
                      <label htmlFor="select">
                        Select Branch
                      </label>
                      }
                      {authState?.userData?.data?.data?.locationType === "D" && 
                        <label htmlFor="select">
                        Select Department
                        </label>
                        }
                      <SelectDropDown
                        setOpen={setOpenStatus}
                        open={openStatus}
                        onChange={(value) => setStatusType(value)}
                        placeholder="Select"
                        selectedValue={statusType}
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
                    <Button variant="contained" disabled={statusType === ""} onClick={handleUpdateModal}>Switch</Button>
                  </div>
                </div>
            </ModalItemsContainer>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default FloatingButton;
