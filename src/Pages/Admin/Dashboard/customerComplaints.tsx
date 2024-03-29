import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const valueFormatter = (value: number) => `${value}mm`;

const CustomerComplaints = () => {
    return(
        <>
            <BarChart
            // width={500}
            height={400}
            series={[
                { data: pData, label: 'Total Complaints', id: 'pvId' },
                { data: uData, label: 'Unresolved Complaints', id: 'uvId' },
            ]}
            xAxis={[{ data: xLabels, scaleType: 'band' }]}
            />
        </>
    );
};

export default CustomerComplaints;