import {
  Paper,
  Box,
  useMediaQuery,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import CustomTypography from "src/components/CustomTypography";
import CustomButton from "src/components/CustomButton";
import { useSelector } from "react-redux";
import { THEME_MODE, SCREEN_SIZE } from "src/constants";

export default function StatusTable({
  tableName,
  btn1,
  btn2,
  btn1Handler,
  btn2Handler,
}) {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);

  return (
    <>
      <Box display="flex" justitycontent="space-between" alignItems="center">
        <Box width="50%">
          <CustomTypography variant="h5" textAlign="left" mb={mobile && 2}>
            {tableName}
          </CustomTypography>
        </Box>
        {!mobile && (
          <Box width="50%" display="flex" justifyContent="flex-end" mb={2}>
            <CustomButton minHeight="50px" minWidth="150px" mr={2}>
              <CustomTypography buttonText={true}>{btn1}</CustomTypography>
            </CustomButton>
            <CustomButton minHeight="50px" minWidth="150px">
              <CustomTypography buttonText={true}>{btn2}</CustomTypography>
            </CustomButton>
          </Box>
        )}
      </Box>
      <Paper
        sx={{
          background: themeMode === THEME_MODE.LIGHT ? "white" : "#434343",
          width: "100%",
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <CustomTypography fontWeight="bold">ID Card</CustomTypography>
              </TableCell>
              <TableCell align="left">
                <CustomTypography fontWeight="bold">Issuer</CustomTypography>
              </TableCell>
              <TableCell align="left">
                <CustomTypography fontWeight="bold">Object</CustomTypography>
              </TableCell>
              <TableCell align="left">
                <CustomTypography fontWeight="bold">Issue at</CustomTypography>
              </TableCell>
              <TableCell align="left">
                <CustomTypography fontWeight="bold">Type</CustomTypography>
              </TableCell>
              <TableCell align="left">
                <CustomTypography fontWeight="bold">State</CustomTypography>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </Paper>
      {mobile && (
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          mt={2}
          mb={3}
        >
          <CustomButton minHeight="50px" width="48%">
            <CustomTypography buttonText={true}>{btn1}</CustomTypography>
          </CustomButton>
          <CustomButton minHeight="50px" width="48%">
            <CustomTypography buttonText={true}>{btn2}</CustomTypography>
          </CustomButton>
        </Box>
      )}
    </>
  );
}
