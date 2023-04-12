import { Box, styled, useMediaQuery } from "@mui/material";
import { Fragment } from "react";
import Header from "./components/Header/index";
import Sidebar from "./components/Sidebar/index";
import Footer from "./components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { THEME_MODE, SCREEN_SIZE, LS } from "src/constants";
import BackgroundDesktopDark from "src/assets/bg_desktop_dark.png";
import BackgroundDesktopLight from "src/assets/bg_desktop_light.png";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";
import { changeActiveAccount } from "src/redux/accountSlice";
import BackgroundDesktop from "src/assets/bg_desktop.png";

const MainContentWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(4, 8, 7, 8),
  marginLeft: 220,
  minHeight: "calc(100vh - 87px)",
  transition: "margin-left 300ms ease",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("xs")]: {
    marginLeft: 0,
    padding: theme.spacing(4, 2, 0, 2),
  },
  [theme.breakpoints.up("sm")]: {
    marginLeft: 220,
  },
  [theme.breakpoints.up("lg")]: {
    padding: theme.spacing(4, 4, 0, 4),
  },
}));

export default function MainLayout(props) {
  const { children } = props;
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
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
    <Fragment>
      {(condition() === true || login === undefined) && (
        <Redirect to="/login" />
      )}
      <Header />
      <Box
        component="main"
        sx={{
          pt: { xsm: 7 },
          minHeight: { xs: "calc(100vh - 55)", xsm: "100vh" },
          backgroundImage: `url(${BackgroundDesktop})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: !mobile ? "120% 100%" : "170% 100%",
          backgroundPosition: "top",
        }}
      >
        {!mobile && <Sidebar />}
        <MainContentWrapper>
          <Box sx={{ flexGrow: 1 }}>{children}</Box>
          <Footer />
        </MainContentWrapper>
      </Box>
    </Fragment>
  );
}
