import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableBoldData, TableLightData } from "../../../../Components/PageShared";
import { Button, IconButton } from "../../../../Components/Buttons";
import { ColorCheck, Delete, EditPenOnly, EyeOpenIcon } from "../../../../Components/Icons";
import { DataTable } from "../../../../Components/Table";
import { useAppDispatch, useAppStateSelector } from "../../../../Services/Store/hooks";
import { deletekriAction, kriDetailsAction } from "../../../../Services/Actions/kriAction";
import AlertBox from "../../../../Components/PageShared/Admin/Alert/alert";
interface TableProps {
  props: any,
  request:any,
  totalCount:number
  onChangePage: (page: number) => void;
  paginator:boolean
  setRefreshs: (refresh:boolean) => void;
}
const headers = [
  {

    title: "Reference Number",

  },
  {

    title: "Reporting Period",

  },
  {

    title: "Branch/Department",

  },
  {

    title: "Region",

  },
  {

    title: "Status",

  },
  
  {

    title: "Date Submitted",

  },
  {

    title: "Submitted By",

  },
  {

    title: "Reviewer",

  },
  {

    title: "Actions",

  }
  
];

const DepartmentTable = ({
  props,
  request,
  totalCount,
  onChangePage,
  paginator,
  setRefreshs
}: TableProps) => {
  let data = []
  const dispatch = useAppDispatch();
const [reportId,setReportId] =useState(0);
let KriData:any[]=[];
KriData.push(useAppStateSelector((state) => state.kriState.KriGridReportData));
const authState:any = useAppStateSelector((state) => state.authState)
const locationState:any = useAppStateSelector((state) => state.locationDataState);

  useEffect(() => {
    // fetchData() 
    }, []);

    const navigate = useNavigate();
  const handleViewKriData = (id:number) => {
    let userRole:string=authState?.userData?.data?.data?.userRole;
        userRole=userRole?.toLocaleLowerCase();
        const url = "/view-kri-data-branch";
        navigate(`/${userRole}${url}`,
        {state:[id]});
  };

  const handleApproveKriData = (id:number) => {
    let userRole:string=authState?.userData?.data?.data?.userRole;
    userRole=userRole?.toLocaleLowerCase();
    const url='/approve-kri';
    navigate(`/${userRole}${url}`,
    {state:[id]});
  };

  const handleDeleteKriData = (id:number) => {
    setReportId(id)
    setOpenAlertBox(true);
  };

  const handleEditKriData = (id:number, loc:number) => {
    let userRole:string=authState?.userData?.data?.data?.userRole;
    userRole=userRole?.toLocaleLowerCase();
    const url='/log-kri-create-edit';
     navigate(`/${userRole}${url}`,{
      state:[{id},{loc},{mode:"edit"}]
     });
  };
  const [openAlertBox, setOpenAlertBox] = useState(false);
  const [openDelAlertBox, setOpenDelAlertBox] = useState(false);

  if(props){
    for (const iterator of props ?? KriData[0]?.[0].kriData) {
        let activeLocationName= "";
        if(iterator.locationType==="B"){
          activeLocationName= iterator.branch;
        }else{
          activeLocationName= iterator.department;
        }
    let item= [
   
        {
   
          title: <TableBoldData title={iterator?.reportRefNo?.toString()}/>,
  
       },
       {
   
        title:
        <TableBoldData title={iterator?.reportingPeriod} />,
    
     },
      {
   
        title: <TableBoldData title={activeLocationName?.toString()}/>,

      },
      {
   
        title: <TableBoldData title={iterator.region?.toString()} />,

     }, 
      {
   
        title:<><span className="badge"><div className={iterator.status?.toString()}>{iterator.status?.toString()}</div></span></> ,

     },
     
     {
   
      title: 
      <div>
        <TableBoldData title={iterator?.dateReported?.toString().substring(0,10)}/>
        <TableLightData title={iterator?.dateReported?.toString().substring(11,19)}/>
      </div>
    }, 
     {
   
      title:
      <TableBoldData title={iterator.submittedBy?.toString()} />,

   },
   {
   
    title:
    <TableBoldData title={iterator.validatorILOUserName?.toString()} />,

 },
      
     {

        title: <div style={{display: "flex"}}>
             <IconButton
            color="neutral"
            icon={<EyeOpenIcon />}
            onClick={ ()=> handleViewKriData(iterator?.id)}
            style={{ padding: "0", width: "auto", border: "none", marginRight: "10px" }}
            />
             {iterator.submittedBy?.toString() == authState?.userData?.data?.data?.userName &&
             iterator.status?.toString() == "Draft" &&
            <>
            <IconButton
            color="neutral"
            icon={<EditPenOnly />}
            onClick={ ()=> handleEditKriData(iterator?.id, iterator?.locationId)}
            style={{ padding: "0", width: "auto", border: "none", marginRight: "10px" }}
            />
            {/* <IconButton
            color="neutral"
            onClick={ ()=> handleDeleteKriData(iterator?.id)}
            icon={<Delete />}
            style={{ padding: "0", width: "auto", border: "none", marginRight: "10px" }}
            /> */}
            </>}
            {/* {iterator.status?.toString() == "Submitted" && <IconButton
            color="neutral"
            icon={<ColorCheck />}
            onClick={ ()=> handleApproveKriData(iterator?.id)}
            style={{ padding: "0", width: "auto", border: "none", marginRight: "10px" }}
            />} */}
            </div>
     }
   
       ]
   
       data.push(item)
   
   }
  }

  const closeAlert = ( result: string) => {
    if(result==="ok") {
        // console.log('Clicked:', pageData[0]?.kriReportId);
        DeleteKriRecordMetric();
    }
  };

  const closeDelAlert = ( result: string) => {
    if(result==="ok") {
        // console.log('Clicked:', pageData[0]?.kriReportId);
        setOpenDelAlertBox(false);   
        setRefreshs(true);     
    }
  };

  const DeleteKriRecordMetric= async() =>{
    await dispatch(deletekriAction({reportId})).then((res:any) =>{
      var result= res?.payload?.requestData?.data;
      if(result) {
        setOpenDelAlertBox(true);
      }
    });
  }
  return (
   <>
      <DataTable headers={headers} data={[...data]} totalCount={totalCount} onChangePage={onChangePage} paginator={true}  />
      
      {openAlertBox && <AlertBox open={openAlertBox} setopen={setOpenAlertBox} data={"msg"} title={"Alert"} message={"Are you sure you want to Delete KRI Report ?"} btn1={"OK"} btn2={"Cancel"} onClose={closeAlert} />}
      {openDelAlertBox && <AlertBox open={openDelAlertBox} setopen={setOpenDelAlertBox} data={"msg"} title={"Alert"} message={"KRI Report has been deleted successfully!"} btn1={"OK"} btn2={""} onClose={closeDelAlert} />}

      </>
  );
};

export default DepartmentTable;
