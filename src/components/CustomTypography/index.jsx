import { THEME_MODE } from "src/constants";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

export default function CustomTypography({
  variant,
  color,
  children,
  buttonText,
  ...props
}) {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const primaryTextColor =
    themeMode === THEME_MODE.LIGHT ? "#353535" : "#D8D8D8";
  const buttonTextColor = themeMode === THEME_MODE.DARK ? "#353535" : "#D8D8D8";
  return (
    <Typography
      fontFamily="Ubuntu"
      variant={variant}
      sx={{
        color: !color
          ? buttonText
            ? buttonTextColor
            : primaryTextColor
          : color,
        ...props,
      }}
    >
      {children}
    </Typography>
  );
}
