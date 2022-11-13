import { Box, styled, useMediaQuery } from "@mui/material";
import { Fragment } from "react";
import Header from "./components/Header/index";
import Sidebar from "./components/Sidebar/index";
import { useSelector } from "react-redux";
import { THEME_MODE, SCREEN_SIZE } from "src/constants";
import BackgroundDesktopDark from "src/assets/bg_desktop_dark.png";
import BackgroundDesktopLight from "src/assets/bg_desktop_light.png";

const MainContentWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(4, 8, 7, 8),
  marginLeft: 220,
  minHeight: "calc(100vh - 56px)",
  height: "100%",
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
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);

  return (
    <Fragment>
      <Header />
      <Box
        component="main"
        sx={{
          pt: { xsm: 7 },
          minHeight: { xs: "calc(100vh - 55)", xsm: "100vh" },
          // background: themeMode === THEME_MODE.DARK ? "#353535" : "white",
          backgroundImage:
            themeMode === THEME_MODE.DARK
              ? `url(${BackgroundDesktopDark})`
              : `url(${BackgroundDesktopLight})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: !mobile ? "120% 100%" : "170% 100%",
          backgroundPosition: "top",
        }}
      >
        {!mobile && <Sidebar />}
        <MainContentWrapper>
          <Box sx={{ flexGrow: 1 }}>{children}</Box>
        </MainContentWrapper>
      </Box>
    </Fragment>
  );
}
