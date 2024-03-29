import { useEffect, useState } from "react";
import "../../../Assets/Styles/global.scss";
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useAppDispatch, useAppStateSelector } from "../../../Services/Store/hooks";
import { PageHeader, TableCard, TableFiltersContainer } from "../../../Components/PageShared";
import { Button, IconButton } from "../../../Components/Buttons";
import { SelectDropDown } from "../../../Components/DropDown";
import { FilterIcon } from "../../../Components/Icons";
import TableLocManagement from "./tableLocManagement";
import { CreateNewBranchAction, CreateNewDepartmentAction, getBranchGridDataAction, getDepartmentGridDataAction } from "../../../Services/Actions/locationAction";
import CreateBranch from "./createBranch";
import AlertBox from "../../../Components/PageShared/Admin/Alert/alert";
import CreateDepartment from "./CreateDepartment";
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

type MyData = {
  RoleTitle: string,
  RoleType: string,
  NOOfUsers: string,
  DateOfCreation: string,
  Status: string,
};


const LocationManagement = () => {
  const dispatch = useAppDispatch();
  const [openTypeType, setOpenTypeType] = useState(false);
    const [titleQuery, setTitleQuery] = useState("");
  const [roleStatusQueryText, setRoleStatusQueryText] = useState("");
 
  const [data, setData] = useState<MyData[]>();
  const [totalCount, setTotalCount] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [paginator, setpaginator] = useState(true);
  const  [location,setLocation] = useState("Branch");
  let tableData:MyData[]=[]

  const handlePaginationChange = (pageNumbers: number) => {
    setPageNumber(pageNumbers);
    fetchData(pageNumbers,false,location,titleQuery,roleStatusQueryText);
  };
  
  useEffect(() => {
    fetchData(pageNumber,false,location,titleQuery,roleStatusQueryText)
  }, []);
  

const fetchData= async (pageNo:number,isExport: boolean, location:string, title:string,status:string) =>{
  if(location==="Branch"){
    await dispatch(
        getBranchGridDataAction( {pageNumber:pageNo,isExport: isExport, title:title,status:status})
    ).then((response:any) => {
      const result= response?.payload?.requestData?.data;
      console.log(result);
      tableData=result.data
      setData(result.data);
      setTotalCount(result.total);
});}
else{
        await dispatch(
            getDepartmentGridDataAction( {pageNumber:pageNo,isExport: isExport, title:title,status:status})
        ).then((response:any) => {
          const result= response?.payload?.requestData?.data;
          console.log(result);
          tableData=result.data
          setData(result.data);
          setTotalCount(result.total);
    });
}
}
 
  const exportData = async () => {
    
    const results = data;
    const worksheet = XLSX.utils.json_to_sheet(await creationOfColumnNames(results));
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: EXCEL_TYPE });
    const url = window.URL.createObjectURL(blob);
    saveAs(url, `${location}_Data_${new Date().toISOString().substring(0, 10)}${EXCEL_EXTENSION}`);
  };
  
  const creationOfColumnNames = async (results: any) => {
    let arr: any[] = [];
    // let res= results.map((item)=>{item.status})
    if(location === "Branch"){
        results?.forEach((elements: any) => {
        let object: any = {};
        Object.assign(object, { 'Branch Title': elements['branch'] });
        Object.assign(object, { 'SolId': elements['solId'] });
        Object.assign(object, { 'Region': elements['region'] });
        Object.assign(object, { 'LocationId': elements['locationId'] });
        Object.assign(object, { 'Status': elements['status'] });
        arr.push(object);
        });
    }
    if(location === "Department"){
        results?.forEach((elements: any) => {
            let object: any = {};
            Object.assign(object, { 'Department Title': elements['department'] });
            Object.assign(object, { 'LocationId': elements['locationId'] });
            Object.assign(object, { 'Status': elements['status'] });
            arr.push(object);
          });
    }
    return arr;
  };
  const handleTitleQuery =(event:any) => {
    setTitleQuery(event.target.value);
   }
   const handleStatusQuery =(value:any) => {
   if (value == "Active") {
      setRoleStatusQueryText("Active");
    }else{
    setRoleStatusQueryText("Inactive");

    }
   }
   const searchQuery = async(event:any)=>{
    // event.preventDefault();
   
  fetchData(1,false,location,titleQuery,roleStatusQueryText)
   }
   const clearFilters = async() => {
    setTitleQuery((p)=>p="");
    setRoleStatusQueryText((p)=>p="")
    await fetchData(pageNumber,false,location,"","")
  };
   
//   const handleNavigate = (type: string,) => {    
//     const url='/create-role';
//     return navigate(`/admin${url}`,)
//   };
  const navigate = useNavigate();

  const UpdateStatusValues =(item:string) =>{
    setLocation(()=>item)
    fetchData(1,false,item,titleQuery,roleStatusQueryText)
  }
const [openCreateBranch,setOpenCreateBranch]= useState(false)
const [openCreateDepartment,setOpenCreateDepartment]= useState(false)
const authState:any = useAppStateSelector((state) => state.authState)
const [alert, setAlert] = useState(false);
const [departmentAlert, setDepartmentAlert] = useState(false);
const [alertConB, setAlertConB] = useState(false);
const [alertConD, setAlertConD] = useState(false);
const [branchTitle, setBranchTitle] = useState("");
const [departmentTitle, setDepartmentTitle] = useState("");
const [createdById, setCreatedById] = useState<number>();
const [solId, setSolId] = useState("");
const [region, setRegion] = useState("");

