import { Box, useMediaQuery } from "@mui/material";
import { SCREEN_SIZE } from "src/constants";
import UndefinedAccount from "./UndefinedAccount";
import AccountExisted from "./AccountExisted";
import { constructAccountsArrayFromLocalStorage } from "src/redux/accountSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Login() {
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const dp = useDispatch();
  console.log(accounts);

  useEffect(() => {
    dp(constructAccountsArrayFromLocalStorage());
  }, []);

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
        {accounts.length === 0 && <UndefinedAccount />}
        {accounts.length > 0 && <AccountExisted />}
      </Box>
    </Box>
  );
}
