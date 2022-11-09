import { Box, useMediaQuery, Drawer, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { THEME_MODE } from "src/constants";
import TeamLogo from "src/components/TeamLogo";
import SwitchThemeButton from "src/components/SwitchThemeButton";
import EnterAppButton from "src/components/EnterAppButton";
import { SCREEN_SIZE } from "src/constants";
import { useLocation, NavLink } from "react-router-dom";
import { toggleRole } from "src/redux/accountSlice";
import CustomTypography from "src/components/CustomTypography";

export default function Header() {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const role = useSelector((state) => state.accountSlice.role);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const path = useLocation().pathname;
  const dp = useDispatch();

  return (
    <Drawer
      variant="permanent"
      anchor="top"
      PaperProps={{
        sx: {
          background: themeMode === THEME_MODE.DARK ? "#353535" : "white",
          zIndex: 1205,
          height: "55px",
          paddingTop: 2,
          overflow: "hidden",
        },
      }}
      sx={{ width: "100%", height: 55, maxHeight: 55 }}
    >
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        sx={{ marginTop: -5 }}
      >
        <Box width="100%" display="flex" alignItems="center">
          <NavLink to="/welcome">
            <TeamLogo style={{ width: "222px", height: "auto" }} />
          </NavLink>
          {role === "admin" && (
            <CustomTypography
              variant="subtitle"
              fontWeight="bold"
              ml={-4}
              mt={-3}
            >
              ADMIN
            </CustomTypography>
          )}
        </Box>

        <Box display="flex" alignItems="center">
          <Button
            onClick={() => {
              dp(toggleRole());
            }}
          >
            {role}
          </Button>
          <SwitchThemeButton style={{ marginRight: 3 }} />
          {!mobile && path === "/welcome" && <EnterAppButton />}
        </Box>
      </Box>
    </Drawer>
  );
}
