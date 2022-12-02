import { Box, useMediaQuery, Paper, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { THEME_MODE, SCREEN_SIZE, INFO_STATUS, FS } from "src/constants";
import CustomTypography from "src/components/CustomTypography";
import CustomButton from "src/components/CustomButton";
import CreateIdentity from "./CreateIdentity";
import { useState, useEffect } from "react";
import { formatAddress } from "src/utility";
import { Redirect } from "react-router-dom";
import ImportIdentityButton from "src/components/CustomButton/ImportIdentityButton";
import { fetchIdentity, claimIdentity } from "src/redux/identitySlice";
import { useSnackbar } from "notistack";

export default function Identity() {
  const identity = useSelector((state) => state.identitySlice.identity);
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const [clickCreate, setClickCreate] = useState(false);
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const identityStatus = useSelector(
    (state) => state.identitySlice.identityStatus
  );
  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  const claimingIdentityStatus = useSelector(
    (state) => state.identitySlice.claimingIdentityStatus
  );
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dp(fetchIdentity(accounts[activeAccount]?.publicKey));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [claimingIdentityStatus]);

  useEffect(() => {
    if (claimingIdentityStatus === FS.SUCCESS) {
      enqueueSnackbar("Claim identity successfully!", {
        variant: "success",
        dense: "true",
        preventDuplicate: true,
        autoHideDuration: 2500,
      });
    } else if (claimingIdentityStatus === FS.FAILED) {
      enqueueSnackbar("Claim identity failed! Please try again!", {
        variant: "error",
        dense: "true",
        preventDuplicate: true,
        autoHideDuration: 2500,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [claimingIdentityStatus]);
  const role = accounts[activeAccount]?.role;

  return (
    <>
      {role === "admin" && <Redirect to="/home/identity-manager" />}
      <Box width="100%">
        <CustomTypography variant="h4" mb={3}>
          My Identity
        </CustomTypography>
        <Box
          width="100%"
          sx={{ display: clickCreate === false ? "block" : "none" }}
        >
          <Paper
            sx={{
              background: themeMode === THEME_MODE.LIGHT ? "white" : "#434343",
              width: mobile ? "100%" : tablet ? "90%" : "50%",
              borderRadius: "10px",
              boxShadow: `5px 5px 15px 3px ${
                themeMode === THEME_MODE.DARK
                  ? "rgba(0, 0, 0, 0.7)"
                  : "rgba(53, 53, 53, 0.4)"
              }`,
              paddingY: 3,
              mb: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {identity === undefined && (
              <CustomTypography ml={3} variant="h5">
                Undefined
              </CustomTypography>
            )}
            {identity !== undefined && (
              <Box width="93%">
                <Box display="flex" alignItems="baseline">
                  <CustomTypography variant="h6" fontWeight="bold" mr={1}>
                    Public Key:{" "}
                  </CustomTypography>
                  <CustomTypography variant="h6" mr={1}>
                    {formatAddress(identity?.publicKey, 10)}
                  </CustomTypography>
                </Box>
                <Box display="flex" alignItems="baseline">
                  <CustomTypography variant="h6" fontWeight="bold" mr={1}>
                    First name:{" "}
                  </CustomTypography>
                  <CustomTypography variant="h6" mr={1}>
                    {identity?.firstName}
                  </CustomTypography>
                </Box>
                <Box display="flex" alignItems="baseline">
                  <CustomTypography variant="h6" fontWeight="bold" mr={1}>
                    Last name:{" "}
                  </CustomTypography>
                  <CustomTypography variant="h6" mr={1}>
                    {identity?.lastName}
                  </CustomTypography>
                </Box>

                <Box display="flex" alignItems="baseline">
                  <CustomTypography variant="h6" fontWeight="bold" mr={1}>
                    Identity number:{" "}
                  </CustomTypography>
                  <CustomTypography variant="h6" mr={1}>
                    {identity?.CCCD}
                  </CustomTypography>
                </Box>
                <Box display="flex" alignItems="baseline">
                  <CustomTypography variant="h6" fontWeight="bold" mr={1}>
                    Gender:{" "}
                  </CustomTypography>
                  <CustomTypography variant="h6" mr={1}>
                    {identity?.sex === 1 ? "Male" : "Female"}
                  </CustomTypography>
                </Box>
                <Box display="flex" alignItems="baseline">
                  <CustomTypography variant="h6" fontWeight="bold" mr={1}>
                    Date Of Birth:{" "}
                  </CustomTypography>
                  <CustomTypography variant="h6" mr={1}>
                    {identity?.DoBdate?.toString().slice(0, 4) +
                      "/" +
                      identity?.DoBdate?.toString().slice(4, 6) +
                      "/" +
                      identity?.DoBdate?.toString().slice(6)}
                  </CustomTypography>
                </Box>
                <Box display="flex" alignItems="baseline">
                  <CustomTypography variant="h6" fontWeight="bold" mr={1}>
                    Birth Place:{" "}
                  </CustomTypography>
                  <CustomTypography variant="h6" mr={1}>
                    {identity?.BirthPlace}
                  </CustomTypography>
                </Box>
              </Box>
            )}
            <Box
              sx={{
                mt: 2,
                mb: 2,
                background:
                  themeMode === THEME_MODE.DARK
                    ? "rgba(216, 216, 216, 0.3)"
                    : "rgba(53, 53, 53, 0.3)",
                borderRadius: "20px",
              }}
              width="93%"
              height="2px"
            />
            {identity !== undefined && (
              <Box width="93%">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    background: INFO_STATUS[identityStatus]?.color,
                    borderRadius: "10px",
                    textAlign: "center",
                    border: `2px solid ${INFO_STATUS[identityStatus]?.stroke}`,
                  }}
                  paddingY={1}
                >
                  <CustomTypography
                    color={
                      themeMode === THEME_MODE.DARK
                        ? "white"
                        : INFO_STATUS[identityStatus]?.stroke
                    }
                    fontWeight="semi-bold"
                    letterSpacing="1px"
                  >
                    {INFO_STATUS[identityStatus]?.text}
                  </CustomTypography>
                </Box>
              </Box>
            )}
          </Paper>
          <Box
            width="100%"
            display="flex"
            justifyContent={mobile ? "space-between" : "flex-start"}
          >
            {identity === undefined && (
              <CustomButton
                minHeight="50px"
                minWidth={mobile ? undefined : "150px"}
                width={mobile ? "47%" : undefined}
                mr={mobile ? 0 : 3}
                onClick={() => setClickCreate(true)}
              >
                <CustomTypography buttonText>Create Identity</CustomTypography>
              </CustomButton>
            )}
            {identity === undefined && <ImportIdentityButton />}
          </Box>
          {identity !== undefined &&
            identityStatus < 1 &&
            claimingIdentityStatus !== FS.SUCESS && (
              <CustomButton
                minHeight="50px"
                minWidth="150px"
                mr={3}
                onClick={async () => {
                  dp(
                    claimIdentity({
                      publicKey: accounts[activeAccount].publicKey,
                      privateKey: accounts[activeAccount].privateKey,
                      CCCD: identity.CCCD,
                      sex: identity.sex,
                      firstName: identity.firstName,
                      lastName: identity.lastName,
                      DoBdate: identity.DoBdate,
                      BirthPlace: identity.BirthPlace,
                    })
                  );
                }}
              >
                {(claimingIdentityStatus === FS.IDLE ||
                  claimingIdentityStatus === FS.FAILED) && (
                  <CustomTypography buttonText>Claim Identity</CustomTypography>
                )}
                {claimingIdentityStatus === FS.FETCHING && (
                  <CircularProgress disableShrink
                    sx={{
                      color:
                        themeMode === THEME_MODE.LIGHT ? "white" : "#434343",
                    }}
                  />
                )}
              </CustomButton>
            )}
        </Box>
        <CreateIdentity
          clickCreate={clickCreate}
          setClickCreate={setClickCreate}
        />
      </Box>
    </>
  );
}
