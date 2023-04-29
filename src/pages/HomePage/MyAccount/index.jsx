import { Box, useMediaQuery, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { SCREEN_SIZE } from "src/constants";
import CustomTypography from "src/components/CustomTypography";
import { formatAddress } from "src/utility";
import CopyToClipboardButton from "src/components/CopyToClipboardButton";
import { useState } from "react";

export default function Identity() {
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
      <Box>
        <CustomTypography variant="h4" mb="36px">
          Tài khoản của tôi
        </CustomTypography>
        <Box width="100%">
          <Paper
            sx={{
              background: "white",
              width: mobile ? "100%" : tablet ? "90%" : "50%",
              borderRadius: "5px",
              boxShadow: "5px 5px 15px 3px rgba(53, 53, 53, 0.4)",
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
                  Khóa công khai:{" "}
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
                  Khóa bí mật:{" "}
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
                  Vai trò:{" "}
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
