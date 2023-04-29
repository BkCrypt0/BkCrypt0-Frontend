import Age from "./Age";
import Province from "./Province";
import { Box, useMediaQuery } from "@mui/material";
import CustomTypography from "src/components/CustomTypography";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { SCREEN_SIZE } from "src/constants";

export default function Proofs() {
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const login = useSelector((state) => state.accountSlice.isLogin);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);

  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  const role = accounts[activeAccount]?.role;
  const ageProof = useSelector((state) => state.proofSlice.ageProof);
  const provinceProof = useSelector((state) => state.proofSlice.provinceProof);

  return (
    <>
      {role === "admin" && login !== undefined && (
        <Redirect to="/home/identity-manager" />
      )}
      {role === "admin" && login === undefined && <Redirect to="/login" />}
      <Box width="100%">
        <CustomTypography variant="h4" mb={"36px"}>
          Bằng chứng của tôi
        </CustomTypography>
        {ageProof === undefined && (
          <Box
            sx={{
              background: "white",
              width: mobile ? "100%" : tablet ? "90%" : "50%",
              borderRadius: "5px",
              boxShadow: "5px 5px 15px 3px rgba(53, 53, 53, 0.4)",
              paddingY: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CustomTypography variant="h5">
              Chưa có bằng chứng tuổi
            </CustomTypography>
          </Box>
        )}
        {ageProof !== undefined && <Age />}

        <Box
          sx={{
            mt: 4,
            background: "rgba(53, 53, 53, 0.3)",
            borderRadius: "5px",
            width: mobile ? "100%" : tablet ? "90%" : "50%",
            mb: 4,
          }}
          height="2px"
        />
        {provinceProof === undefined && (
          <Box
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
            <CustomTypography variant="h5">
              Chưa có bằng chứng về nơi ở
            </CustomTypography>
          </Box>
        )}
        {provinceProof !== undefined && <Province />}
      </Box>
    </>
  );
}
