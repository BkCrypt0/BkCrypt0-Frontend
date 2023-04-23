import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CustomTypography from "src/components/CustomTypography";
import { Redirect } from "react-router-dom";
import AgeProof from "./AgeProof";
import ProvinceProof from "./ProvinceProof";
import { fetchIdentity, fetchUserProof } from "src/redux/identitySlice";
import { useEffect } from "react";

export default function ProofCreation() {
  const login = useSelector((state) => state.accountSlice.isLogin);
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  const role = accounts[activeAccount]?.role;
  const identityStatus = useSelector(
    (state) => state.identitySlice.identityStatus
  );
  const proof = useSelector((state) => state.identitySlice.proof);

  const dp = useDispatch();
  useEffect(() => {
    dp(fetchIdentity(accounts[activeAccount]?.publicKey));
    dp(fetchUserProof(accounts[activeAccount]?.publicKey));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {role === "admin" && login !== undefined && (
        <Redirect to="/home/identity-manager" />
      )}
      {role === "admin" && login === undefined && <Redirect to="/login" />}
      <Box>
        <CustomTypography variant="h4" mb="36px">
          Tạo bằng chứng mới
        </CustomTypography>
        {identityStatus === 2 && (
          <>
            <AgeProof proof={proof} />
            <ProvinceProof proof={proof} />
          </>
        )}
        {identityStatus !== 2 && (
          <CustomTypography variant="h5" mb={3}>
            Không thể tạo bằng chứng mới do tài khoản của bạn chưa kích hoạt
            hoặc đã bị vô hiệu hóa
          </CustomTypography>
        )}
      </Box>
    </>
  );
}
