import { Grid, useTheme, Box } from "@mui/material";
import React from "react";
import CustomTypography from "../CustomTypography";
import { INFO_STATUS } from "src/constants";

function IdentityCard({ data, status = undefined }) {
  const theme = useTheme();
  var label = INFO_STATUS[status]?.text;
  var bgcolor = INFO_STATUS[status]?.color;
  var border = INFO_STATUS[status]?.stroke;
  return (
    <Grid
      container
      spacing={1.5}
      sx={{
        background: theme.colors.lighter,
        border: `2px solid ${theme.colors.dark_2}`,
        borderRadius: "10px",
        padding: 2,
        maxWidth: "600px",
        margin: 0,
      }}
    >
      {Object.entries(data).map(([key, value]) => (
        <React.Fragment key={key}>
          <Grid item xs={4} sm={4}>
            <CustomTypography fontWeight="bold">{key}:</CustomTypography>
          </Grid>
          <Grid item xs={8} sm={8}>
            <CustomTypography>{value}</CustomTypography>
          </Grid>
        </React.Fragment>
      ))}
      {status !== undefined && (
        <Box
          width="100%"
          sx={{
            paddingInline: 0.5,
            paddingBlock: 1,
            background: bgcolor,
            borderRadius: "10px",
            marginTop: 2,
            border: `1px solid ${border}`,
            boxSizing: "border-box",
          }}
        >
          <CustomTypography textAlign="center">{label}</CustomTypography>
        </Box>
      )}
    </Grid>
  );
}

export default IdentityCard;
