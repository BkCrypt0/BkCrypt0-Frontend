import { Box, styled, useMediaQuery } from "@mui/material";
import Header from "./components/Header/index";
import Footer from "./components/Footer";
import { SCREEN_SIZE } from "src/constants";
import BackgroundDesktop from "src/assets/bg_desktop.png";

const BlankContentWrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "100px",
}));

export default function BlankLayout(props) {
  const { children } = props;
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          backgroundImage: `url(${BackgroundDesktop})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: !mobile ? "120% 100%" : "190% 100%",
          backgroundPosition: "top",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <BlankContentWrapper>{children}</BlankContentWrapper>
        <Footer />
      </Box>
    </Box>
  );
}
