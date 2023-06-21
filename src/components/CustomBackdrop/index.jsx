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
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <CustomTypography variant="h3" color="white" display="flex">
          {label}
        </CustomTypography>
      </Box>
    </Backdrop>
  );
}
