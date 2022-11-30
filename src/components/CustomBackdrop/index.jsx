import { Backdrop, Box } from "@mui/material";
import CustomTypography from "../CustomTypography";

export default function CustomBackdrop({ open, label }) {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 100,

        backdropFilter: "blur(7px)",
      }}
      open={open}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <CustomTypography variant="h3" color="white">
          {label}
        </CustomTypography>
      </Box>
    </Backdrop>
  );
}
