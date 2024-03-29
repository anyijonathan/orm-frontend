
import { PieChart, Pie, Cell } from "recharts";
import React, { useState,useEffect } from "react";
import styles from "../../Assets/Styles/pageShared.module.scss";
import { getpieChartDetails } from "../../Services/Actions/dashboardAction";
import { useAppDispatch } from "../../Services/Store/hooks";
import { v4 as uuidv4 } from 'uuid';

/**
  * <summary>
  *  creates Pie chart used by the dashboard in the App
  * </summary>
  * <param name="props">
  * </param> 
  * <returns>
  *  custom barchart based on the date range selected by user
  * </returns> 
  */
type PieChartData = {
  requestData: {
    data: [{
      isAccountLocked: string,
      count: number
    }];
    total: number
  }
}
const COLORS = ["#5C068C", "#A135DE", "#FFBB28", "#FF8042"];


export default function PieChartDashboard(props: any) {
 
  const [pieChartData,setPieChartData]=useState<PieChartData>();
  const dispatch = useAppDispatch();
  const [selectedStartDates, setSelectedStartDates] = useState('');
  const [selectedEndDates, setSelectedEndDates] = useState('');

  const onDataLoad = async (min?: string, max?: string) => {
    let arr1: any[] = []
    let newArr: any[] = [];
    await dispatch(
      getpieChartDetails({baselEventType1:"", months:0, year:111})
    ).then((response:any) => {
      const result:PieChartData= response?.payload;
      setPieChartData(result)
    });
  }
   useEffect(() => {
     onDataLoad()
     setSelectedEndDates('');
     setSelectedStartDates('');
   }, []);
  return (
    <section className={styles?.dashboardAnalyticsContainer}>
        <div className={styles?.header}>
            <div className={styles?.title}>User Analytics</div>
            <div className={styles?.chartLegendContainer}></div>
        </div>
        <div className={styles?.pieChartLegendContainer}>
          <div className={styles?.pieChartSelect}>
          </div>
        </div>
        <PieChart width={350} height={201} className={styles?.rechartsWrapper}>
        <Pie
            data={pieChartData?.requestData?.data}
            // cx={120}
            cy={96}
            innerRadius={50}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="count"
        >
            {pieChartData?.requestData?.data?.map((entry, index) => (
            <Cell key={uuidv4()} fill={COLORS[index % COLORS.length]} />
            ))}
        </Pie>
        
        </PieChart>
        <div className={styles?.pieChartText}>
          <div>Total Users</div>
          <div><strong>{pieChartData?.requestData?.total}</strong></div>
        </div>
        <div className={styles?.pieChartLegends}>


      
        {pieChartData?.requestData?.data?.map((item, index) => {
        if(item.isAccountLocked)
        { return (
          <div 
          key={uuidv4()}
          className="row py-0 justify-content-between">
             
          <div className="col-auto"><span className={styles?.legend2}>Inactive</span></div>
          <div className="col-auto">{item.count.toString()}</div>
        </div>
        );
        }   
        else
        {
          return (<div 
            key={uuidv4()}
             className="row mb-2 py-0 justify-content-between">
            <div className="col-auto"><span className={styles?.legend1}>Active</span></div>
            <div className="col-auto">{item.count.toString()}</div> 
          </div>);
        }
       
      })
      }
     </div>
    </section>
  );
}
