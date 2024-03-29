import { useEffect, useState } from "react";
import { SelectDropDown } from "../../../../Components/DropDown";
import OperationalRiskLosses from "../operationalRiskLosses";
import EChannelFraud from "../eChannelFraud";
import { useAppDispatch, useAppStateSelector } from "../../../../Services/Store/hooks";
import { RiskReportAction } from "../../../../Services/Actions/dashboardAction";
import { getBranchGridDataAction } from "../../../../Services/Actions/locationAction";

const ControlRisk = () => {
    const [openGraYear, setOpenGraYear] = useState(false);
    const [graYear, setGraYear] = useState("2024");
    const [openRiskQtr, setOpenRiskQtr] = useState(false);
    const [riskQtr, setRiskQtr] = useState("0");
    const [locationId, setLocationId] = useState(0);
    const [locationType, setLocationType] = useState("");
    const dispatch = useAppDispatch();
    let locationState:any = useAppStateSelector((state) => state.locationDataState)
    const [riskData, setRiskData] = useState<any>([]);
    const [OpenSelectBranch, setOpenSelectBranch] = useState(false);
    const [SelectBranch, setSelectBranch] = useState("");
    const [branchData, setBranchData] = useState<any[]>([]);

    useEffect(()=>{
        GetBranches();

    },[])

    const GetBranches= async () => {
            setLocationType("B");
            await dispatch(
                getBranchGridDataAction( {Title:"", status:"Active", PageNumber:1,isExport:true})          //todo- for user mang - pageno. free api
                ).then((response:any) => {
                  const result= response?.payload?.requestData?.data;
                  const dropdownOptions = result.data.map((item:any) => ({
                    label: item.branch,
                    value: item.id
                  }));
                  setBranchData(dropdownOptions)
                  setSelectBranch(dropdownOptions[0]?.value)
                  FetchControlRiskGraph(parseInt(dropdownOptions[0]?.value),"B","3","2024")

            });
    }
    const FetchControlRiskGraph=async (locationId:number,locationType:string,month:string,year:string)=>{
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
            FetchControlRiskGraph(locationId,locationType,value,graYear);
        }
        if(option=="Y"){
            setGraYear(value)
            FetchControlRiskGraph(locationId,locationType,riskQtr,value);
        } 
        if(option=="B"){
            setSelectBranch(value)
            FetchControlRiskGraph(parseInt(value),locationType,riskQtr,graYear);

        }      
    }
    return (
        <>
            <div className="row">
                <div className="col-12 mb-3">
                    <div className="pageCard">
                        <div className="pageCardTitle d-flex justify-content-between align-content-between">
                            <strong className="align-self-center">Bank Wide Control Assessment</strong>
                            <div className="elementsRight">
                            <div className="">
                                <SelectDropDown
                                    setOpen={setOpenSelectBranch}
                                    open={OpenSelectBranch}
                                    onChange={(value) => RiskFilters(value,"B")}
                                    placeholder="Select Branch"
                                    selectedValue={SelectBranch}
                                    options={branchData}
                                />
                            </div>
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
                        {/* <div className="row mb-4">
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
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ControlRisk;