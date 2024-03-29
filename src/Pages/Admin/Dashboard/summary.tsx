import * as React from 'react';
import { DashboardReportIcon, ReportIcon } from "../../../Components/Icons";
// import { Tab } from "../../../Components/Tab";
import styles from "../../../Assets/Styles/pageShared.module.scss";
import { SummaryCard } from "../../../Components/SummaryCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../Services/Store/hooks";
import { BarChart } from "@mui/x-charts/BarChart";

// import EChannelFraud from "./eChannelFraudold";
import GrossLossRecovery from "./grossLossRecovery";
import KriSummary from "./pinPieChart";
import { Card } from "@mui/material";
import { SelectDropDown } from "../../../Components/DropDown";
import LossDataTrendGraph from "./lossDataTrend";
import OperationalRiskLosses from "./operationalRiskLosses";
import RootCauseAnalysisActualLosses from "./rootCauseAnalysisActualLosses";
import EChannelFraud from "./eChannelFraud";
import FraudLossOpriskLoss from "./fraudLossOpriskLoss";
import GrossLossRecoveryNetLoss from "./grossLossRecoveryNetLoss";
import BaselCategorization from "./baselCategorization";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LossDataGraphs from './lossData/lossDataGraphs';
import KriDataGraphs from './kri/kriDataGraphs';
import RcsaDataGraphs from './rcsa/rcsaDataGraphs';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

/**
  * <summary>
  * called by index.tsx and filter data based on the start date and end date
  * </summary>
  * <param name="minDate,maxDate, selectedDate">
  * </param> 
  * <returns>
  * formatted Summary Table
  * </returns> 
  */

