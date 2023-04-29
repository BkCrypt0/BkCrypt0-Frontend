import {
  Box,
  Stepper,
  Step,
  StepLabel,
  useMediaQuery,
  styled,
} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CustomTypography from "../CustomTypography";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { SCREEN_SIZE } from "src/constants";

const steps = ["Tạo mật khẩu mới", "Tạo mã gợi nhớ", "Xác nhận mã gợi nhớ"];

export default function CustomStepper({
  activeStep,
  handleBack,
  handleReset,
  handleNext,
}) {
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);

  const CustomConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: "calc(-50% + 16px)",
      right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#353535",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#0DC74C",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "rgba(53, 53, 53, 0.3)",
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));

  const CustomStepIconRoot = styled("div")(({ ownerState }) => ({
    color: "rgba(53, 53, 53, 0.3)",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: "#353535",
    }),
    "& .CustomStepIcon-completedIcon": {
      color: "#0DC74C",
      zIndex: 1,
      fontSize: 25,
    },
    "& .CustomStepIcon-circle": {
      width: 10,
      height: 10,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  }));

  function CustomStepIcon(props) {
    const { active, completed, className } = props;

    return (
      <CustomStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <TaskAltIcon className="CustomStepIcon-completedIcon" />
        ) : (
          <div className="CustomStepIcon-circle" />
        )}
      </CustomStepIconRoot>
    );
  }

  return (
    <Box sx={{ width: mobile ? "100%" : tablet ? "80%" : "50%", mb: 3, mt: 3 }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<CustomConnector />}
      >
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel StepIconComponent={CustomStepIcon}>
                <CustomTypography
                  color={
                    index > activeStep
                      ? "rgba(53, 53, 53, 0.3)"
                      : index < activeStep
                      ? "#0DC74C"
                      : undefined
                  }
                >
                  {label}
                </CustomTypography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
