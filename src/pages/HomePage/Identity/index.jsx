import { Box, Button, useMediaQuery, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { saveIdentityToRedux } from "src/redux/identitySlice";
import { THEME_MODE } from "src/constants";
import { SCREEN_SIZE } from "src/constants";
import CustomTypography from "src/components/CustomTypography";
import CustomButton from "src/components/CustomButton";
import CreateIdentity from "./CreateIdentity";
import { useState } from "react";

export default function Identity() {
  const identity = useSelector((state) => state.identitySlice.identity);
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const dp = useDispatch();
  const [clickCreate, setClickCreate] = useState(false);

  return (
    <Box width="100%">
      <CustomTypography variant="h4" mb={3}>
        My Identity
      </CustomTypography>
      <Box
        width="100%"
        sx={{ display: clickCreate === false ? "block" : "none" }}
      >
        <Paper
          sx={{
            background: themeMode === THEME_MODE.LIGHT ? "white" : "#434343",
            width: mobile ? "100%" : tablet ? "90%" : "45%",
            borderRadius: "10px",
            boxShadow: `5px 5px 15px 3px ${
              themeMode === THEME_MODE.DARK
                ? "rgba(0, 0, 0, 0.7)"
                : "rgba(53, 53, 53, 0.4)"
            }`,
            paddingY: 3,
            mb: 3,
          }}
        >
          {identity === undefined && (
            <CustomTypography ml={3}>Undefined</CustomTypography>
          )}
          {identity !== undefined && (
            <Box width="100%" ml={2}>
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
            </Box>
          )}
        </Paper>
        {identity === undefined && (
          <CustomButton
            minHeight="50px"
            minWidth="150px"
            mr={3}
            onClick={() => setClickCreate(true)}
          >
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
      <CreateIdentity
        clickCreate={clickCreate}
        setClickCreate={setClickCreate}
      />
    </Box>
  );
}
