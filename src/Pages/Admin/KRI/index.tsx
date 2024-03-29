import { useEffect, useState } from "react";
import { Button, IconButton } from "../../../Components/Buttons";
import { DateRangePicker } from "../../../Components/DatePicker/rangePicker";
import {
  Dropdown,
  DropdownContentContaner,
  SelectDropDown,
} from "../../../Components/DropDown";
import { CalendarIcon, CloudUploadIcon, FileIcon, FilterIcon } from "../../../Components/Icons";
import {
  PageHeader,
  TableCard,
  TableFiltersContainer,
} from "../../../Components/PageShared";
import  "../../../Assets/Styles/global.scss";
import TableKri from "./tableKri";
import { any } from "jest-mock-extended";
import CreateKri from "./createKri";
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
type MyData = {
  category: string;
  textField: string;
  toleranceLowerBound: string;
  escalationLowerBound: string;
  frequency: string;
  indicator: string;
  appetiteUpperBound: string;
  toleranceUpperBound: string;
  escalationUpperBound: string;
  appetiteType: string;
};
type IParameters = {
  PageNumber: number;
  RequestId: String;
  minDate: string;
  maxDate: string;
};

const KriPage = () => {
  const navigate = useNavigate();
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openDatePickerTo, setOpenDatePickerTo] = useState(false);
  const [TypeType, setTypeType] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString("fr-FR"));
  const [openTypeType, setOpenTypeType] = useState(false);
  const [minDate, setMinDate] = useState(
    new Date().toLocaleDateString("fr-FR")
  );
  const [maxDate, setMaxDate] = useState(
    new Date().toLocaleDateString("fr-FR")
  );
  const [data, setData] = useState<MyData[]>([]);
  const [requestID, setRequestID] = useState("");
  const [totalCount, setTotalCount] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [paginator, setpaginator] = useState(true); 
  const [openBranch, setOpenBranch] = useState(false);
  const [branch, setBranch] = useState('');
  const [openDepartment, setOpenDepartment] = useState(false);
  const [department, setDepartment] = useState('');
  const [openFrequency, setOpenFrequency] = useState(false);
  const [frequency, setFrequency] = useState('');
  const [openCategory, setOpenCategory] = useState(false);
  const [category, setCategory] = useState('');
  const [openMetric, setOpenMetric] = useState(false);
  const [metric, setMetric] = useState('');


  const handlePaginationChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
    // fetchData(pageNumber);
  };
  const [openCreateKri, setOpenCreateKri] = useState(false);
  const handleCreateKriClick = () => {
    const url='/create-kri';
     navigate(`/admin${url}`);
  };
  useEffect(() => {
    fetchData(1,"false")
  }, []);
  let data1:any=[];
  const fetchData= async (pageNo:number,isExport: string) =>{
    // await dispatch(
    //   userDetailsAction( {PageNumber:pageNo,isExport})
    //   ).then((response:any) => {
    //     const result= response?.payload?.userData?.data;
     data1 =[{
      category: "category1",
      textField: "random-1",
      toleranceLowerBound: "toleranceLowerBound-1",
      escalationLowerBound: "escalationLowerBound-1",
      metric: "metric1",
      currency: "naira",
      branch: "branch2",
      department: "fintech",
      region: "anambra",
      frequency: "Frequency1",
      indicator: "indicator-1",
      appetiteUpperBound: "appetiteUpperBound-1",
      toleranceUpperBound: "toleranceUpperBound-1",
      escalationUpperBound: "escalationUpperBound-1",
      appetiteType: "appetiteType1",
      kriStatus: "Saved"
    },
    {
      category: "category2",
      textField: "random-2",
      toleranceLowerBound: "toleranceLowerBound-2",
      escalationLowerBound: "escalationLowerBound-2",
      metric: "metric2",
      currency: "usd",
      branch: "branch1",
      department: "investment-banking",
      region: "bauchi",
      frequency: "Frequency2",
      indicator: "indicator-2",
      appetiteUpperBound: "appetiteUpperBound-2",
      toleranceUpperBound: "toleranceUpperBound-2",
      escalationUpperBound: "escalationUpperBound-2",
      appetiteType: "appetiteType2",
      kriStatus: "Submitted"
    },
  ];
       // tableData=data1
        setData(data1);
        setTotalCount(15);
  // });
}

  const exportData = async() =>{

    // await dispatch(
    //   userDetailsExportAction( {filters:""})
    //   ).then((response:any) => {
    //     const result= response?.payload?.userData?.data;
  let results= data
  console.log('results',results)

    const worksheet = XLSX.utils.json_to_sheet(await creationOfColumnNames(results));
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        let blob = new Blob([excelBuffer], {
            type:EXCEL_TYPE
          });
          let url = window.URL.createObjectURL(blob);
          saveAs(url, 'ORM_KriDataDetails'+'_Data_'+ new Date().toString().substring(0,10) + EXCEL_EXTENSION); 
  
  }
  const creationOfColumnNames = async (results:any) => {
    let arr: any[];
    let object ={}
     arr = []
     console.log('results_1',results)

     results?.forEach((elements:any)=> {
     object ={}
     Object.assign(object, {'Category	': elements['category']});
     Object.assign(object, {'Tolerance Lower Bound': elements['toleranceLowerBound']});
     Object.assign(object, {'Escalation Lower Bound': elements['escalationLowerBound']});
     Object.assign(object, {'Metric': elements['metric']});
     Object.assign(object, {'Currency': elements['currency']});
     Object.assign(object, {'Branch': elements['branch']});
     Object.assign(object, {'Department': elements['department']});
     Object.assign(object, {'Region': elements['region']});
     Object.assign(object, {'Frequency': elements['frequency']});
     Object.assign(object, {'Indicator': elements['indicator']});
     Object.assign(object, {'Appetite Upper Bound': elements['appetiteUpperBound']});
     Object.assign(object, {'Tolerance Upper Bound': elements['toleranceUpperBound']});
     Object.assign(object, {'Escalation Upper Bound': elements['escalationUpperBound']});
     Object.assign(object, {'Appetite Type': elements['appetiteType']});
     Object.assign(object, {'Status': elements['kriStatus']});
     arr.push(object)
     })
    return arr;
  }
  const searchQuery = async(event:any)=>{
    event.preventDefault();
    let searchdata={
    minDate : minDate,
    maxDate : maxDate,
    branch: branch,
    frequency: frequency,
    category: category,
    department: department,
    metric: metric
   };
   console.log('searchdata',searchdata)
   // await dispatch(
   //   lossDataSearch( searchdata)
   //   ).then((response:any) => {
   //    // const result= response?.payload?.userData?.data;
   //   });
   let data1 =[{
    category: "category-Searched-1",
    textField: "13-Searched-1",
    toleranceLowerBound: "toleranceLowerBound-Searched-1",
    escalationLowerBound: "escalationLowerBound-Searched-1",
    frequency: "frequency-Searched-1",
    metric: "metric1",
    currency: "naira",
    branch: "branch2",
    department: "fintech",
    region: "anambra",
    indicator: "indicator-Searched-1",
    appetiteUpperBound: "appetiteUpperBound-Searched-1",
    toleranceUpperBound: "toleranceUpperBound-Searched-1",
    escalationUpperBound: "escalationUpperBound-Searched-1",
    appetiteType: "appetiteType-Searched-1",
  },
  {
    category: "category-Searched-2",
    textField: "13-Searched-2",
    toleranceLowerBound: "toleranceLowerBound-Searched-2",
    escalationLowerBound: "escalationLowerBound-Searched-2",
    frequency: "frequency-Searched-2",
    metric: "metric2",
    currency: "usd",
    branch: "branch1",
    department: "investment-banking",
    region: "bauchi",
    indicator: "indicator-Searched-2",
    appetiteUpperBound: "appetiteUpperBound-Searched-2",
    toleranceUpperBound: "toleranceUpperBound-Searched-2",
    escalationUpperBound: "escalationUpperBound-Searched-2",
    appetiteType: "appetiteType-Searched-2",
  },
];
     setData(data1);
     setTotalCount(20);
    }
  return (
    <>
      <PageHeader title="KRI"></PageHeader>
      <TableCard>
        <TableFiltersContainer>
          <div className="tableHeaderDetails transResp">
            <div className="details">
              <h3 className="title">KRI List</h3>
              <div>
                <p className="subtitle">Total Count: {totalCount}</p>
              </div>
            </div>
            <div>
                <div className="row gx-3">
                    <div className="col-auto">
                        {/* <IconButton
                            icon={<FileIcon />}
                            buttonTitle="Export"
                            onClick={exportData}
                        /> */}
                        <Button variant="export" color="purple" onClick={exportData}>Export</Button>
                    </div>
                    <div className="col-auto">
                        <Button color="primary" variant="contained" onClick={ handleCreateKriClick}>
                            Create KRI
                        </Button>
                        {openCreateKri && <CreateKri open={undefined} setopen={undefined} data={undefined} />}
                    </div>
                </div>
            </div>
          </div>
        </TableFiltersContainer>
        <TableFiltersContainer>
          <div className="filterBar">
            <div className="mb-2">
              <strong>Filter Search</strong>
            </div>
            <div className="row">
              <div className="col">
                <Dropdown
                  externalToggle={true}
                  handleClose={() => setOpenDatePicker(false)}
                  open={openDatePicker}
                  contentWidth={true}
                  content={
                    <DropdownContentContaner>
                      <DateRangePicker
                       close={() =>{setOpenDatePicker(false);}}
                       onApply={(values) => {
                         setOpenDatePicker(false);
                         const min = (new Date(values[0])).toLocaleDateString('en-GB', {
                           year: 'numeric',
                           month: '2-digit',
                           day: '2-digit',
                       }).split('/').reverse().join('-');
                       setMinDate(min)
                         const max = (new Date(values[1])).toLocaleDateString('en-GB', {
                           year: 'numeric',
                           month: '2-digit',
                           day: '2-digit',
                       }).split('/').reverse().join('-');
                       setMaxDate(max)
                       console.log('min',min)
                       console.log('max',max)
                       }}
                      />
                    </DropdownContentContaner>
                  }
                >
                  <IconButton
                    icon={<CalendarIcon />}
                    buttonTitle="Select Date"
                    onClick={() => setOpenDatePicker(!openDatePicker)}
                  />
                </Dropdown>
              </div>
              {/* <div className="col">
                <Dropdown
                  externalToggle={true}
                  handleClose={() => setOpenDatePickerTo(false)}
                  open={openDatePickerTo}
                  contentWidth={true}
                  content={
                    <DropdownContentContaner>
                      <DateRangePicker
                        close={function (): void {
                          throw new Error("Function not implemented.");
                        }}
                        onApply={function (selectedDates: Date[]): void {
                          throw new Error("Function not implemented.");
                        }}
                      />
                    </DropdownContentContaner>
                  }
                >
                  <IconButton
                    icon={<CalendarIcon />}
                    buttonTitle="To Date"
                    onClick={() => setOpenDatePickerTo(!openDatePickerTo)}
                  />
                </Dropdown>
              </div> */}
              <div className="col">
                <SelectDropDown
                    setOpen={setOpenBranch}
                    open={openBranch}
                    onChange={(value) => setBranch(value)}
                    placeholder="Branch"
                    selectedValue={branch}
                    options={[
                    { label: "First", value: "first" },
                    { label: "Second", value: "second" },
                    { label: "Third", value: "third" },
                    ]}
                />
              </div>
              <div className="col-auto">
                <SelectDropDown
                    setOpen={setOpenDepartment}
                    open={openDepartment}
                    onChange={(value) => setDepartment(value)}
                    placeholder="Department"
                    selectedValue={department}
                    options={[
                    { label: "Department1", value: "department1" },
                    { label: "Department2", value: "department2" },
                    { label: "Department3", value: "department3" },
                    ]}
                />
              </div>
              <div className="col">
                <SelectDropDown
                    setOpen={setOpenFrequency}
                    open={openFrequency}
                    onChange={(value) => setFrequency(value)}
                    placeholder="Frequency"
                    selectedValue={frequency}
                    options={[
                    { label: "Frequency1", value: "frequency1" },
                    { label: "Frequency2", value: "frequency2" },
                    { label: "Frequency3", value: "frequency3" },
                    ]}
                />
              </div>
              <div className="col">
                <SelectDropDown
                    setOpen={setOpenCategory}
                    open={openCategory}
                    onChange={(value) => setCategory(value)}
                    placeholder="Category"
                    selectedValue={category}
                    options={[
                    { label: "Category1", value: "category1" },
                    { label: "Category2", value: "category2" },
                    { label: "Category3", value: "category3" },
                    ]}
                />
              </div>
              <div className="col">
                <SelectDropDown
                    setOpen={setOpenMetric}
                    open={openMetric}
                    onChange={(value) => setMetric(value)}
                    placeholder="Metric"
                    selectedValue={metric}
                    options={[
                    { label: "Metric1", value: "metric1" },
                    { label: "Metric2", value: "metric2" },
                    { label: "Metric3", value: "metric3" },
                    ]}
                />
              </div>
              <div className="col-2">
                <Button
                 onClick={(e) => searchQuery(e)}
                >Search</Button>
              </div>
              <div className="col-auto">
                <IconButton
                    icon={<FilterIcon />}
                    buttonTitle="Clear Filter"
                    variant="textIconButtonOnly"
                  />
              </div>
            </div>
          </div>
        </TableFiltersContainer>
        <TableKri
          props={data}
          request={requestID}
          totalCount={totalCount}
          onChangePage={handlePaginationChange}
          paginator={paginator}
        />
      </TableCard>
    </>
  );
};
export default KriPage;
