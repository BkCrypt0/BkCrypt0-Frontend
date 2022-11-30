import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import CustomTypography from "src/components/CustomTypography";
import StatusTable from "./StatusTable";
import { fetchData, fetchPublishedData } from "src/redux/adminSlice";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { handleUpdateRootClaim } from "src/redux/adminSlice";
import { handleConnectWallet, handleSwitchChain } from "src/redux/walletSlice";
import { CONTRACT_OWNER_ADDRESS, FS } from "src/constants";
import { useSnackbar } from "notistack";
import CustomBackdrop from "src/components/CustomBackdrop";

export default function IdentityManager() {
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const login = useSelector((state) => state.accountSlice.isLogin);
  const fetchingStatus = useSelector(
    (state) => state.adminSlice.fetchingStatus
  );
  const fetchingPublishedDataStatus = useSelector(
    (state) => state.adminSlice.fetchingPublishedDataStatus
  );
  const issueList = useSelector((state) => state.adminSlice.issueList);
  const publishedData = useSelector((state) => state.adminSlice.publishedData);
  const metamaskAccount = useSelector((state) => state.walletSlice.address);
  const updatingRootClaimStatus = useSelector(
    (state) => state.adminSlice.updatingRootClaimStatus
  );

  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dp(fetchData());
    handleSwitchChain();
    if (publishedData === undefined) dp(fetchPublishedData());
    if (metamaskAccount === undefined) dp(handleConnectWallet());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (updatingRootClaimStatus === FS.SUCCESS) {
      enqueueSnackbar("Update root claim successfully", {
        variant: "success",
        dense: "true",
        preventDuplicate: true,
        autoHideDuration: 2000,
      });
    } else if (updatingRootClaimStatus === FS.FAILED) {
      enqueueSnackbar("Update root claim failed", {
        variant: "error",
        dense: "true",
        preventDuplicate: true,
        autoHideDuration: 2000,
      });
    }
  }, [updatingRootClaimStatus]);

  const history = useHistory();

  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  const role = accounts[activeAccount]?.role;

  return (
    <>
      <CustomBackdrop
        open={updatingRootClaimStatus === FS.FETCHING}
        label="Updating root claim..."
      />
      <CustomBackdrop
        open={fetchingPublishedDataStatus === FS.FETCHING}
        label="Fetching latest data..."
      />
      {role === "user" && login !== undefined && (
        <Redirect to="/home/identity" />
      )}
      {role === "admin" && login === undefined && <Redirect to="/login" />}
      <Box width="100%">
        <CustomTypography variant="h4" mb={3}>
          Identity Manager
        </CustomTypography>
        <StatusTable
          tableName="Pending"
          btn1="Publish"
          btn2="New identity"
          data={issueList.filter((e) => e.status !== 2)}
          fetchingStatus={fetchingStatus}
          btn1Handler={async () => {
            if (
              metamaskAccount?.toString().toLowerCase() !==
              CONTRACT_OWNER_ADDRESS.toString().toLowerCase()
            ) {
              enqueueSnackbar("You are not the owner of the contract!", {
                variant: "error",
                dense: "true",
                preventDuplicate: true,
                autoHideDuration: 2000,
              });
            } else
              dp(
                handleUpdateRootClaim(
                  metamaskAccount,
                  publishedData.proof.pi_a,
                  publishedData.proof.pi_b,
                  publishedData.proof.pi_c,
                  publishedData.publicSignals
                )
              );
          }}
          btn2Handler={() => history.push("/home/issue-identity")}
        />
        <StatusTable
          tableName="Published"
          btn1="UnRevoke"
          btn2="Revoke"
          data={issueList.filter((e) => e.status === 2)}
          fetchingStatus={fetchingStatus}
        />
      </Box>
    </>
  );
}
