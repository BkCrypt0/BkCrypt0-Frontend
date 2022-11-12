import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { THEME_MODE } from "src/constants";
import { SCREEN_SIZE } from "src/constants";
import CustomTypography from "src/components/CustomTypography";

export default function ProofCreation() {
  const themeMode = useSelector((state) => state.themeSlice.themeMode);
  const mobile = useMediaQuery(SCREEN_SIZE.MOBILE);
  const tablet = useMediaQuery(SCREEN_SIZE.TABLET);

  return (
    <Box>
      <CustomTypography variant="h4" mb={3}>
        Create a proof
      </CustomTypography>
      <Box
        width={mobile ? "100%" : tablet ? "70%" : "50%"}
        sx={{
          borderRadius: "10px",
          border:
            themeMode === THEME_MODE.DARK
              ? "2px solid #D8D8D8"
              : "2px solid #353535",
          mb: 3,
        }}
      >
        <ul
          style={{
            "&: li::marker": {
              color:
                themeMode === THEME_MODE.DARK
                  ? "2px solid #D8D8D8"
                  : "2px solid #353535",
            },
          }}
        >
          <li>
            <Box width="100%">
              <Box width="100%" display="flex">
                <CustomTypography fontWeight="bold" mr={1}>
                  Age:
                </CustomTypography>
                <CustomTypography>
                  Prove that your age is in the following range
                </CustomTypography>
              </Box>
            </Box>
          </li>
          <li>
            <Box width="100%">
              <Box width="100%" display="flex">
                <CustomTypography fontWeight="bold" mr={1}>
                  Home:
                </CustomTypography>
                <CustomTypography>
                  Prove that your home town belongs to one of these following
                  provinces
                </CustomTypography>
              </Box>
            </Box>
          </li>
        </ul>
      </Box>
    </Box>
  );
}
