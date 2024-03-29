import CustomTypography from "src/components/CustomTypography";
import CustomButton from "src/components/CustomButton";
import { Box, useMediaQuery } from "@mui/material";
import { NavLink } from "react-router-dom";
import { SCREEN_SIZE } from "src/constants";
import { constructAccountsArrayFromLocalStorage } from "src/redux/accountSlice";
import { useDispatch } from "react-redux";

export default function RegistrationCompleted({ activeStep }) {
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);

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
        bạn đã sẵn sàng!
      </CustomTypography>
      <CustomTypography textAlign="center" variant="h5" mb={3}>
        Hãy đăng nhập vào hệ thống của chúng tôi
      </CustomTypography>
      <NavLink to="/login" style={{ textDecoration: "none" }}>
        <CustomButton
          fullWidth={true}
          minHeight="50px"
          onClick={() => dp(constructAccountsArrayFromLocalStorage())}
        >
          <CustomTypography buttonText={true}>
            Đi đến trang đăng nhập
          </CustomTypography>
        </CustomButton>
      </NavLink>
    </Box>
  );
}
