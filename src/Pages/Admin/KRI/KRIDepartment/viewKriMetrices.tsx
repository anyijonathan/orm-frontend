import { useNavigate } from "react-router-dom";
import { BackButton, Button } from "../../../../Components/Buttons";
import { PageHeader } from "../../../../Components/PageShared";
import { useAppStateSelector } from "../../../../Services/Store/hooks";

const ViewKriMetrices = () => {
    const navigate = useNavigate();
    let userState:any = useAppStateSelector((state) => state.authState)
    const handleUpdate = () => {
        // const url='/log-kri-data-department';
        const url='/kri-indicator'; 
        let userRole:string=userState?.userData?.data?.data?.userRole;
        userRole=userRole?.toLocaleLowerCase();
        navigate(`/${userRole}${url}`);
        };
    return (
        <>
        <BackButton navigate={navigate}  />
      <PageHeader title="KRI Details">
        <div className="row">
        {/* <div className="col-auto">
            <Button variant="contained" color="error">Delete</Button>
        </div> */}
        <div className="col-auto">
            <Button onClick={()=> handleUpdate()}>Update</Button>
        </div>
        </div>
        
      </PageHeader>
      <div className="grayBox">
        <div className="grayBoxHeading">Title</div>
        <div className="row gx-2">
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Category</label>
              <div className="viewBoxContent">1232131231</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Indicator</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Appetite Upper Bound</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Tolerance Lower Bound</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Tolerance Upper Bound</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Escalation Lower Bound</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="">Escalation Upper Bound</label>
              <div className="viewBoxContent">534545</div>
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
              <label htmlFor="">Appetite Type</label>
              <div className="viewBoxContent">534545</div>
            </div>
          </div>
        </div>
      </div>
        </>
    );
}

export default ViewKriMetrices