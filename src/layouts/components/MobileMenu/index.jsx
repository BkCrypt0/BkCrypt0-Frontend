import { Drawer, Box, Button } from "@mui/material";
import CustomTypography from "src/components/CustomTypography";
import NavigationButton from "../Sidebar/NavigationButton";
import { useSelector } from "react-redux";
import { THEME_MODE } from "src/constants";
import SwitchThemeButton from "src/components/SwitchThemeButton";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { formatAddress } from "src/utility";
import { NavLink } from "react-router-dom";

export default function MobileMenu({ open, setOpen }) {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const publicKey = useSelector(
    (state) => state.accountSlice.cachedPublicKeyBuffer
  );
  const role = useSelector((state) => state.accountSlice.cachedRoleBuffer);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        sx: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 240,
          background: themeMode === THEME_MODE.DARK ? "#353535" : "white",
          top: 55,
        },
      }}
    >
      <Box
        width="90%"
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        alignItems="center"
        mt={5}
      >
        <AccountCircleOutlinedIcon
          fontSize="large"
          sx={{
            color: themeMode === THEME_MODE.LIGHT ? "#353535" : "#D8D8D8",
            mb: 1,
          }}
        />
        <CustomTypography variant="h5">Account 1</CustomTypography>
        <CustomTypography>{formatAddress(publicKey, 10)}</CustomTypography>
      </Box>
      <Box
        mt={3}
        mb={2}
        sx={{
          background:
            themeMode === THEME_MODE.DARK
              ? "rgba(216, 216, 216, 0.3)"
              : "rgba(53, 53, 53, 0.3)",
          borderRadius: "20px",
        }}
        width="90%"
        height="2px"
      />
      <Box
        mt={2}
        component="nav"
        aria-label="sidebar navigation"
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="90%"
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
          <NavigationButton label="CREATE PROOFS" link="/home/proof-creation" />
        )}
        {role === "user" && (
          <NavigationButton label="TEST PROOFS" link="/home/proof-test" />
        )}
      </Box>
      <Box
        mt={2}
        mb={1}
        sx={{
          background:
            themeMode === THEME_MODE.DARK
              ? "rgba(216, 216, 216, 0.3)"
              : "rgba(53, 53, 53, 0.3)",
          borderRadius: "20px",
        }}
        width="90%"
        height="2px"
      />
      <Box
        width="90%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <CustomTypography ml={2}>{themeMode} mode</CustomTypography>
        <SwitchThemeButton />
      </Box>
      <NavLink
        to="/login"
        style={{
          width: "100%",
          textDecoration: "none",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box width="90%" display="flex" justifyContent="center">
          <Button
            variant="outlined"
            fullWidth
            disableRipple
            disableTouchRipple
            disableFocusRipple
            sx={{
              mt: 3,
              borderColor:
                themeMode === THEME_MODE.LIGHT ? "#353535" : "#D8D8D8",
              borderWidth: "2.5px",
            }}
          >
            <CustomTypography>LOG OUT</CustomTypography>
          </Button>
        </Box>
      </NavLink>
    </Drawer>
  );
}
