import { DataTable } from "../../../Components/Table";
import { TableBoldData } from "../../../Components/PageShared";
interface TransactionsTableProps {
  props: any,
  request:any,
  totalCount:number
  onChangePage: (page: number) => void;
  paginator:boolean
}

const headers = [
  {

    title: "Date Of Creation",

  },
  {

    title: "Company Name",

  },
  {

    title: "No. Of Indicators",

  },
  {

    title: "Status",

  }
  
];


const KriTable = ({
  props,
  request,
  totalCount,
  onChangePage,
  paginator
}: TransactionsTableProps) => {
  let data = []
  let array= props

 // console.log('array.table_transactins view_view',props)
  if(array){
    for (const iterator of array) {
        
    let item= [
   
        {
   
          title: <TableBoldData title={iterator.requestid?.toString()}/>,
  
       },
       {
   
        title: <TableBoldData title={iterator?.transdate.toString()}/>,
        
      },
      {
   
        title: <TableBoldData title={iterator.status?.toString()}/>,

      },
      {
   
        title: <TableBoldData title={iterator.amount?.toString()} />,

     },
      {
   
        title: <TableBoldData title={iterator.cracctno?.toString()} />,

     },
     {

        title: <TableBoldData title={iterator.dracctno?.toString()} />,

     },
     {
   
      title: <TableBoldData title={iterator.narration?.toString()} />,

     },
     {
   
      title: <TableBoldData title={iterator.stan?.toString()}/>,

     },
     {
   
      title: <TableBoldData title={iterator.payername?.toString()}/>,

     },
    {
  
      title: <TableBoldData title={iterator.payeraccountnumber?.toString()}/>,

    },
    {

      title: <TableBoldData title={iterator.payeraddress?.toString()}/>,

    },
    {
   
      title: <TableBoldData title={iterator.bankid?.toString()} />,

    },
    {
    
      title: <TableBoldData title={iterator.responsecode?.toString()}/>,

    },
    {
    
      title: <TableBoldData title={iterator.responseUpdatedDate.toString()} />,
      
    },
    {
    
      title: <TableBoldData title={iterator.tranrefno?.toString()}/>,

    },
    {
    
      title: <TableBoldData title={iterator.sessionnumber?.toString()} />

    },
    {
    
      title: <TableBoldData title={iterator.origdebitrefno?.toString()}/>,

    },
    {
      
        title: <TableBoldData title={iterator.lastResponsecode?.toString()} />,

    },
   
       ]
   
       data.push(item)
   
   }
  }
  return (
   
      <DataTable headers={headers} data={[...data]} totalCount={totalCount} onChangePage={onChangePage} paginator={true}  />
   
  );
};

export default KriTable;
