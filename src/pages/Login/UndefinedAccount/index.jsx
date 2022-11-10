import { Box } from "@mui/material";
import CustomTypography from "src/components/CustomTypography";
import CustomButton from "src/components/CustomButton";
import { NavLink } from "react-router-dom";
import { THEME_MODE } from "src/constants";
import { useSelector } from "react-redux";

export default function UndefinedAccount() {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <CustomTypography variant="h5" mb={5}>
        Login to BKCrypt0 Platform
      </CustomTypography>
      <NavLink to="/import" style={{ textDecoration: "none", width: "100%" }}>
        <CustomButton fullWidth={true} minHeight="50px" mb={2}>
          <CustomTypography buttonText>Import Account</CustomTypography>
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
