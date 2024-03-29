import { Box, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { SCREEN_SIZE } from "src/constants";
import CustomTypography from "src/components/CustomTypography";
import CustomButton from "src/components/CustomButton";
import CustomForm from "src/components/CustomForm";
import { verifyProof } from "src/contract";
import ImportAgeProof from "src/components/ImportAgeProof";
import { useSnackbar } from "notistack";
import TestResultDialog from "../TestResultDialog";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function TestAge() {
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const [openDialog, setOpenDialog] = useState(false);
  const [res, setRes] = useState(false);
  const ageProof = useSelector((state) => state.proofSlice.ageProof);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  return (
    <>
      <TestResultDialog
        open={openDialog}
        res={res}
        onClose={() => setOpenDialog(false)}
      />
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          mr: "36px",
          background: "white",
          width: mobile ? "100%" : tablet ? "90%" : "45%",
          borderRadius: "5px",
          boxShadow: "5px 5px 15px 3px rgba(53, 53, 53, 0.4)",
          paddingY: 3,
          mb: 3,
          boxSizing: "border-box",
        }}
      >
        <Box width="90%">
          <Box
            width="100%"
            display="flex"
            flexDirection={mobile ? "column" : "row"}
          >
            <CustomTypography fontWeight="bold" mr={1} variant="h5" mb={3}>
              Kiểm tra bằng chứng tuổi
            </CustomTypography>
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
                  color: theme.colors.dark_3,
                }}
              />
              <CustomTypography textAlign="center">
                Tuổi của bạn
              </CustomTypography>
              <ArrowBackIosIcon
                sx={{
                  color: theme.colors.dark_3,
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
          <Box width="100%">
            {ageProof === undefined && <ImportAgeProof />}
            {ageProof !== undefined && (
              <CustomTypography variant="h6">
                Your proof is ready to test
              </CustomTypography>
            )}
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
              disabled={ageProof === undefined}
              onClick={async () => {
                setLoading(true);
                var temp = JSON.parse(ageProof?.input);
                temp[4] = document.getElementById("min-age").value;
                temp[5] = document.getElementById("max-age").value;

                const res = await verifyProof({
                  optionName: "VERIFIER_AGE",
                  pi_a: [
                    JSON.parse(ageProof?.proof).pi_a[0],
                    JSON.parse(ageProof?.proof).pi_a[1],
                  ],
                  pi_b: [
                    [
                      JSON.parse(ageProof?.proof).pi_b[0][1],
                      JSON.parse(ageProof?.proof).pi_b[0][0],
                    ],
                    [
                      JSON.parse(ageProof?.proof).pi_b[1][1],
                      JSON.parse(ageProof?.proof).pi_b[1][0],
                    ],
                  ],
                  pi_c: [
                    JSON.parse(ageProof?.proof).pi_c[0],
                    JSON.parse(ageProof?.proof).pi_c[1],
                  ],
                  input: temp,
                });
                if (res === -1) {
                  enqueueSnackbar("Verification failed due to some errors", {
                    variant: "error",
                    dense: "true",
                    preventDuplicate: true,
                    autoHideDuration: 3000,
                  });
                  setLoading(false);
                } else {
                  setRes(res);
                  setOpenDialog(true);
                  setLoading(false);
                }
              }}
            >
              {loading === false && (
                <CustomTypography buttonText={true}>Kiểm tra</CustomTypography>
              )}
              {loading === true && (
                <CircularProgress
                  sx={{
                    color: "white",
                  }}
                />
              )}
            </CustomButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}
