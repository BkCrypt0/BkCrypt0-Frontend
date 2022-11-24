import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import CustomTypography from "src/components/CustomTypography";
import StatusTable from "./StatusTable";
export default function ClaimsMonitor() {
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const login = useSelector((state) => state.accountSlice.isLogin);

  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  const role = accounts[activeAccount]?.role;
  return (
    <>
      {role === "user" && login !== undefined && (
        <Redirect to="/home/identity" />
      )}
      {role === "admin" && login === undefined && <Redirect to="/login" />}
      <Box width="100%">
        <CustomTypography variant="h4" mb={3}>
          Claims Monitor
        </CustomTypography>
        <StatusTable tableName="Pending" btn1="Publish" btn2="New claim" />
        <StatusTable tableName="Published" btn1="UnRevoke" btn2="Revoke" />
      </Box>
    </>
  );
}
