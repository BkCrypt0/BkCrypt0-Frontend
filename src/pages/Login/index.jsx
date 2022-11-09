import { Box, useMediaQuery } from "@mui/material";
import { SCREEN_SIZE, LS } from "src/constants";
import CustomTypography from "src/components/CustomTypography";
import CustomButton from "src/components/CustomButton";
import { NavLink } from "react-router-dom";
import CustomForm from "src/components/CustomForm";
import { formatAddress } from "src/utility";
import { THEME_MODE } from "src/constants";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Login() {
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const publicKey = localStorage.getItem(LS.PUBLIC_KEY);
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const password = localStorage.getItem(LS.PASSWORD);
  const [input, setInput] = useState(undefined);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      alignSelf="center"
      height="100%"
      width="100%"
    >
      <Box
        width={mobile ? "90%" : tablet ? "50%" : "30%"}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        {publicKey === undefined && (
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
            <CustomButton fullWidth={true} minHeight="50px" mb={3}>
              <CustomTypography buttonText>Import Account</CustomTypography>
            </CustomButton>
            <NavLink
              to="/register"
              style={{ width: "100%", textDecoration: "none" }}
            >
              <CustomButton fullWidth={true} minHeight="50px" mb={3}>
                <CustomTypography buttonText>
                  Create a new account
                </CustomTypography>
              </CustomButton>
            </NavLink>
          </Box>
        )}
        {publicKey !== undefined && (
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
              onChange={() =>
                setInput(document.getElementById("inputpasswd").value)
              }
            />
            <Box mb={1} />
            <NavLink
              to={input === password ? "/home/identity" : "/login"}
              style={{ textDecoration: "none", width: "100%" }}
            >
              <CustomButton fullWidth={true} minHeight="50px" mb={2}>
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
            <NavLink
              to="/register"
              style={{ width: "100%", textDecoration: "none" }}
            >
              <CustomButton fullWidth={true} minHeight="50px" mb={3}>
                <CustomTypography buttonText>
                  Create a new account
                </CustomTypography>
              </CustomButton>
            </NavLink>
          </Box>
        )}
      </Box>
    </Box>
  );
}
