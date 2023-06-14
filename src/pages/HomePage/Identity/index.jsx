import {
  Box,
  useMediaQuery,
  Paper,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { SCREEN_SIZE, INFO_STATUS, FS } from "src/constants";
import CustomTypography from "src/components/CustomTypography";
import CustomButton from "src/components/CustomButton";
import CreateIdentity from "./CreateIdentity";
import { useState, useEffect } from "react";
import { formatAddress } from "src/utility";
import { Redirect } from "react-router-dom";
import ImportIdentityButton from "src/components/CustomButton/ImportIdentityButton";
import { fetchIdentity, claimIdentity } from "src/redux/identitySlice";
import { useSnackbar } from "notistack";
import { FaceIDSvg } from "src/logos";

export default function Identity() {
  const identity = useSelector((state) => state.identitySlice.identity);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const [clickCreate, setClickCreate] = useState(false);
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const identityStatus = useSelector(
    (state) => state.identitySlice.identityStatus
  );
  const theme = useTheme();
  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  const claimingIdentityStatus = useSelector(
    (state) => state.identitySlice.claimingIdentityStatus
  );
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dp(fetchIdentity(accounts[activeAccount]?.publicKey));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [claimingIdentityStatus]);

  useEffect(() => {
    if (claimingIdentityStatus === FS.SUCCESS) {
      enqueueSnackbar("Xác minh danh tính thành công!", {
        variant: "success",
        dense: "true",
        preventDuplicate: true,
        autoHideDuration: 2500,
      });
    } else if (claimingIdentityStatus === FS.FAILED) {
      enqueueSnackbar("Xác minh danh tính thất bại! Xin hãy thử lại!", {
        variant: "error",
        dense: "true",
        preventDuplicate: true,
        autoHideDuration: 2500,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [claimingIdentityStatus]);
  const role = accounts[activeAccount]?.role;

  return (
    <>
      {role === "admin" && <Redirect to="/home/identity-manager" />}
      <Box width="100%">
        <CustomTypography variant="h4" mb="36px">
          Định danh của tôi
        </CustomTypography>
        <Box
          width="100%"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FaceIDSvg
            style={{
              width: "100px",
              height: "auto",
              fill: theme.colors.dark_1,
            }}
          />
          <CustomTypography
            marginBottom="10px"
            textAlign="center"
            variant={mobile ? "subtitle2" : undefined}
          >
            <p>
              Bạn chưa có tài khoản định danh số trên hệ thống.
              <br /> Hãy bắt đầu gửi yêu cầu định danh.
            </p>
          </CustomTypography>
          <CustomButton>Bắt đầu định danh</CustomButton>
        </Box>

        {/* <CustomTypography>
          {" "}
          Hãy bắt đầu gửi yêu cầu định danh đến nhà phát hành
        </CustomTypography> */}
        {/* <Box
          width="100%"
          sx={{ display: clickCreate === false ? "block" : "none" }}
        >
          <Paper
            sx={{
              background: "white",
              width: mobile ? "100%" : tablet ? "90%" : "50%",
              borderRadius: "10px",
              boxShadow: "5px 5px 15px 3px rgba(53, 53, 53, 0.4)",
              paddingY: 3,
              mb: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {identity === undefined && (
              <CustomTypography ml={3} variant="h5">
                Chưa xác định
              </CustomTypography>
            )}
            {identity !== undefined && (
              <Box width="93%">
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
                borderRadius: "5px",
              }}
              width="93%"
              height="2px"
            />
            {identity !== undefined && (
              <Box width="93%">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    background: INFO_STATUS[identityStatus]?.color,
                    borderRadius: "5px",
                    textAlign: "center",
                    border: `2px solid ${INFO_STATUS[identityStatus]?.stroke}`,
                  }}
                  paddingY={1}
                >
                  <CustomTypography
                    color={INFO_STATUS[identityStatus]?.stroke}
                    fontWeight="semi-bold"
                    letterSpacing="1px"
                  >
                    {INFO_STATUS[identityStatus]?.text}
                  </CustomTypography>
                </Box>
              </Box>
            )}
          </Paper>
          <Box
            width="100%"
            display="flex"
            justifyContent={mobile ? "space-between" : "flex-start"}
          >
            {identity === undefined && (
              <CustomButton
                minHeight="50px"
                minWidth={mobile ? undefined : "150px"}
                width={mobile ? "47%" : undefined}
                mr={mobile ? 0 : 3}
                onClick={() => setClickCreate(true)}
              >
                <CustomTypography buttonText>Tạo định danh</CustomTypography>
              </CustomButton>
            )}
            {identity === undefined && <ImportIdentityButton />}
          </Box>
          {identity !== undefined &&
            identityStatus < 1 &&
            claimingIdentityStatus !== FS.SUCESS && (
              <CustomButton
                minHeight="50px"
                minWidth="150px"
                mr={3}
                onClick={async () => {
                  dp(
                    claimIdentity({
                      publicKey: accounts[activeAccount].publicKey,
                      privateKey: accounts[activeAccount].privateKey,
                      CCCD: identity.CCCD,
                      sex: identity.sex,
                      firstName: identity.firstName,
                      lastName: identity.lastName,
                      DoBdate: identity.DoBdate,
                      BirthPlace: identity.BirthPlace,
                    })
                  );
                }}
              >
                {(claimingIdentityStatus === FS.IDLE ||
                  claimingIdentityStatus === FS.FAILED) && (
                  <CustomTypography buttonText>
                    Xác minh danh tính
                  </CustomTypography>
                )}
                {claimingIdentityStatus === FS.FETCHING && (
                  <CircularProgress
                    disableShrink
                    sx={{
                      color: "white",
                    }}
                  />
                )}
              </CustomButton>
            )}
        </Box>
        <CreateIdentity
          clickCreate={clickCreate}
          setClickCreate={setClickCreate}
        /> */}
      </Box>
    </>
  );
}
