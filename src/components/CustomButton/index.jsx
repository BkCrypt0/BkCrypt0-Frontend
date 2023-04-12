import { Button } from "@mui/material";

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
  return (
    <Button
      id={id}
      disabled={disabled}
      onClick={onClick}
      variant="contained"
      fullWidth={fullWidth}
      sx={{
        borderRadius: borderRadius,
        background: background,
        "&:hover": {
          background: background,
        },
        ...props,
      }}
    >
      {children}
    </Button>
  );
}
