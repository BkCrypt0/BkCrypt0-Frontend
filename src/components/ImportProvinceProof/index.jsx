import { useRef } from "react";
import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import { THEME_MODE } from "src/constants";
import CustomTypography from "src/components/CustomTypography";
import { Box } from "@mui/material";
import { Upload } from "@mui/icons-material";
import { handleImportProvinceProof } from "src/redux/proofSlice";

export default function ImportProvinceProof() {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);

  const inputRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  const dp = useDispatch();

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    if (!fileObj.type.includes("json")) {
      enqueueSnackbar("Định dạng file không hỗ trợ! Hãy tải lên 1 file JSON", {
        variant: "error",
        dense: "true",
        preventDuplicate: true,
        autoHideDuration: 3000,
      });
      return;
    }
    const proofJSON = await fileObj.text();
    const importProof = JSON.parse(proofJSON);
    dp(handleImportProvinceProof(importProof));
  };
  return (
    <>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
      />
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          cursor: "pointer",
          borderRadius: "5px",
          border:
            themeMode === THEME_MODE.DARK
              ? "1.5px solid rgba(216, 216, 216, 0.4)"
              : "1.5px solid rgba(53, 53, 53, 0.4)",
          background: themeMode === THEME_MODE.LIGHT ? "#f2f2f2" : "#333333",
        }}
        onClick={async () => {
          handleClick();
        }}
      >
        <Upload
          fontSize="large"
          sx={{
            mt: 2,
            mb: 1,
            color: themeMode === THEME_MODE.LIGHT ? "#353535" : "#D8D8D8",
          }}
        />
        <CustomTypography mb={2}>Tải lên bằng chứng (.JSON)</CustomTypography>
      </Box>
    </>
  );
}
