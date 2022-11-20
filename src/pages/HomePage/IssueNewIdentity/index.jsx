import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export default function IssueNewIdentity() {
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  const role = accounts[activeAccount]?.role;
  return (
    <>
      {role === "user" && <Redirect to="/home/identity" />}
      <Box>Hello</Box>
    </>
  );
}
