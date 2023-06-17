import { Box, useTheme, Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CustomButton from "src/components/CustomButton";
import CustomTypography from "src/components/CustomTypography";
function IdentityRequest({ activeStep }) {
  const identity = useSelector((state) => state.identitySlice.identity);
  const theme = useTheme();
  console.log(identity);

  const extractedData = {
    CCCD: identity?.CCCD,
    Tên: identity?.name,
    "Giới tính": identity?.sex,
    "Ngày sinh": identity?.dob,
    "Quê quán": identity?.birthPlace,
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: activeStep === 2 ? "flex" : "none",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid
        container
        spacing={1.5}
        sx={{
          background: theme.colors.light_1,
          border: `2px dashed ${theme.colors.dark_2}`,
          borderRadius: "10px",
          padding: 2,
          maxWidth: "600px",
          margin: 0,
        }}
      >
        {Object.entries(extractedData).map(([key, value]) => (
          <React.Fragment key={key}>
            <Grid item xs={4} sm={4}>
              <CustomTypography fontWeight="bold">{key}:</CustomTypography>
            </Grid>
            <Grid item xs={8} sm={8}>
              <CustomTypography>{value}</CustomTypography>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
      <CustomButton marginTop="23px">Gửi yêu cầu định danh</CustomButton>
    </Box>
  );
}

export default IdentityRequest;
