import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { THEME_MODE } from "src/constants";
import { SCREEN_SIZE } from "src/constants";
import CustomTypography from "src/components/CustomTypography";
import CustomButton from "src/components/CustomButton";
import { verifyProof } from "src/contract";
import ImportProvinceProof from "src/components/ImportProvinceProof";
import { useSnackbar } from "notistack";
import TestResultDialog from "../TestResultDialog";

export default function TestProvince() {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const [openDialog, setOpenDialog] = useState(false);
  const [res, setRes] = useState(false);
  const provinceProof = useSelector((state) => state.proofSlice.provinceProof);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

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
          <Box
            width="100%"
            display="flex"
            flexDirection={mobile ? "column" : "row"}
          >
            <CustomTypography fontWeight="bold" mr={1} variant="h5" mb={3}>
              Place Verifier
            </CustomTypography>
          </Box>
          <Box width="100%">
            {provinceProof === undefined && <ImportProvinceProof />}
            {provinceProof !== undefined && (
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
              disabled={provinceProof === undefined}
              onClick={async () => {
                setLoading(true);
                const res = await verifyProof({
                  optionName: "VERIFIER_PLACE",
                  pi_a: [
                    JSON.parse(provinceProof?.proof).pi_a[0],
                    JSON.parse(provinceProof?.proof).pi_a[1],
                  ],
                  pi_b: [
                    [
                      JSON.parse(provinceProof?.proof).pi_b[0][1],
                      JSON.parse(provinceProof?.proof).pi_b[0][0],
                    ],
                    [
                      JSON.parse(provinceProof?.proof).pi_b[1][1],
                      JSON.parse(provinceProof?.proof).pi_b[1][0],
                    ],
                  ],
                  pi_c: [
                    JSON.parse(provinceProof?.proof).pi_c[0],
                    JSON.parse(provinceProof?.proof).pi_c[1],
                  ],
                  input: JSON.parse(provinceProof?.input),
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
                <CustomTypography buttonText={true}>Verify</CustomTypography>
              )}
              {loading === true && (
                <CircularProgress
                  sx={{
                    color: themeMode === THEME_MODE.LIGHT ? "white" : "#434343",
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
