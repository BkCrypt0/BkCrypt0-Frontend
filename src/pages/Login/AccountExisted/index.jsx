import { Box } from "@mui/material";
import { LS } from "src/constants";
import CustomTypography from "src/components/CustomTypography";
import CustomButton from "src/components/CustomButton";
import { NavLink } from "react-router-dom";
import CustomForm from "src/components/CustomForm";
import { formatAddress } from "src/utility";
import { THEME_MODE } from "src/constants";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useSnackbar } from "notistack";

export default function AccountExisted() {
  const publicKey = localStorage.getItem(LS.PUBLIC_KEY);
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const password = localStorage.getItem(LS.PASSWORD);
  const [input, setInput] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <CustomTypography variant="h4" mb={5} fontWeight="bold">
        Hello
      </CustomTypography>
      <CustomTypography variant="h5" mb={5}>
        {formatAddress(publicKey, 10)}
      </CustomTypography>
      <CustomForm
        type="password"
        id="inputpasswd"
        placeHolder={"Enter password..."}
        onChange={() => setInput(document.getElementById("inputpasswd").value)}
      />
      <Box mb={1} />
      <NavLink
        to={input === password ? "/home/identity" : "/login"}
        style={{ textDecoration: "none", width: "100%" }}
      >
        <CustomButton
          fullWidth={true}
          minHeight="50px"
          mb={2}
          onClick={() => {
            enqueueSnackbar("Login successfully!", {
              variant: "success",
              dense: "true",
            });
          }}
        >
          <CustomTypography buttonText>Login</CustomTypography>
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
