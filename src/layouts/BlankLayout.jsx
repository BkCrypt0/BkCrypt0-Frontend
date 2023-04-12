import { Box, styled, useMediaQuery } from "@mui/material";
import Header from "./components/Header/index";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import { THEME_MODE, SCREEN_SIZE } from "src/constants";
import BackgroundDesktop from "src/assets/bg_desktop.png";

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
          backgroundImage: `url(${BackgroundDesktop})`,
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
