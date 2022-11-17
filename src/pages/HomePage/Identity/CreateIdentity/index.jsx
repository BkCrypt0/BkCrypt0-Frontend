import CustomForm from "src/components/CustomForm";
import CustomButton from "src/components/CustomButton";
import { Box, useMediaQuery, ClickAwayListener } from "@mui/material";
import { SCREEN_SIZE } from "src/constants";
import CustomTypography from "src/components/CustomTypography";
import CustomCollapse from "src/components/CustomCollapse";
import ProvinceCode from "src/documents/provinces_code.json";
import { useState } from "react";
import { createNewIdentity } from "src/redux/identitySlice";
import { useDispatch, useSelector } from "react-redux";

export default function CreateIdentity({ clickCreate, setClickCreate }) {
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const [open, setOpen] = useState(false);
  const provinceNames = Object.keys(ProvinceCode);
  const [provinceInput, setProvinceInput] = useState("");
  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const dp = useDispatch();

  const checkValid = (id) =>
    document.getElementById(id) === null
      ? false
      : document.getElementById(id).value.toString().length === 0
      ? false
      : true;
  const [err, setErr] = useState(false);

  const provincesFilter = (name) => {
    return name.toLowerCase().includes(provinceInput.toLowerCase());
  };

  return (
    <>
      <Box
        width="100%"
        sx={{ display: clickCreate === true ? "block" : "none" }}
      >
        <CustomTypography variant="h5">Fill in your identity</CustomTypography>
        <Box
          width={mobile ? "100%" : tablet ? "70%" : "50%"}
          sx={{
            paddingY: 3,
          }}
        >
          <CustomForm
            label="Identity Number"
            type="text"
            id="iden"
            placeHolder="CCCD..."
            error={!checkValid("iden") && err}
            errorText={"This field is required!"}
            onFocus={() => setErr(false)}
          />
          <CustomForm
            label="First name"
            type="text"
            id="first-name"
            placeHolder="First name..."
            error={!checkValid("first-name") && err}
            errorText={"This field is required!"}
            onFocus={() => setErr(false)}
          />
          <CustomForm
            label="Last name"
            type="text"
            id="last-name"
            placeHolder="Last name..."
            error={!checkValid("last-name") && err}
            errorText={"This field is required!"}
            onFocus={() => setErr(false)}
          />
          <CustomForm
            label="Gender"
            type="text"
            id="gender"
            placeHolder="Male / Female"
            error={!checkValid("gender") && err}
            errorText={"This field is required!"}
            onFocus={() => setErr(false)}
          />
          <CustomForm
            label="Date of birth"
            type="text"
            id="dob"
            placeHolder="YYYY/MM/DD..."
            error={!checkValid("dob") && err}
            errorText={"This field is required!"}
            onFocus={() => setErr(false)}
          />
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <Box>
              <CustomForm
                label="Birth place"
                type="text"
                id="bp"
                placeHolder="Province..."
                error={!checkValid("bp") && err}
                errorText={"This field is required!"}
                onChange={() =>
                  setProvinceInput(document.getElementById("bp").value)
                }
                onFocus={() => setOpen(true)}
              />
              {provinceNames.filter(provincesFilter).length > 0 && (
                <CustomCollapse
                  open={open}
                  data={provinceNames.filter(provincesFilter)}
                  targetFormId="bp"
                  setOpen={setOpen}
                />
              )}
            </Box>
          </ClickAwayListener>
        </Box>
        <Box width="100%" display="flex" alignItems="center">
          <CustomButton
            minHeight="50px"
            minWidth="150px"
            mr={3}
            onClick={() => {
              setErr(
                !checkValid("iden") ||
                  !checkValid("first-name") ||
                  !checkValid("last-name") ||
                  !checkValid("gender") ||
                  !checkValid("dob") ||
                  !checkValid("bp")
              );
              if (!err) {
                dp(
                  createNewIdentity(
                    accounts[activeAccount].publicKey,
                    document.getElementById("iden").value,
                    document.getElementById("first-name").value,
                    document.getElementById("last-name").value,
                    document.getElementById("gender").value.toString() ===
                      "Male"
                      ? 1
                      : 0,
                    document
                      .getElementById("dob")
                      .value.toString()
                      .replaceAll("/", ""),
                    ProvinceCode[document.getElementById("bp").value.toString()]
                  )
                );
                setClickCreate(false);
              }
            }}
          >
            <CustomTypography buttonText={true}>Submit</CustomTypography>
          </CustomButton>
          <CustomButton
            minHeight="50px"
            minWidth="150px"
            onClick={() => setClickCreate(false)}
          >
            <CustomTypography buttonText={true}>Discard</CustomTypography>
          </CustomButton>
        </Box>
      </Box>
    </>
  );
}
