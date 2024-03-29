import { useState } from "react";
import { useId } from 'react';
import { Button } from "../../../../Components/Buttons";
import { SelectDropDown } from "../../../../Components/DropDown";
import { Modal, ModalBody, ModalHeader } from "../../../../Components/Modal";
import { ModalItemsContainer } from "../../../../Components/Modal/itemCard";
import { VerticalSpacer } from "../../../../Components/PageShared";
import styles from "../../../../Assets/Styles/Component/table.module.scss";
import { Radio } from "../../../../Components/Radio";

interface CreateKriProps {
  open:any,
  setopen:any
  data:any
}

const CreateNewRoleOld = (
  {
  open,
  setopen,
  data
}: CreateKriProps
) => {
 let retryMsg=false;
 if(data.includes("retry")){
  retryMsg=true;
 }
 const [openIsActive, setOpenIsActive] = useState(false);
 const [openAssignedRole, setOpenAssignedRole] = useState(false);
 const [StatusType, setStatusType] = useState("");
 const [AssignedRole, setAssignedRole] = useState("");
 const [openDateOfCreation, setOpenDateOfCreation] = useState(false);
 const [openDateOfOccurrence, setOpenDateOfOccurrence] = useState(false);
 const postTextAreaId = useId();
 let titleData = "Create New Role old";
  return (
    <>
      <Modal show={open} width="60%" onClose={() => setopen(false)}>
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
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="">Role Title</label>
                      <input type="text" className="form-control" id="" placeholder="Enter Role Title" name="" />
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="">Is Active</label>
                      <SelectDropDown
                        setOpen={setOpenIsActive}
                        open={openIsActive}
                        onChange={(value) => setStatusType(value)}
                        placeholder="Select Status"
                        selectedValue={StatusType}
                        options={[
                        { label: "Active", value: " " },
                        { label: "Inactive", value: " " },
                        ]}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className={styles.tableRoundBox}>
                        <div className={styles.LTable}>
                            <table>
                                <thead>
                                    <tr className={styles.tableHead}>
                                        <th>Privileges</th>
                                        <th>Manage</th>
                                        <th>Create/Edit</th>
                                        <th>Read Only</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><p className={styles.tableBoldData}>Privilege Name</p></td>
                                        <td><Radio /></td>
                                        <td><Radio /></td>
                                        <td><Radio /></td>
                                    </tr>
                                    <tr>
                                        <td><p className={styles.tableBoldData}>Privilege Name</p></td>
                                        <td><Radio /></td>
                                        <td><Radio /></td>
                                        <td><Radio /></td>
                                    </tr>
                                    <tr>
                                        <td><p className={styles.tableBoldData}>Privilege Name</p></td>
                                        <td><Radio /></td>
                                        <td><Radio /></td>
                                        <td><Radio /></td>
                                    </tr>
                                    <tr>
                                        <td><p className={styles.tableBoldData}>Privilege Name</p></td>
                                        <td><Radio /></td>
                                        <td><Radio /></td>
                                        <td><Radio /></td>
                                    </tr>
                                    <tr>
                                        <td><p className={styles.tableBoldData}>Privilege Name</p></td>
                                        <td><Radio /></td>
                                        <td><Radio /></td>
                                        <td><Radio /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-2">
                    <Button variant="contained">Create</Button>
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

export default CreateNewRoleOld;