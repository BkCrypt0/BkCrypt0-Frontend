import { Box, useMediaQuery, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { THEME_MODE, SCREEN_SIZE } from "src/constants";
import CustomTypography from "src/components/CustomTypography";
import { formatAddress } from "src/utility";
import CopyToClipboardButton from "src/components/CopyToClipboardButton";
import { useState } from "react";

export default function Identity() {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  const role = accounts[activeAccount]?.role;
  const privateKey = accounts[activeAccount]?.privateKey;
  const publicKey = accounts[activeAccount]?.publicKey;
  const [copyPublicKey, setCopyPublicKey] = useState(false);
  const [copyPrivateKey, setCopyPrivateKey] = useState(false);

  return (
    <>
      <Box width="100%">
        <CustomTypography variant="h4" mb={3}>
          My Account
        </CustomTypography>
        <Box width="100%">
          <Paper
            sx={{
              background: themeMode === THEME_MODE.LIGHT ? "white" : "#434343",
              width: mobile ? "100%" : tablet ? "90%" : "50%",
              borderRadius: "4px",
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
            <Box width="93%">
              <Box display="flex" alignItems="baseline">
                <CustomTypography variant="h6" fontWeight="bold" mr={1}>
                  Public Key:{" "}
                </CustomTypography>
                <CustomTypography variant="h6" mr={1}>
                  {formatAddress(publicKey, 10)}
                </CustomTypography>
                <CopyToClipboardButton
                  targetText={publicKey}
                  label="Copy"
                  copy={copyPublicKey}
                  setCopy={setCopyPublicKey}
                />
              </Box>
              <Box display="flex" alignItems="baseline">
                <CustomTypography variant="h6" fontWeight="bold" mr={1}>
                  Private key:{" "}
                </CustomTypography>
                <CustomTypography variant="h6" mr={1}>
                  {formatAddress(privateKey, 10)}
                </CustomTypography>
                <CopyToClipboardButton
                  targetText={privateKey}
                  label="Copy"
                  copy={copyPrivateKey}
                  setCopy={setCopyPrivateKey}
                />
              </Box>
              <Box display="flex" alignItems="baseline">
                <CustomTypography variant="h6" fontWeight="bold" mr={1}>
                  Role:{" "}
                </CustomTypography>
                <CustomTypography variant="h6" mr={1}>
                  {role}
                </CustomTypography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
}
