import { Box, useMediaQuery, useTheme } from "@mui/material";
import { SCREEN_SIZE } from "src/constants";
import CustomTypography from "src/components/CustomTypography";
import CustomButton from "src/components/CustomButton";
import { NavLink } from "react-router-dom";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import { useDispatch } from "react-redux";
import CustomForm from "src/components/CustomForm";
import { useState, useEffect } from "react";
import { createNewPassword, generatePairKeys } from "src/redux/accountSlice";

export default function CreatePassword({ setActiveStep, activeStep }) {
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const [password, setPassword] = useState(undefined);
  const [confirmPassword, setConfirmPassword] = useState(undefined);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("Password is required!");
  const dp = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    if (password !== undefined && confirmPassword !== undefined) {
      setError(confirmPassword !== password);
      setErrorText("Mật khẩu không trùng khớp");
    }
  }, [confirmPassword, password]);

  return (
    <Box
      width={mobile ? "90%" : tablet ? "50%" : "30%"}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      sx={{ display: activeStep === 0 ? "block" : "none" }}
    >
      <CustomForm
        label="Nhập mật khẩu"
        type="password"
        id="passwd"
        name="password"
        placeHolder="Mật khẩu..."
        onChange={() => setPassword(document.getElementById("passwd").value)}
        error={error}
        errorText={errorText}
      />
      <Box mb={1} />
      <CustomForm
        targetButtonId="create_password_button"
        label="Xác nhận mật khẩu"
        type="password"
        id="cfpasswd"
        name="confirm password"
        placeHolder="Xác nhận mật khẩu..."
        onChange={() =>
          setConfirmPassword(document.getElementById("cfpasswd").value)
        }
        error={error}
        errorText={errorText}
      />
      <Box mb={1} />
      <CustomButton
        id="create_password_button"
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
            dp(generatePairKeys());
            setActiveStep(1);
          }
        }}
      >
        <CustomTypography buttonText>Tiếp tục</CustomTypography>
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
            color: theme.colors.dark_3,
            mr: 0.5,
          }}
        />
        <CustomTypography>Quay lại trang đăng nhập</CustomTypography>
      </NavLink>
    </Box>
  );
}
