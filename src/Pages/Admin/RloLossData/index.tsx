import { useEffect, useLayoutEffect, useState } from "react";
import { BackButton, Button, IconButton } from "../../../Components/Buttons";

import {
  SelectDropDown,
} from "../../../Components/DropDown";
import {
  PageHeader
} from "../../../Components/PageShared";
import styles from "../../../Assets/Styles/pageShared.module.scss";
import { useAppDispatch, useAppStateSelector } from "../../../Services/Store/hooks";
import {
  CreateLossDataAction,
  getAllLossDetailAction,
  updateLossDataAction,
} from "../../../Services/Actions/lossAction";
import { useLocation, useNavigate } from "react-router-dom";
import AlertBox from "../../../Components/PageShared/Admin/Alert/alert";
import DropFileInput from "../../../Components/DropFileInput/dropFileInput";
import { getCurrentRole } from "../../../Services/Utils/route";
import { getuserbyrolelocationAction } from "../../../Services/Actions/userAction";
import AdminLocation from "../../../Components/PageShared/Location/AdminLocation";
import { addLocation } from "../../../Services/Reducers/locationSlice";
import { EditPenOnly } from "../../../Components/Icons";

const formValue = {
  InternalBusinessLineId: "",
  LossType: "",
  Currency: "NGN",
  DateOfOccurrence: "",
  DateDiscovered: "",
  DateReported: "",
  DetailedLossEvent: "",
  RootCause: "",
  RiskSourceId: "",
  AmountInvolved: 0,
  NearMiss: 0,
  PotentialLoss: 0,
  GrossActualLoss: 0,
  AmountRecovered: 0,
  FurtherRecovery: 0,
  NetActualLoss: 0,
  Region: "",
  ProcessInvolved: "",
  RecoveryChannel: "",
  StaffInvolvement: "",
  EventStatus: "",
  ReportStatus: "",
  Department: "",
  parentId: "",
  refId: "",
  id: 0,
  documents:"",
  documentName:"",
  fileType:"",
  locationName:"",
  region:"",
};

interface Loc {
  locationId: string;
  locationName: string;
  locationType: string;
  region: string;
}

type MyData = {
  ReportStatus: string;
};

