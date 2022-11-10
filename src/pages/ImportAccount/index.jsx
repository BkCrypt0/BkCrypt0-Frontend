import MnemonicInputTable from "src/components/MnemonicInputTable";
import { Box, useMediaQuery } from "@mui/material";
import CustomTypography from "src/components/CustomTypography";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SCREEN_SIZE, THEME_MODE, LS } from "src/constants";
import CustomForm from "src/components/CustomForm";
import CustomButton from "src/components/CustomButton";
import { NavLink } from "react-router-dom";
import { createNewPassword } from "src/redux/accountSlice";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";

export default function ImportAccount() {
  const [display, setDisplay] = useState("none");
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const publicKey = useSelector((state) => state.accountSlice.publicKey);
  const privateKey = useSelector((state) => state.accountSlice.privateKey);

  const [password, setPassword] = useState(undefined);
  const [confirmPassword, setConfirmPassword] = useState(undefined);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("Password is required!");
  const dp = useDispatch();

  useEffect(() => {
    if (password !== undefined && confirmPassword !== undefined) {
      setError(confirmPassword !== password);
      setErrorText("Passwords do not match!");
    }
  }, [confirmPassword, password]);

  return (
    <Box width="100%" display="flex" flexDirection="column" alignItems="center">
      <CustomTypography variant="h5" mb={5} mt={5}>
        {display === "none"
          ? "Import your mnemonic to restore your password"
          : "Enter your new password"}
      </CustomTypography>
      <MnemonicInputTable
        restore={true}
        setDisplay={setDisplay}
        activeStep={display === "none" ? 2 : 1}
      />
      <Box
        width={mobile ? "90%" : tablet ? "50%" : "30%"}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
        sx={{ display: display }}
      >
        <CustomForm
          label="Enter password"
          type="password"
          id="passwd"
          name="password"
          placeHolder="Password..."
          onChange={() => setPassword(document.getElementById("passwd").value)}
          error={error}
          errorText={errorText}
        />
        <Box mb={1} />
        <CustomForm
          label="Confirm password"
          type="password"
          id="cfpasswd"
          name="confirm password"
          placeHolder="Confirm password..."
          onChange={() =>
            setConfirmPassword(document.getElementById("cfpasswd").value)
          }
          error={error}
          errorText={errorText}
        />
        <Box mb={1} />

        <CustomButton
          fullWidth={true}
          minHeight="50px"
          disabled={
            error ||
            password === undefined ||
            confirmPassword === undefined ||
            password === "" ||
            confirmPassword === ""
          }
          onClick={() => {
            if (password === undefined || confirmPassword === undefined) {
              setError(true);
            } else {
              dp(createNewPassword(password));
              localStorage.setItem(LS.PUBLIC_KEY, publicKey);
              localStorage.setItem(LS.PRIVATE_KEY, privateKey);
              localStorage.setItem(LS.PASSWORD, password);
            }
          }}
        >
          <NavLink
            to="/login"
            style={{ width: "100%", textDecoration: "none" }}
          >
            <CustomTypography buttonText>Restore password</CustomTypography>
          </NavLink>
        </CustomButton>
        <Box mb={2} />
        <NavLink
          to="/login"
          style={{
            width: "100%",
            textDecoration: "none",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ArrowBackTwoToneIcon
            sx={{
              color: themeMode === THEME_MODE.DARK ? "white" : "black",
              mr: 0.5,
            }}
          />
          <CustomTypography>Back to login page</CustomTypography>
        </NavLink>
      </Box>
    </Box>
  );
}
