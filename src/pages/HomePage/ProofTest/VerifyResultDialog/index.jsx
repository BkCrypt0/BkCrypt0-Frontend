import { Dialog, Box, useMediaQuery, useTheme } from "@mui/material";
import CustomTypography from "src/components/CustomTypography";
import { SCREEN_SIZE } from "src/constants";
import {
  FailAnimation,
  SuccessAnimation,
} from "src/components/ResultStatusAnimation";
import { useSelector } from "react-redux";
export default function VerifyResultDialog({ open, onClose, res }) {
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const challenge = useSelector((state) => state.proofSlice.challenge);
  const theme = useTheme();

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
        flexDirection="column"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        {res === true && <SuccessAnimation />}
        {res === false && <FailAnimation />}
        <Box
          sx={{
            mt: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {res === true && (
            <CustomTypography variant="h5" fontWeight="450" mb={1}>
              Xin chúc mừng!
            </CustomTypography>
          )}
          {res === true && (
            <Box>
              <Box>
                <CustomTypography variant="h6" my={1} textAlign="center">
                  Bạn đủ điều kiện sử dụng dịch vụ của{" "}
                  <span
                    style={{ fontWeight: "bold", color: theme.colors.dark_1 }}
                  >
                    {challenge?.merchantName}
                  </span>
                </CustomTypography>
                <CustomTypography textAlign="center" mb={2} opacity={0.85}>
                  Điều kiện: Đủ {challenge?.minAge} tuổi
                </CustomTypography>
                <CustomTypography textAlign="center" opacity={0.7}>
                  Lời nhắn đến từ{" "}
                  <span
                    style={{ fontWeight: "bold", color: theme.colors.dark_1 }}
                  >
                    {challenge?.merchantName}
                  </span>
                </CustomTypography>
                <CustomTypography
                  textAlign="center"
                  variant="subtitle1"
                  fontStyle="italic"
                  opacity={0.7}
                >
                  "{challenge?.message}"
                </CustomTypography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mt: 3,
                  pt: "24px",
                  borderTop: `2.5px solid ${theme.colors.neutral_gray}`,
                }}
              >
                <CustomTypography>
                  {new Date(challenge?.createdAt).toLocaleDateString()}
                </CustomTypography>
                <CustomTypography
                  fontWeight="bold"
                  mt={0.5}
                  color={theme.colors.dark_2}
                >
                  Zk:Elite
                </CustomTypography>
              </Box>
            </Box>
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
