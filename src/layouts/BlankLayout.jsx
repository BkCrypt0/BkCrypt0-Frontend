import { Box, styled } from "@mui/material";
import Header from "./components/Header/index";
import { useSelector } from "react-redux";
import { THEME_MODE } from "src/constants";

const MainContentWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(4, 0, 0, 0),
  marginLeft: 0,
  minHeight: "calc(100vh - 87px)",
  transition: "margin-left 300ms ease",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export default function MainLayout(props) {
  const { children } = props;
  const themeMode = useSelector((state) => state.themeSlice.themeMode);

  return (
    <Box
      sx={{ background: themeMode === THEME_MODE.DARK ? "#353535" : "white" }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          pt: { xsm: 7 },
          background: themeMode === THEME_MODE.DARK ? "#353535" : "white",
          height: "100%",
        }}
      >
        <MainContentWrapper>
          {children}
        </MainContentWrapper>
      </Box>
    </Box>
  );
}
