import { Box } from "@mui/material";
import { Fragment } from "react";
import NavigationButton from "./NavigationButton";
import { useSelector } from "react-redux";
import { constructAccountsArrayFromLocalStorage } from "src/redux/accountSlice";
import { useEffect } from "react";

export default function Sidebar() {
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  useEffect(() => {
    constructAccountsArrayFromLocalStorage();
  }, []);

  const role = accounts[activeAccount]?.role;
  return (
    <Fragment>
      <Box
        sx={{
          boxShadow: "0px 0px 6px 1.5px rgba(53, 53, 53, 0.2)",
          background: "white",
          width: 240,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 2,
          position: "fixed",
          height: "100%",
        }}
      >
        <NavigationButton label="Tài khoản của tôi" link="/home/my-account" />
        {role === "user" && (
          <NavigationButton label="CCCD của tôi" link="/home/identity" />
        )}
        {role === "admin" && (
          <NavigationButton
            label="Quản lý CCCD"
            link="/home/identity-manager"
          />
        )}
        {role === "admin" && (
          <NavigationButton
            label="Phát hành CCCD"
            link="/home/issue-identity"
          />
        )}
        {role === "user" && (
          <NavigationButton label="Bằng chứng của tôi" link="/home/proofs" />
        )}
        {role === "user" && (
          <NavigationButton
            label="Tạo bằng chứng mới"
            link="/home/proof-creation"
          />
        )}
        {role === "user" && (
          <NavigationButton
            label="Kiểm tra bằng chứng"
            link="/home/proof-test"
          />
        )}
      </Box>
    </Fragment>
  );
}
