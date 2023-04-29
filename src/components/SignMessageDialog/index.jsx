import { Dialog, Box, useMediaQuery, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import CustomTypography from "../CustomTypography";
import { formatAddress } from "src/utility";
import { SCREEN_SIZE } from "src/constants";
import ImportIdentityButton from "../CustomButton/ImportIdentityButton";
import CustomButton from "../CustomButton";

export default function SignMessageDialog({
  open,
  onClose,
  handler,
  loading,
  setClick,
}) {
  const identity = useSelector((state) => state.identitySlice.identity);
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
        Ký & tạo bằng chứng
      </CustomTypography>
      {identity === undefined && <ImportIdentityButton />}
      {identity !== undefined && (
        <Box width="100%">
          <Box display="flex" alignItems="baseline">
            <CustomTypography variant="h6" fontWeight="bold" mr={1}>
              Khóa công khai:{" "}
            </CustomTypography>
            <CustomTypography variant="h6" mr={1}>
              {formatAddress(identity?.publicKey, 10)}
            </CustomTypography>
          </Box>
          <Box display="flex" alignItems="baseline">
            <CustomTypography variant="h6" fontWeight="bold" mr={1}>
              Tên:{" "}
            </CustomTypography>
            <CustomTypography variant="h6" mr={1}>
              {identity?.firstName}
            </CustomTypography>
          </Box>
          <Box display="flex" alignItems="baseline">
            <CustomTypography variant="h6" fontWeight="bold" mr={1}>
              Họ:{" "}
            </CustomTypography>
            <CustomTypography variant="h6" mr={1}>
              {identity?.lastName}
            </CustomTypography>
          </Box>

          <Box display="flex" alignItems="baseline">
            <CustomTypography variant="h6" fontWeight="bold" mr={1}>
              Số CCCD:{" "}
            </CustomTypography>
            <CustomTypography variant="h6" mr={1}>
              {identity?.CCCD}
            </CustomTypography>
          </Box>
          <Box display="flex" alignItems="baseline">
            <CustomTypography variant="h6" fontWeight="bold" mr={1}>
              Giới tính:{" "}
            </CustomTypography>
            <CustomTypography variant="h6" mr={1}>
              {identity?.sex === 1 ? "Male" : "Female"}
            </CustomTypography>
          </Box>
          <Box display="flex" alignItems="baseline">
            <CustomTypography variant="h6" fontWeight="bold" mr={1}>
              Ngày sinh:{" "}
            </CustomTypography>
            <CustomTypography variant="h6" mr={1}>
              {identity?.DoBdate?.toString().slice(0, 4) +
                "/" +
                identity?.DoBdate?.toString().slice(4, 6) +
                "/" +
                identity?.DoBdate?.toString().slice(6)}
            </CustomTypography>
          </Box>
          <Box display="flex" alignItems="baseline">
            <CustomTypography variant="h6" fontWeight="bold" mr={1}>
              Nơi sinh:{" "}
            </CustomTypography>
            <CustomTypography variant="h6" mr={1}>
              {identity?.BirthPlace}
            </CustomTypography>
          </Box>
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
          Bằng chứng có hiệu lực trong 10 phút
        </CustomTypography>
        <CustomButton
          minHeight="50px"
          minWidth={!mobile ? "150px" : undefined}
          fullWidth={mobile}
          onClick={() => {
            handler();
            setClick(true);
          }}
        >
          {loading === false && (
            <CustomTypography buttonText={true}>
              Ký & tạo bằng chứng
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
