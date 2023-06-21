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
  useTheme,
} from "@mui/material";
import CustomTypography from "src/components/CustomTypography";
import CustomButton from "src/components/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { SCREEN_SIZE, FS, ID_STATUS } from "src/constants";
import { formatAddress } from "src/utility";
import {
  addToCheckedList,
  addToSelectedList,
  removeFromCheckedList,
  removeFromSelectedList,
} from "src/redux/adminSlice";
import CustomForm from "src/components/CustomForm";
import { useState } from "react";
import DetailInformationDialog from "src/components/DetailInformationDialog";

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
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const selectedList = useSelector((state) => state.adminSlice.selectedList);
  const checkedList = useSelector((state) => state.adminSlice.checkedList);
  const revokeLimit = useSelector((state) => state.adminSlice.revokeLimit);
  const dp = useDispatch();
  const [inputIdentity, setInputIdentity] = useState("");
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(undefined);
  const theme = useTheme();

  return (
    <>
      <DetailInformationDialog
        open={open}
        information={info}
        onClose={() => setOpen(false)}
        setOpen={setOpen}
      />
      <Box
        display="flex"
        flexDirection={mobile ? "column" : "row"}
        justitycontent="space-between"
        alignItems="center"
      >
        <Box width={mobile ? "100%" : "50%"} display="flex">
          <CustomTypography variant="h5" textAlign="left">
            {tableName}
          </CustomTypography>
          {selectedList.length !== 0 && tableId === "no2" && (
            <CustomTypography
              variant="h6"
              textAlign="left"
              mb={mobile && 2}
              ml={1}
            >
              {`(Đã chọn ${selectedList.length}/${revokeLimit})`}
            </CustomTypography>
          )}
        </Box>
        {mobile && (
          <CustomForm
            type="text"
            id={`identity${tableId}`}
            placeHolder="Tìm CCCD..."
            onChange={() => {
              setInputIdentity(
                document.getElementById(`identity${tableId}`).value
              );
            }}
          />
        )}
        {!mobile && (
          <Box width="50%" display="flex" justifyContent="flex-end" mb={2}>
            <CustomForm
              type="text"
              id={`identity${tableId}`}
              placeHolder="Tìm CCCD..."
              onChange={() => {
                setInputIdentity(
                  document.getElementById(`identity${tableId}`).value
                );
              }}
              margin="0px 0px"
            />
            <CustomButton
              minHeight="50px"
              minWidth="200px"
              mr={2}
              ml={!mobile && 2}
              onClick={btn1Handler}
            >
              <CustomTypography buttonText={true}>{btn1}</CustomTypography>
            </CustomButton>
            <CustomButton
              minHeight="50px"
              minWidth="200px"
              onClick={btn2Handler}
            >
              <CustomTypography buttonText={true}>{btn2}</CustomTypography>
            </CustomButton>
          </Box>
        )}
      </Box>
      <Paper
        sx={{
          background: "white",
          width: "100%",
          borderRadius: "5px",
          boxShadow: "2px 2px 8px 1px rgba(53, 53, 53, 0.4)",
          paddingBottom: 3,
          mb: 3,
          mt: mobile && 2,
          height: "300px",
          overflow: "auto",
        }}
      >
        <Table>
          <TableHead
            sx={{
              position: "sticky",
              top: 0,
              background: theme.colors.neutral_gray,
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
                  background: theme.colors.neutral_gray,
                }}
              ></TableCell>
              <TableCell
                align="center"
                sx={{
                  zIndex: 1000,
                  position: "sticky",
                  left: 0,
                  borderBottom: "none",
                  background: theme.colors.neutral_gray,
                }}
              >
                <CustomTypography fontWeight="bold">Số CCCD</CustomTypography>
              </TableCell>
              <TableCell align="center" sx={{ borderBottom: "none" }}>
                <CustomTypography fontWeight="bold">
                  Người yêu cầu
                </CustomTypography>
              </TableCell>
              <TableCell align="center" sx={{ borderBottom: "none" }}>
                <CustomTypography fontWeight="bold">
                  Ngày yêu cầu
                </CustomTypography>
              </TableCell>
              <TableCell align="center" sx={{ borderBottom: "none" }}>
                <CustomTypography fontWeight="bold">
                  Trạng thái
                </CustomTypography>
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
                    Không có dữ liệu
                  </CustomTypography>
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }} />
                <TableCell sx={{ borderBottom: "none" }} />
              </TableRow>
            )}
            {data !== undefined &&
              data?.filter((e) =>
                e.CCCD.toString().includes(inputIdentity.toString())
              ).length > 0 &&
              data
                ?.filter((e) =>
                  e.CCCD.toString().includes(inputIdentity.toString())
                )
                .map((e, index) => (
                  <TableRow
                    onClick={() => {
                      setInfo(e);
                      setOpen(true);
                    }}
                    key={index}
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                      },
                      zIndex: 900,
                    }}
                  >
                    <TableCell
                      align="center"
                      sx={{
                        zIndex: 500,
                        position: "sticky",
                        left: 0,
                        borderBottom: "none",
                        background: "white",
                      }}
                    >
                      {tableId === "no2" && (
                        <Checkbox
                          sx={{ zIndex: 1000 }}
                          checked={checkedList.includes(index)}
                          onClick={(event) => {
                            event.stopPropagation();
                            if (
                              selectedList.includes(e.CCCD + "_" + e.status)
                            ) {
                              dp(
                                removeFromSelectedList(e.CCCD + "_" + e.status)
                              );
                              dp(removeFromCheckedList(index));
                            } else if (
                              !selectedList.includes(e.CCCD + "_" + e.status) &&
                              selectedList.length < revokeLimit
                            ) {
                              dp(addToCheckedList(index));
                              dp(addToSelectedList(e.CCCD + "_" + e.status));
                            }
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        zIndex: 500,
                        position: "sticky",
                        left: 0,
                        borderBottom: "none",
                        background: "ưhite",
                      }}
                    >
                      <CustomTypography>{e.CCCD}</CustomTypography>
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: "none" }}>
                      <CustomTypography>
                        {formatAddress(
                          e.requester !== undefined &&
                            babyJub
                              .packPoint(
                                e.requester.map((pub) => BigInt(pub).value)
                              )
                              .toString("hex"),
                          10
                        )}
                      </CustomTypography>
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: "none" }}>
                      <CustomTypography>
                        {new Date(e.requestAt).toLocaleDateString()}
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
              color: "white",
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
