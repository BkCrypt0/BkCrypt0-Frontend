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
                verifyProof({
                  optionName: "VERIFIER_AGE",
                  pi_a: [
                    "0x2600de3d9782c84bfda622a25897546e6c441359d1722e4f0d3b5da66f946e7b",
                    "0x1bde4efc82baa0fce3497ae0f20ee2caefb65c3926ddfb9507eedb6a48ed9dae",
                  ],
                  pi_b: [
                    [
                      "0x0509b351e7da3d53a55dd510f429c685cf3556a315bf860640a9d6d269ed7b1c",
                      "0x1e4845359c8a2d0d281b1484a1931e7727a0b02d6295fb23dd32044bb886782f",
                    ],
                    [
                      "0x2240123ac93ce517e133350de0778b285bb45fd2b639832759260e6b9d6e3b01",
                      "0x22d02baba85d221190f33dc551f74d2566252f0a433882bbaeaaa82604e63263",
                    ],
                  ],
                  pi_c: [
                    "0x0d6cf77b20d306b309c1d5ee4eefc2b10c935e38089b727bae1d5e32ff36bb3b",
                    "0x05ef04a07ef343e4e2bd8acc638b1317c177171b03cc58c5f303acdecec6f673",
                  ],
                  input: [
                    "0x142baa48ced500f1e342f173cb0cf6bcc940ceb8d68bb12ca2b199972021cfe8",
                    "0x12b380fc177f791a7287bf4c2cd6edbff5cfd0eeae6d0d93f99921354bbff8d1",
                    "0x1d5ac1f31407018b7d413a4f52c8f74463b30e6ac2238220ad8b254de4eaa3a2",
                    "0x1e1de8a908826c3f9ac2e0ceee929ecd0caf3b99b3ef24523aaab796a6f733c4",
                    "0x12",
                    "0x3e8",
                    "0x7e6",
                    "0xb",
                    "0xf",
                    "0x65616f42",
                  ],
                });
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
