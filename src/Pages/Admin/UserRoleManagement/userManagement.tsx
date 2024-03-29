import { useEffect, useState } from "react";
import { Button, IconButton } from "../../../Components/Buttons";
import {
  SelectDropDown,
} from "../../../Components/DropDown";
import {  FilterIcon } from "../../../Components/Icons";
import {
  PageHeader,
  TableCard,
  TableFiltersContainer,
} from "../../../Components/PageShared";
import TableUserManagement from "./tableUserManagement";
import CreateNewUser from "./createNewUser";
import { useAppDispatch } from "../../../Services/Store/hooks";
import { roleDetailsAction, userDetailsAction } from "../../../Services/Actions/userAction";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { getBranchGridDataAction, getDepartmentGridDataAction } from "../../../Services/Actions/locationAction";
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
type MyData = {
  UserName: string,
  UserRole: string,
  DateOfCreation: string,
  Status: string
};
type IParameters = {
  PageNumber: number;
  RequestId: string;
  minDate: string;
  maxDate: string;
};

const UserManagement = () => {
  const dispatch = useAppDispatch();
  const [openTypeType, setOpenTypeType] = useState(false);
  const [minDate, setMinDate] = useState(
    new Date().toLocaleDateString("fr-FR")
  );
  const [maxDate, setMaxDate] = useState(
    new Date().toLocaleDateString("fr-FR")
  );
  const [data, setData] = useState<MyData[]>();
  const [requestID, setRequestID] = useState("");
  const [statusQuery, setStatusQuery] = useState("");
  const [totalCount, setTotalCount] = useState(10);
  let [pageNumber, setPageNumber] = useState(1);
  const [paginator, setpaginator] = useState(true);
  const [userRoleQuery, setUserRoleQuery] = useState("");
  const [userNameQuery, setUserNameQuery] = useState("");   
  const [openCreateNewUser, setOpenCreateNewUser] = useState(false);
  const [roles, setRoles] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  
  const fetchRole=async()=>{
    await dispatch(
      roleDetailsAction( {roleTitle:"", status:true, PageNumber:1,isExport:""})           //todo- for user mang - pageno. free api
      ).then((response:any) => {
        const result= response?.payload?.requestData?.data;
        console.log(result);
        const dropdownOptions = result.data.map((item:any) => ({
          label: item.roleTitle,
          value: item.roleId
        }));
        setRoles(dropdownOptions)
  }); 
  }
  const fetchBranchLocation=async()=>{
    await dispatch(
      getBranchGridDataAction( {Title:"", status:"Active", PageNumber:1,isExport:true})          //todo- for user mang - pageno. free api
      ).then((response:any) => {
        const result= response?.payload?.requestData?.data;
        const dropdownOptions = result.data.map((item:any) => ({
          label: item.branch,
          value: item.id
        }));
        setBranches(dropdownOptions)
  }); 
  }
  const fetchDepartmentLocation=async()=>{
    await dispatch(
      getDepartmentGridDataAction( {Title:"", status:"Active", PageNumber:1,isExport:true})          //todo- for user mang - pageno. free api
      ).then((response:any) => {
        const result= response?.payload?.requestData?.data;
        const dropdownOptions = result.data.map((item:any) => ({
          label: item.department,
          value: item.id
        }));
        setDepartments(dropdownOptions)
  }); 
  }
  
  const handlePaginationChange = (pageNumbers: number) => {
    setPageNumber(pageNumbers);
    fetchData("","","",pageNumbers,"");
  };

  useEffect(() => {
    fetchData("","","",pageNumber,"false");
  },[]);


  const fetchData= async (role:string, name:string, status:string,pageNo:number,isExport: string) =>{
    await dispatch(
      userDetailsAction( {Role:role, name:name, status:status,pageNo:pageNo,isExport: isExport})
      ).then((response:any) => {
        const data1= response?.payload?.userData?.data;
        
        setData(data1?.data);
        setTotalCount(data1?.total);
  });
}

const exportData = async() =>{
let results= data
  const worksheet = XLSX.utils.json_to_sheet(await creationOfColumnNames(results));
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      let blob = new Blob([excelBuffer], {
          type:EXCEL_TYPE
        });
        let url = window.URL.createObjectURL(blob);
        saveAs(url, 'ORM_UserDetails'+'_Data_'+ new Date().toString().substring(0,10) + EXCEL_EXTENSION); 

}
const creationOfColumnNames = async (results:any) => {
  let arr: any[];
  let object ={}
   arr = []
   results?.forEach((elements:any)=> {
   object ={}
   Object.assign(object, {'User Name': elements['userName']});
   Object.assign(object, {'User Role': elements['userRole']});
   const dept = elements['department'];
   const deptString = Array.isArray(dept) ? dept.join(', ') : dept;
   Object.assign(object, { 'Department': deptString });
   const branches = elements['branch'];
   const branchesString = Array.isArray(branches) ? branches.join(', ') : branches;
   Object.assign(object, { 'Branch': branchesString });
   Object.assign(object, {'Last login Time': elements['lastLoginTime']});
   Object.assign(object, {'Status': elements['status']});
   arr.push(object)
   })
  return arr;
}

 const handleUserRoleQuery =(event:any) => {
  setUserRoleQuery(event.target.value);
 }
 const handleUserNameQuery =(event:any) => {
  setUserNameQuery(event.target.value);
 }
 const searchQuery = async(event:any)=>{
  // setPageNumber(1);
  fetchData(userRoleQuery, userNameQuery,statusQuery,1,"");
 }

 const clearFilters = async() => {

  // handlePaginationChange(1);
  await fetchData("", "","",pageNumber,"");
  setPageNumber(1);
  setUserNameQuery("");
  setUserRoleQuery("");
  setStatusQuery("");
  
 }
 const CreateNewU = async()=>{
  await fetchRole();
  await fetchBranchLocation();
  await fetchDepartmentLocation();
  setOpenCreateNewUser(true);
 }
  return (
    <>
      <PageHeader title="User Management"></PageHeader>
      <TableCard>
        <TableFiltersContainer>
          <div className="tableHeaderDetails transResp">
            <div className="details">
              <h3 className="title">User List</h3>
              <div>
                <p className="title">Total Count: {totalCount}</p>
              </div>
            </div>
            <div className="elementsRight">
                <div className="row gx-3">
                    <div className="col-auto">
                        <Button variant="export" color="purple" onClick={exportData}>Export</Button>
                    </div>
                    <div className="col-auto">
                        <Button color="primary" variant="contained" onClick={CreateNewU}>
                            Create New User
                        </Button>
                        {openCreateNewUser && 
                        <CreateNewUser
                         open={openCreateNewUser} 
                         setopen={setOpenCreateNewUser} 
                         data={""}
                          onSave={clearFilters}
                          title="Create New User"
                          msg="New user created!"
                          roles={roles}                          
                          branches={branches}
                          departments={departments}
                          />}
                    </div>
                </div>
            </div>
          </div>
        </TableFiltersContainer>
        <TableFiltersContainer>
          <div className="filterBar">
            <div className="mb-2">
              <strong>Filter Search</strong>
            </div>
            <div className="row">
            <div className="col-auto">
                <input type="text" className="form-control" id="" placeholder="User Name" name="" 
                 value={userNameQuery} 
                 onChange={(e) => handleUserNameQuery(e)}
                 />
              </div>
              
              <div className="col-auto">
                <input type="text" className="form-control" id="" placeholder="User Role" name=""
                      value={userRoleQuery} 
                      onChange={(e) => handleUserRoleQuery(e)}
                      />
              </div>
             
              <div className="col-auto">
                <SelectDropDown
                    setOpen={setOpenTypeType}
                    open={openTypeType}
                    onChange={(value) => setStatusQuery(value)}
                    placeholder="Status"
                    selectedValue={statusQuery}
                    options={[
                    { label: "Active", value: "Active" },
                    { label: "Inactive", value: "Inactive" },
                    { label: "Locked", value: "Locked" },

                    // { label: "By Date", value: "By Date" },
                    ]}
                />
              </div>
              <div className="col-auto">
                <Button onClick={(e) => searchQuery(e)} disabled={userNameQuery === "" && userRoleQuery === "" && statusQuery === ""}>Search</Button>
              </div>
              <div className="col-auto">
                <IconButton
                    icon={<FilterIcon />}
                    buttonTitle="Clear Filter"
                    variant="textIconButtonOnly"
                    onClick={clearFilters}
                  />
              </div>
            </div>
          </div>
        </TableFiltersContainer>
        <div className="sameWidth">
        <TableUserManagement
          props={data}
          request={requestID}
          totalCount={totalCount}
          onChangePage={handlePaginationChange}
          paginator={paginator}
        />
        </div>
       
      </TableCard>
    </>
  );
};
export default UserManagement;