const CreateNewBranch = async(
    branchTitle: string,
    createdById:number,
    solId:string,
    region:string) =>{
        setBranchTitle(branchTitle);
        setCreatedById(createdById);
        setSolId(solId);
        setRegion(region);
        setAlert(true);
}
const CreateBranchOK= async (res:string)=>{
    setAlert(false);
    if(res==="ok"){
    await dispatch(CreateNewBranchAction({
            solId: solId,
            branch: branchTitle,
            region: region,
            createdById: authState?.userData?.data?.data?.userId
          })).then((res:any) =>{
            var result= res?.payload?.requestData?.data;
            if(result) {
                setAlertConB(true);
            }
          });
    }
} 
const CreateNewDepartment = async(
    branchTitle: string) =>{
        setDepartmentTitle(branchTitle);
        setDepartmentAlert(true);
}
const CreateDepartmentOK= async (res:string)=>{
    setDepartmentAlert(false);
    if(res==="ok"){
    await dispatch(CreateNewDepartmentAction({
            department: departmentTitle,
            createdById: authState?.userData?.data?.data?.userId
          })).then((res:any) =>{
            var result= res?.payload?.requestData?.data;
            if(result) {
                setAlertConD(true);
            }
          });
    }
} 
const CreateBranchCon = (item:string)=>{
    if(item)
    fetchData(pageNumber,false,location,titleQuery,roleStatusQueryText);
}
  return (
    <>
      <PageHeader title="Location Management">
        <div>
        { location=== "Branch" && <Button onClick={()=>setOpenCreateBranch(true)}>Create New Branch
        {openCreateBranch && (
                  <CreateBranch
                    open={openCreateBranch}
                    setopen={setOpenCreateBranch}
                    data="create"
                    title="Create New Branch"
                    message="create"
                    btn1="Create"
                    btn2="Cancel"
                    onClose={CreateNewBranch}
                  />
                )}
        </Button>}
        { location=== "Department" && <Button onClick={()=>setOpenCreateDepartment(true)}>Create New Department
        {openCreateDepartment && (
            <CreateDepartment
              open={openCreateDepartment}
              setopen={setOpenCreateDepartment}
              data="create"
              title="Create New Department"
              message=""
              btn1="Create"
              btn2="Cancel"
              onClose={CreateNewDepartment}
            />
          )}
        </Button>}
        </div>
      </PageHeader>
      <div className="my-3">
      <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" onClick={() => UpdateStatusValues("Branch")} checked={location === "Branch"} />
            <label className="btn btn-outline-primary" htmlFor="btnradio1">Manage Branch</label>

            <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" onClick={() => UpdateStatusValues("Department")} checked={location === "Department"}/>
            <label className="btn btn-outline-primary" htmlFor="btnradio2">Manage Department</label>

        </div>

        
      </div>
      <TableCard>
        <TableFiltersContainer>

          <div className="tableHeaderDetails transResp">
            <div className="details">
              <h3 className="title">{location} List</h3>
              <div>
                <p className="subtitle">Total Count: {totalCount}</p>
              </div>
            </div>
            <div>
                <div className="row gx-3">
                <div className="col-auto">
                        <Button variant="export" color="purple" onClick={exportData}>Export</Button>
                    </div>
                    {/* <div className="col-auto">
                        <Button color="primary" variant="contained" onClick={() => handleNavigate("create-role")}>
                            Create New Role
                        </Button>
                    </div> */}
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
            <input
              type="text"
              className="form-control"
              id=""
              placeholder="Title"
              name=""
              value={titleQuery} 
              onChange={(e) => handleTitleQuery(e)}
              />
          </div>
          <div className="col-auto">
            {/* <input
              type="text"
              className="form-control"
              id=""
              placeholder="Status"
              name=""
              value={roleStatusQuery} 
                      onChange={(e) => handleStatusQuery(e)}
              /> */}
              <SelectDropDown
                    setOpen={setOpenTypeType}
                    open={openTypeType}
                    onChange={(value) => handleStatusQuery(value)}
                    placeholder="Status"
                    selectedValue={roleStatusQueryText}
                    options={[
                    { label: "Active", value: "Active" },
                    { label: "Inactive", value: "Inactive" },
                    ]}
                />
              </div>      
              
              <div className="col-auto">
              <Button onClick={(e) => searchQuery(e)} 
              // disabled={roleStatusQueryText === "" || titleQuery === ""}
              >Search</Button>
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
          <TableLocManagement
            props={data}
            request={location}
            totalCount={totalCount}
            onChangePage={handlePaginationChange}
            paginator={paginator}
          />
        </div>
      </TableCard>
      {alert && <AlertBox open={alert} setopen={setAlert} data={data} title="Alert" message="Are you sure you want to Create New branch ?" btn1="OK" btn2="CANCEL" onClose={CreateBranchOK} />}
      {alertConB && <AlertBox open={alertConB} setopen={setAlertConB} data={data} title="Alert" message=" New Branch created !" btn1="OK" btn2="" onClose={CreateBranchCon} />}
      {alertConD && <AlertBox open={alertConD} setopen={setAlertConD} data={data} title="Alert" message=" New Department created !" btn1="OK" btn2="" onClose={CreateBranchCon} />}
      {departmentAlert && <AlertBox open={departmentAlert} setopen={setDepartmentAlert} data={data} title="Alert" message="Are you sure you want to create new department ?" btn1="OK" btn2="CANCEL" onClose={CreateDepartmentOK} />}

    </>
  );
};
export default LocationManagement;