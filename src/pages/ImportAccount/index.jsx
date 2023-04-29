import MnemonicInputTable from "src/components/MnemonicInputTable";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import CustomTypography from "src/components/CustomTypography";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SCREEN_SIZE, LS } from "src/constants";
import CustomForm from "src/components/CustomForm";
import CustomButton from "src/components/CustomButton";
import { NavLink } from "react-router-dom";
import {
  createNewPassword,
  generateAccount,
  validateMnemonic12Phrases,
  changeActiveAccount,
} from "src/redux/accountSlice";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import store from "src/redux/store";

export default function ImportAccount() {
  const [display, setDisplay] = useState("none");
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
      setErrorText("Mật khẩu không trùng khớp!");
    }
  }, [confirmPassword, password]);

  return (
    <Box width="100%" display="flex" flexDirection="column" alignItems="center">
      <CustomTypography variant="h5" mb={5} mt={5} textAlign="center">
        {display === "none"
          ? "Nhập mã gợi nhớ để khôi phục mật khẩu của bạn"
          : "Nhập mật khẩu mới"}
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
          label="Xác nhận mật khẩu"
          type="password"
          id="cfpasswd"
          name="confirm password"
          placeHolder="Xác nhận mật khẩu..."
          targetButtonId="restore-password"
          onChange={() =>
            setConfirmPassword(document.getElementById("cfpasswd").value)
          }
          error={error}
          errorText={errorText}
        />
        <Box mb={1} />

        <NavLink to="/login" style={{ width: "100%", textDecoration: "none" }}>
          <CustomButton
            fullWidth={true}
            minHeight="50px"
            id="restore-password"
            disabled={
              error ||
              password === undefined ||
              confirmPassword === undefined ||
              password === "" ||
              confirmPassword === ""
            }
            onClick={async () => {
              if (password === undefined || confirmPassword === undefined) {
                setError(true);
              } else {
                dp(createNewPassword(password));
                validateMnemonic12Phrases(
                  store.getState().accountSlice.mnemonic,
                  store.getState().accountSlice.mnemonic,
                  1
                );
                dp(generateAccount());
                if (localStorage.getItem(LS.ACTIVE_ACCOUNT) === null)
                  dp(changeActiveAccount(0));
                else
                  dp(
                    changeActiveAccount(
                      Number(localStorage.getItem(LS.ACTIVE_ACCOUNT)) + 1
                    )
                  );
              }
            }}
          >
            <CustomTypography buttonText>Khôi phục mật khẩu</CustomTypography>
          </CustomButton>
        </NavLink>
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
    </Box>
  );
}
