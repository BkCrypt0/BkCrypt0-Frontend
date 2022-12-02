import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { THEME_MODE } from "src/constants";
import { SCREEN_SIZE } from "src/constants";
import CustomTypography from "src/components/CustomTypography";
import CustomForm from "src/components/CustomForm";
import CustomButton from "src/components/CustomButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SignMessageDialog from "src/components/SignMessageDialog";
import {
  getAgeInput,
  testServerObj,
  calculateAgeProof,
} from "src/service/utils";
import { verifyProof } from "src/contract";
import ImportProof from "src/components/ImportProof";

export default function TestAge() {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const identity = useSelector((state) => state.identitySlice.identity);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const [openDialog, setOpenDialog] = useState(false);
  const ageProof = useSelector((state) => state.proofSlice.ageProof);

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
        setOpen={setOpenDialog}
        onClose={() => setOpenDialog(false)}
        handler={() => {
          if (identity !== undefined) {
            const input = getAgeInput({
              serverInfo: testServerObj,
              currentYear: date().currentYear,
              currentMonth: date().currentMonth,
              currentDay: date().currentDay,
              minAge: Number(document.getElementById("min-age").value),
              maxAge: Number(document.getElementById("max-age").value),
              // expireTime: date().expireTime,
              // infoObject: identity,
            });
            console.log(calculateAgeProof(input));
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
          <Box
            width="100%"
            display="flex"
            flexDirection={mobile ? "column" : "row"}
          >
            <CustomTypography fontWeight="bold" mr={1} variant="h5">
              Age Verifier
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
          <Box width="100%">
            <CustomTypography fontWeight="bold" mr={1} variant="h5" mb={3}>
              Your Proof
            </CustomTypography>
            {ageProof === undefined && <ImportProof />}
            {ageProof !== undefined && (
              <CustomTypography>Your proof is ready to test</CustomTypography>
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
              onClick={() => {
                try {
                  verifyProof({
                    optionName: "VERIFIER_AGE",
                    pi_a: [
                      JSON.parse(ageProof?.proof).pi_a[0],
                      JSON.parse(ageProof?.proof).pi_a[1],
                    ],
                    pi_b: [
                      JSON.parse(ageProof?.proof).pi_b[0],
                      JSON.parse(ageProof?.proof).pi_b[1],
                    ],
                    pi_c: [
                      JSON.parse(ageProof?.proof).pi_c[0],
                      JSON.parse(ageProof?.proof).pi_c[1],
                    ],
                    input: JSON.parse(ageProof?.input),
                  });
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              <CustomTypography buttonText={true}>Verify</CustomTypography>
            </CustomButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}
