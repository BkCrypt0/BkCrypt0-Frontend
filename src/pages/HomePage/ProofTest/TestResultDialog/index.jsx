import { Dialog, Box, useMediaQuery } from "@mui/material";
import CustomTypography from "src/components/CustomTypography";
import { SCREEN_SIZE } from "src/constants";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import SentimentVerySatisfiedOutlinedIcon from "@mui/icons-material/SentimentVerySatisfiedOutlined";

export default function TestResultDialog({ open, onClose, res }) {
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);

  return (
    <Dialog
      display="flex"
      flexdirection="column"
      alignitems="center"
      open={open}
      onClose={onClose}
      sx={{ backdropFilter: "blur(5px)" }}
      PaperProps={{
        sx: {
          padding: 3,
          background: "white",
          width: mobile ? "99%" : tablet ? "50%" : "40%",
          borderRadius: "5px",
        },
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        {res === true && (
          <SentimentVerySatisfiedOutlinedIcon
            fontSize="large"
            sx={{ width: "100px", height: "100px", mr: 2, color: "#0DC74C" }}
          />
        )}
        {res === false && (
          <SentimentDissatisfiedOutlinedIcon
            fontSize="large"
            sx={{ width: "100px", height: "100px", mr: 2, color: "#FF3C30" }}
          />
        )}
        <Box>
          <CustomTypography variant="h5" mb={1}>
            Kết quả
          </CustomTypography>
          {res === true && (
            <CustomTypography variant="h4" fontWeight="bold" color="#0DC74C">
              Đúng
            </CustomTypography>
          )}
          {res === false && (
            <CustomTypography variant="h4" fontWeight="bold" color="#FF3C30">
              Sai
            </CustomTypography>
          )}
        </Box>
      </Box>
    </Dialog>
  );
}
