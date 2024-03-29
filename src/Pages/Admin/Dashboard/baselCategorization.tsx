import { BarChart } from "@mui/x-charts/BarChart";
import { AxisConfig } from "@mui/x-charts";

const uData = [4000, 3000, 2000, 2780, 1890];
const pData = [-2400, -1398, -9800, -3908, -4800];

const xLabels = [
  "Internal Fraud",
  "External Fraud",
  "Execution Delivery",
  "Client Production",
  "Employment",
];

const BaselCategorization = () => {
    return (
        <>
            <BarChart
            height={300}
            series={[
                {
                data: pData,
                label: "Fraud Loss",
                color: "blue",
                },
                {
                data: uData,
                label: "OpRisk Loss",
                color: "orange",
                },
            ]}
            yAxis={[
                {
                data: xLabels,
                scaleType: "band",
                } as Omit<AxisConfig, "id">,
            ]}
            xAxis={[{ max: 10000 }]}
            layout="horizontal"
            margin={{
                left: 120,
                right: 0,
                top: 0,
                bottom: 65,
            }}
            slotProps={{
                legend: {
                direction: "row",
                position: { vertical: "bottom", horizontal: "middle" },
                padding: 0,
                },
            }}
            />
        </>
    );
};
export default BaselCategorization;