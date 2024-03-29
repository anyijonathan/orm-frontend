import { TableBoldData } from "../../../PageShared";
import { DataTable } from "../../../Table";

/**
  * <summary>
  * creates the header and data format for the detialed view table
  * </summary>
  * <param name="open, setopen, data, request, totalCount">
  * </param> 
  * <returns>
  * Formatted table data and is called by index page of DetailedView
  * </returns> 
  */
interface DetailedViewdTableProps {
  open:any,
  setopen:any
  data:any,
  request:any
  totalCount:number
  onChangePage: (page: number) => void;
}
const headers = [
  {

    title: "Request Id",

  },
  {

    title: "Trans Date",

  },
  {

    title: "Status",

  },
  {

    title: "Amount",

  },
  {

    title: "Cr Acct No",

  },
  {

    title: "Dr Acct No",

  },
  {

    title: "Narration",

  },
  {

    title: "Stan",

  },
  {

    title: "Payer Name",

  },
  {

    title: "Payer Account Number",

  },
  {

    title: "Payer Address",

  },
  {

    title: "Bank Id",

  },
  {

    title: "Response Code",

  },
  {

    title: "Response Updated Date",

  },
  {

    title: "Tran Ref No",

  },
  {

    title: "Session Number",

  },
  {

    title: "Orig Debit Ref No",

  },
  {

    title: "Last Response Code",

  },
  {

    title: "Hashstr",

  },
];

const TableDetailedView = ({
  open,
  setopen,
  data,
  request,
  totalCount,
  onChangePage
  }: DetailedViewdTableProps) => {
 
  let data1 = []
  let array= data
  if(array){
  for (const i of array) {
        
    let item= [
   
        {
   
          title: <TableBoldData title={i.requestid.toString()}/>,
  
       },
       {
   
        title: <TableBoldData title={i.transdate.toString()}/>,

      },
      {
   
        title: <TableBoldData title={i.status.toString()}/>,

      },
      {
   
        title: <TableBoldData title={i.amount.toString()} />,

     },
      {
   
        title: <TableBoldData title={i.cracctno.toString()} />,

     },
     {

        title: <TableBoldData title={i.dracctno.toString()} />,

     },
     {
   
      title: <TableBoldData title={i.narration.toString()} />,

     },
     {
   
      title: <TableBoldData title={i.stan.toString()}/>,

     },
     {
   
      title: <TableBoldData title={i.payername.toString()}/>,

     },
    {
  
      title: <TableBoldData title={i.payeraccountnumber.toString()}/>,

    },
    {

      title: <TableBoldData title={i.payeraddress.toString()}/>,

    },
    {
   
      title: <TableBoldData title={i.bankid.toString()} />,

    },
    {
    
      title: <TableBoldData title={i.responsecode.toString()}/>,

    },
    {
    
      title: <TableBoldData title={i.responseUpdatedDate.toString()} />,

    },
    {
    
      title: <TableBoldData title={i.tranrefno.toString()}/>,

    },
    {
    
      title: <TableBoldData title={i.sessionnumber.toString()} />

    },
    {
    
      title: <TableBoldData title={i.origdebitrefno.toString()}/>,

    },
    {
      
        title: <TableBoldData title={i.lastResponsecode.toString()} />,

    },
    {
      
      title: <TableBoldData title={i.hashstr.toString()} />,

    },

   
       ]
   
       data1.push(item)
   
   }
  }
  return (
        <div className="modelTable">
          <DataTable headers={headers} data={[...data1]} paginator={true}  totalCount={totalCount} onChangePage={onChangePage} />
        </div>
  );
};

export default TableDetailedView;