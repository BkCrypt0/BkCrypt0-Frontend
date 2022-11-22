import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import CustomTypography from "src/components/CustomTypography";
import { Redirect } from "react-router-dom";
import AgeProof from "./AgeProof";
import ProvinceProof from "./ProvinceProof";

export default function ProofCreation() {
  const login = useSelector((state) => state.accountSlice.isLogin);
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  const role = accounts[activeAccount]?.role;

  return (
    <>
      {role === "admin" && login !== undefined && (
        <Redirect to="/home/claims-monitor" />
      )}
      {role === "admin" && login === undefined && <Redirect to="/login" />}
      <Box>
        <CustomTypography variant="h4" mb={3}>
          Create a proof
        </CustomTypography>
        <AgeProof />
        <ProvinceProof />
      </Box>
    </>
  );
}
