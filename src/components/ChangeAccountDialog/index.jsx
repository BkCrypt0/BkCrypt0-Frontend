import { Dialog, Box, useMediaQuery } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CustomTypography from "../CustomTypography";
import { formatAddress } from "src/utility";
import { THEME_MODE, SCREEN_SIZE } from "src/constants";
import { changeActiveAccount } from "src/redux/accountSlice";

export default function ChangeAccountDialog({ open, onClose, setOpen }) {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const dp = useDispatch();
  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  return (
    <Dialog
      display="flex"
      flexDirection="column"
      alignItems="center"
      open={open}
      onClose={onClose}
      sx={{ backdropFilter: "blur(5px)" }}
      PaperProps={{
        sx: {
          padding: 2,
          background: themeMode === THEME_MODE.DARK ? "#353535" : "white",
          width: mobile ? "99%" : tablet ? "50%" : "20%",
          borderRadius: "10px",
        },
      }}
    >
      {accounts.map((acc, index) => (
        <Box
          py={2}
          px={2}
          key={index}
          onClick={() => {
            dp(changeActiveAccount(index));
            setOpen(false);
          }}
          sx={{
            borderRadius: "10px",
            "&:hover": {
              background:
                themeMode === THEME_MODE.DARK
                  ? "rgba(216, 216, 216, 0.1)"
                  : "rgba(53, 53, 53, 0.1)",
              cursor: "pointer",
            },
          }}
        >
          <Box width="100%" display="flex" alignItems="center">
            <CustomTypography variant="h6" fontWeight="bold">
              {acc.name}
            </CustomTypography>
            {activeAccount === index && (
              <Box
                ml={2}
                px={1}
                sx={{ border: "1px solid #0DC74C", borderRadius: "30px" }}
              >
                <CustomTypography color="#0DC74C" variant="subtitle">
                  Active
                </CustomTypography>
              </Box>
            )}
            {activeAccount !== index && (
              <Box ml={2} px={1}>
                <CustomTypography
                  variant="subtitle"
                  color={
                    themeMode === THEME_MODE.DARK
                      ? "rgba(216, 216, 216, 0.5)"
                      : "rgba(53, 53, 53, 0.5)"
                  }
                  whiteSpace="nowrap"
                >
                  Switch to this account
                </CustomTypography>
              </Box>
            )}
          </Box>

          <CustomTypography>
            {formatAddress(acc.publicKey, 15)}
          </CustomTypography>
        </Box>
      ))}
    </Dialog>
  );
}
