import { useEffect, useState } from "react";
import { SelectDropDown } from "../../../../Components/DropDown";
import OperationalRiskLosses from "../operationalRiskLosses";
import EChannelFraud from "../eChannelFraud";
import { useAppDispatch, useAppStateSelector } from "../../../../Services/Store/hooks";
import { RiskReportAction } from "../../../../Services/Actions/dashboardAction";

const HeadOfficeRisk = () => {
    const [openGraYear, setOpenGraYear] = useState(false);
    const [graYear, setGraYear] = useState("");
    const [openRiskQtr, setOpenRiskQtr] = useState(false);
    const [riskQtr, setRiskQtr] = useState("");
    const [locationId, setLocationId] = useState(0);
    const [locationType, setLocationType] = useState("");
    const dispatch = useAppDispatch();
    let locationState:any = useAppStateSelector((state) => state.locationDataState)
    const [riskData, setRiskData] = useState<any>([]);
    

    useEffect(()=>{
        fetchHeadOfficeRiskGraph(1,"B","3","2024")
    },[])

    const fetchHeadOfficeRiskGraph=async (locationId:number,locationType:string,month:string,year:string)=>{
        let frequency= parseInt(month,10);
         let years= parseInt(year, 10);
        await dispatch(RiskReportAction({locationId:locationId,locationType:locationType, months:frequency, year:years}))
        .then((response:any) =>{
          const result= response?.payload?.requestData?.data;
          setRiskData(result);
      });
    }


    const RiskFilters = (value:any,option:string) => {
        if(option=="Q"){
            setRiskQtr(value)
            fetchHeadOfficeRiskGraph(locationId,locationType,value,graYear);
        }
        if(option=="Y"){
            setGraYear(value)
            fetchHeadOfficeRiskGraph(locationId,locationType,riskQtr,value);
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
                            <strong className="align-self-center">Head Office Function Risk Assessment Result</strong>
                            <div className="elementsRight">
                                <div className="">
                                    <SelectDropDown
                                        setOpen={setOpenGraYear}
                                        open={openGraYear}
                                        onChange={(value) =>RiskFilters(value,"Y")}
                                        placeholder="Select"
                                        selectedValue={graYear}
                                        options={[
                                            { label: "2023", value: "2023" },
                                            { label: "2024", value: "2024" },
                                            { label: "2025", value: "2025" },
                                        ]}
                                    />
                                </div>
                                <div className="ml2">
                                            <SelectDropDown
                                                setOpen={setOpenRiskQtr}
                                                open={openRiskQtr}
                                                onChange={(value) => RiskFilters(value,"Q")}
                                                placeholder="Select Quarter"
                                                selectedValue={riskQtr}
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
                        <div className="row mb-4">
                             {riskData.map((data:any, index:any) => (
                            
                                <div  key={index} className="col-6">
                                <div className="pageCard">
                                    <div className="pageCardTitle d-flex justify-content-between align-content-between">
                                        <strong className="align-self-center">{data.title}</strong>
                                    </div>
                                    <OperationalRiskLosses data={data.charts}/>
                                </div>
                                </div>))}
                        </div>
                        <div className="row mb-4">
                            <div className="col-6">
                                <div className="pageCard">
                                    <div className="pageCardTitle d-flex justify-content-between align-content-between">
                                        <strong className="align-self-center">Trend of Operational Risk Sources</strong>
                                    </div>
                                    <EChannelFraud  data={riskData}/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="pageCard">
                                    <div className="pageCardTitle d-flex justify-content-between align-content-between">
                                        <strong className="align-self-center">Inherent vs Residual Risk</strong>
                                    </div>
                                    <EChannelFraud  data={riskData}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeadOfficeRisk;