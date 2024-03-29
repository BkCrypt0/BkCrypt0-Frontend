import { Box, Grid, styled, useMediaQuery, useTheme } from "@mui/material";
import CustomTypography from "src/components/CustomTypography";
import CustomButton from "src/components/CustomButton";
import { SCREEN_SIZE } from "src/constants";
import CustomForm from "src/components/CustomForm";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { generatePairKeys } from "src/redux/accountSlice";
import { useDispatch } from "react-redux";

// 1. awesome
// 2. chat
// 3. share
// 4. arctic
// 5. satoshi
// 6. erosion
// 7. planet
// 8. wave
// 9. hollow
// 10. will
// 11. three
// 12. involve

const bip39 = require("bip39");

export default function MnemonicInputTable({
  setActiveStep = { undefined },
  activeStep = 2,
  restore = false,
  setDisplay = { undefined },
}) {
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const [err, setErr] = useState(false);

  const convertArrayToMnemonic = () => {
    var res = "";
    for (let counter = 0; counter < 12; counter++) {
      res += document.getElementById("phrase" + (counter + 1)).value.trim();
      if (counter < 11) res += " ".toString();
    }
    return res;
  };

  const Item = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
  }));

  const dp = useDispatch();
  const theme = useTheme();

  return (
    <Box
      width={mobile ? "95%" : tablet ? "60%" : "50%"}
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ display: activeStep === 2 ? "block" : "none" }}
    >
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          borderRadius: "5px",
          pt: 3,
          pb: 3,
          border: `2px solid ${theme.colors.dark_2}`,
          background: theme.colors.neutral_gray,
        }}
      >
        <Grid container spacing={1}>
          {arr.map((e, index) => (
            <Grid
              item
              display="flex"
              justifyContent="center"
              xs={4}
              key={index}
            >
              <Item display="flex" alignItems="baseline">
                <Box mr={0.5}>
                  <CustomTypography>{index + 1}. </CustomTypography>{" "}
                </Box>
                <CustomForm
                  defaultValue={sessionStorage.getItem(`phrase${index + 1}`)}
                  onChange={() => {
                    sessionStorage.setItem(
                      `phrase${index + 1}`,
                      document.getElementById(`phrase${index + 1}`).value
                    );
                  }}
                  id={"phrase" + (index + 1)}
                  type="text"
                  height="35px"
                  width="85px"
                  padding="5px 5px"
                  margin="0px"
                />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        width="100%"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        mt={2}
      >
        {err === true && <CloseIcon sx={{ color: "#FF3C30", mr: 1 }} />}
        {err === true && (
          <CustomTypography color="#FF3C30">
            Bạn phải nhập đúng mã gợi nhớ!
          </CustomTypography>
        )}
      </Box>
      {restore === true && (
        <Box width="100%" display="flex" justifyContent="space-between">
          <CustomButton
            mt={3}
            width="100%"
            minHeight="50px"
            onClick={() => {
              const importMnemonic = convertArrayToMnemonic();
              const res = bip39.validateMnemonic(importMnemonic);
              if (res === true) {
                dp(generatePairKeys(importMnemonic));
                // dp(generateAccount());
                if (setDisplay !== undefined) {
                  setDisplay("block");
                }
                setErr(false);
                sessionStorage.clear();
              } else {
                setDisplay("none");
                setErr(true);
              }
            }}
          >
            <CustomTypography buttonText>Tiếp tục</CustomTypography>
          </CustomButton>
        </Box>
      )}
      <Box mb={2} />
      <NavLink
        to="/login"
        style={{
          width: "100%",
          textDecoration: "none",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ArrowBackTwoToneIcon
          sx={{
            color: theme.colors.dark_3,
            mr: 0.5,
          }}
        />
        <CustomTypography>Quay lại trang đăng nhập</CustomTypography>
      </NavLink>
    </Box>
  );
}
