import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export default function Proofs() {
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  const role = accounts[activeAccount]?.role;
  return (
    <>
      {role === "admin" && <Redirect to="/home/claims-monitor" />}
      <Box>Verification</Box>
    </>
  );
}
