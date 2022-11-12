import { Button } from "@mui/material";
import { THEME_MODE } from "src/constants";
import { useSelector } from "react-redux";

export default function CustomButton({
  children,
  onClick,
  disabled,
  borderRadius,
  fullWidth,
  id = undefined,
  ...props
}) {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);

  return (
    <Button
      id={id}
      disabled={disabled}
      onClick={onClick}
      variant="contained"
      fullWidth={fullWidth}
      sx={{
        borderRadius: !borderRadius ? "5px" : borderRadius,
        background: themeMode === THEME_MODE.DARK ? "#D8D8D8" : "#353535",
        "&:hover": {
          background: themeMode === THEME_MODE.DARK ? "#D8D8D8" : "#353535",
        },
        ...props,
      }}
    >
      {children}
    </Button>
  );
}
