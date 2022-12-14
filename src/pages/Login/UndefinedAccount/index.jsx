import { Box, useMediaQuery } from "@mui/material";
import CustomTypography from "src/components/CustomTypography";
import CustomButton from "src/components/CustomButton";
import { NavLink } from "react-router-dom";
import { THEME_MODE, SCREEN_SIZE } from "src/constants";
import { useSelector } from "react-redux";

export default function UndefinedAccount() {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
    >
      <CustomTypography variant={mobile ? "h5" : "h4"} mb={5}>
        Login to BKCrypt0 Platform
      </CustomTypography>
      <NavLink
        to="/import-mnemonic"
        style={{ textDecoration: "none", width: "100%" }}
      >
        <CustomButton fullWidth={true} minHeight="50px" mb={2}>
          <CustomTypography buttonText>Import Mnemonic</CustomTypography>
        </CustomButton>
      </NavLink>
      <NavLink
        to="/import-private-key"
        style={{ textDecoration: "none", width: "100%" }}
      >
        <CustomButton fullWidth={true} minHeight="50px" mb={2}>
          <CustomTypography buttonText>Import Private Key</CustomTypography>
        </CustomButton>
      </NavLink>
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          sx={{
            background:
              themeMode === THEME_MODE.DARK
                ? "rgba(216, 216, 216, 0.3)"
                : "rgba(53, 53, 53, 0.3)",
            borderRadius: "20px",
          }}
          width="45%"
          height="2px"
        />
        <CustomTypography>OR</CustomTypography>
        <Box
          sx={{
            background:
              themeMode === THEME_MODE.DARK
                ? "rgba(216, 216, 216, 0.3)"
                : "rgba(53, 53, 53, 0.3)",
            borderRadius: "20px",
          }}
          width="45%"
          height="2px"
        />
      </Box>
      <Box mb={2} />
      <NavLink to="/register" style={{ width: "100%", textDecoration: "none" }}>
        <CustomButton fullWidth={true} minHeight="50px" mb={3}>
          <CustomTypography buttonText>Create a new account</CustomTypography>
        </CustomButton>
      </NavLink>
    </Box>
  );
}
