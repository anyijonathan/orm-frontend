import {useState } from "react";
import { DataTable } from "../../../Components/Table";
import { TableBoldData, TableFiltersContainer } from "../../../Components/PageShared";
interface TransactionsTableProps {
  props: any,
  request:any,
  totalCount:number
  onChangePage: (page: number) => void;
  paginator:boolean
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

    title: "Cr. Acct No.",

  },
  {

    title: "Dr. Acct No.",

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

    title: "Payer AccNo.",

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

    title: "Tran Ref No.",

  },
  {

    title: "Session Number",

  },
  {

    title: "Orig Debit Ref No",

  },
  {

    title: "Last Response Code",

  }
  
];


const KriTable = ({
  props,
  request,
  totalCount,
  onChangePage,
  paginator
}: TransactionsTableProps) => {
  let titleData = "Transaction Detail for upload for "+"request id "+ request
  console.log(props)
  let data = []
  let array= props

 // console.log('array.table_transactins view_view',props)
  if(array){
  for (let i = 0; i < array.length; i++) {
        
    let item= [
   
        {
   
          title: <TableBoldData title={array[i].requestid?.toString()}/>,
  
       },
       {
   
        title: <TableBoldData title={array[i]?.transdate.toString()}/>,
        
      },
      {
   
        title: <TableBoldData title={array[i].status?.toString()}/>,

      },
      {
   
        title: <TableBoldData title={array[i].amount?.toString()} />,

     },
      {
   
        title: <TableBoldData title={array[i].cracctno?.toString()} />,

     },
     {

        title: <TableBoldData title={array[i].dracctno?.toString()} />,

     },
     {
   
      title: <TableBoldData title={array[i].narration?.toString()} />,

     },
     {
   
      title: <TableBoldData title={array[i].stan?.toString()}/>,

     },
     {
   
      title: <TableBoldData title={array[i].payername?.toString()}/>,

     },
    {
  
      title: <TableBoldData title={array[i].payeraccountnumber?.toString()}/>,

    },
    {

      title: <TableBoldData title={array[i].payeraddress?.toString()}/>,

    },
    {
   
      title: <TableBoldData title={array[i].bankid?.toString()} />,

    },
    {
    
      title: <TableBoldData title={array[i].responsecode?.toString()}/>,

    },
    {
    
      title: <TableBoldData title={array[i].responseUpdatedDate.toString()} />,
      
    },
    {
    
      title: <TableBoldData title={array[i].tranrefno?.toString()}/>,

    },
    {
    
      title: <TableBoldData title={array[i].sessionnumber?.toString()} />

    },
    {
    
      title: <TableBoldData title={array[i].origdebitrefno?.toString()}/>,

    },
    {
      
        title: <TableBoldData title={array[i].lastResponsecode?.toString()} />,

    },
   
       ]
   
       data.push(item)
   
   }
  }
  return (
    <>
      <DataTable headers={headers} data={[...data]} totalCount={totalCount} onChangePage={onChangePage} paginator={true}  />
    </>
  );
};

export default KriTable;
