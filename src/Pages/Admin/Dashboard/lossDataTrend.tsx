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
      amt: 2,
      cnt: 20,
    },
    {
      name: 'Feb',
      value: 868,
      frequency: 967,
      amt: 2,
      cnt: 20,
    },
    {
      name: 'Mar',
      value: 1397,
      frequency: 1098,
      amt: 20,
      cnt: 20,
    },
    {
      name: 'Apr',
      value: 1480,
      frequency: 1200,
      amt: 2,
      cnt: 20,
    },
    {
      name: 'May',
      value: 1520,
      frequency: 1108,
      amt: 2,
      cnt: 20,
    },
    {
      name: 'Jun',
      value: 1400,
      frequency: 680,
      amt: 10,
      cnt: 20,
    },
    {
      name: 'Jul',
      value: 1400,
      frequency: 680,
      amt: 2,
      cnt: 20,
    },
    {
      name: 'Aug',
      value: 1400,
      frequency: 680,
      amt: 2,
      cnt: 20,
    },
    {
      name: 'Sep',
      value: 1400,
      frequency: 680,
      amt: 20,
      cnt: 20,
    },
    {
      name: 'Oct',
      value: 1400,
      frequency: 680,
      amt: 2,
      cnt: 20,
    },
    {
      name: 'Nov',
      value: 1400,
      frequency: 680,
      amt: 2,
      cnt: 20,
    },
    {
      name: 'Dec',
      value: 1400,
      frequency: 680,
      amt: 20,
      cnt: 20,
    },
  ];

const LossDataTrendGraph = (props: any) => {
  let data= props.data;
  let maxFrequency = Math.max(...data.map((item:any) => item.frequency));

// Update the data array to include amt property
  let updatedData = data.map((item:any) => ({
      ...item,
      amt: maxFrequency,
  }));
    return (
        <>
        <ComposedChart
        width={1200}
        height={400}
        data={data1}
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
        <YAxis yAxisId="right-axis"
                orientation="right" dataKey="amt"/>
        <Tooltip />
        <Legend />
        {/* <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" /> */}
        <Bar dataKey="value" barSize={20} fill="#413ea0" />
        {/* <Bar dataKey="frequency" barSize={20} fill="green" />
        <Bar dataKey="amt" barSize={20} fill="red" /> */}
        <Line type="monotone" dataKey="frequency" stroke="#ff7300" />
        {/* <Scatter dataKey="cnt" fill="red" /> */}
        </ComposedChart>
        </>
    );
};
export default LossDataTrendGraph;