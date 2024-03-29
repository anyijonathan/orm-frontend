import { useEffect, useState } from "react";
import { SelectDropDown } from "../../../../Components/DropDown";
import LossDataTrendGraph from "../lossDataTrend";
import OperationalRiskLosses from "../operationalRiskLosses";
import RootCauseAnalysisActualLosses from "../rootCauseAnalysisActualLosses";
import EChannelFraud from "../eChannelFraud";
import FraudLossOpriskLoss from "../fraudLossOpriskLoss";
import GrossLossRecoveryNetLoss from "../grossLossRecoveryNetLoss";
import BaselCategorization from "../baselCategorization";
import uploadImg from "../../../../Assets/Images/graphLegend.png";
import HorizBarChart from "../horizBarChart";
import ScatterGraph from "../scatterGraph";
import OtherOperationalRiskLossFraud from "../otherOperationalRiskLossFraud";
import RegionalDistributionInternalLosses from "../regionalDistributionInternalLosses";
import { useAppDispatch, useAppStateSelector } from "../../../../Services/Store/hooks";
import { GrossLossAction, OperationalRiskAction, RootCauseAction, lossDataDashboadRDAction, lossDataDashboadTrendAction } from "../../../../Services/Actions/dashboardAction";
// import HeatMap, { Style } from "jsheatmap"

