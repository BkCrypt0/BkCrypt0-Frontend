import CustomForm from "src/components/CustomForm";
import CustomButton from "src/components/CustomButton";
import { Box, useMediaQuery, ClickAwayListener } from "@mui/material";
import { SCREEN_SIZE, BASE_API_URL } from "src/constants";
import CustomTypography from "src/components/CustomTypography";
import CustomCollapse from "src/components/CustomCollapse";
import ProvinceCode from "src/documents/provinces_code.json";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

const { babyJub } = require("circomlib");

export default function IssueNewIdentity() {
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const login = useSelector((state) => state.accountSlice.isLogin);
  const [open, setOpen] = useState(false);
  const provinceNames = Object.keys(ProvinceCode);
  const [provinceInput, setProvinceInput] = useState("");
  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const { enqueueSnackbar } = useSnackbar();

  const history = useHistory();

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
  const role = accounts[activeAccount]?.role;
  return (
    <>
      {role === "user" && login !== undefined && (
        <Redirect to="/home/identity" />
      )}
      {role === "admin" && login === undefined && <Redirect to="/login" />}
      <Box width="100%">
        <CustomTypography variant="h4" mb={3}>
          Issue a new Identity
        </CustomTypography>
        <Box
          width={mobile ? "100%" : tablet ? "70%" : "50%"}
          sx={{
            paddingBotom: 3,
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
        <Box width="100%" display="flex" alignItems="center" mt={2}>
          <CustomButton
            minHeight="50px"
            minWidth="150px"
            mr={3}
            onClick={async () => {
              setErr(
                !checkValid("iden") ||
                  !checkValid("first-name") ||
                  !checkValid("last-name") ||
                  !checkValid("gender") ||
                  !checkValid("dob") ||
                  !checkValid("bp")
              );
              if (!err) {
                try {
                  await Axios.post(`${BASE_API_URL}/issue/`, {
                    issuer: babyJub
                      .unpackPoint(
                        Buffer.from(accounts[activeAccount].publicKey, "hex")
                      )
                      .map((e) => e.toString()),
                    CCCD: document.getElementById("iden").value,
                    firstName: document.getElementById("first-name").value,
                    lastName: document.getElementById("last-name").value,
                    sex:
                      document.getElementById("gender").value.toString() ===
                      "Male"
                        ? 1
                        : 0,
                    DoBdate: document
                      .getElementById("dob")
                      .value.toString()
                      .replaceAll("/", ""),
                    BirthPlace:
                      ProvinceCode[
                        document.getElementById("bp").value.toString()
                      ],
                  });
                  enqueueSnackbar("Issue a new identity successfully!", {
                    variant: "success",
                    dense: "true",
                    preventDuplicate: true,
                    autoHideDuration: 2000,
                  });
                  history.push("/home/identity-manager");
                } catch (err) {
                  enqueueSnackbar(err.message, {
                    variant: "error",
                    dense: "true",
                    preventDuplicate: true,
                    autoHideDuration: 2000,
                  });
                }
              }
            }}
          >
            <CustomTypography buttonText={true}>Submit</CustomTypography>
          </CustomButton>
          <CustomButton minHeight="50px" minWidth="150px">
            <CustomTypography buttonText={true}>Discard</CustomTypography>
          </CustomButton>
        </Box>
      </Box>
    </>
  );
}
