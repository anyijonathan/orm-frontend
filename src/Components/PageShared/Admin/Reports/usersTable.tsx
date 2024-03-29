import { DataTable } from "../../../Table";
import { TableBoldData } from "../../../PageShared";

/**
  * <summary>
  * creates the summary section table for the dashboard page
  * </summary>
  * <param name="props, totalCount, paginator">
  * </param> 
  * <returns>
  * returns formatted table for summary section on request from Dashboard index page
  * </returns> 
  */
interface UploadsTableProps {
  props: any,
  totalCount:number
  onChangePage: (page: number) => void;
paginator:boolean
}

const UploadsTable = ({props,
  totalCount,
  onChangePage,
  paginator
}: UploadsTableProps) => {
  const headers = [
   
    {
  
      title: "Request Id",
  
    },
    {
  
      title: "Request Type",
  
    },
    {
  
      title: "Status",
  
    },
    {
  
      title: "Total Count",
  
    },
   
    {
  
      title: "Initiated Date",
  
    },
    {
  
      title: "Completed Date",
  
    },
    {
  
      title: "Retry Count",
  
    },
    {
  
      title: "Processed Count",
  
    },
  
    {
  
      title: "Bank Id",
  
    },
    {
  
      title: "Session No",
  
    },
    {
  
      title: "Source Filename",
  
    },
    {
  
      title: "Uploaded",
  
    },
  ];
  
  let data = []
  let array= props
  if(props){
  for (let i = 0; i < props.length; i++) {
        
    let item= [
      
       {
        title: <TableBoldData title={array[i]?.requestid?.toString()} />,
        
  
   
        },
        {
   
          title: <TableBoldData title={array[i]?.requesttype?.toString()} />,
  
       },
       {
   
        title: <TableBoldData title={array[i]?.status?.toString()} />,

       },

      {

        title: <TableBoldData title={array[i]?.totalcount?.toString()} />

      },
      {
   
        title: <TableBoldData title={(new Date(array[i]?.initiateddate))?.toLocaleDateString('en-GB', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).split('/').join('-').toString()} />,

      },
   
       {
   
           title: <TableBoldData title={(new Date(array[i]?.completeddate))?.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }).split('/').join('-').toString()} />,
           
        },
   
        {
   
          title: <TableBoldData title={array[i]?.retrycount?.toString()} />,
  
       },
   
       {
   
           title: <TableBoldData title={array[i]?.processedcount?.toString()} />,
   
        },
   
       {
   
           title: <TableBoldData title={array[i]?.bankid?.toString()} />,
   
        },   
   
       {
   
           title: <TableBoldData title={array[i]?.sessionno?.toString()}/>,
   
        },
   
       {
   
           title: <TableBoldData title={array[i]?.sourcefilename?.toString()}/>,
   
        },
   
        {
   
           title: <TableBoldData title={array[i]?.uploaded?.toString()}/>,
   
         },
        
   
       ]
   
       data.push(item)
   
   }
  }
  return (
         <DataTable headers={headers}  data={[...data]} paginator={paginator}   totalCount={totalCount}
          onChangePage={onChangePage} />
  );
};

export default UploadsTable;
