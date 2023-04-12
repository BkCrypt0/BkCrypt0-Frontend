import { Typography } from "@mui/material";
import { useTheme } from "@mui/material";

export default function CustomTypography({
  variant,
  color,
  children,
  buttonText,
  ...props
}) {
  const theme = useTheme();
  const primaryTextColor = theme.colors.dark_3;
  const buttonTextColor = "white";
  return (
    <Typography
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
