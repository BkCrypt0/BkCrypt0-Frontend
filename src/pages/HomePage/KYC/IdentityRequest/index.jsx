import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestIdentity } from "src/redux/identitySlice";
import CustomButton from "src/components/CustomButton";
import CustomTypography from "src/components/CustomTypography";
import IdentityCard from "src/components/IdentityCard";
import { FS } from "src/constants";
import { changeDateFormat } from "src/service/utils";

function IdentityRequest({ activeStep, setActiveStep, setStart }) {
  const identity = useSelector((state) => state.identitySlice.identity);
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  const publicKey = accounts[activeAccount]?.publicKey;
  const privateKey = accounts[activeAccount]?.privateKey;
  const requestingIdentityStatus = useSelector(
    (state) => state.identitySlice.requestingIdentityStatus
  );
  console.log(requestingIdentityStatus);

  const dp = useDispatch();

  console.log(identity);

  const extractedData = {
    CCCD: identity?.CCCD,
    Tên: identity?.name,
    "Giới tính": identity?.sex,
    "Ngày sinh": identity?.dob,
    "Quê quán": identity?.birthPlace,
  };

  useEffect(() => {
    if (requestingIdentityStatus === FS.SUCCESS) setActiveStep(3);
  }, [requestingIdentityStatus]);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: activeStep === 2 ? "flex" : "none",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IdentityCard data={extractedData} />
        <CustomButton
          marginTop="23px"
          onClick={() => {
            dp(
              requestIdentity(
                publicKey,
                privateKey,
                identity.name,
                identity.CCCD,
                identity.sex,
                identity.sexID,
                changeDateFormat(identity.dob),
                identity.birthPlace,
                identity.birthPlaceID
              )
            );
          }}
        >
          Gửi yêu cầu định danh
        </CustomButton>
      </Box>
      {activeStep === 3 && (
        <Box
          width="100%"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CustomTypography variant="h5">
            Gửi yêu cầu định danh thành công!
          </CustomTypography>
          <CustomButton marginTop={3} onClick={() => setStart(false)}>
            Quay về trang chủ
          </CustomButton>
        </Box>
      )}
    </>
  );
}

export default IdentityRequest;
