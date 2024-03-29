import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import GaugeChart from "react-gauge-chart";

const PinPieChart = (props:any)=>{
    let data=props?.data?.threshold;
    let value:number=0;
    if(data === "Appetite"){
        value= 0.3
    }
    if(data === "Tolerance"){
        value= 0.6
    }
    if(data === "Escalation"){
        value= 0.9
    }
    return(
        <>
            <GaugeChart
              id="gauge-chart"
              nrOfLevels={9}
              percent={value}
              hideText={true}
              textColor="black"
              needleBaseColor="#F35725"
              arcPadding={0}
              cornerRadius={0}
              arcWidth={0.24}
              formatTextValue={(value:any) => `${value}%`}
              needleColor="#F35725"
              colors={["green", "orange", "red"]}
              arcsLength={[0.075, 0.075, 0.075,]}
            />
        </>
    );

};
export default PinPieChart; 