const LossDataGraphs = () => {
    const [OpenLossDataType, setOpenLossDataType] = useState(false);
    const [LossDataType, setLossDataType] = useState("internal fraud");
    const [OpenOorfYear, setOpenOorfYear] = useState(false);
    const [OpenRDYear, setOpenRDYear] = useState(false);
    const [OorfYear, setOorfYear] = useState("");
    const [OpenLossDataYear, setOpenLossDataYear] = useState(false);
    const [LossDataYear, setLossDataYear] = useState("");

    const [OpenLossDataFrequency, setOpenLossDataFrequency] = useState(false);
    const [LossDataFrequency, setLossDataFrequency] = useState("");

    const [OpenOorfQtr, setOpenOorfQtr] = useState(false);
    const [OpenRDQtr, setOpenRDQtr] = useState(false);
    const [OorfQtr, setOorfQtr] = useState("");

    const [OpenLossDataTrendDate, setOpenLossDataTrendDate] = useState(false);
    const [LossDataTrendDate, setLossDataTrendDate] = useState("");
    const [OpenOrlYear, setOpenOrlYear] = useState(false);
    const [OrlYear, setOrlYear] = useState("");
    const [OpenGLRNL, setOpenGLRNL] = useState(false);
    const [gLRNLYear, setGLRNLYear] = useState("");
    const [gLRNLQtr, setGLRNLQtr] = useState("");
    const [OpenRcaYear, setOpenRcaYear] = useState(false);
    const [RcaYear, setRcaYear] = useState("");
    const [OpenBaselYear, setOpenBaselYear] = useState(false);
    const [BaselYear, setBaselYear] = useState("");
    const [OpenQuater, setOpenQuater] = useState(false);
    const [Quater, setQuater] = useState("");
    const [OpenFlol, setOpenFlol] = useState(false);
    const [Flol, setFlol] = useState("");
    const [rdYear, setRdYear] = useState("");
    const [rdQtr, setRdQtr] = useState("");
    const [OpenOrlQtr, setOpenOrlQtr] = useState(false);
    const [orlQtr, setOrlQtr] = useState("");
    const [OpenOperationalRiskType, setOpenOperationalRiskType] = useState(false);
    
    const [rcaType, setRcaType] = useState("");
    const [openRootCauseType, setOpenRootCauseType] = useState(false);
    const [rcaQtr, setRcaQtr] = useState("");
    const [openRcaQtr, setOpenRcaQtr] = useState(false);
    const [operationalRiskType, setOperationalRiskType] = useState("internal fraud");
    const [lossTrendData, setLossTrendData] = useState<any>([]);
    const [operationalRiskData, setOperationalRiskData] = useState<any>([]);
    const [rootCauseData, setRootCauseData] = useState<any>([]);
    const [grossLossData, setGrossLossData] = useState<any>([]);
    const [lossRegionaldistributionData, setLossRegionaldistributionData] = useState<any>([]);
  const dispatch = useAppDispatch();
  let locationState:any = useAppStateSelector((state) => state.locationDataState)
    
    useEffect(()=>{
        setLossDataType("internal fraud");
        setLossDataFrequency("0");
        setLossDataYear("2024");
        InitialDashboard();
    },[])

    const InitialDashboard=async()=>{
        await fetchLossTrends("internal fraud","0","2024");
        await fetchRegionaldistribution("internal fraud","0","2024");
        await fetchOperationalRisk("internal fraud","0","2024");
        await fetchRootCause("0","2024");
        await fetchGrossLoss("0","2024");
    }
    const fetchLossTrends=async (loss:string,month:string,year:string)=>{
        let frequency= parseInt(month,10);
         let years= parseInt(year, 10);
        await dispatch(lossDataDashboadTrendAction({baselEventType1:loss, months:frequency, year:years}))
        .then((response:any) =>{
          const result= response?.payload?.requestData?.data;
          setLossTrendData(result);
      });
    }
    
    const LossTrendFilters = (value:any,option:string) => {
        if(option=="Q"){
            setLossDataFrequency(value)
        fetchLossTrends(LossDataType,value,LossDataYear);
        }
        if(option=="Y"){
            setLossDataYear(value);
        fetchLossTrends(LossDataType,LossDataFrequency,value);
        }
        if(option=="T"){
            setLossDataType(value);
        fetchLossTrends(value,LossDataFrequency,LossDataYear);
        }        
    }

    const fetchRegionaldistribution=async (loss:string,month:string,year:string)=>{
        let frequency= parseInt(month,10);
         let years= parseInt(year, 10);
        await dispatch(lossDataDashboadRDAction({baselEventType1:loss, months:frequency, year:years}))
        .then((response:any) =>{
          const result= response?.payload?.requestData?.data;
          setLossRegionaldistributionData(result);
      });
    }
    const RegionaldistributionFilters = (value:any,option:string) => {
        if(option=="Q"){
            setRdQtr(value)
            fetchRegionaldistribution("internal fraud",value,OorfYear);
        }
        if(option=="Y"){
            setRdYear(value)
            fetchRegionaldistribution("internal fraud",OorfQtr,value);
        }       
    }

    const fetchOperationalRisk=async (loss:string,month:string,year:string)=>{
        let frequency= parseInt(month,10);
         let years= parseInt(year, 10);
        await dispatch(OperationalRiskAction({baselEventType1:loss, months:frequency, year:years}))
        .then((response:any) =>{
          const result= response?.payload?.requestData?.data;
          setOperationalRiskData(result);
      });
    }

    const OperationalRiskFilters = (value:any,option:string) => {
        if(option=="Q"){
            setOrlQtr(value)
            fetchOperationalRisk(operationalRiskType,value,OrlYear);
        }
        if(option=="Y"){
            setOrlYear(value)
            fetchOperationalRisk(operationalRiskType,orlQtr,value);
        } 
        if(option=="T"){
            setOperationalRiskType(value);
            fetchOperationalRisk(value,orlQtr,OrlYear);
        }      
    }

    const fetchRootCause=async (month:string,year:string)=>{
        let frequency= parseInt(month,10);
         let years= parseInt(year, 10);
        await dispatch(RootCauseAction({baselEventType1:"", months:frequency, year:years}))
        .then((response:any) =>{
          const result= response?.payload?.requestData?.data;
          setRootCauseData(result);
      });
    }
    const RootCauseFilters = (value:any,option:string) => {
        if(option=="Q"){
            setRcaQtr(value)
            fetchRootCause(value,RcaYear);
        }
        if(option=="Y"){
            setRcaYear(value)
            fetchRootCause(rcaQtr,value);
        } 
        // if(option=="T"){
        //     setRcaType(value)
        //     fetchRootCause(value,orlQtr,OrlYear);
        // }      
    }


    const fetchGrossLoss=async (month:string,year:string)=>{
        let frequency= parseInt(month,10);
         let years= parseInt(year, 10);
        await dispatch(GrossLossAction({baselEventType1:"", months:frequency, year:years}))
        .then((response:any) =>{
          const result= response?.payload?.requestData?.data;
          setGrossLossData(result);
      });
    }
    const GrossLossFilters = (value:any,option:string) => {
        if(option=="Q"){
            setGLRNLQtr(value)
            fetchGrossLoss(value,gLRNLYear);
        }
        if(option=="Y"){
            setGLRNLYear(value)
            fetchGrossLoss(gLRNLQtr,value);
        } 
        // if(option=="T"){
        //     setRcaType(value)
        //     fetchRootCause(value,orlQtr,OrlYear);
        // }      
    }


    return (
        <>
        <div className="row">
            <div className="col-12 mb-3">
                <div className="pageCard">
                    <div className="pageCardTitle d-flex justify-content-between align-content-between">
                        <strong className="align-self-center">Loss Data Trend</strong>
                        <div className="elementsRight">
                            <div className="">
                                <SelectDropDown
                                    setOpen={setOpenLossDataType}
                                    open={OpenLossDataType}
                                    onChange={(value) => LossTrendFilters(value,"T")}
                                    placeholder="Basel Event Type I"
                                    selectedValue={LossDataType}
                                    options={[
                                        { label: "internal fraud", value: "internal fraud" },
                                        { label: "external fraud", value: "external fraud" },
                                        { label: "employment practices & workplace safety", value: "employment practices & workplace safety" },
                                        { label: "Client_ Product & Business practices", value: "Client_ Product & Business practices" },
                                        { label: "Damage to physical assets", value: "Damage to physical assets" },
                                        { label: "Business disruptions and system failures", value: "Business disruptions and system failures" },
                                        { label: "Execution_ delivery & process management", value: "Execution_ delivery & process management" },
                                    ]}
                                />
                            </div>
                            <div className="ml2">
                                <SelectDropDown
                                    setOpen={setOpenLossDataYear}
                                    open={OpenLossDataYear}
                                    onChange={(value) => LossTrendFilters(value,"Y")}
                                    placeholder="Year"
                                    selectedValue={LossDataYear}
                                    options={[
                                        { label: "2023", value: "2023" },
                                        { label: "2024", value: "2024" },
                                        { label: "2025", value: "2025" },
                                    ]}
                                />
                            </div>
                            <div className="ml2">
                                <SelectDropDown
                                    setOpen={setOpenLossDataFrequency}
                                    open={OpenLossDataFrequency}
                                    onChange={(value) => LossTrendFilters(value,"Q")}
                                    placeholder="Select Quarter"
                                    selectedValue={LossDataFrequency}
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
                    <LossDataTrendGraph data={lossTrendData}/>
                </div>
            </div>
            <div className="col-12 mb-3">
                <div className="pageCard">
                    <div className="pageCardTitle d-flex justify-content-between align-content-between">
                        <strong className="align-self-center">Other Operational Risk Loss vs Fraud Loss</strong>
                        <div className="elementsRight">
                            <div>
                                <SelectDropDown
                                    setOpen={setOpenOorfYear}
                                    open={OpenOorfYear}
                                    onChange={(value) => setOorfYear(value)}
                                    placeholder="Year"
                                    selectedValue={OorfYear}
                                    options={[
                                        { label: "2023", value: "2023" },
                                        { label: "2024", value: "2024" },
                                        { label: "2025", value: "2025" },
                                    ]}
                                />
                            </div>
                            <div className="ml2">
                                <SelectDropDown
                                    setOpen={setOpenOorfQtr}
                                    open={OpenOorfQtr}
                                    onChange={(value) => setOorfQtr(value)}
                                    placeholder="Select Quarter"
                                    selectedValue={OorfQtr}
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
                    <OtherOperationalRiskLossFraud data={lossTrendData}/>
                </div>
            </div>
            <div className="col-12 mb-3">
                <div className="pageCard">
                    <div className="pageCardTitle d-flex justify-content-between align-content-between">
                        <strong className="align-self-center">Regional Distribution of Internal Losses</strong>
                        <div className="elementsRight">
                            <div>
                                <SelectDropDown
                                    setOpen={setOpenRDYear}
                                    open={OpenRDYear}
                                    onChange={(value) => RegionaldistributionFilters(value,"Y")}
                                    placeholder="Year"
                                    selectedValue={rdYear}
                                    options={[
                                        { label: "2023", value: "2023" },
                                        { label: "2024", value: "2024" },
                                        { label: "2025", value: "2025" },
                                    ]}
                                />
                            </div>
                            <div className="ml2">
                                <SelectDropDown
                                    setOpen={setOpenRDQtr}
                                    open={OpenRDQtr}
                                    onChange={(value) =>RegionaldistributionFilters(value,"Q")}
                                    placeholder="Select Quarter"
                                    selectedValue={rdQtr}
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
                    <RegionalDistributionInternalLosses data={lossRegionaldistributionData}/>
                </div>
            </div>
            <div className="col-12 mb-3">
                <div className="pageCard">
                    <div className="pageCardTitle d-flex justify-content-between align-content-between">
                        <strong className="align-self-center">Loss Data Title</strong>
                        <div className="elementsRight">
                            <div className="">
                                {/* <SelectDropDown
                                    setOpen={setOpenLossDataTrend}
                                    open={OpenLossDataTrend}
                                    onChange={(value) => setLossDataTrend(value)}
                                    placeholder="Select"
                                    selectedValue={LossDataTrend}
                                    options={[
                                        { label: "capital", value: "capital" },
                                        { label: "irregular", value: "irregular" },
                                        { label: "tax", value: "tax" },
                                    ]}
                                /> */}
                            </div>
                            <div className="ml2">
                                <SelectDropDown
                                    setOpen={setOpenLossDataTrendDate}
                                    open={OpenLossDataTrendDate}
                                    onChange={(value) => setLossDataTrendDate(value)}
                                    placeholder="Select"
                                    selectedValue={LossDataTrendDate}
                                    options={[
                                        { label: "2021", value: "capital" },
                                        { label: "2022", value: "irregular" },
                                        { label: "2023", value: "tax" },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <img src={uploadImg} alt="" className="img-fluid" />
                        </div>
                        <div className="col-7">
                            <HorizBarChart />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 mb-3">
                <div className="pageCard">
                    <div className="pageCardTitle">
                        <strong>Operational Risk Events Analysis</strong>
                    </div>
                    <div className="row mb-4">
                        <div className="col-6">
                            <div className="pageCard">
                                <div className="pageCardTitle d-flex justify-content-between align-content-between">
                                    <strong className="align-self-center">Operational Risk Losses</strong>
                                    <div className="elementsRight">
                                    <div className="">
                                        <SelectDropDown
                                            setOpen={setOpenOperationalRiskType}
                                            open={OpenOperationalRiskType}
                                            onChange={(value) => OperationalRiskFilters(value,"T")}
                                            placeholder="Basel Event Type I"
                                            selectedValue={operationalRiskType}
                                            options={[
                                                { label: "internal fraud", value: "internal fraud" },
                                                { label: "external fraud", value: "external fraud" },
                                                { label: "employment practices & workplace safety", value: "employment practices & workplace safety" },
                                                { label: "Client_ Product & Business practices", value: "Client_ Product & Business practices" },
                                                { label: "Damage to physical assets", value: "Damage to physical assets" },
                                                { label: "Business disruptions and system failures", value: "Business disruptions and system failures" },
                                                { label: "Execution_ delivery & process management", value: "Execution_ delivery & process management" },
                                            ]}
                                        />
                                        </div>
                                        <div className="ml2">
                                            <SelectDropDown
                                                setOpen={setOpenOrlYear}
                                                open={OpenOrlYear}
                                                onChange={(value) => OperationalRiskFilters(value,"Y")}
                                                placeholder="Select"
                                                selectedValue={OrlYear}
                                                options={[
                                                    { label: "2023", value: "2023" },
                                                    { label: "2024", value: "2024" },
                                                    { label: "2025", value: "2025" },
                                                ]}
                                            />
                                        </div>
                                        <div className="ml2">
                                            <SelectDropDown
                                                setOpen={setOpenOrlQtr}
                                                open={OpenOrlQtr}
                                                onChange={(value) =>OperationalRiskFilters(value,"Q")}
                                                placeholder="Select Quarter"
                                                selectedValue={orlQtr}
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
                                <OperationalRiskLosses data={operationalRiskData}/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="pageCard">
                                <div className="pageCardTitle d-flex justify-content-between align-content-between">
                                    <strong className="align-self-center">Root Cause Analysis For Actual Losses</strong>
                                    <div className="elementsRight">
                                    {/* <div className="">
                                        <SelectDropDown
                                            setOpen={setOpenRootCauseType}
                                            open={openRootCauseType}
                                            onChange={(value) => RootCauseFilters(value,"T")}
                                            placeholder="Basel Event Type I"
                                            selectedValue={rcaType}
                                            options={[
                                                { label: "Process Breach", value: "Process Breach" },
                                                { label: "Poor configuration of suspense accounts", value: "Poor configuration of suspense accounts" },
                                                { label: "Policy Violation", value: "Policy Violation" },
                                                { label: "System Failure", value: "System Failure" },
                                                { label: "Weak Controls", value: "Weak Controls" },
                                                { label: "Business Decision", value: "Business Decision" },
                                                { label: "Poor Customer Service", value: "Poor Customer Service" },
                                                { label: "External Fraud", value: "External Fraud" },
                                                { label: "Policy / SOP Violation", value: "Policy / SOP Violation" },
                                              ]}
                                        />
                                        </div> */}
                                        <div className="ml2">
                                            <SelectDropDown
                                                setOpen={setOpenRcaYear}
                                                open={OpenRcaYear}
                                                onChange={(value) => RootCauseFilters(value,"Y")}
                                                placeholder="Select"
                                                selectedValue={RcaYear}
                                                options={[
                                                    { label: "2023", value: "2023" },
                                                    { label: "2024", value: "2024" },
                                                    { label: "2025", value: "2025" },
                                                ]}
                                            />
                                        </div>
                                        <div className="ml2">
                                            <SelectDropDown
                                                setOpen={setOpenRcaQtr}
                                                open={openRcaQtr}
                                                onChange={(value) => RootCauseFilters(value,"Q")}
                                                placeholder="Select Quarter"
                                                selectedValue={rcaQtr}
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
                                <RootCauseAnalysisActualLosses data={rootCauseData}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="pageCard">
                                <div className="pageCardTitle d-flex justify-content-between align-content-between">
                                    <strong className="align-self-center">E-Channels Fraud</strong>
                                    <div className="elementsRight">
                                        <div className="ml2">
                                            <SelectDropDown
                                                setOpen={setOpenQuater}
                                                open={OpenQuater}
                                                onChange={(value) => setQuater(value)}
                                                placeholder="Select"
                                                selectedValue={Quater}
                                                options={[
                                                    { label: "Q1", value: "capital" },
                                                    { label: "Q2", value: "irregular" },
                                                    { label: "Q3", value: "tax" },
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </div> 
                                <EChannelFraud />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="pageCard">
                                <div className="pageCardTitle d-flex justify-content-between align-content-between">
                                    <strong className="align-self-center">Fraud Loss & OpRisk Loss</strong>
                                    <div className="elementsRight">
                                        <div className="ml2">
                                            <SelectDropDown
                                                setOpen={setOpenFlol}
                                                open={OpenFlol}
                                                onChange={(value) => setFlol(value)}
                                                placeholder="Select"
                                                selectedValue={Flol}
                                                options={[
                                                    { label: "2021", value: "capital" },
                                                    { label: "2022", value: "irregular" },
                                                    { label: "2023", value: "tax" },
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </div>
                                 <FraudLossOpriskLoss />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 mb-3">
                <div className="pageCard">
                    <div className="pageCardTitle">
                        <strong>Operational Risk Losses vs Recovery Data</strong>
                    </div>
                    <div className="row mb-4">
                        <div className="col-6">
                            <div className="pageCard">
                                <div className="pageCardTitle d-flex justify-content-between align-content-between">
                                    <strong className="align-self-center">Gross Loss vs Recovery vs Net Loss</strong>
                                    <div className="elementsRight">
                                        <div className="ml2">
                                            <SelectDropDown
                                                setOpen={setOpenGLRNL}
                                                open={OpenGLRNL}
                                                onChange={(value) => GrossLossFilters(value,"Y")}
                                                placeholder="Select"
                                                selectedValue={gLRNLYear}
                                                options={[
                                                    { label: "2023", value: "2023" },
                                                    { label: "2024", value: "2024" },
                                                    { label: "2025", value: "2025" },
                                                ]}
                                            />
                                        </div>
                                        <div className="ml2">
                                            <SelectDropDown
                                                setOpen={setOpenLossDataFrequency}
                                                open={OpenLossDataFrequency}
                                                onChange={(value) => GrossLossFilters(value,"Q")}
                                                placeholder="Select Quarter"
                                                selectedValue={gLRNLQtr}
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
                                 <GrossLossRecoveryNetLoss data={grossLossData}/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="pageCard">
                                <div className="pageCardTitle d-flex justify-content-between align-content-between">
                                    <strong className="align-self-center">Basel II Categorization</strong>
                                    <div className="elementsRight">
                                        <div className="ml2">
                                            <SelectDropDown
                                                setOpen={setOpenBaselYear}
                                                open={OpenBaselYear}
                                                onChange={(value) => setBaselYear(value)}
                                                placeholder="Select"
                                                selectedValue={BaselYear}
                                                options={[
                                                    { label: "2021", value: "capital" },
                                                    { label: "2022", value: "irregular" },
                                                    { label: "2023", value: "tax" },
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </div>
                                 <BaselCategorization />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default LossDataGraphs;