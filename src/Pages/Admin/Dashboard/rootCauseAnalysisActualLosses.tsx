import { PieChart } from '@mui/x-charts/PieChart';

const data1 = [
  { id: 0, value: 10, label: 'Policy Violation' },
  { id: 1, value: 20, label: 'Weak Control' },
  { id: 2, value: 30, label: 'Inffective Application Control' },
  { id: 3, value: 20, label: 'Process Breach' },
  { id: 4, value: 50, label: 'System Failure' },
];


const RootCauseAnalysisActualLosses = (props:any)=> {
    let data= props?.data;
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
            colors={['yellow', 'red', 'green', 'orange', 'blue','purple','gray','gold','azure','mustard']} // Use palette
            margin={{
                left: 0,
                right: 0,
                top: 0,
                bottom: 60,
            }}
            // slotProps={{ legend: { hidden: true } }}
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
export default RootCauseAnalysisActualLosses;