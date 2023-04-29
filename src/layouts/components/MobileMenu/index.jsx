import { Drawer, Box, Button, useTheme } from "@mui/material";
import CustomTypography from "src/components/CustomTypography";
import NavigationButton from "../Sidebar/NavigationButton";
import { useSelector } from "react-redux";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { formatAddress } from "src/utility";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import ChangeAccountDialog from "src/components/ChangeAccountDialog";
import { constructAccountsArrayFromLocalStorage } from "src/redux/accountSlice";

export default function MobileMenu({ open, setOpen }) {
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    constructAccountsArrayFromLocalStorage();
  }, []);

  const role = accounts[activeAccount]?.role;

  return (
    <>
      <ChangeAccountDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        setOpen={setOpenDialog}
      />
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 240,
            background: "white",
            top: 55,
          },
        }}
      >
        <Box
          width="90%"
          display="flex"
          flexDirection="column"
          justifyContent="space-evenly"
          alignItems="center"
          mt={5}
        >
          <AccountCircleOutlinedIcon
            fontSize="large"
            sx={{
              color: theme.colors.dark_3,
              mb: 1,
            }}
          />
          <CustomTypography variant="h5">
            {accounts[activeAccount]?.name}
          </CustomTypography>
          <Box
            onClick={() => {
              setOpenDialog(true);
            }}
            sx={{ pointer: "cursor" }}
          >
            <CustomTypography>
              {formatAddress(accounts[activeAccount]?.publicKey, 10)}
            </CustomTypography>
          </Box>
        </Box>
        <Box
          mt={3}
          mb={2}
          sx={{
            background: "rgba(53, 53, 53, 0.3)",
            borderRadius: "5px",
          }}
          width="90%"
          height="2px"
        />
        <Box
          mt={2}
          component="nav"
          aria-label="sidebar navigation"
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="90%"
        >
          <NavigationButton label="Tài khoản của tôi" link="/home/my-account" />
          {role === "user" && (
            <NavigationButton label="CCCD của tôi" link="/home/identity" />
          )}
          {role === "admin" && (
            <NavigationButton
              label="Identity Manager"
              link="/home/identity-manager"
            />
          )}
          {role === "user" && (
            <NavigationButton label="Bằng chứng của tôi" link="/home/proofs" />
          )}
          {role === "user" && (
            <NavigationButton
              label="Tạo bằng chứng"
              link="/home/proof-creation"
            />
          )}
          {role === "user" && (
            <NavigationButton label="Test Proofs" link="/home/proof-test" />
          )}
        </Box>
        <Box
          mt={2}
          mb={1}
          sx={{
            background: "rgba(53, 53, 53, 0.3)",
            borderRadius: "5px",
          }}
          width="90%"
          height="2px"
        />
        <NavLink
          to="/login"
          style={{
            width: "100%",
            textDecoration: "none",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box width="90%" display="flex" justifyContent="center">
            <Button
              variant="outlined"
              fullWidth
              disableRipple
              disableTouchRipple
              disableFocusRipple
              sx={{
                mt: 3,
                borderColor: theme.colors.dark_3,
                borderWidth: "2.5px",
              }}
            >
              <CustomTypography>Đăng xuất</CustomTypography>
            </Button>
          </Box>
        </NavLink>
      </Drawer>
    </>
  );
}
