import React, { useState } from "react";
import styles from "../../Assets/Styles/pageShared.module.scss";
import { Button, IconButton } from "../Buttons";
import { Dropdown, DropdownContentContaner,
  MenuItem,
} from "../../Components/DropDown";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
  } from "recharts";
import { CalendarIcon, CloudUploadIcon } from '../Icons';
  
  
/**
  * <summary>
  * Display the barchart of the transactions for the selected time period
  * </summary>
  * <param name="event">
  * </param> 
  * <returns>
  * barchart for the time period selected by user
  * </returns> 
  */    
  export default function BarChartDashboard(props: any) {
    const [fromdate, setFromdate] = useState('');
    const [todate, setTodate] = useState('');
    const [todateDisabled, setTodateDisabled] = useState(true);
    const [maxdate, setMaxdate] = useState('');
    const [minDate, setMinDate] = useState('');

    type MyData = {
      name: string,
      Completed: number,
      InProgress: number,
      Pending: number,
      amt: number
     
    };
    const [open, setOpen] = useState(false);
    const handleFromChange = (event:any) => {
      setFromdate(event.target.value);
      setTodateDisabled(false);
      const mxdt = new Date((new Date(new Date(event.target.value).setMonth(new Date(event.target.value).getMonth() + 12))).setDate(0)).toLocaleDateString('en-CA');
      if(new Date(mxdt) <= new Date()){
        setMaxdate(mxdt)
      } else {
        setMaxdate(new Date().toLocaleDateString('en-CA'))
      }
    };
    const handleToChange = (event:any) => {
      setTodate(event.target.value);
      const mindate = (new Date(new Date(event.target.value).setMonth(new Date(event.target.value).getMonth() - 11))).toLocaleDateString('en-CA');
      setMinDate(mindate);
    };
    const exportExcel = async () =>{
      let object ={}
      let arr :any[];
       arr = []
       props.props.forEach((elements:any)=> {
       object ={}
       Object.assign(object, {'Month-Year': elements['name']});
       Object.assign(object, {'Completed Count': elements['Completed']});
       Object.assign(object, {'Failed Count': elements['Failed']});
       Object.assign(object, {'Pending Count': elements['Pending']});
       arr.push(object)
       })
      const worksheet = XLSX.utils.json_to_sheet(arr);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      let blob = new Blob([excelBuffer], {
          type:EXCEL_TYPE
        });
        let url = window.URL.createObjectURL(blob);
        saveAs(url, 'ChartDetails'+'_Data_'+ new Date().toString().substring(0,10) + EXCEL_EXTENSION);
  }
    const handleNavigate = (selectedStartDates:string,selectedEndDates:string) => {   
      const dates = {
        fromdate: selectedStartDates,
        todate: selectedEndDates,
      } 
      props.sendData(dates)
      setFromdate('');
      setTodate('');
      setMinDate('');
      setMaxdate('');
      setTodateDisabled(true);
      setOpen(false);
    };
    return (
    <section className={styles?.dashboardAnalyticsContainer}>
        <div className={styles?.headerBarChart}>
            <div className={styles?.title}>
            Transaction Requests Analytics
            </div>
            <div className={styles?.elementsRight}>
              <span className={styles?.mr2}>
               
                      <IconButton
                        icon={<CloudUploadIcon />}
                        buttonTitle="Export"
                        onClick={() => exportExcel()}
                      />
              </span>
                <Dropdown
                externalToggle={true}
                handleClose={() => setOpen(false)}
                open={open}
                contentWidth={true}
                content={
                    <DropdownContentContaner>
                      <MenuItem>
                        <div className={styles?.selectContainer}>
                          <div className={styles?.dateRangeHeading}>Select Dates</div>
                          <div className={styles?.dateContainer}>
                            <div className={styles?.dateFrom}><input type="date" className={styles?.formControl} placeholder="Select From Date" onChange={handleFromChange} value={fromdate} min={minDate} max={new Date().toLocaleDateString('en-CA')} ></input></div>
                            <div className={styles?.dateTo}><input type="date" className={styles?.formControl} placeholder="Select To Date" onChange={handleToChange} value={todate} max={maxdate} min={fromdate} disabled={todateDisabled}></input></div>
                          </div>
                          <div className={styles?.buttonContainer}>
                            <Button
                            onClick={() => handleNavigate(fromdate,todate)}
                            >Search</Button>
                          </div>
                        </div>
                      </MenuItem>
                    </DropdownContentContaner>
                }
                >
                <IconButton
                  icon={<CalendarIcon />}
                  buttonTitle="Select Dates"
                  onClick={() => setOpen(!open)}
                />
                </Dropdown> 
            </div>
        </div>
        <div>
            <div className={styles?.chartLegendContainer}>
                <div className={styles?.legend}>
                <div className={styles?.customDot1}></div> <span>Completed</span>
                </div>
                <div className={styles?.legend}>
                <div className={styles?.customDot2}></div> <span>Failed</span>
                </div>
                <div className={styles?.legend}>
                <div className={styles?.customDot3}></div> <span>Pending</span>
                </div>
            </div>
            <div className={styles?.chartContainer}>
                <div className={styles?.yLabel}>Number of Transactions</div>
                    <div style={{ width: "100%", height: 350 }}>
                        <ResponsiveContainer>
                            <BarChart
                                width={500}
                                height={350}
                                data={props.props}
                                margin={{
                                top: 0,
                                right: 30,
                                left: 20,
                                bottom: 5
                                }}
                            >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name"
                            tick={{ fontSize: 10 }}
                            interval={0}
                            xlinkTitle="Years Data"
                             />
                            <YAxis dataKey="amt"/>
                            <Tooltip />
                            {/* <Legend /> */}
                            <Bar dataKey="Completed" fill="#400063" />
                            <Bar dataKey="Failed" fill="#A135DE" />
                            <Bar dataKey="Pending" fill="#E3B1FF" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
            </div>
                <div className={styles?.xLabel}>Months</div>
        </div>
    </section>
    );
  }