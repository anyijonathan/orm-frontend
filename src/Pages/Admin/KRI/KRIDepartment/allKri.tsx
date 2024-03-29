
import { Button, IconButton } from "../../../../Components/Buttons";
import { Dropdown, DropdownContentContaner } from "../../../../Components/DropDown";
import { CalendarIcon, FilterIcon } from "../../../../Components/Icons";
import { PageHeader, TableCard, TableFiltersContainer } from "../../../../Components/PageShared";
import { useAppStateSelector } from "../../../../Services/Store/hooks";
import { useNavigate } from "react-router-dom";
import AllKriTable from "./allKriTable";

const AllKri = () => {
    const navigate = useNavigate();
    let userState:any = useAppStateSelector((state) => state.authState)
    const handleManageKri = () => {
        const url='/kri-department'; 
        let userRole:string=userState?.userData?.data?.data?.userRole;
        userRole=userRole?.toLocaleLowerCase();
        navigate(`/${userRole}${url}`);
      };
    const handleKriindicator = () => {
    // const url='/log-kri-data-department';
    const url='/kri-indicator'; 
    let userRole:string=userState?.userData?.data?.data?.userRole;
    userRole=userRole?.toLocaleLowerCase();
    navigate(`/${userRole}${url}`);
    };
    
    return (
        <>
        <PageHeader title="Key Risk Indicators"></PageHeader>
        <TableCard>
            <TableFiltersContainer>
                <div className="tableHeaderDetails transResp">
                    <div className="details">
                    <h3 className="title">All KRIs</h3>
                    {/* <div>
                        <p className="subtitle" data-toggle="tooltip" data-html="true" title="<em>Tooltip</em> <u>with</u> <b>HTML</b>">Total Count: {totalCount}</p>
                    </div> */}
                    </div>
                    <div>
                        <div className="row gx-3">
                            <div className="col-auto">
                                <Button onClick={()=> handleKriindicator()}>Create KRI Metrices</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </TableFiltersContainer>
            <TableFiltersContainer>
          <div className="">
            <div className="mb-2">
              <strong>Filter Search </strong>
               <span> Date Reported : -  </span>
            </div>
            <div className="row">
              <div className="col-auto">
                <input type="text" className="form-control" id="" placeholder="Branch" name=""/>
              </div>
              <div className="col-auto">
                <input type="text" className="form-control" id="" placeholder="Department" name=""/>
              </div>
              <div className="col-auto">
                <input type="date" className="form-control" id="" placeholder="Date Created" name=""/>
              </div>
              <div className="col-auto">
                <input type="text" className="form-control" id="" placeholder="Search Indicator" name=""/>
              </div>
              <div className="col-auto">
                <Button>Search</Button>
              </div>
              <div className="col-auto">
                <IconButton
                    icon={<FilterIcon />}
                    buttonTitle="Clear Filter"
                    variant="textIconButtonOnly"
                    // onClick={()=> handleViewKri()}
                  />
              </div>
            </div>
          </div>
          <div className="col-auto align-self-end">
              <Button color="purple" variant="export">Export</Button>
          </div>
        </TableFiltersContainer>
        <div className="sameWidth">
            <AllKriTable props={undefined} request={undefined} totalCount={0} onChangePage={function (page: number): void {
                        throw new Error("Function not implemented.");
                    } } paginator={false}/>
        </div>
        </TableCard>
        </>
    );
}
export default AllKri;