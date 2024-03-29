import { BarChart } from "@mui/x-charts/BarChart";

const janData = [4000, 3000, 2000];
const febData = [2400, 1398, 9800];
const marData = [2400, 1398, 9800];
const xLabels = ["North", "South", "Lagos"];


const RegionalDistributionInternalLosses = (props:any) =>{
    let data= props?.data;
    console.log(data);
    return (
        <>
        <BarChart
            height={300}
            series={[
                { data: janData, label: "Jan 23", id: "janId" },
                
            ]}
            yAxis={[{ data: xLabels, scaleType: "band" }]}
            layout="horizontal"
            slotProps={{
                legend: {
                direction: "row",
                position: { vertical: "bottom", horizontal: "middle" },
                padding: 0,
                },
            }}
            colors={["red", "orange", "green"]} // Use palette
            margin={{
                left: 100,
                right: 0,
                top: 0,
                bottom: 65,
            }}
            />
        </>
    );
};

export default RegionalDistributionInternalLosses;