import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { SCREEN_SIZE, FS } from "src/constants";
import CustomTypography from "src/components/CustomTypography";
import CustomButton from "src/components/CustomButton";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { fetchIdentity } from "src/redux/identitySlice";
import { useSnackbar } from "notistack";
import { FaceIDSvg } from "src/logos";
import KYC from "../KYC";
import IdentityCard from "src/components/IdentityCard";

export default function Identity() {
  const [start, setStart] = useState(false);
  const identity = useSelector((state) => state.identitySlice.identity);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const accounts = useSelector((state) => state.accountSlice.accounts);

  const theme = useTheme();
  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  const requestingIdentityStatus = useSelector(
    (state) => state.identitySlice.requestingIdentityStatus
  );

  console.log(requestingIdentityStatus);
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dp(fetchIdentity(accounts[activeAccount]?.publicKey));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestingIdentityStatus]);

  useEffect(() => {
    if (requestingIdentityStatus === FS.SUCCESS) {
      enqueueSnackbar("Xác minh danh tính thành công!", {
        variant: "success",
        dense: "true",
        preventDuplicate: true,
        autoHideDuration: 2500,
      });
    } else if (requestingIdentityStatus === FS.FAILED) {
      enqueueSnackbar("Xác minh danh tính thất bại! Xin hãy thử lại!", {
        variant: "error",
        dense: "true",
        preventDuplicate: true,
        autoHideDuration: 2500,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestingIdentityStatus]);
  const role = accounts[activeAccount]?.role;

  console.log(identity);

  const identityData = {
    CCCD: identity?.CCCD,
    Tên: identity?.name,
    "Giới tính": identity?.sex,
    "Ngày sinh": identity?.dob,
    "Quê quán": identity?.birthPlace,
  };

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
          {identity && !start && (
            <IdentityCard data={identityData} status={identity?.status} />
          )}
          {!identity && !start && (
            <>
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
              <CustomButton onClick={() => setStart(true)}>
                Bắt đầu định danh
              </CustomButton>
            </>
          )}
          {start && <KYC setStart={setStart} />}
        </Box>
      </Box>
    </>
  );
}
