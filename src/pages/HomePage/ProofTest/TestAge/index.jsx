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
        handler={async () => {
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
            console.log(await calculateAgeProof(JSON.stringify(input)));
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
            <ImportProof />
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
                verifyProof(
                  "VERIFIER_AGE",
                  [
                    "0x2fbcf3ca67b090c3dc50c1711aafec61bad9f4e04ecd6786017d7ca1ba0bf920",
                    "0x2cfe4e0afbc696e1587e2e234f7b18edbdf45304b898e3762e1c78748d1aa9e7",
                  ],
                  [
                    [
                      "0x001c4f91d333de19e776ee2aaa41f5f323228f25c8e3ffc11aa588dc1a76bf92",
                      "0x1e851a57661f001e27d3cf73e5ce74577d73d1cdd1b679cc002698eae5b6d94d",
                    ],
                    [
                      "0x22b8f2fd57fe3dc682b32ce95def8f74c3667999a950d130fa24501a5dd8c769",
                      "0x0ea79028b9ba11b1e5b321d3800bda827787cb765f55cfcb13bb6494f9518eb2",
                    ],
                  ],
                  [
                    "0x24564ba46ca8c876ab8cd43fab8e640cd52883cfb3a6c1d37c8c0ad6e4596b23",
                    "0x0ffb57fbefc36a44dc2112af9ce1787bc10c51350174dafe3624351967b1c2eb",
                  ],
                  [
                    "0x142baa48ced500f1e342f173cb0cf6bcc940ceb8d68bb12ca2b199972021cfe8",
                    "0x12b380fc177f791a7287bf4c2cd6edbff5cfd0eeae6d0d93f99921354bbff8d1",
                    "0x1d5ac1f31407018b7d413a4f52c8f74463b30e6ac2238220ad8b254de4eaa3a2",
                    "0x1e1de8a908826c3f9ac2e0ceee929ecd0caf3b99b3ef24523aaab796a6f733c4",
                    "0x12",
                    "0x3e8",
                    "0x7e6",
                    "0xb",
                    "0xf",
                    "0x637f434a",
                  ]
                );
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
