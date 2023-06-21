import { Box, useMediaQuery, IconButton, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { FS } from "src/constants";
import { SCREEN_SIZE } from "src/constants";
import CustomTypography from "src/components/CustomTypography";
import CustomButton from "src/components/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import provinceCode from "src/documents/provinces_code.json";
import CustomCollapse from "src/components/CustomCollapse";
import { useEffect, useState } from "react";
import SignMessageDialog from "src/components/SignMessageDialog";
import { calculatePlace, getProvinceInput } from "src/service/utils";
import { handleCalculateProvinceProof } from "src/redux/proofSlice";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

export default function ProvinceProof({ proof }) {
  const theme = useTheme();
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [click, setClick] = useState(false);
  const [provinceList, setProvinceList] = useState([]);
  const provinceNames = Object.keys(provinceCode);
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  const identity = useSelector((state) => state.identitySlice.identity);

  const serverInfo = { ...proof, ...{ challenge: 100 } };
  const dp = useDispatch();
  const generateProvinceProofStatus = useSelector(
    (state) => state.proofSlice.generateProvinceProofStatus
  );

  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  useEffect(() => {
    if (generateProvinceProofStatus === FS.SUCCESS && click === true) {
      enqueueSnackbar("Create proof successfully!", {
        variant: "success",
        dense: "true",
        preventDuplicate: true,
        autoHideDuration: 2000,
      });
      setOpenDialog(false);
      history.push("/home/proofs");
    } else if (generateProvinceProofStatus === FS.FAILED) {
      enqueueSnackbar("Create proof failed", {
        variant: "error",
        dense: "true",
        preventDuplicate: true,
        autoHideDuration: 2000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generateProvinceProofStatus]);

  const date = () => {
    var timestamp = Math.floor(Date.now() / 1000);
    var currentDate = new Date();
    var date = {
      currentYear: currentDate.getUTCFullYear(),
      currentMonth: currentDate.getUTCMonth() + 1,
      currentDay: currentDate.getUTCDate(),
      expireTime: timestamp + 600,
    };
    return date;
  };

  return (
    <>
      <SignMessageDialog
        open={openDialog}
        setClick={setClick}
        setOpen={setOpenDialog}
        onClose={() => setOpenDialog(false)}
        handler={async () => {
          const placesExpecting = calculatePlace(provinceList);
          if (identity !== undefined) {
            const input = getProvinceInput({
              serverInfo: serverInfo,
              placesExpecting: placesExpecting,
              expireTime: date().expireTime,
              infoObject: identity,
              privateKey: accounts[activeAccount]?.privateKey,
            });
            dp(handleCalculateProvinceProof(input));
          }
        }}
        loading={generateProvinceProofStatus === FS.FETCHING}
      />
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          background: "white",
          width: mobile ? "100%" : tablet ? "90%" : "45%",
          borderRadius: "5px",
          boxShadow: "5px 5px 15px 3px rgba(53, 53, 53, 0.4)",
          paddingY: 3,
          mb: 3,
        }}
      >
        <Box width="90%">
          <Box width="100%">
            <Box
              width="100%"
              display="flex"
              flexDirection={mobile ? "column" : "row"}
            >
              <CustomTypography fontWeight="bold" mr={1}>
                Nơi ở:
              </CustomTypography>
              <CustomTypography>
                Tạo bằng chứng chứng minh nơi ở của bạn là một trong số tỉnh
                thành này
              </CustomTypography>
            </Box>
            <Box
              width="100%"
              display="flex"
              flexWrap="wrap"
              mt={2}
              alignItems="center"
            >
              {provinceList.length > 0 &&
                provinceList.map((e, index) => (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    flexWrap="wrap"
                    px={2}
                    mr={1}
                    mb={1}
                    sx={{
                      minWidth: "50px",
                      minHeight: "30px",
                      maxHeight: "35px",
                      borderRadius: "5px",
                      background: theme.colors.medium_3,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      var temp = [];
                      for (let i = 0; i < provinceList.length; i++) {
                        if (provinceList[i] !== e) {
                          temp = [provinceList[i], ...temp];
                        }
                      }
                      setProvinceList(temp);
                    }}
                  >
                    <CustomTypography buttonText={true}>{e}</CustomTypography>
                  </Box>
                ))}
              <IconButton onClick={() => setOpen(true)}>
                <AddIcon
                  sx={{
                    color: theme.colors.dark_3,
                  }}
                />
              </IconButton>
              <CustomCollapse
                open={open}
                data={provinceNames}
                targetFormId="bp"
                setOpen={setOpen}
                select={true}
                setProvinceList={setProvinceList}
                provinceList={provinceList}
              />
            </Box>
          </Box>
          <Box
            width="100%"
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            sx={{ mt: 5 }}
          >
            <CustomButton
              width={mobile ? "100%" : undefined}
              minHeight="50px"
              onClick={() => setOpenDialog(true)}
            >
              <CustomTypography buttonText={true}>
                Tạo bằng chứng
              </CustomTypography>
            </CustomButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}
