import { Box, useMediaQuery } from "@mui/material";
import CustomTypography from "src/components/CustomTypography";
import CustomButton from "src/components/CustomButton";
import { NavLink } from "react-router-dom";
import { SCREEN_SIZE } from "src/constants";

export default function UndefinedAccount() {
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
    >
      <CustomTypography variant={mobile ? "h5" : "h4"} mb={5}>
        Đăng nhập vào hệ thống Zk:Elite
      </CustomTypography>
      <NavLink
        to="/import-mnemonic"
        style={{ textDecoration: "none", width: "100%" }}
      >
        <CustomButton fullWidth={true} minHeight="50px" mb={2}>
          <CustomTypography buttonText>Nhập mã gợi nhớ</CustomTypography>
        </CustomButton>
      </NavLink>
      <NavLink
        to="/import-private-key"
        style={{ textDecoration: "none", width: "100%" }}
      >
        <CustomButton fullWidth={true} minHeight="50px" mb={2}>
          <CustomTypography buttonText>Nhập khóa bí mật</CustomTypography>
        </CustomButton>
      </NavLink>
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          sx={{
            background: "rgba(53, 53, 53, 0.3)",
            borderRadius: "5px",
          }}
          width="45%"
          height="2px"
        />
        <CustomTypography>Hoặc</CustomTypography>
        <Box
          sx={{
            background: "rgba(53, 53, 53, 0.3)",
            borderRadius: "5px",
          }}
          width="45%"
          height="2px"
        />
      </Box>
      <Box mb={2} />
      <NavLink to="/register" style={{ width: "100%", textDecoration: "none" }}>
        <CustomButton fullWidth={true} minHeight="50px" mb={3}>
          <CustomTypography buttonText>Tạo tài khoản mới</CustomTypography>
        </CustomButton>
      </NavLink>
    </Box>
  );
}
