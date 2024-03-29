import { BarChart } from "@mui/x-charts/BarChart";

const janData = [4000, 3000, 2000, 2780, 1890, 2390];
const febData = [2400, 1398, 9800, 3908, 4800, 3800];
const marData = [2400, 1398, 9800, 3908, 4800, 3800];
const xLabels = ["Web", "Mobile Banking", "QuickTeller", "POS", "ATM", "RIB"];

const EChannelFraud = (props:any) =>{
    return (
        <>
        <BarChart
            height={300}
            series={[
                { data: janData, label: "Jan 23", id: "janId" },
                { data: febData, label: "Feb 23", id: "febId" },
                { data: marData, label: "Mar 23", id: "marId" },
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

export default EChannelFraud;