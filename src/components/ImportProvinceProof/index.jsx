import { useRef } from "react";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import CustomTypography from "src/components/CustomTypography";
import { Box, useTheme } from "@mui/material";
import { Upload } from "@mui/icons-material";
import { handleImportProvinceProof } from "src/redux/proofSlice";

export default function ImportProvinceProof() {
  const theme = useTheme();
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
          border: `1.5px solid ${theme.colors.dark_2}`,
          background: theme.colors.neutral_gray,
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
            color: theme.colors.dark_3,
          }}
        />
        <CustomTypography mb={2}>Tải lên bằng chứng (.JSON)</CustomTypography>
      </Box>
    </>
  );
}
