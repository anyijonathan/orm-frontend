import { useLocation, useNavigate } from "react-router-dom";
import {
  PageHeader, VerticalSpacer
} from "../../../Components/PageShared";
import { ModalItemsContainer } from "../../../Components/Modal/itemCard";
import { BackButton } from "../../../Components/Buttons";

const KriView = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  let data1 = state[1]?.childData;
  return (
    <>
      <BackButton navigate={navigate}  />
      <PageHeader title="KRI View"></PageHeader>
      <div className="grayBox">
        <div className="grayBoxHeading">ID's</div>
        <div className="row gx-2">
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">ID</label>
              <div className="viewBoxContent">1232131231</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Kri Indicator ID</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Kri Metric ID</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Unit ID</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Modified By ID</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Approved By ID</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Branch ID</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Reviewer ID</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grayBox">
        <div className="grayBoxHeading">Dates</div>
        <div className="row gx-2">
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Creation Date</label>
              <div className="viewBoxContent">11-11-2023</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Modified Date</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Approved Date</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grayBox">
        <div className="grayBoxHeading">Other Details</div>
        <div className="row gx-2">
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Category</label>
              <div className="viewBoxContent">11-11-2023</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Frequency</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Created By</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Modified By</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Approved By</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Is Reviewed</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Status</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Is Deleted</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Reference No</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Is Nil</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Is Rlo</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Unit Name</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Unit Type Value</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Unit Type</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Approval Comment</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
        </div>
      </div>
              {}
    </>
  );
};
export default KriView;
