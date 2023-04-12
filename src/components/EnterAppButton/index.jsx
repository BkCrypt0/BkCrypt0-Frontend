import { NavLink } from "react-router-dom";
import CustomTypography from "../CustomTypography";
import CustomButton from "../CustomButton";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material";

export default function EnterAppButton() {
  const theme = useTheme();
  const isLogin = useSelector((state) => state.accountSlice.isLogin);
  const role = useSelector((state) => state.accountSlice.cachedRoleBuffer);
  const targetRoute = !isLogin
    ? "/login"
    : role === "user"
    ? "/home/identity"
    : "/home/identity-manager";

  return (
    <NavLink to={targetRoute} style={{ textDecoration: "none" }}>
      <CustomButton
        borderRadius="5px"
        background={theme.colors.dark_2}
        height="50px"
        minWidth="250px"
      >
        <CustomTypography letterSpacing="2px" buttonText>
          TRUY CẬP ỨNG DỤNG
        </CustomTypography>
      </CustomButton>
    </NavLink>
  );
}
