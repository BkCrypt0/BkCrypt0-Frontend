import { Box, useMediaQuery, Drawer, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { THEME_MODE } from "src/constants";
import TeamLogo from "src/components/TeamLogo";
import SwitchThemeButton from "src/components/SwitchThemeButton";
import EnterAppButton from "src/components/EnterAppButton";
import { SCREEN_SIZE } from "src/constants";
import { useLocation, NavLink } from "react-router-dom";
import CustomTypography from "src/components/CustomTypography";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect } from "react";
import MobileMenu from "../MobileMenu";
import ChangeAccountDialog from "src/components/ChangeAccountDialog";
import { constructAccountsArrayFromLocalStorage } from "src/redux/accountSlice";

export default function Header() {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const path = useLocation().pathname;
  const dp = useDispatch();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  useEffect(() => {
    dp(constructAccountsArrayFromLocalStorage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ChangeAccountDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClose={() => setOpenDialog(false)}
      />
      <MobileMenu open={openMobileMenu} setOpen={setOpenMobileMenu} />
      <Drawer
        variant="permanent"
        anchor="top"
        PaperProps={{
          sx: {
            boxShadow: `0px 0px 6px 1.5px ${
              themeMode === THEME_MODE.DARK
                ? "rgba(0, 0, 0, 0.5)"
                : "rgba(53, 53, 53, 0.2)"
            }`,
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
            {accounts[activeAccount]?.role === "admin" &&
              path !== "/login" &&
              path !== "/register" &&
              path !== "/import" && (
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
            {path !== "/welcome" &&
              path !== "/login" &&
              path !== "/import" &&
              path !== "/register" &&
              !mobile && (
                <Box
                  onClick={() => {
                    setOpenDialog(true);
                  }}
                  minWidth="100px"
                  sx={{
                    mr: 2,
                    cursor: "pointer",
                    background:
                      themeMode === THEME_MODE.LIGHT ? "#f2f2f2" : "#434343",
                    py: "5px",
                    border:
                      themeMode === THEME_MODE.DARK
                        ? "1px solid rgba(216, 216, 216, 0.4)"
                        : "1px solid rgba(53, 53, 53, 0.4)",
                    borderRadius: "10px",
                  }}
                >
                  <CustomTypography textAlign="center">
                    {accounts[activeAccount]?.name}
                  </CustomTypography>
                </Box>
              )}

            {!(
              mobile &&
              path !== "/welcome" &&
              path !== "/login" &&
              path !== "/import" &&
              path !== "/register"
            ) && <SwitchThemeButton style={{ marginRight: 3 }} />}

            {!mobile && path === "/welcome" && <EnterAppButton />}
            {mobile &&
              path !== "/welcome" &&
              path !== "/login" &&
              path !== "/import" &&
              path !== "/register" && (
                <IconButton
                  sx={{ mr: 1 }}
                  onClick={() => setOpenMobileMenu(true)}
                >
                  <MenuIcon
                    fontSize="large"
                    sx={{
                      color:
                        themeMode === THEME_MODE.LIGHT ? "#353535" : "white",
                    }}
                  />
                </IconButton>
              )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
