import React, { useEffect, useState } from "react";
import { Box, Button, Divider } from "@mui/material";
import * as Yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import BaseStepper from "../atoms/BaseStepper";
import Form1 from "../molecules/Form1";
import Form2 from "../molecules/Form2";
import Form3 from "../molecules/Form3";
import ButtonStepper from "../atoms/ButtonStepper";
import { PageHeader } from "../../PageShared";
import "../../../Assets/Styles/global.scss";
import { BackButton } from "../../Buttons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppStateSelector } from "../../../Services/Store/hooks";
// import { updateStateAction } from "../../../Services/Actions/kriAction";

let steps = [];

function _renderStepContent(step: number, allData:any, refNo:string, kriReportId:number, metricIds:number[]) {
  return <Form1 step={step} data={allData} kriRef={refNo} kriReportId={kriReportId} metricIds={metricIds}/>;
}

const validationSchema = [
  // Form 1
  Yup.object().shape({
    // name: Yup.string().required().label("Name"),
    // email: Yup.string().email().required().label("Email")
  }),
];

const FormRegistration=(props:any)=> {
  const [ pageData, setPageData] = useState<any[]>([]);
  const ActivePage= props?.Kris;
  const refNo= props?.refNo;
  const data= props?.data;
  const kriReportId= props?.kriReportId;
  const metricIds= props?.metricIds;
  const reportingPeriod= props.reportingPeriod;
  const [ allData, setAllData ] = useState<any>([]);
  useEffect(()=> {
    setAllData([{ActivePage},{data}, {refNo},{kriReportId},{metricIds}]);
    setActiveStep(props?.Kris);
    // UpdateStateData;
  },[])

  const dispatch = useAppDispatch();

  // const UpdateStateData=async()=>{
  //   await dispatch(
  //     updateStateAction(allData).then((response:any) => {
  //       const result= response?.payload?.requestData?.data;
  //       console.log(result.data);
  //     }
  //     )); 
  // }
  steps=metricIds;
  const [activeStep, setActiveStep] = useState(1);
  const currentValidationSchema = validationSchema[0];
  const isLastStep = activeStep === steps.length;
  const navigate = useNavigate();
  const formProps = useForm({
    resolver: yupResolver(currentValidationSchema),
    defaultValues: {
    }
  });
  const { handleSubmit, control, formState } = formProps;
  const authState:any = useAppStateSelector((state) => state.authState)

  const onSubmit = async (value: any) => {
    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    await sleep(100).then(() => {
      console.log("value", value);
    });
  };

  function _handleSubmit() {
    if (isLastStep) {
      return handleSubmit(onSubmit)();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  }

  function _handleBack() {
    if (activeStep === 1) {
      return;
    }
    setActiveStep(activeStep - 1);
  }
  let date: Date = new Date();  

  return (
    <>
    <BackButton navigate={navigate}></BackButton>
    <PageHeader title="Log KRI Data" />
    <div className="grayBox">
      <div className="row">
        <div className="col-2">
          <div className="form-group"><label htmlFor="">Reference Number</label><div className="viewBoxContent">{refNo}</div></div>
        </div>
        <div className="col-2">
          <div className="form-group">
          <label htmlFor="">Date Reported</label>
          <div className="viewBoxContent">
              <div>{date.toISOString().substring(0,10)}</div>
              <div>{date.toISOString().substring(11,19)}</div></div>
              </div>
          </div>
        <div className="col-3">
          <div className="form-group"><label htmlFor="">Branch/Department</label><div className="viewBoxContent">{authState?.userData?.data?.data?.department}</div></div>
        </div>
        <div className="col-2">
          <div className="form-group"><label htmlFor="">Region</label><div className="viewBoxContent">{authState?.userData?.data?.data?.region}</div></div>
        </div>
        <div className="col-3">
          <div className="form-group"><label htmlFor="">Reporting Period</label><div className="viewBoxContent">{reportingPeriod}</div></div>
        </div>
      </div>
    </div>
    <div className="pageCard">
      <Box pt={2}>
        <BaseStepper activeStep={activeStep} steps={steps} />
      </Box>

      {/* <Divider sx={{ mt: 2 }} /> */}

      <Box>
        <FormProvider {...formProps}>
          <form onSubmit={handleSubmit(_handleSubmit)}>
            {_renderStepContent(activeStep, allData, refNo,kriReportId,metricIds)}
            <ButtonStepper
              steps={metricIds}
              activeStep={activeStep}
              onClickBack={_handleBack}
              loading={false}
            />
             {/* <Button variant="contained">Submit</Button> */}
          </form>
        </FormProvider>
      </Box>
      {/* {control && <DevTool control={control} />} */}
      </div>
    </>
  );
}

export default FormRegistration;
