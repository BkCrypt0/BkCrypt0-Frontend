import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import CustomTypography from "src/components/CustomTypography";
import StatusTable from "./StatusTable";
import { fetchData } from "src/redux/adminSlice";
import { useEffect } from "react";

export default function ClaimsMonitor() {
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const login = useSelector((state) => state.accountSlice.isLogin);
  const fetchingStatus = useSelector(
    (state) => state.adminSlice.fetchingStatus
  );
  const issueList = useSelector((state) => state.adminSlice.issueList);
  const dp = useDispatch();
  console.log(issueList);

  useEffect(() => {
    dp(fetchData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <StatusTable
          tableName="Pending"
          btn1="Publish"
          btn2="New claim"
          data={issueList.filter((e) => e.status === 0)}
          fetchingStatus={fetchingStatus}
        />
        <StatusTable
          tableName="Published"
          btn1="UnRevoke"
          btn2="Revoke"
          data={issueList.filter((e) => e.status === 1)}
          fetchingStatus={fetchingStatus}
        />
      </Box>
    </>
  );
}
