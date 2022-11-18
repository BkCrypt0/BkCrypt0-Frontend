import { Box } from "@mui/material";
import { useState } from "react";
import CustomSteppers from "src/components/CustomStepper";
import CreatePassword from "./CreatePassword";
import CreateMnemonic from "./CreateMnemonic";
import ConfirmMnemonic from "./ConfirmMnemonic";
import RegistrationCompleted from "./RegistrationCompleted";

export default function Register() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };


  return (
    <Box width="100%" display="flex" flexDirection="column" alignItems="center">
      <CustomSteppers
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
        handleReset={handleReset}
      />
      <CreatePassword setActiveStep={setActiveStep} activeStep={activeStep} />
      <CreateMnemonic setActiveStep={setActiveStep} activeStep={activeStep} />
      <ConfirmMnemonic setActiveStep={setActiveStep} activeStep={activeStep} />
      <RegistrationCompleted activeStep={activeStep} />
    </Box>
  );
}
