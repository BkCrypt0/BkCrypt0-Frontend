import { Box, useMediaQuery } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { THEME_MODE, SCREEN_SIZE, FS } from "src/constants";
import CustomTypography from "src/components/CustomTypography";
import CustomForm from "src/components/CustomForm";
import CustomButton from "src/components/CustomButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SignMessageDialog from "src/components/SignMessageDialog";
import { getAgeInput } from "src/service/utils";
import { handleCaculateAgeProof } from "src/redux/proofSlice";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

export default function AgeProof({ proof }) {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const identity = useSelector((state) => state.identitySlice.identity);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const [openDialog, setOpenDialog] = useState(false);
  const [click, setClick] = useState(false);
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  const generateAgeProofStatus = useSelector(
    (state) => state.proofSlice.generateAgeProofStatus
  );
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  useEffect(() => {
    if (generateAgeProofStatus === FS.SUCCESS && click === true) {
      enqueueSnackbar("Create proof successfully!", {
        variant: "success",
        dense: "true",
        preventDuplicate: true,
        autoHideDuration: 2000,
      });
      setOpenDialog(false);
      history.push("/home/proofs");
    } else if (generateAgeProofStatus === FS.FAILED) {
      enqueueSnackbar("Create proof failed", {
        variant: "error",
        dense: "true",
        preventDuplicate: true,
        autoHideDuration: 2000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generateAgeProofStatus]);

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

  const serverInfo = { ...proof, ...{ challenge: 100 } };

  return (
    <>
      <SignMessageDialog
        loading={generateAgeProofStatus === FS.FETCHING}
        setClick={setClick}
        open={openDialog}
        setOpen={setOpenDialog}
        onClose={() => setOpenDialog(false)}
        handler={async () => {
          if (identity !== undefined) {
            const input = getAgeInput({
              serverInfo: serverInfo,
              currentYear: date().currentYear,
              currentMonth: date().currentMonth,
              currentDay: date().currentDay,
              minAge: Number(document.getElementById("min-age").value),
              maxAge: Number(document.getElementById("max-age").value),
              // thay place thi tu currentYear -> maxAge thanh placesExpecting => gan so tu calcPlace
              expireTime: date().expireTime,
              infoObject: identity,
              privateKey: accounts[activeAccount]?.privateKey,
            });
            dp(handleCaculateAgeProof(input));
          }
        }}
      />
      <Box
        display="flex"
        justifyContent="center"
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
        <Box width="90%">
          <Box width="100%">
            <Box
              width="100%"
              display="flex"
              flexDirection={mobile ? "column" : "row"}
            >
              <CustomTypography fontWeight="bold" mr={1}>
                Age:
              </CustomTypography>
              <CustomTypography width={"100%"}>
                Prove that your age is in the following range
              </CustomTypography>
            </Box>
          </Box>
          <Box
            my={2}
            width="100%"
            display="flex"
            flexDirection="row"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <CustomForm
              placeHolder="Min"
              type="number"
              defaultValue={1}
              id="min-age"
            />
            <Box
              display="flex"
              minWidth="50%"
              alignItems="center"
              justifyContent="space-evenly"
            >
              <ArrowBackIosIcon
                sx={{
                  color: themeMode === THEME_MODE.LIGHT ? "#353535" : "#D8D8D8",
                }}
              />
              <CustomTypography textAlign="center">Your age</CustomTypography>
              <ArrowBackIosIcon
                sx={{
                  color: themeMode === THEME_MODE.LIGHT ? "#353535" : "#D8D8D8",
                }}
              />
            </Box>
            <CustomForm
              placeHolder="Max"
              type="number"
              defaultValue={100}
              id="max-age"
            />
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
              onClick={() => {
                setOpenDialog(true);
              }}
            >
              <CustomTypography buttonText={true}>
                Create Proof
              </CustomTypography>
            </CustomButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}
