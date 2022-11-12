import { Drawer, Box } from "@mui/material";
import CustomTypography from "src/components/CustomTypography";
import NavigationButton from "../Sidebar/NavigationButton";
import { useSelector } from "react-redux";
import { THEME_MODE } from "src/constants";
import SwitchThemeButton from "src/components/SwitchThemeButton";

export default function MobileMenu({ open, setOpen }) {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const role = useSelector((state) => state.accountSlice.role);

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
          width: 220,
          background: themeMode === THEME_MODE.DARK ? "#353535" : "white",
          top: 55,
        },
      }}
    >
      <Box
        component="nav"
        aria-label="sidebar navigation"
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="90%"
        mt={6}
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
    </Drawer>
  );
}
