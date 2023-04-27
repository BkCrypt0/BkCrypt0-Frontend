import CustomButton from "..";
import { useRef } from "react";
import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import { createNewIdentity } from "src/redux/identitySlice";
import { useMediaQuery } from "@mui/material";
import { SCREEN_SIZE } from "src/constants";
import CustomTypography from "src/components/CustomTypography";

export default function ImportIdentityButton() {
  const inputRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const accounts = useSelector((state) => state.accountSlice.accounts);
  const activeAccount = useSelector(
    (state) => state.accountSlice.activeAccount
  );

  const dp = useDispatch();
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    if (!fileObj.type.includes("json")) {
      enqueueSnackbar("Unsupported file type! Please upload a JSON file", {
        variant: "error",
        dense: "true",
        preventDuplicate: true,
        autoHideDuration: 3000,
      });
      return;
    }
    const identityJSON = await fileObj.text();
    const importIdentity = JSON.parse(identityJSON);

    if (importIdentity.publicKey !== accounts[activeAccount]?.publicKey) {
      enqueueSnackbar("Unmatched publicKey! Please import your own identity", {
        variant: "error",
        dense: "true",
        preventDuplicate: true,
        autoHideDuration: 3000,
      });
    } else if (
      importIdentity.publicKey === accounts[activeAccount]?.publicKey
    ) {
      dp(
        createNewIdentity(
          importIdentity.publicKey,
          importIdentity.CCCD,
          importIdentity.firstName,
          importIdentity.lastName,
          importIdentity.sex,
          importIdentity.DoBdate,
          importIdentity.BirthPlace
        )
      );
      enqueueSnackbar("Import identity successfully", {
        variant: "success",
        dense: "true",
        preventDuplicate: true,
        autoHideDuration: 3000,
      });
    }
  };
  return (
    <>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
      />
      <CustomButton
        minHeight="50px"
        minWidth={mobile ? undefined : "150px"}
        width={mobile ? "47%" : undefined}
        mr={mobile ? 0 : 3}
        onClick={async () => {
          handleClick();
        }}
      >
        <CustomTypography buttonText={true}>Tải lên định danh</CustomTypography>
      </CustomButton>
    </>
  );
}
