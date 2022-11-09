import { Box, styled } from "@mui/material";
import { Fragment } from "react";
import Header from "./components/Header/index";
import Sidebar from "./components/Sidebar/index";
import { useSelector } from "react-redux";
import { THEME_MODE } from "src/constants";

const MainContentWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(4, 8, 7, 8),
  marginLeft: 0,
  minHeight: "calc(100vh - 56px)",
  height: "100%",
  transition: "margin-left 300ms ease",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("xs")]: {
    marginLeft: 80,
    padding: theme.spacing(4, 2, 0, 2),
  },
  [theme.breakpoints.up("md")]: {
    marginLeft: 220,
  },
  [theme.breakpoints.up("lg")]: {
    padding: theme.spacing(4, 4, 0, 4),
  },
}));

export default function MainLayout(props) {
  const { children } = props;
  const themeMode = useSelector((state) => state.themeSlice.themeMode);

  return (
    <Fragment>
      <Header />
      <Box
        component="main"
        sx={{
          pt: { xsm: 7 },
          minHeight: { xs: "calc(100vh - 55)", xsm: "100vh" },
          background: themeMode === THEME_MODE.DARK ? "#353535" : "white",
        }}
      >
        <Sidebar />
        <MainContentWrapper>
          <Box sx={{ flexGrow: 1 }}>{children}</Box>
        </MainContentWrapper>
      </Box>
    </Fragment>
  );
}
