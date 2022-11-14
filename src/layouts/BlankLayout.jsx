import { Box, styled, useMediaQuery } from "@mui/material";
import Header from "./components/Header/index";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import { THEME_MODE, SCREEN_SIZE } from "src/constants";
import BackgroundDesktopDark from "src/assets/bg_desktop_dark_v2.png";
import BackgroundDesktopLight from "src/assets/bg_desktop_light_v2.png";

const MainContentWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(4, 0, 0, 0),
  marginLeft: 0,
  minHeight: "calc(100vh - 150px)",
  transition: "margin-left 300ms ease",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export default function MainLayout(props) {
  const { children } = props;
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);

  return (
    <Box
      sx={{ background: themeMode === THEME_MODE.DARK ? "#353535" : "white" }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          pt: { xsm: 7 },
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
        <MainContentWrapper>{children}</MainContentWrapper>
        <Footer />
      </Box>
    </Box>
  );
}
