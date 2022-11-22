import { Box, IconButton } from "@mui/material";
import CustomTypography from "src/components/CustomTypography";
import CustomButton from "src/components/CustomButton";
import { NavLink } from "react-router-dom";
import CustomForm from "src/components/CustomForm";
import { formatAddress } from "src/utility";
import { THEME_MODE } from "src/constants";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import {
  changeName,
  constructAccountsArrayFromLocalStorage,
} from "src/redux/accountSlice";
import ChangeAccountDialog from "src/components/ChangeAccountDialog";
import CopyToClipboardButton from "src/components/CopyToClipboardButton";
import { login } from "src/redux/accountSlice";

const { verify } = require("password-hash");

export default function AccountExisted() {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  const [input, setInput] = useState(undefined);
  const [edit, setEdit] = useState(false);
  const [copy, setCopy] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dp = useDispatch();

  useEffect(() => {
    dp(constructAccountsArrayFromLocalStorage());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ChangeAccountDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        setOpen={setOpenDialog}
      />
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <CustomTypography variant="h4" mb={2.5} mt={4} fontWeight="bold">
          Hello
        </CustomTypography>
        <Box display="flex" alignItems="center" mb={2}>
          {edit === false && (
            <CustomTypography variant="h5" fontWeight="bold">
              {accounts[activeAccount]?.name}
            </CustomTypography>
          )}
          {edit === true && (
            <CustomForm
              id="change-name"
              onSubmit={(e) => {
                dp(
                  changeName(
                    activeAccount,
                    document.getElementById("change-name").value
                  )
                );
                e.preventDefault();
                setEdit(false);
              }}
              placeHolder={"New name..."}
              defaultValue={accounts[activeAccount]?.name}
            />
          )}
          <IconButton onClick={() => setEdit(true)}>
            <DriveFileRenameOutlineIcon
              ml={2}
              sx={{
                color:
                  themeMode === THEME_MODE.DARK
                    ? "rgba(216, 216, 216, 0.6)"
                    : "rgba(53, 53, 53, 0.6)",
              }}
            />
          </IconButton>
        </Box>
        <Box display="flex" alignItems="center" mb={5}>
          <Box
            onClick={() => setOpenDialog(true)}
            sx={{
              cursor: "pointer",
            }}
          >
            <CustomTypography variant="h5">
              {formatAddress(accounts[activeAccount]?.publicKey, 10)}
            </CustomTypography>
          </Box>
          <CopyToClipboardButton
            title="Copy"
            setCopy={setCopy}
            copy={copy}
            targetText={accounts[activeAccount]?.publicKey}
          />
        </Box>

        <CustomForm
          targetButtonId="login_button"
          type="password"
          id="inputpasswd"
          placeHolder={"Enter password..."}
          onChange={() =>
            setInput(document.getElementById("inputpasswd").value)
          }
        />
        <Box mb={1} />
        <NavLink
          to={
            verify(input, accounts[activeAccount]?.password)
              ? "/home/identity"
              : "/login"
          }
          style={{ textDecoration: "none", width: "100%" }}
        >
          <CustomButton
            id={"login_button"}
            fullWidth={true}
            minHeight="50px"
            mb={2}
            onClick={() => {
              if (verify(input, accounts[activeAccount]?.password)) {
                enqueueSnackbar("Login successfully!", {
                  variant: "success",
                  dense: "true",
                  preventDuplicate: true,
                  autoHideDuration: 2000,
                });

                dp(login(accounts[activeAccount].publicKey));
              } else
                enqueueSnackbar("Wrong password!", {
                  variant: "error",
                  dense: "true",
                  preventDuplicate: true,
                  autoHideDuration: 2000,
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
        <NavLink
          to="/register"
          style={{ width: "100%", textDecoration: "none" }}
        >
          <CustomButton fullWidth={true} minHeight="50px" mb={3}>
            <CustomTypography buttonText>Create a new account</CustomTypography>
          </CustomButton>
        </NavLink>
      </Box>
    </>
  );
}
