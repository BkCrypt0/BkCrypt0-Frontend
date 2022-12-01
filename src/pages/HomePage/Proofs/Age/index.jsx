import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { THEME_MODE, SCREEN_SIZE, INFO_STATUS } from "src/constants";
import CustomTypography from "src/components/CustomTypography";
import CustomButton from "src/components/CustomButton";
import DownloadTwoToneIcon from "@mui/icons-material/DownloadTwoTone";

var FileSaver = require("file-saver");

export default function Age() {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const ageProof = useSelector((state) => state.proofSlice.ageProof);
  return (
    <>
      <Box
        sx={{
          width: mobile ? "100%" : tablet ? "90%" : "30%",
          borderRadius: "10px",
          paddingY: 3,
          mb: 3,
        }}
      >
        <CustomTypography variant="h5">
          {`Proof that your age is between ${ageProof?.minAge} and ${ageProof?.maxAge}`}{" "}
        </CustomTypography>
        <pre style={{ marginBottom: "30px" }}>
          <code
            style={{
              color: themeMode === THEME_MODE.LIGHT ? "#353535" : "#D8D8D8",
            }}
          >
            {ageProof?.proof}
          </code>
        </pre>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            background: INFO_STATUS[1]?.color,
            borderRadius: "10px",
            textAlign: "center",
            border: `2px solid ${INFO_STATUS[1]?.stroke}`,
            mb: 3,
          }}
          paddingY={1}
        >
          <CustomTypography
            color={
              themeMode === THEME_MODE.DARK ? "white" : INFO_STATUS[1]?.stroke
            }
            fontWeight="semi-bold"
            letterSpacing="1px"
          >
            This proof expires in 10 minutes
          </CustomTypography>
        </Box>
        <CustomButton
          minHeight="50px"
          minWidth="150px"
          onClick={() => {
            var blob = new Blob([ageProof?.proof], {
              type: "text/plain;charset=utf-8",
            });
            FileSaver.saveAs(blob, "ageProof.json");
          }}
        >
          <DownloadTwoToneIcon
            sx={{
              color: themeMode === THEME_MODE.DARK ? "#353535" : "#D8D8D8",
              mr: 1,
            }}
          />
          <CustomTypography buttonText>Save this proof</CustomTypography>
        </CustomButton>
      </Box>
    </>
  );
}
