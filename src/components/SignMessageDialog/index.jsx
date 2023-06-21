import { Dialog, Box, useMediaQuery, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import CustomTypography from "../CustomTypography";
import { formatAddress } from "src/utility";
import { SCREEN_SIZE } from "src/constants";
import CustomButton from "../CustomButton";

export default function SignMessageDialog({
  open,
  onClose,
  handler,
  loading,
  setClick,
}) {
  const identity = useSelector((state) => state.identitySlice.identity);
  const challenge = useSelector((state) => state.proofSlice.challenge);
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
      <CustomTypography variant="h5" mb={2}>
        Điều kiện xác thực
      </CustomTypography>
      {identity !== undefined && (
        <Box width="100%">
          <CustomTypography>
            <strong>{challenge?.merchantName}</strong> yêu cầu bạn phải đủ{" "}
            {challenge?.minAge} tuổi trở lên{" "}
            {challenge?.maxAge === ""
              ? ""
              : `và không quá ${challenge?.maxAge} tuổi`}{" "}
            để có thể sử dụng dịch vụ của họ
          </CustomTypography>
        </Box>
      )}
      <Box
        sx={{
          mt: 2,
          mb: 2,
          background: "rgba(53, 53, 53, 0.3)",
          borderRadius: "20px",
        }}
        width="100%"
        height="2px"
      />
      <Box
        width="100%"
        display="flex"
        flexDirection={mobile ? "column" : "row"}
        justifyContent={mobile ? undefined : "space-between"}
        alignItems="center"
      >
        <CustomTypography mb={2}>
          Điều kiện được tạo lúc{" "}
          {new Date(Number(challenge?.createdAt)).toLocaleString()}
        </CustomTypography>
        <CustomButton
          minWidth={!mobile ? "150px" : undefined}
          fullWidth={mobile}
          onClick={() => {
            handler();
            setClick(true);
          }}
        >
          {loading === false && (
            <CustomTypography buttonText={true}>
              Bắt đầu xác thực
            </CustomTypography>
          )}
          {loading === true && (
            <CircularProgress
              disableShrink
              sx={{
                color: "white",
              }}
            />
          )}
        </CustomButton>
      </Box>
    </Dialog>
  );
}
