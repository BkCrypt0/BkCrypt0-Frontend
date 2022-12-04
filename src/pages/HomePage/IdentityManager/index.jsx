import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import CustomTypography from "src/components/CustomTypography";
import StatusTable from "./StatusTable";
import {
  fetchData,
  handlePublishData,
  handleRevokeData,
  handleUnRevokeData,
  handleResetPublishDataStatus,
  handleResetRevokeDataStatus,
  handleResetUnRevokeDataStatus,
  clearSelectedListAndCheckedList,
} from "src/redux/adminSlice";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { handleConnectWallet, handleSwitchChain } from "src/redux/walletSlice";
import { CONTRACT_OWNER_ADDRESS, FS, ID_STATUS } from "src/constants";
import { useSnackbar } from "notistack";
import CustomBackdrop from "src/components/CustomBackdrop";

export default function IdentityManager() {
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const login = useSelector((state) => state.accountSlice.isLogin);
  const fetchingStatus = useSelector(
    (state) => state.adminSlice.fetchingStatus
  );
  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  const role = accounts[activeAccount]?.role;

  const issueList = useSelector((state) => state.adminSlice.issueList);
  const metamaskAccount = useSelector((state) => state.walletSlice.address);
  const publishingDataStatus = useSelector(
    (state) => state.adminSlice.publishingDataStatus
  );
  const revokingDataStatus = useSelector(
    (state) => state.adminSlice.revokingDataStatus
  );
  const unRevokingDataStatus = useSelector(
    (state) => state.adminSlice.unRevokingDataStatus
  );

  const selectedList = useSelector((state) => state.adminSlice.selectedList);
  console.log(selectedList);

  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    handleSwitchChain();
    if (metamaskAccount === undefined && role === "admin")
      dp(handleConnectWallet());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, metamaskAccount]);

  useEffect(() => {
    if (
      publishingDataStatus === FS.IDLE ||
      publishingDataStatus === FS.SUCCESS ||
      revokingDataStatus === FS.IDLE ||
      revokingDataStatus === FS.SUCCESS ||
      unRevokingDataStatus === FS.IDLE ||
      unRevokingDataStatus === FS.SUCCESS
    )
      dp(fetchData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publishingDataStatus, revokingDataStatus, unRevokingDataStatus]);

  useEffect(() => {
    if (publishingDataStatus === FS.SUCCESS) {
      enqueueSnackbar("Publish data successfully", {
        variant: "success",
        dense: "true",
        preventDuplicate: true,
        autoHideDuration: 2000,
      });
    } else if (publishingDataStatus === FS.FAILED) {
      enqueueSnackbar("Publish data failed", {
        variant: "error",
        dense: "true",
        preventDuplicate: true,
        autoHideDuration: 2000,
      });
      dp(handleResetPublishDataStatus());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publishingDataStatus]);

  useEffect(() => {
    if (revokingDataStatus === FS.SUCCESS) {
      enqueueSnackbar("Revoke data successfully", {
        variant: "success",
        dense: "true",
        preventDuplicate: true,
        autoHideDuration: 2000,
      });
    } else if (revokingDataStatus === FS.FAILED) {
      enqueueSnackbar("Revoke data failed", {
        variant: "error",
        dense: "true",
        preventDuplicate: true,
        autoHideDuration: 2000,
      });
      dp(handleResetRevokeDataStatus());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revokingDataStatus]);

  useEffect(() => {
    if (unRevokingDataStatus === FS.SUCCESS) {
      enqueueSnackbar("Unrevoke data successfully", {
        variant: "success",
        dense: "true",
        preventDuplicate: true,
        autoHideDuration: 2000,
      });
    } else if (unRevokingDataStatus === FS.FAILED) {
      enqueueSnackbar("Unrevoke data failed", {
        variant: "error",
        dense: "true",
        preventDuplicate: true,
        autoHideDuration: 2000,
      });
      dp(handleResetUnRevokeDataStatus());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unRevokingDataStatus]);

  const history = useHistory();

  const getIdentityListAndStatusList = () => {
    var temp_1 = [];
    for (let i = 0; i < selectedList.length; i++) {
      var arr_1 = selectedList[i].split("_");
      temp_1.push(arr_1[0]);
    }

    var temp_2 = [];
    for (let i = 0; i < selectedList.length; i++) {
      var arr_2 = selectedList[i].split("_");
      temp_2.push(ID_STATUS[Number(arr_2[1])]);
    }
    return {
      identityList: temp_1,
      statusList: temp_2,
    };
  };

  const { identityList, statusList } = getIdentityListAndStatusList();

  return (
    <>
      <CustomBackdrop
        open={publishingDataStatus === FS.FETCHING}
        label="Publishing data"
      />
      <CustomBackdrop
        open={revokingDataStatus === FS.FETCHING}
        label="Revoking data"
      />
      <CustomBackdrop
        open={unRevokingDataStatus === FS.FETCHING}
        label="Unrevoking data"
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
          tableId="no1"
          tableName="Pending"
          btn1="Publish"
          btn2="New identity"
          data={issueList.filter((e) => e.status < 2)}
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
            } else dp(handlePublishData(metamaskAccount));
          }}
          btn2Handler={() => history.push("/home/issue-identity")}
        />
        <StatusTable
          tableId="no2"
          tableName="Published"
          btn1="UnRevoke"
          btn2="Revoke"
          data={issueList.filter((e) => e.status >= 2)}
          fetchingStatus={fetchingStatus}
          btn1Handler={async () => {
            if (identityList.length === 0) {
              enqueueSnackbar("You must select 1 identity before unrevoke it", {
                variant: "error",
                dense: "true",
                preventDuplicate: true,
                autoHideDuration: 2000,
              });
            } else if (identityList.length > 1) {
              enqueueSnackbar("You can only unrevoke 1 identity at a time", {
                variant: "error",
                dense: "true",
                preventDuplicate: true,
                autoHideDuration: 2000,
              });
              dp(clearSelectedListAndCheckedList());
            } else if (statusList.includes("PUBLISHED")) {
              enqueueSnackbar(
                "You cannot revoke identity with status PUBLISHED",
                {
                  variant: "error",
                  dense: "true",
                  preventDuplicate: true,
                  autoHideDuration: 2000,
                }
              );
              dp(clearSelectedListAndCheckedList());
            } else {
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
              } else {
                dp(handleUnRevokeData(metamaskAccount, identityList));
                dp(clearSelectedListAndCheckedList());
              }
            }
          }}
          btn2Handler={async () => {
            if (identityList.length === 0) {
              enqueueSnackbar("You must select identities before revoke them", {
                variant: "error",
                dense: "true",
                preventDuplicate: true,
                autoHideDuration: 2000,
              });
              dp(clearSelectedListAndCheckedList());
            } else if (statusList.includes("REVOKED")) {
              enqueueSnackbar(
                "You cannot revoke identities with status REVOKED",
                {
                  variant: "error",
                  dense: "true",
                  preventDuplicate: true,
                  autoHideDuration: 2000,
                }
              );
              dp(clearSelectedListAndCheckedList());
            } else {
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
              } else {
                dp(handleRevokeData(metamaskAccount, identityList));
                dp(clearSelectedListAndCheckedList());
              }
            }
          }}
        />
      </Box>
    </>
  );
}
