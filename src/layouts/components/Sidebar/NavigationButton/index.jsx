import { Button } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import CustomTypography from "src/components/CustomTypography";
import { useTheme } from "@mui/material";

export default function NavigationButton({ label, link, id }) {
  const path = useLocation().pathname;
  const active = link === path;
  const theme = useTheme();

  const buttonColor = () => {
    if (active) {
      return theme.colors.dark_1;
    } else if (!active) {
      return "transparent";
    }
  };

  const buttonHoverColor = () => {
    if (!active) {
      return theme.colors.light_1;
    } else return "undefined";
  };

  return (
    <NavLink to={link} style={{ textDecoration: "none" }}>
      <Button
        sx={{
          textTransform: "none",
          borderRadius: "4px",
          minHeight: "50px",
          minWidth: "200px",
          mb: 2,
          background: buttonColor(),
          "&:hover": {
            background: !active ? buttonHoverColor() : buttonColor(),
          },
        }}
      >
        <CustomTypography buttonText={active ? "true" : undefined}>
          {label}
        </CustomTypography>
      </Button>
    </NavLink>
  );
}
