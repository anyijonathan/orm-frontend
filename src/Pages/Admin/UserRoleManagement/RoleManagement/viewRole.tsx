import { useLocation, useNavigate } from "react-router-dom";
import { PageHeader, TableCard, TableFiltersContainer } from "../../../../Components/PageShared";
import ViewRoleGrouping from "./ViewRoleGrouping";
import { Button } from "../../../../Components/Buttons";

//const navigate = useNavigate();
// const handleNavigation = (type: string,) => {    
//     const url='/role-management';
//     return navigate(`/admin${url}`,)
//   };

const ViewRole = () => {
  const { state } = useLocation();
  const roleTitle = state[1]?.RoleTitle; 

const title= "View Role : " + roleTitle

  return (
    <>
     <PageHeader title={title}> 
     {/* <div className="row mt-2">
        <div className="col-2">
        <Button variant="contained"
        // onClick={() => handleNavigation("role-management")}
        >Save</Button>
        </div>
    </div>          */}
      </PageHeader>
      
       <TableCard>
        <ViewRoleGrouping />
      </TableCard>

     
    </>
  );
};
export default ViewRole;
