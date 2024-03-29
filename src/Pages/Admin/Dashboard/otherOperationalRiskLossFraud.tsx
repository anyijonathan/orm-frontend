import React, { PureComponent } from 'react';
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Scatter,
    ResponsiveContainer,
  } from 'recharts';

  const data1 = [
    {
      name: 'Jan',
      value: 590,
      frequency: 800,
      amt: 1400111,
      cnt: 490,
    },
    {
      name: 'Feb',
      value: 868,
      frequency: 967,
      amt: 1506,
      cnt: 590,
    },
    {
      name: 'Mar',
      value: 1397,
      frequency: 1098,
      amt: 989,
      cnt: 350,
    },
    {
      name: 'Apr',
      value: 1480,
      frequency: 1200,
      amt: 1228,
      cnt: 480,
    },
    {
      name: 'May',
      value: 1520,
      frequency: 1108,
      amt: 1100,
      cnt: 460,
    },
    {
      name: 'Jun',
      value: 1400,
      frequency: 680,
      amt: 1700,
      cnt: 380,
    },
    {
      name: 'Jul',
      value: 1400,
      frequency: 680,
      amt: 1700,
      cnt: 380,
    },
    {
      name: 'Aug',
      value: 1400,
      frequency: 680,
      amt: 1700,
      cnt: 380,
    },
    {
      name: 'Sep',
      value: 1400,
      frequency: 680,
      amt: 1700,
      cnt: 380,
    },
    {
      name: 'Oct',
      value: 1400,
      frequency: 680,
      amt: 1700,
      cnt: 380,
    },
    {
      name: 'Nov',
      value: 1400,
      frequency: 680,
      amt: 1700,
      cnt: 380,
    },
    {
      name: 'Dec',
      value: 1400,
      frequency: 680,
      amt: 1700,
      cnt: 380,
    },
  ];

const OtherOperationalRiskLossFraud = (props: any) => {
    return (
        <>
        <ComposedChart
        width={1200}
        height={400}
        data={data1}
        // data={props?.data}
        margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        }}
        >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" /> */}
        <Bar dataKey="value" barSize={20} fill="#413ea0" />
        <Bar dataKey="frequency" barSize={20} fill="green" />
        <Bar dataKey="amt" barSize={20} fill="red" />
        <Line type="monotone" dataKey="frequency" stroke="#ff7300" />
        {/* <Scatter dataKey="cnt" fill="red" /> */}
        </ComposedChart>
        </>
    );
};
export default OtherOperationalRiskLossFraud;