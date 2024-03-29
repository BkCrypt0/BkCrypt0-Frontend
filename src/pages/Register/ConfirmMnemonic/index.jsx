import { validateMnemonic12Phrases } from "src/redux/accountSlice";
import { Box, Grid, styled, useMediaQuery, useTheme } from "@mui/material";
import CustomTypography from "src/components/CustomTypography";
import CustomButton from "src/components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { SCREEN_SIZE, LS } from "src/constants";
import CustomForm from "src/components/CustomForm";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { generateAccount, changeActiveAccount } from "src/redux/accountSlice";

export default function ConfirmMnemonic({ setActiveStep, activeStep }) {
  const mnemonic = useSelector((state) => state.accountSlice.mnemonic);
  const theme = useTheme();
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const [err, setErr] = useState(false);
  const dp = useDispatch();

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
          border: `2px solid ${theme.colors.dark_3}`,
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
            You must enter the correct mnemonic!
          </CustomTypography>
        )}
      </Box>
      <Box width="100%" display="flex" justifyContent="space-between">
        <CustomButton
          mt={3}
          width="49%"
          minHeight="50px"
          onClick={() => {
            setActiveStep(1);
          }}
        >
          <CustomTypography buttonText>Go back</CustomTypography>
        </CustomButton>
        <CustomButton
          mt={3}
          width="49%"
          minHeight="50px"
          onClick={async () => {
            const testMnemonic = convertArrayToMnemonic();
            const res = await validateMnemonic12Phrases(
              testMnemonic,
              mnemonic,
              1
            );
            if (res === true) {
              setErr(false);
              setActiveStep(3);
              dp(generateAccount());
              if (localStorage.getItem(LS.ACTIVE_ACCOUNT) === null)
                dp(changeActiveAccount(0));
              else
                dp(
                  changeActiveAccount(
                    Number(localStorage.getItem(LS.ACTIVE_ACCOUNT)) + 1
                  )
                );
              sessionStorage.clear();
            } else {
              setErr(true);
              sessionStorage.clear();
            }
          }}
        >
          <CustomTypography buttonText>Confirm</CustomTypography>
        </CustomButton>
      </Box>
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
        <CustomTypography>Back to login page</CustomTypography>
      </NavLink>
      <CustomButton
        mt={3}
        width="100%"
        minHeight="50px"
        onClick={async () => {
          const res = await validateMnemonic12Phrases(mnemonic, mnemonic, 1);
          if (res === true) {
            setErr(false);
            setActiveStep(3);
            dp(generateAccount());
            if (localStorage.getItem(LS.ACTIVE_ACCOUNT) === null)
              dp(changeActiveAccount(0));
            else
              dp(
                changeActiveAccount(
                  Number(localStorage.getItem(LS.ACTIVE_ACCOUNT)) + 1
                )
              );
            sessionStorage.clear();
          } else {
            setErr(true);
            sessionStorage.clear();
          }
        }}
      >
        <CustomTypography buttonText>
          Skip this step (For testing)
        </CustomTypography>
      </CustomButton>
    </Box>
  );
}
