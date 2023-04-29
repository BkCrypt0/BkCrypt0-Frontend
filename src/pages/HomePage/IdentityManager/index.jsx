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
        label="Đang phát hành CCCD..."
      />
      <CustomBackdrop
        open={revokingDataStatus === FS.FETCHING}
        label="Đang khóa thẻ CCCD..."
      />
      <CustomBackdrop
        open={unRevokingDataStatus === FS.FETCHING}
        label="Đang mở khóa thẻ CCCD..."
      />
      {role === "user" && login !== undefined && (
        <Redirect to="/home/identity" />
      )}
      {role === "admin" && login === undefined && <Redirect to="/login" />}
      <Box width="100%">
        <CustomTypography variant="h4" mb={3}>
          Trình quản lý CCCD
        </CustomTypography>
        <StatusTable
          tableId="no1"
          tableName="Đang chờ"
          btn1="Phát hành tất cả"
          btn2="Tạo CCCD mới"
          data={issueList.filter((e) => e.status < 2)}
          fetchingStatus={fetchingStatus}
          btn1Handler={async () => {
            if (
              metamaskAccount?.toString().toLowerCase() !==
              CONTRACT_OWNER_ADDRESS.toString().toLowerCase()
            ) {
              enqueueSnackbar("Bạn không phải chủ sở hữu của hợp đồng này!", {
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
          tableName="Đã phát hành"
          btn1="Mở khóa CCCD"
          btn2="Khóa CCCD"
          data={issueList.filter((e) => e.status >= 2)}
          fetchingStatus={fetchingStatus}
          btn1Handler={async () => {
            if (identityList.length === 0) {
              enqueueSnackbar("Bạn phải chọn 1 thẻ CCCD trước khi mở khóa nó", {
                variant: "error",
                dense: "true",
                preventDuplicate: true,
                autoHideDuration: 2000,
              });
            } else if (identityList.length > 1) {
              enqueueSnackbar("Bạn chỉ có thể mở khóa 1 thẻ CCCD cùng lúc", {
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
                enqueueSnackbar("Bạn không phải chủ sở hữu của hợp đồng này", {
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
              enqueueSnackbar("Bạn phải chọn thẻ trước khi khóa", {
                variant: "error",
                dense: "true",
                preventDuplicate: true,
                autoHideDuration: 2000,
              });
              dp(clearSelectedListAndCheckedList());
            } else if (statusList.includes("REVOKED")) {
              enqueueSnackbar("Bạn không thể khóa thẻ đã bị khóa rồi", {
                variant: "error",
                dense: "true",
                preventDuplicate: true,
                autoHideDuration: 2000,
              });
              dp(clearSelectedListAndCheckedList());
            } else {
              if (
                metamaskAccount?.toString().toLowerCase() !==
                CONTRACT_OWNER_ADDRESS.toString().toLowerCase()
              ) {
                enqueueSnackbar("Bạn không phải chủ sở hữu của hợp đồng này!", {
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