const SumarySection = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [displayStartDate, setDisplayStartDate] = useState('');
  const [displayEndDate, setDisplayEndDate] = useState('');
  const [tabActive, setTabActive] = useState('30');
  const [cardData, setCardData] = useState<any[]>([
    {
      "color": "completed",
      "title": "Completed Transactions",
      "count": "0"
    },
    {
      "color": "pending",
      "title": "Pending Transactions",
      "count": "0"
    },
    {
      "color": "failed",
      "title": "Failed Transactions",
      "count": "0"
    },
    { "selectedValue": { startDate: selectedStartDate, endDate: selectedEndDate } }
  ]);
  // Bar Chart
  const seriesA = {
    data: [2, 3, 1, 4, 5],
    label: "Low",
    xaxis: "test",
  };
  const seriesB = {
    data: [3, 1, 4, 2, 1],
    label: "Medium",
  };
  const seriesC = {
    data: [3, 2, 4, 5, 1],
    label: "High",
  };
  const xLabels = [
    "CYBER",
    "TECHNOLOGY",
    "MARKET/LIQUIDITY",
    "OPERATIONAL",
    "REGULATORY",
  ];

  const getDateRange = (input: any) => {

    const today = new Date();
    const startDate = new Date();
    let endDate = new Date();

    switch (input) {
      case '24': // Today
        endDate = new Date(today);
        break;
      case '7': // This week
        endDate = new Date(today);
        startDate.setDate(today.getDate() - today.getDay());
        break;
      case '30': // This month
        endDate = new Date(today);
        startDate.setDate(1);
        break;
      case '12': // This year
        endDate = new Date(today);
        startDate.setMonth(0, 1);
        break;
    }

    return { startDate, endDate };
  };

  const onDataLoad = async () => {
    const selectedDate = getDateRange('30')
    if (selectedDate) {
      setDisplayStartDate(formatDisplayDate(selectedDate.startDate))
      setDisplayEndDate(formatDisplayDate(selectedDate.endDate))
      const starttime = formatDate(selectedDate.startDate);
      const endtime = formatDate(selectedDate.endDate);
      setSelectedStartDate(starttime.toString());
      setSelectedEndDate(endtime.toString())
      // fetchData(starttime.toString(), endtime.toString());
    }
  };
  // const fetchData = async (minDate: string, maxDate: string) => {
  //   let results: any;
  //   let transformedData: any;
  //   let completedTotal = 0;
  //   let failedTotal = 0;
  //   let pendingTotal = 0;
  //   await dispatch(
  //     getBarChartDetails({ minDateBar: minDate, maxDateBar: maxDate })
  //   ).then((response: any) => {
  //     results = response?.payload?.requestData?.data
  //     results?.forEach((item: { completedCount: number; failedCount: number; pendingCount: number; }) => {
  //       completedTotal += item.completedCount;
  //       failedTotal += item.failedCount;
  //       pendingTotal += item.pendingCount;
  //     });
  //     transformedData = [
  //       { completedCount: completedTotal },
  //       { failedCount: failedTotal },
  //       { pendingCount: pendingTotal }
  //     ];
  //   });

  //   setCardData([
  //     {
  //       "color": "black",
  //       "title": "Loss Data",
  //       "count": transformedData[0]?.completedCount
  //     },
  //     {
  //       "color": "black",
  //       "title": "KRi Reports",
  //       "count": transformedData[2]?.pendingCount
  //     },
  //     {
  //       "color": "black",
  //       "title": "RCSA",
  //       "count": transformedData[1]?.failedCount
  //     },
  //     { "selectedValue": { startDate: selectedStartDate, endDate: selectedEndDate } }
  //   ])
  // }
  useEffect(() => {
    onDataLoad()

  }, []);

  const handleNavigate = (type: string,) => {
    const url = '/transactions';
    return navigate(`/admin${url}`, {
      state: [{ type }, { selectedStartDate }, { selectedEndDate }]
    })
  };
  let selectedTab: any;
  const formatDisplayDate = (today: Date) => {
    const date = String(today.getDate()).padStart(2, '0');;
    const month = String(today.getMonth() + 1).padStart(2, '0');;
    const year = today.getFullYear();
    const formattedDate = `${date}-${month}-${year}`;
    return formattedDate;
  }
  const formatDate = (today: Date) => {
    const date = String(today.getDate()).padStart(2, '0');;
    const month = String(today.getMonth() + 1).padStart(2, '0');;
    const year = today.getFullYear();
    const formattedDate = `${year}-${month}-${date}`;
    return formattedDate;
  }
  return (
    <>
      <div className={styles?.summaryDateFilterContainer}>
        {/* <Tab
          items={[
            { label: "Today", value: "24" },
            { label: "This Week", value: "7" },
            { label: "This Month", value: "30" },
            { label: "This Year", value: "12" },
          ]}
          activeValue={tabActive}
          onClick={(selectedValue) => {selectedTab=selectedValue; 
            setTabActive(selectedValue)
            const selectedDate=getDateRange(selectedTab) 
            if(selectedDate){
              setDisplayStartDate(formatDisplayDate(selectedDate.startDate))
              setDisplayEndDate(formatDisplayDate(selectedDate.endDate))
              const starttime = formatDate(selectedDate.startDate);
              const endtime = formatDate(selectedDate.endDate);
             setSelectedStartDate(starttime.toString());
             setSelectedEndDate(endtime.toString())
             fetchData(starttime.toString(), endtime.toString());
            }   
        }}
        /> */}
        <div className="elementsRight">
          <div>
            [ {displayStartDate} to {displayEndDate} ]
          </div>
        </div>
      </div>
      <section className={styles?.dashboardSummaryContainer}>
        <div className="row mb-3 gx-3 gy-3">
          <div className="col-md-6 col-sm-6 col-xl-4">
            <SummaryCard
              icon={<DashboardReportIcon />}
              color={cardData[0].color}
              title={cardData[0].title}
              count={cardData[0].count}
              onClick={() => handleNavigate("Completed")}
            />
          </div>
          <div className="col-md-6 col-sm-6 col-xl-4">
            <SummaryCard
              icon={<DashboardReportIcon />}
              color={cardData[1].color}
              title={cardData[1].title}
              count={cardData[1].count}
              onClick={() => handleNavigate("Pending")}
            />
          </div>
          <div className="col-md-6 col-sm-6 col-xl-4">
            <SummaryCard
              icon={<DashboardReportIcon />}
              color={cardData[2].color}
              title={cardData[2].title}
              count={cardData[2].count}
              onClick={() => handleNavigate("Failed")}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12">
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Loss Data" {...a11yProps(0)} />
                  <Tab label="KRI" {...a11yProps(1)} />
                  <Tab label="RCSA" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <LossDataGraphs />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <KriDataGraphs />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <RcsaDataGraphs/> 
              </CustomTabPanel>
            </Box>
          </div>
        </div>


      </section>
      {/* <div className="col-6">
            <div className="pageCard">
              <div className="pageCardTitle">
                <h6>Loss Data Trend</h6>
                <div>sss</div>
              </div>
              <BarChart
              width={600}
              height={300}
              series={[
                { ...seriesA, stack: "total" },
                { ...seriesB, stack: "total" },
                { ...seriesC, stack: "total" },
              ]}
              margin={{
                left: 130,
                right: 10,
                top: 40,
                bottom: 20,
              }}
              layout="horizontal"
              yAxis={[{ data: xLabels, scaleType: "band" }]}
              />
            </div>
          </div>
          
          <div className="col-6">
            <div className="pageCard">
              <div className="pageCardTitle">
                <h6>Chart Titled</h6>
              </div>
              
            </div>
          </div> */}
      {/* <div className="col-6">
            <div className="pageCard">
              <div className="pageCardTitle">
                <h6>Chart Title</h6>
              </div>
              <GrossLossRecovery />
            </div>
          </div>
          <div className="col-6">
            <div className="pageCard">
              <div className="pageCardTitle">
                <h6>Chart Title</h6>
              </div>
              <KriSummary />
            </div>
          </div> */}
    </>
  );
};

export default SumarySection;
