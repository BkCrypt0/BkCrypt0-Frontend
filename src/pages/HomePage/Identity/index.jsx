import { Box, Button, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { saveIdentityToRedux } from "src/redux/identitySlice";
import { THEME_MODE } from "src/constants";
import { SCREEN_SIZE } from "src/constants";
import CustomTypography from "src/components/CustomTypography";
import CustomButton from "src/components/CustomButton";

export default function Identity() {
  const identity = useSelector((state) => state.identitySlice.identity);
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const dp = useDispatch();

  return (
    <Box>
      <CustomTypography variant="h4" mb={3}>
        My Identity
      </CustomTypography>
      <Box
        width={mobile ? "100%" : tablet ? "70%" : "50%"}
        sx={{
          borderRadius: "10px",
          border:
            themeMode === THEME_MODE.DARK
              ? "2px solid #D8D8D8"
              : "2px solid #353535",
          padding: 4,
          mb: 3,
        }}
      >
        {identity === undefined && "Undefined"}
        {identity !== undefined && (
          <>
            <Box display="flex" alignItems="baseline">
              <CustomTypography variant="h6" fontWeight="bold" mr={1}>
                Name:{" "}
              </CustomTypography>
              <CustomTypography variant="h6" fontStyle="italic" mr={1}>
                {identity?.name}
              </CustomTypography>
            </Box>
            <Box display="flex" alignItems="baseline">
              <CustomTypography variant="h6" fontWeight="bold" mr={1}>
                Gender:{" "}
              </CustomTypography>
              <CustomTypography variant="h6" fontStyle="italic" mr={1}>
                {identity?.gender}
              </CustomTypography>
            </Box>
            <Box display="flex" alignItems="baseline">
              <CustomTypography variant="h6" fontWeight="bold" mr={1}>
                Date Of Birth:{" "}
              </CustomTypography>
              <CustomTypography variant="h6" fontStyle="italic" mr={1}>
                {identity?.dateOfBirth}
              </CustomTypography>
            </Box>
            <Box display="flex" alignItems="baseline">
              <CustomTypography variant="h6" fontWeight="bold" mr={1}>
                Birth Place:{" "}
              </CustomTypography>
              <CustomTypography variant="h6" fontStyle="italic" mr={1}>
                {identity?.birthPlace}
              </CustomTypography>
            </Box>
          </>
        )}
      </Box>
      {identity === undefined && (
        <CustomButton minHeight="50px" minWidth="150px" mr={3}>
          <CustomTypography buttonText>Create Identity</CustomTypography>
        </CustomButton>
      )}
      {identity === undefined && (
        <CustomButton minHeight="50px" minWidth="150px" mr={3}>
          <CustomTypography buttonText>Import Identity</CustomTypography>
        </CustomButton>
      )}
      {identity !== undefined && (
        <CustomButton minHeight="50px" minWidth="150px" mr={3}>
          <CustomTypography buttonText>Claim Identity</CustomTypography>
        </CustomButton>
      )}
      <Button
        onClick={() => {
          dp(saveIdentityToRedux("minh", "Male", 2001, "Nam Dinh"));
        }}
      >
        CLICK ME
      </Button>
    </Box>
  );
}
