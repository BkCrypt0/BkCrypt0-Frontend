import IdentityCardUploader from "./IdentityCardUploader";
import KYCVue from "./index.vue";
import { applyPureVueInReact } from "veaury";
import { useSelector } from "react-redux";
import { useState } from "react";
import CustomSteppers from "src/components/CustomStepper";
import { Box, useMediaQuery } from "@mui/material";
import { SCREEN_SIZE } from "src/constants";
import IdentityRequest from "./IdentityRequest";

export default function KYC() {
  const KYCConsole = applyPureVueInReact(KYCVue);
  const imageIDBase64 = useSelector(
    (state) => state.imageIDSlice.imageIDBase64
  );
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);

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
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CustomSteppers
        steps={["Tải lên CCCD", "Kiểm tra khuôn mặt", "Gửi yêu cầu định danh"]}
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
        handleReset={handleReset}
      />
      <Box mb={5} />
      <IdentityCardUploader
        setActiveStep={setActiveStep}
        activeStep={activeStep}
      />
      <Box width="100%" position="relative">
        <KYCConsole
          imageIDBase64={imageIDBase64}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          mobile={mobile}
        />
      </Box>
      <IdentityRequest activeStep={activeStep} setActiveStep={setActiveStep} />
    </Box>
  );
}
