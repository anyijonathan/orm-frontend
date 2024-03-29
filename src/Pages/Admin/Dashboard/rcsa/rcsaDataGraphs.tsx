import { useEffect, useState } from "react";
import { SelectDropDown } from "../../../../Components/DropDown";
import OperationalRiskLosses from "../operationalRiskLosses";
import EChannelFraud from "../eChannelFraud";
import { useAppDispatch, useAppStateSelector } from "../../../../Services/Store/hooks";
import { RiskReportAction } from "../../../../Services/Actions/dashboardAction";
import GlobalRiskAssessment from "./globalRiskAssessment";
import HeadOfficeRisk from "./headOfficeRisk";
import BranchesRisk from "./branchesRisk";
import ControlRisk from "./controlRisk";

const RcsaDataGraphs = () => {
    const [openGraYear, setOpenGraYear] = useState(false);
    const [graYear, setGraYear] = useState("");
    const [riskOption, setRiskOption] = useState("G");
    const [openRiskQtr, setOpenRiskQtr] = useState(false);
    const [riskQtr, setRiskQtr] = useState("");
    const [locationId, setLocationId] = useState(0);
    const [locationType, setLocationType] = useState("");
    const dispatch = useAppDispatch();
    let locationState:any = useAppStateSelector((state) => state.locationDataState)
    const [riskData, setRiskData] = useState<any>([]);
    

    useEffect(()=>{
        fetchRiskGraph(1,"B","3","2024")
    },[])

    const fetchRiskGraph=async (locationId:number,locationType:string,month:string,year:string)=>{
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
            fetchRiskGraph(locationId,locationType,value,graYear);
        }
        if(option=="Y"){
            setGraYear(value)
            fetchRiskGraph(locationId,locationType,riskQtr,value);
        } 
        // if(option=="T"){
        //     setRcaType(value)
        //     fetchRootCause(value,orlQtr,OrlYear);
        // }      
    }
    return (
        <>
            <div className="row">
                <div className="col-6 btn-group mb-4" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" onClick={()=>setRiskOption("G")} />
                    <label className="btn btn-outline-primary" htmlFor="btnradio1">Global</label>

                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" onClick={()=>setRiskOption("H")}/>
                    <label className="btn btn-outline-primary" htmlFor="btnradio2">Head Office</label>

                    <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" onClick={()=>setRiskOption("B")}/>
                    <label className="btn btn-outline-primary" htmlFor="btnradio3">Branches</label>

                    <input type="radio" className="btn-check" name="btnradio" id="btnradio4" autoComplete="off" onClick={()=>setRiskOption("C")}/>
                    <label className="btn btn-outline-primary" htmlFor="btnradio4">Control Assessment</label>

                </div>
                {riskOption=="G" && <GlobalRiskAssessment />}
                {riskOption=="H" &&  <HeadOfficeRisk />}
                {riskOption=="C" &&  <ControlRisk />}
                {riskOption=="B" &&  <BranchesRisk />}

            </div>
        </>
    );
};

export default RcsaDataGraphs;