const LossData = () => {
  const onFileChange = (files: FileList) => {
    console.log(files);
  }
  const dispatch = useAppDispatch();
  const [BusinessLine, setBusinessLine] = useState("");
  const [OpenLossType, setOpenLossType] = useState(false);
  const [openAlertSave, setOpenAlertSave] = useState(false);
  const [openAlertSavenew, setOpenAlertSavenew] = useState(false);
  const [lossType, setLossType] = useState("");
  const [currency, setCurrency] = useState("");
  const [currencyOpenb, setCurrencyOpenb] = useState(false);
  const [currencyOpenc, setCurrencyOpenc] = useState(false);
  const [currencyOpend, setCurrencyOpend] = useState(false);
  const [currencyOpene, setCurrencyOpene] = useState(false);
  const [currencyOpenf, setCurrencyOpenf] = useState(false);
  const [currencyOpeng, setCurrencyOpeng] = useState(false);
  const [openICOName, setOpenICOName] = useState(false);
  const [isRecordSaved, setIsRecordSaved] = useState(false);
  const [Region, setRegion] = useState("");
  const [eventStatus, setEventStatus] = useState("");
  const [Department, setDepartment] = useState("");
  const [dateOfOccurrence, setFromdate] = useState("");
  const [dateDiscovered, setTodate] = useState("");
  const [dateReported, setDateReported] = useState("");
  const [maxDate, setMaxdate] = useState("");
  const [minDate, setMinDate] = useState("");
  const [formValues, setFormValues] = useState(formValue);
  const { state } = useLocation();
  const [data, setData] = useState<MyData[]>([]);
  const [openAlertBoxApprove, setOpenAlertBoxApprove] = useState(false);
  const navigate = useNavigate();
  const [parentId, setParentId] = useState("");
  const [ifParent, setIfParent] = useState(false);
  const [calcNetloss, setCalcNetloss] =useState(0);
  const [reportId, setReportId] =useState(0);
  const [icoUser, setIcoUser] = useState<any>([]);
  const [icoGia,setIcoGia] = useState("");
  const [icoGiaName,setIcoGiaName] = useState("");
  const [reportingLocation,setReportingLocation] = useState("");
  const [isLocationDetail, setIsLocationDetail] = useState(false);
  const [saveAlertPopUp, setSaveAlertPopUp] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  let userState:any = useAppStateSelector((state) => state.authState)
  let locationState:any = useAppStateSelector((state) => state.locationDataState)

  let action: any;
  if (state && state.length > 0) {
    action = state[0]?.action;
  }
  let data1: any = [];
  formValues.DateReported= new Date().toLocaleDateString('en-CA').toString();

  useLayoutEffect(() => {    
  
    if(userState?.userData?.data?.data?.userRole?.toLocaleLowerCase().includes("admin")){
      setIcoGia(userState?.userData?.data?.data?.userId);
    }else{
      getico();
    }
  }, []);
  useEffect(() => {
    setReportingLocation(locationState?.currentLocation.locationName)
  }, [locationState]);
  useEffect(() => {
    setReportingLocation(locationState?.currentLocation.locationName)
    data1= state[1].item;
    if (action == "edit") {
      setReportId(state[1]?.item?.id);
      fetchEditData(state[1]?.item?.id);      
    }else{
      if(userState?.userData?.data?.data?.userRole?.toLocaleLowerCase().includes("admin")){
      setIsLocationDetail(true);
      setReportingLocation(locationState?.currentLocation.locationName)
      }
    }
    
    if(action == "create"){
      formValues.DateReported= new Date().toLocaleDateString('en-CA').toString();
      formValues.ReportStatus="";
      setLossType("");
      setCurrency("NGN");
      formValues.id = 0;
      formValues.InternalBusinessLineId = "";
      formValues.DetailedLossEvent = "";
      formValues.NearMiss = 0;
      formValues.PotentialLoss = 0;
      formValues.GrossActualLoss = 0;
      formValues.FurtherRecovery = 0;
      formValues.NetActualLoss = 0;
      formValues.RootCause = "";
      formValues.RiskSourceId = "";
      formValues.AmountInvolved = 0;
      formValues.AmountRecovered = 0;
      formValues.ProcessInvolved = "";
      formValues.RecoveryChannel = "";
      formValues.StaffInvolvement = "";
      formValues.Region = "";
      formValues.EventStatus = "";
      formValues.Department = "";
      formValues.AmountRecovered = 0;
      formValues.LossType = "";
      formValues.Currency = "NGN";
      formValues.DateOfOccurrence = "";
      formValues.DateDiscovered = "";
      formValues.parentId = "";
      formValues.refId = "";
      formValues.documents = "";
      formValues.fileType = "";
      formValues.locationName=locationState?.currentLocation.locationName;
      formValues.region=locationState?.currentLocation.region;
    }
  //     if(reportingLocation == ""){
  //   setIsLocationDetail(true);
  // }  
  }, []);


  const fetchEditData = async(id:number) =>{
    await dispatch(getAllLossDetailAction({id})).then(async (res:any)=>{
      const result= res.payload.requestData.data.data[0];
      console.log(result);
      setIcoGia((p:any)=>p=state[1]?.item?.validatorILOid)
      setIcoGiaName((p:any)=>p=state[1]?.item?.validatorILOUserName);
      setLossType(state[1]?.item?.lossType);
      setCurrency(state[1]?.item?.currency);
      formValue.id=state[1]?.item?.id;
      formValues.InternalBusinessLineId = state[1]?.item?.internalBusinessLineId;
      formValues.DateReported = state[1]?.item?.dateReported;
      formValues.DetailedLossEvent = state[1]?.item?.detailedLossEvent;
      formValues.NearMiss = state[1]?.item?.nearMiss;
      formValues.PotentialLoss = state[1]?.item?.potentialLoss;
      formValues.GrossActualLoss = state[1]?.item?.grossActualLoss;
      formValues.FurtherRecovery = state[1]?.item?.furtherRecovery;
      formValues.NetActualLoss = state[1]?.item?.netActualLoss;
      setCalcNetloss(state[1]?.item?.netActualLoss);
      formValues.RootCause = state[1]?.item?.rootCause;
      formValues.RiskSourceId = state[1]?.item?.riskSourceId;
      formValues.AmountInvolved = state[1]?.item?.amountInvolved;
      formValues.AmountRecovered = state[1]?.item?.amountRecovered;
      formValues.ProcessInvolved = state[1]?.item?.processInvolved;
      formValues.RecoveryChannel = state[1]?.item?.recoveryMode;
      formValues.StaffInvolvement = state[1]?.item?.staffInvolvement;
      formValues.Region = state[1]?.item?.region;
      formValues.EventStatus = state[1]?.item?.eventStatus;
      formValues.ReportStatus = state[1]?.item?.reportStatus;
      formValues.Department = state[1]?.item?.department;
      formValues.AmountRecovered = state[1]?.item?.amountRecovered;
      formValues.LossType = state[1]?.item?.lossType;
      formValues.Currency = state[1]?.item?.currency;
      formValues.DateOfOccurrence = state[1]?.item?.dateOfOccurrence;
      formValues.DateDiscovered = state[1]?.item?.dateDiscovered;
      formValues.parentId = state[1]?.item?.refId;
      formValues.refId = state[1]?.item?.id;
      formValues.documents= result?.documents;
      formValues.documentName= result?.documentName;
      formValues.fileType= result?.fileType;
      formValues.locationName= result?.locationType==="B" ? result?.branch : result?.department;
      formValues.region = result?.region;

        const loc: Loc = {
          locationId: result?.locationId, // Set location ID from selected option
          locationName: formValues.locationName, // Set location name from selected option
          locationType: result?.locationType, // Set location type from authState
          region: result?.region,
          // authState.userData.data.data.locationType === "B" ? authState.userData.data.data.region : "", // Set region conditionally based on location type
        };  
        await dispatch(addLocation(loc));
    })
  }

  const handleDownloadButtonClick = (base64Data: string, fileType: string, fileName:string) => {
    if (base64Data) {
      // Decode base64 data
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
  
      // Create Blob based on the file type
      const blob = new Blob([byteArray], { type: `application/${fileType}` });
  
      // Create a download link
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${fileName}`; // Set the desired file name with the correct extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getico=async ()=>{
    await dispatch (getuserbyrolelocationAction(
  {   LocationId:locationState?.currentLocation?.locationId,
      RoleId:0,    //ICO roleID
      RoleTitle:"ICO",
      userStatus:"",
      PageNumber: 1, }  
    )).then((res:any)=>{
      const result= res?.payload?.requestData?.data?.data?.data;
      const dropdownOptions = result.map((user:any) => ({
        label: user.userName,
        value: user.userId
      }));
      setIcoUser(dropdownOptions);
    })

  }  
  const handleRequest = (action: any) => {
    setOpenAlertBoxApprove(true);
  };
  const saveLossData = async (result: any) => {
    if(result == "ok"){
      setLoading(true)
    if(formValues?.id != 0){
      const formData = new FormData();
      formData.append('id',formValues?.id?.toString());
      formData.append('LocationType', locationState?.currentLocation?.locationType);
      formData.append('LocationId', locationState?.currentLocation?.locationId);
      formData.append('ValidatorILOUserId', icoGia);
      formData.append('DateOccurance',formValues?.DateOfOccurrence?.toString());
      formData.append('DateDiscovery',formValues?.DateDiscovered?.toString());
      formData.append('DateReported',formValues?.DateReported?.toString());
      formData.append('Description',formValues?.DetailedLossEvent);
      formData.append('RootCauseRLO',formValues?.RootCause);
      formData.append('LossType',formValues?.LossType);
      formData.append('CurrencyType',formValues?.Currency);
      formData.append('AmountInvolved',formValues?.AmountInvolved.toString());
      formData.append('NearMissAmount',formValues?.NearMiss.toString());
      formData.append('PotentialLossAmount',formValues?.PotentialLoss.toString());
      formData.append('GrossActualAmount',formValues?.GrossActualLoss.toString());
      formData.append('RecoveredAmount',formValues?.AmountRecovered.toString());
      formData.append('FurtherRecoveredAmount',formValues?.FurtherRecovery.toString());
      formData.append('RecoveryChannel',formValues?.RecoveryChannel);
      formData.append('StaffInvolvement',formValues?.StaffInvolvement);
      formData.append('EventStatus',formValues?.EventStatus);
      formData.append('ReportStatus',"Draft");
      formData.append('modifiedById',userState?.userData?.data?.data?.userId?.toString());

    for (const document of registrationDocument) {
      formData.append('registrationDocuments', document, document.name);
      formData.append('documentName', document.name);
    }
    await dispatch(updateLossDataAction({formData})).then(
      (response: any) => {
      if(response){
        setLoading(true)
        setSaveAlertPopUp(true);

        // let userRole:string=userState?.userData?.data?.data?.userRole;
        // userRole=userRole.toLocaleLowerCase();
        // const url = "/rlo-loss-data";
        // navigate(`/${userRole}${url}`);
      }
      }
    );
  }}
  };
  const SubmitNewLossData=async (result: any)=>{
    if(result == "ok"){
      setLoading(true)
      let status="";
      let userRole:string=userState?.userData?.data?.data?.userRole;
      if (userRole?.toLocaleLowerCase()?.includes("borm") || userRole?.toLocaleLowerCase()?.includes("admin")){
      saveNewLossData("Submitted-UpdatedByBORM")
      }else{
      saveNewLossData("Submitted")
      }
    }
  }
  const SaveNewLossData=async (result: any)=>{
    if(result == "ok"){
      setLoading(true)
      await saveNewLossData("Draft")
    }
  }

  const saveNewLossData = async (status: string) => {
    setLoading(true)
    if(formValues?.id != 0){
      const formData = new FormData();
      formData.append('id',formValues?.id?.toString());
      formData.append('LocationType', locationState?.currentLocation?.locationType);
      formData.append('LocationId', locationState?.currentLocation?.locationId);
      formData.append('ValidatorILOUserId', icoGia);
      formData.append('DateOccurance',formValues.DateOfOccurrence);
      formData.append('DateDiscovery',formValues.DateDiscovered.toString());
      formData.append('DateReported',formValues.DateReported.toString());
      formData.append('Description',formValues.DetailedLossEvent);
      formData.append('RootCauseRLO',formValues.RootCause);
      formData.append('LossType',formValues.LossType);
      formData.append('CurrencyType',formValues.Currency);
      formData.append('AmountInvolved',formValues.AmountInvolved.toString());
      formData.append('NearMissAmount',formValues.NearMiss.toString());
      formData.append('PotentialLossAmount',formValues.PotentialLoss.toString());
      formData.append('GrossActualAmount',formValues.GrossActualLoss.toString());
      formData.append('RecoveredAmount',formValues.AmountRecovered.toString());
      formData.append('FurtherRecoveredAmount',formValues.FurtherRecovery.toString());
      formData.append('RecoveryChannel',formValues.RecoveryChannel);
      formData.append('StaffInvolvement',formValues.StaffInvolvement);
      formData.append('EventStatus',formValues.EventStatus);
      formData.append('ReportStatus',status);
      formData.append('modifiedById',userState?.userData?.data?.data?.userId?.toString());

    for (const document of registrationDocument) {
      formData.append('registrationDocuments', document, document.name);
      formData.append('documentName', document.name);
    }
      let id=0;
      await dispatch(updateLossDataAction({formData})).then(
        (response: any) => {
        const result= response?.payload?.requestData?.data;
        if(result?.code == "00"){
          id= result?.data[0]?.id;
          setReportId(id);
        }
      setLoading(false)
        let userRole:string=userState?.userData?.data?.data?.userRole;
        userRole=userRole.toLocaleLowerCase();
        if(status !== "Draft"){
        const url = "/rlo-loss-data";
        navigate(`/${userRole}${url}`);
        }else{
          setSaveAlertPopUp(true);
        }
      }
      );
    }else{
      const formData = new FormData();
      formData.append('LocationType', locationState?.currentLocation?.locationType);
      formData.append('LocationId', locationState?.currentLocation?.locationId);
      formData.append('ValidatorILOUserId', icoGia);
      formData.append('DateOccurance',formValues.DateOfOccurrence);
      formData.append('DateDiscovery',formValues.DateDiscovered.toString());
      formData.append('DateReported',formValues.DateReported.toString());
      formData.append('Description',formValues.DetailedLossEvent);
      formData.append('RootCauseRLO',formValues.RootCause);
      formData.append('LossType',formValues.LossType);
      formData.append('CurrencyType',formValues.Currency);
      formData.append('AmountInvolved',formValues.AmountInvolved.toString());
      formData.append('NearMissAmount',formValues.NearMiss.toString());
      formData.append('PotentialLossAmount',formValues.PotentialLoss.toString());
      formData.append('GrossActualAmount',formValues.GrossActualLoss.toString());
      formData.append('RecoveredAmount',formValues.AmountRecovered.toString());
      formData.append('FurtherRecoveredAmount',formValues.FurtherRecovery.toString());
      formData.append('RecoveryChannel',formValues.RecoveryChannel);
      formData.append('StaffInvolvement',formValues.StaffInvolvement);
      formData.append('EventStatus',formValues.EventStatus);
      formData.append('ReportStatus',status);
      formData.append('CreatedById',userState?.userData?.data?.data?.userId?.toString());

    for (const document of registrationDocument) {
      formData.append('registrationDocuments', document, document.name);
      formData.append('documentName', document.name);
    }
    
      let id=0;
      await dispatch(CreateLossDataAction({formData})).then(
        (response: any) => {
        const result= response?.payload?.requestData?.data;
        if(result?.code == "00"){
          id= result?.data[0]?.id;
          setReportId(id);
          setIsRecordSaved(true);
        }
      setLoading(false)
        let userRole:string=userState?.userData?.data?.data?.userRole;
        userRole=userRole.toLocaleLowerCase();
        if(status !== "Draft"){
          const url = "/rlo-loss-data";
          navigate(`/${userRole}${url}`);
          }else{
            setSaveAlertPopUp(true);
          }
      }
      );

    }

  };

  const handleInputChange = (e: any, fieldName: any) => {
    // Update the corresponding input field's value
    setFormValues({ ...formValues, [fieldName]: e.target.value });
    console.log("formValues", formValues);
  };

  const navigateToGrid = () => {
    let role:string = userState?.userData?.data?.data?.userRole;
    role= role.toLocaleLowerCase();
    const url = "/rlo-loss-data";
    navigate(`/${role}${url}`, {
      state: [{ action: "cancel" }, { type: "cancel" }],
    });
    // setPageNumber(pageNumber);
  };

  const UpdateFormValue = (event:any) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });

    if (event.target.name === "GrossActualLoss"){
      const Netloss= Number(event.target.value) -
                          (Number(formValues.AmountRecovered) +
                          Number(formValues.FurtherRecovery))
      setCalcNetloss(Netloss);
    }
    if (event.target.name ===  "AmountRecovered"){
      const Netloss= Number(formValues.GrossActualLoss) -
                          (Number(event.target.value) +
                          Number(formValues.FurtherRecovery))
      setCalcNetloss(Netloss);
    }
    if (event.target.name ===  "FurtherRecovery"){
      const Netloss= Number(formValues.GrossActualLoss) -
                          (Number(formValues.AmountRecovered) +
                          Number(event.target.value))
      setCalcNetloss(Netloss);
    }
  }
  const UpdateLossType = (event:any) => {

    setFormValues({
      ...formValues,
      ["LossType"]: event
    });
  }
  const UpdateCurrency = (event:any) => {

    setFormValues({
      ...formValues,
      ["Currency"]: event
    });
  }
  const [registrationDocument,setRegistrationDocument]= useState<any[]>([]);
  const handleFileChange = (fileList: any) => {
    // Handle the file list, for example, log it to the console
    console.log('File List:', fileList);
    setRegistrationDocument(fileList);

  };

  const AdminContinueReport =()=>{
    let userRole:string=userState?.userData?.data?.data?.userRole;
    let newDataUpdate = {
      locationType: locationState?.currentLocation?.locationType,   
      locationId: locationState?.currentLocation?.locationId,           
      validatorILOUserId: userState?.userData?.data?.data?.userId,   
      dateOccurance:formValues.DateOfOccurrence ,
      dateDiscovery:formValues.DateDiscovered ,
      dateReported:formValues.DateReported ,
      description:formValues.DetailedLossEvent ,
      rootCauseRLO:formValues.RootCause ,
      lossType:formValues.LossType ,
      currencyType:formValues.Currency ,
      amountInvolved:formValues.AmountInvolved ,
      nearMissAmount:formValues.NearMiss ,
      potentialLossAmount:formValues.PotentialLoss ,
      grossActualAmount:formValues.GrossActualLoss ,
      recoveredAmount:formValues.AmountRecovered ,
      furtherRecoveredAmount:formValues.FurtherRecovery ,
      recoveryChannel:formValues.RecoveryChannel ,
      staffInvolvement:formValues.StaffInvolvement ,
      eventStatus:formValues.EventStatus ,
      reportStatus : "",
      createdById: userState?.userData?.data?.data?.userId,
      documents: registrationDocument,
        
    };
    if(userRole?.toLocaleLowerCase().includes("admin")){
      let item={id:0};
      const url='/loss-data-approval';
      navigate(`/${userRole?.toLocaleLowerCase()}${url}`, {
    state:[{action:'adminNew'},{item},{newDataUpdate}]
  })
    }
  }
  
  const AdminContinueEditReport =()=>{
    let userRole:string=userState?.userData?.data?.data?.userRole;
    let newDataUpdate = {
      locationType: locationState?.currentLocation?.locationType,   
      locationId: locationState?.currentLocation?.locationId,           
      validatorILOUserId: userState?.userData?.data?.data?.userId,   
      dateOccurance:formValues.DateOfOccurrence ,
      dateDiscovery:formValues.DateDiscovered ,
      dateReported:formValues.DateReported ,
      description:formValues.DetailedLossEvent ,
      rootCauseRLO:formValues.RootCause ,
      lossType:formValues.LossType ,
      currencyType:formValues.Currency ,
      amountInvolved:formValues.AmountInvolved ,
      nearMissAmount:formValues.NearMiss ,
      potentialLossAmount:formValues.PotentialLoss ,
      grossActualAmount:formValues.GrossActualLoss ,
      recoveredAmount:formValues.AmountRecovered ,
      furtherRecoveredAmount:formValues.FurtherRecovery ,
      recoveryChannel:formValues.RecoveryChannel ,
      staffInvolvement:formValues.StaffInvolvement ,
      eventStatus:formValues.EventStatus ,
      reportStatus : formValues.ReportStatus,
      createdById: userState?.userData?.data?.data?.userId
        
    };
    if(userRole?.toLocaleLowerCase().includes("admin")){
      let item={id:formValues.id};
      const url='/loss-data-approval';
      navigate(`/${userRole?.toLocaleLowerCase()}${url}`, {
    state:[{action:'adminEdit'},{item},{newDataUpdate}]
  })
    }
  }

  return (
    <>
      <BackButton navigate={navigate} />
      <PageHeader
        title={action == "create" ? "Create Loss Data" : "Edit Loss Data"}
      ></PageHeader>
      <div className="pageCard">
        <div className="pageCardHeader">
          <strong>{action == "create" ? "Create a Loss Data Entry Report" : "Edit Loss Data Entry Report"}</strong>
          
          <p>
            Please fill the data input and ensure the information is correct
            before submitting. All fields are mandatory except otherwise stated.
          </p>
        </div>
        <div className="grayBox">
          <div className="row">
            {/* <div className="col-3">
              <div className="form-group"><label htmlFor="">Reference Number</label><div className="viewBoxContent">11323433</div></div>
            </div> */}
            <div className="col-4">
              <div className="form-group"><label htmlFor="">Date Reported</label><div className="viewBoxContent">{formValues.DateReported.substring(0,10)}</div></div>
            </div>
            <div className="col-4">
              <div className="form-group"><label htmlFor="">Branch/Department</label><div className="viewBoxContent">{ locationState?.currentLocation.locationName}</div></div>
            </div>
          {/* {getCurrentRole()==="admin" && <IconButton
                color="neutral"
                icon={<EditPenOnly />}
                onClick={()=>{setIsLocationDetail(true)}}
                style={{ padding: "0", width: "auto", border: "none", marginRight: "10px" }}
                />} */}
            <div className="col-4">
              <div className="form-group"><label htmlFor="">Region</label><div className="viewBoxContent">{locationState?.currentLocation.region}</div></div>
            </div>
          </div>
        </div>
        <div className="row">

      <div className="col-3">
          
                { !(userState?.userData?.data?.data?.userRole?.toLocaleLowerCase().includes("admin")) 
                && 
                <div className="form-group">
                    <label htmlFor="department">ICO/GIA*</label>
                    {/* {state[0]?.action !== "edit" &&  */}
                    <SelectDropDown
                    setOpen={setOpenICOName}
                    open={openICOName}
                    onChange={(value) => {setIcoGia(value)}}
                    placeholder="Select"
                    selectedValue={icoGia}
                    options={icoUser}
                />
                </div>}
                { (userState?.userData?.data?.data?.userRole?.toLocaleLowerCase().includes("admin")) 
                && 
                <div className="form-group ml-2">
                    <label htmlFor="department">ICO/GIA*</label>
                    <label htmlFor="department">N/A</label>
                </div>
                }
            </div> 
            
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="">Date Of Occurence</label>
              <div className={styles?.dateFrom}>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Select From Date"
                  name="DateOfOccurrence"
                  onChange={(event)=>UpdateFormValue(event)}
                  value={formValues.DateOfOccurrence.toString().substring(0,10)}
                  // min={minDate}
                  max={new Date().toLocaleDateString("en-CA")}
                  required
                ></input>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="">Date of Discovery</label>
              <div className={styles?.dateFrom}>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Select From Date"
                  name="DateDiscovered"
                  onChange={(event)=>UpdateFormValue(event)}
                  value={formValues.DateDiscovered.toString().substring(0,10)}
                  min={formValues.DateOfOccurrence.toString().substring(0,10)}
                  max={new Date().toLocaleDateString("en-CA")}
                  required
                ></input>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="">Detailed Loss Event</label>
              <textarea 
              value={formValues.DetailedLossEvent}
              placeholder="Enter Detail"
              rows={3}
              name=""
              onChange={(e) => handleInputChange(e, "DetailedLossEvent")}
              />
              {/* <input
                type="text"
                className="form-control"
                id=""
                value={formValues.DetailedLossEvent}
                placeholder="Enter Detail"
                name=""
                onChange={(e) => handleInputChange(e, "DetailedLossEvent")}
              /> */}
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="">Root Cause of event/incident</label>
              <textarea
                className=""
                id=""
                rows={3}
                value={formValues.RootCause}
                placeholder="Enter Detail"
                name="RootCause"
                onChange={(event)=>UpdateFormValue(event)}
                required
              />
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="">Loss Type</label>
              <SelectDropDown
                setOpen={setOpenLossType}
                open={OpenLossType}
                name="RootCause"
                onChange={(event)=>UpdateLossType(event)}
                placeholder="Select Loss Type"
                selectedValue={formValues.LossType}
                options={[
                  { label: "actual", value: "actual" },
                  { label: "potential", value: "potential" },
                  { label: "near miss", value: "near miss" },
                ]}
              />
            </div>
          </div>
          <div className="col-4">
            <label htmlFor="">Amount Involved</label>
            <div className="input-group">
            <SelectDropDown
                setOpen={setCurrencyOpenb}
                open={currencyOpenb}
                onChange={(event)=>UpdateCurrency(event)}
                selectedValue={formValues.Currency}
                options={[
                  { label: "NGN", value: "NGN" },
                  { label: "USD", value: "USD" },
                  { label: "GBP", value: "GBP" },
                  { label: "EURO", value: "EURO" },
                ]}
            />
                <input
                      type="number"
                      className="form-control"
                      placeholder="Enter"
                      name="AmountInvolved"
                      onChange={(event)=>UpdateFormValue(event)}
                      value={formValues.AmountInvolved}
                      required
                />
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="">Near Miss</label>
              <div className="input-group">
              <SelectDropDown
                setOpen={setCurrencyOpenc}
                open={currencyOpenc}
                onChange={(event)=>UpdateCurrency(event)}
                selectedValue={formValues.Currency}
                options={[
                  { label: "NGN", value: "NGN" },
                  { label: "USD", value: "USD" },
                  { label: "GBP", value: "GBP" },
                  { label: "EURO", value: "EURO" },
                ]}
                />
                <input
                      type="number"
                      className="form-control"
                      placeholder="Enter"
                      value={formValues.NearMiss}
                      name="NearMiss"
                      onChange={(event)=>UpdateFormValue(event)}
                      required
              />
            </div>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="">Potential Loss</label>
              <div className="input-group">
              <SelectDropDown
                setOpen={setCurrencyOpend}
                open={currencyOpend}
                onChange={(event)=>UpdateCurrency(event)}
                selectedValue={formValues.Currency}
                options={[
                  { label: "NGN", value: "NGN" },
                  { label: "USD", value: "USD" },
                  { label: "GBP", value: "GBP" },
                  { label: "EURO", value: "EURO" },
                ]}
                />
                <input
                      type="number"
                      className="form-control"
                      placeholder="Enter"
                      value={formValues.PotentialLoss}
                      name="PotentialLoss"
                    onChange={(event)=>UpdateFormValue(event)}
                      required
              />
            </div>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="">Gross Actual Loss</label>
              <div className="input-group">
              <SelectDropDown
                setOpen={setCurrencyOpene}
                open={currencyOpene}
                onChange={(event)=>UpdateCurrency(event)}
                selectedValue={formValues.Currency}
                options={[
                  { label: "NGN", value: "NGN" },
                  { label: "USD", value: "USD" },
                  { label: "GBP", value: "GBP" },
                  { label: "EURO", value: "EURO" },
                ]}
                />
                <input
                      type="number"
                      className="form-control"
                      placeholder="Enter"
                      value={formValues.GrossActualLoss}
                      name="GrossActualLoss"
                      onChange={(event)=>UpdateFormValue(event)}
                      required
              />
            </div>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="">Amount Recovered</label>
              <div className="input-group">
              <SelectDropDown
                setOpen={setCurrencyOpenf}
                open={currencyOpenf}
                onChange={(event)=>UpdateCurrency(event)}
                selectedValue={formValues.Currency}
                options={[
                  { label: "NGN", value: "NGN" },
                  { label: "USD", value: "USD" },
                  { label: "GBP", value: "GBP" },
                  { label: "EURO", value: "EURO" },
                ]}
                />
                <input
                      type="number"
                      className="form-control"
                      placeholder="Enter"
                      value={formValues.AmountRecovered}
                      name="AmountRecovered"
                      onChange={(event)=>UpdateFormValue(event)}
                      required
              />
            </div>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="">Further Recovery</label>
              <div className="input-group">
              <SelectDropDown
                setOpen={setCurrencyOpeng}
                open={currencyOpeng}                
                onChange={(event)=>UpdateCurrency(event)}
                selectedValue={formValues.Currency}
                options={[
                  { label: "NGN", value: "NGN" },
                  { label: "USD", value: "USD" },
                  { label: "GBP", value: "GBP" },
                  { label: "EURO", value: "EURO" },
                ]}
                />
                <input
                      type="number"
                      className="form-control"
                      placeholder="Enter"
                      value={formValues.FurtherRecovery}
                      name="FurtherRecovery"
                      onChange={(event)=>UpdateFormValue(event)}
                      required
              />
            </div>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="">Net Actual Loss</label>
              <input
                type="text"
                className="form-control"
                // value={formValues.NetActualLoss}
                value={calcNetloss}
                placeholder="Enter Detail"
                name="NetActualLoss"
                onChange={(event)=>UpdateFormValue(event)}
                disabled={true}
              />
            </div>
          </div>
        </div>
        <div className="row">
        <div className="col-4">
            <div className="form-group">
              <label htmlFor="">Recovery Channel</label>
              <div className="form-check form-check-inline">
                <input className="form-check-input" 
                type="radio" 
                checked={formValues.RecoveryChannel === 'Customer'} 
                name="RecoveryChannel"
                onChange={(event)=>UpdateFormValue(event)} 
                id="inlineRadio1"
                 value="Customer"/>
                <label className="form-check-label" htmlFor="inlineRadio1">Customer</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" 
                type="radio" checked={ formValues.RecoveryChannel === 'Staff'}
                name="RecoveryChannel"
                onChange={(event)=>UpdateFormValue(event)} 
                 id="inlineRadio2" 
                 value="Staff" />
                <label className="form-check-label" htmlFor="inlineRadio2">Staff</label>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
                <label htmlFor="">Staff Involvement</label>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" 
                  type="radio" checked={formValues.StaffInvolvement === 'Yes'} 
                  name="StaffInvolvement"
                  onChange={(event)=>UpdateFormValue(event)}  
                  id="inlineRadio3" value="Yes" />
                  <label className="form-check-label" htmlFor="inlineRadio3">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" 
                  type="radio"  checked={formValues.StaffInvolvement === 'No'} 
                  name="StaffInvolvement"
                  onChange={(event)=>UpdateFormValue(event)} 
                  id="inlineRadio4" value="No" />
                  <label className="form-check-label" htmlFor="inlineRadio4">No</label>
                </div>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
                  <label htmlFor="">Event Status</label>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" 
                    type="radio" 
                    name="EventStatus"
                    onChange={(event)=>UpdateFormValue(event)}
                     checked={formValues.EventStatus === 'Open'} id="inlineRadio5" value="Open" />
                    <label className="form-check-label" htmlFor="inlineRadio5">Open</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" 
                    type="radio" 
                    name="EventStatus"
                    onChange={(event)=>UpdateFormValue(event)} 
                    checked={formValues.EventStatus === 'Closed'} id="inlineRadio6" value="Closed" />
                    <label className="form-check-label" htmlFor="inlineRadio6">Closed</label>
                  </div>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="">Supporting Documents (Optional)</label>
              <div>
                {formValues?.documents &&
                <button onClick={()=>handleDownloadButtonClick(formValues?.documents,formValues?.fileType, formValues.documentName)}>Download: { formValues.documentName} </button>}
                </div>
              <DropFileInput onFileChange={handleFileChange} />
            </div>
          </div>
        </div>
        <div className="btnGroup">
        <div className="row mt-2">
             {state[0]?.action === "edit" && 
             <>

             {getCurrentRole()?.toLocaleLowerCase().includes("admin") && 
             <div className="col-auto">
              <Button
                variant="contained"
                color="primary"
                onClick={() => AdminContinueEditReport()}
                disabled={formValues.Currency == "" || 
                formValues.EventStatus == "" ||
                formValues.LossType == "" ||
                formValues.RecoveryChannel == ""  ||
                formValues.DetailedLossEvent == "" ||
                formValues.LossType == "" ||
                formValues.RootCause == "" }
              >
                Continue
             </Button>
             </div>
             }
              
              
             <div className="col-auto"> <Button
                variant="outlined"
                color="primary"
                onClick={() => setOpenAlertSave(true)}
                disabled={ loading }
              > 
                Save
                {openAlertSave && (
                  <AlertBox
                    open={openAlertSave}
                    setopen={setOpenAlertSave}
                    data={data1}
                    title="Alert"
                    message="Are You Sure You Want To Update ?"
                    btn1="OK"
                    btn2="CANCEL"
                    onClose={saveLossData}
                  />)}
              </Button>
              </div>
              </>}
            

            <div className="col-auto">
            {!(getCurrentRole()?.toLocaleLowerCase()?.includes("admin")) &&
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenAlertSavenew(true)}
                disabled={(reportId==0)}
              >
                Submit
                {openAlertSavenew && (
                  <AlertBox
                    open={openAlertSavenew}
                    setopen={setOpenAlertSavenew}
                    data={data1}
                    title="Alert"
                    message="Are You Sure You Want To Submit?"
                    btn1="OK"
                    btn2="CANCEL"
                    onClose={SubmitNewLossData}
                  />)}
             </Button>
                  }
             {getCurrentRole()?.toLocaleLowerCase()?.includes("admin") &&
             state[0]?.action !== "edit" && 
              <Button
                variant="contained"
                color="primary"
                onClick={() => AdminContinueReport()}
                disabled={formValues.Currency == "" || 
                formValues.EventStatus == "" ||
                formValues.LossType == "" ||
                formValues.RecoveryChannel == ""  ||
                formValues.DetailedLossEvent == "" ||
                formValues.LossType == "" ||
                formValues.RootCause == "" || reportingLocation == ""}
              >
                Continue
             </Button>
             }
            </div>
            {
            !(getCurrentRole()?.toLocaleLowerCase().includes("admin")) &&
             state[0]?.action !== "edit" && 
                <div className="col-auto">
                {!isRecordSaved &&
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenAlertSavenew(true)}
                    disabled={icoGia=== "" || formValues.Currency == "" || 
                    formValues.EventStatus == "" ||
                    formValues.LossType == "" ||
                    formValues.RecoveryChannel == ""  ||
                    formValues.DetailedLossEvent == "" ||
                    formValues.LossType == "" ||
                    formValues.RootCause == "" || reportingLocation == ""
                  || loading}
                  >
                    Save
                    {openAlertSavenew && (
                      <AlertBox
                        open={openAlertSavenew}
                        setopen={setOpenAlertSavenew}
                        data={data1}
                        title="Alert"
                        message="Are You Sure You Want To Save ?"
                        btn1="OK"
                        btn2="CANCEL"
                        onClose={SaveNewLossData}
                      />)}
                </Button>}
                </div>
            }
            
            <div className="col-auto">
                  <Button
                    variant="outlined"
                    onClick={() => navigateToGrid()}
                  >
                    Cancel
                  </Button>
                </div>
        </div>
        </div>
      </div>
      { isLocationDetail &&
          <AdminLocation  openModel={true}/>
      }
      {saveAlertPopUp &&
          <AlertBox
          open={saveAlertPopUp}
          setopen={setSaveAlertPopUp}
          data={""}
          title="Alert"
          message="Loss Report Saved !"
          btn1="OK"
          btn2=""
          onClose={()=>{}}
        />
      }
    </>
  );
};
export default LossData;
