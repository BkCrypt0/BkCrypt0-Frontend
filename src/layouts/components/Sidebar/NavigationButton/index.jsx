import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import CustomTypography from "src/components/CustomTypography";
import { THEME_MODE } from "src/constants";

export default function NavigationButton({ label, link, id }) {
  const path = useLocation().pathname;
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const active = link === path;

  const buttonColor = () => {
    if (active && themeMode === THEME_MODE.DARK) {
      return "#ffffff";
    } else if (active && themeMode === THEME_MODE.LIGHT) {
      return "#353535";
    } else if (!active) {
      return "transparent";
    }
  };

  const buttonHoverColor = () => {
    if (!active && themeMode === THEME_MODE.LIGHT) {
      return "#D8D8D8";
    } else if (!active && themeMode === THEME_MODE.DARK) {
      return "#5B5B5B";
    } else return "undefined";
  };

  return (
    <NavLink to={link} style={{ textDecoration: "none" }}>
      <Button
        sx={{
          borderRadius: "0px 10px 0px 10px",
          minHeight: "60px",
          minWidth: "200px",
          mb: 2,
          background: buttonColor(),
          "&:hover": {
            background: !active ? buttonHoverColor() : buttonColor(),
          },
        }}
      >
        <CustomTypography
          buttonText={active ? "true" : undefined}
          fontWeight="bold"
        >
          {label}
        </CustomTypography>
      </Button>
    </NavLink>
  );
}
