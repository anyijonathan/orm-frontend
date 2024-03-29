import React, { useState } from "react";
import { PageHeader, TableCard, TableFiltersContainer } from "../../../../Components/PageShared";
import { Button } from "../../../../Components/Buttons";
import EditTableRole from "./editTableGrouping";
import { useLocation } from "react-router-dom";

type MyData = {
  id: number;
  name: string;
  completeddate: string;
};
type IParameters = {
  PageNumber: number;
  RequestId: String;
  minDate: string;
  maxDate: string;
};

const EditNewRole = () => {
  const [openIsActive, setOpenIsActive] = useState(false);
  const [StatusType, setStatusType] = useState("");
  const { state } = useLocation();
  const roleTitle = state[1]?.RoleTitle;
  const roleData = state[0]?.RoleData;
const title= "Edit Role : " + roleTitle
  return (
    <>
      <PageHeader title={title}> </PageHeader>
      {/* <div className="row">
        <div className="col-4">
          <div className="form-group">
            <label htmlFor="">{roleTitle}</label>
          </div>
        </div>
      </div> */}

      <TableCard>
        <EditTableRole roleData= {roleData} roleTitle= {roleTitle}/>
      </TableCard>
      {/* <div className="row mt-2">
        <div className="col-2">
          <Button variant="contained">Save</Button>
        </div>
      </div> */}
    </>
  );
};
export default EditNewRole;
