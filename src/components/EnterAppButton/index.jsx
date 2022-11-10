import { NavLink } from "react-router-dom";
import CustomTypography from "../CustomTypography";
import CustomButton from "../CustomButton";

export default function EnterAppButton() {
  return (
    <NavLink to="/login" style={{ textDecoration: "none" }}>
      <CustomButton
        mr={3}
        borderRadius="10px 0px 10px 0px"
        height="50px"
        width="150px"
      >
        <CustomTypography letterSpacing="2px" buttonText>
          ENTER APP
        </CustomTypography>
      </CustomButton>
    </NavLink>
  );
}
