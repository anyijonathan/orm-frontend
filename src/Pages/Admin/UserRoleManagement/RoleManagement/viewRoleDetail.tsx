import { useState } from "react";
import { useId } from 'react';
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

const ViewRoleDetail = (
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
 const [openStatus, setOpenStatus] = useState(false);
 const [StatusType, setStatusType] = useState("");
 const [openDateOfCreation, setOpenDateOfCreation] = useState(false);
 const [openDateOfOccurrence, setOpenDateOfOccurrence] = useState(false);
 const postTextAreaId = useId();
 let titleData = "View Role Detail";
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
              <div className="grayBox">
                <div className="row gx-2">
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="">Role Title</label>
                      <div className="viewBoxContent">Admin</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="">Is Active</label>
                      <div className="viewBoxContent">Active</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="">Approved Date</label>
                      <div className="viewBoxContent">11-11-2023</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
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
            </ModalItemsContainer>
              {}
          </form>
        </ModalBody>
    </Modal>       
    </>
  );
};

export default ViewRoleDetail;