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
import { useSelector } from "react-redux";
import { THEME_MODE, SCREEN_SIZE, FS, ID_STATUS } from "src/constants";
import { formatAddress } from "src/utility";
import { useState } from "react";

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
}) {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const [selectedList, setSelectedList] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  console.log(selectedList);

  return (
    <>
      <Box display="flex" justitycontent="space-between" alignItems="center">
        <Box width={mobile ? "100%" : "50%"} display="flex">
          <CustomTypography variant="h5" textAlign="left" mb={mobile && 2}>
            {tableName}
          </CustomTypography>
          {selectedList.length !== 0 && (
            <CustomTypography
              variant="h6"
              textAlign="left"
              mb={mobile && 2}
              ml={1}
            >
              {`(${selectedList.length} selected)`}
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
            {fetchingStatus === FS.SUCCESS &&
              data.map((e, index) => (
                <TableRow
                  onClick={() => {
                    if (selectedList.includes(e)) {
                      setSelectedList(() => {
                        var temp = [];
                        for (let i = 0; i < selectedList.length; i++) {
                          if (selectedList[i] !== e)
                            temp = [selectedList[i], ...temp];
                        }
                        return temp;
                      });
                      setCheckedList(() => {
                        var temp = [];
                        for (let i = 0; i < checkedList.length; i++) {
                          if (checkedList[i] !== index)
                            temp = [checkedList[i], ...temp];
                        }
                        return temp;
                      });
                    } else if (!selectedList.includes(e)) {
                      setSelectedList(() => {
                        const temp = [e, ...selectedList];
                        return temp;
                      });
                      setCheckedList(() => {
                        const temp = [index, ...checkedList];
                        return temp;
                      });
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
                    <Checkbox checked={checkedList.includes(index)} />
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
          <CustomButton minHeight="50px" width="48%" onClick={btn2Handler}>
            <CustomTypography buttonText={true}>{btn2}</CustomTypography>
          </CustomButton>
        </Box>
      )}
    </>
  );
}
