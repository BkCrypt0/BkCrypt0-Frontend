import { Button } from "@mui/material";
import { useTheme } from "@mui/material";

export default function CustomButton({
  children,
  onClick,
  disabled,
  borderRadius = "5px",
  fullWidth,
  id = undefined,
  background,
  ...props
}) {
  const theme = useTheme();

  return (
    <Button
      id={id}
      disabled={disabled}
      onClick={onClick}
      variant="contained"
      fullWidth={fullWidth}
      sx={{
        borderRadius: borderRadius,
        background: !background ? theme.colors.dark_2 : background,
        "&:hover": {
          background: !background ? theme.colors.dark_1 : background,
        },
        ...props,
      }}
    >
      {children}
    </Button>
  );
}
