import { Drawer, Box } from "@mui/material";
import { Fragment } from "react";
import NavigationButton from "./NavigationButton";
import { THEME_MODE } from "src/constants";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const role = useSelector((state) => state.accountSlice.cachedRoleBuffer);
  return (
    <Fragment>
      <Drawer
        variant="permanent"
        PaperProps={{
          sx: {
            boxShadow: `0px 0px 6px 1.5px ${
              themeMode === THEME_MODE.DARK
                ? "rgba(0, 0, 0, 0.5)"
                : "rgba(53, 53, 53, 0.2)"
            }`,
            background: themeMode === THEME_MODE.DARK ? "#353535" : "white",
            width: 220,
            transition: "width 300ms ease",
            pt: 10,
            height: "calc(100% - 55px)",
          },
        }}
      >
        <Box
          component="nav"
          aria-label="sidebar navigation"
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
          mt={2}
        >
          {role === "user" && (
            <NavigationButton label="MY IDENTITY" link="/home/identity" />
          )}
          {role === "admin" && (
            <NavigationButton
              label="CLAIMS MONITOR"
              link="/home/claims-monitor"
            />
          )}
          {role === "user" && (
            <NavigationButton label="MY PROOFS" link="/home/proofs" />
          )}
          {role === "user" && (
            <NavigationButton
              label="CREATE PROOFS"
              link="/home/proof-creation"
            />
          )}
          {role === "user" && (
            <NavigationButton label="TEST PROOFS" link="/home/proof-test" />
          )}
        </Box>
      </Drawer>
    </Fragment>
  );
}
