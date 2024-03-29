import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

export type Role = {
  access: string;
  newRole?: string;
  BORMAdmin?: string;
  RLO?: string;
  PO?: string;
  ICO?: string;
  subRows?: Role[]; //Each person can have sub rows of more people
};

export const data: Role[] = [
  {
    access: 'User Managment',
    subRows: [
      {
        access: 'Create User',
        newRole: "",
        BORMAdmin: 'true',
        RLO: 'false',
        PO: 'false',
		ICO:'true',
      },
      {
        access: 'Edit User',
        newRole: 'false',
        BORMAdmin: 'true',
        RLO: 'false',
        PO: 'false',
		ICO:'true',
      },
      {
        access: 'View User',
        newRole: 'false',
        BORMAdmin: 'true',
        RLO: 'false',
        PO: 'false',
		ICO:'true',
      },
    ],
  },
  {
    access: 'Role Managment',
    subRows: [
      {
        access: 'Create New Role',
        newRole: 'false',
        BORMAdmin: 'true',
        RLO: 'false',
        PO: 'false',
		ICO:'true',
      },
      {
        access: 'Edit User',
        newRole: 'false',
        BORMAdmin: 'true',
        RLO: 'false',
        PO: 'false',
		ICO:'true',
      },
      {
        access: 'View User',
        newRole: 'false',
        BORMAdmin: 'true',
        RLO: 'false',
        PO: 'false',
		ICO:'true',
      },
    ],
  },
  {
    access: 'Role Managment 2',
    subRows: [
      {
        access: 'Create New Role',
        newRole: 'false',
        BORMAdmin: 'true',
        RLO: 'false',
        PO: 'false',
		ICO:'true',
      },
      {
        access: 'Edit User',
        newRole: 'false',
        BORMAdmin: 'true',
        RLO: 'false',
        PO: 'false',
		ICO:'true',
      },
      {
        access: 'View User',
        newRole: 'false',
        BORMAdmin: 'true',
        RLO: 'false',
        PO: 'false',
		ICO:'true',
      },
    ],
  },
  {
    access: 'Loss Data Managment',
    subRows: [
      {
        access: 'Create Loss data',
        newRole: 'false',
        BORMAdmin: 'true',
        RLO: 'false',
        PO: 'false',
		ICO:'true',
      },
      {
        access: 'Edit Loss data',
        newRole: 'false',
        BORMAdmin: 'true',
        RLO: 'false',
        PO: 'false',
		ICO:'true',
      },
      {
        access: 'Approve/Reject Loss data',
        newRole: 'false',
        BORMAdmin: 'true',
        RLO: 'false',
        PO: 'false',
		ICO:'true',
      },
    ],
  },
];

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Role>[]>(
    //column definitions...
    () => [
      {
        accessorKey: 'access',
        header: 'Access',
      },
      {
        accessorKey: 'newRole',
        header: 'New Role',
      },

      {
        accessorKey: 'BORMAdmin',
        header: 'BORM Admin',
      },
      {
        accessorKey: 'RLO',
        header: 'RLO',
      },

      {
        accessorKey: 'PO',
        enableColumnOrdering: false,
        header: 'PO',
      },
      {
        accessorKey: 'ICO',
        enableColumnOrdering: false,
        header: 'ICO',
      },
    ],
    [],
    //end
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableExpandAll: true, //hide expand all double arrow in column header
    enableExpanding: true,
    filterFromLeafRows: true, //apply filtering to all rows instead of just parent rows
    initialState: { expanded: true }, //expand all rows by default
    paginateExpandedRows: false, //When rows are expanded, do not count sub-rows as number of rows on the page towards pagination
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
