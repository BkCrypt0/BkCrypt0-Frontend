import { Dialog, Box, useMediaQuery } from "@mui/material";
import CustomTypography from "../CustomTypography";
import { SCREEN_SIZE } from "src/constants";
import CustomButton from "../CustomButton";
import { useDispatch } from "react-redux";
import { approveIdentity } from "src/redux/adminSlice";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { FS } from "src/constants";

export default function DetailInformationDialog({
  open,
  onClose,
  setOpen,
  information,
}) {
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const dp = useDispatch();
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  const approverKey = accounts[activeAccount]?.publicKey;
  const approvingDataStatus = useSelector(
    (state) => state.adminSlice.approvingDataStatus
  );
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (approvingDataStatus === FS.SUCCESS) {
      enqueueSnackbar("Phê duyệt định danh thành công!", {
        variant: "success",
        dense: "true",
        preventDuplicate: true,
        autoHideDuration: 2500,
      });
      setOpen(false);
    } else if (approvingDataStatus === FS.FAILED) {
      enqueueSnackbar("Phê duyệt định danh thất bại! Xin hãy thử lại!", {
        variant: "error",
        dense: "true",
        preventDuplicate: true,
        autoHideDuration: 2500,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approvingDataStatus]);
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
          borderRadius: "10px",
        },
      }}
    >
      <CustomTypography variant="h5" mb={2}>
        Thông tin chi tiết
      </CustomTypography>
      {information !== undefined && (
        <Box width="100%">
          <Box display="flex" alignItems="baseline">
            <CustomTypography variant="h6" fontWeight="bold" mr={1}>
              Tên:{" "}
            </CustomTypography>
            <CustomTypography variant="h6" mr={1}>
              {information?.name}
            </CustomTypography>
          </Box>
          <Box display="flex" alignItems="baseline">
            <CustomTypography variant="h6" fontWeight="bold" mr={1}>
              Số CCCD:{" "}
            </CustomTypography>
            <CustomTypography variant="h6" mr={1}>
              {information?.CCCD}
            </CustomTypography>
          </Box>
          <Box display="flex" alignItems="baseline">
            <CustomTypography variant="h6" fontWeight="bold" mr={1}>
              Giới tính:{" "}
            </CustomTypography>
            <CustomTypography variant="h6" mr={1}>
              {information?.sexDetail}
            </CustomTypography>
          </Box>
          <Box display="flex" alignItems="baseline">
            <CustomTypography variant="h6" fontWeight="bold" mr={1}>
              Ngày sinh:{" "}
            </CustomTypography>
            <CustomTypography variant="h6" mr={1}>
              {information?.DoBdate}
            </CustomTypography>
          </Box>
          <Box display="flex" alignItems="baseline">
            <CustomTypography variant="h6" fontWeight="bold" mr={1}>
              Nơi sinh:{" "}
            </CustomTypography>
            <CustomTypography variant="h6" mr={1}>
              {information?.BirthPlaceDetail}
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
        justifyContent={mobile ? undefined : "flex-end"}
        alignItems="center"
      >
        <CustomButton
          minWidth={!mobile ? "150px" : undefined}
          fullWidth={mobile}
          onClick={() => {
            dp(
              approveIdentity(
                approverKey,
                information?.requester,
                information?.CCCD
              )
            );
          }}
        >
          <CustomTypography buttonText>Phê duyệt</CustomTypography>
        </CustomButton>
      </Box>
    </Dialog>
  );
}
