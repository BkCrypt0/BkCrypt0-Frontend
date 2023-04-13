import { NavLink } from "react-router-dom";
import CustomTypography from "../CustomTypography";
import CustomButton from "../CustomButton";
import { useSelector } from "react-redux";

export default function EnterAppButton() {
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
