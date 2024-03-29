import { useMemo, useEffect, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../../../Services/Store/hooks';
import { viewRoleDetails } from '../../../../Services/Actions/userAction';
import { Roles } from './editTableGrouping';

export type Role = {
  access: string;
  subRows?: Role[]; // Each person can have sub rows of more people
};

export let data: Role[] =[];
let arrayHeader:any[]=[];
let roleData:string="";
let rowTitles: any[] = [];


const ViewTableRole = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
// const [data,setData] = useState<Role[]>([]);
const[ roleTitle , setRoleTitle ] = useState("");
// let rowTitles: any[] = [];
  useEffect(() => {

    const input = state[0].RoleData;
    type Role = typeof input[number]['subRows'][number];    
    setRoleTitle(state[1].RoleTitle);
    
     roleData=state[1].RoleTitle;
    const role: Role[] = state[0].RoleData;
      // setData(role)
      data=role;
      console.log(state[0].RoleData);

      setUpPage(roleData);
    }, []);
  
    const setUpPage=(roleData:string) =>{
      let  firstDataSubRows: Role[] = [];
      if(data.length > 0 && data[0].subRows != undefined){
      firstDataSubRows = data[0].subRows;
      arrayHeader = Object.keys(firstDataSubRows[0]);}
      // roleTitle = state[1].RoleTitle;
      const EditIndex = arrayHeader?.findIndex((str) => str === roleTitle || str === roleData);
      if(EditIndex >0){
      const swap= arrayHeader[1];
      arrayHeader[1]=arrayHeader[EditIndex];
      arrayHeader[EditIndex]=swap;
      }
      // let rowTitles: any[] = [];
      for (let i = 0; i < data.length; i++) {
        rowTitles.push(data[i].access);
      }
      columns;
      

    }


    const formatedCol= (col:any)=>{
        return col;
    }

  const columns = useMemo<MRT_ColumnDef<Role>[]>(
    () => {
      return arrayHeader.map((header:any, index:any) => {
        if (index === 0) {
          return {
            accessorKey: header,
            header: header === 'access' ? 'Access' : header,
          };
        }
        return {
          accessorKey: header,
          header: header === 'access' ? 'Access' : header,

          Cell: ({ row }) => (
            rowTitles.includes(row.original.access) ? null : (
              <input
                type="checkbox"
                checked={row.original[header]}
                readOnly
                disabled
              />
            )
          ),
        };
      });
    },
    [arrayHeader, rowTitles]
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableExpandAll: true,
    enableExpanding: true,
    filterFromLeafRows: true,
    initialState: { expanded: true },
    paginateExpandedRows: false,
  });

  return <MaterialReactTable table={table} />;
};

export default ViewTableRole;