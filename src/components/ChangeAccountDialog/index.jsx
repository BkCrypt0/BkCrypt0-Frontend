import { Dialog, Box, useMediaQuery, Tooltip, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CustomTypography from "../CustomTypography";
import { formatAddress } from "src/utility";
import { SCREEN_SIZE } from "src/constants";
import { changeActiveAccount, logout } from "src/redux/accountSlice";
import { clearIdentity } from "src/redux/identitySlice";
import AddIcon from "@mui/icons-material/Add";
import { NavLink } from "react-router-dom";
import { handleClearProof } from "src/redux/proofSlice";

export default function ChangeAccountDialog({ open, onClose, setOpen }) {
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const dp = useDispatch();
  const theme = useTheme();

  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  return (
    <Dialog
      display="flex"
      flexdirection="column"
      alignitems="center"
      open={open}
      onClose={onClose}
      sx={{ backdropFilter: "blur(5px)" }}
      PaperProps={{
        sx: {
          padding: 2,
          background: "white",
          width: mobile ? "99%" : tablet ? "50%" : "20%",
          borderRadius: "5px",
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
            if (activeAccount !== index) {
              dp(logout());
              dp(clearIdentity());
              dp(handleClearProof());
            }
            setOpen(false);
          }}
          sx={{
            borderRadius: "10px",
            "&:hover": {
              background: theme.colors.light_1,
              cursor: "pointer",
            },
          }}
        >
          <Box width="100%" display="flex" alignItems="center">
            <CustomTypography variant="h6" fontWeight="bold">
              {acc.name}
            </CustomTypography>
            {Number(activeAccount) === index && (
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
            {Number(activeAccount) !== index && (
              <Box ml={2} px={1}>
                <CustomTypography
                  variant="subtitle"
                  color={theme.colors.light_3}
                  whiteSpace="nowrap"
                >
                  Chuyển sang tài khoản này
                </CustomTypography>
              </Box>
            )}
          </Box>

          <CustomTypography>
            {formatAddress(acc.publicKey, 15)}
          </CustomTypography>
        </Box>
      ))}
      <Tooltip title="Thêm tài khoản mới" arrow={true}>
        <NavLink to="/login" style={{ textDecoration: "none" }}>
          <Box
            py={2}
            px={2}
            display="flex"
            justifyContent="center"
            sx={{
              borderRadius: "10px",
              "&:hover": {
                background: theme.colors.light_1,
                cursor: "pointer",
              },
            }}
          >
            <AddIcon
              sx={{
                color: theme.colors.dark_3,
              }}
            />
          </Box>
        </NavLink>
      </Tooltip>
    </Dialog>
  );
}
