import { Box, styled, useMediaQuery } from "@mui/material";
import Header from "./components/Header/index";
import Sidebar from "./components/Sidebar/index";
import Footer from "./components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { SCREEN_SIZE, LS } from "src/constants";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";
import { changeActiveAccount } from "src/redux/accountSlice";
import BackgroundDesktop from "src/assets/bg_desktop.png";

const MainContentWrapper = styled("div")(({ theme }) => ({
  flexGrow: 1,
  [theme.breakpoints.up("xs")]: {
    padding: "18px",
  },
  [theme.breakpoints.up("sm")]: {
    padding: "36px",
    marginLeft: "240px",
  },
  [theme.breakpoints.up("lg")]: {
    padding: "36px",
    marginLeft: "240px",
  },
}));

export default function MainLayout(props) {
  const { children } = props;
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const login = useSelector((state) => state.accountSlice.isLogin);
  const isLogin = login === undefined ? localStorage.getItem(LS.LOGIN) : login;
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const activeAccount = localStorage.getItem(`${LS.ACTIVE_ACCOUNT}`);
  const activeAccountPublicKey = localStorage.getItem(
    `${LS.PUBLIC_KEY} ${Number(activeAccount) + 1}`
  );

  const condition = () => {
    if (accounts[localStorage.getItem(LS.ACTIVE_ACCOUNT)] !== undefined) {
      if (
        isLogin !== accounts[localStorage.getItem(LS.ACTIVE_ACCOUNT)].publicKey
      )
        return true;
      else return false;
    } else if (localStorage.getItem(LS.LOGIN) !== activeAccountPublicKey)
      return true;
    else if (localStorage.getItem(LS.LOGIN) === undefined) return true;
    else return false;
  };

  const dp = useDispatch();
  useEffect(() => {
    dp(changeActiveAccount(Number(localStorage.getItem(LS.ACTIVE_ACCOUNT))));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {(condition() === true || login === undefined) && (
        <Redirect to="/login" />
      )}
      <Header />
      <Box
        sx={{
          backgroundImage: `url(${BackgroundDesktop})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: !mobile ? "120% 100%" : "190% 100%",
          backgroundPosition: "top",
          flexGrow: 1,
          display: "flex",
          position: "relative",
        }}
      >
        {!mobile && <Sidebar />}
        <MainContentWrapper>{children}</MainContentWrapper>
        <Footer />
      </Box>
    </Box>
  );
}
