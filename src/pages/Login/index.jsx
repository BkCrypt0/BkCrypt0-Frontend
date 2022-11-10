import { Box, useMediaQuery } from "@mui/material";
import { SCREEN_SIZE, LS } from "src/constants";
import UndefinedAccount from "./UndefinedAccount";
import AccountExisted from "./AccountExisted";

export default function Login() {
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const publicKey = localStorage.getItem(LS.PUBLIC_KEY);

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
        {(publicKey === undefined || publicKey === null) && (
          <UndefinedAccount />
        )}
        {publicKey !== undefined && publicKey !== null && <AccountExisted />}
      </Box>
    </Box>
  );
}
