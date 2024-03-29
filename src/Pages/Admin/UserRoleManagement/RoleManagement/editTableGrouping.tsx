import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_Row,
} from 'material-react-table';
import { useAppDispatch, useAppStateSelector } from '../../../../Services/Store/hooks';
import { CreateRoleAction, UpdateRoleAction, viewRoleDetails } from '../../../../Services/Actions/userAction';
import { saveRoles } from '../../../../constants/enum';
import { Button } from '../../../../Components/Buttons';
import AlertBox from '../../../../Components/PageShared/Admin/Alert/alert';
import { useNavigate } from 'react-router-dom';

export type Role = {
  access: string;
  subRows: Roles[]; 
};
export type Roles = {
  access: string;
};

export let data: Role[] = [];
let roleTitle:string = "";
let rowTitles :any[] = [];
let arrayHeader:any[] =[];

const EditTableRole = (props: any) => {
  const [localData, setLocalData] = useState<Role[]>([]);
  const navigate = useNavigate();
  const roleState:any = useAppStateSelector((state) => state.roleState)
  const authState:any = useAppStateSelector((state) => state.authState)
  const dispatch = useAppDispatch();
  const [openAlertBox, setOpenAlertBox] = useState(false);
  const [openConfAlertBox, setOpenConfAlertBox] = useState(false);
  const [editUpdateStatus, setEditUpdateStatus] = useState(false);
if(!editUpdateStatus){
  if(roleState?.roleData?.data?.data){
    data= roleState?.roleData?.data?.data;
  }
  if(roleState?.newRoleData?.data?.data){
    data=roleState?.newRoleData?.data?.data;
  }
}
  useEffect (() => {
    const inputData= roleState?.roleData?.data?.data;
    roleTitle=props.roleTitle
    type Role = typeof inputData[number]['subRows'][number];
  },[]);

   const fetchData=async(roleTitle:string)=>{
      await dispatch(
        viewRoleDetails({roleTitle:roleTitle})
        ).then((response:any) => {
          const result=response?.payload?.requestData?.data?.data;
          setLocalData(result);
          data=result;
        });  
    }
  const setUpPage=(roleData?:string) =>{
    columns;
  }
  if (data && data.length>1) {
   const firstDataSubRows = data[0].subRows[0];
  console.log(firstDataSubRows);
  arrayHeader = Object.keys(firstDataSubRows);
  const EditIndex = arrayHeader.findIndex((str) => str === props.roleTitle);
  const swap= arrayHeader[1];
  arrayHeader[1]=arrayHeader[EditIndex];
  arrayHeader[EditIndex]=swap;
  rowTitles = [];
  for (let i = 0; i < data.length; i++) {
    rowTitles.push(data[i].access);
  }
  setUpPage;
}
  const handleChange = (row: MRT_Row<Role>, header: string) => {
    setEditUpdateStatus(true);
    const updatedData = data.map((item) => {
      if (item.subRows) {
        const updatedSubRows = item.subRows.map((subRow) => {
          if (subRow.access === row.original.access) {
            return {
              ...subRow,
              [header]: !subRow[header],
            };
          }
          return subRow;
        });
    
        // Create a new object with the updated subRows property
        return {
          ...item,
          subRows: updatedSubRows,
        };
      }
    
      // If there are no subRows, return the original item
      return item;
    });
    
    console.log("updatedData", updatedData);
    
  
    setLocalData(updatedData);
    data= updatedData;
    console.log(`Clicked for ${row.original.access} - ${header}`);
    console.log('Updated Data:', updatedData);
  };

  const handleSave = async() => {  
    const saveData: saveRoles[] = [];   
    const newData = data.map((item) => {
      if (item.subRows) {
        item.subRows= item.subRows.map((subRow) => {         
          // const { access, roleTitle, permisson } = {subRow.access,subRow.access,subRow.access};
          const  AccessTitle = subRow.access;
          const  RoleTitle = props.roleTitle;
          const  Permission : boolean = subRow[roleTitle];
          const UpdatedBy = authState?.userData?.data?.data?.userName ;
          saveData.push({ RoleTitle, UpdatedBy, AccessTitle, Permission })
          // return { access:roleTitle };
          return subRow;
        });
      }
      return item;
    });

   
    console.log('Saving data:', saveData);
    // send data to backend
    await dispatch(
      UpdateRoleAction(saveData)
      ).then((response:any) => {
        let result=response?.payload?.requestData?.data;
        console.log("role result: ",result);
        if(result.code="00")
        setOpenConfAlertBox(true);
      }
      )};

      const gotoGrid = () => {
        const url='/role-management';
        return navigate(`/admin${url}`,)
      }
 
      // const fetchData=async(roleTitle:string)=>{
      //   await dispatch(
      //     viewRoleDetails({roleTitle:roleTitle})
      //     ).then((response:any) => {
      //       const result=response?.payload?.requestData?.data?.data;
      //       setLocalData(result);
      //       data=result;
      //     });
      // // setUpPage(props.roleTitle)    
      // }
    
  const columns = useMemo<MRT_ColumnDef<Role>[]>(
    () => {
      return arrayHeader.map((header, index) => {
        if (index === 0) {
          return {
            accessorKey: header,
            header: header === 'access' ? 'Access' : header,
          };
        }
        if (index === 1) {
                  return {
                    accessorKey: header,
                    header: header === 'access' ? 'Access' : header,
                    Cell: ({ row }) => (
                      rowTitles.includes(row.original.access) ? null : (
                        <input
                          type="checkbox"

                          checked={row.original[header]}
                          onChange={() => { handleChange(row, header); }}
                        />
                      )
                    ),
                  };
                }
        else{
        return {
          accessorKey: header,
          header: header === 'access' ? 'Access' : header,
          show:false,
          Cell: ({ row }) => (
            rowTitles.includes(row.original.access) ? null : (
              <input
                type="checkbox"
                checked={row.original[header]}
                readOnly={index > 1}
                 // && index < EditIndex}
                disabled={index > 1 } //&& index < EditIndex}
              />
            )
          ),
        };}
      });
    },
    [arrayHeader, rowTitles]
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableExpandAll: false,
    enableExpanding: true,
    filterFromLeafRows: true,
    initialState: { expanded: true },
    paginateExpandedRows: false,
  });

  const closeAlert = async (result: string) => {
    if (result === "ok") {
      handleSave();
    }
  }

  return (
    <div>
      <MaterialReactTable table={table} />
      <div className="row">
        <div className="col-2 mt-4">
          <Button className='w-15' onClick={()=>setOpenAlertBox(true)} variant="contained">Save</Button>
          {openAlertBox && <AlertBox open={openAlertBox} setopen={setOpenAlertBox} data={"msg"} title="Confirmation" message={"Do you want to save Updated Permissions ?"} btn1="OK" btn2="Cancel" onClose={closeAlert}/>}
          {openConfAlertBox && <AlertBox open={openConfAlertBox} setopen={setOpenConfAlertBox} data={"msg"} title="Confirmation" message={"Updated Role Permissions !"} btn1="OK" btn2="" onClose={gotoGrid}/>}
        </div>
      </div>
    </div>

  );
};

export default EditTableRole;
