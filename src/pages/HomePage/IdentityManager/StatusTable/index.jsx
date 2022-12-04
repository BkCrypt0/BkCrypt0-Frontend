import {
  Paper,
  Box,
  useMediaQuery,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Checkbox,
} from "@mui/material";
import CustomTypography from "src/components/CustomTypography";
import CustomButton from "src/components/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { THEME_MODE, SCREEN_SIZE, FS, ID_STATUS } from "src/constants";
import { formatAddress } from "src/utility";
import {
  addToCheckedList,
  addToSelectedList,
  removeFromCheckedList,
  removeFromSelectedList,
} from "src/redux/adminSlice";

const { babyJub } = require("circomlib");
const BigInt = require("big-integer");

export default function StatusTable({
  tableName,
  btn1,
  btn2,
  btn1Handler,
  btn2Handler,
  data,
  fetchingStatus,
  tableId,
}) {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const selectedList = useSelector((state) => state.adminSlice.selectedList);
  const checkedList = useSelector((state) => state.adminSlice.checkedList);
  const revokeLimit = useSelector((state) => state.adminSlice.revokeLimit);
  const dp = useDispatch();

  return (
    <>
      <Box display="flex" justitycontent="space-between" alignItems="center">
        <Box width={mobile ? "100%" : "50%"} display="flex">
          <CustomTypography variant="h5" textAlign="left" mb={mobile && 2}>
            {tableName}
          </CustomTypography>
          {selectedList.length !== 0 && tableId === "no2" && (
            <CustomTypography
              variant="h6"
              textAlign="left"
              mb={mobile && 2}
              ml={1}
            >
              {`(${selectedList.length}/${revokeLimit} selected)`}
            </CustomTypography>
          )}
        </Box>
        {!mobile && (
          <Box width="50%" display="flex" justifyContent="flex-end" mb={2}>
            <CustomButton
              minHeight="50px"
              minWidth="150px"
              mr={2}
              onClick={btn1Handler}
            >
              <CustomTypography buttonText={true}>{btn1}</CustomTypography>
            </CustomButton>
            <CustomButton
              minHeight="50px"
              minWidth="150px"
              onClick={btn2Handler}
            >
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
          paddingBottom: 3,
          mb: 3,
          height: "300px",
          overflow: "auto",
        }}
      >
        <Table>
          <TableHead
            sx={{
              position: "sticky",
              top: 0,
              background:
                themeMode === THEME_MODE.LIGHT ? "#edebeb" : "#333333",
              zIndex: 1000,
            }}
          >
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  maxWidth: "50px",
                  zIndex: 1000,
                  position: "sticky",
                  left: 0,
                  borderBottom: "none",
                  background:
                    themeMode === THEME_MODE.LIGHT ? "#edebeb" : "#333333",
                }}
              ></TableCell>
              <TableCell
                align="center"
                sx={{
                  zIndex: 1000,
                  position: "sticky",
                  left: 0,
                  borderBottom: "none",
                  background:
                    themeMode === THEME_MODE.LIGHT ? "#edebeb" : "#333333",
                }}
              >
                <CustomTypography fontWeight="bold">ID Card</CustomTypography>
              </TableCell>
              <TableCell align="center" sx={{ borderBottom: "none" }}>
                <CustomTypography fontWeight="bold">Issuer</CustomTypography>
              </TableCell>
              <TableCell align="center" sx={{ borderBottom: "none" }}>
                <CustomTypography fontWeight="bold">Issue at</CustomTypography>
              </TableCell>
              <TableCell align="center" sx={{ borderBottom: "none" }}>
                <CustomTypography fontWeight="bold">State</CustomTypography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(data === undefined || data?.length === 0) && (
              <TableRow>
                <TableCell sx={{ borderBottom: "none" }} />
                <TableCell sx={{ borderBottom: "none" }} />
                <TableCell align="center" sx={{ borderBottom: "none" }}>
                  <CustomTypography
                    variant="h5"
                    fontStyle="italic"
                    opacity={0.5}
                    mt={5}
                  >
                    Nothing to display
                  </CustomTypography>
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }} />
                <TableCell sx={{ borderBottom: "none" }} />
              </TableRow>
            )}
            {data !== undefined &&
              data?.length > 0 &&
              data.map((e, index) => (
                <TableRow
                  onClick={() => {
                    if (selectedList.includes(e.CCCD + "_" + e.status)) {
                      dp(removeFromSelectedList(e.CCCD + "_" + e.status));
                      dp(removeFromCheckedList(index));
                    } else if (
                      !selectedList.includes(e.CCCD + "_" + e.status) &&
                      selectedList.length < revokeLimit
                    ) {
                      dp(addToCheckedList(index));
                      dp(addToSelectedList(e.CCCD + "_" + e.status));
                    }
                  }}
                  key={index}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      zIndex: 500,
                      position: "sticky",
                      left: 0,
                      borderBottom: "none",
                      background:
                        themeMode === THEME_MODE.LIGHT ? "white" : "#434343",
                    }}
                  >
                    {tableId === "no2" && (
                      <Checkbox checked={checkedList.includes(index)} />
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      zIndex: 500,
                      position: "sticky",
                      left: 0,
                      borderBottom: "none",
                      background:
                        themeMode === THEME_MODE.LIGHT ? "white" : "#434343",
                    }}
                  >
                    <CustomTypography>{e.CCCD}</CustomTypography>
                  </TableCell>
                  <TableCell align="center" sx={{ borderBottom: "none" }}>
                    <CustomTypography>
                      {formatAddress(
                        e.issuer !== undefined &&
                          babyJub
                            .packPoint(e.issuer.map((pub) => BigInt(pub).value))
                            .toString("hex"),
                        10
                      )}
                    </CustomTypography>
                  </TableCell>
                  <TableCell align="center" sx={{ borderBottom: "none" }}>
                    <CustomTypography>
                      {new Date(e.issueAt).toLocaleDateString()}
                    </CustomTypography>
                  </TableCell>
                  <TableCell align="center" sx={{ borderBottom: "none" }}>
                    <CustomTypography>{ID_STATUS[e.status]}</CustomTypography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {(fetchingStatus === FS.IDLE || fetchingStatus === FS.FETCHING) && (
          <CircularProgress
            disableShrink
            sx={{
              color: themeMode === THEME_MODE.LIGHT ? "white" : "#434343",
            }}
          />
        )}
        {fetchingStatus === FS.FAILED && "FAILED"}
      </Paper>
      {mobile && (
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          mt={2}
          mb={3}
        >
          <CustomButton minHeight="50px" width="48%" onClick={btn1Handler}>
            <CustomTypography buttonText={true}>{btn1}</CustomTypography>
          </CustomButton>
          <CustomButton
            minHeight="50px"
            width="48%"
            onClick={btn2Handler}
            disabled={tableId === "no2" && selectedList.length === 0}
          >
            <CustomTypography buttonText={true}>{btn2}</CustomTypography>
          </CustomButton>
        </Box>
      )}
    </>
  );
}
