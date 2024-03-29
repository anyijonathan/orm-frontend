import React from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Button } from "@mui/material";
import { Container } from "@mui/system";
import { ArrowLeft, ArrowRight } from "../../Icons";
import { Height } from "@mui/icons-material";

type Props = {
  steps: string[];
  activeStep: number;
  onClick?: () => void;
  onClickBack?: () => void;
  loading?: boolean;
};

function ButtonStepper({
  steps,
  activeStep,
  onClick,
  onClickBack,
  loading
}: Props) {
  const isLastStep = activeStep === steps.length;
 
  return (
    <div>
        <div className="pnButtons">
          
            <span >
             {activeStep !== 1 
              && 
              <Button
                type="button"
                color="primary"
                variant="outlined"
                fullWidth
                onClick={onClickBack}
                disabled={activeStep<=1}
              >
                <ArrowLeft />
              </Button>
            }
              </span>
          
          {/* <div className="col-auto">
            <LoadingButton
              type="submit"
              color="primary"
              variant="outlined"
              fullWidth
              onClick={onClick}
              loading={loading}
            >
               "Next"
            </LoadingButton>
          </div> */}
          {/* <div className="col-auto">
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                onClick={onClick}
                disabled={isLastStep}
              >
                Next
              </Button>
              </div> */}
        </div>
    </div>
  );
}

export default ButtonStepper;
