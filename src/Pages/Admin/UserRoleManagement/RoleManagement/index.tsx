import { useEffect, useState } from "react";
import { any } from "jest-mock-extended";
import { PageHeader, TableCard, TableFiltersContainer } from "../../../../Components/PageShared";
import { Button, IconButton } from "../../../../Components/Buttons";
import { Dropdown, DropdownContentContaner, SelectDropDown } from "../../../../Components/DropDown";
import { DateRangePicker } from "../../../../Components/DatePicker/rangePicker";
import { CalendarIcon, FileIcon, FilterIcon } from "../../../../Components/Icons";
import TableRoleManagement from "./tableRoleManagement";

import "../../../../Assets/Styles/global.scss";
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { roleDetailsAction } from "../../../../Services/Actions/userAction";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { Dispatch, AnyAction } from "redux";
import { useAppDispatch } from "../../../../Services/Store/hooks";
import { result } from "lodash";
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

type MyData = {
  RoleTitle: string,
  RoleType: string,
  NOOfUsers: string,
  DateOfCreation: string,
  Status: string,
};


const RoleManagement = () => {
  const dispatch = useAppDispatch();
  const [openTypeType, setOpenTypeType] = useState(false);
    const [roleTitleQuery, setRoleTitleQuery] = useState("");
  const [roleStatusQuery, setRoleStatusQuery] = useState<boolean | undefined>();
  const [roleStatusQueryText, setRoleStatusQueryText] = useState("");
 
  const [data, setData] = useState<MyData[]>();
  const [requestID, setRequestID] = useState("");
  const [totalCount, setTotalCount] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [paginator, setpaginator] = useState(true);
  
  let tableData:MyData[]=[]
  const handlePaginationChange = (pageNumbers: number) => {
    setPageNumber(pageNumbers);
    fetchData(pageNumbers,"",roleTitleQuery,roleStatusQuery);
  };
  
  useEffect(() => {
    fetchData(pageNumber,"",roleTitleQuery,roleStatusQuery)
  }, []);
  

const fetchData= async (pageNo:number,isExport: string, roleTitle:string,status:boolean | undefined) =>{
  await dispatch(
    roleDetailsAction( {roleTitle:roleTitle, status:status, PageNumber:pageNo,isExport})
    ).then((response:any) => {
      const result= response?.payload?.requestData?.data;
      console.log(result);
      tableData=result.data
      setData(result.data);
      setTotalCount(result.total);
});
}
 
  const exportData = async () => {
    
    const results = data;
    const worksheet = XLSX.utils.json_to_sheet(await creationOfColumnNames(results));
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: EXCEL_TYPE });
    const url = window.URL.createObjectURL(blob);
    saveAs(url, `ORM_Roles_Data_${new Date().toISOString().substring(0, 10)}${EXCEL_EXTENSION}`);
  };
  
  const creationOfColumnNames = async (results: any) => {
    let arr: any[] = [];
    // let res= results.map((item)=>{item.status})
    results?.forEach((elements: any) => {
      let object: any = {};
      Object.assign(object, { 'Role Title': elements['roleTitle'] });
      Object.assign(object, { 'Number of Users': elements['totalCount'] });
      Object.assign(object, { 'DateOfCreation': elements?.roleCreatedDate?.toString().substring(0,10) });
      Object.assign(object, { Status: elements['status'] == true ? "Active" : "Inactive"});
      arr.push(object);
    });
    return arr;
  };
  const handleRoleTitleQuery =(event:any) => {
    setRoleTitleQuery(event.target.value);
   }
   const handleStatusQuery =(value:any) => {
   if (value == "Active") {
      setRoleStatusQuery(true);
      setRoleStatusQueryText("Active");
    }else{
    setRoleStatusQuery(false);
    setRoleStatusQueryText("Inactive");

    }
   }
   const searchQuery = async(event:any)=>{
    // event.preventDefault();
   let searchdata={
    PageNumber:pageNumber,
    roleTitle: roleTitleQuery,
    status: roleStatusQuery
  };
  fetchData(1,'false',roleTitleQuery,roleStatusQuery)
   }
   const clearFilters = async() => {
    setRoleTitleQuery((p)=>p="");
    setRoleStatusQueryText((p)=>p="")
    setRoleStatusQuery((p)=>p=undefined);
    await fetchData(pageNumber,"false","",undefined)
  };
   
  const handleNavigate = (type: string,) => {    
    const url='/create-role';
    return navigate(`/admin${url}`,)
  };
  const navigate = useNavigate();
  return (
    <>
      <PageHeader title="Role Management"></PageHeader>
      <TableCard>
        <TableFiltersContainer>
          <div className="tableHeaderDetails transResp">
            <div className="details">
              <h3 className="title">Role List</h3>
              <div>
                <p className="subtitle">Total Count: {totalCount}</p>
              </div>
            </div>
            <div>
                <div className="row gx-3">
                
                    <div className="col-auto">
                        <Button color="primary" variant="contained" onClick={() => handleNavigate("create-role")}>
                            Create New Role
                        </Button>
                        {/* {openCreateNewRole && <CreateNewRole open={openCreateNewRole} setopen={setOpenCreateNewRole} data={ "msg" } />} */}
                    </div>
                </div>
            </div>
          </div>
        </TableFiltersContainer>
        <TableFiltersContainer>
          <div className="">
            <div className="mb-2">
              <strong>Filter Search</strong>
            </div>
            <div className="row">
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              id=""
              placeholder="Role Title"
              name=""
              value={roleTitleQuery} 
              onChange={(e) => handleRoleTitleQuery(e)}
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
              <Button onClick={(e) => searchQuery(e)} disabled={roleStatusQueryText == "" && roleTitleQuery == ""}>Search</Button>
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
          <div className="col-auto align-self-end">
                        <Button variant="export" color="purple" onClick={exportData}>Export</Button>
                    </div>
        </TableFiltersContainer>
        <div className="sameWidth">
          <TableRoleManagement
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
export default RoleManagement;