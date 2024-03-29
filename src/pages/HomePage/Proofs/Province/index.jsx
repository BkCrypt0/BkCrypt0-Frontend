import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { SCREEN_SIZE, INFO_STATUS } from "src/constants";
import CustomTypography from "src/components/CustomTypography";
import CustomButton from "src/components/CustomButton";
import DownloadTwoToneIcon from "@mui/icons-material/DownloadTwoTone";

var FileSaver = require("file-saver");

export default function Province() {
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);
  const provinceProof = useSelector((state) => state.proofSlice.provinceProof);
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          width: mobile ? "100%" : tablet ? "90%" : "30%",
          borderRadius: "5px",
          paddingY: 3,
          mb: 3,
        }}
      >
        <pre style={{ marginBottom: "30px", overflow: mobile && "auto" }}>
          <code
            style={{
              color: theme.colors.dark_3,
            }}
          >
            {'{\n "proof": ' + provinceProof?.proof + ",\n\n "}
            {'"input": ' + provinceProof?.input + "\n}"}
          </code>
        </pre>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            background: INFO_STATUS[1]?.color,
            borderRadius: "5px",
            textAlign: "center",
            border: `2px solid ${INFO_STATUS[1]?.stroke}`,
            mb: 3,
          }}
          paddingY={1}
        >
          <CustomTypography
            color={INFO_STATUS[1]?.stroke}
            fontWeight="semi-bold"
            letterSpacing="1px"
          >
            Bằng chứng có hiệu lực trong 10 phút
          </CustomTypography>
        </Box>
        <CustomButton
          minHeight="50px"
          minWidth="150px"
          onClick={() => {
            var blob = new Blob([JSON.stringify(provinceProof)], {
              type: "application/json",
            });
            FileSaver.saveAs(blob, "provinceProof.json");
          }}
        >
          <DownloadTwoToneIcon
            sx={{
              color: "white",
              mr: 1,
            }}
          />
          <CustomTypography buttonText>Lưu bằng chứng</CustomTypography>
        </CustomButton>
      </Box>
    </>
  );
}
