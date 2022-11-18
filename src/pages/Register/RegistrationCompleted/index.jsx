import CustomTypography from "src/components/CustomTypography";
import CustomButton from "src/components/CustomButton";
import { Box, useMediaQuery } from "@mui/material";
import { NavLink } from "react-router-dom";
import { SCREEN_SIZE } from "src/constants";
import { LS } from "src/constants";
import { constructAccountsArrayFromLocalStorage } from "src/redux/accountSlice";
import { useDispatch } from "react-redux";

export default function RegistrationCompleted({ activeStep }) {
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);

  const activeAccount = localStorage.getItem(LS.ACTIVE_ACCOUNT);
  if (activeAccount === null || activeAccount === undefined) {
    localStorage.setItem(LS.ACTIVE_ACCOUNT, 0);
  }

  const dp = useDispatch();

  return (
    <Box
      width={mobile ? "90%" : tablet ? "50%" : "30%"}
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ display: activeStep === 3 ? "block" : "none" }}
      height="100%"
    >
      <CustomTypography
        textAlign="center"
        variant="h4"
        mt={3}
        mb={2}
        fontWeight="bold"
      >
        You are ready!
      </CustomTypography>
      <CustomTypography textAlign="center" variant="h5" mb={3}>
        Let's login to our platform
      </CustomTypography>
      <NavLink to="/login" style={{ textDecoration: "none" }}>
        <CustomButton
          fullWidth={true}
          minHeight="50px"
          onClick={() => dp(constructAccountsArrayFromLocalStorage())}
        >
          <CustomTypography buttonText={true}>
            Go to login page
          </CustomTypography>
        </CustomButton>
      </NavLink>
    </Box>
  );
}
