import { Box, useMediaQuery, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { THEME_MODE } from "src/constants";
import { SCREEN_SIZE } from "src/constants";
import CustomTypography from "src/components/CustomTypography";
import CustomButton from "src/components/CustomButton";
import CreateIdentity from "./CreateIdentity";
import { useState } from "react";
import { formatAddress } from "src/utility";
import { Redirect } from "react-router-dom";

export default function Identity() {
  const identity = useSelector((state) => state.identitySlice.identity);
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const [clickCreate, setClickCreate] = useState(false);
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  const role = accounts[activeAccount]?.role;

  return (
    <>
      {role === "admin" && <Redirect to="/home/claims-monitor" />}
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
              width: mobile ? "100%" : tablet ? "90%" : "45%",
              borderRadius: "10px",
              boxShadow: `5px 5px 15px 3px ${
                themeMode === THEME_MODE.DARK
                  ? "rgba(0, 0, 0, 0.7)"
                  : "rgba(53, 53, 53, 0.4)"
              }`,
              paddingY: 3,
              mb: 3,
            }}
          >
            {identity === undefined && (
              <CustomTypography ml={3}>Undefined</CustomTypography>
            )}
            {identity !== undefined && (
              <Box width="100%" ml={2}>
                <Box display="flex" alignItems="baseline">
                  <CustomTypography variant="h6" fontWeight="bold" mr={1}>
                    Issuer:{" "}
                  </CustomTypography>
                  <CustomTypography variant="h6" fontStyle="italic" mr={1}>
                    {formatAddress(identity?.issuer, 10)}
                  </CustomTypography>
                </Box>
                <Box display="flex" alignItems="baseline">
                  <CustomTypography variant="h6" fontWeight="bold" mr={1}>
                    First name:{" "}
                  </CustomTypography>
                  <CustomTypography variant="h6" fontStyle="italic" mr={1}>
                    {identity?.firstName}
                  </CustomTypography>
                </Box>
                <Box display="flex" alignItems="baseline">
                  <CustomTypography variant="h6" fontWeight="bold" mr={1}>
                    Last name:{" "}
                  </CustomTypography>
                  <CustomTypography variant="h6" fontStyle="italic" mr={1}>
                    {identity?.lastName}
                  </CustomTypography>
                </Box>

                <Box display="flex" alignItems="baseline">
                  <CustomTypography variant="h6" fontWeight="bold" mr={1}>
                    Identity number:{" "}
                  </CustomTypography>
                  <CustomTypography variant="h6" fontStyle="italic" mr={1}>
                    {identity?.id}
                  </CustomTypography>
                </Box>
                <Box display="flex" alignItems="baseline">
                  <CustomTypography variant="h6" fontWeight="bold" mr={1}>
                    Gender:{" "}
                  </CustomTypography>
                  <CustomTypography variant="h6" fontStyle="italic" mr={1}>
                    {identity?.sex}
                  </CustomTypography>
                </Box>
                <Box display="flex" alignItems="baseline">
                  <CustomTypography variant="h6" fontWeight="bold" mr={1}>
                    Date Of Birth:{" "}
                  </CustomTypography>
                  <CustomTypography variant="h6" fontStyle="italic" mr={1}>
                    {identity?.doB}
                  </CustomTypography>
                </Box>
                <Box display="flex" alignItems="baseline">
                  <CustomTypography variant="h6" fontWeight="bold" mr={1}>
                    Birth Place:{" "}
                  </CustomTypography>
                  <CustomTypography variant="h6" fontStyle="italic" mr={1}>
                    {identity?.poB}
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
            {identity === undefined && (
              <CustomButton
                minHeight="50px"
                minWidth={mobile ? undefined : "150px"}
                width={mobile ? "47%" : undefined}
                mr={mobile ? 0 : 3}
              >
                <CustomTypography buttonText>Import Identity</CustomTypography>
              </CustomButton>
            )}
          </Box>
          {identity !== undefined && (
            <CustomButton minHeight="50px" minWidth="150px" mr={3}>
              <CustomTypography buttonText>Claim Identity</CustomTypography>
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
