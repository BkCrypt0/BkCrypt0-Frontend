import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import CustomTypography from "src/components/CustomTypography";
import TestAge from "./TestAge";
import TestProvince from "./TestProvince";
import { SCREEN_SIZE } from "src/constants";

export default function ProofTest() {
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const login = useSelector((state) => state.accountSlice.isLogin);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);

  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  const role = accounts[activeAccount]?.role;
  return (
    <>
      {role === "admin" && login !== undefined && (
        <Redirect to="/home/claims-monitor" />
      )}
      {role === "admin" && login === undefined && <Redirect to="/login" />}
      <Box>
        <CustomTypography variant="h4" mb="36px">
          Kiểm tra bằng chứng của bạn
        </CustomTypography>
        <Box
          width="100%"
          sx={{
            display: "flex",
            flexDirection: mobile ? "column" : "row",
          }}
        >
          <TestAge />
          <TestProvince />
        </Box>
      </Box>
    </>
  );
}
