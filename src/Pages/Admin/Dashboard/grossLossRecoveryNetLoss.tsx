import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { id: 0, value: 10, label: 'Gross Loss' },
  { id: 1, value: 15, label: 'Recovery' },
  { id: 2, value: 25, label: 'Net Loss' },
];


const GrossLossRecoveryNetLoss = (props:any) => {
    // let data= props?.data;
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
            colors={['red', 'green', 'yellow', 'blue']} // Use palette
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
export default GrossLossRecoveryNetLoss;