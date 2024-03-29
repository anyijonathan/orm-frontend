import { PieChart } from '@mui/x-charts/PieChart';

const data1 = [
  { id: 0, value: 10, label: 'Potential Loss' },
  { id: 1, value: 15, label: 'Actual Loss' },
  { id: 2, value: 20, label: 'Near Miss' },
];


const OperationalRiskLosses = (props: any) => {
    const data=props?.data;
    return (
        <>
            <PieChart
            series={[
                {
                data,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                },
            ]}
            height={300}
            colors={['yellow', 'red', 'green']} // Use palette
            margin={{
                left: 0,
                right: 0,
                top: 0,
                bottom: 40,
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
export default OperationalRiskLosses;