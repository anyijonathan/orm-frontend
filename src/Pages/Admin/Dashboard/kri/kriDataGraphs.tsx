import React, { useEffect, useState } from "react";
import { SelectDropDown } from "../../../../Components/DropDown";
import PinPieChart from "../pinPieChart";
import KYCComplianceGraph from "../kycCompliance";
import CCTVCriticalLocationsGraph from "../cctvCriticalLocations";
import CustomerComplaints from "../customerComplaints";
import { getBranchGridDataAction, getDepartmentGridDataAction } from "../../../../Services/Actions/locationAction";
import { useAppDispatch } from "../../../../Services/Store/hooks";
import { CctvKriAction, KriIndicatorsAction, KycKriAction } from "../../../../Services/Actions/dashboardAction";

const KriDataGraph = () => {
    const [OpenSelectBranch, setOpenSelectBranch] = useState(false);
    const [SelectBranch, setSelectBranch] = useState("");
    const [OpenDepartment, setOpenDepartment] = useState(false);
    const [Department, setDepartment] = useState("");
    const [OpenMonths, setOpenMonths] = useState(false);
    const [Months, setMonths] = useState("");
    const [OpenKYCCompl, setOpenKYCCompl] = useState(false);
    const [KYCCompl, setKYCCompl] = useState("");
    const [OpenCCTVLocations, setOpenCCTVLocations] = useState(false);
    const [CCTVLocations, setCCTVLocations] = useState("");
    const dispatch = useAppDispatch();
    const [data, setData] = useState<any[]>([]);
    const [locationType, setLocationType] = useState("B");
    const [kycQtr, setKycQtr] = useState("");
    const [openKycQtr, setOpenKycQtr] = useState(false);
    const [cctvQtr, setCctvQtr] = useState("");
    const [openCctvQtr, setOpenCctvQtr] = useState(false);
    const [cctvMetric, setCctvMetric] = useState("");
    const [kycMetric, setKycMetric] = useState("");
    const [cctvKriData, setCctvKriData] = useState<any>([]);
    const [kycKriData, setKycKriData] = useState<any>([]);
    const [kriIndicatorsData, setKriIndicatorsData] = useState<any>([]);
    const [openIndicators, setOpenIndicators] = useState(false);
    const [indicatorsYear, setIndicatorsYear] = useState("");

useEffect ( ()=>{
    fetchData("Branch");
    InitializaKriGraph();
},[]);

const InitializaKriGraph = async() => {
    await fetchCctvKriGraph("","12","2024");
    await fetchKycKriGraph("","12","2024");
    await fetchKriIndicatorsGraph(0,"12","2024");
}


const fetchCctvKriGraph=async (metricMasterIds:string,month:string,year:string)=>{
    let frequency= parseInt(month,10);
     let years= parseInt(year, 10);
    await dispatch(CctvKriAction({metricMasterIds:metricMasterIds, months:frequency, year:years}))
    .then((response:any) =>{
      const result= response?.payload?.requestData?.data;
      setCctvKriData(result);
  });
}
const fetchKycKriGraph=async (metricMasterIds:string,month:string,year:string)=>{
    let frequency= parseInt(month,10);
     let years= parseInt(year, 10);
    await dispatch(KycKriAction({metricMasterIds:metricMasterIds, months:frequency, year:years}))
    .then((response:any) =>{
      const result= response?.payload?.requestData?.data;
      setKycKriData(result);
  });
}

const KycKriFilters = (value:any,option:string) => {
    if(option=="Q"){
        setCctvQtr(value)
        fetchKycKriGraph(kycMetric,value,CCTVLocations);
    }
    if(option=="Y"){
        setCCTVLocations(value)
        fetchKycKriGraph(kycMetric,cctvQtr,value);
    }       
}
const CctvKriFilters = (value:any,option:string) => {
    if(option=="Q"){
        setKycQtr(value)
        fetchCctvKriGraph(cctvMetric,value,KYCCompl);
    }
    if(option=="Y"){
        setKYCCompl(value)
        fetchCctvKriGraph(cctvMetric,kycQtr,value);
    }       
}

const fetchKriIndicatorsGraph=async (locationId:number,month:string,year:string)=>{
    let frequency= parseInt(month,10);
     let years= parseInt(year, 10);
    await dispatch(KriIndicatorsAction({locationId:locationId, months:frequency, year:years}))
    .then((response:any) =>{
      const result= response?.payload?.requestData?.data;
      setKriIndicatorsData(result);
  });
}

const KriIndicatorsFilters = (value:any,option:string) => {
    let locationId=0;
    if(locationType == "B"){
        locationId= parseInt(SelectBranch);
    }else{
        locationId= parseInt(Department);
    }
    if(option=="M"){
        setMonths(value)
        fetchKriIndicatorsGraph(locationId,value,indicatorsYear);
    }
    if(option=="Y"){
        setIndicatorsYear(value)
        fetchKriIndicatorsGraph(locationId,Months,value);
    }       
}

    const fetchData= async (location:string) =>{
        if(location==="Branch"){
            setLocationType("B");
            await dispatch(
                getBranchGridDataAction( {Title:"", status:"Active", PageNumber:1,isExport:true})          //todo- for user mang - pageno. free api
                ).then((response:any) => {
                  const result= response?.payload?.requestData?.data;
                  const dropdownOptions = result.data.map((item:any) => ({
                    label: item.branch,
                    value: item.id
                  }));
                  setData(dropdownOptions)
                  setSelectBranch(dropdownOptions[0]?.value)
            });
        }
      else{
        setLocationType("D");
        await dispatch(
            getDepartmentGridDataAction( {Title:"", status:"Active", PageNumber:1,isExport:true})          //todo- for user mang - pageno. free api
            ).then((response:any) => {
              const result= response?.payload?.requestData?.data;
              const dropdownOptions = result.data.map((item:any) => ({
                label: item.department,
                value: item.id
              }));
              setData(dropdownOptions)
              setDepartment(dropdownOptions[0]?.value)
        }); 
      }
      }

    return (
            <div className="row">
                <div className="col-3 btn-group mb-4" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off"  
                    onClick={()=>fetchData("Branch")} checked={locationType==="B"} />
                    <label className="btn btn-outline-primary" htmlFor="btnradio1">Branch</label>

                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off"
                    onClick={()=>fetchData("Department")} checked={locationType==="D"}/>
                    <label className="btn btn-outline-primary" htmlFor="btnradio2">Department</label>
                </div>
                { locationType == "B"  &&
                    <div className="col-auto">
                    <div className="">
                        <SelectDropDown
                            setOpen={setOpenSelectBranch}
                            open={OpenSelectBranch}
                            onChange={(value) => setSelectBranch(value)}
                            placeholder="Select Branch"
                            selectedValue={SelectBranch}
                            options={data}
                        />
                    </div>
                </div>}
                { locationType == "D"  &&
                <div className="col-auto">
                    <div className="">
                        <SelectDropDown
                            setOpen={setOpenDepartment}
                            open={OpenDepartment}
                            onChange={(value) => setDepartment(value)}
                            placeholder="Select Department"
                            selectedValue={Department}
                            options={data}
                        />
                    </div>
                </div>}
                <div className="col-12 mb-3">
                    <div className="pageCard">
                        <div className="pageCardTitle d-flex justify-content-between align-content-between">
                            <strong className="align-self-center">Key Risk Indicators (KRIs) Summary (October 2023)</strong>
                            <div className="elementsRight">
                                <div className="ml2">
                                    <SelectDropDown
                                        setOpen={setOpenMonths}
                                        open={OpenMonths}
                                        onChange={(value) => KriIndicatorsFilters(value,"M")}
                                        placeholder="Select Month"
                                        selectedValue={Months}
                                        options={[
                                            { label: "Jan", value: "1" },
                                            { label: "Feb", value: "2" },
                                            { label: "March", value: "3" },
                                            { label: "April", value: "4" },
                                            { label: "May", value: "5" },
                                            { label: "June", value: "6" },
                                            { label: "July", value: "7" },
                                            { label: "Aug", value: "8" },
                                            { label: "Sep", value: "9" },
                                            { label: "Oct", value: "10" },
                                            { label: "Nov", value: "11" },
                                            { label: "Dec", value: "12" },
                                        ]}
                                    />
                                </div>
                                <div className="">
                                    <SelectDropDown
                                        setOpen={setOpenIndicators}
                                        open={openIndicators}
                                        onChange={(value) => KriIndicatorsFilters(value,"Y")}
                                        placeholder="Select"
                                        selectedValue={indicatorsYear}
                                        options={[
                                            { label: "2023", value: "2023" },
                                            { label: "2024", value: "2024" },
                                            { label: "2025", value: "2025" },
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row mb-4">
                        {kriIndicatorsData?.map((data:any, index:any) => (

                                <div key={index} className="col-6">
                                <div className="pageCard">
                                    <div className="pageCardTitle d-flex justify-content-between align-content-between">
                                        <strong className="align-self-center">{data?.metricName}</strong>
                                    </div>
                                    <PinPieChart data={data}/>
                                </div>
                            </div>))}
                            {/* <div className="col-6">
                                <div className="pageCard">
                                    <div className="pageCardTitle d-flex justify-content-between align-content-between">
                                        <strong className="align-self-center">Cyber Risk - Malware Incidents</strong>
                                    </div>
                                    <PinPieChart />
                                </div>
                            </div> */}
                        </div>
                        {/* <div className="row mb-4">
                            <div className="col-6">
                                <div className="pageCard">
                                    <div className="pageCardTitle d-flex justify-content-between align-content-between">
                                        <strong className="align-self-center">Expired Collateral Valuations</strong>
                                    </div>
                                    <PinPieChart />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="pageCard">
                                    <div className="pageCardTitle d-flex justify-content-between align-content-between">
                                        <strong className="align-self-center">Cyber Risk - Systems Without Up-To-Date Anti-Malware Solutions</strong>
                                    </div>
                                    <PinPieChart />
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="col-12 mb-3">
                    <div className="pageCard">
                        <div className="pageCardTitle d-flex justify-content-between align-content-between">
                            <strong className="align-self-center">KYC Compliance</strong>
                            <div className="elementsRight">
                                <div className="">
                                    <SelectDropDown
                                        setOpen={setOpenKYCCompl}
                                        open={OpenKYCCompl}
                                        onChange={(value) => KycKriFilters(value,"Y")}
                                        placeholder="Select"
                                        selectedValue={KYCCompl}
                                        options={[
                                            { label: "2023", value: "2023" },
                                            { label: "2024", value: "2024" },
                                            { label: "2025", value: "2025" },
                                        ]}
                                    />
                                </div>

                                <div className="ml2">
                                            <SelectDropDown
                                                setOpen={setOpenKycQtr}
                                                open={openKycQtr}
                                                onChange={(value) => KycKriFilters(value,"Q")}
                                                placeholder="Select Quarter"
                                                selectedValue={kycQtr}
                                                options={[
                                                    { label: "Year", value: "0" },
                                                    { label: "Q1-January-March", value: "3" },
                                                    { label: "Q2-April-June", value: "6" },
                                                    { label: "Q3-July-September", value: "9" },
                                                    { label: "Q4-October-December", value: "12" },
                                                ]}
                                            />
                                        </div>

                            </div>
                        </div>
                        <KYCComplianceGraph  data={kycKriData}/>
                    </div>
                </div>
                <div className="col-12 mb-3">
                    <div className="pageCard">
                        <div className="pageCardTitle d-flex justify-content-between align-content-between">
                            <strong className="align-self-center">Non-functional CCTV situated in critical locations</strong>
                            <div className="elementsRight">
                                <div className="">
                                    <SelectDropDown
                                        setOpen={setOpenCCTVLocations}
                                        open={OpenCCTVLocations}
                                        onChange={(value) => CctvKriFilters(value,"Q")}
                                        placeholder="Select"
                                        selectedValue={CCTVLocations}
                                        options={[
                                            { label: "2023", value: "2023" },
                                            { label: "2024", value: "2024" },
                                            { label: "2025", value: "2025" },
                                        ]}
                                    />
                                </div>
                                <div className="ml2">
                                            <SelectDropDown
                                                setOpen={setOpenCctvQtr}
                                                open={openCctvQtr}
                                                onChange={(value) => CctvKriFilters(value,"Q")}
                                                placeholder="Select Quarter"
                                                selectedValue={cctvQtr}
                                                options={[
                                                    { label: "Year", value: "0" },
                                                    { label: "Q1-January-March", value: "3" },
                                                    { label: "Q2-April-June", value: "6" },
                                                    { label: "Q3-July-September", value: "9" },
                                                    { label: "Q4-October-December", value: "12" },
                                                ]}
                                            />
                                        </div>
                            </div>
                        </div>
                        <CCTVCriticalLocationsGraph data={cctvKriData}/>
                    </div>
                </div>
                <div className="col-12 mb-3">
                    <div className="pageCard">
                        <div className="pageCardTitle d-flex justify-content-between align-content-between">
                            <strong className="align-self-center">Customer Compaints</strong>
                            <div className="elementsRight">
                                <div className="">
                                    <SelectDropDown
                                        setOpen={setOpenCCTVLocations}
                                        open={OpenCCTVLocations}
                                        onChange={(value) => setCCTVLocations(value)}
                                        placeholder="Select"
                                        selectedValue={CCTVLocations}
                                        options={[
                                            { label: "2021", value: "capital" },
                                            { label: "2022", value: "irregular" },
                                            { label: "2023", value: "tax" },
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                        <CustomerComplaints />
                    </div>
                </div>
            </div>
    );
};
export default KriDataGraph;