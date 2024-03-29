import { PieChart } from "@mui/x-charts/PieChart";

const GrossLossRecovery = () => {
    return (
        <>
            <PieChart
            width={400}
            height={280}
            series={[
                {
                data: [
                    { id: 0, value: 10, label: "Recovery Value" },
                    { id: 1, value: 15, label: "Net Operational Risk Loss" },
                ],
                innerRadius: 66,
                outerRadius: 100,
                paddingAngle: 0,
                cornerRadius: 0,
                startAngle: -180,
                endAngle: 180,
                cx: 150,
                cy: 100,
                },
            ]}
            slotProps={{
                legend: {
                direction: "row",
                position: { vertical: "bottom", horizontal: "left" },
                padding: 0,
                },
            }}
            />
        </>
    );
};
export default GrossLossRecovery;